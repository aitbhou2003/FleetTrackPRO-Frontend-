import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginForm from "./components/LoginForm";
import AdminLayout from "./components/AdminLayout";
import DriverLayout from "./components/DriverLayout";
import ProtectedView from "./components/ProtectedView";

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
  if (!user) {
    return <LoginForm onLoginSuccess={handelLoginSuccess} />;
  }
  // console.log(user);

  return (
    <>
      <AppShell user={user} onLogout={handelLogOut}>
        {user.userRole === "admin" ? (
          <ProtectedView user={user} allowedRoles={["admin"]}>
            <AdminLayout token={token} />
          </ProtectedView>
        ) : (
          <ProtectedView user={user} allowedRoles={["chauffeur"]}>
            <DriverLayout token={token} user={user} />
          </ProtectedView>
        )}
      </AppShell>
    </>
  );
}
