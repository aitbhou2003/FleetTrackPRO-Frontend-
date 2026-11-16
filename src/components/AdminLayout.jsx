import { useState } from "react";
import { getTrucks } from "../api/trucks";
import TruckList from "./TruckList";
import UserList from "./UserList";
import { getUSers } from "../api/users";

export default function AdminLayout({ token }) {
  const [activeTabe, setActiveTabe] = useState("trucks");
  const [trucks, setTrucks] = useState([]);
  const [users, setUsers] = useState([]);

  async function handelTrucks() {
    setActiveTabe("trucks");
    const data = await getTrucks(token);
    setTrucks(data.trucks);
  }

  async function hundelUsers() {
    setActiveTabe("users");
    const data = await getUSers(token);
    setUsers(data.users);
  }

  return (
    <div className="w-100">
      {/* <!-- En-tête avec titre et barre d'onglets (Navigation) --> */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h3 className="fw-bold text-dark mb-0">Espace Administration</h3>

        <ul className="nav nav-pills">
          <li className="nav-item">
            {/* <!-- Onglet actif : ajouter la classe 'active' sur le bouton --> */}
            <button
              type="button"
              className={`nav-link ${activeTabe === "trucks" ? "active" : ""}`}
              onClick={handelTrucks}
            >
              Camions
            </button>
          </li>
          <li className="nav-item">
            {/* <!-- Onglet inactif --> */}
            <button
              type="button"
              className={`nav-link ${activeTabe === "users" ? "active" : ""}`}
              onClick={hundelUsers}
            >
              Utilisateurs
            </button>
          </li>
        </ul>
      </div>

      {/* <!-- Zone d'affichage du contenu selon l'onglet sélectionné --> */}
      <div className="bg-white p-4 rounded shadow-sm border">
        {activeTabe == "trucks" ? (
          <TruckList token={token} trucks={trucks} setTrucks={setTrucks} />
        ) : (
            <UserList token={token} users={users} setUser={setUsers} />
        )}
      </div>
    </div>
  );
}
