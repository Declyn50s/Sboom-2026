import { useMemo, useState } from "react";
import WavyCard from "../../components/WavyCard";
import Button from "../../components/Button";
import { loadDb, saveDb, type Product, type Category } from "../../lib/storage";

const cats: Category[] = ["Beef", "Chicken & Vege", "Sides", "Drinks", "Desserts", "Extras"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function csvToList(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AdminProducts() {
  const [tick, setTick] = useState(0);
  const db = useMemo(() => loadDb(), [tick]);

  // ✅ Draft complet (avec included + addOns)
  const [draft, setDraft] = useState<Product>({
    id: "",
    category: "Beef",
    name: "",
    description: "",
    priceBurger: 0,
    priceMenu: 0,
    badges: [],
    image: "",
    video: "",
    // @ts-expect-error - si ton type Product n'est pas encore mis à jour, ajoute included/addOns dans storage.ts
    included: [],
    // @ts-expect-error
    addOns: [],
  });

  function addProduct() {
    const id = draft.id.trim() || slugify(draft.category + "-" + draft.name);
    if (!draft.name.trim()) return alert("Nom requis.");

    const next = loadDb();
    if (next.products.some((p) => p.id === id)) return alert("ID déjà utilisé.");

    // ✅ sécurité : si Product n'a pas encore included/addOns, on évite de casser
    const withDefaults: any = {
      ...draft,
      id,
      badges: draft.badges.filter(Boolean),
      included: (draft as any).included ?? [],
      addOns: (draft as any).addOns ?? [],
    };

    next.products.unshift(withDefaults);
    saveDb(next);

    setDraft((d) => ({
      ...d,
      id: "",
      name: "",
      description: "",
      priceBurger: 0,
      priceMenu: 0,
      badges: [],
      image: "",
      video: "",
      // @ts-expect-error
      included: [],
      // @ts-expect-error
      addOns: [],
    }));
    setTick((t) => t + 1);
  }

  function updateProduct(id: string, patch: Partial<Product> | any) {
    const next = loadDb();
    next.products = next.products.map((p) => (p.id === id ? { ...p, ...patch } : p));
    saveDb(next);
    setTick((t) => t + 1);
  }

  function removeProduct(id: string) {
    const ok = confirm("Supprimer ce produit ?");
    if (!ok) return;
    const next = loadDb();
    next.products = next.products.filter((p) => p.id !== id);
    saveDb(next);
    setTick((t) => t + 1);
  }

  return (
    <div className="space-y-6">
      {/* ADD PRODUCT */}
      <WavyCard>
        <div className="text-2xl font-black">Ajouter un produit</div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-black">Catégorie</label>
            <select
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-black outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.category}
              onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as Category }))}
            >
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="text-xs font-black">Nom</label>
            <input
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="Ex: Big Sboom"
            />

            <label className="text-xs font-black">Description</label>
            <textarea
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              placeholder="Composition..."
            />

            {/* ✅ Inclus dans le burger */}
            <label className="text-xs font-black">Inclus (séparés par virgules)</label>
            <input
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              // @ts-expect-error
              value={(draft as any).included?.join(", ") ?? ""}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  // @ts-expect-error
                  included: csvToList(e.target.value),
                }))
              }
              placeholder="Buns briochés, 150gr boeuf, Double cheddar, ..."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-black">Prix Burger</label>
            <input
              type="number"
              step="0.1"
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.priceBurger}
              onChange={(e) => setDraft((d) => ({ ...d, priceBurger: Number(e.target.value) }))}
            />

            <label className="text-xs font-black">Prix Menu</label>
            <input
              type="number"
              step="0.1"
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.priceMenu}
              onChange={(e) => setDraft((d) => ({ ...d, priceMenu: Number(e.target.value) }))}
            />

            <label className="text-xs font-black">Badges (séparés par virgules)</label>
            <input
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.badges.join(", ")}
              onChange={(e) =>
                setDraft((d) => ({ ...d, badges: csvToList(e.target.value) }))
              }
              placeholder="Best seller, Crispy"
            />

            <label className="text-xs font-black">URL image (public)</label>
            <input
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.image || ""}
              onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
              placeholder="/media/images/..."
            />

            <label className="text-xs font-black">URL vidéo (public)</label>
            <input
              className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
              value={draft.video || ""}
              onChange={(e) => setDraft((d) => ({ ...d, video: e.target.value }))}
              placeholder="/media/videos/clip-1.mp4"
            />
          </div>
        </div>

        {/* ✅ Sélection des extras autorisés pour ce produit */}
        <div className="mt-5 rounded-blob border border-black/10 bg-black/5 p-4">
          <div className="text-sm font-black">Extras autorisés (en plus)</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {db.extras.map((ex) => {
              // @ts-expect-error
              const on = ((draft as any).addOns ?? []).includes(ex.id);
              return (
                <label key={ex.id} className="flex items-center gap-2 text-sm font-black">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => {
                      const cur: string[] = (draft as any).addOns ?? [];
                      const next = e.target.checked
                        ? Array.from(new Set([...cur, ex.id]))
                        : cur.filter((x) => x !== ex.id);
                      setDraft((d) => ({
                        ...d,
                        // @ts-expect-error
                        addOns: next,
                      }));
                    }}
                  />
                  {ex.name} <span className="text-black/60">({ex.price.toFixed(2)})</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={addProduct}>Ajouter</Button>
        </div>
      </WavyCard>

      {/* LIST PRODUCTS */}
      <WavyCard>
        <div className="text-2xl font-black">Produits</div>
        <div className="mt-4 space-y-3">
          {db.products.map((p) => {
            const included: string[] = ((p as any).included ?? []) as string[];
            const addOns: string[] = ((p as any).addOns ?? []) as string[];

            return (
              <div key={p.id} className="rounded-blob border border-black/10 bg-black/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-lg font-black">
                    {p.name}{" "}
                    <span className="text-black/60 text-sm">({p.category})</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const b = new Set(p.badges || []);
                        b.has("Best seller") ? b.delete("Best seller") : b.add("Best seller");
                        updateProduct(p.id, { badges: Array.from(b) });
                      }}
                    >
                      Toggle Best seller
                    </Button>
                    <Button variant="black" onClick={() => removeProduct(p.id)}>
                      Supprimer
                    </Button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <input
                    className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                    value={p.description}
                    onChange={(e) => updateProduct(p.id, { description: e.target.value })}
                  />
                  <input
                    className="rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                    value={p.video || ""}
                    onChange={(e) => updateProduct(p.id, { video: e.target.value })}
                    placeholder="/media/videos/clip-x.mp4"
                  />
                </div>

                {/* ✅ Inclus */}
                <div className="mt-3">
                  <div className="text-xs font-black text-black/60">Inclus (gratuit)</div>
                  <input
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-sboom-light px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-sboom-yellow/30"
                    value={included.join(", ")}
                    onChange={(e) => updateProduct(p.id, { included: csvToList(e.target.value) } as any)}
                    placeholder="Buns briochés, boeuf, cheddar, ..."
                  />
                </div>

                {/* ✅ Extras autorisés */}
                <div className="mt-3">
                  <div className="text-xs font-black text-black/60">Extras autorisés (en plus)</div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {db.extras.map((ex) => {
                      const on = addOns.includes(ex.id);
                      return (
                        <label key={ex.id} className="flex items-center gap-2 text-sm font-black">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? Array.from(new Set([...addOns, ex.id]))
                                : addOns.filter((x) => x !== ex.id);
                              updateProduct(p.id, { addOns: next } as any);
                            }}
                          />
                          {ex.name} <span className="text-black/60">({ex.price.toFixed(2)})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-sm font-black">
                  <span>Burger: {p.priceBurger.toFixed(2)}</span>
                  <span>Menu: {p.priceMenu.toFixed(2)}</span>
                  <span>Badges: {(p.badges || []).join(", ") || "—"}</span>
                  <span className="text-black/60">ID: {p.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </WavyCard>
    </div>
  );
}
