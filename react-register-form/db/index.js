const mysql = require('mysql');
const express = require('express');
const API_PORT = 9001;
const app = express();
let cors = require('cors');
const bcrypt = require('bcryptjs');
app.use(cors());
const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({
    extended: true
})

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'employee'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('DB Connected');
});

app.get('/mail', urlencoded, function (req, res) {
    let email = req.query.email
    let sql = " SELECT empMail from employee_details WHERE empMail = ?"
    con.query(sql, email, function (err, result) {
        if (err) { res.json(err) }
        return res.json({ result });
    })
});

app.post('/users', urlencoded, async (req, res) => {
    let jsondata = req.body;
    let values = [];
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(jsondata.pass, salt);
    values.push([jsondata.name, jsondata.mob, jsondata.email, jsondata.designation, hashedpassword]);
    let sql = "INSERT INTO `employee_details`(`empName`, `empMob`, `empMail`, `empDesignation`, `password`) VALUES (?)"
    con.query(sql, values, function (err, result) {
        if (err) { res.json(err) }
        let sql = "SELECT empID FROM `employee_details` WHERE empMail = ?"
        con.query(sql, jsondata.email, function (err, result) {
            if (err) return res.json({ success: false, error: err });
            return res.json({ result });
        })
    });
});

app.get('/login', urlencoded, async (req, res) => {
    let email = req.query.email
    let pass = req.query.pass
    let sql = `SELECT * from employee_details WHERE empMail = '${email}'`
    con.query(sql, async (err, result) => {
        if (err) { console.log('error in get', err) }
        else if (result.length) {
            const hashedpass = await bcrypt.compare(pass, result[0].password);
            if (hashedpass) {
                return res.json({ result });
            }
            else {
                return res.json({ err: 'password incorrect' })
            }
        }
        else {
            return res.json({ err: 'In Correct email' })
        }

    })
});



app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
