import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTrip } from "../../api/trips";
import { getUSers } from "../../api/users";
import { getTrucks } from "../../api/trucks";
import { getRemorques } from "../../api/remorques";

export default function TripForm({ token }) {
  const [siteDepart, setSiteDepart] = useState("");
  const [siteArrivee, setSiteArrivee] = useState("");
  const [marchandise, setMarchandise] = useState("");
  const [dateDebutPrevue, setDateDebutPrevue] = useState("");
  const [dateFinPrevue, setDateFinPrevue] = useState("");
  const [chauffeur, setChauffeur] = useState("");
  const [camion, setCamion] = useState("");
  const [remorque, setRemorque] = useState("");
  const [erreur, setErreur] = useState("");
  const [chauffeursList, setChauffeursList] = useState([]);
  const [camionsList, setCamionsList] = useState([]);
  const [remorquesList, setRemorquesList] = useState([]);
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    if (
      !siteDepart.trim() ||
      !siteArrivee.trim() ||
      !marchandise.trim() ||
      !dateDebutPrevue.trim() ||
      !dateFinPrevue.trim() ||
      !chauffeur.trim() ||
      !camion.trim() ||
      !remorque.trim()
    ) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }
    setErreur("");
    try {
      await createTrip(
        {
          siteDepart,
          siteArrivee,
          marchandise,
          dateDebutPrevue: new Date(dateDebutPrevue),
          dateFinPrevue: new Date(dateFinPrevue),
          chauffeur,
          camion,
          remorque,
        },
        token,
      );
      navigate("/admin/trajets");
    } catch (error) {
      setErreur(error.message);
    }
  }

  useEffect(() => {
    async function getChauffeurs() {
      try {
        const res = await getUSers(token);
        const users = (res.users || []).filter(
          (user) => user.statue == "actif" && user.role == "chauffeur",
        );
        setChauffeursList(users);
      } catch (error) {
        setErreur(error.message);
      }
    }
    async function getCamions() {
      try {
        const data = await getTrucks(token);
        setCamionsList(data.trucks || []);
      } catch (error) {
        console.error("loading trucks error : ", error);
      }
    }
    async function LoadRemoeques() {
      try {
        const data = await getRemorques(token);
        setRemorquesList(data.remorques);
      } catch (error) {
        console.error("loading remoruqe error :", error);
      }
    }
    if (token) {
      getChauffeurs();
      getCamions();
      LoadRemoeques();
    }
  }, [token]);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* <!-- En-tête --> */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold mb-0">Planifier un nouveau trajet</h3>
              <p className="text-muted small">
                Assignez les ressources et définissez l'itinéraire
              </p>
            </div>
            <Link to="/admin/trajets" className="btn btn-outline-secondary btn-sm">
              &larr; Retour à la liste
            </Link>
          </div>

          {/* <!-- Alerte en cas d'erreur / conflit 409 --> */}
          {/* <!-- {erreur && ( --> */}
          {erreur && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Attention :{erreur}</strong>
            </div>
          )}

          <div className="card shadow-sm border-0 p-4">
            <form onSubmit={handelSubmit}>
              {/* <!-- Section 1 : Itinéraire & Marchandise --> */}
              <h5 className="fw-bold text-primary mb-3">
                1. Itinéraire & Marchandise
              </h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Site de départ *</label>
                  <input
                    value={siteDepart}
                    onChange={(e) => setSiteDepart(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Ex: Casablanca Port"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Site d'arrivée *</label>
                  <input
                    value={siteArrivee}
                    onChange={(e) => setSiteArrivee(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Ex: Tanger Med"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Marchandise transportée *
                  </label>
                  <input
                    value={marchandise}
                    onChange={(e) => setMarchandise(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Ex: Pièces automobiles, Denrées..."
                    required
                  />
                </div>
              </div>

              {/* <!-- Section 2 : Planning des dates --> */}
              <h5 className="fw-bold text-primary mb-3">2. Planning</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Date de début prévue *
                  </label>
                  <input
                    value={dateDebutPrevue}
                    onChange={(e) => setDateDebutPrevue(e.target.value)}
                    type="date"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Date de fin prévue *
                  </label>
                  <input
                    value={dateFinPrevue}
                    onChange={(e) => setDateFinPrevue(e.target.value)}
                    type="date"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {/* <!-- Section 3 : Attribution des Ressources --> */}
              <h5 className="fw-bold text-primary mb-3">
                3. Attribution des Ressources
              </h5>
              <div className="row g-3 mb-4">
                {/* <!-- Chauffeur --> */}
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Chauffeur assigné *
                  </label>

                  <select
                    className="form-select"
                    required
                    value={chauffeur}
                    onChange={(e) => setChauffeur(e.target.value)}
                  >
                    <option value="">
                      -- Sélectionner un chauffeur actif --
                    </option>
                    {chauffeursList.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.firstName} {c.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <!-- Camion --> */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Camion tracteur *
                  </label>
                  <select
                    className="form-select"
                    required
                    value={camion}
                    onChange={(e) => setCamion(e.target.value)}
                  >
                    <option value="">-- Sélectionner un Camiom --</option>
                    {camionsList.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.immatriculation} - {c.marque}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <!-- Remorque --> */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Remorque attelée *
                  </label>
                  <select
                    className="form-select"
                    required
                    value={remorque}
                    onChange={(e) => setRemorque(e.target.value)}
                  >
                    <option value="">-- Sélectionner un Remorque --</option>
                    {remorquesList.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.immatriculation} - {r.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <!-- Boutons d'action --> */}
              <div className="d-flex justify-content-end gap-2 border-top pt-3">
                <Link to="/admin/trajets" className="btn btn-light">
                  Annuler
                </Link>
                <button type="submit" className="btn btn-primary px-4">
                  Créer et planifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
