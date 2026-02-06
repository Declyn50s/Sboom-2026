import seed from "../data/seed.json";

export type Category =
  | "Beef"
  | "Chicken & Vege"
  | "Sides"
  | "Drinks"
  | "Desserts"
  | "Extras";

export type Badge = string;

export type Product = {
  id: string;
  category: Category;
  name: string;
  description: string;
  priceBurger: number;
  priceMenu: number;
  badges: Badge[];
  image?: string;
  video?: string;

  // ✅ Inclus dans le burger (gratuit)
  included: string[];

  // ✅ Extras payants autorisés (IDs qui pointent vers db.extras)
  addOns: string[];
};

export type SimpleItem = { id: string; name: string; price: number };

export type Db = {
  products: Product[];
  extras: SimpleItem[];
  drinks: SimpleItem[];
  sides: SimpleItem[];
  desserts: SimpleItem[];
};

const KEY = "sboom_db_v1";
const AUTH_KEY = "sboom_admin_auth_v1";

function normalizeDb(db: Db): Db {
  // ✅ sécurité si certains produits n'ont pas encore included/addOns dans le JSON/localStorage
  return {
    ...db,
    products: db.products.map((p) => ({
      ...p,
      included: Array.isArray((p as any).included) ? (p as any).included : [],
      addOns: Array.isArray((p as any).addOns) ? (p as any).addOns : [],
    })),
  };
}

export function loadDb(): Db {
  const raw = localStorage.getItem(KEY);

  if (!raw) return normalizeDb(seed as Db);

  try {
    return normalizeDb(JSON.parse(raw) as Db);
  } catch {
    return normalizeDb(seed as Db);
  }
}

export function saveDb(db: Db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function resetDb() {
  localStorage.removeItem(KEY);
}

export function isAdminAuthed(): boolean {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function adminLogin(username: string, password: string): boolean {
  // Demo credentials:
  // user: admin | pass: sboom
  if (username.trim().toLowerCase() === "admin" && password === "sboom") {
    localStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}
