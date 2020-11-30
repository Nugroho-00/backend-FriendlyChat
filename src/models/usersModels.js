const table = 'users'
const model = require('../helpers/model')

module.exports = {
  createUserModel: (data = {}) => { 
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  checkPhoneModel: (data = {}) => { 
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  getConditionModel: (data = {}) => { 
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  getUsersModel: (arr, data = []) => { 
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT * FROM ${table} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailUserModel: (data = {}) => { 
    const query = `SELECT * FROM ${table} WHERE id=?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  countUsersModel: (arr) => { 
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  },
  updateUserPartialModel: (data = [], id) => { 
    const query = `UPDATE ${table} SET ? WHERE id=${id}`
    const results = model(query, data)
    return results
  },
  updateDetailPartialModel: (arr, data = {}) => { 
    const query = `UPDATE ${table} SET ${arr} WHERE id=?`
    const results = model(query, data)
    return results
  },
  deleteUserModel: (data = {}) => { 
    const query = `DELETE FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  }
}
