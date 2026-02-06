export type CartMode = "BURGER" | "MENU";
export type CartExtra = { id: string; name: string; price: number };

export type CartLine = {
  lineId: string;
  productId: string;
  name: string;
  mode: CartMode;
  unitPrice: number;
  qty: number;
  extras: CartExtra[];
};

type CartState = { lines: CartLine[] };

const KEY = "sboom_cart_v1";

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

export function loadCart(): CartState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { lines: [] };
  try {
    return JSON.parse(raw) as CartState;
  } catch {
    return { lines: [] };
  }
}

export function saveCart(cart: CartState) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function addLine(input: Omit<CartLine, "lineId">) {
  const cart = loadCart();
  cart.lines.push({ ...input, lineId: uid() });
  saveCart(cart);
  return cart;
}

export function updateQty(lineId: string, qty: number) {
  const cart = loadCart();
  cart.lines = cart.lines.map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(1, qty) } : l));
  saveCart(cart);
  return cart;
}

export function removeLine(lineId: string) {
  const cart = loadCart();
  cart.lines = cart.lines.filter((l) => l.lineId !== lineId);
  saveCart(cart);
  return cart;
}

export function cartTotal(cart = loadCart()) {
  return cart.lines.reduce((sum, l) => {
    const extras = l.extras.reduce((e, x) => e + x.price, 0);
    return sum + (l.unitPrice + extras) * l.qty;
  }, 0);
}
