import { width, height, margin, pannelWidth, color } from './consts'

const renderBorder = (ctx) => {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(pannelWidth, 0)
  ctx.lineTo(pannelWidth, height)
  ctx.lineTo(0, height)
  ctx.lineTo(0, 0)
  ctx.stroke()
  ctx.closePath()
}

const renderTeam = (ctx, teamInfo = {}) => {
  let { home, away } = teamInfo
  ctx.beginPath()
  ctx.font = '30px 微软雅黑'
  ctx.textAlign = 'center'
  ctx.fillStyle = color.vs  
  ctx.fillText('vs',  pannelWidth / 2, 40)
  ctx.fill()
  ctx.fillStyle = color.Home
  ctx.font = '40px 微软雅黑'
  ctx.fillText(home,  pannelWidth / 4, 40)
  ctx.fill()  
  ctx.fillStyle = color.Away
  ctx.fillText(away,  pannelWidth * 3 / 4, 40)
  ctx.fill()  
  ctx.closePath()
}

const renderTip = (ctx, dataManager) => {
  let { tipsPiece } = dataManager
  let txt = tipsPiece ? tipsPiece.displayText : ''
  ctx.beginPath()
  ctx.font = `${pannelWidth * 0.5}px 微软雅黑`
  ctx.fillStyle = tipsPiece ? color[tipsPiece.team] : color.vs
  ctx.textAlign = 'center'
  ctx.fillText(txt,  pannelWidth / 2, 250)
  ctx.fill()  
  ctx.closePath()
}

const drawPannel = (ctx, dataManager, teamInfo) => {
  ctx.save()
  ctx.translate(width + margin, 0);
  renderBorder(ctx)
  renderTeam(ctx, teamInfo)
  renderTip(ctx, dataManager)
  ctx.restore()

}

export default drawPannel
