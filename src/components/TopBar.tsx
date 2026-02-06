import { Link, NavLink, useLocation } from "react-router-dom";
import { loadCart } from "../lib/cart";

function Icon({ label }: { label: string }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-xs font-black">
      {label}
    </span>
  );
}

export default function TopBar() {
  const location = useLocation();
  const cartCount = loadCart().lines.reduce((s, l) => s + l.qty, 0);

  const nav = [
    { to: "/menu", label: "La carte" },
    { to: "/restaurant", label: "Restaurant" },
    { to: "/contact", label: "Contact" },
  ];

  const active = (p: { isActive: boolean }) =>
    p.isActive ? "bg-black/10" : "hover:bg-black/5";

  return (
    <header className="sticky top-0 z-40 bg-sboom-orange">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="SBOOM!"
            className="h-11 w-11 rounded-2xl bg-sboom-light p-1 shadow-punch"
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
          <div className="leading-tight">
            <div className="text-xl font-black tracking-tight text-sboom-light">SBOOM!</div>
            <div className="text-[11px] font-extrabold tracking-widest text-sboom-light/90">
              UNE EXPLOSION EN BOUCHE
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                "rounded-full px-4 py-2 text-sm font-black text-sboom-light " + (isActive ? "bg-black/15" : "hover:bg-black/10")
              }
            >
              {n.label}
            </NavLink>
          ))}
          <NavLink to="/account" className={() => "rounded-full px-2 py-2"}>
            <Icon label="👤" />
          </NavLink>
        </nav>

        {/* Mobile quick actions */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <Link to="/account" aria-label="Compte">
            <Icon label="👤" />
          </Link>
          <Link to="/cart" aria-label="Panier">
            <div className="relative">
              <Icon label="🛒" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-sboom-yellow px-2 py-0.5 text-[11px] font-black">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Secondary nav on mobile for key pages */}
      {["/", "/menu", "/restaurant", "/contact"].includes(location.pathname) && (
        <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
          <div className="flex gap-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  "flex-1 rounded-full px-4 py-2 text-center text-sm font-black text-sboom-light " +
                  (isActive ? "bg-black/15" : "bg-black/5")
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
