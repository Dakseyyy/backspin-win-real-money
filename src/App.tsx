import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function getTouchPointsSafe(): number {
  // navigator might not exist during SSR, tests, etc.
  if (typeof navigator === "undefined") return 0;
  // spec: maxTouchPoints is a number, default 0
  return Number((navigator as any).maxTouchPoints ?? 0);
}

const SimpleSite = () => {
  // Intentionally: no links, no buttons, no CTAs, no clickable phone/address.
  return (
    <main
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        padding: "24px",
        maxWidth: "680px",
        margin: "0 auto",
        lineHeight: 1.5,
      }}
    >
      <header style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>Happy trails rv park</h1>
        <div style={{ marginTop: "6px", fontSize: "14px" }}>
          <span>3.8</span> <span style={{ margin: "0 6px" }}>•</span>{" "}
          <span>(5)</span>
          <span style={{ margin: "0 6px" }}>•</span> <span>RV park</span>
        </div>
      </header>

      <section style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>Overview</h2>
        <div style={{ fontSize: "14px" }}>
          <div style={{ marginBottom: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: "12px" }}>Address</div>
            <div>998 13th St, Atoka, OK 74525, United States</div>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: "12px" }}>Phone</div>
            <div>+1 580-513-2900</div>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: "12px" }}>Plus code</div>
            <div>9VFH+P8 Atoka, Oklahoma, USA</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>Reviews</h2>
        <div style={{ fontSize: "14px", opacity: 0.85 }}>
          3.8 (5 reviews)
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "16px", margin: "0 0 8px 0" }}>About</h2>
        <div style={{ fontSize: "14px", opacity: 0.85 }}>
          RV park
        </div>
      </section>

      {/* Intentionally excluding:
          Directions / Save / Nearby / Send to phone / Share / Claim this business / Maps history / Add a label
          per your "no cta to anything no links no nothing" requirement. */}
    </main>
  );
};

const ComplexApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => {
  const touchPoints = getTouchPointsSafe();
  return touchPoints > 0 ? <ComplexApp /> : <SimpleSite />;
};

export default App;