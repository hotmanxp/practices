import { extendObservable, computed } from 'mobx'
import { Subject, Observable } from 'rx-lite'

class Store {
  constructor () {
    extendObservable(this, {
      count: 0,
      mouseClick: 0,
      time: null
    })
    this.subject = new Subject()
    this.init()
  }

  init () {
    let times = Observable.interval(1000).map(next => new Date().toString())
    let counts = Observable.interval(30)
    this.combinedSubject = Observable.combineLatest(times, counts, (time, count) => {
      return {
        time,
        count
      }
    })
    //this.combinedSubject.subscribe(this.subject)
    this.subject.subscribe(({time, mouseClick, count}) => {
      this.count = count
      this.time = time
      this.mouseClick = mouseClick
    })
  }

}

export default new Store()