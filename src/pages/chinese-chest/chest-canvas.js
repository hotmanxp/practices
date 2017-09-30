import { totalWidth, totalHeight, margin } from './consts'
import drawBackground from './render-background'
import drawPiece from './render-pieces'
import { drawMethod } from './utils'

const drawCanvas = (canvasEl) => {
  const canvas = canvasEl
  canvas.width = totalWidth
  canvas.height = totalHeight
  const ctx = canvas.getContext('2d')
  ctx.translate(margin, margin);
  
  drawMethod(ctx, drawBackground)
  drawMethod(ctx, drawPiece)
}

export default drawCanvas
