import { HOME, homeCentrerPosition, awayCentrerPosition } from './consts'
import {findPositionObjByChessPosition} from './utils'

const isSameLine = (currentPosition, targetPosition) => {
  let [curCol, curRow] = currentPosition
  let [nextCol, nextRow] = targetPosition
  if (curCol !== nextCol && curRow !== nextRow) return false
  return true
}

const getRange = (start, end) => {
  let max = Math.max(start, end)
  let min = Math.min(start, end)
  return [min, max]
}

const inRange = (start, end, num) => {
  let [min, max] = getRange(start, end)
  return num > min && num < max
}

const calcDistance = (po1, po2) => {
  return Math.pow(po1[0] - po2[0], 2) + Math.pow(po1[1] - po2[1], 2)
}

const inCenter = (isHome, position) => {
  if (isHome) {
    if(calcDistance(position, homeCentrerPosition) > 2) return false
  } else {
    if(calcDistance(position, awayCentrerPosition) > 2) return false
  }
  return true
}


const getLineMember = (allList, num, isCol) => {
  let props = isCol ? 0 : 1
  let list = allList.slice()
  let resultList = list.filter(po => po.chessPosition[props] === num)
  resultList.sort((po1, po2) => po1.chessPosition[props] - po2.chessPosition[props])
  return resultList
}

const checkBetweenPiese = (positionInfo, currentPosition, targetPosition) => {
  if(!isSameLine(currentPosition, targetPosition)) return []
  let [curCol, curRow] = currentPosition
  let [nextCol, nextRow] = targetPosition
  let isSameCol = curCol === nextCol
  if (isSameCol) {
    return getLineMember(positionInfo, curCol, true)
    .filter(po => inRange(curRow, nextRow, po.chessPosition[1]))
    .filter(po => po.piece)
  } else {
    return getLineMember(positionInfo, curRow, false)
    .filter(po => inRange(curCol, nextCol, po.chessPosition[0]))
    .filter(po => po.piece)
  }
}

const isHorizatalMoveOne = (currentPosition, targetPosition) => {
  return (calcDistance(targetPosition, currentPosition) === 1) && (targetPosition[1] - currentPosition[1] === 0)
}

function bingRule (positionInfo, targetPosition) {
  const isHome = this.team === HOME
  if (calcDistance(this.currentPosition, targetPosition) > 1) return false
  if (isHome && (targetPosition[1] - this.currentPosition[1] === -1)) return true
  if (!isHome && (targetPosition[1] - this.currentPosition[1] === 1)) return true
  if (isHome) {
    if (this.currentPosition[1] <= 5 && isHorizatalMoveOne(this.currentPosition, targetPosition)) return true
  } else {
    if (this.currentPosition[1] > 5 && isHorizatalMoveOne(this.currentPosition, targetPosition)) return true
  }
  return false
}

function paoRule (positionInfo, targetPosition) {
  let targetPositionInfo = findPositionObjByChessPosition(positionInfo, targetPosition)
  if (!isSameLine(this.currentPosition, targetPosition)) return false
  let pieseBetwin = checkBetweenPiese(positionInfo, this.currentPosition, targetPosition)
  if (pieseBetwin.length === 1 && targetPositionInfo.piece) return true
  if (pieseBetwin.length === 0 && !targetPositionInfo.piece) return true
  return false
}

function cheRule (positionInfo, targetPosition) {
  if (!isSameLine(this.currentPosition, targetPosition)) return false
  let pieseBetwin = checkBetweenPiese(positionInfo, this.currentPosition, targetPosition)
  if (pieseBetwin.length === 0) return true
  return false
}

function maRule (positionInfo, targetPosition) {
  let [curCol, curRow] = this.currentPosition
  let [nextCol, nextRow] = targetPosition
  if (calcDistance(this.currentPosition, targetPosition) !== 5) return false
  let isVerticalMove = Math.abs(nextRow - curRow) === 2
  let blockPosition = null
  if (isVerticalMove) {
    blockPosition = [curCol, (curRow + nextRow) / 2]
  } else {
    blockPosition = [(curCol + nextCol) / 2, curRow]
  }
  let hasBlocker = findPositionObjByChessPosition(positionInfo, blockPosition).piece
  if (hasBlocker) return false
  return true
}

function xiangRule (positionInfo, targetPosition) {
  let [curCol, curRow] = this.currentPosition
  let [nextCol, nextRow] = targetPosition
  if (Math.abs(curCol - nextCol) !== 2 || Math.abs(curRow - nextRow) !== 2) return false
  let blockPosition = [(curCol + nextCol) / 2, (curRow + nextRow) / 2]
  if (findPositionObjByChessPosition(positionInfo, blockPosition).piece) return false
  return true
  
}

function shiRule (positionInfo, targetPosition) {
  let isHome = this.team === HOME
  if (!inCenter(isHome, targetPosition)) return false
  if (calcDistance(targetPosition, this.currentPosition) !== 2) return false
  return true
}

function jiangRule (positionInfo, targetPosition) {
  let isHome = this.team === HOME
  if (!inCenter(isHome, targetPosition)) return false
  if (calcDistance(targetPosition, this.currentPosition) > 1) return false
  return true
}

export {
  bingRule,
  paoRule,
  cheRule,
  maRule,
  xiangRule,
  shiRule,
  jiangRule
}