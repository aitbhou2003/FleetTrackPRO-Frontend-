import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { jwtDecode } from "jwt-decode";

function validExp() {
  const saveToken = localStorage.getItem("token");
  const saveUser = localStorage.getItem("user");

  if (!saveToken || !saveToken) {
    return { user: null, token: null };
  }
  try {
    const decode = jwtDecode(saveToken);
    if (decode.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, token: null };
    }

    return {
      user: JSON.parse(saveUser),
      token: saveToken,
    };
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { user: null, token: null };
  }
}

export default function App() {
  const initialSession = validExp();
  const [user, setUser] = useState(initialSession.user);
  const [token, setToken] = useState(initialSession.token);

  function handelLoginSuccess(user, token) {
    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setToken(token);
  }

  function handelLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  useEffect(() => {
    if (!token) return;

    try {
      const decode = jwtDecode(token);
      const tempRest = decode.exp * 1000 - Date.now();

      if (tempRest <= 0) {
        handelLogOut();
      } else {
        const timer = setTimeout(() => {
          alert("votre session a expire ");
          handelLogOut();
        }, tempRest);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      handelLogOut();
    }
  }, [token]);

  return (
    <AppRoutes
      user={user}
      token={token}
      onLoginSuccess={handelLoginSuccess}
      onLogout={handelLogOut}
    />
  );
}
