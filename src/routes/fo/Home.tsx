import VideoHero from "../../components/VideoHero";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { loadDb } from "../../lib/storage";
import ProductCard from "../../components/ProductCard";
import { asset } from "../../lib/asset";

const UBER_EATS_URL =
  "https://www.ubereats.com/ch/store/sboom-smash-burger/JmeMYJA7WhCDlrCpSujPqg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";
const JUST_EAT_URL =
  "https://www.just-eat.ch/speisekarte/sboom-smash-burger?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/1UmMX4UpxEJAUEAAA";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/SBOOM+Smash+Burger/@46.5760958,6.6305065,17z/data=!4m8!3m7!1s0x478c331a9b71a01d:0xf13a8c338a2d955c!8m2!3d46.5760958!4d6.6305065!9m1!1b1!16s%2Fg%2F11wj429_3b?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D";

export default function Home() {
  const db = loadDb();
  const best = db.products.filter((p) => p.badges?.includes("Best seller")).slice(0, 3);

  const heroBestImageSrc = asset("/media/images/Sboom-burgers.jpeg"); // ✅ public/media/images/Sboom-burgers.jpeg
  const bestRest = best.slice(1);

  return (
    <div className="space-y-6">
      <VideoHero />

      <div className="grid gap-6 md:grid-cols-3">
        <WavyCard className="md:col-span-2">
          {/* ✅ UN SEUL BLOC UNIFORME (titre + sous-titre + CTA + image) */}
          <div className="rounded-blob border border-black/10 bg-sboom-light p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-2xl font-black">Best sellers</div>
                <div className="mt-1 text-sm font-semibold text-black/70">
                  Pas de blabla — prends le meilleur direct.
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
                  <Button variant="secondary">Uber Eats</Button>
                </a>
                <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
                  <Button>Just Eats</Button>
                </a>
              </div>
            </div>

            {/* ✅ Image intégrée dans le même bloc */}
            <div className="mt-4 overflow-hidden rounded-blob border border-black/10 bg-black/5">
              <img
                src={heroBestImageSrc}
                alt="SBOOM Burgers"
                className="h-[220px] w-full object-cover md:h-[260px]"
                loading="lazy"
              />
              <div className="p-3">
                <div className="text-sm font-black">SBOOM Burgers</div>
                <div className="text-xs font-semibold text-black/70">
                  Commander sur Uber Eats ou Just Eat.
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Les 2 autres best sellers restent en cards en dessous (uniforme) */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {bestRest.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </WavyCard>

        <WavyCard>
          <div className="text-2xl font-black">Commander</div>
          <div className="mt-2 text-sm font-semibold text-black/70">
            Menu = <span className="font-black">frites + boisson</span>. Simple.
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <a href="/menu">
              <Button className="w-full">Aller à la carte</Button>
            </a>
            <a href="/restaurant">
              <Button className="w-full" variant="secondary">
                Adresse & horaires
              </Button>
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
              <Button className="w-full" variant="black">
                ⭐ Voir les avis Google
              </Button>
            </a>
          </div>

          <div className="mt-6 rounded-2xl bg-black/5 p-4">
            <div className="text-sm font-black">📍 Budron H7, Box 14</div>
            <div className="text-sm font-semibold text-black/70">1052 Le Mont-sur-Lausanne</div>
          </div>
        </WavyCard>
      </div>

      <WavyCard>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-black">Restaurant</div>
            <div className="text-sm font-semibold text-black/70">
              Produits frais & locaux. Smash burger. Ambiance SBOOM.
            </div>
          </div>
          <a className="text-sm font-black underline" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
            Ouvrir dans Google Maps
          </a>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-blob overflow-hidden border border-black/10 shadow-punch bg-black">
            <video
              src={asset("/media/videos/clip-12.mp4")}
              className="h-[240px] w-full object-cover opacity-90"
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>

          <div className="rounded-blob bg-black/5 p-5">
            <div className="text-lg font-black">Ce que tu dois retenir</div>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-black/75">
              <li>🔥 Smash burger (vrai smash, pas un burger triste)</li>
              <li>🍟 Frites maison</li>
              <li>🥤 Drinks & desserts</li>
              <li>➕ Extras (bacon, cheddar, oignons crispy…)</li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a href="/menu">
                <Button>Voir la carte</Button>
              </a>
              <a href="/story">
                <Button variant="secondary">Notre histoire</Button>
              </a>
            </div>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
