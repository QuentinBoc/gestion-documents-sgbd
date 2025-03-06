const Joi = require('joi');

// Schéma de validation pour un document
const documentSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    type: Joi.string().valid('PDF', 'DOCX', 'TXT').required(),
    categoryName: Joi.string().optional(),
    categoryId: Joi.string().optional(),
});

module.exports = documentSchema;