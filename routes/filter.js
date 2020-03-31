const express = require('express')
const Router = express.Router()
const axios = require('axios')

require('dotenv').config()

Router.get('/filter', (req, res) => {
  res.render('filterPage', {
    layout: 'default',
  })
})

Router.post('/filter', (req, res) => {
  let ingredients = req.body.ingredients.toString()
  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/filter.php?i=${ingredients}`

  axios.get(url)
    .then(res => {
      const meals = res.data.meals
      return meals
    })
    .then((meals) => {
      res.render('filterPage', {
        layout: 'default',
        mealFilterList: meals,
        message: meals === null ? 'No meals found' : null
      })
    })
    .catch(err => {
      console.log('err', err)
    })
})

module.exports = Router;