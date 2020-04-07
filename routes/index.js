const express = require('express')
const Router = express.Router()
const axios = require('axios')

const paginator = require('../helpers/paginator');

require('dotenv').config()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
  })
})

Router.get('/page/:page/search/:query', (req, res) => {
  const page = req.params.page // 2
  const query = req.params.query // Chicken

  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/search.php?s=${query}`

  axios.get(url)
  .then(response => {
    const meals = response.data.meals
    return meals
  })
  .then((meals) => {
    let mealData = paginator.Paginator(meals, page, 8)

    res.render('home', {
      layout: 'default',
      per_page: mealData.per_page,
      total_pages: mealData.total_pages,
      prev_page: mealData.prev_page,
      page: mealData.page,
      total: mealData.total,
      mealList: mealData.data,
      message: meals === null ? `No meals found with searchterm: ${req.body.meal}` : null
    })
  })
    .catch(err => {
      console.log('error', err)
    })
  })

Router.post('/', (req, res) => {
  const searchTerm = req.body.meal.replace(/ /g, "_");
  let url = `https://www.themealdb.com/api/json/v2/${process.env.KEY}/search.php?s=${searchTerm}`

  axios.get(url)
  .then(response => {
    const meals = response.data.meals
    return meals
  })
  .then((meals) => {
    let pageLimit = 8
    let dataLength = meals.length / pageLimit

    let totalPages = Math.ceil(dataLength)
    let pageArr = []

    for (let i = 1; i < totalPages; i++) {
      pageArr.push({
        query: req.body.meal,
        page: i
      })
    }

    let results = meals.slice(0, 8)

  // .slice is the function to use.
  // res.redirect naar results met daarin de query page 1

  // TODO: HIER MOET JE NOG SLICEN ZODAT JE DE EERSTE 8 RESULTATEN HEBT.
   res.render( 'home', {
      layout: 'default',
      mealList: results,
      pageArr: pageArr,
      message: meals === null ? `No meals found with searchterm: ${req.body.meal}` : null
    })
  })
  .catch(err => {
    console.log('error', err)
  })
})

module.exports = Router;