const Document = require('../models/document.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Category = require('../models/category.model');
const documentSchema = require('../validations/document.validation');
const { error } = require('console');

// Configuration de Multer pour l'upload
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// Récupérer tous les documents avec leur catégorie
exports.findAllWithCategory = async (req, res) => {
    try {
        const documents = await Document.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            }
        ]);
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Récupérer un document par ID
exports.findOne = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            const error = new Error("Document non trouvé");
            error.status = 404;
            throw error;
        }
        res.json(document);
    } catch (err) {
        next(err);
    }
};

// Ajouter un document
exports.create = async (req, res) => {
    try {
        // Validation des données reçues
        const { error } = documentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });

        let categoryId = null;
        if (req.body.categoryName) {
            let category = await Category.findOne({ name: req.body.categoryName });

            if (!category) {
                category = new Category({ name: req.body.categoryName });
                await category.save();
            }

            categoryId = category._id;
        }

        const document = new Document({
            title: req.body.title,
            type: req.body.type,
            filename: req.file.filename,
            filePath: `/uploads/${req.file.filename}`,
            uploadedAt: new Date(),
            categoryId: categoryId
        });

        await document.save();
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer un document et son fichier
exports.deleteOne = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document non trouvé' });

        const filePath = path.join(uploadPath, document.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un document
exports.update = async (req, res) => {
    try {
        const documentId = req.params.id;
        let categoryId = null;

        // Vérifier si une catégorie est spécifiée et récupérer son ID
        if (req.body.categoryName) {
            let category = await Category.findOne({ name: req.body.categoryName });

            if (!category) {
                category = new Category({ name: req.body.categoryName });
                await category.save();
            }

            categoryId = category._id;
        } else if (req.body.categoryId) {
            categoryId = req.body.categoryId; 
        }

        // Définir les données à mettre à jour
        let updateData = { title: req.body.title };
        if (categoryId) updateData.categoryId = categoryId;

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
};

// Exporter l'upload pour l'utiliser dans la route
exports.upload = upload;