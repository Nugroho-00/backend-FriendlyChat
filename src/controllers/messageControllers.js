const Message = require('../models/messageModels')
const Users  = require('../models/usersModels')
const responseStandard = require('../helpers/response')
const search = require('../helpers/search')
const sorting = require('../helpers/sort')
const pagination = require('../helpers/pagination')
const Joi = require('joi')


module.exports = {
    sendMessage: async (req, res) => {
        const { id } = req.data
        const schema = Joi.object({
          message: Joi.string().max(255).required(),
          recipient: Joi.number()
        })
        const { error, value } = schema.validate(req.body)  
        if (error) {
          return responseStandard(res, error.message, {}, 400, false)
        } else {
          const { message, recipient } = value
          const findId = await Users.getConditionModel({ id : recipient })
          if (findId.length === 0 ||findId.length === undefined || findId.length === null) {
            return responseStandard(res, 'id not found!', {}, 403, false)
          } else {
            const data = {
              sender: id,
              recipient: recipient,
              message: message,
            }
            const result = await Message.sendMessageModel(data)
            console.log(result)
            return responseStandard(res, 'message send successfully', { result: data })
          }
        }
  },
  getMessage: async (req, res) => {
    const { id } = req.data
    const { searchKey, searchValue } = search.sender_id(req.query.search)
    const count = await Message.countModel([searchKey, searchValue])
    const page = pagination(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo  
    const results = await Message.getMessageModel([searchKey, searchValue], [limit, offset])
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item
        }
        return item
      })
      return responseStandard(res, 'List Chat', { data, pageInfo })
    } else {
      return responseStandard(res, 'There is no list chat', {}, 404, false)
    }
  },
  getMyChat: async (req, res,) => {
    const { id } = req.data
    const sender = id
    const results = await Message.detailChatModel(sender)
    if (results.length) {
        return responseStandard(res, `Show MyChat with id ${id}`, {results}, 201)
    } else {
        return responseStandard(res, `Show MyChat with id ${id} not found`, {}, 400, false)
    }     
  },
  deleteChat: async (req, res) => {
    const { sender } = req.data
    const isExist = await Message.detailChatModel(sender)
    if (isExist.length > 0) {
      const results = await Message.deleteChatModel(sender)
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