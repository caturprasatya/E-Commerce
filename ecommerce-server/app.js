let env = process.env.NODE_ENV 

if (env == 'development' || env == 'test') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const route = require('./routes')
const errorHandler = require('./middlewares/errHandler')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended : true}))
app.use(express.json())

app.use(route)
app.use(errorHandler)

module.exports = app