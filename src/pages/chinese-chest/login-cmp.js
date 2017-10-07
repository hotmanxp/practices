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
        <div>{`Login Users: ${GlobalInfo.allUsers.join(' ,')}`}</div>
        {GlobalInfo.isLogin ? <div>
          <span>{`Hi, ${GlobalInfo.user}`}</span>
          <button onClick={() => GlobalInfo.logout()}>Logout</button>
          <div>
            {GlobalInfo.gameSide ? 
              <div>{`Side: ${GlobalInfo.gameSide}`}<button onClick={() => GlobalInfo.reSelectSide()}>Re-select</button></div>
              : <div>
                <div>Choose...</div>
                <div>
                  <button disabled={GlobalInfo.teamInfo.home} onClick={() => GlobalInfo.chooseTeam('home')}>Home</button>
                  <button disabled={GlobalInfo.teamInfo.away} onClick={() => GlobalInfo.chooseTeam('away')}>Away</button>
                  <button onClick={() => GlobalInfo.chooseTeam('observer')}>Observer</button>
                </div>
              </div>
            }
          </div>
          <div><button disabled={!GlobalInfo.teamInfo.away || !GlobalInfo.teamInfo.home } onClick={() => {GlobalInfo.startPlay()}}>Start</button></div>
          <div>
          </div>
        </div>
        : <div>
          <div>Please login...</div>
          <input placeholder='Enter your nick name' ref='username' />
          <button onClick={() => GlobalInfo.login(this.refs.username.value)}>Confirm</button>
        </div>}
      </div>
    )
  }
}

export default observer(LoginInfo)
