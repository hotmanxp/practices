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

let gameInfo = {
  isStart: false,
  records: []
}

const sendToOne = (ws, data) => {
  try {
    ws.send(toString(data))
  } catch (e) {
    console.log(e)
    let idx = allConnect.findIndex( c => c === ws)
    if(idx > - 1) allConnect.splice(idx, 1)
  }
}

const sendToAll = (data) => {
  allConnect.forEach(ws => {
    try {
      ws.send(toString(data))
    } catch (e) {
      console.log(e)
      let idx = allConnect.findIndex( c => c === ws)
      if(idx > - 1) allConnect.splice(idx, 1)
    }
  })
}
const sendToOther = (selfCennect, data) => {
  allConnect.filter(c => c !== selfCennect)
  .forEach(ws => {
    try {
      ws.send(toString(data))
    } catch (e) {
      console.log(e)
      let idx = allConnect.findIndex( c => c === ws)
      if(idx > - 1) allConnect.splice(idx, 1)
    }
  })
}
wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  allConnect.push(ws)
    sendToOne(ws, {type: 'TEAM_UPDATE', teamInfo})
    sendToAll({type: 'NEW_USERS', data: users})
  ws.on('message', function incoming(message) {
    let data = toObj(message)
    switch (data.type) {
      case 'LOGIN': {
        let user = data.user
        if (users.indexOf(user) > -1) return
        users.push(user)
        sendToOne(ws, {type: 'LOGIN', isLogin: true})
        sendToAll({type: 'NEW_USERS', data: users})
      } break
      case 'LOGOUT': {
        let user = data.user
        let userIndex = users.findIndex(u => user === u)
        if (userIndex === -1) return
        users.splice(userIndex, 1)
        sendToOne(ws, {type: 'LOGIN', isLogin: false})
        sendToAll({type: 'NEW_USERS', data: users})
      } break
      case 'TEAM': {
        let choose = data.choose
        if (choose === 'observer') {
          teamInfo.observer.push(data.user)
        } else {
          teamInfo[choose] = data.user
        }
        sendToAll({type: 'TEAM_UPDATE', teamInfo})
      } break
      case 'START': 
        gameInfo.isStart = true
        sendToAll({type: 'GAME_CONTROL', start: true})
        break
      case 'WIN':
        let {winner} = data
        gameInfo.isStart = false
        gameInfo = []
        sendToAll({type: 'GAME_CONTROL', end: true, winner})
        break
      case 'NEXT_STEP':
        gameInfo.push(data.nextStep)
        sendToOther(ws, {type: 'GAME_DATA', data: data.nextStep})
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

