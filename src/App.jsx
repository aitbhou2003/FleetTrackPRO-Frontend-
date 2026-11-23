import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginForm from "./components/LoginForm";
import AdminLayout from "./components/AdminLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import TruckList from "./components/TruckList";
import DriverLayout from "./components/DriverLayout";
import UserList from "./components/UserList";
import Forbidden403 from "./pages/Forbidden403";
import NotFound404 from "./pages/NotFound404";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  function handelLoginSuccess(user, token) {
    if (localStorage.getItem("token") == null) {
      localStorage.setItem("token", token);
    }
    if (localStorage.getItem("user") == null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }

  function handelLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  // console.log(user);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <LoginForm onLoginSuccess={handelLoginSuccess} />
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
            <AppShell user={user} onLogout={handelLogOut}>
              <AdminLayout token={token} />
            </AppShell>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"/admin/camions"} replace />} />
        <Route path="camions" element={<TruckList token={token} />} />
        <Route path="utilisateurs" element={<UserList token={token} />} />
      </Route>

      <Route
        path="chauffeur"
        element={
          <ProtectedRoute user={user} allowedRoles={["chauffeur"]}>
            <AppShell user={user} onLogout={handelLogOut}>
              <DriverLayout token={token} user={user} />
            </AppShell>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"/chauffeur/trajets"} replace />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>

      <Route path="/403" element={<Forbidden403 />} />
    </Routes>
  );
}

{
  /* <AppShell user={user} onLogout={handelLogOut}>
        {user.userRole === "admin" ? (
          <ProtectedView user={user} allowedRoles={["admin"]}>
            <AdminLayout token={token} />
          </ProtectedView>
        ) : (
          <ProtectedView user={user} allowedRoles={["chauffeur"]}>
            <DriverLayout token={token} user={user} />
          </ProtectedView>
        )}
      </AppShell> */
}
