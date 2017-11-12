import React, { Component } from 'react';
import './layout.css'

class RemLayout extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showAction: false
    }
  }
  set100Height = (hasActionPart) => {
    let windowHeight = window.innerHeight
    let htmlEl = document.getElementsByTagName('html')[0]
    htmlEl.style.fontSize = hasActionPart ? `${(windowHeight - 50) / 10}px` : `${windowHeight / 10}px`
  }
  showBottom = () => {
    
    this.setState(({showAction}) => ({showAction: !showAction}), () => this.set100Height(this.state.showAction))
  }
  render() {
    return (
      <div className='layout-page'>
        <div><button onClick={this.showBottom}>Add action part</button></div>
        layout
        <div className='half-container'>50% container</div>
        {this.state.showAction && <div className='action-part'>This is action part</div>}
      </div>
    );
  }
}

export default RemLayout
