import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { adminLogin } from "../../lib/storage";

export default function AdminLogin() {
  const nav = useNavigate();
  const [u, setU] = useState("admin");
  const [p, setP] = useState("sboom");

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Connexion BO</div>
        <div className="mt-1 text-sm font-semibold text-black/70">
          Démo locale (localStorage). En prod : vrai backend + rôles.
        </div>

        <div className="mt-5 grid gap-2 max-w-sm">
          <input
            className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Utilisateur"
          />
          <input
            className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Mot de passe"
            type="password"
          />
          <Button
            onClick={() => {
              const ok = adminLogin(u, p);
              if (!ok) return alert("Identifiants invalides.");
              nav("/admin/dashboard");
            }}
          >
            Se connecter
          </Button>
        </div>

        <div className="mt-4 text-xs font-bold text-black/60">
          Identifiants démo : admin / sboom
        </div>
      </WavyCard>
    </div>
  );
}
