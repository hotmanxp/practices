var express = require('express')
var http = require('http')
var url = require('url')
var ws = require('ws')

const app = express()
const server = http.createServer(app);
const wss = new ws.Server({ server });
const WS_PORT = 8081

app.use('/', express.static('./server/dist'))

const toString = (obj) => {
  return JSON.stringify(obj)
}
const toObj = (str) => JSON.parse(str)

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log(location)
  let users = []
  ws.on('message', function incoming(message) {
    let data = toObj(message)
    switch (data.type) {
      case 'LOGIN': {
        let user = data.user
        if (users.indexOf(user) > -1) return
        users.push(user)
        ws.send(toString({type: 'LOGIN', isLogin: true}))
        ws.send(toString({type: 'NEW_USERS', data: users}))
      } break
      default: {
        
      }
    }
    console.log('received: %s', message);
    // ws.send(message)
  });
  setInterval(() => {
    let data = {
      type: 'GAME_DATA',
      data: {step: 1}
    }
    ws.send(JSON.stringify(data))
  }, 2000)

});
wss.on('error', (err) => {
  console.log(err)
})

server.listen(WS_PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});

