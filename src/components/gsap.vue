<template>
  <div style="width:100px; height:100px; background-color: blue;"></div>
  <v-btn @click="mm"></v-btn>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ref } from "vue";

import Draggable from "gsap/Draggable";

const xx = ref<string>("ali");
let yes = ref<boolean>(false);

function mm() {
  yes = !yes;
  if (yes) {
    console.log("11111111111111111", xx);
  }
}
</script>
<style></style>
