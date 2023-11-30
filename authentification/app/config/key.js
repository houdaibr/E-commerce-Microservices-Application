module.exports = {
  mongoURI : `mongodb://${process.env.MONGO_SERVICE}:27017/users` ||
'mongodb://localhost:27017/users'
}