
import { rowsCount, colsCount } from './consts'

export {
    newPlane,
    combine,
    set,
    setFactory,
    countCombo,
    fillCombo,
    shift
}

function newPlane (generator) {
  let data = []

  generator = generator ? generator.generator : () => false

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
  return data => set(target, data)
}

function countCombo (plane) {
  let everOn = false
  let allOn = true
  let firstConflict

  for (let i = 0; i < colsCount; ++i) {
    if (plane[rowsCount - 1][i].on) {
      everOn = true
      if (!firstConflict) {
        firstConflict = [rowsCount - 1, i]
      }
    } else {
      allOn = false
    }
  }

  if (allOn) {
    let combo = 1
    for (let i = rowsCount - 2; ; --i, combo += 1) {
      for (let j = 0; i < colsCount; ++i) {
        if (!plane[i][j].on) {
          return combo
        }
      }
    }
  }

  if (everOn) throw new Error('conflict on ' + firstConflict[0] + ',' + firstConflict[1])
}

function fillCombo (plane, n) {
  let data = []
  for (let i = 0; i < rowsCount; ++i) {
    let col = []
    for (let j = 0; j < colsCount; ++j) {
      col.push(i >= rowsCount - n ? false : plane[i][j])
    }
    data.push(col)
  }
  return data
}

function shift (plane, offset) {
  if (offset.x > 0) {
    for (let i = rowsCount - offset.x; i < rowsCount; ++i) {
      for (let j = 0; j < colsCount; ++j) {
        if (plane[i][j].on) {
          throw new Error('conflict on ' + i + ',' + j)
        }
      }
    }
  }

  if (offset.x < 0) {
    for (let i = 0; i < -offset.x; ++i) {
      for (let j = 0; j < colsCount; ++j) {
        if (plane[i][j].on) {
          throw new Error('conflict on ' + i + ',' + j)
        }
      }
    }
  }

  if (offset.y > 0) {
    for (let i = 0; i < rowsCount; ++i) {
      for (let j = colsCount - offset.y; j < colsCount; ++j) {
        if (plane[i][j].on) {
          throw new Error('conflict on ' + i + ',' + j)
        }
      }
    }
  }

  if (offset.y < 0) {
    for (let i = 0; i < rowsCount; ++i) {
      for (let j = 0; j < -offset.y; ++j) {
        if (plane[i][j].on) {
          throw new Error('conflict on ' + i + ',' + j)
        }
      }
    }
  }

  let data = []
  for (let i = 0; i < rowsCount; ++i) {
    let col = []
    for (let j = 0; j < colsCount; ++j) {
      if (i - offset.x < 0 ||
          i - offset.x >= rowsCount ||
          j - offset.y < 0 ||
          j - offset.y >= colsCount) {
        col.push({ on: false })
        continue
      }
      col.push({ on: plane[i - offset.x][j - offset.y].on })
    }
    data.push(col)
  }
  return data
}
