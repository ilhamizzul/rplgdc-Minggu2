let express = require('express');
let app = express();
let conn = require('./koneksi');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.get('/mahasiswa', (req, res) => {
    conn.query('SELECT * FROM tb_mahasiswa INNER JOIN tb_fakultas ON tb_fakultas.fakultas = tb_mahasiswa.fakultas', 
    (err, rows, fields) => {
        res.send(rows);
    })
})

app.get('/mahasiswa/:nim', (req, res) => {
    conn.query('SELECT * FROM tb_mahasiswa INNER JOIN tb_fakultas ON tb_fakultas.fakultas = tb_mahasiswa.fakultas WHERE nim=?', [req.params.nim], 
    (err, rows, fields) => {
        res.send(rows);
    })
})

app.put('/mahasiswa/:nim', (req, res) => {
    let data_update = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan,
        req.params.nim
    ]

    conn.query('UPDATE tb_mahasiswa SET nim=?,nama=?,fakultas=?,angkatan=? WHERE nim=?', data_update, (err, rows, fields) => {
        try {
            res.send({data:"true"});
        } catch(e) {
            res.send({data:"false"});
        }
    })
})

app.delete('/deleteMahasiswa/:nim', (req, res) => {
    conn.query('DELETE FROM tb_mahasiswa WHERE nim=?', [req.params.nim], (err, rows, fields) => {
        try {
            res.send('Hapus Data Berhasil')
        } catch(e) {
            res.send({data : 'false'})
        }
    })
});

app.post('/addMahasiswa', (req , res) => {
    let data_insert = [
        req.body.nim,
        req.body.nama,
        req.body.fakultas,
        req.body.angkatan
    ]

    conn.query('INSERT INTO tb_mahasiswa (nim, nama, fakultas, angkatan) VALUES (?,?,?,?)',data_insert, (err, rows, fields) => {
        try {
            res.send({data : true});
        } catch(e) {
            res.send({data : false});
        }
    });
})

app.listen(3030);