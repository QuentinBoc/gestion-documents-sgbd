const express = require('express');
const multer = require('multer');
const router = express.Router(); 
const Document = require('../models/document.model');
const Category = require('../models/category.model');
const documentController = require('../controllers/documents.controller');

router.get('/with-category', documentController.findAllWithCategory);

// Configuration du stockage des fichiers avec Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// Route pour l'upload du fichier
router.post('/', upload.single('file'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Aucun fichier reçu" });
    }
    next();
}, documentController.create);

// Route pour mettre à jour un document
router.put('/:id', async (req, res) => {
    try {
        const documentId = req.params.id;
        let updateData = { ...req.body };

        // Vérifier si une nouvelle catégorie est fournie
        if (req.body.categoryName) {
            let category = await Category.findOne({ name: req.body.categoryName });

            if (!category) {
                category = new Category({ name: req.body.categoryName });
                await category.save();
            }

            updateData.categoryId = category._id;
        }

        const updatedDocument = await Document.findByIdAndUpdate(
            documentId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: "Document non trouvé." });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
    }
});

// Route pour suppression de fichier
router.delete('/:id', documentController.deleteOne);

module.exports = router;