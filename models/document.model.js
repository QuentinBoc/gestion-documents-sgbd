const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre du document
    type: { type: String, required: true },  // Type de document (ex: PDF, Word, etc.)
    filename: { type: String, required: true }, // Nom du fichier stocké
    filePath: { type: String, required: true }, // Chemin où est stocké le fichier
    uploadedAt: { type: Date, default: Date.now } // Date d'upload automatique
});

module.exports = mongoose.model('Document', documentSchema);

