import { useState } from "react";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";

const KEY = "sboom_settings_v1";

type Settings = {
  phone: string;
  email: string;
  hours: string;
  story: string;
  heroVideo: string;
};

function load(): Settings {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return {
      phone: "+41 XX XXX XX XX",
      email: "contact@sboom.ch",
      hours: "Lun–Jeu 11h–14h / 18h–22h",
      story:
        "SBOOM, c’est un délire simple : faire un smash burger qui te fait dire “OK… ça c’est sérieux”.",
      heroVideo: "/media/videos/clip-1.mp4",
    };
  }
  try {
    return JSON.parse(raw) as Settings;
  } catch {
    return load();
  }
}

function save(s: Settings) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export default function AdminSettings() {
  const [s, setS] = useState<Settings>(load());

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-2xl font-black">Contenu & médias</div>
        <div className="mt-2 text-sm font-semibold text-black/70">
          Ici tu gères les infos globales du FO. (Démo : stockage local)
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-black">Téléphone</label>
            <input className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={s.phone} onChange={(e) => setS((x) => ({ ...x, phone: e.target.value }))} />

            <label className="text-xs font-black">Email</label>
            <input className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={s.email} onChange={(e) => setS((x) => ({ ...x, email: e.target.value }))} />

            <label className="text-xs font-black">Horaires</label>
            <input className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={s.hours} onChange={(e) => setS((x) => ({ ...x, hours: e.target.value }))} />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-black">Vidéo Hero (URL public)</label>
            <input className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={s.heroVideo} onChange={(e) => setS((x) => ({ ...x, heroVideo: e.target.value }))} />

            <label className="text-xs font-black">Texte “Notre histoire”</label>
            <textarea className="h-32 rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={s.story} onChange={(e) => setS((x) => ({ ...x, story: e.target.value }))} />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={() => { save(s); alert("Enregistré."); }}>
            Sauvegarder
          </Button>
          <Button variant="secondary" onClick={() => { localStorage.removeItem(KEY); setS(load()); alert("Reset contenu."); }}>
            Reset
          </Button>
        </div>

        <div className="mt-4 text-xs font-bold text-black/60">
          Note : la Home/Restaurant/Contact utilisent encore des valeurs statiques dans cette démo.
          En prod, on branche ces pages à ce Settings store (ou backend).
        </div>
      </WavyCard>
    </div>
  );
}
