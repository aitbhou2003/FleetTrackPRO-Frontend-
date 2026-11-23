import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

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


  return (
      <AppRoutes
        user={user}
        token={token}
        onLoginSuccess={handelLoginSuccess}
        onLogout={handelLogOut}
      />
  );
}
