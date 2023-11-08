console.log("Start");

const express = require('express');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/myhome.html');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});