import React, { Component } from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

class Potal extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderChildren (props) {
    const {containerId, children} = props
    if (!containerId) return
    const containerEl = document.getElementById(containerId)
    unstable_renderSubtreeIntoContainer(this, <div>{children}</div>, containerEl)
  }

  componentDidMount() {
    this.renderChildren(this.props)
  }

  componentWillUnmount () {
    const {containerId} = this.props
    if (!containerId) return
    const containerEl = document.getElementById(containerId)
    unmountComponentAtNode(containerEl)
  }
  
  componentWillReceiveProps (nextProps) {
    this.renderChildren(nextProps)
  }

  render() {
    return null
  }

}

export default Potal;