import { useState } from "react";

export default function AdminLayout({token}) {
  const [activeTabe, setActiveTabe] = useState("trucks");
  console.log("active  :", activeTabe);

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
              onClick={() => setActiveTabe("trucks")}
            >
              Camions
            </button>
          </li>
          <li className="nav-item">
            {/* <!-- Onglet inactif --> */}
            <button
              type="button"
              className={`nav-link ${activeTabe==='users'? "active" : ""}`}
              onClick={() => setActiveTabe("users")}
            >
              Utilisateurs
            </button>
          </li>
        </ul>
      </div>

      {/* <!-- Zone d'affichage du contenu selon l'onglet sélectionné --> */}
      <div className="bg-white p-4 rounded shadow-sm border">
        {activeTabe == "trucks" ? (
          <p className="text-muted">trucks</p>
        ) : (
          <p className="text-muted">users</p>
        )}
      </div>
    </div>
  );
}
