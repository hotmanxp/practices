import { pieceRadius, color } from './consts'
import { pieceMatrixToCanvasMatix } from './utils'

function renderPiece (ctx, isAwayMode) {
  let isActive = this.isActive
  let displayPosition = isActive ? this.dynamicPosition : pieceMatrixToCanvasMatix(this.currentPosition, isAwayMode)
  let { x, y } = displayPosition
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = color.bg
  ctx.lineWidth = isActive ? 5 : 2
  ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false);
  ctx.fill()
  ctx.fillStyle = color[this.team]
  ctx.strokeStyle = color[this.team]
  ctx.font = `${pieceRadius}px 微软雅黑`
  ctx.fillText(this.displayText, x - pieceRadius * 0.5 , y + pieceRadius * 0.38)
  ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}


const drawPiece =  (ctx, list, isAwayMode) => {
  list.forEach(i => renderPiece.call(i, ctx, isAwayMode))
}

export default drawPiece