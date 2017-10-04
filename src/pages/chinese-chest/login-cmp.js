import React, { Component } from 'react';
import GlobalInfo from './page-status'
import { observer } from 'mobx-react'

class LoginInfo extends Component {
  constructor (props) {
    super (props)
    this.state ={}
  }
  render() {
    return (
      <div>
        <div>{`Users: ${GlobalInfo.allUsers.join(' ,')}`}</div>
        <div>Please login...</div>
        <input placeholder='Enter your nick name' ref='username' />
        <button onClick={() => GlobalInfo.login(this.refs.username.value)}>Confirm</button>
      </div>
    )
  }
}

export default observer(LoginInfo)
