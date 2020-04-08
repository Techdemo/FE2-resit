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
    // console.log(meals)

    let mealData = paginator.Paginator(meals, page, 8)
    let next_page = Number(mealData.next_page)
    let prev_page = Number(mealData.prev_page)

    res.render('home', {
      layout: 'default',
      per_page: mealData.per_page,
      query: query,
      next_page: next_page === 0 ? null : next_page + 1,
      total_pages: mealData.total_pages,
      prev_page: mealData.pre_page,
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
  let mealData = paginator.Paginator(meals, 1, 8)

   res.render( 'home', {
     layout: 'default',
     per_page: mealData.per_page,
     query: searchTerm,
     next_page: mealData.next_page + 1,
     total_pages: mealData.total_pages,
     prev_page: mealData.prev_page - 1,
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

module.exports = Router;