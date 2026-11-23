import { useState } from "react";
import { getMyTrips } from "../api/trips";
import { TripCard } from "./TripCard";
import { NavLink, Outlet } from "react-router-dom";

export default function DriverLayout({ user, token }) {
  const [erreur, setErreur] = useState("");
  const [trips, setTrips] = useState([]);

  async function hundelTrips() {
    try {
      const res = await getMyTrips(token);
      setTrips(res.trajets);
      console.log("trips", res);
    } catch (error) {
      setErreur(error.message);
    }
  }

  return (
    <div className="w-100">
      {/* <!-- Carte de bienvenue pour le chauffeur avec ses infos réelles --> */}
      <div className="card shadow-sm border-0 mb-4 bg-primary text-white p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1">Espace Chauffeur</h3>
            <p className="mb-0 text-white-50">
              Bienvenue, <strong>{user.userFullName}</strong> (ID: {user.userId}
              )
            </p>
          </div>
          <span className="badge bg-light text-primary fs-6 px-3 py-2">
            Chauffeur
          </span>
        </div>
      </div>

      {/* <!-- Section "Mes Trajets" --> */}
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <div>
            <h4 className="fw-bold text-dark mb-0">Mes Trajets</h4>
            <span className="text-muted small">
              Total : {trips.length} mission(s)
            </span>
          </div>

          {/* <!-- Bouton pour actualiser / charger les missions depuis l'API --> */}
          <NavLink
            className="btn btn-outline-primary btn-sm"
            to={"/chauffeur/trajets"}
          >
            Actualiser mes trajets
          </NavLink>
        </div>

        {/* {erreur && (
          <div className="alert alert-danger py-2 small" role="alert">
            {erreur}
          </div>
        )}

        {trips.length == 0 ? (
          <div className="alert alert-info text-center my-3" role="alert">
            Aucun trajet assigné pour le moment.
          </div>
        ) : (
          trips.map((trip) => (
            <div className="mt-3" key={trip._id}>
              <TripCard trip={trip} />
            </div>
          ))
        )} */}

        <Outlet />
      </div>
    </div>
  );
}
