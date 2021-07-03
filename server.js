'use strict'

const express = require('express')
const request = require('request')
const path = require('path')
//todo: remove after sometime.
const tmdbApiKey = 'd5f26d39f9a1998e49bf063bb18a789d'

const optionsTrending = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  qs: {
    api_key: tmdbApiKey
  }
}

const optionsTrendingTV = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/tv/day',
  qs: {
    api_key: tmdbApiKey
  }
}

const optionsMovieDetails = {
  method: 'GET',
  url: undefined,
  qs: {
    api_key: tmdbApiKey,
    append_to_response: 'videos,credits'
  }
}

const optionsTvDetails = {
  method: 'GET',
  url: undefined,
  qs: {
    api_key: tmdbApiKey,
    append_to_response: 'videos,credits'
  }
}


let parsedResult

tmdbApiKey
  ? console.log('TMDb api key is found')
  : console.log('TMDb api key is NOT found among environment variables!')

async function apiCall(options) {
  // (I.) promise to return the parsedResult for processing
  function tmdbRequest() {
    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // (II.)
  try {
    parsedResult = await tmdbRequest()
  } catch (e) {
    console.error(e)
  }
  return parsedResult
}

function endpointCreation() {
  try {
    const app = express()
    const port = process.env.PORT || 5000

    app.use(express.static(path.join(__dirname, 'client/build')))
    // required to serve SPA on heroku production without routing problems; it will skip only 'api' calls
    if (process.env.NODE_ENV === 'production') {
      app.get(/^((?!(api)).)*$/, function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
      })
    }

    // providing a constant endpoint for trending movies
    app.get('/api/trending', async (req, res) => {
      res.json(await apiCall(optionsTrending))
      console.log(`/api/trending endpoint has been called!`)
    })

    // providing a constant endpoint for trending tv
    app.get('/api/trendingTV', async (req, res) => {
      res.json(await apiCall(optionsTrendingTV))
      console.log(`/api/trendingTV endpoint has been called!`)
    })

    // providing a dynamic endpoint to movie detail pages
    app.get('/api/movieDetails/:tmdbId', async (req, res) => {
      const id = req.params.tmdbId
      optionsMovieDetails.url = `https://api.themoviedb.org/3/movie/${id}`
      res.json(await apiCall(optionsMovieDetails))
      console.log(`/api/movieDetails/${id} endpoint has been called!`)
    })

    // providing a dynamic endpoint to TV detail pages
    app.get('/api/tvDetails/:tmdbId', async (req, res) => {
      const id = req.params.tmdbId
      optionsMovieDetails.url = `https://api.themoviedb.org/3/tv/${id}`
      res.json(await apiCall(optionsMovieDetails))
      console.log(`/api/tvDetails/${id} endpoint has been called!`)
    })
        
    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
