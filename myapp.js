console.log("Start");

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'myhome2.html'));
});

// Route to serve myhome.js file
app.get('/myhome.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'myhome.js'));
});

// Route to serve myhome.js file
app.get('/mqttws31.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mqttws31.js'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
