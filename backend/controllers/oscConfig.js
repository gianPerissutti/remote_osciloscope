const OscConfigRouter = require('express').Router()
const {PORT, DEFAULT_TIME_DIV, DEFAULT_AMP_DIV} = require('../utils/config')

OscConfigRouter.get('/', (request, response) => {
  response.json({timeDiv: DEFAULT_TIME_DIV, ampDiv: DEFAULT_AMP_DIV})
  })

  module.exports = OscConfigRouter