import { useEffect, useMemo, useState } from "react";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { INSTAGRAM_URL } from "../../lib/links";

type Slot = { start: string; end: string }; // "HH:MM"
type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Dim ... 6=Sam

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/1UmMX4UpxEJAUEAAA";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/SBOOM+Smash+Burger/@46.5760958,6.6305065,17z/data=!3m1!4b1!4m6!3m5!1s0x478c331a9b71a01d:0xf13a8c338a2d955c!8m2!3d46.5760958!4d6.6305065!16s%2Fg%2F11wj429_3b?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D";

// ⚠️ À remplacer par tes URLs officielles si tu les as déjà dans lib/links.ts
const UBER_EATS_URL =
  "https://www.ubereats.com/ch/store/sboom-smash-burger/JmeMYJA7WhCDlrCpSujPqg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";
const JUST_EAT_URL =
  "https://www.just-eat.ch/speisekarte/sboom-smash-burger?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder";

const SCHEDULE: Record<DayKey, Slot[]> = {
  0: [{ start: "18:30", end: "22:00" }], // Dimanche : midi fermé
  1: [
    { start: "11:30", end: "13:30" },
    { start: "18:30", end: "21:30" },
  ], // Lundi
  2: [{ start: "11:30", end: "13:30" }], // Mardi : soir fermé
  3: [
    { start: "11:30", end: "13:30" },
    { start: "18:30", end: "21:30" },
  ], // Mercredi
  4: [
    { start: "11:30", end: "13:30" },
    { start: "18:30", end: "21:30" },
  ], // Jeudi
  5: [
    { start: "11:30", end: "13:30" },
    { start: "18:30", end: "22:00" },
  ], // Vendredi
  6: [
    { start: "12:00", end: "14:00" },
    { start: "18:30", end: "22:00" },
  ], // Samedi
};

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fmtDayShort(day: number) {
  return ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][day] ?? "";
}

