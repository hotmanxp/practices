import { extendObservable, computed } from 'mobx'
import Events from './event-hub'
import {HOME, AWAY, OBSERVER} from './consts'

class GlobalInfo {
  constructor () {
    extendObservable(this, {
      user: null,
      isLogin: computed(() => !!this.user),
      teamInfo: null,
      lastWinner: null,
      gameSide: computed(() => {
        if (!this.teamInfo) return null
        if (this.teamInfo.home === this.user) return HOME
        if (this.teamInfo.away === this.user) return AWAY
        if (this.teamInfo.observer.indexOf(this.user) > -1) return OBSERVER
        return null
      }),
      isInplay: false,
      allUsers: []
    })
    Events.initWs()
    this.init()
  }

  init () {
    Events.getUsers().subscribe(users => this.allUsers = users)
    Events.getTeamsUpdate().subscribe(teamInfo => this.teamInfo = teamInfo)
    Events.getGameStatus().subscribe(data => {
      if (data.start) {
        this.isInplay = true
        return
      }
      if (data.end) {
        this.isInplay = false
        this.lastWinner = data.lastWinner
        return
      }
    })
  }

  login (username) {
    if (!username || this.user) return
    this.user = username
    Events.sentData({type: 'LOGIN', user: username})
  }

  logout () {
    Events.sentData({type: 'LOGOUT', user: this.user})
    this.user = null
  }

  getUser () {
    return this.isLogin ? this.user : null
  }

  chooseTeam (team) {
    Events.sentData({type: 'TEAM', choose: team, user: this.user})
  }

  startPlay () {
    Events.sentData({type: 'START'})
  }

  reSelectSide () {
    Events.sentData({type: 'TEAM', reselect: true, choose: this.gameSide.toLowerCase(), user: this.user})
  }
  
}

export default new GlobalInfo()