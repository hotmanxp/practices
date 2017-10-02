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
    let piece = this.dataManager.getDisplayPieces()
    DrawCanvas(this.canvas, piece, this.state.isAwayMode)
  }

  toggleView () {
    this.setState({isAwayMode: !this.state.isAwayMode}, () => {
      if (this.state.lastData) {
        this.dataManager.load(this.state.lastData, this.state.isAwayMode)
      } else {
        this.dataManager = new DataManager(this.state.isAwayMode)
      }
      this.forceUpdateCanvas()
    })
  }

  save () {
    this.setState({lastData: this.dataManager.getSnapshot()})
  }

  componentDidMount () {
    this.dataManager = new DataManager(this.state.isAwayMode)
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
    let piece = this.dataManager.findPieceByPosition(positionInCanvas)
    if (piece) {
      this.hasMovingPiece = true
      this.dataManager.setActive(piece.pieceId)
    } else {
      this.dataManager.clearAllActive()
    }
    this.forceUpdateCanvas()
  }

  onMouseup (e) {
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    this.dataManager.dropPiece(positionInCanvas, (a) => console.log(a))
    this.hasMovingPiece = false
    this.dataManager.clearAllActive()
    this.forceUpdateCanvas()
  }

  onMouseMove (e) {
    if (!this.hasMovingPiece) return
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    this.dataManager.updateDynamicPosition(positionInCanvas)
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
