const Document = require('../models/document.model');
const Category = require('../models/category.model');

const getAllDocuments = async () => {
    return await Document.find();
};

const getDocumentsWithCategory = async () => {
    return await Document.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }
    ]);
};

module.exports = {
    getAllDocuments,
    getDocumentsWithCategory
};
