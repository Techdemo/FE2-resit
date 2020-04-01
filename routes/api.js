const express = require('express')
const Router = express.Router()
const axios = require('axios')

require('dotenv').config()

Router.post('/api', (req, res) => {
  const query = req.query.meal.replace(/ /g, "_");
  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/search.php?s=${query}`
  axios.get(url)
  .then(response => {
    const meals = response.data.meals
    res.json(meals)
  })
  .catch(err => {
    res.status(400).send()
    throw new Error
  })
})

Router.post('/api/ingredients', (req, res) => {
  let ingredients = req.query.ingredients
  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/filter.php?i=${ingredients}`

  axios.get(url)
    .then(response => {
      const meals = response.data.meals
      res.json(meals)
    })
    .catch(err => {
      res.status(400).send()
      throw new Error
    })
})

module.exports = Router;