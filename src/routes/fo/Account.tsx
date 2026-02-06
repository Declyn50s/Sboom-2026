import { useState } from "react";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";

export default function Account() {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Compte</div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-blob border border-black/10 bg-black/5 p-5">
            <div className="text-lg font-black">Newsletter</div>
            <div className="mt-2 text-sm font-semibold text-black/70">
              Promos, nouveautés, événements. Pas de spam.
            </div>

            <input
              className="mt-3 w-full rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="mt-3 flex items-center gap-2 text-sm font-black">
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
              Je veux recevoir la newsletter
            </label>

            <div className="mt-4">
              <Button
                onClick={() => {
                  if (!email.trim()) return alert("Entre ton email.");
                  alert("Inscription enregistrée (démo).");
                  setEmail("");
                }}
              >
                Valider
              </Button>
            </div>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
