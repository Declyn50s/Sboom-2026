import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import { adminLogout } from "../../lib/storage";

const items = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Produits" },
  { to: "/admin/settings", label: "Contenu & médias" },
];

export default function AdminNav() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          className={({ isActive }) =>
            "rounded-full px-4 py-2 text-sm font-black border border-black/10 " +
            (isActive ? "bg-sboom-yellow shadow-punch" : "bg-black/5 hover:bg-black/10")
          }
        >
          {i.label}
        </NavLink>
      ))}

      <Button
        variant="black"
        className="ml-auto"
        onClick={() => {
          adminLogout();
          window.location.href = "/admin/login";
        }}
      >
        Déconnexion
      </Button>
    </div>
  );
}
