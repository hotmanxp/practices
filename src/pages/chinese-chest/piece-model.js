import { getPieceByname } from './piece-config'
import { pieceMatrixToCanvasMatix } from './utils'

export default class Piece {
  constructor (team, pieceKey, isAwayMode) {
    const {displayText, startPosition, rules } = getPieceByname(pieceKey) || {}
    this.team = team
    this.pieceId = `id${team}${pieceKey}`
    this.displayText = displayText[team]
    this.startPosition = startPosition[team]
    this.currentPosition = this.startPosition
    this.isAlive = true
    this.isActive = false
    this.dynamicPosition = pieceMatrixToCanvasMatix(this.currentPosition, isAwayMode)
    this.positionRef = null
    this.rules = rules
    this.isAwayMode = isAwayMode
  }

  updatePosition (position) {
    this.currentPosition = position
    this.dynamicPosition = pieceMatrixToCanvasMatix(position, this.isAwayMode)
  }

  kill () {
    this.isAlive = false
  }

  move (targetPosition, callBack) {
    let originPiece = targetPosition.piece
    if (originPiece && originPiece.team !== this.team) {
      originPiece.kill()
    }
    this.positionRef.piece = null
    this.positionRef = targetPosition
    targetPosition.piece = this
    this.updatePosition(targetPosition.chessPosition)
    callBack && callBack(this)
  }

  render (ctx) {
    // Todo
  }

}