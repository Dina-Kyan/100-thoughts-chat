
const router = require('express').Router();
const Thought = require('../model/Thought');
const verify = require('./verifyToken');

router.post('/add', verify, async (req, res) => {
    const thought = new Thought({
        author: req.body.author,
        message: req.body.message,
    })

    try {
        const newThought = await thought.save();
        res.send(newThought)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const thoughts = await Thought.find().sort([['date', -1]]).limit(7).skip(7*(req.body.page-1));
        const count = await Thought.count();
        res.json({
            thoughts,
            totalPages: Math.ceil(count / 7)
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/author', async (req, res) => {
    try {
        const thoughts = await Thought.find({ author: req.body.author }).sort([['date', -1]]).limit(7).skip(7*(req.body.page-1));
        const count = await Thought.find({ author: req.body.author }).count();
        res.json({
            thoughts,
            totalPages: Math.ceil(count / 7)
        })
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router;