
import { rowsCount, colsCount } from './consts'

export {
    newPlane,
    combine,
    set,
    setFactory,
    nextFrame
}

function newPlane (generator) {
  let data = []

  generator = generator || (() => false)

  for (let i = 0; i < rowsCount; ++i) {
    let col = []
    for (let j = 0; j < colsCount; ++j) {
      col.push({ on: generator(i, j) })
    }
    data.push(col)
  }
  return data
}

function combine (lhs, rhs) {
  let data = []

  for (let i = 0; i < rowsCount; ++i) {
    let col = []
    for (let j = 0; j < colsCount; ++j) {
      if (lhs[i][j].on && rhs[i][j].on) {
        throw Object
      } else if (lhs[i][j].on || rhs[i][j].on) {
        col.push({ on: true })
      } else {
        col.push({ on: false })
      }
    }
    data.push(col)
  }
  return data
}

function set (target, data) {
  for (let i = 0; i < rowsCount; ++i) {
    for (let j = 0; j < colsCount; ++j) {
      target[i][j].on = data[i][j].on
    }
  }
}

function setFactory (target) {
  return (data) => set(target, data)
}

function nextFrame (plane) {
  let data = []

  for (let i = 0; i < colsCount; ++i) {
    if (plane[rowsCount - 1][i].on) {
      throw new Error('conflict on ' + (rowsCount - 1) + ',' + i)
    }
  }
  for (let i = 0; i < rowsCount; ++i) {
    let col = []
    for (let j = 0; j < colsCount; ++j) {
      col.push({ on: i ? plane[i - 1][j].on : false })
    }
    data.push(col)
  }
  return data
}
