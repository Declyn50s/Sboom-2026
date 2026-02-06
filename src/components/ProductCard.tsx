import { Link } from "react-router-dom";
import type { Product } from "../lib/storage";
import Button from "./Button";
import { addLine } from "../lib/cart";

export default function ProductCard({ p }: { p: Product }) {
  const badge = p.badges?.[0];

  return (
    <div className="wavy border border-black/10 bg-sboom-light shadow-punch">
      <div className="relative p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xl font-black">{p.name}</div>
            <div className="mt-1 text-sm font-semibold text-black/70 line-clamp-2">
              {p.description}
            </div>
          </div>
          {badge && (
            <span className="rounded-full bg-sboom-yellow px-3 py-1 text-xs font-black">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="text-sm font-black">
            <span className="text-black/70">Burger</span> {p.priceBurger.toFixed(2)}{" "}
            <span className="text-black/70">• Menu</span> {p.priceMenu.toFixed(2)}
          </div>
          <Link to={`/product/${p.id}`}>
            <Button variant="ghost" className="px-4 py-2">Détails</Button>
          </Link>
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            className="flex-1"
            onClick={() =>
              addLine({
                productId: p.id,
                name: p.name,
                mode: "BURGER",
                unitPrice: p.priceBurger,
                qty: 1,
                extras: [],
              })
            }
          >
            + Burger
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() =>
              addLine({
                productId: p.id,
                name: p.name,
                mode: "MENU",
                unitPrice: p.priceMenu,
                qty: 1,
                extras: [],
              })
            }
          >
            + Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
