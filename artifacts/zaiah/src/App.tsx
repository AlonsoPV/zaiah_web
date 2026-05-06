import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
import QuienesSomos from "@/pages/QuienesSomos";
import Modelo from "@/pages/Modelo";
import Portafolio from "@/pages/Portafolio";
import Contacto from "@/pages/Contacto";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quienes-somos" component={QuienesSomos} />
        <Route path="/modelo" component={Modelo} />
        <Route path="/portafolio" component={Portafolio} />
        <Route path="/contacto" component={Contacto} />
        <Route component={NotFound} />
      </Switch>
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
