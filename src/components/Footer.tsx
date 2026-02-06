import { Link } from "react-router-dom";

const INSTAGRAM_URL = "https://www.instagram.com/sboom_burger/";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={"h-4 w-4 " + className}
      fill="currentColor"
    >
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.9 6.9a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-sboom-orange text-[#FAF4DE]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="md:w-1/3">
            <div className="text-lg font-black">SBOOM</div>
            <div className="mt-1 text-sm font-semibold text-[#FAF4DE]/80">
              UNE EXPLOSION EN BOUCHE !
            </div>
          </div>

          {/* Center logo */}
          <div className="flex items-center justify-center md:w-1/3">
            <img
              src="/media/images/Sboom-mascot-logo.jpg"
              alt="SBOOM mascot"
              className="h-24 w-auto"
              loading="lazy"
            />
          </div>

          {/* Right */}
          <nav className="flex flex-wrap justify-start gap-2 md:w-1/3 md:justify-end">
            <Link
              to="/mentions-legales"
              className="rounded-full border border-[#FAF4DE]/20 bg-black/10 px-4 py-2 text-sm font-black hover:bg-black/20"
            >
              Mentions légales
            </Link>

            <Link
              to="/jobs"
              className="rounded-full border border-[#FAF4DE]/20 bg-black/10 px-4 py-2 text-sm font-black hover:bg-black/20"
            >
              Jobs
            </Link>

            <a
              href="https://maps.app.goo.gl/1UmMX4UpxEJAUEAAA"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#FAF4DE]/20 bg-black/10 px-4 py-2 text-sm font-black hover:bg-black/20"
            >
              Adresse
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF4DE]/20 bg-black/10 px-4 py-2 text-sm font-black hover:bg-black/20"
            >
              <InstagramIcon />
              Instagram
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[#FAF4DE]/20 pt-4 text-xs font-semibold text-[#FAF4DE]/70 md:flex-row md:items-center md:justify-between">
          <div>© {year} SBOOM. Tous droits réservés.</div>
          <div>
            Conçu par{" "}
            <a
              href="https://declyn50s.github.io/"
              target="_blank"
              rel="noreferrer"
              className="font-black text-[#FAF4DE] hover:underline"
            >
              Derval Botuna
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
