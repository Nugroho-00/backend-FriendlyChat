const route = require('express').Router()
const authControllers = require('../controllers/authControllers')

route.post('/login', authControllers.login)
route.post('/register', authControllers.register)

module.exports = route