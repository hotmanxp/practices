const HOME = 'Home'
const AWAY = 'Away'
const OBSERVER = 'Observer'
const width = 680
const cellWidth = (width / 8)
const margin = cellWidth
const totalWidth = width + 2 * margin
const riverWidth = 1.3 * cellWidth
const height = cellWidth * 8 + riverWidth
const totalHeight = height + 2 * margin
const defaultBgColor = '#c33'
const pieceRadius = 0.4 * cellWidth
const color = {
  [HOME]: '#B80000',
  [AWAY]: '#000',
  bg: '#f9e367'
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