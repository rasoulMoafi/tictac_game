<template>
    <h1 style="width: 100%;">ssssssssssssssss</h1>
    <div style=" width:600px; height: 200px; background-color: yellow; display: flex; align-items: center; justify-content: center;"
        v-for="item in 3">
        <div v-for="box in 3">
            <div :class="'r' + item" :id="'c' + item + box" style="width: 150px; height: 150px; margin:10px;"
                @click="choiceBox"></div>
        </div>
    </div>
    <div class="sss"></div>
</template>
<script setup lang="ts">
function choiceBox(event: MouseEvent) {
    // console.log('ssssssssssssssss', event.target);
    (event.target as HTMLDivElement).style.backgroundColor = 'salmon';
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
