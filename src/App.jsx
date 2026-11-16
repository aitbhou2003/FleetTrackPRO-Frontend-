import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginForm from "./components/LoginForm";
import AdminLayout from "./components/AdminLayout";
import DriverLayout from "./components/DriverLayout";
import ProtectedView from "./components/ProtectedView";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  function handelLoginSuccess(user, token) {
    setUser(user);
    setToken(token);
  }

  function handelLogOut() {
    setUser(null);
    setToken(null);
  }
  if (!user) {
    return <LoginForm onLoginSuccess={handelLoginSuccess} />;
  }
  console.log(user);

  return (
    <>
      <AppShell user={user} onLogout={handelLogOut}>
        {user.userRole === "admin" ? (
          <ProtectedView user={user} allowedRoles={["admin"]}>
            <AdminLayout token={token} />
          </ProtectedView>
        ) : (
          <ProtectedView user={user} allowedRoles={['chauffeur']}>
            <DriverLayout token={token} user={user} />
          </ProtectedView>
        )}
      </AppShell>
    </>
  );
}
