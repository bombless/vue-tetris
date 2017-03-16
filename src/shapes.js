
import { colsCount } from './consts'

const centerY = Math.floor(colsCount / 2)

const lightningMark1 = booleanRotator(originalLightning, { x: 0, y: centerY - 1 }, { x: 2, y: centerY + 1 })
const lightningMark2 = booleanRotator(lightningMark1, { x: 0, y: centerY - 1 }, { x: 2, y: centerY + 1 })
const lightningMark3 = booleanRotator(lightningMark2, { x: 0, y: centerY - 1 }, { x: 2, y: centerY + 1 })

const barMark1 = booleanRotator(originalBar, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })
const barMark2 = booleanRotator(barMark1, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })
const barMark3 = booleanRotator(barMark2, { x: 0, y: centerY - 1 }, { x: 3, y: centerY + 2 })

const booleanSettters = [
  (x, y) => (y === centerY || y + 1 === centerY) && x <= 1,
  (x, y) => (y === centerY || y + 1 === centerY) && x <= 1,
  (x, y) => (y === centerY || y + 1 === centerY) && x <= 1,
  (x, y) => (y === centerY || y + 1 === centerY) && x <= 1,
  (x, y) => (x === 0 && y === centerY) || (x === 1 && Math.abs(y - centerY) <= 1),
  (x, y) => (x === 1 && y === centerY) || (x === 0 && Math.abs(y - centerY) <= 1),
  (x, y) => (x <= 2 && y === centerY) || (x === 1 && y === centerY - 1),
  (x, y) => (x <= 2 && y === centerY) || (x === 1 && y === centerY + 1),
  originalLightning,
  lightningMark1,
  lightningMark2,
  lightningMark3,
  originalBar,
  barMark1,
  barMark2,
  barMark3
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
    if (x >= leftTop.x && x <= rightBottom.x && y >= leftTop.y && y <= rightBottom.y) {
      let offsetX = x - leftTop.x
      let offsetY = y - leftTop.y
      let width = rightBottom.x - leftTop.x
      let height = rightBottom.y - leftTop.y
      let resultX = height - offsetY + leftTop.x
      let resultY = width - offsetX + leftTop.y
      return generator(resultX, resultY)
    } else {
      return generator(x, y)
    }
  }
}

export default {
  randomShape: () => booleanSettters[Math.floor(Math.random() * booleanSettters.length)]
}
