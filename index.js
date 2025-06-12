var express = require('express')
var app = express()

var port = process.env.APP_PORT || 5000
app.set('port', port)

app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send(`Hello from node.js app in OpenShift!!!\nAPI_KEY: ${process.env.API_KEY}`)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
