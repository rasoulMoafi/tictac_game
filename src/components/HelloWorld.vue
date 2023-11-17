<script setup lang="ts">
// import { ref, onMounted } from "vue3";

// const demo = ref(null);

function myFunction(e: Event) {
  console.log("eeeeeeeeeeee", e);
  let x = e.x;
  let y = e.y;
  let coor = "Coordinates: (" + x + "," + y + ")";
  console.log("ddddddddd", coor);
  document.getElementById("demo")!.innerHTML = coor;
}

function clearCoor() {
  document.getElementById("demo")!.innerHTML = "";
}
</script>

<template>
  <div class="box" @mousemove="myFunction" @mouseout="clearCoor"></div>
  <p id="demo"></p>
</template>

<style scoped>
.box {
  width: 500px;
  height: 500px;
  background-color: red;
}
</style>
