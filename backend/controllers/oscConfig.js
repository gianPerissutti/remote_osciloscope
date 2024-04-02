const OscConfigRouter = require('express').Router()
const { PORT, DEFAULT_TIME_DIV, DEFAULT_AMP_DIV } = require('../utils/config')

let timeDivServer = DEFAULT_TIME_DIV
let ampDivServer = DEFAULT_AMP_DIV

OscConfigRouter.get('/', (request, response) => {
  response.json({ timeDiv: timeDivServer, ampDiv: ampDivServer })
})

OscConfigRouter.put('/', (request, response) => {
  const { timeDiv, amplitudeDiv } = request.body
  timeDivServer = timeDiv
  ampDivServer = amplitudeDiv
  console.log(request.body)
  response.json({ timeDiv: timeDivServer, ampDiv: ampDivServer })
})


module.exports = OscConfigRouter