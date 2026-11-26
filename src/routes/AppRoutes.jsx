import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AppShell from "../components/common/AppShell";
import AdminLayout from "../components/admin/AdminLayout";
import DriverLayout from "../components/chauffeur/DriverLayout";
import LoginForm from "../pages/LoginForm";
import TruckList from "../components/admin/TruckList";
import UserList from "../components/admin/UserList";
import NotFound404 from "../pages/NotFound404";
import Forbidden403 from "../pages/Forbidden403";
import RemorqueList from "../components/admin/RemorqueList";
import RemorqueForm from "../components/admin/RemorqueForm";
import RemorqueDetail from "../components/admin/RemorqueDetail";
import TripList from "../components/admin/TripList";
import TripForm from "../components/admin/TripForm";

export default function AppRoutes({ token, user, onLoginSuccess, onLogout }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <LoginForm onLoginSuccess={onLoginSuccess} />
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to={"/login"} replace />
          ) : user.userRole === "admin" ? (
            <Navigate to={"/admin/camions"} replace />
          ) : (
            <Navigate to={"/chauffeur/trajets"} />
          )
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} allowedRoles={["admin"]}>
            <AppShell user={user} onLogout={onLogout}>
              <AdminLayout token={token} />
            </AppShell>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"/admin/camions"} replace />} />
        <Route path="camions" element={<TruckList token={token} />} />
        <Route path="utilisateurs" element={<UserList token={token} />} />
        <Route path="remorques" element={<RemorqueList token={token} />} />
        <Route
          path="remorques/nouveau"
          element={<RemorqueForm token={token} />}
        />
        <Route
          path={`remorques/:id`}
          element={<RemorqueDetail token={token} />}
        />
        <Route path="trajets" element={<TripList token={token} />} />
        <Route path="trajets/nouveau" element={<TripForm token={token} />} />
      </Route>

      <Route
        path="chauffeur"
        element={
          <ProtectedRoute user={user} allowedRoles={["chauffeur"]}>
            <AppShell user={user} onLogout={onLogout}>
              <DriverLayout token={token} user={user} />
            </AppShell>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"/chauffeur/trajets"} replace />} />
      </Route>

      <Route path="*" element={<NotFound404 />} />
      <Route path="/403" element={<Forbidden403 />} />
    </Routes>
  );
}
