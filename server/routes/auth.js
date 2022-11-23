const router = require('express').Router();
const User = require('../model/User');
const Thought = require('../model/Thought');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register Validation

router.post('/register', async (req, res) => {
    // user validate
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message });
    // check the username
    const userExist = await User.findOne({ name: req.body.name });
    if (userExist) return res.status(400).send({ message: 'username exists' });
    // check the email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ message: 'email exists' });
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //craete a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    // user validate
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ message: error.details[0].message });
    // check if user exists

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'email is invalid' });
    // password check
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ message: 'pasword is invalid' });
    // find the total

    const findTotal = await Thought.find({ author: user.name });
    const total = findTotal ? findTotal.length : 0;
    //create a token

    const token = jwt.sign({ _id: user._id, }, `${process.env.TOKEN_SECRET}`, { expiresIn: "1hr" });
    
    res.header('auth-token', token).send({ name: user.name, email: user.email, date: user.date, total, token });


})

module.exports = router;