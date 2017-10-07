const HOME = 'Home'
const AWAY = 'Away'
const OBSERVER = 'Observer'
const width = 680
const cellWidth = (width / 8)
const margin = cellWidth
const pannelWidth = 4 * cellWidth
const totalWidth = width + 2 * margin + pannelWidth + 10
const riverWidth = 1.3 * cellWidth
const height = cellWidth * 8 + riverWidth
const totalHeight = height + 2 * margin
const defaultBgColor = '#c33'
const pieceRadius = 0.4 * cellWidth
const color = {
  [HOME]: '#B80000',
  [AWAY]: '#333',
  bg: '#f9e367',
  vs: '#0000B8'
}
const homeCentrerPosition = [5, 9]
const awayCentrerPosition = [5, 2]

export {
  HOME,
  AWAY,
  OBSERVER,
  width,
  margin,
  totalWidth,
  pannelWidth,
  cellWidth,
  riverWidth,
  height,
  totalHeight,
  defaultBgColor,
  pieceRadius,
  color,
  homeCentrerPosition,
  awayCentrerPosition
}