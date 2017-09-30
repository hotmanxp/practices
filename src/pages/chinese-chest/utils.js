import { defaultBgColor, cellWidth, riverWidth, margin } from './consts'

const setDefaulStyle = (ctx, color=defaultBgColor) => {
  ctx.strokeStyle = color
  ctx.lineWidth = 2
}

const drawMethod = (ctx, paintMethod, params) => {
  ctx.save()
  setDefaulStyle(ctx)
  paintMethod(ctx, params)
  ctx.restore()
}
const pieceMatrixToCanvasMatix = ([px, py]) => {
  let oriX = (px - 1) * cellWidth
  let oriY = py > 4 ? (py - 2) * cellWidth + riverWidth : (py - 1) * cellWidth
  return {x: oriX, y: oriY}
}

const canvasPositionToMatrixPosition = ({x, y}) => {
  return {
    x: x - margin,
    y: y - margin
  }
}

export {
  drawMethod,
  pieceMatrixToCanvasMatix,
  canvasPositionToMatrixPosition
}