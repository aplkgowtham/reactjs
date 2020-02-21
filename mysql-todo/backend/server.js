const mysql = require('mysql');
const express = require('express');
const API_PORT = 9001;
const app = express();
let cors = require('cors');
app.use(cors());
const router = express.Router();
const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({
    extended: true
})


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


app.post('/users', urlencoded, function (req, res) {
    var jsondata = req.body;
    var values = [];
    values.push([jsondata.id, jsondata.message]);
    console.log(values)
    var sql = "INSERT INTO Message (id , message) VALUES (?)"
    con.query(sql, values, function (err, result) {
        console.log('postin')
        if (err) return res.json({ success: false, error: err });
        return res.json('success');
    });

});





app.post('/login', urlencoded, function (req, res) {
    var jsondata = req.body;
    var values = [];
    values.push([parseInt(jsondata.id), jsondata.name]);
    console.log(values)
    var sql = "INSERT INTO login (id , name) VALUES (?)"
    con.query(sql, values, function (err, result) {
        console.log('postin login')
        if (err) {
            console.log('error')
            return res.json({ err });
        }
    });
});


app.get('/data', urlencoded, function (req, res) {
    var jsondata = parseInt(req.query.id);
    console.log(jsondata)
    var sql = "SELECT user_id,message FROM Message WHERE id = ?;"
    con.query(sql, jsondata, function (err, result) {
        console.log('postin data', result)
        if (err) return res.json({ success: false, error: err });
        return res.json({ result });
    });

});


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));