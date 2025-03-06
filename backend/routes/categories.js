const express = require('express');
const router = express.Router();

// Route de test pour vérifier le bon fonctionnement
router.get('/', (req, res) => {
    res.json({ message: "Route /categories opérationnelle." });
});

module.exports = router;