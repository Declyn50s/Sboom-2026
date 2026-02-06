import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { loadDb, resetDb, saveDb } from "../../lib/storage";

export default function AdminDashboard() {
  const db = loadDb();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <WavyCard className="md:col-span-2">
        <div className="text-2xl font-black">Aperçu</div>
        <div className="mt-2 text-sm font-semibold text-black/70">
          FO lit ces données depuis localStorage (démo). Le BO les modifie.
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-blob bg-black/5 p-4 border border-black/10">
            <div className="text-sm font-bold text-black/60">Produits</div>
            <div className="text-3xl font-black">{db.products.length}</div>
          </div>
          <div className="rounded-blob bg-black/5 p-4 border border-black/10">
            <div className="text-sm font-bold text-black/60">Extras</div>
            <div className="text-3xl font-black">{db.extras.length}</div>
          </div>
          <div className="rounded-blob bg-black/5 p-4 border border-black/10">
            <div className="text-sm font-bold text-black/60">Contenu</div>
            <div className="text-3xl font-black">OK</div>
          </div>
        </div>
      </WavyCard>

      <WavyCard>
        <div className="text-2xl font-black">Outils</div>
        <div className="mt-3 space-y-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              resetDb();
              alert("DB réinitialisée (seed). Recharge la page.");
              window.location.reload();
            }}
          >
            Reset DB (seed)
          </Button>

          <Button
            className="w-full"
            onClick={() => {
              // Quick demo: toggle best seller on first product
              const copy = loadDb();
              if (copy.products[0]) {
                const b = new Set(copy.products[0].badges || []);
                b.has("Best seller") ? b.delete("Best seller") : b.add("Best seller");
                copy.products[0].badges = Array.from(b);
                saveDb(copy);
                alert("Démo : badge modifié. Va voir le FO (Home).");
              }
            }}
          >
            Démo : toggle Best Seller
          </Button>
        </div>
      </WavyCard>
    </div>
  );
}
