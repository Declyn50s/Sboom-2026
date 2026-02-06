import Button from "./Button";

export default function VideoHero() {
  const src = "/media/videos/clip-20.mp4";
  return (
    <div className="relative overflow-hidden rounded-blob border border-black/10 shadow-punch bg-sboom-black">
      <video
        className="h-[420px] w-full object-cover opacity-90"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-sboom-yellow px-4 py-2 text-xs font-black tracking-widest">
            ❤️ Smash Burger • 🍔 Frais & locaux
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-sboom-light">
            SBOOM! <span className="text-sboom-yellow">Une explosion</span> en bouche.
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base font-semibold text-sboom-light/90">
            Le smash qui claque. Le crispy qui craque. La sauce qui finit le travail.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/menu">
              <Button>Voir la carte</Button>
            </a>
          </div>
          <div className="mt-4 text-xs font-bold text-sboom-light/70">
            📍 En Budron H7, Box 14 — 1052 Le Mont-sur-Lausanne
          </div>
        </div>
      </div>
    </div>
  );
}
