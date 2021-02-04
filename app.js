
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

const PORT=process.env.Port||3000

app.listen(PORT,console.log(`port running ${PORT}`))