const mysql = require('mysql');
const express = require('express');
const API_PORT = 9001;
const app = express();
let cors = require('cors');
app.use(cors());
const Bodyparser = require('body-parser');
const urlencoded = Bodyparser.json({
    extended: true
})

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'todo'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('DB Connected');
});


app.post('/users', urlencoded, function (req, res) {
    let jsondata = req.body;
    let values = [];
    values.push([jsondata.id, jsondata.name]);
    let sql = "INSERT INTO users (user_id , name) VALUES (?)"
    con.query(sql, values, function (err, result) {
        if (err) { err }
        let sql = "SELECT * FROM todo_Messages WHERE user_id = ?"
        con.query(sql, jsondata.id, function (err, result) {
            console.log('postin data', result)
            if (err) return res.json({ success: false, error: err });
            return res.json({ result });
        });

    });
});

app.get('/userid', urlencoded, function (req, res) {
    let jsondata = req.query.id;
    let sql = "SELECT user_id,name FROM users WHERE user_id = ?"
    con.query(sql, jsondata, function (err, result) {
        if (err) return res.json({ success: false, error: err });
        console.log(result)
        return res.json({ result });
    });
})

app.post('/samples', urlencoded, function (req, res) {
    let jsondata = req.body;
    let values = [];
    console.log("json", jsondata)
    values.push([jsondata.id, jsondata.message]);
    let sql = "INSERT INTO todo_Messages (user_id , message) VALUES (?)"
    con.query(sql, values, function (err, result) {
        if (err) return res.json({ success: false, error: err });
        console.log('inserted', result)
        let sql = "SELECT * FROM todo_Messages WHERE user_id = ?"
        con.query(sql, jsondata.id, function (err, result) {
            console.log('postin data', result)
            if (err) return res.json({ success: false, error: err });
            return res.json({ result });
        });
    });
});

app.post('/isCompleted', urlencoded, function (req, res) {
    let jsondata = req.body;
    console.log(jsondata)
    let values = [];

    jsondata.isCompleted = !jsondata.isCompleted
    values.push([jsondata.isCompleted])
    let sql = `UPDATE todo_Messages SET isCompleted= ? WHERE id =${jsondata.id}`
    con.query(sql, values, function (err, result) {
        if (err) return res.json({ success: false, error: err });
        console.log('postin data', result)
        let sql = "SELECT * FROM todo_Messages WHERE user_id = ?"
        con.query(sql, jsondata.user_id, function (err, result) {
            console.log('postin data', result)
            if (err) return res.json({ success: false, error: err });
            return res.json({ result });
        });
    })
})


app.post('/messageChange', urlencoded, function (req, res) {
    let jsondata = req.body;
    console.log(jsondata)
    let sql = `UPDATE todo_Messages SET message= ? WHERE id =${jsondata.id}`
    con.query(sql, jsondata.message, function (err, result) {
        if (err) return res.json({ success: false, error: err });
        console.log(result)
        let sql = "SELECT * FROM todo_Messages WHERE user_id = ?"
        con.query(sql, jsondata.user_id, function (err, result) {
            console.log('postin data', result)
            if (err) return res.json({ success: false, error: err });
            return res.json({ result });
        });
    })
})


app.delete('/deleteMessage', urlencoded, function (req, res) {
    let id = req.query.id;
    let user_id = req.query.user_id
    console.log(id, user_id)
    let sql = `DELETE FROM todo_Messages WHERE id=${id}`
    con.query(sql, function (err, result) {
        if (err) return res.json({ success: false, error: err });
        console.log(result)
        let sql = "SELECT * FROM todo_Messages WHERE user_id = ?"
        con.query(sql, user_id, function (err, result) {
            console.log('postin data', result)
            if (err) return res.json({ success: false, error: err });
            console.log('deleted', result)
            return res.json({ result });
        });
    })
})


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));