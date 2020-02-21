const mysql = require('mysql');
const express = require('express');
const API_PORT = 9003;
const app = express();
const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({
    extended: true
})

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'Gowtham'

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'todo',
    username: "root",
    password: "",
    dialect: 'mysql',
})

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'todo'
});


sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));


con.connect(function (err) {
    if (err) throw err;
    console.log('result');
});

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
});
// create table with user model
User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
    .catch(err => console.log('BTW, did you enter wrong database credentials'));


const createUser = async ({ name, password }) => {
    return await User.create({ name, password });
};
const getAllUsers = async () => {
    return await User.findAll();
};
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());

app.get('/users', function (req, res) {
    getAllUsers().then(user => res.json(user));
});
// register route
app.post('/register', urlencoded, function (req, res, next) {
    const { name, password } = req.body;
    createUser({ name, password }).then(user =>
        res.json({ user, msg: 'account created successfully' })
    );
});

app.post('/login', urlencoded, async function (req, res, next) {
    const { name, password } = req.body;
    if (name && password) {
        let user = await getUser({ name });
        if (!user) {
            res.status(401).json({ msg: 'No such user found', user });
        }
        if (user.password === password) {
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ msg: 'ok', token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
})

app.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized' });
});


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));