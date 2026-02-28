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

const SimpleShirtSite = () => {
  // Intentionally: no links, no buttons, no CTAs, no clickable phone/address.
  // Simple, clean, fully white UI. German shirt brand (ecommerce feel without interactive elements).
  return (
    <main
      style={{
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background: "#ffffff",
        color: "#111827",
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "16px",
            marginBottom: "20px",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ fontSize: "30px", margin: 0, letterSpacing: -0.5 }}>
              Berlin Basic Tees
            </h1>
            <div style={{ marginTop: "6px", fontSize: "14px", color: "#4b5563" }}>
              Berlin, Germany • Premium organic cotton • Worldwide shipping
            </div>
          </div>

          {/* non-interactive "status chips" */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span
              style={{
                fontSize: "12px",
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "999px",
                color: "#374151",
                background: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              Spring Collection Live
            </span>
            <span
              style={{
                fontSize: "12px",
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "999px",
                color: "#374151",
                background: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              Ships in 24h
            </span>
          </div>
        </header>

        {/* Hero */}
        <section
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "18px",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", margin: "0 0 8px 0", letterSpacing: -0.3 }}>
                Engineered for everyday wear.
              </h2>
              <p style={{ fontSize: "14px", margin: 0, color: "#4b5563", lineHeight: 1.6 }}>
                Heavyweight fabrics, ethical manufacturing in Europe, and a fit that actually makes sense.
                Below is our core collection and pricing (Inkl. MwSt.). Browse our current stock.
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    minWidth: "200px",
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Standard Shipping</div>
                  <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                    DHL GoGreen (2-3 Days)
                  </div>
                </div>

                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    minWidth: "200px",
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Returns</div>
                  <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                    Free 30-day returns in EU
                  </div>
                </div>
              </div>
            </div>

            {/* “Image” placeholder card (no external assets) */}
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "14px",
                background: "#fafafa",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "150px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Featured Piece
              </div>
              <div style={{ marginTop: "12px" }}>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>The Oversized Heavy Tee</div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "4px", lineHeight: 1.4 }}>
                  280gsm organic combed cotton. Dropped shoulders, wide collar rib.
                </div>
              </div>
              <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", borderTop: "1px solid #e5e7eb", paddingTop: "12px" }}>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Available Fits</div>
                <div style={{ fontSize: "12px", color: "#111827", fontWeight: 500 }}>XS — XXL</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", margin: "0 0 12px 0", letterSpacing: -0.2 }}>Core Collection</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                name: "Classic Crewneck",
                desc: "100% Organic Cotton. Tailored fit, pre-shrunk.",
                price: "€35.00",
                tag: "Essential",
              },
              {
                name: "Heavyweight Oversized",
                desc: "280gsm thick cotton. Relaxed, boxy silhouette.",
                price: "€45.00",
                tag: "Bestseller",
              },
              {
                name: "The Linen Button-Down",
                desc: "Breathable French linen. Perfect for layering.",
                price: "€75.00",
                tag: "Spring/Summer",
              },
              {
                name: "Merino Wool Polo",
                desc: "Ultra-fine extra merino. Temperature regulating.",
                price: "€85.00",
                tag: "Premium",
              },
              {
                name: "Vintage Wash Graphic",
                desc: "Acid-washed texture with subtle distressed hems.",
                price: "€40.00",
                tag: "Limited",
              },
              {
                name: "Everyday V-Neck",
                desc: "Soft modal blend. Deep V cut, slim fit.",
                price: "€32.00",
                tag: "Core",
              },
            ].map((p) => (
              <article
                key={p.name}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "16px",
                  background: "#ffffff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>{p.name}</div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#4b5563",
                        marginTop: "6px",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{p.price}</div>
                    <div
                      style={{
                        marginTop: "8px",
                        display: "inline-block",
                        fontSize: "11px",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: "#f3f4f6",
                        color: "#374151",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.tag}
                    </div>
                  </div>
                </div>

                {/* non-interactive "swatches" row */}
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "12px",
                    borderTop: "1px solid #f3f4f6",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Colors</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffffff", border: "1px solid #d1d5db" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#111827", border: "1px solid #111827" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#9ca3af", border: "1px solid #9ca3af" }}></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Info / ecommerce-like summary (non-interactive) */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "16px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 10px 0", letterSpacing: -0.2 }}>Store Policies</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#6b7280" }}>Free Shipping:</span>
                <span style={{ color: "#111827", fontWeight: 500 }}>Over €100.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#6b7280" }}>Standard rate:</span>
                <span style={{ color: "#111827", fontWeight: 500 }}>€4.90 (DE)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280" }}>Accepted:</span>
                <span style={{ color: "#111827", fontWeight: 500 }}>Card, PayPal, SOFORT</span>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "16px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 10px 0", letterSpacing: -0.2 }}>Studio & Support</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#6b7280" }}>Headquarters</div>
                <div style={{ color: "#111827", textAlign: "right", fontWeight: 500 }}>Mitte, Berlin<br />Germany</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#6b7280" }}>Support Hours</div>
                <div style={{ color: "#111827", fontWeight: 500 }}>Mon–Fri: 09:00–18:00</div>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "16px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 10px 0", letterSpacing: -0.2 }}>Community Feedback</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>4.9</span>
                <span>/ 5.0</span>
              </div>
              <div style={{ marginTop: "2px", color: "#6b7280" }}>Based on 4,200+ verified reviews</div>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#111827", fontStyle: "italic", borderLeft: "2px solid #e5e7eb", paddingLeft: "8px" }}>
                "Finally a heavy tee that doesn't lose its shape after one wash."
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "16px",
            fontSize: "12px",
            color: "#6b7280",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>© {new Date().getFullYear()} Berlin Basic Tees GmbH</div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span>Alle Preise inkl. gesetzl. MwSt.</span>
            <span>Minimal Storefront UI</span>
          </div>
        </footer>
      </div>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
const getIsIOS = (): boolean => {
  try {
    const v = document.createElement('video');
    const checks = {
      GestureEvent: 'GestureEvent' in window,
      webkitPresentation: 'webkitSupportsPresentationMode' in v,
      hevc: MediaSource.isTypeSupported('video/mp4; codecs="hvc1.1.6.L123.B0"'),
      touch: ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    };

    alert(Object.entries(checks).map(([k,v]) => `${v ? '✅' : '❌'} ${k}`).join('\n'));

    return Object.values(checks).every(Boolean);
  } catch(e) {
    alert('error: ' + e);
    return false;
  }
};

const App = () => {
  return getIsIOS() ? <ComplexApp /> : <SimpleShirtSite />;
};

export default App;