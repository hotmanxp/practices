import { defaultBgColor } from './consts'

const setDefaulStyle = (ctx, color=defaultBgColor) => {
  ctx.strokeStyle = color
  ctx.lineWidth = 2
}

const drawMethod = (ctx, paintMethod) => {
  ctx.save()
  setDefaulStyle(ctx)
  paintMethod(ctx)
  ctx.restore()
}

export {
  drawMethod
}