import { pieceConfig } from './piece-config'
import Piece from './piece-model'
import { HOME, AWAY, pieceRadius } from './consts'
import { pieceMatrixToCanvasMatix } from './utils'

class DataManager {
  constructor (isAwayMode) {
    this.allPieces = []
    this.activePiese = null
    this.isAwayMode = isAwayMode
    this.initAllPositionInfo(this.isAwayMode)
    this.initAllPiese()
    this.step = 0
    this.record = []
  }
  initAllPiese () {
    let allPieces = [ HOME, AWAY ].reduce((acc, team) => {
      let piecesNames = Object.keys(pieceConfig)
      piecesNames.forEach( name => {
        let piece = new Piece(team, name)
        let initPosition = this.allPosition.find(po => po.chessPosition[0] === piece.startPosition[0] && po.chessPosition[1] === piece.startPosition[1] )
        if(initPosition){
          initPosition.piece = piece
          piece.positionRef = initPosition
        }
        acc.push(piece)
      })
      return acc
    }, [] )
    this.allPieces = allPieces
  }
  recordMove ({pieceId, move}) {
    this.step += 1
    this.record.push({pieceId, move})
  }

  restorePosition () {
    let shownPieces = this.getDisplayPieses()
    this.initAllPositionInfo(this.isAwayMode)
    shownPieces.forEach(p => {
      let initPosition = this.allPosition.find(po => po.chessPosition[0] === p.startPosition[0] && po.chessPosition[1] === p.startPosition[1] )
      if(initPosition){
        initPosition.piece = p
        p.positionRef = initPosition
      }
    })
  }

  initAllPositionInfo (isAwayMode) {
    this.allPosition = []
    for(let row = 1; row <=10; row++){
      for(let col = 1; col <= 9; col++) {
        let position = {}
        position.chessPosition = [col, row]
        position.canvasPosition = pieceMatrixToCanvasMatix([col, row], isAwayMode)
        position.piece = null
        this.allPosition.push(position)
      }
    }
  }
  getDisplayPieses () {
    return this.allPieces.filter(i => i.isAlive)
  }
  killPiece (pieceId) {
    let piece = this.allPieces.find(i => i.pieceId === pieceId)
    if (piece) {
      piece.isAlive = false
    }
  }
  findPieceByPosition ({x, y}) {
    const isInPiece = (piece, x, y) => {
      let canvasPosition = pieceMatrixToCanvasMatix(piece.currentPosition, this.isAwayMode)
      let distant = Math.sqrt(Math.pow(x - canvasPosition.x, 2) + Math.pow(y - canvasPosition.y, 2))
      return distant <= pieceRadius
    }
    return this.getDisplayPieses().find(i => isInPiece(i, x, y))
  }
  clearAllActive () {
    this.allPieces.forEach( i => {
      i.isActive = false
    })
    this.activePiese = null
  }
  setActive (pieceId) {
    let piece = this.allPieces.find(i => i.pieceId === pieceId)
    this.clearAllActive()
    if (piece) {
      piece.isActive = true
      piece.dynamicPosition = pieceMatrixToCanvasMatix(piece.currentPosition, this.isAwayMode)
      this.activePiese = piece
      this.allPieces.sort(i => piece === i)
    }
  }
  updateDynamicPosition ({x, y}) {
    if (!this.activePiese) return
    this.activePiese.dynamicPosition = {x, y}
  }
  findClostPosition ({x, y}) {
    let targetPosition = this.allPosition.find(po => {
      let { canvasPosition } = po
      let distant = Math.sqrt(Math.pow(x - canvasPosition.x, 2) + Math.pow(y - canvasPosition.y, 2))
      return distant <= pieceRadius
    })
    return targetPosition
  }

  checkCanMove (position) {
    let targetPosition = this.findClostPosition(position)
    if (!targetPosition) return null
    if (targetPosition.piece && targetPosition.piece.team === this.activePiese.team) return null
    return targetPosition
  }

  dropPiese (position, succesCallback) {
    if (!this.activePiese) return
    if (this.activePiese.team === HOME && (this.step % 2)) return
    if (this.activePiese.team === AWAY && !(this.step % 2)) return
    let targetPosition = this.checkCanMove(position)
    if (!targetPosition) return
    let canMove = this.activePiese.rules(this.allPosition, targetPosition.chessPosition)
    if (!canMove) return
    let moveRecord = {pieceId: this.activePiese.pieceId, move:{from: this.activePiese.chessPosition, to: targetPosition.chessPosition}}
    this.recordMove(moveRecord)
    this.activePiese.move(targetPosition)
    succesCallback && succesCallback({...moveRecord, step: this.step})
  }

  getSnapshot () {
    return {
      step: this.step,
      record: this.record,
      pieces: this.allPieces
    }
  }

  load (bakInfo, isAwayMode) {
    let {step, record, pieces} = bakInfo
    this.step = step
    this.record = record
    this.allPieces = pieces
    this.isAwayMode = isAwayMode
    this.restorePosition()
  }
}

export default DataManager


