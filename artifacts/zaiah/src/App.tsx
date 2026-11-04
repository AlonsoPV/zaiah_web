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
import { faqPageJsonLd } from "@/lib/faq";
import { initAnalytics, trackPageView } from "@/lib/analytics";

const Home = lazy(() => import("@/pages/Home"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
const Modelo = lazy(() => import("@/pages/Modelo"));
const Portafolio = lazy(() => import("@/pages/Portafolio"));
const ZaiahHealth = lazy(() => import("@/pages/ZaiahHealth"));
const Edison58 = lazy(() => import("@/pages/Edison58"));
const PreguntasFrecuentes = lazy(() => import("@/pages/PreguntasFrecuentes"));
const Contacto = lazy(() => import("@/pages/Contacto"));
const Gracias = lazy(() => import("@/pages/Gracias"));
const AvisoPrivacidad = lazy(() => import("@/pages/AvisoPrivacidad"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function breadcrumbsForPath(path: string, fallbackLabel: string) {
  if (path === "/casos-de-exito/edison-58") {
    return [
      { name: "Inicio", path: "/" },
      { name: "Casos de éxito", path: "/portafolio" },
      { name: "Edison 58", path: "/casos-de-exito/edison-58" },
    ];
  }
  if (path === "/zaiah-health") {
    return [
      { name: "Inicio", path: "/" },
      { name: "Proyectos", path: "/portafolio" },
      { name: "Zaiah Health", path: "/zaiah-health" },
    ];
  }
  return [
    { name: "Inicio", path: "/" },
    { name: fallbackLabel, path },
  ];
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const id = window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(id);
    }
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

    removeJsonLd("zaiah-jsonld-org");
    removeJsonLd("zaiah-jsonld-breadcrumb");
    removeJsonLd("zaiah-jsonld-faq");

    if (path === "/") {
      upsertJsonLd("zaiah-jsonld-org", organizationJsonLd());
      return;
    }

    if (path === "/preguntas-frecuentes") {
      upsertJsonLd("zaiah-jsonld-faq", faqPageJsonLd());
      upsertJsonLd(
        "zaiah-jsonld-breadcrumb",
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
        ]),
      );
      return;
    }

    upsertJsonLd(
      "zaiah-jsonld-breadcrumb",
      breadcrumbJsonLd(breadcrumbsForPath(path, meta.title)),
    );
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
          <Route path="/zaiah-health" component={ZaiahHealth} />
          <Route path="/casos-de-exito/edison-58" component={Edison58} />
          <Route path="/preguntas-frecuentes" component={PreguntasFrecuentes} />
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
