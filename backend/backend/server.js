const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

console.log("Démarrage du serveur...");

// Connexion à MongoDB
console.log("Connexion à MongoDB...");
connectDB();

// Initialisation d'Express et des middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Middleware chargé...");

// Importation des routes 
try {
    console.log("Chargement des routes...");
    const documentsRouter = require('./routes/documents');
    const categoriesRouter = require('./routes/categories');

    app.use('/documents', documentsRouter);
    app.use('/categories', categoriesRouter);
    console.log("Routes chargées avec succès");
} catch (error) {
    console.error("Erreur lors du chargement des routes :", error);
    process.exit(1);
}

// Middleware de gestion global des erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});