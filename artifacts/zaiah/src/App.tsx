import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  applyPageMeta,
  breadcrumbJsonLd,
  metaForPath,
  normalizePath,
  organizationJsonLd,
  removeJsonLd,
  upsertJsonLd,
} from "@/lib/seo";
import { initAnalytics, trackPageView } from "@/lib/analytics";

const Home = lazy(() => import("@/pages/Home"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
const Modelo = lazy(() => import("@/pages/Modelo"));
const Portafolio = lazy(() => import("@/pages/Portafolio"));
const Contacto = lazy(() => import("@/pages/Contacto"));
const Gracias = lazy(() => import("@/pages/Gracias"));
const AvisoPrivacidad = lazy(() => import("@/pages/AvisoPrivacidad"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

const breadcrumbLabels: Record<string, string> = {
  "/": "Inicio",
  "/modelo": "Modelo",
  "/portafolio": "Portafolio",
  "/quienes-somos": "Quiénes somos",
  "/contacto": "Agenda una cita",
  "/gracias": "Gracias",
  "/aviso-de-privacidad": "Aviso de privacidad",
};

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function PageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    initAnalytics();
    const path = normalizePath(location);
    const meta = metaForPath(path);
    applyPageMeta(meta);
    trackPageView(path);

    if (path === "/") {
      upsertJsonLd("zaiah-jsonld-org", organizationJsonLd());
      removeJsonLd("zaiah-jsonld-breadcrumb");
    } else {
      removeJsonLd("zaiah-jsonld-org");
      const label = breadcrumbLabels[path] ?? meta.title;
      upsertJsonLd(
        "zaiah-jsonld-breadcrumb",
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: label, path },
        ]),
      );
    }
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <Header />
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center bg-[#faf9f7] text-[10px] font-bold uppercase tracking-[.22em] text-[#041f49]/45">
            ZAIAH
          </div>
        }
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quienes-somos" component={QuienesSomos} />
          <Route path="/modelo" component={Modelo} />
          <Route path="/portafolio" component={Portafolio} />
          <Route path="/contacto" component={Contacto} />
          <Route path="/gracias" component={Gracias} />
          <Route path="/aviso-de-privacidad" component={AvisoPrivacidad} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
