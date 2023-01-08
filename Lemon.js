const express = require('express')
const app = express()
const port = 3000


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static('IniPublic'));



var mysql      = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hogwarts'
});





app.get('/show', (req, res) => {
  connection.query('SELECT * FROM royaldanish', function (error, results, fields) {
   try {
      if(error)throw error;
      res.send({status: 'true', data: results})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
})

app.post('/insert', (req, res) => {
  let judul = req.body.Judul
  let terbit = req.body.Terbit
  let issn = req.body.ISSN

  pool.query('INSERT INTO royaldanish (Judul,Terbit,ISSN) VALUES ("' + judul + '" , "' + terbit + '" , "' + issn + '");', function(error, results,fields){
    try {
      if(error)throw error;
      res.send({status: 'true', data: results})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
  

 
})

app.post('/update', (req, res) => {
  let idData = req.body.idData
  let namaMerk = req.body.namaMerk
  let harga = req.body.harga

  // pool.query('UPDATE produk SET merk = "'+ namaMerk+'", harga = "'+harga+'" WHERE ID = "'+idData+'";', function(error, results,fields){
  pool.query('UPDATE royasldanish SET Judul"' + judul + '" ,Terbit = "' + terbit + '" , ISSN = "' + issn + '");', function(error, results,fields){  
    try {
      if(error)throw error;
      res.send({status: 'true',message: 'Data Berhasil di Ubah'})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });

})

app.post('/delete', (req, res) => {
  let idData = req.body.idData

  pool.query('DELETE FROM royaldanish WHERE ID = "'+idData+'";', function(error, results,fields){
    try {
      if(error)throw error;
      res.send({status: 'true',message: 'Data Berhasil di HAPUSSS'})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
  

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})