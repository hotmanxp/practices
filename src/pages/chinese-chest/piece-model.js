import { getPieceByname } from './piece-config'

export default class Piece {
  constructor (team, pieceKey) {
    const {displayText, startPosition} = getPieceByname(pieceKey) || {}
    this.team = team
    this.pieceId = `id${team}${pieceKey}`
    this.displayText = displayText[team]
    this.startPosition = startPosition[team]
    this.currentPosition = this.startPosition
    this.isAlive = true
  }

  updatePosition (position) {
    this.currentPosition = position  
  }

  kill () {
    this.isAlive = false
  }

  render (ctx) {
    // Todo
  }

}