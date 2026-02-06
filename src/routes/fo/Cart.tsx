import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { cartTotal, loadCart, removeLine, updateQty } from "../../lib/cart";

export default function Cart() {
  const [tick, setTick] = useState(0);
  const cart = useMemo(() => loadCart(), [tick]);
  const total = cartTotal(cart);

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-3xl font-black">Panier</div>
            <div className="text-sm font-semibold text-black/70">C’est bientôt l’explosion.</div>
          </div>
          <Link to="/menu">
            <Button variant="secondary">+ Ajouter</Button>
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {cart.lines.length === 0 && (
            <div className="rounded-blob bg-black/5 p-5 text-sm font-semibold">
              Panier vide. Va chercher un burger.
            </div>
          )}

          {cart.lines.map((l) => (
            <div key={l.lineId} className="rounded-blob border border-black/10 bg-black/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-black">
                    {l.name} <span className="text-black/60">({l.mode})</span>
                  </div>
                  {l.extras.length > 0 && (
                    <div className="mt-1 text-sm font-semibold text-black/70">
                      Extras : {l.extras.map((e) => e.name).join(", ")}
                    </div>
                  )}
                  <div className="mt-1 text-sm font-black">
                    {l.unitPrice.toFixed(2)} / unité
                  </div>
                </div>

                <button
                  className="text-sm font-black underline"
                  onClick={() => {
                    removeLine(l.lineId);
                    setTick((t) => t + 1);
                  }}
                >
                  Supprimer
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    className="h-10 w-10 rounded-full bg-sboom-yellow font-black shadow-punch"
                    onClick={() => {
                      updateQty(l.lineId, l.qty - 1);
                      setTick((t) => t + 1);
                    }}
                    aria-label="Diminuer"
                  >
                    -
                  </button>
                  <div className="min-w-10 text-center text-sm font-black">{l.qty}</div>
                  <button
                    className="h-10 w-10 rounded-full bg-sboom-yellow font-black shadow-punch"
                    onClick={() => {
                      updateQty(l.lineId, l.qty + 1);
                      setTick((t) => t + 1);
                    }}
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm font-black">
                  Ligne :{" "}
                  {((l.unitPrice + l.extras.reduce((s, e) => s + e.price, 0)) * l.qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xl font-black">Total : {total.toFixed(2)}</div>
          <div className="flex gap-2">
            <Link to="/checkout"><Button disabled={cart.lines.length === 0}>Commander</Button></Link>
            <Link to="/menu"><Button variant="secondary">Retour carte</Button></Link>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
