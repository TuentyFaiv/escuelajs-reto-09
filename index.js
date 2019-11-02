const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { config } = require('./src/config');
const platziStore = require('./src/routes')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});

platziStore(app);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});