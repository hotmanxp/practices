import { cellWidth, riverWidth, pieceRadius, color } from './consts'

const mapPositionToCoordinates = ([x, y] = [0, 0]) => {
  x = (x - 1) * cellWidth
  y = y > 4 ? (y - 2) * cellWidth + riverWidth : (y - 1) * cellWidth
  return {
    x,
    y
  }
}

function renderPiece (ctx) {
  let isActive = this.isActive
  let displayPosition = isActive ? this.dynamicPosition : mapPositionToCoordinates(this.currentPosition)
  let { x, y } = displayPosition
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = color.bg
  ctx.lineWidth = isActive ? 5 : 2
  ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false);
  ctx.fill()
  ctx.fillStyle = color[this.team]
  ctx.strokeStyle = color[this.team]
  ctx.font = '27px 微软雅黑'
  ctx.fillText(this.displayText, x - 13 , y + 10)
  ctx.arc(x, y, pieceRadius, 0, Math.PI*2, false)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}


const drawPiece =  (ctx, list) => {
  list.forEach(i => renderPiece.call(i, ctx))
}

export default drawPiece