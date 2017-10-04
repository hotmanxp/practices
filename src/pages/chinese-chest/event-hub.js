import Services from './service'
import { Subject } from 'rx-lite'

class EventHub {
    constructor () {
    this.Messages = new Subject()
    console.log(this.Messages, 'subject')
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
