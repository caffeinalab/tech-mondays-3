const http = require('http')
const Golc = require('golc')
const L = new Golc('NODE API')

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('Hello World!')
  res.end()
}).listen(80, function() {
  L.log('Node API Server - Listening on port 80')
})
