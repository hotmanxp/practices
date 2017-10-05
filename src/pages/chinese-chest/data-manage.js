import { pieceConfig } from './piece-config'
import Piece from './piece-model'
import Position from './position-model'
import { HOME, AWAY, pieceRadius } from './consts'
import { pieceMatrixToCanvasMatix, findPositionObjByChessPosition } from './utils'

class DataManager {
  constructor (isAwayMode, winHook) {
    this.allPieces = []
    this.activePiece = null
    this.isAwayMode = isAwayMode
    this.initAllPositionInfo(this.isAwayMode)
    this.initAllPiece()
    this.step = 0
    this.isFreeze = false
    this.record = []
    this.winHook = winHook
  }
  initAllPiece () {
    let allPieces = [ HOME, AWAY ].reduce((acc, team) => {
      let piecesNames = Object.keys(pieceConfig)
      piecesNames.forEach( name => {
        let piece = new Piece(team, name)
        let initPosition = findPositionObjByChessPosition(this.allPosition, piece.startPosition)
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
    let shownPieces = this.getDisplayPieces()
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
        let position = new Position([col, row], isAwayMode)
        this.allPosition.push(position)
      }
    }
  }

  getDisplayPieces () {
    return this.allPieces.filter(i => i.isAlive)
  }

  killPiece (pieceId) {
    let piece = this.allPieces.find(i => i.pieceId === pieceId)
    if (piece) {
      piece.isAlive = false
    }
  }

  updateByNextStep (nextStep) {
    this.isFreeze = true
    this.activePiece = this.allPieces.find(p => p.pieceId === nextStep.pieceId)
    let targetPosition = findPositionObjByChessPosition(this.allPosition, nextStep.nextPosition)
    this.nextStep(targetPosition)
    this.isFreeze = false
  }

  checkWin () {
    let aliveJiangs = this.getDisplayPieces().filter(p => p.pieceId.indexOf('jiang') > -1)
    let gameEnd = false
    let winTeam = null
    if (aliveJiangs.length < 2){
      gameEnd = true
      winTeam = aliveJiangs[0].pieceId.toLowerCase().indexOf('home') > -1 ? HOME : AWAY
    }
    if (gameEnd) {
      this.winHook && this.winHook(winTeam)
      return winTeam
    }
    return null
  }

  nextStep (targetPosition) {
    let moveRecord = {pieceId: this.activePiece.pieceId, move:{from: this.activePiece.currentPosition, to: targetPosition.chessPosition}}
    this.recordMove(moveRecord)
    this.activePiece.move(targetPosition)
    return this.checkWin() ? null : {...moveRecord, step: this.step}
  }

  findPieceByPosition ({x, y}) {
    const isInPiece = (piece, x, y) => {
      let canvasPosition = pieceMatrixToCanvasMatix(piece.currentPosition, this.isAwayMode)
      let distant = Math.sqrt(Math.pow(x - canvasPosition.x, 2) + Math.pow(y - canvasPosition.y, 2))
      return distant <= pieceRadius
    }
    return this.getDisplayPieces().find(i => isInPiece(i, x, y))
  }

  clearAllActive () {
    this.allPieces.forEach( i => {
      i.isActive = false
    })
    this.activePiece = null
  }

  setActive (pieceId) {
    let piece = this.allPieces.find(i => i.pieceId === pieceId)
    this.clearAllActive()
    if (piece) {
      piece.isActive = true
      piece.dynamicPosition = pieceMatrixToCanvasMatix(piece.currentPosition, this.isAwayMode)
      this.activePiece = piece
      this.allPieces.sort(i => piece === i)
    }
  }

  updateDynamicPosition ({x, y}) {
    if (!this.activePiece || this.isFreeze) return
    this.activePiece.dynamicPosition = {x, y}
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
    if (targetPosition.piece && targetPosition.piece.team === this.activePiece.team) return null
    return targetPosition
  }

  dropPiece (position, succesCallback) {
    if (!this.activePiece) return
    if (this.activePiece.team === HOME && (this.step % 2)) return
    if (this.activePiece.team === AWAY && !(this.step % 2)) return
    let targetPosition = this.checkCanMove(position)
    if (!targetPosition) return
    let canMove = this.activePiece.rules(this.allPosition, targetPosition.chessPosition)
    if (!canMove) return
    let moveRecord = this.nextStep(targetPosition)
    moveRecord && succesCallback && succesCallback(moveRecord)
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


