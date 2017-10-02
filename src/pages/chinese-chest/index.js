import React, { Component } from 'react'
import DrawCanvas from './chest-canvas'
import DataManager from './data-manage'
import { margin } from './consts'

const canvasStyle = {
  margin: '10px'
}

class ChineseChest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAwayMode: false,
      lastData: null
    }
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
  }

  forceUpdateCanvas () {
    let piese = this.DataManager.getDisplayPieses()
    DrawCanvas(this.canvas, piese, this.state.isAwayMode)
  }

  toggleView () {
    this.setState({isAwayMode: !this.state.isAwayMode}, () => {
      if (this.state.lastData) {
        this.DataManager.load(this.state.lastData, this.state.isAwayMode)
      } else {
        this.DataManager = new DataManager(this.state.isAwayMode)
      }
      this.forceUpdateCanvas()
    })
  }

  save () {
    this.setState({lastData: this.DataManager.getSnapshot()})
  }

  componentDidMount () {
    this.DataManager = new DataManager(this.state.isAwayMode)
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
    let piese = this.DataManager.findPieceByPosition(positionInCanvas)
    if (piese) {
      this.hasMovingPiece = true
      this.DataManager.setActive(piese.pieceId)
    } else {
      this.DataManager.clearAllActive()
    }
    this.forceUpdateCanvas()
  }

  onMouseup (e) {
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    this.DataManager.dropPiese(positionInCanvas, (a) => console.log(a))
    this.hasMovingPiece = false
    this.DataManager.clearAllActive()
    this.forceUpdateCanvas()
  }

  onMouseMove (e) {
    if (!this.hasMovingPiece) return
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    this.DataManager.updateDynamicPosition(positionInCanvas)
    this.forceUpdateCanvas()
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleView()}>Toggle</button>
        <button onClick={() => this.save()}>Save</button>
        <canvas style={canvasStyle} onMouseUp={this.onMouseup} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} ref={ ref => {this.canvas = ref} } />
      </div>
    )
  }
}

export default ChineseChest
