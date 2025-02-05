const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "secret123"; // Clé secrète pour JWT

// Charger les utilisateurs
let users = [];
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
}
app.get("/ping", (req, res) => {
res.status(200).json({ message: "pong" });
});

// Inscription
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Ajouter l'utilisateur (sans hachage)
    users.push({ username, password });
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Inscription réussie" });
});

// Connexion
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Générer un token JWT simple
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Connexion réussie", token });
});

// Démarrer le serveur
app.listen(3000, () => console.log("Serveur Node.js en écoute sur le port 3000"));


module.exports = app;