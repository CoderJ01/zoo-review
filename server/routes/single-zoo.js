const router = require('express').Router();
const Zoo = require('../models/Zoo');

router.get('/:id', async (req, res) => {
    const zoo = await Zoo.findById({ _id: req.params.id });
    res.send(zoo);
});

module.exports = router;