// Express.js
const router = require('express').Router();

// other imports
const Zoo = require('../../models/Zoo');

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
        res.send({ error: 'Zoo does not exists!'});
    }
});

router.delete('/:id', async (req, res) => {
    await Zoo.deleteOne({ _id: req.params.id });
    res.status(204).send();
});

module.exports = router;
