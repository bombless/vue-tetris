<template>
    <div>
        <table id="next">
            <tr v-for="col in next"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'rgb(118,209,94)': 'white' }"></td></tr>
        </table>
        <table>
            <tr v-for="col in plane"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'black': 'gray' }"></td></tr>
        </table>
        <div>
            <table>
                <tr>
                    <td></td>
                    <td><button @click="rotate">UP</button></td>
                    <td></td>
                </tr>
                    <td><button @click="left">LEFT</button></td>
                    <td><button>DOWN</button></td>
                    <td><button @click="right">RIGHT</button></td>
                <tr>
                </tr>
            </table>
        </div>
    </div>
</template>
<style>
#next { border: 1px solid black; }
</style>
<script>
import { combine, newPlane, setFactory, shift, set as setPlane, countCombo, fillCombo } from '../tetris-logic'
import shapes from '../shapes'

let plane = newPlane()
const set = setFactory(plane)
let frontLayer = shapes.randomShape()
let nextShape = shapes.localize(shapes.randomShape())
let scale = shapes.getScale(nextShape)
let next = newPlane(nextShape, scale.rowsCount, scale.colsCount)

let offsetX = 0
let offsetY = 0

export default {
  name: 'tetris',
  data () {
    return {
      plane,
      next: next
    }
  },
  methods: {
    rotate () {
      frontLayer = shapes.rotate(frontLayer)
    },
    left () {
      offsetY -= 1
    },
    right () {
      offsetY += 1
    }
  }
}

let backLayer = newPlane()
;(function FrameAnimation () {
  try {
    combine(shift(newPlane(frontLayer), { x: offsetX + 1, y: offsetY }), backLayer)
    offsetX += 1
    let result = combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY }), backLayer)
    set(result)
  } catch (e) {
    let result = combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY }), backLayer)
    let combo = countCombo(result)
    if (combo) {
      frontLayer = nextShape
      nextShape = shapes.localize(shapes.randomShape())
      scale = shapes.getScale(nextShape)
      setPlane(next, newPlane(nextShape, scale.rowsCount, scale.colsCount))
      offsetX = 0
      fillCombo(result, combo)
      setPlane(backLayer, shift(result, { x: combo, y: 0 }))
      set(result)
    } else {
      setPlane(backLayer, result)
      frontLayer = nextShape
      nextShape = shapes.localize(shapes.randomShape())
      scale = shapes.getScale(nextShape)
      setPlane(next, newPlane(nextShape, scale.rowsCount, scale.colsCount))
      offsetX = 0
    }
  }
  setTimeout(FrameAnimation, 1000)
}())
</script>
