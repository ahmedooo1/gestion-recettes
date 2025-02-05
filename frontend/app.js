// Fonction pour afficher la section recettes après connexion
function showRecettes() {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("recettes-section").style.display = "block";
    loadRecettes();
}

// ✅ Inscription
document.getElementById("register-btn").addEventListener("click", function () {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Erreur d'inscription:", error));
});

// ✅ Connexion
document.getElementById("login-btn").addEventListener("click", function () {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("✅ Connexion réussie !");
            showRecettes();
        } else {
            alert("❌ Identifiants invalides !");
        }
    })
    .catch(error => console.error("Erreur de connexion:", error));
});

// ✅ Charger les recettes après connexion
function loadRecettes() {
    fetch("http://localhost:8080/api.php")
    .then(response => response.json())
    .then(recettes => {
        const recettesList = document.getElementById("recettes");
        recettesList.innerHTML = "";
        recettes.forEach(recette => {
            const li = document.createElement("li");
            li.textContent = `${recette.titre} - ${recette.description}`;
            recettesList.appendChild(li);
        });
    })
    .catch(error => console.error("Erreur de chargement des recettes:", error));
}
