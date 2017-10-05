import React, { Component } from 'react'
import { observer } from 'mobx-react'
import GlobalInfo from './page-status'
import Login from './login-cmp'
import ChessCanvas from './canvas-cmp'


class ChineseChess extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render() {
    if (!GlobalInfo.isInplay) return <Login />
    return (
      <ChessCanvas />
    )
  }
}

export default observer(ChineseChess)
