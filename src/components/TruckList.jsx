import { useState } from "react";
import TruckCared from "./TruckCard";
import TruckForm from "./TruckForm";

export default function TruckList({ trucks, token, setTrucks }) {
  const [searchItem, setSearchItem] = useState("");
  const [showForm, setShowForm] = useState(false);

  const trucksFiltred = trucks.filter((truck) => {
    const search = searchItem.toLocaleLowerCase();
    const immat = truck.immatriculation.toLocaleLowerCase();
    const marque = truck.marque.toLocaleLowerCase();
    return immat.includes(search) || marque.includes(search);
  });

  function handleTruckCreated(newTruck) {
    setTrucks((prevTrucks) => [newTruck, ...prevTrucks]);
    setShowForm(false);
  }

  return (
    <div className="w-100">
      {/* <!-- Barre d'outils : Titre + Bouton Ajouter --> */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-0">Gestion de la Flotte</h4>
          <span className="text-muted small">
            Total : {trucksFiltred.length} camion(s)
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          + Ajouter un camion
        </button>
      </div>
      {showForm && (
        <TruckForm
          token={token}
          onClose={() => setShowForm(false)}
          onTruckCreated={handleTruckCreated}
        />
      )}

      {/* <!-- Barre de filtre/recherche locale --> */}
      <div className="mb-4">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Rechercher par immatriculation ou modèle..."
        />
      </div>

      {/* <!-- Grille des camions (pour le .map) --> */}
      {trucksFiltred.length === 0 ? (
        <div className="alert alert-info text-center my-4" role="alert">
          Aucun camion trouvé.
        </div>
      ) : (
        <div className="row g-3">
          {trucksFiltred.map((truck) => (
            <div className="col-12 col-md-6 col-lg-4" key={truck._id}>
              <TruckCared truck={truck} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
