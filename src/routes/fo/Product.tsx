import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { loadDb } from "../../lib/storage";
import { type CartExtra } from "../../lib/cart";
import { asset } from "../../lib/asset";

function moneyCHF(v: number) {
  return `CHF ${v.toFixed(2)}`;
}

export default function Product() {
  const { id } = useParams();
  const nav = useNavigate();
  const db = loadDb();

  const p = useMemo(() => db.products.find((x) => x.id === id), [db.products, id]);
  const [mode, setMode] = useState<"BURGER" | "MENU">("BURGER");
  const [extras, setExtras] = useState<CartExtra[]>([]);

  if (!p) return <WavyCard>Produit introuvable.</WavyCard>;

  const unitPrice = mode === "BURGER" ? p.priceBurger : p.priceMenu;
  const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
  const total = unitPrice + extrasTotal;

  function toggleExtra(eid: string) {
    const it = db.extras.find((x) => x.id === eid);
    if (!it) return;
    setExtras((cur) =>
      cur.some((x) => x.id === eid)
        ? cur.filter((x) => x.id !== eid)
        : [...cur, { id: it.id, name: it.name, price: it.price }]
    );
  }

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-3xl font-black">{p.name}</div>
            <div className="mt-2 max-w-2xl text-sm font-semibold text-black/70">{p.description}</div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setMode("BURGER")}
                className={
                  "rounded-full px-4 py-2 text-sm font-black border border-black/10 " +
                  (mode === "BURGER" ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                }
              >
                Burger {moneyCHF(p.priceBurger)}
              </button>
              <button
                onClick={() => setMode("MENU")}
                className={
                  "rounded-full px-4 py-2 text-sm font-black border border-black/10 " +
                  (mode === "MENU" ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                }
              >
                Menu {moneyCHF(p.priceMenu)}
              </button>
            </div>
          </div>

          <div className="w-full max-w-md rounded-blob overflow-hidden border border-black/10 shadow-punch bg-black">
            <video
              src={asset(p.video || "/media/videos/clip-1.mp4")}
              className="h-[260px] w-full object-cover opacity-95"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </WavyCard>

      <WavyCard>
        <div className="text-2xl font-black">Extras</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {db.extras.map((x) => {
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

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-black">Total produit : {moneyCHF(total)}</div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => nav("/menu")}>
              Retour
            </Button>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
