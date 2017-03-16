<template>
    <div>
        <table>
            <tr v-for="col in next"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'rgb(118,209,94)': 'white' }"></td></tr>
        </table>
        <table>
            <tr v-for="col in plane"><td v-for="item in col" style="width: 1em; height: 1em;" :style="{ background: item.on? 'black': 'gray' }"></td></tr>
        </table>
    </div>
</template>
<script>
import { combine, newPlane, setFactory, nextFrame as planeNextFrame, set as setPlane } from '../tetris-logic'
import shapes from '../shapes'
let plane = newPlane()
const set = setFactory(plane)
let next = newPlane(shapes.randomShape())
export default {
  name: 'tetris',
  data () {
    return {
      plane,
      next: next
    }
  }
}
let cnt = 0
setTimeout(function nextFrame () {
  if ((cnt += 1) % 10 === 0) {
    set(combine(planeNextFrame(plane), next))
    setPlane(next, newPlane(shapes.randomShape()))
  } else {
    set(planeNextFrame(plane))
  }
  setTimeout(nextFrame, 1000)
}, 1000)
</script>
