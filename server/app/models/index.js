const dbConfig = require('../../config/db.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
db.users = require('./user')(mongoose)
// db.employees = require('./employee')(mongoose)
db.trashdatas = require('./trashdata')(mongoose)

module.exports = db