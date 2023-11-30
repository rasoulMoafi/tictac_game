<template>
    <v-container fluid style="background-color: red; width: 100%;">
        <v-row>
            <h1 style="width: 100%;">ssssssssssssssss</h1>
        </v-row>
        <v-row>
            <v-col cols="1">
                <span>sssssss</span>
            </v-col>
            <v-col cols="8">
                <div style=" width:600px; height: 200px; background-color: yellow; display: flex; align-items: center; justify-content: center;"
                    v-for="item in 3">
                    <div v-for="box in 3">
                        <div :class="'r' + item" :id="'c' + item + box" style="width: 150px; height: 150px; margin:10px;"
                            @click="choiceBox">
                            <!-- <img v-if="clickBox" :src="circle" style="width: 150px; height: 150px;" /> -->
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>

    </v-container>
</template>
<script setup lang="ts">
import circle from '../assets/circle.svg';
import { ref } from 'vue';
// import   from './'; 

const clickBox = ref<boolean>(false)
console.log('aaaaaaaaaaaaaaaaaaaa', circle);
function choiceBox(event: MouseEvent) {
    clickBox.value = true;
    // console.log('ssssssssssssssss', event.target);
    (event.target as HTMLDivElement).innerHTML += `<img src="${circle}" style="width: 150px; height: 150px;" />`;
    // (event.target as HTMLDivElement).innerHTML += '<span>sss</span>';
}
</script>
<style scoped>
.r1 {
    background-color: blue;
}

.r2 {
    background-color: green;
}

.r3 {
    background-color: rgb(165, 9, 131);
}
</style>
