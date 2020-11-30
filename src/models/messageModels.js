const table = 'message'
const model = require('../helpers/model')

module.exports = {
  sendMessageModel: (data = {}) => { 
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  getMessageModel: (arr, data = []) => { 
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT * FROM ${table} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  countModel: (arr) => { 
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  },
  detailChatModel: (data = {}) => { 
    const query = `SELECT * FROM ${table} WHERE sender=?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  deleteChatModel: (data = {}) => { 
    const query = `DELETE FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  }
}
