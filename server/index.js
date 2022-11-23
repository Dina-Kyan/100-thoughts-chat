
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json())
app.use(cors());

const authRoute = require('./routes/auth');
const thoughtRoute = require('./routes/thoughts')

app.use('/user', authRoute);
app.use('/thoughts', thoughtRoute);

app.get('/', (req, res) => {
    res.send('Hello world');
})



mongoose.connect(process.env.DB_CONNECTION, ()=> console.log('db connected'));
app.listen(process.env.SERVER, ()=> console.log('server in running on port', process.env.SERVER));