import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { loadDb, type Category, type Product } from "../../lib/storage";
import { addLine, type CartExtra } from "../../lib/cart";

const UBER_EATS_URL =
  "https://www.ubereats.com/ch/store/sboom-smash-burger/JmeMYJA7WhCDlrCpSujPqg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";
const JUST_EAT_URL =
  "https://www.just-eat.ch/speisekarte/sboom-smash-burger?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder";

const tabs: { key: Category; label: string }[] = [
  { key: "Beef", label: "Beef" },
  { key: "Chicken & Vege", label: "Chicken & Vege" },
  { key: "Sides", label: "Sides" },
  { key: "Drinks", label: "Drinks" },
  { key: "Desserts", label: "Desserts" },
];

function cardBase() {
  return "rounded-blob border border-black/10 bg-sboom-light p-4";
}

function pricePill() {
  return "inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-black";
}

function moneyCHF(v: number) {
  return `CHF ${v.toFixed(2)}`;
}

export default function Menu() {
  const nav = useNavigate();
  const db = loadDb();

  const [tab, setTab] = useState<Category>("Beef");

  // ✅ Pop-up Burger/Menu + Extras (uniquement burgers)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [mode, setMode] = useState<"BURGER" | "MENU">("BURGER");
  const [extras, setExtras] = useState<CartExtra[]>([]);

  const products = useMemo(() => db.products.filter((p) => p.category === tab), [db.products, tab]);

  const allowedExtras = useMemo(() => {
    if (!selected) return [];
    const ids = selected.addOns ?? [];
    if (!ids.length) return db.extras;
    return db.extras.filter((x) => ids.includes(x.id));
  }, [selected, db.extras]);

  const unitPrice = useMemo(() => {
    if (!selected) return 0;
    return mode === "BURGER" ? selected.priceBurger : selected.priceMenu;
  }, [selected, mode]);

  const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
  const total = unitPrice + extrasTotal;

  function openPicker(p: Product) {
    setSelected(p);
    setMode("BURGER");
    setExtras([]);
    setOpen(true);
  }

  function closePicker() {
    setOpen(false);
    setSelected(null);
    setExtras([]);
    setMode("BURGER");
  }

  function toggleExtra(eid: string) {
    if (!selected) return;

    const allowedIds = selected.addOns ?? [];
    if (allowedIds.length > 0 && !allowedIds.includes(eid)) return;

    const it = db.extras.find((x) => x.id === eid);
    if (!it) return;

    setExtras((cur) =>
      cur.some((x) => x.id === eid)
        ? cur.filter((x) => x.id !== eid)
        : [...cur, { id: it.id, name: it.name, price: it.price }]
    );
  }

  function confirmAddBurger() {
    if (!selected) return;

    addLine({
      productId: selected.id,
      name: selected.name,
      mode,
      unitPrice,
      qty: 1,
      extras,
    });

    closePicker();
    nav("/cart");
  }

  // ✅ Ajout direct (Sides/Drinks/Desserts)
  function addSimpleLine(args: { id: string; name: string; price: number; kind: "SIDES" | "DRINKS" | "DESSERTS" }) {
    addLine({
      productId: args.id,
      name: args.name,
      mode: args.kind,
      unitPrice: args.price,
      qty: 1,
      extras: [],
    } as any);
    nav("/cart");
  }

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-3xl font-black">La carte</div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
              <Button>Commander (Uber Eats)</Button>
            </a>
            <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
              <Button variant="secondary">Commander (Just Eat)</Button>
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "rounded-full px-4 py-2 text-sm font-black border border-black/10 " +
                (tab === t.key ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </WavyCard>

      {/* ✅ Sides : plus de WavyCard (uniforme Beef/Chicken) */}
      {tab === "Sides" && (
        <div className="grid gap-4 md:grid-cols-2">
          {db.sides.map((s) => (
            <div key={s.id} className={cardBase()}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl font-black">{s.name}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={pricePill()}>{moneyCHF(s.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Drinks : plus de WavyCard (uniforme Beef/Chicken) */}
      {tab === "Drinks" && (
        <div className="grid gap-4 md:grid-cols-2">
          {db.drinks.map((s) => (
            <div key={s.id} className={cardBase()}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl font-black">{s.name}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={pricePill()}>{moneyCHF(s.price)}</span>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Desserts : plus de WavyCard (uniforme Beef/Chicken) */}
      {tab === "Desserts" && (
        <div className="grid gap-4 md:grid-cols-2">
          {db.desserts.map((s) => (
            <div key={s.id} className={cardBase()}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl font-black">{s.name}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={pricePill()}>{moneyCHF(s.price)}</span>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Burgers */}
      {(tab === "Beef" || tab === "Chicken & Vege") && (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className={cardBase()}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl font-black">{p.name}</div>
                  <div className="mt-1 text-sm font-semibold text-black/70">{p.description}</div>

                  {p.included?.length ? (
                    <div className="mt-3 text-xs font-black text-black/60">
                      Inclus :{" "}
                      <span className="text-black">
                        {p.included.slice(0, 5).join(", ")}
                        {p.included.length > 5 ? "…" : ""}
                      </span>
                    </div>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={pricePill()}>Burger {moneyCHF(p.priceBurger)}</span>
                    <span className={pricePill()}>Menu {moneyCHF(p.priceMenu)}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Button variant="secondary" onClick={() => nav(`/product/${p.id}`)}>
                    Détails
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POP-UP BURGER/MENU + EXTRAS */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 md:items-center"
          onClick={closePicker}
        >
          <div
            className="w-full max-w-2xl rounded-blob bg-sboom-light border border-black/10 shadow-punch p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-black">{selected.name}</div>
                <div className="mt-1 text-sm font-semibold text-black/70">
                  D’abord : Burger ou Menu. Ensuite : extras (optionnel).
                </div>
              </div>
              <button
                onClick={closePicker}
                className="rounded-full px-3 py-2 text-sm font-black bg-black/10 hover:bg-black/20"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => setMode("BURGER")}
                className={
                  "rounded-blob border border-black/10 p-4 text-left font-black transition " +
                  (mode === "BURGER" ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                }
              >
                <div className="text-lg">Burger</div>
                <div className="text-sm">{moneyCHF(selected.priceBurger)}</div>
              </button>

              <button
                onClick={() => setMode("MENU")}
                className={
                  "rounded-blob border border-black/10 p-4 text-left font-black transition " +
                  (mode === "MENU" ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                }
              >
                <div className="text-lg">Menu</div>
                <div className="text-sm">{moneyCHF(selected.priceMenu)}</div>
              </button>
            </div>

            {selected.included?.length > 0 && (
              <div className="mt-4">
                <div className="text-lg font-black">Inclus</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.included.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/5 px-3 py-1 text-xs font-black border border-black/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-lg font-black">Tu veux ajouter un extra ?</div>
                  <div className="text-sm font-semibold text-black/70">
                    Optionnel — sélection rapide, tu peux aussi laisser vide.
                  </div>
                </div>
                <button
                  onClick={() => setExtras([])}
                  className="rounded-full px-3 py-2 text-xs font-black bg-black/10 hover:bg-black/20"
                >
                  Reset
                </button>
              </div>

              {allowedExtras.length === 0 ? (
                <div className="mt-3 rounded-blob bg-black/5 p-4 border border-black/10 text-sm font-semibold text-black/70">
                  Aucun extra disponible pour ce produit.
                </div>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {allowedExtras.map((x) => {
                    const on = extras.some((e) => e.id === x.id);
                    return (
                      <button
                        key={x.id}
                        onClick={() => toggleExtra(x.id)}
                        className={
                          "rounded-blob border border-black/10 p-4 text-left font-black transition " +
                          (on ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                        }
                      >
                        <div className="text-lg">{x.name}</div>
                        <div className="text-sm">{moneyCHF(x.price)}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
