const db = require('../db');

const userSchema = new db.Schema({
  api_key: String,
  username: String,
  email: String
});

const User = db.model('User', userSchema);

module.exports = User;