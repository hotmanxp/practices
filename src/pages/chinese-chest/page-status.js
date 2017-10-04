import { extendObservable, computed } from 'mobx'
import Services from './service'
import Events from './event-hub'

class GlobalInfo {
  constructor () {
    extendObservable(this, {
      user: null,
      isLogin: computed(() => !!this.user),
      gameSide: null,
      isInplay: computed(() =>!!this.gameSide),
      allUsers: []
    })
    Events.initWs()
    this.init()

    //this.initWs()
  }

  init () {
    Events.getUsers().subscribe(users => this.allUsers = users)
  }


  login (username) {
    if (!username || this.user) return
    Events.sentData({type: 'LOGIN', user: username})
  }

  logout () {
    this.user = null
  }

  getUser () {
    return this.isLogin ? this.user : null
  }

  startPlay (teamSide) {
    if(!teamSide) return
    this.gameSide = teamSide
  }
  endPlay () {
    this.gameSide = null
  }
}

export default new GlobalInfo()