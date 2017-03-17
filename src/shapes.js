
import { centerY, colsCount } from './consts'

const lightningMark1 = booleanRotator(originalLightning, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })
const lightningMark2 = booleanRotator(lightningMark1, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })
const lightningMark3 = booleanRotator(lightningMark2, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })

const barMark1 = booleanRotator(originalBar, { x: 0, y: centerY - 1 }, { x: 4, y: centerY + 3 })
const barMark2 = booleanRotator(barMark1, { x: 0, y: centerY - 1 }, { x: 4, y: centerY + 3 })
const barMark3 = booleanRotator(barMark2, { x: 0, y: centerY - 1 }, { x: 4, y: centerY + 3 })

const dataSet = [
  [(x, y) => (y === centerY || y + 1 === centerY) && x <= 1, 0, 2, centerY - 1, centerY + 1],
  [(x, y) => (y === centerY || y + 1 === centerY) && x <= 1, 0, 2, centerY - 1, centerY + 1],
  [(x, y) => (y === centerY || y + 1 === centerY) && x <= 1, 0, 2, centerY - 1, centerY + 1],
  [(x, y) => (y === centerY || y + 1 === centerY) && x <= 1, 0, 2, centerY - 1, centerY + 1],
  [(x, y) => (x === 0 && y === centerY) || (x === 1 && Math.abs(y - centerY) <= 1), 0, 3, centerY - 1, centerY + 2],
  [(x, y) => (x === 1 && y === centerY) || (x === 0 && Math.abs(y - centerY) <= 1), 0, 3, centerY - 1, centerY + 2],
  [(x, y) => (x <= 2 && y === centerY) || (x === 1 && y === centerY - 1), 0, 3, centerY - 1, centerY + 2],
  [(x, y) => (x <= 2 && y === centerY) || (x === 1 && y === centerY + 1), 0, 3, centerY - 1, centerY + 2],
  [originalLightning, 0, 3, centerY - 1, centerY + 2],
  [lightningMark1, 0, 3, centerY - 1, centerY + 2],
  [lightningMark2, 0, 3, centerY - 1, centerY + 2],
  [lightningMark3, 0, 3, centerY - 1, centerY + 2],
  [originalBar, 0, 4, centerY - 1, centerY + 4],
  [barMark1, 0, 4, centerY - 1, centerY + 3],
  [barMark2, 0, 4, centerY - 1, centerY + 3],
  [barMark3, 0, 4, centerY - 1, centerY + 3]
]

function originalLightning (x, y) {
  return (
    (x === 0 && y === centerY) ||
    (x === 1 && y === centerY) ||
    (x === 1 && y === centerY - 1) ||
    (x === 2 && y === centerY - 1))
}

function originalBar (x, y) {
  return y === centerY - 1 && x < 4
}

function booleanRotator (generator, leftTop, rightBottom) {
  return (x, y) => {
    if (x >= leftTop.x && x < rightBottom.x && y >= leftTop.y && y < rightBottom.y) {
      let offsetX = x - leftTop.x
      let offsetY = y - leftTop.y
      let width = rightBottom.x - leftTop.x
      let resultX = offsetY + leftTop.x
      let resultY = width - 1 - offsetX + leftTop.y
      return generator(resultX, resultY)
    } else {
      return generator(x, y)
    }
  }
}

export default {
  randomShape () {
    let result = dataSet[Math.floor(Math.random() * dataSet.length)]
    return {
      generator: result[0],
      range: {
        leftTop: { x: result[1], y: result[3] },
        rightBottom: { x: result[2], y: result[4] }
      }
    }
  },
  testShape () {
    return {
      generator: x => x === 0,
      range: {
        leftTop: { x: 0, y: 0 },
        rightBottom: { x: 1, y: colsCount }
      }
    }
  },
  rotate (shape) {
    let result = booleanRotator(shape.generator, shape.range.leftTop, shape.range.rightBottom)
    return { generator: result, range: shape.range }
  },
  localize (shape) {
    return {
      generator: (x, y) => shape.generator(x + shape.range.leftTop.x, y + shape.range.leftTop.y),
      range: {
        leftTop: { x: 0, y: 0 },
        rightBottom: { x: shape.range.rightBottom.x - shape.range.leftTop.x, y: shape.range.rightBottom.y - shape.range.leftTop.y }
      }
    }
  },
  getScale (shape) {
    return {
      rowsCount: shape.range.rightBottom.x - shape.range.leftTop.x,
      colsCount: shape.range.rightBottom.y - shape.range.leftTop.y
    }
  }
}
