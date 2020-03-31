const express = require('express')
const Router = express.Router()
const axios = require('axios')

require('dotenv').config()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
  })
})

Router.post('/', (req, res) => {
  //TODO: Replace with search term.
  const searchTerm = req.body.meal.replace(/ /g, "_");
  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/search.php?s=${req.body.meal}`

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