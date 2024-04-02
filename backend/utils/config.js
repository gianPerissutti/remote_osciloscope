require('dotenv').config()

const PORT = process.env.PORT 
const DEFAULT_TIME_DIV = process.env.DEFAULT_TIME_DIV
const DEFAULT_AMP_DIV = process.env.DEFAULT_AMP_DIV
module.exports = {

    PORT,
    DEFAULT_TIME_DIV,
    DEFAULT_AMP_DIV

}
