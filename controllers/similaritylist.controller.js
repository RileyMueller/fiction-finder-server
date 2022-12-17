const similaritylistService = require('../services/similaritylist.service');
const router = require('express').Router();

router.post('/createsimilaritylist', (req,res) => {
    const fiction_id = req.body.fiction_id;
    similaritylistService.createSimilarityList(fiction_id)
        .then(data=>res.status(201).json(data))
        .catch(err=>res.status(400).json(err));
});

module.exports = router;