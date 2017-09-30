import { width, height, cellWidth,riverWidth } from './consts'
import { drawMethod } from './utils'

const drawLine = (ctx, start, end) => {
  ctx.moveTo(start.x, start.y)
  ctx.lineTo(end.x, end.y)
}



const drawSide = (ctx, position) => {
  let startPosition = null
  let offset = cellWidth

  if (position === 'north') {
    startPosition = {x: 0, y: 0}
  } else {
    startPosition = {x: 0, y: height}
    offset = -1 * cellWidth
  }

  const drawLines = () => {
    // draw horizantal
    for(let i = 0; i < 4; i++) {
      ctx.moveTo(startPosition.x, startPosition.y + i * offset)
      ctx.lineTo(width - 1, startPosition.y + i * offset)
    }
    // draw vertical
    for(let i = 0; i < 9; i++) {
      ctx.moveTo(startPosition.x + i * cellWidth, startPosition.y)
      ctx.lineTo(startPosition.x + i * cellWidth, startPosition.y + 4 * offset)
    }
  }

  const drawCenter = () => {
    const centerPosition = {
      x: startPosition.x + 4 * cellWidth,
      y: startPosition.y + offset
    }
    const deltToAbsolute = ([dx, dy]) =>({
      x: centerPosition.x + dx * cellWidth,
      y: centerPosition.y + dy * cellWidth
    })
    drawLine(ctx, centerPosition, deltToAbsolute([-1, -1]))
    drawLine(ctx, centerPosition, deltToAbsolute([-1, 1]))
    drawLine(ctx, centerPosition, deltToAbsolute([1, -1]))
    drawLine(ctx, centerPosition, deltToAbsolute([1, 1]))
  }

  ctx.beginPath()
  drawLines()
  drawCenter()
  ctx.stroke()
  ctx.closePath()
}
const drawRiver = (ctx) => {
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(0, 4 * cellWidth)
  ctx.lineTo(width - 0, 4 * cellWidth)
  ctx.lineTo(width -0 , 4 * cellWidth + riverWidth)
  ctx.lineTo(0, 4 * cellWidth + riverWidth)
  ctx.lineTo(0, 4 * cellWidth)
  ctx.closePath()
  ctx.stroke()

}

const drawBackground = (ctx) => {
  drawSide(ctx, 'north')
  drawSide(ctx, 'south')
  drawMethod(ctx, drawRiver)
}
export default drawBackground