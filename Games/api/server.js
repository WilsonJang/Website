const express = require('express');
const mariadb = require('mariadb');
const app = express()
require('dotenv').config()

const port = process.env.PORT;

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'game_data',
    connectionLimit: 5
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/scores', (req, res) => {
    pool.getConnection().then(conn => {
        conn.query("SELECT * FROM brick_users").then((rows) => {
            console.log(rows);
            conn.end()
        }).catch(err => {
            console.log(rows);
            conn.end
        })

    }).catch(err => {
        console.log(err)
    })
    res.send('done');
});

app.post('/save', (req, res) => {
    pool.getConnection().then(conn => {
        let name="Ashazi"
        let score=1000
        conn.query("INSERT INTO brick_users (PersonName,Score) VALUES ('" + name + "', " + score + ")").then(() => {
            console.log('saved');
            conn.end();
        }).catch(err => {
            console.log(err);
            conn.end();
        })
    }).catch(err => {
        console.log(err);

    });
    res.send('saved');
})
app.listen(port, () => {
    console.log(`Server running on ${port}/`);
});