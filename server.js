
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

console.log("Démarrage du serveur...");

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI;
console.log(`Connexion à MongoDB sur ${MONGO_URI}...`);
mongoose.connect(MONGO_URI, {
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