import React, { Component } from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

class Potal extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderChildren () {
    const {containerId, renderContent, children} = this.props
    if (!containerId) return
    const containerEl = document.getElementById(containerId)
    const content = renderContent
      ? renderContent()
      : children
      console.log(content, 'constene')
    unstable_renderSubtreeIntoContainer(this, <div>{content}</div>, containerEl)
  }

  componentDidMount() {
    this.renderChildren()
  }

  componentWillUnmount () {
    const {containerId} = this.props
    if (!containerId) return
    const containerEl = document.getElementById(containerId)
    unmountComponentAtNode(containerEl)
  }
  
  componentWillReceiveProps () {
    this.renderChildren()
  }

  render() {
    return null
  }

}

export default Potal;