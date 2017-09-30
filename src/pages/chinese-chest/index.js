import React, { Component } from 'react'
import DrawCanvas from './chest-canvas'

const canvasStyle = {
  margin: '10px'
}

class ChineseChest extends Component {

  componentDidMount () {
    DrawCanvas(this.canvas)
  }

  render() {
    return (
      <div>
        <canvas style={canvasStyle} ref={ ref => {this.canvas = ref} } />
      </div>
    )
  }
}

export default ChineseChest
