<template>
  <div id="yourID" style="width:100px; height:100px; background-color: blue;"></div>

  <div>
    <svg class="canv">
      <rect ref="p1" x="-5" y="-5" width="10" height="10" :transform="transform" />
    </svg>
    <div>x{{ x }} y{{ y }}</div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap"
import { ref, onMounted } from "vue"

import Draggable from "gsap/Draggable"

gsap.registerPlugin(Draggable)

let x = ref<number>(200);
let y = ref<number>(100);
let p1 = ref(null);



function transform() {
  return `translate(${x},${y})`
}





onMounted(() => {
  var a = Draggable.create(p1.value, {
    onDragEnd: function (ev) {
      x.value = ev.x;
      y.value = ev.y;
    }
  })

  Draggable.create("#yourID", {
    type: "rotation",
    inertia: true,
  });
})
</script>
<style></style>
