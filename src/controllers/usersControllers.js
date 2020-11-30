const Users  = require('../models/usersModels')
const responseStandard = require('../helpers/response')
const search = require('../helpers/search')
const sorting = require('../helpers/sort')
const pagination = require('../helpers/pagination')
const Joi = require('joi')
const upload = require('../helpers/upload').single('picture')
const multer = require('multer')

module.exports = {
    getUsers: async (req, res) => {
        const { searchKey, searchValue } = search.name(req.query.search)
        const count = await Users.countUsersModel([searchKey, searchValue])
        const page = pagination(req, count[0].count)
        const { offset, pageInfo } = page
        const { limitData: limit } = pageInfo  
        const results = await Users.getUsersModel([searchKey, searchValue], [limit, offset])
        if (results.length) {
          const data = results.map(item => {
            item = {
              ...item
            }
            return item
          })
          return responseStandard(res, 'List of Account', { data, pageInfo })
        } else {
          return responseStandard(res, 'There is no Account in list', {}, 404, false)
        }
      },
    detailUser: async (req, res,) => {
        const { id } = req.data
        const results = await Users.detailUserModel(id)
        if (results.length) {
            return responseStandard(res, `Show detail Account with id ${id}`, {results}, 201)
        } else {
            return responseStandard(res, `Show detail Account with id ${id} not found`, {}, 400, false)
        }     
    },
    editUsers:  async (req, res) => {
        const { id } = req.data
        const userId = await Users.detailUserModel(id)
        if (userId.length) {
            const schema = Joi.object({
                phoneNumber: Joi.string().min(6).required()
            })
          const { value: results } = schema.validate(req.body)
          console.log(results)
          const updated = Object.keys(results).map(async item => {
            if (item === 'PhoneNumber') {
              const { phoneNumber } = results
              if (phoneNumber) {
                const phoneExist = await Users.checkPhoneModel({ phoneNumber })
                if (phoneExist.length) {
                    return responseStandard(res, 'phoneNumber has already used', {}, 400, false)                
                } else {
                  const data = {
                  phoneNumber
                  }
                  const update = await Users.updateUserPartialModel([data, id])
                  return update
                }
              }
            } else {
              const { username, name, bio } = results
              const data = {
                username, name, bio
              }
              console.log(data)
              const update = await Users.updateUserPartialModel(data, id)
              return update
            }
          })
          const updateResults = await Promise.all(updated)
          console.log(updateResults)
          if (updateResults[0].affectedRows) {
            return responseStandard(res, 'Account has been Update succesfully')
          } else {
            return responseStandard(res, 'Failed to update', {}, 500, false)
          }
        } else {
        }
    },
    updatePicture: async (req, res) => {
        upload(req, res, async (err) => {
          const { id } = req.data
          console.log(id)
          const isExist = await Users.detailUserModel(id)
          console.log(isExist)
          if (isExist.length) {
            if (err instanceof multer.MulterError) {
              return responseStandard(res, err.message, {}, 500, false)
            } else if (err) {
              return responseStandard(res, err.message, {}, 500, false)
            }
            let picture = ''
            if (req.file) {
              picture = `picture = 'uploads/${req.file.filename}'`
            }
            const update = await Users.updateDetailPartialModel(picture, id)
            if (update.affectedRows) {
              return responseStandard(res, 'Picture has been Update succesfully')
            } else {
              return responseStandard(res, 'Failed to update', {}, 500, false)
            }
          } else {
            return responseStandard(res, 'There is no Account', {}, 404, false)
          }
        })
      },
      deleteUser: async (req, res) => {
        const { id } = req.data
    
        const isExist = await Users.detailUserModel(id)
        if (isExist.length > 0) {
          const results = await Users.deleteUserModel(id)
          if (results.affectedRows) {
            return responseStandard(res, 'Account has been deleted')
          } else {
            return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
          }
        } else {
          return responseStandard(res, 'Account not found', {}, 404, false)
        }
      },
}