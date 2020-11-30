const route = require('express').Router()
const userControllers = require('../controllers/usersControllers')
const uploadHelper = require('../helpers/upload')

route.get('/all', userControllers.getUsers)
route.get('/detail', userControllers.detailUser)
route.patch('/edit', userControllers.editUsers)
route.patch('/edit/picture', userControllers.updatePicture)
route.delete('/delete', userControllers.deleteUser)


module.exports = route