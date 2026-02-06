import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { asset } from "../../lib/asset";

const UBER_EATS_URL =
  "https://www.ubereats.com/ch/store/sboom-smash-burger/JmeMYJA7WhCDlrCpSujPqg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";

const JUST_EAT_URL =
  "https://www.just-eat.ch/speisekarte/sboom-smash-burger?serviceType=collection&utm_source=google&utm_medium=organic&utm_campaign=foodorder";

const INSTAGRAM_URL = "https://www.instagram.com/sboom_burger/";

/**
 * Place tes assets ici (public/media/...)
 * - Images: /media/images/story-1.jpg, /media/images/story-2.jpg...
 * - Vidéos: /media/videos/clip-1.mp4, /media/videos/clip-12.mp4...
 */
const ASSETS = {
  heroVideo: asset("/media/videos/clip-14.mp4"),
  heroImage: asset("/media/images/Sboom-burgers.jpeg"), // fallback si vidéo absente
  imgSmash: asset("/media/images/Sboom-burgers.jpeg"),
  imgTeam: asset("/media/images/carton.jpg"),
  imgLocal: asset("/media/images/menu-beef.jpg"),
  videoSmash: asset("/media/videos/clip-33.mp4"),
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-black text-black/80">
      {children}
    </span>
  );
}

function MediaCard({
  type,
  src,
  alt,
}: {
  type: "image" | "video";
  src: string;
  alt?: string;
}) {
  return (
    <div className="rounded-blob overflow-hidden border border-black/10 shadow-punch bg-black">
      {type === "video" ? (
        <video
          src={src}
          className="h-[220px] w-full object-cover opacity-95 md:h-[300px]"
          controls
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={src}
          alt={alt || "SBOOM"}
          className="h-[220px] w-full object-cover md:h-[300px]"
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function Story() {
  return (
    <div className="space-y-6">
      {/* HERO */}
      <WavyCard>
        <div className="grid gap-5 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Pill>Smash Burger</Pill>
              <Pill>Fait maison</Pill>
              <Pill>Produits frais & locaux</Pill>
            </div>

            <h1 className="text-3xl font-black leading-tight md:text-4xl">
              SBOOM — une explosion en bouche.
            </h1>

            <p className="text-sm font-semibold text-black/70">
              Deux amis, une idée simple : un smash burger qui claque. Du croustillant, du juteux,
              des sauces maison… et une vibe familiale au Budron.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
                <Button>Commander (Uber Eats)</Button>
              </a>
              <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
                <Button variant="secondary">Commander (Just Eat)</Button>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Button variant="black">Instagram</Button>
              </a>
            </div>

            <div className="pt-2 text-xs font-black text-black/60">
              Commandes uniquement via Uber Eats / Just Eat.
            </div>
          </div>

          <div>
            {/* Vidéo hero (si tu veux une image à la place, change type="image") */}
            <MediaCard type="video" src={ASSETS.heroVideo} />
          </div>
        </div>
      </WavyCard>

      {/* SECTION 1 */}
      <WavyCard>
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          <div className="space-y-3">
            <div className="text-2xl font-black">Notre histoire</div>
            <p className="text-sm font-semibold text-black/75">
              SBOOM, c’est l’histoire de deux amis Lausannois : Axel et Francesco. Ils ont quitté
              leurs jobs pour créer un spot simple, chaleureux, et 100% focus sur le goût.
            </p>

            <div className="rounded-blob border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-black">L’idée</div>
              <div className="mt-1 text-sm font-semibold text-black/75">
                Faire peu de choses, mais les faire très bien : smash, sauce maison, frites maison,
                produits frais, service rapide.
              </div>
            </div>
          </div>

          <MediaCard type="image" src={ASSETS.imgTeam} alt="L'équipe SBOOM" />
        </div>
      </WavyCard>

      {/* SECTION 2 */}
      <WavyCard>
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          <MediaCard type="video" src={ASSETS.videoSmash} />

          <div className="space-y-3">
            <div className="text-2xl font-black">Le “Smash” expliqué</div>
            <p className="text-sm font-semibold text-black/75">
              Le principe : on “smash” le steak sur une plaque très chaude. Ça crée une croûte
              caramélisée ultra savoureuse, tout en gardant l’intérieur juteux.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-blob border border-black/10 bg-black/5 p-4">
                <div className="text-sm font-black">Texture</div>
                <div className="mt-1 text-sm font-semibold text-black/75">
                  Croustillant dehors, moelleux dedans.
                </div>
              </div>
              <div className="rounded-blob border border-black/10 bg-black/5 p-4">
                <div className="text-sm font-black">Goût</div>
                <div className="mt-1 text-sm font-semibold text-black/75">
                  Plus de “Maillard”, plus de saveurs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </WavyCard>

      {/* SECTION 3 */}
      <WavyCard>
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          <div className="space-y-3">
            <div className="text-2xl font-black">Fait maison & local</div>
            <p className="text-sm font-semibold text-black/75">
              Chez SBOOM, on privilégie les ingrédients frais et locaux. Les sauces sont maison, les
              frites sont maison, et le burger reste simple : pas de blabla, juste du goût.
            </p>

            <div className="rounded-blob border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-black">La promesse SBOOM</div>
              <div className="mt-1 text-sm font-semibold text-black/75">
                Une carte claire, des recettes maîtrisées, et une expérience rapide, propre, et
                gourmande.
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Pill>Sauces maison</Pill>
              <Pill>Frites maison</Pill>
              <Pill>Produits frais</Pill>
            </div>
          </div>

          <MediaCard type="image" src={ASSETS.imgSmash} alt="Smash burger SBOOM" />
        </div>
      </WavyCard>

      {/* CTA FINAL */}
      <WavyCard>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-black">Prêt à goûter ?</div>
            <div className="mt-1 text-sm font-semibold text-black/70">
              Commande en 1 clic sur Uber Eats ou Just Eat (collection).
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href={UBER_EATS_URL} target="_blank" rel="noreferrer">
              <Button>Uber Eats</Button>
            </a>
            <a href={JUST_EAT_URL} target="_blank" rel="noreferrer">
              <Button variant="secondary">Just Eat</Button>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Button variant="black">Suivre sur Instagram</Button>
            </a>
          </div>
        </div>
      </WavyCard>
    </div>
  );
}
