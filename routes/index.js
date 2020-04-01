const express = require('express')
const Router = express.Router()
const axios = require('axios')

require('dotenv').config()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
  })
})
//TODO: FIX THIS
Router.post('/search', (req, res) => {
  //TODO: Replace with search term.
  const searchTerm = req.body.meal.replace(/ /g, "_");
  let url = `/api`

  axios.get(url)
  .then(response => {
    const meals = response.data.meals
    return meals
  })
  .then((meals) => {
   res.render( 'home', {
      layout: 'default',
      mealList: meals,
      message: meals === null ? `No meals found with searchterm: ${req.body.meal}` : null,
    })
  })
  .catch(err => {
    console.log('error', err)
  })
})

module.exports = Router;