const express = require("express")
const browserSync = require('browser-sync');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
const compression = require('compression')

const app = express()
const port = 3000

const dotenv = require('dotenv');
dotenv.config();

//import routes
const index = require('./routes/index');
const filter = require('./routes/filter');

app
  .use(express.static(path.join(__dirname, '/public')))
  .use(compression())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.json())

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')
  .engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname +
      '/views/layouts/',
    partialsDir: __dirname +
      '/views/partials/'
  }))

app
  .get('/', index)
  .post('/', index)
  .get('/filter', filter)
  .post('/filter', filter)

app
  .listen(port, listening)

function listening() {
  console.log(`frontend server available on http://localhost:${port}`);
    browserSync({
      files: ['public/**/*.{js,css}'],
      online: false,
      open: false,
      port: port + 1,
      proxy: 'localhost:' + port,
      ui: false
    });
}