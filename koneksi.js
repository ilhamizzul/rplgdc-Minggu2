let mysql = require('mysql');

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'db_mahasiswa'
})

conn.connect((err) => {
    if (err) throw err;
    console.log("koneksi DB berhasil");
})

module.exports = conn;