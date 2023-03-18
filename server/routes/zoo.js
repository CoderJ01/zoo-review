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

router.get('/', async (req, res) => {
    const zoos = await Zoo.find();
    res.send(zoos);
});

router.get('/:id', async (req, res) => {
    const zoo = await Zoo.findById({ _id: req.params.id });
    res.send(zoo);
});

router.patch('/:id', async (req, res) => {
    try {
        const zoo = await Zoo.findOne({ _id: req.params.id });

        if(req.body.name) {
            zoo.name = req.body.name;
        }

        if(req.body.image) {
            zoo.image = req.body.image;
        }

        zoo.save();
        res.send(zoo);
    }
    catch {
        res.status(404);
        res.send({ error: 'Post does not exists!'});
    }
})

module.exports = router;
