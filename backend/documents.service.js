const Document = require('../models/document.model');

exports.getAllDocuments = async () => {
    return await Document.find().populate('categoryId');
};
