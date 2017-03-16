<template>
    <div>
        <table>
            <tr v-for="col in next"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'rgb(118,209,94)': 'white' }"></td></tr>
        </table>
        <table>
            <tr v-for="col in plane"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'black': 'gray' }"></td></tr>
        </table>
        <div>
            <table>
                <tr>
                    <td></td>
                    <td><button>UP</button></td>
                    <td></td>
                </tr>
                    <td><button @click="rotateLeft">LEFT</button></td>
                    <td><button>DOWN</button></td>
                    <td><button @click="rotateRight">RIGHT</button></td>
                <tr>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { combine, newPlane, setFactory, shift, set as setPlane, countCombo, fillCombo } from '../tetris-logic'
import shapes from '../shapes'

let plane = newPlane()
const set = setFactory(plane)
let frontLayer = shapes.randomShape()
let nextShape = shapes.randomShape()
let next = newPlane(nextShape)

const rotate = (s) => shapes.rotate(s) // TODO: adjust basic rotation data

export default {
  name: 'tetris',
  data () {
    return {
      plane,
      next: next
    }
  },
  methods: {
    rotateLeft () {
      frontLayer = rotate(rotate(rotate(frontLayer)))
    },
    rotateRight () {
      frontLayer = rotate(frontLayer)
    }
  }
}

let offsetX = 0
let offsetY = 0
let backLayer = newPlane()
;(function FrameAnimation () {
  let result = combine(shift(newPlane(frontLayer), { x: offsetX, y: offsetY }), backLayer)
  set(result)
  let combo = countCombo(result)
  if (combo) {
    frontLayer = nextShape
    nextShape = shapes.randomShape()
    setPlane(next, newPlane(nextShape))
    offsetX = 0
    fillCombo(result, combo)
    setPlane(backLayer, shift(result, { x: combo || 1, y: 0 }))
  } else {
    offsetX += 1
  }

  setTimeout(FrameAnimation, 1000)
}())
</script>
