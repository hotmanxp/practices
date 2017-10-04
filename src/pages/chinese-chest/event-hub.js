import Services from './service'
import { Subject } from 'rx-lite'

class EventHub {
    constructor () {
    this.Messages = new Subject()
  }

  async initWs () {
    this.ws = await Services.connect()
    this.ws.onmessage = (data) => {
      this.Messages.onNext(data)
    }
  }

  getGameDataMessage () {
    return this.Messages
    .filter((data) => {
      return data.type === 'GAME_DATA'
    })
    .map(data => data.data)
  }

  sendNext (nextStep) {
    this.ws.send({type: 'NEXT_STEP', nextStep})
  }

  getLoginMessage () {
    return this.Messages.filter((data) => {
      return data.type === 'LOGIN'
    })
  }

  getUsers () {
    return this.Messages
    .filter((data) => {
      return data.type === 'NEW_USERS'
    })
    .map(data => data.data)
  }

  getTeamsUpdate () {
    return this.Messages
    .filter((data) => {
      return data.type === 'TEAM_UPDATE'
    })
    .map(data => data.teamInfo)
  }

  getGameStatus () {
    return this.Messages
    .filter((data) => {
      return data.type === 'GAME_CONTROL'
    })
    .map(data => data.start)
  }

  login (username) {
    this.ws.send({type: 'LOGIN', payLoad: {username}})
  }

  sentData (data) {
    this.ws.send(data)
  }

  logout (username) {
    this.ws.send({type: 'LOGOUT', payLoad: {username}})
  }
}
export default new EventHub()
