import { useEffect, useState } from "react";
import { getRemorques } from "../../api/remorques";
import { Link } from "react-router-dom";
import RemorqueCard from "./RemorqueCard";

export default function RemorqueList({ token }) {
  const [remorques, setRemorques] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    async function loadRemorque() {
      try {
        const data = await getRemorques(token);
        setRemorques(data.remorques);
      } catch (error) {
        console.error("loading remoruqe error :", error);
      }
    }
    if (token) {
      loadRemorque();
    }
  }, [token]);

  const remorquesFiltred = remorques.filter((remorque) => {
    const search = searchItem.toLocaleLowerCase();
    const immat = remorque.immatriculation.toLocaleLowerCase();
    const type = remorque.type.toLocaleLowerCase();
    return immat.includes(search) || type.includes(search);
  });

  return (
    <div className="w-100">
      {/* <!-- En-tête : Titre + Bouton Link vers /admin/remorques/nouveau --> */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-0">Gestion des Remorques</h4>
          <span className="text-muted small">
            Total : {remorquesFiltred.length} remorque(s)
          </span>
        </div>

        {/* <!-- Lien vers la page de création --> */}
        <Link to="/admin/remorques/nouveau" className="btn btn-primary btn-sm">
          + Ajouter une remorque
        </Link>
      </div>

      {/* <!-- Barre de recherche locale --> */}
      <div className="mb-4">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Rechercher par immatriculation ou type..."
        />
      </div>

      <div className="row g-3">
        {remorquesFiltred.length == 0 ? (
          <div className="alert alert-info text-center my-4" role="alert">
            Aucune remorque trouvée.
          </div>
        ) : (
          <div className="row g-3">
            {remorquesFiltred.map((rem) => (
              <div className="col-12 col-md-6 col-lg-4" key={rem._id}>
                <RemorqueCard token={token} remorque={rem} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//   <div className="alert alert-info text-center my-4" role="alert">
//         Aucune remorque trouvée.
//       </div>
