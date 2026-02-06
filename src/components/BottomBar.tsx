import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function BottomBar() {
  const { pathname } = useLocation();
  const hide = pathname.startsWith("/admin") || pathname === "/checkout";
  if (hide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-3xl bg-sboom-light/95 backdrop-blur border border-black/10 p-2 shadow-punch">
          <div className="flex gap-2">
            <Link className="flex-1" to="/menu">
              <Button className="w-full" variant="secondary">La carte</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
