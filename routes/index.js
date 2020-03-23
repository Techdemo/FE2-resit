const express = require('express')
const Router = express.Router()
const axios = require('axios')

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
  })
})

Router.post('/search', (req, res) => {
  axios.get(`https://api.teleport.org/api/cities/?search=${req.body.city}`)
  .then(response => {
    console.log("response", response.data)
  })

  res.render('home', {
    layout: 'default',
  })
})

module.exports = Router;