const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Nom unique de la catégorie
    description: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
