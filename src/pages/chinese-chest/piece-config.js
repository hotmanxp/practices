import { HOME, AWAY } from './consts'
import { bingRule, paoRule, cheRule, maRule, xiangRule, shiRule, jiangRule } from './rules'

const pieceConfig = {
  bing01: {
    pieceKey: 'ch01',
    displayText: {
      [HOME]: '兵',
      [AWAY]: '卒'
    },
    startPosition: {
      [HOME]: [1, 7],
      [AWAY]: [9, 4]
    },
    rules: bingRule,
  },
  bing02: {
    pieceKey: 'ch02',
    displayText: {
      [HOME]: '兵',
      [AWAY]: '卒'
    },
    startPosition: {
      [HOME]: [3, 7],
      [AWAY]: [7, 4]
    },
    rules: bingRule,
  },
  bing03: {
    pieceKey: 'ch03',
    displayText: {
      [HOME]: '兵',
      [AWAY]: '卒'
    },
    startPosition: {
      [HOME]: [5, 7],
      [AWAY]: [5, 4]
    },
    rules: bingRule,
  },
  bing04: {
    pieceKey: 'ch04',
    displayText: {
      [HOME]: '兵',
      [AWAY]: '卒'
    },
    startPosition: {
      [HOME]: [7, 7],
      [AWAY]: [3, 4]
    },
    rules: bingRule,
  },
  bing05: {
    pieceKey: 'ch05',
    displayText: {
      [HOME]: '兵',
      [AWAY]: '卒'
    },
    startPosition: {
      [HOME]: [9, 7],
      [AWAY]: [1, 4]
    },
    rules: bingRule,
  },
  paoL: {
    pieceKey: 'ch06',
    displayText: {
      [HOME]: '砲',
      [AWAY]: '炮'
    },
    startPosition: {
      [HOME]: [2, 8],
      [AWAY]: [8, 3]
    },
    rules: paoRule,
  },
  paoR: {
    pieceKey: 'ch07',
    displayText: {
      [HOME]: '砲',
      [AWAY]: '炮'
    },
    startPosition: {
      [HOME]: [8, 8],
      [AWAY]: [2, 3]
    },
    rules: paoRule,
  },
  cheL: {
    pieceKey: 'ch08',
    displayText: {
      [HOME]: '車',
      [AWAY]: '车'
    },
    startPosition: {
      [HOME]: [1, 10],
      [AWAY]: [9, 1]
    },
    rules: cheRule,
  },
  cheR: {
    pieceKey: 'ch09',
    displayText: {
      [HOME]: '車',
      [AWAY]: '车'
    },
    startPosition: {
      [HOME]: [9, 10],
      [AWAY]: [1, 1]
    },
    rules: cheRule,
  },
  maL: {
    pieceKey: 'ch10',
    displayText: {
      [HOME]: '馬',
      [AWAY]: '马'
    },
    startPosition: {
      [HOME]: [2, 10],
      [AWAY]: [8, 1]
    },
    rules: maRule,
  },
  maR: {
    pieceKey: 'ch11',
    displayText: {
      [HOME]: '馬',
      [AWAY]: '马'
    },
    startPosition: {
      [HOME]: [8, 10],
      [AWAY]: [2, 1]
    },
    rules: maRule,
  },
  xiangL: {
    pieceKey: 'ch12',
    displayText: {
      [HOME]: '相',
      [AWAY]: '象'
    },
    startPosition: {
      [HOME]: [3, 10],
      [AWAY]: [7, 1]
    },
    rules: xiangRule,
  },
  xiangR: {
    pieceKey: 'ch13',
    displayText: {
      [HOME]: '相',
      [AWAY]: '象'
    },
    startPosition: {
      [HOME]: [7, 10],
      [AWAY]: [3, 1]
    },
    rules: xiangRule,
  },
  shiL: {
    pieceKey: 'ch14',
    displayText: {
      [HOME]: '仕',
      [AWAY]: '士'
    },
    startPosition: {
      [HOME]: [4, 10],
      [AWAY]: [6, 1]
    },
    rules: shiRule,
  },
  shiR: {
    pieceKey: 'ch15',
    displayText: {
      [HOME]: '仕',
      [AWAY]: '士'
    },
    startPosition: {
      [HOME]: [6, 10],
      [AWAY]: [4, 1]
    },
    rules: shiRule,
  },
  jiang: {
    pieceKey: 'ch16',
    displayText: {
      [HOME]: '将',
      [AWAY]: '帅'
    },
    startPosition: {
      [HOME]: [5, 10],
      [AWAY]: [5, 1]
    },
    rules: jiangRule,
  },
}

const getPieceByname = (key) => {
  return pieceConfig[key]
}
const getPieceByKeyCode = (keyCode) => {
  const names = Object.keys(pieceConfig)
  const pieceName = names.find( name => pieceConfig[name].pieceKey === keyCode)
  return pieceName ? pieceConfig[pieceName] : null
}

export {
  pieceConfig,
  getPieceByname,
  getPieceByKeyCode
}


