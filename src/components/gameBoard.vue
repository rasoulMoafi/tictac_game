<template>
    <v-container fluid style="background-color: #161A30;text-align: center; height: 100dvh;">
        <v-row>
            <h1 style="width: 100%;">ssssssssssssssss</h1>
        </v-row>
        <v-row>
            <v-col cols="5">
                <br><br><br><br><br><br><br><br><br><br><br><br><br>
                <div class="d-flex flex-row justify-center">
                    <div style="width: 180px; height: 180px; margin:10px 20px; border-radius: 15%;background-color:#F0ECE5; display: flex;align-items: center;justify-content: center;"
                        @click="choiceKind = 'circle'">
                        <img :src="circle" style="width: 150px; height: 150px;" />
                    </div>
                    <div style="width: 180px; height: 180px; margin:10px 20px; border-radius: 15%;background-color:#F0ECE5 ; display: flex;align-items: center;justify-content: center;"
                        @click="choiceKind = 'cross'">
                        <img :src="cross" style="width: 150px; height: 150px;" />
                    </div>
                </div>
            </v-col>
            <v-col cols="7" style="margin: 100px auto;">
                <div style=" width:600px; height: 200px; background-color: #B6BBC4; display: flex; align-items: center; justify-content: center;"
                    v-for="item in 3">
                    <div v-for="box in 3">
                        <div :class="'r' + item" :id="'c' + item + box"
                            style="width: 180px; height: 180px; margin:10px;  display: flex;align-items: center;justify-content: center;"
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
import cross from '../assets/cross.svg';
import { ref, watch } from 'vue';
// import   from './'; 

const clickBox = ref<boolean>(false)
const choiceKind = ref<string>('circle')


// watch(
//     () => choiceKind.value,
//     (newVal: any) => {
//         choiceBox()
//     }
// );


function choiceBox(event: MouseEvent) {
    clickBox.value = true;
    // console.log('ssssssssssssssss', event.target);
    // (event.target as HTMLDivElement).innerHTML += '<span>sss</span>';
    if (choiceKind.value === 'circle') {
        (event.target as HTMLDivElement).innerHTML += `<img src="${circle}" style="width: 150px; height: 150px;" />`;

    } else {
        (event.target as HTMLDivElement).innerHTML += `<img src="${cross}" style="width: 150px; height: 150px;" />`;

    }
}
</script>
<style scoped>
.r1 {
    background-color: #31304D;
    border-radius: 15%;
}

.r2 {
    background-color: #31304D;
    border-radius: 15%;
}

.r3 {
    background-color: #31304D;
    border-radius: 15%;
}
</style>
