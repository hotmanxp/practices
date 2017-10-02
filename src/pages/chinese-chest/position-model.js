import { pieceMatrixToCanvasMatix } from './utils'

class Position {
  constructor (po, isAwayMode) {
    this.chessPosition = po
    this.canvasPosition = pieceMatrixToCanvasMatix(po, isAwayMode)
    this.piece = null
  }

  updatePiece (piece) {
    this.piece = piece
  }
  
}

export default Position
