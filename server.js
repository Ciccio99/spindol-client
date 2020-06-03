const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const favicon = require('express-favicon');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 3000;
const app = express();

app.use(sslRedirect());
app.use(compression());
app.use(favicon(`${__dirname}/build/favicon.ico`));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', (req, res) => res.send('pong'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
