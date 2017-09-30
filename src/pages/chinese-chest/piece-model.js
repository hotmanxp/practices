import { getPieceByname } from './piece-config'
import { pieceMatrixToCanvasMatix } from './utils'

export default class Piece {
  constructor (team, pieceKey) {
    const {displayText, startPosition} = getPieceByname(pieceKey) || {}
    this.team = team
    this.pieceId = `id${team}${pieceKey}`
    this.displayText = displayText[team]
    this.startPosition = startPosition[team]
    this.currentPosition = this.startPosition
    this.isAlive = true
    this.isActive = false
    this.dynamicPosition = pieceMatrixToCanvasMatix(this.currentPosition)
  }

  updatePosition (position) {
    this.currentPosition = position
    this.dynamicPosition = pieceMatrixToCanvasMatix(position)
  }

  kill () {
    this.isAlive = false
  }

  render (ctx) {
    // Todo
  }

}