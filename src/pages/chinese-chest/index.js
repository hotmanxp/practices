import React, { Component } from 'react'
import DrawCanvas from './chest-canvas'
import DataManager from './data-manage'
import { margin } from './consts'
console.log(DataManager)

const canvasStyle = {
  margin: '10px'
}

class ChineseChest extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
  }

  forceUpdateCanvas () {
    let piese = DataManager.getDisplayPieses()
    DrawCanvas(this.canvas, piese)
  }

  componentDidMount () {
    this.forceUpdateCanvas()
    let rect = this.canvas.getClientRects()[0]
    this.canvasOffset = {
      x: rect.left,
      y: rect.top
    }
  }

  getCanvasPositionByMouse ({x, y}) {
    let dx = x - this.canvasOffset.x
    let dy = y - this.canvasOffset.y
    return {
      x: dx - margin,
      y: dy - margin
    }
  }

  getCanvasPositionByEvent (e) {
    return this.getCanvasPositionByMouse({x: e.pageX, y: e.pageY})
  }

  onMouseDown (e) {
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    let piese = DataManager.findPieceByPosition(positionInCanvas)
    if (piese) {
      this.hasMovingPiece = true
      DataManager.setActive(piese.pieceId)
    } else {
      DataManager.clearAllActive()
    }
    this.forceUpdateCanvas()
  }

  onMouseup (e) {
    this.hasMovingPiece = false
    DataManager.clearAllActive()
    this.forceUpdateCanvas()
  }

  onMouseMove (e) {
    if (!this.hasMovingPiece) return
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    DataManager.updateDynamicPosition(positionInCanvas)
    this.forceUpdateCanvas()
  }

  render() {
    return (
      <div>
        <canvas style={canvasStyle} onMouseUp={this.onMouseup} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} ref={ ref => {this.canvas = ref} } />
      </div>
    )
  }
}

export default ChineseChest
