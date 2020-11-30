const Users  = require('../models/usersModels')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { APP_KEY } = process.env
const responseStandard = require('../helpers/response')


module.exports = {
    register: async (req, res) => {
        const schema = Joi.object({
            phoneNumber: Joi.string().min(6).required()
        })
        const { error,value } = schema.validate(req.body)
        if (error) {
            return responseStandard(res, error.message,{},400,false)
        }else{
            const { phoneNumber } = value
            const checkPhone = await Users.checkPhoneModel({ phoneNumber })
            if (checkPhone.length) {
                return responseStandard(res, 'phoneNumber has already registered!',{},403,false)
            }else{
                const data ={
                    phoneNumber
                }
                const results = await Users.createUserModel(data)
                return responseStandard(res, 'Register Account successfully!!', { results: data }, 201)
            }
        }
    },
    login: async (req, res) => {
        const data = Object.keys(req.body)
        if (data[0] === 'phoneNumber') {
            const schema =Joi.object({
                phoneNumber: Joi.string().required()
            })
            const {error,value} = schema.validate(req.body)
            if (error) {
                return responseStandard(res, error.message, {}, 400, false)
            }else{
                const { phoneNumber } = value
                const cekPhone = await Users.checkPhoneModel({ phoneNumber })
                if (cekPhone.length) { 
                    const id = cekPhone[0].id
                    jwt.sign({ id: id}, APP_KEY, (_error, token) => {
                        return responseStandard(res, 'Login successfully!', { token })
                      })
                }else {
                    return responseStandard(res, 'phoneNumber not Registry!', {}, 404, false)
                  }
            }
        }
    }
}