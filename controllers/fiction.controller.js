const fictionService = require('../services/fiction.service');
const router = require('express').Router();

router.get('/getfictions', (req,res) => {
    fictionService.getFictions()
        .then(data=>res.status(200).json(data))
        .catch(err=>res.status(400).json(err));
});

module.exports = router;