import { useState } from "react";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { INSTAGRAM_URL } from "../../lib/links";


export default function Contact() {
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Contact</div>
        <div className="mt-1 text-sm font-semibold text-black/70">
          Une question ? Un partenariat ? Dis-le.
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-blob border border-black/10 bg-black/5 p-5">
            <div className="text-lg font-black">Infos</div>
            <div className="mt-2 text-sm font-semibold">
              📍 Budron H7, Box 14 — 1052 Le Mont-sur-Lausanne
            </div>
            <div className="mt-2 text-sm font-semibold">📩 contact@sboom.ch (à configurer)</div>
            <div className="mt-2 text-sm font-semibold">📞 +41 XX XXX XX XX (à configurer)</div>
          </div>

          <div className="rounded-blob border border-black/10 bg-black/5 p-5">
            <div className="text-lg font-black">Message</div>
            <textarea
              className="mt-3 h-32 w-full rounded-2xl border border-black/10 bg-sboom-light p-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              placeholder="Ton message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className="mt-3">
              <Button
                onClick={() => {
                  if (!msg.trim()) return alert("Écris un message.");
                  alert("Message envoyé (démo).");
                  setMsg("");
                }}
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
