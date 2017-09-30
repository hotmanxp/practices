import { pieceConfig } from './piece-config'
import Piece from './piece-model'
import { HOME, AWAY, pieceRadius } from './consts'
import { pieceMatrixToCanvasMatix } from './utils'

class DataManager {
  constructor () {
    this.allPieces = []
    this.activePiese = null
    this.init()
    this.initAllPositionInfo()
  }
  init () {
    let allPieces = [ HOME, AWAY ].reduce((acc, team) => {
      let piecesNames = Object.keys(pieceConfig)
      piecesNames.forEach( name => {
        acc.push(new Piece(team, name))
      })
      return acc
    }, [] )
    this.allPieces = allPieces
  }
  initAllPositionInfo () {
    this.allPosition = []
    for(let row = 1; row <=9; row++){
      for(let col = 1; col <= 10; col++) {
        let position = {}
        position.chessPosition = [col, row]
        position.canvasPosition = pieceMatrixToCanvasMatix([col, row])
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
      let canvasPosition = pieceMatrixToCanvasMatix(piece.currentPosition)
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
      piece.dynamicPosition = pieceMatrixToCanvasMatix(piece.currentPosition)
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
}

export default new DataManager()


