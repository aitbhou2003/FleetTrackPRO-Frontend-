import { useState } from "react";
import { updateTruck } from "../api/trucks";

export default function TruckEditModal({
  truck,
  token,
  onClose,
  ontruckUpdated,
}) {
  const [immatriculation, setImmatruculation] = useState(truck.immatriculation);
  const [marque, setMarque] = useState(truck.marque);
  const [kilometrageTotal, setKilometrage] = useState(truck.kilometrageTotal);
  const [statut, setStatut] = useState(truck.statut);

  async function hundelSubmit(e) {
    e.preventDefault();
    const res = await updateTruck(
      { immatriculation, marque, kilometrageTotal, statut },
      truck._id,
      token,
    );
    onClose(res.truck._d);
    ontruckUpdated(res.truck);
  }
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          {/* <!-- En-tête de la modale --> */}
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">Modifier le Camion</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Fermer"
              onClick={onClose}
            ></button>
          </div>

          {/* <!-- Formulaire --> */}
          <form onSubmit={hundelSubmit}>
            <div className="modal-body p-4">
              {/* <!-- Alerte d'erreur éventuelle --> */}
              <div className="alert alert-danger py-2 small" role="alert">
                Message d'erreur
              </div>

              {/* <!-- Champ Immatriculation --> */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Immatriculation
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: 12345-A-26"
                  value={immatriculation}
                  onChange={(e) => setImmatruculation(e.target.value)}
                />
              </div>

              {/* <!-- Champ Marque --> */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Marque / Modèle
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: Volvo FH16"
                  value={marque}
                  onChange={(e) => setMarque(e.target.value)}
                />
              </div>

              {/* <!-- Champ Kilométrage --> */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Kilométrage total
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="ex: 100000"
                  value={kilometrageTotal}
                  onChange={(e) => setKilometrage(e.target.value)}
                />
              </div>

              {/* <!-- Champ Statut (menu déroulant) --> */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Statut</label>
                <select
                  className="form-select"
                  value={statut}
                  onChange={(e) => setStatut(e.target.value)}
                >
                  <option value="disponible">Disponible</option>
                  <option value="en_trajet">En trajet</option>
                  <option value="en_maintenance">En maintenance</option>
                </select>
              </div>
            </div>

            {/* <!-- Boutons d'action --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
