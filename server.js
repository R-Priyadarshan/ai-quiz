const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
let submissions = [];

app.get('/questions', (req, res) => {
  res.json(questions);
});

app.post('/submit', (req, res) => {
  submissions.push(req.body);
  console.log('Received Submission:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
