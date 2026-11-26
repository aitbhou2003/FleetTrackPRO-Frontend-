import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../../api/trips";
import TripCard from "./TripCard";

export default function TripList({ token }) {
  const [trips, setTrips] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    async function trips() {
      try {
        const res = await getTrips(token);
        setTrips(res?.trajets || []);
      } catch (error) {
        console.error(error);
      }
      trips();
    }
  }, [token]);

  const tripFiltred = trips.filter((trip) => {
    const search = searchItem.toLocaleLowerCase();
    const siteDepart = trip.siteDepart?.toLocaleLowerCase();
    const siteArrivee = trip.siteArrivee?.toLocaleLowerCase();
    const chauffeur =
      `${trip.chauffeur?.firstName} ${trip.chauffeur?.lastName}`.toLowerCase();

    const camiom = trip.camion.marque?.toLocaleLowerCase();
    const remorque = trip.remorque?.type.toLocaleLowerCase();
    return (
      siteDepart.includes(search) ||
      siteArrivee.includes(search) ||
      chauffeur.includes(search) ||
      camiom.includes(search) ||
      remorque.includes(search)
    );
  });

  return (
    <div className="w-100">
      {/* <!-- En-tête : Titre + Bouton vers la création --> */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-0">
            Gestion des Trajets & Missions
          </h4>
          <span className="text-muted small">
            Total : {tripFiltred.length} mission(s)
          </span>
        </div>

        <Link to="/admin/trajets/nouveau" className="btn btn-primary btn-sm">
          + Nouveau Trajet
        </Link>
      </div>

      {/* <!-- Barre de recherche locale --> */}
      <div className="mb-4">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Rechercher par ville de départ, arrivée ou marchandise..."
        />
      </div>

      {/* <!-- Grille des trajets (.map) --> */}
      {tripFiltred.length === 0 ? (
        <div className="alert alert-info text-center my-4" role="alert">
          Aucun trajet enregistré.
        </div>
      ) : (
        <div className="row g-3">
          {tripFiltred.map((trip) => (
            <div className="col-12 col-md-6" key={trip._id}>
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
