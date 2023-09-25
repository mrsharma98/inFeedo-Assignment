var con = require('./connection')
const express = require('express')
const infeedoRoute = require('./routes/apis')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

con.connect(function (err) {
  if (err) throw err;

  var sql = "CREATE TABLE IF NOT EXISTS inFeedo (id int NOT NULL AUTO_INCREMENT, name VARCHAR(100), date DATETIME default now(), status ENUM('open', 'inprogress', 'completed'), PRIMARY KEY (id))"
  con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Table created:- ", result);
    }
  })

});

app.use("/", infeedoRoute)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
