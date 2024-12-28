const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'quiz_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Route pour récupérer les questions
app.get('/questions', (req, res) => {
    db.query('SELECT * FROM questions', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});