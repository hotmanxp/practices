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
let users = []
let allConnect = []
let teamInfo = {
  home: null,
  away: null,
  observer: []
}
wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log(location)
  allConnect.push(ws)
  ws.send(toString({
    type: 'TEAM_UPDATE',
    teamInfo: teamInfo
  }))
  allConnect.forEach(ws => {ws.send(toString({type: 'NEW_USERS', data: users}))})
  ws.on('message', function incoming(message) {
    let data = toObj(message)
    switch (data.type) {
      case 'LOGIN': {
        let user = data.user
        if (users.indexOf(user) > -1) return
        users.push(user)
        ws.send(toString({type: 'LOGIN', isLogin: true}))
        allConnect.forEach(ws => {ws.send(toString({type: 'NEW_USERS', data: users}))})
      } break
      case 'LOGOUT': {
        let user = data.user
        let userIndex = users.findIndex(u => user === u)
        if (userIndex === -1) return
        users.splice(userIndex, 1)
        ws.send(toString({type: 'LOGIN', isLogin: false}))
        allConnect.forEach(ws => {ws.send(toString({type: 'NEW_USERS', data: users}))})
      } break
      case 'TEAM': {
        let choose = data.choose
        if (choose === 'observer') {
          teamInfo.observer.push(data.user)
        } else {
          teamInfo[choose] = data.user
        }
        allConnect.forEach(ws => {ws.send(toString({type: 'TEAM_UPDATE', teamInfo}))})
      } break
      case 'START': 
        allConnect.forEach(ws => {ws.send(toString({type: 'GAME_CONTROL', start: true}))})
        break
      case 'NEXT_STEP': 
        allConnect.filter(i => i !== ws).forEach(ws => {
          ws.send(toString({
            type: 'GAME_DATA',
            data: data.nextStep
          }))
        })
        break
      default: {
        
      }
    }
    console.log('received: %s', message);
    // ws.send(message)
  });

});
wss.on('error', (err) => {
  console.log(err)
})

server.listen(WS_PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});

