const express = require("express")
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
const compression = require('compression')

const app = express()
const port = 3000

//import routes
const index = require('./routes/index');

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
  .post('/search', index)

app
  .listen(port, () => console.log(`app listening on port ${port}!`))