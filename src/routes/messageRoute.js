const route = require('express').Router()
const messageControllers = require('../controllers/messageControllers')

route.post('/send', messageControllers.sendMessage)
route.get('/chatList', messageControllers.getMessage)
route.get('/detail', messageControllers.getMyChat)



module.exports = route