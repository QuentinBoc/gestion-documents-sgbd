const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre du document
    type: { type: String, required: true },  // Type de document (ex: PDF, Word, etc.)
    filename: { type: String, required: true }, // Nom du fichier stocké
    filePath: { type: String, required: true }, // Chemin où est stocké le fichier
    uploadedAt: { type: Date, default: Date.now }, // Date d'upload automatique
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false } // Référence à une catégorie
});

module.exports = mongoose.model('Document', documentSchema);

