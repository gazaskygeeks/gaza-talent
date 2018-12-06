require('env2')('.env') // configure enviroment (in ./.env)

const express = require('express')
const morgan = require('morgan')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('client/build'))
app.use(morgan('tiny'))
app.use('/api', require('./routers/airtable'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
