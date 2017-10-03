var express = require('express')
var http = require('http')
var url = require('url')
var ws = require('ws')

const app = express()
const server = http.createServer(app);
const wss = new ws.Server({ server });

app.use('/', express.static('./server/dist'))

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
  setInterval(() => {
     ws.send('something');
  },1000)
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});


server.listen(8080, () => {
    console.log('server start at 8080')
})
