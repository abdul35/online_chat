const mysql = require('mysql');



module.exports = mysql.createConnection({
    host     : 'localhost',
    user     : 'chat_admin',
    password : 'admin',
    database : 'chat'
  })
  