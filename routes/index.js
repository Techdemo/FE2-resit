const express = require('express')
const Router = express.Router()
const axios = require('axios')

require('dotenv').config()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
  })
})


// maak een andere route waarbij de query en de page number beschikbaar zijn.

    // `/api?meal=${query}`


// Route path: /users/: userId / books /: bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

Router.get('/:page/:query', (req, res) => {

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
        page: i
      })
    }

    const query = req.body.meal
  // .slice is the function to use.
  // res.redirect naar results met daarin de query page 1

   res.render( 'home', {
      layout: 'default',
      mealList: meals,
      pageArr: pageArr,
      message: meals === null ? `No meals found with searchterm: ${req.body.meal}` : null,
      query: query
    })
  })
  .catch(err => {
    console.log('error', err)
  })
})

module.exports = Router;