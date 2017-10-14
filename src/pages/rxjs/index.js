import React, { Component } from 'react';
import { observer } from 'mobx-react'
import store from './models'
import {Observable, BehaviorSubject} from 'rx-lite'

class RxjsTest extends Component {
  componentDidMount () {
    let mouseClicks = Observable.fromEvent(this.btn, 'click')
    .map((e, idx) => {
      console.log(e)
      return idx + 1
    })
    .startWith(0)
    let reRendersSubject = Observable.combineLatest(store.combinedSubject, mouseClicks, ({time, count}, mouseClick) => {
      return {
        time,
        count,
        mouseClick
      }
    })
    console.log(store.subject, 'dd')
    reRendersSubject.subscribe(store.subject)
  }
  render() {
    return (
      <div>
        Rxjs
        <div>Time is:{store.time}</div>
        <div>{`count is: ${store.count}`}</div>
        <div><span>{`mouse-click: ${store.mouseClick}`}</span><button ref={btn => this.btn = btn}>Add</button></div>
      </div>
    );
  }
}

export default observer(RxjsTest);
