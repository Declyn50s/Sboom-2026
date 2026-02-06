import { Navigate, Outlet, useLocation } from "react-router-dom";
import WavyCard from "../../components/WavyCard";
import { isAdminAuthed } from "../../lib/storage";
import AdminNav from "./AdminNav";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/admin/login";

  if (!isLogin && !isAdminAuthed()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="space-y-6">
      <WavyCard className="bg-sboom-light">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-black">Back Office — SBOOM</div>
            <div className="text-sm font-semibold text-black/70">
              Modifie le FO : produits, vidéos, contenus.
            </div>
          </div>
          <a className="text-sm font-black underline" href="/" target="_self">
            Voir le site
          </a>
        </div>
        <div className="mt-4">
          <AdminNav />
        </div>
      </WavyCard>

      <Outlet />
    </div>
  );
}
