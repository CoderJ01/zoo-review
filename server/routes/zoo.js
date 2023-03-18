const router = require('express').Router();
const Zoo = require('../models/Zoo');

router.post('/', async (req, res) => {
    const zoo = await Zoo.create({
        name: req.body.name,
        image: req.body.image,
    });
    zoo.save();
    res.send(zoo);
});

module.exports = router;
