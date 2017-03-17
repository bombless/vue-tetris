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
                    <td><button @click="down">DOWN</button></td>
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
let frontLayer = shapes.testShape()
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
      try {
        combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY - 1 }), backLayer)
        offsetY -= 1
      } catch (e) {

      }
    },
    right () {
      try {
        combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY + 1 }), backLayer)
        offsetY += 1
      } catch (e) {
      }
    },
    down () {
      try {
        combine(shift(newPlane(frontLayer), { x: offsetX + 1, y: offsetY }), backLayer)
        offsetX += 1
      } catch (e) {
      }
    }
  }
}

let backLayer = newPlane()
;(function FrameAnimation () {
  function switchNext () {
    frontLayer = nextShape
    nextShape = shapes.localize(shapes.randomShape())
    scale = shapes.getScale(nextShape)
    setPlane(next, newPlane(nextShape, scale.rowsCount, scale.colsCount))
  }
  let result = combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY }), backLayer)
  let combo = countCombo(result)
  if (combo) {
    switchNext()
    setPlane(backLayer, shift(fillCombo(result, combo), { x: combo, y: 0 }))
    offsetX = offsetY = 0
  } else {
    try {
      set(combine(shift(newPlane(frontLayer), { x: offsetX + 1, y: offsetY }), backLayer))
      offsetX += 1
    } catch (e) {
      switchNext()
      setPlane(backLayer, result)
      offsetX = offsetY = 0
    }
    set(result)
  }

  setTimeout(FrameAnimation, 1000)
}())
</script>
