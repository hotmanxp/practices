import React, { Component } from 'react'
import DrawCanvas from './chest-canvas'
import DataManager from './data-manage'
import { margin, AWAY } from './consts'
import { observer } from 'mobx-react'
import GlobalInfo from './page-status'
import Login from './login-cmp'
import Events from './event-hub'

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
    DrawCanvas(this.canvas, piece, GlobalInfo.gameSide === AWAY)
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

  initChess () {
    this.dataManager = new DataManager(GlobalInfo.gameSide === AWAY)
    this.forceUpdateCanvas()
    let rect = this.canvas.getClientRects()[0]
    this.canvasOffset = {
      x: rect.left,
      y: rect.top
    }
    Events.getGameDataMessage().subscribe(nextStep => {
      console.log(nextStep)
      this.dataManager.updateByNextStep(nextStep)
      this.forceUpdateCanvas()
    })
  }

  async componentDidMount () {
    Events.getGameStatus().subscribe((isStart) => {
      if(isStart) {
        this.initChess()
      }
    })
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
    this.dataManager.dropPiece(positionInCanvas, (dropInfo) => {
      Events.sendNext({pieceId: dropInfo.pieceId, nextPosition: dropInfo.move.to})
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
    if (!GlobalInfo.isInplay) return <Login />
    return (
      <div>
        <canvas style={canvasStyle} onMouseUp={this.onMouseup} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} ref={ ref => {this.canvas = ref} } />
      </div>
    )
  }
}

export default observer(ChineseChest)
