const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// use app env
const app = express()
const { APP_PORT } = process.env
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

// Middleware
const { auth } = require('./middlewares/auth')

// Routes
const authRoutes = require('./routes/authRoute')
const usersRoute = require('./routes/usersRoute')
const messageRoute = require('./routes/messageRoute')

// use Route
app.use('/auth', authRoutes)
app.use('/users', auth,  usersRoute)
app.use('/chat', auth, messageRoute)

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Backend is Running now'
  })  
})

app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`)
})