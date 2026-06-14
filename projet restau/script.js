// script.js (version corrigée — pas de template literals, pas d'erreurs de syntaxe)

// ---------- Gestion du panier ----------
var panier = [];

// Ajoute un article au panier
function ajouterAuPanier(nom, prix) {
  panier.push({ nom: nom, prix: Number(prix) });
  alert(nom + " ajouté à votre commande !");
  calculerTotal();
}

// Calcule le total et met à jour l'affichage (élément avec id="total")
function calculerTotal() {
  var total = panier.reduce(function (s, item) { return s + (Number(item.prix) || 0); }, 0);
  var totalDiv = document.getElementById("total");
  if (totalDiv) {
    totalDiv.innerHTML = "Total actuel : " + total.toFixed(2) + " $";
  }
  return total;
}

function buildCommandeString() {
  return panier.map(function (item) {
    return item.nom + " (" + Number(item.prix).toFixed(2) + " $)";
  }).join(", ");
}

function envoyerCommande(data) {
  return fetch("save_order.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    if (json.success) {
      return true;
    }
    throw new Error(json.message || "Erreur lors de l'enregistrement de la commande.");
  });
}

// Confirme la commande : demande le budget et envoie au serveur
function confirmerCommande() {
  var nomClientEl = document.getElementById("clientNom");
  var tableEl = document.getElementById("numeroTable");
  var clientNom = nomClientEl ? nomClientEl.value.trim() : "";
  var table = tableEl ? tableEl.value : "";

  if (clientNom === "") {
    alert("Veuillez indiquer votre nom.");
    return;
  }

  if (table === "") {
    alert("Veuillez choisir votre numéro de table.");
    return;
  }

  var total = calculerTotal();

  if (total === 0) {
    alert("Vous n'avez encore rien choisi !");
    return;
  }

  var saisie = prompt("Entrez votre budget ($) :");
  var budget = parseFloat(saisie);
  if (isNaN(budget)) {
    alert("Veuillez entrer un nombre valide pour le budget.");
    return;
  }

  if (budget < total) {
    var manque = (total - budget).toFixed(2);
    alert("Budget insuffisant !\nTotal : " + total.toFixed(2) + " $\nIl vous manque " + manque + " $");
    return;
  }

  var commandeTexte = buildCommandeString();
  var data = {
    nom_client: clientNom,
    table_numero: table,
    commande: commandeTexte,
    total: total.toFixed(2),
    paiement: "Sur place"
  };

  envoyerCommande(data)
    .then(function () {
      var reste = (budget - total).toFixed(2);
      alert("Votre commande est confirmée !\nTotal : " + total.toFixed(2) + " $\nReste : " + reste + " $");
      panier = [];
      if (nomClientEl) {
        nomClientEl.value = "";
      }
      if (tableEl) {
        tableEl.value = "";
      }
      calculerTotal();
    })
    .catch(function (error) {
      alert(error.message || "Impossible d'envoyer la commande. Vérifiez votre serveur.");
    });
}

// ---------- Admin (sécurité) ----------
var ADMIN_PASSWORD = "admin123"; // modifie ici si tu veux

// Ouvre la page admin après saisie du mot de passe
function loginAdmin() {
  var pass = prompt("Entrez le mot de passe administrateur :");
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("adminConnecte", "oui");
    window.location.href = "admin.php";
  } else {
    alert("Accès refusé !");
  }
}

// À appeler dans admin.php dès le chargement pour vérifier l'accès
function verifierAccesAdmin() {
  var acces = sessionStorage.getItem("adminConnecte");
  if (acces !== "oui") {
    alert("Accès réservé à l'administrateur !");
    window.location.href = "index.html";
  }
}

// Déconnexion
function deconnexionAdmin() {
  sessionStorage.removeItem("adminConnecte");
  alert("Déconnexion réussie !");
  window.location.href = "index.html";
}

// ---------- Formulaire contact (simple simulation) ----------
function envoyerMessage() {
  var nomEl = document.getElementById("nom");
  var messageEl = document.getElementById("message");
  var emailEl = document.getElementById("email");

  var nom = nomEl ? nomEl.value.trim() : "";
  var message = messageEl ? messageEl.value.trim() : "";
  var email = emailEl ? emailEl.value.trim() : "";

  if (nom === "" || message === "" || email === "") {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  // Simulation d'envoi
  alert("Merci " + nom + ", votre message a bien été envoyé !");
  if (nomEl) nomEl.value = "";
  if (emailEl) emailEl.value = "";
  if (messageEl) messageEl.value = "";
}

function annulerCommande() {
  if (panier.length === 0) {
    alert("Aucune commande à annuler.");
    return;
  }

  var confirmation = confirm("Voulez-vous vraiment annuler toute la commande ?");
  if (confirmation) {
    panier = [];
    calculerTotal();
    alert("Votre commande a été annulée.");
  }
}

// Expose certaines fonctions globalement si besoin depuis HTML inline
window.ajouterAuPanier = ajouterAuPanier;
window.calculerTotal = calculerTotal;
window.confirmerCommande = confirmerCommande;
window.loginAdmin = loginAdmin;
window.verifierAccesAdmin = verifierAccesAdmin;
window.deconnexionAdmin = deconnexionAdmin;
window.logout = deconnexionAdmin;
window.envoyerMessage = envoyerMessage;
function ouvrirCategorie(id){

    var sections =
    document.querySelectorAll(".menu-section");

    sections.forEach(function(section){
        section.style.display = "none";
    });

    document.getElementById(id)
    .style.display = "block";

    document.getElementById(id)
    .scrollIntoView({
        behavior:"smooth"
    });

}function filtrerUnivers(univers) {
  // Afficher le conteneur des sous-catégories
  document.getElementById("sub-categories").style.display = "block";
  
  // Masquer les deux groupes d'abord
  document.getElementById("group-bar").style.display = "none";
  document.getElementById("group-restaurant").style.display = "none";
  
  // Masquer toutes les sections de produits ouvertes pour nettoyer l'écran
  var sections = document.querySelectorAll(".menu-section");
  sections.forEach(function(section) {
    section.style.display = "none";
  });

  // Afficher le groupe sélectionné
  if (univers === 'bar') {
    document.getElementById("group-bar").style.display = "flex";
  } else if (univers === 'restaurant') {
    document.getElementById("group-restaurant").style.display = "flex";
  }
  
  // Scroll fluide vers les sous-catégories
  document.getElementById("sub-categories").scrollIntoView({ behavior: "smooth" });
}

window.ouvrirCategorie = ouvrirCategorie;
window.annulerCommande = annulerCommande;
function ouvrirPaiement(){

    alert(
    "Paiement disponible via :\n\n" +
    "M-Pesa\n" +
    "Airtel Money\n" +
    "Orange Money\n\n" +
    "Numéro : +243 976 811 174"
    );

}