function fmtTime(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function getStatus(now: Date) {
  const day = now.getDay() as DayKey;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const slotsToday = SCHEDULE[day] ?? [];

  for (const s of slotsToday) {
    const start = toMinutes(s.start);
    const end = toMinutes(s.end);
    if (nowMin >= start && nowMin < end) {
      return { open: true as const, label: `Ouvert — jusqu’à ${s.end}` };
    }
  }

  for (const s of slotsToday) {
    const start = toMinutes(s.start);
    if (nowMin < start) {
      return { open: false as const, label: `Fermé — ouvre à ${s.start}` };
    }
  }

  for (let add = 1; add <= 7; add++) {
    const d = ((day + add) % 7) as DayKey;
    const slots = SCHEDULE[d] ?? [];
    if (slots.length > 0) {
      return {
        open: false as const,
        label: `Fermé — ouvre ${fmtDayShort(d)} à ${slots[0].start}`,
      };
    }
  }

  return { open: false as const, label: "Fermé" };
}

function DayLine({
  day,
  noon,
  evening,
  hiNoon,
  hiEvening,
}: {
  day: string;
  noon: string;
  evening: string;
  hiNoon?: boolean;
  hiEvening?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm font-semibold text-black/80">
      <div className="w-12 shrink-0 font-black text-black">{day}</div>
      <div className="flex flex-1 justify-end gap-4">
        <div className={"w-28 text-right " + (hiNoon ? "font-black text-black" : "")}>{noon}</div>
        <div className={"w-28 text-right " + (hiEvening ? "font-black text-black" : "")}>{evening}</div>
      </div>
    </div>
  );
}

function FaqItem({
  i,
  open,
  onToggle,
  q,
  a,
}: {
  i: number;
  open: boolean;
  onToggle: () => void;
  q: string;
  a: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={
        "w-full text-left rounded-blob border border-black/10 p-4 transition " +
        (open ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
      }
      aria-expanded={open}
      aria-controls={`faq-panel-${i}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-black">{q}</div>
        <div
          className={
            "shrink-0 rounded-full border border-black/10 bg-black/10 px-3 py-1 text-xs font-black " +
            (open ? "opacity-100" : "opacity-80")
          }
        >
          {open ? "—" : "+"}
        </div>
      </div>

      <div
        id={`faq-panel-${i}`}
        className={
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out " +
          (open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0")
        }
      >
        <div className="overflow-hidden">
          <div className="text-sm font-semibold text-black/80">{a}</div>
        </div>
      </div>
    </button>
  );
}

export default function Restaurant() {
  const [now, setNow] = useState(() => new Date());
  const status = useMemo(() => getStatus(now), [now]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const faq = useMemo(
    () => [
      {
        q: "Quels sont vos horaires ?",
        a: "Ils sont affichés ici en direct (ouvert/fermé + jusqu’à quand).",
      },
      {
        q: "Comment commander ?",
        a: "Les commandes se font uniquement via Uber Eats ou Just Eat (collection).",
      },
      {
        q: "Menu = quoi ?",
        a: "Menu = frites + boisson.",
      },
      {
        q: "Je peux modifier un burger ?",
        a: "Oui : tu choisis Burger ou Menu, puis on te propose des extras au moment de l’ajout.",
      },
      {
        q: "Produits frais & locaux ?",
        a: "Oui, on privilégie les produits frais et locaux.",
      },
      {
        q: "Réservation ?",
        a: "Pas de réservation en ligne pour l’instant. Pour une demande spécifique, passe par la page Contact.",
      },
      {
        q: "Fidélité ?",
        a: "Phase 2 : système de points via le compte client (prévu). Pas encore actif.",
      },
    ],
    []
  );

  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <div className="space-y-6">
      <WavyCard>
        <div className="text-3xl font-black">Restaurant</div>
        <div className="mt-2 text-sm font-semibold text-black/70">
          Tout ce qu’il te faut pour venir (ou commander).
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* GAUCHE : Horaires (compact) */}
          <div className="rounded-blob border border-black/10 bg-black/5 p-4">
            <div className="text-lg font-black">🕒 Horaires</div>

            <div
              className={
                "mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black border border-black/10 " +
                (status.open ? "bg-sboom-yellow shadow-punch" : "bg-black/5")
              }
            >
              <span>{status.open ? "🟢" : "🔴"}</span>
              <span>{status.label}</span>
              <span className="text-[11px] font-black text-black/60">({fmtTime(now)})</span>
            </div>

            <div className="mt-3 rounded-blob border border-black/10 bg-sboom-light px-3 py-2">
              <div className="flex items-end justify-between gap-3 pb-1 text-[11px] font-black text-black/55">
                <div className="w-12" />
                <div className="flex flex-1 justify-end gap-4">
                  <div className="w-28 text-right">Midi</div>
                  <div className="w-28 text-right">Soir</div>
                </div>
              </div>

              <div className="h-px bg-black/10" />
              <DayLine day="Lun" noon="11:30–13:30" evening="18:30–21:30" />
              <div className="h-px bg-black/10" />
              <DayLine day="Mar" noon="11:30–13:30" evening="Fermé" hiEvening />
              <div className="h-px bg-black/10" />
              <DayLine day="Mer" noon="11:30–13:30" evening="18:30–21:30" />
              <div className="h-px bg-black/10" />
              <DayLine day="Jeu" noon="11:30–13:30" evening="18:30–21:30" />
              <div className="h-px bg-black/10" />
              <DayLine day="Ven" noon="11:30–13:30" evening="18:30–22:00" />
              <div className="h-px bg-black/10" />
              <DayLine day="Sam" noon="12:00–14:00" evening="18:30–22:00" />
              <div className="h-px bg-black/10" />
              <DayLine day="Dim" noon="Fermé" evening="18:30–22:00" hiNoon />
            </div>

            {/* ✅ CTA */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                <Button>Google Maps</Button>
              </a>

              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <Button variant="secondary">⭐ Avis Google</Button>
              </a>

              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Button variant="secondary">Instagram</Button>
              </a>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
                <Button>Commander (Uber Eats)</Button>
              </a>
              <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
                <Button variant="secondary">Commander (Just Eat)</Button>
              </a>
            </div>

            <div className="mt-2 text-xs font-black text-black/60">
              Commandes uniquement via Uber Eats / Just Eat.
            </div>
          </div>

          {/* DROITE : Adresse + vidéo ajustée */}
          <div className="space-y-3">
            <div className="rounded-blob border border-black/10 bg-black/5 p-4">
              <div className="text-lg font-black">📍 Adresse</div>
              <div className="mt-1 text-sm font-semibold">En Budron H7, Box 14</div>
              <div className="text-sm font-semibold">1052 Le Mont-sur-Lausanne</div>
            </div>

            <div className="rounded-blob overflow-hidden border border-black/10 shadow-punch bg-black">
              <video
                src="/media/videos/clip-12.mp4"
                className="h-[240px] w-full object-cover opacity-95 md:h-[300px]"
                controls
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </WavyCard>

      {/* ✅ FAQ en accordéon (UX) */}
      <WavyCard>
        <div className="text-2xl font-black">FAQ</div>
        <div className="mt-3 space-y-3">
          {faq.map((item, idx) => (
            <FaqItem
              key={idx}
              i={idx}
              open={openFaq === idx}
              onToggle={() => setOpenFaq((cur) => (cur === idx ? -1 : idx))}
              q={item.q}
              a={item.a}
            />
          ))}
        </div>
      </WavyCard>
    </div>
  );
}
