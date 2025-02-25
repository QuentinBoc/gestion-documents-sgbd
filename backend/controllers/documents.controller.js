const fs = require('fs');
const path = require('path');
const Document = require('../models/document.model');

const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

exports.findAll = async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });
        res.json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const document = new Document({
            title: req.body.title,
            type: req.body.type,
            filename: req.file.filename,
            filePath: `/uploads/${req.file.filename}`
        });

        await document.save();
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        fs.unlinkSync(path.join(__dirname, '../uploads', document.filename));
        await document.remove();
        res.json({ message: 'Document deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
