const db = require('../helpers/db')

module.exports = (query, data = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, data, (err, results, _fields) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(results)
      }
      return (err, results)
    })
  })
}
