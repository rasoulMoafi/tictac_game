
<script lang="ts">
import { defineComponent } from 'vue'
import gameBoard from "./components/gameBoard.vue";

export default defineComponent({
  name: 'App',
  components:{
    gameBoard,
  },
  data() {
    return {
    }
  },
})
</script>

<template>
  <v-app>
    <v-main>
      <gameBoard />
    </v-main>
  </v-app>
  <!-- <header>
  </header> -->
  <!-- <gameBoard /> -->
  <!-- <HelloWorld /> -->
  <!-- <gsap /> -->
</template>
