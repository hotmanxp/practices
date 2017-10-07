import { totalWidth, totalHeight, margin } from './consts'
import drawBackground from './render-background'
import drawPiece from './render-pieces'
import drawPannel from './render-info-pannel'
import { drawMethod } from './utils'

const drawCanvas = (canvasEl, dataManager, teamInfo) => {
  const canvas = canvasEl
  canvas.width = totalWidth
  canvas.height = totalHeight
  const ctx = canvas.getContext('2d')
  ctx.translate(margin, margin);
  
  drawMethod(ctx, drawBackground)
  drawMethod(ctx, drawPiece, dataManager.getDisplayPieces(), dataManager.isAwayMode)
  drawMethod(ctx, drawPannel, dataManager, teamInfo)
}

export default drawCanvas
