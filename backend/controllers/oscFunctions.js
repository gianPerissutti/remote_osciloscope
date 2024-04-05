const OscFunctionsRouter = require('express').Router()


const savedFunctions =
{
    offset: 0,
}


OscFunctionsRouter.get('/', (request, response) => {
    response.json({ offset: savedFunctions.offset})
})

OscFunctionsRouter.put('/offset', (request, response) => {
    savedFunctions.offset = request.body.offset
    response.json({ offset: savedFunctions.offset })
})


module.exports = {OscFunctionsRouter, savedFunctions}