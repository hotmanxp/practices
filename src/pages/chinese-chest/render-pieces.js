import { HOME, AWAY, cellWidth, riverWidth, pieceRadius, color } from './consts'
import { pieceConfig } from './piece-config'
import Piece from './piece-model'

let allPieces = [ HOME, AWAY ].reduce((acc, team) => {
  let piecesNames = Object.keys(pieceConfig)
  piecesNames.forEach( name => {
    acc.push(new Piece(team, name))
  })
  return acc
}, [] )

const mapPositionToCoordinates = ([x, y] = [0, 0]) => {
  x = (x - 1) * cellWidth
  y = y > 4 ? (y - 2) * cellWidth + riverWidth : (y - 1) * cellWidth
  return {
    x,
    y
  }
}

function renderPiece (ctx) {
  let {x, y} = mapPositionToCoordinates(this.currentPosition)
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#fce'
  
  ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false);
  ctx.fill()
  ctx.fillStyle = color[this.team]
  ctx.font = '27px 微软雅黑'
  ctx.fillText(this.displayText, x - 13 , y + 10)
  ctx.closePath()
  ctx.restore()
}

allPieces.forEach (piece => {
  piece.render = renderPiece
})

const drawPiece =  (ctx) => {
  allPieces.forEach(i => i.render(ctx))
}

export default drawPiece