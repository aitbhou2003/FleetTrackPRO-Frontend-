import { useState } from "react";
import UserCard from "./UserCard";
import UserForm from "./UserForm";

export default function UserList({ token, users, setUser }) {
  const [searchItem, setSearchItem] = useState("");
  const [showForm, setShowForm] = useState(false);

  const usersFiltred = users.filter((user) => {
    const search = searchItem.toLocaleLowerCase();
    const fName = user.firstName.toLocaleLowerCase();
    const lName = user.lastName.toLocaleLowerCase();
    const email = user.email.toLocaleLowerCase();
    return (
      fName.includes(search) || lName.includes(search) || email.includes(search)
    );
  });

  function hundelUserCreated(newUser) {
    setUser((prevUsers) => [newUser, ...prevUsers]);
    setShowForm(false);
  }

  function hundelStatusChange(updatedUser) {
    setUser((prevUsers) =>
      prevUsers.map((u) =>
        u._id === updatedUser.id || u._id === updatedUser._id
          ? { ...u, statue: updatedUser.statue }
          : u,
      ),
    );
  }
  return (
    <div className="w-100">
      {/* <!-- Barre d'outils : Titre + Bouton Ajouter --> */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-0">Gestion des Utilisateurs</h4>
          <span className="text-muted small">
            Total : {usersFiltred.length} utilisateur(s)
          </span>
        </div>

        {/* <!-- Bouton pour ouvrir / fermer le formulaire UserForm --> */}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          + Nouveau Chauffeur
        </button>
      </div>

      {showForm && (
        <UserForm
          token={token}
          onUserCreated={hundelUserCreated}
          onClose={() => setShowForm(!showForm)}
        />
      )}

      {/* <!-- Le composant UserForm sera inséré ici conditionnellement ({showForm && <UserForm ... />}) --> */}

      {/* <!-- Barre de recherche / filtre local --> */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom, prénom ou email..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      {/* <!-- Grille des utilisateurs (pour le .map) --> */}
      {usersFiltred.length == 0 ? (
        <div className="alert alert-info text-center my-4" role="alert">
          Aucun utilisateur trouvé.
        </div>
      ) : (
        <div className="row g-3">
          {usersFiltred.map((user) => (
            <div className="col-12 col-md-6 col-lg-4" key={user._id}>
              <UserCard
                user={user}
                token={token}
                onStatueChange={hundelStatusChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
