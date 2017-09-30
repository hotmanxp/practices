const HOME = 'Home'
const AWAY = 'Away'
const width = 680
const cellWidth = (width / 8)
const margin = cellWidth
const totalWidth = width + 2 * margin
const riverWidth = 1.5 * cellWidth
const height = cellWidth * 8 + riverWidth
const totalHeight = height + 2 *margin
const defaultBgColor = '#c33'
const pieceRadius = 0.35 * cellWidth
const color = {
  [HOME]: '#B80000',
  [AWAY]: '#000',
  bg: '#f9e367'
}


export {
  HOME,
  AWAY,
  width,
  margin,
  totalWidth,
  cellWidth,
  riverWidth,
  height,
  totalHeight,
  defaultBgColor,
  pieceRadius,
  color
}