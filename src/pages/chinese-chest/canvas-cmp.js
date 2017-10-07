import React, { Component } from 'react'
import DrawCanvas from './chest-canvas'
import DataManager from './data-manage'
import { margin, HOME, AWAY } from './consts'
import GlobalInfo from './page-status'
import Events from './event-hub'

const canvasStyle = {
  margin: '10px'
}

class ChessCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
  }

  forceUpdateCanvas () {
    DrawCanvas(this.canvas, this.dataManager, GlobalInfo.teamInfo)
  }

  onWin (team) {
    Events.annournceWin(team)
  }

  async componentDidMount () {
    this.dataManager = new DataManager(GlobalInfo.gameSide === AWAY, this.onWin)
    this.forceUpdateCanvas()
    let rect = this.canvas.getClientRects()[0]
    this.canvasOffset = {
      x: rect.left,
      y: rect.top
    }
    this.subscribeGameMessage = Events.getGameDataMessage().subscribe(nextStep => {
      this.dataManager.updateByNextStep(nextStep)
      this.forceUpdateCanvas()
    })
  }

  componentWillUnmount() {
    this.subscribeGameMessage.dispose()
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

  canControl () {
    return (GlobalInfo.gameSide === HOME && (this.dataManager.step % 2 === 0)) || (GlobalInfo.gameSide === AWAY && (this.dataManager.step % 2 === 1)) 
  }

  onMouseDown (e) {
    if (!this.canControl()) return
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
    if (!this.canControl()) return
    let positionInCanvas = this.getCanvasPositionByEvent(e)
    this.dataManager.dropPiece(positionInCanvas, (dropInfo) => {
      Events.sendNext({pieceId: dropInfo.pieceId, step: dropInfo.step, nextPosition: dropInfo.move.to})
    })
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
        <canvas style={canvasStyle} onMouseUp={this.onMouseup} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} ref={ ref => {this.canvas = ref} } />
      </div>
    )
  }
}

export default ChessCanvas
