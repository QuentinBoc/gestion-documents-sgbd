const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

console.log("Démarrage du serveur...");

// Connexion à MongoDB
console.log("Connexion à MongoDB...");
mongoose.connect('mongodb://localhost:27017/gestion-docs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connecté'))
    .catch(err => {
        console.error('Erreur de connexion MongoDB :', err);
        process.exit(1);
    });

// Initialisation d'Express et des middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Middleware chargé...");

// Importation des routes après activation des middlewares
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

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});