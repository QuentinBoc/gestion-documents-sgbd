require('dotenv').config();
const mongoose = require('mongoose');
const Document = require('./models/document.model');
const Category = require('./models/category.model');

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gestion-docs';

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

// Fonction de seeding
const seedDatabase = async () => {
    try {
        // Suppression des anciennes données 
        await Document.deleteMany({});
        await Category.deleteMany({});
        console.log("Anciennes données supprimées.");

        // Ajout de catégories
        const categories = await Category.insertMany([
            { name: "Bon de Commande", description: "Documents pour les achats" },
            { name: "Transport", description: "Documents liés aux déplacements" },
            { name: "Demande Extra-Muros", description: "Documents pour les sorties scolaires" },
            { name: "Études de Marché", description: "Rapports d'analyse" }
        ]);
        console.log("Catégories ajoutées avec succès.");

        // Ajout de documents liés aux catégories
        const documents = await Document.insertMany([
            {
                title: "Modèle Bon de Commande",
                type: "PDF",
                filename: "modele_bon_commande.pdf",
                filePath: "/uploads/modele_bon_commande.pdf",
                categoryId: categories[0]._id
            },
            {
                title: "Formulaire Transport Scolaire",
                type: "PDF",
                filename: "formulaire_transport.pdf",
                filePath: "/uploads/formulaire_transport.pdf",
                categoryId: categories[1]._id
            },
            {
                title: "Demande Extra-Muros",
                type: "DOCX",
                filename: "demande_extra_muros.docx",
                filePath: "/uploads/demande_extra_muros.docx",
                categoryId: categories[2]._id
            }
        ]);
        console.log("Documents ajoutés avec succès.");

        // Fermer la connexion
        mongoose.connection.close();
        console.log("Seeding terminé, connexion MongoDB fermée.");
    } catch (error) {
        console.error("Erreur lors du seeding :", error);
        mongoose.connection.close();
    }
};

// Lancer le seeding
seedDatabase();
