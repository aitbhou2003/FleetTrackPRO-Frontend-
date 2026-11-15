import { useState } from "react";
import { getTrucks } from "../api/trucks";
import TruckCared from "./TruckCard";

export default function TruckList({ trucks, token }) {
  return (
    <div className="w-100">
      {/* <!-- Barre d'outils : Titre + Bouton Ajouter --> */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-0">Gestion de la Flotte</h4>
          <span className="text-muted small">
            Total : {trucks.length} camion(s)
          </span>
        </div>

        <button type="button" className="btn btn-primary btn-sm">
          + Ajouter un camion
        </button>
      </div>

      {/* <!-- Barre de filtre/recherche locale --> */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par immatriculation ou modèle..."
        />
      </div>

      {/* <!-- Grille des camions (pour le .map) --> */}
      {trucks.length === 0 ? (
        <div className="alert alert-info text-center my-4" role="alert">
          Aucun camion trouvé.
        </div>
      ) : (
        <div className="row g-3">
          {trucks.map((truck) => (
            <div className="col-12 col-md-6 col-lg-4" key={truck._id}>
              <TruckCared truck={truck} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
