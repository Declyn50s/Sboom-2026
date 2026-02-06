import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { cartTotal, clearCart, loadCart } from "../../lib/cart";

type Mode = "Sur place" | "À emporter" | "Livraison";

export default function Checkout() {
  const nav = useNavigate();
  const cart = useMemo(() => loadCart(), []);
  const total = cartTotal(cart);

  const [mode, setMode] = useState<Mode>("À emporter");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("ASAP");

  function submit() {
    // Demo: no payment, no backend
    if (!name.trim() || !phone.trim()) return alert("Nom + téléphone requis.");
    clearCart();
    alert("SBOOM! Commande envoyée (démo).");
    nav("/");
  }

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Commande</div>
        <div className="mt-1 text-sm font-semibold text-black/70">
          Simple, rapide. Paiement sur place / à la livraison (démo).
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-blob bg-black/5 p-5 border border-black/10">
            <div className="text-lg font-black">1) Mode</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Sur place", "À emporter", "Livraison"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={
                    "rounded-full px-4 py-2 text-sm font-black border border-black/10 " +
                    (mode === m ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
                  }
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-5 text-lg font-black">2) Infos</div>
            <div className="mt-3 grid gap-2">
              <input
                className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                placeholder="Email (optionnel)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-5 text-lg font-black">3) Heure</div>
            <div className="mt-3">
              <select
                className="w-full rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-black outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option>ASAP</option>
                <option>+15 min</option>
                <option>+30 min</option>
                <option>+45 min</option>
              </select>
            </div>
          </div>

          <div className="rounded-blob bg-black/5 p-5 border border-black/10">
            <div className="text-lg font-black">Récap</div>
            <div className="mt-3 space-y-2 text-sm font-semibold text-black/80">
              <div>Mode : <span className="font-black">{mode}</span></div>
              <div>Heure : <span className="font-black">{time}</span></div>
              <div>Articles : <span className="font-black">{cart.lines.length}</span></div>
              <div>Total : <span className="font-black">{total.toFixed(2)}</span></div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Button onClick={submit}>Confirmer la commande</Button>
              <Button variant="secondary" onClick={() => nav("/cart")}>
                Retour panier
              </Button>
            </div>

            <div className="mt-4 text-xs font-bold text-black/60">
              ⚠️ Démo sans backend : en prod, ce bloc sera relié au BO + gestion commandes.
            </div>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
