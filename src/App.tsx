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
  // Simple, clean, fully white UI. Brussels pizza shop (ecommerce feel without interactive elements).
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
            <h1 style={{ fontSize: "30px", margin: 0, letterSpacing: -0.3 }}>
              Bruxelles Pizza Atelier
            </h1>
            <div style={{ marginTop: "6px", fontSize: "14px", color: "#4b5563" }}>
              Brussels, Belgium • Neapolitan-style pizzas • Takeaway & delivery
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
              Open today
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
              Same-day delivery
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
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>
                Fresh pizzas, made in Brussels
              </h2>
              <p style={{ fontSize: "14px", margin: 0, color: "#4b5563", lineHeight: 1.6 }}>
                Stone-baked dough, slow-fermented for 24 hours. Simple ingredients, bold flavors.
                Below is today’s menu and pricing (VAT included). No buttons or links shown.
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    minWidth: "220px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Pickup</div>
                  <div style={{ fontSize: "14px", color: "#111827" }}>Ready in ~20–30 min</div>
                </div>

                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    minWidth: "220px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Delivery</div>
                  <div style={{ fontSize: "14px", color: "#111827" }}>
                    Brussels region • ~35–55 min
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
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Featured</div>
              <div style={{ marginTop: "8px" }}>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>Truffle & Mushroom</div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "4px" }}>
                  Mozzarella, mushrooms, truffle oil, parsley
                </div>
              </div>
              <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Size</div>
                <div style={{ fontSize: "12px", color: "#111827" }}>32 cm</div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu grid */}
        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", margin: "0 0 10px 0" }}>Menu</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              {
                name: "Margherita",
                desc: "Tomato, mozzarella, basil",
                price: "€12.50",
                tag: "Classic",
              },
              {
                name: "Pepperoni",
                desc: "Tomato, mozzarella, pepperoni",
                price: "€14.90",
                tag: "Popular",
              },
              {
                name: "Prosciutto & Arugula",
                desc: "Mozzarella, prosciutto, arugula, parmesan",
                price: "€16.50",
                tag: "Signature",
              },
              {
                name: "Veggie Garden",
                desc: "Peppers, mushrooms, onion, olives",
                price: "€15.20",
                tag: "Veg",
              },
              {
                name: "Truffle & Mushroom",
                desc: "Mozzarella, mushrooms, truffle oil",
                price: "€17.90",
                tag: "Featured",
              },
              {
                name: "Four Cheeses",
                desc: "Mozzarella, gorgonzola, parmesan, goat cheese",
                price: "€16.90",
                tag: "Rich",
              },
            ].map((p) => (
              <article
                key={p.name}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "14px",
                  background: "#ffffff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>{p.name}</div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#4b5563",
                        marginTop: "4px",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700 }}>{p.price}</div>
                    <div
                      style={{
                        marginTop: "6px",
                        display: "inline-block",
                        fontSize: "11px",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        color: "#374151",
                        background: "#ffffff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.tag}
                    </div>
                  </div>
                </div>

                {/* non-interactive "quantity" row */}
                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #f3f4f6",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6b7280",
                  }}
                >
                  <span>Quantity</span>
                  <span style={{ color: "#111827" }}>1</span>
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
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "14px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 8px 0" }}>Order info</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div>
                <span style={{ color: "#6b7280" }}>Minimum order:</span>{" "}
                <span style={{ color: "#111827" }}>€15.00</span>
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Delivery fee:</span>{" "}
                <span style={{ color: "#111827" }}>€2.90</span>
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Payment:</span>{" "}
                <span style={{ color: "#111827" }}>Card / Cash on delivery</span>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "14px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 8px 0" }}>Location</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Area</div>
                <div style={{ color: "#111827" }}>Brussels, Belgium</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Hours</div>
                <div style={{ color: "#111827" }}>Mon–Sun: 11:30–22:30</div>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "14px",
              background: "#ffffff",
            }}
          >
            <h3 style={{ fontSize: "14px", margin: "0 0 8px 0" }}>Reviews</h3>
            <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>4.6</div>
              <div style={{ marginTop: "2px" }}>Based on 120 orders</div>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#6b7280" }}>
                “Fast delivery and amazing crust.”
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "14px",
            marginTop: "6px",
            fontSize: "12px",
            color: "#6b7280",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>© {new Date().getFullYear()} Bruxelles Pizza Atelier</div>
          <div>VAT included • All-white minimal storefront</div>
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

const App = () => {
  const touchPoints = getTouchPointsSafe();
  return touchPoints > 0 ? <ComplexApp /> : <SimpleSite />;
};

export default App;