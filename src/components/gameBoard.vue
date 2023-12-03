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
                        @click="mark = circle">
                        <img :src="circle" style="width: 150px; height: 150px;" />
                    </div>
                    <div style="width: 180px; height: 180px; margin:10px 20px; border-radius: 15%;background-color:#F0ECE5 ; display: flex;align-items: center;justify-content: center;"
                        @click="mark = cross">
                        <img :src="cross" style="width: 150px; height: 150px;" />
                    </div>
                </div>
            </v-col>
            <v-col cols="7" style="margin: 100px auto;">
                <div style=" width:600px; height: 200px; background-color: #B6BBC4; display: flex; align-items: center; justify-content: center;"
                    v-for="item in 3">
                    <div v-for="box in 3">
                        <div class="firstStyle" :id="'c' + item + box"
                            style=" width: 180px; height: 180px; margin:10px;  display: flex;align-items: center;justify-content: center;"
                            @click="playerMove">
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="msgDialog" transition="dialog-bottom-transition" width="auto">

            <v-card>
                <v-card-text style="background-color: #95CD41;">
                    <div class="text-h2 pa-12" style="color:#FF7F3F ;">{{ msg }}</div>
                </v-card-text>
                <!-- <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="msgDialog = false">Close</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="msgDialog"></v-dialog> -->
    </v-container>
</template>
<script setup lang="ts">
import circle from '../assets/circle.svg';
import cross from '../assets/cross.svg';
import { ref, watch } from 'vue';
// import   from './'; 

// const clickBox = ref<boolean>(false)
const mark = ref<string>(circle)
const cells = ref<string[]>(['c11','c12','c13','c21','c22','c23','c31','c32','c33'])
const msg = ref<string>('')
const msgDialog = ref<boolean>(false)



// add click listener to each cell
function playerMove(event: MouseEvent) {

    // console.log('11111111111111111111111111', document.getElementById('c11'));
    // console.log('22222222222222222222222222', typeof document.getElementById('c11'));
    if (!(event.target as HTMLDivElement).innerHTML) {
        (event.target as HTMLDivElement).innerHTML += `<img src="${mark.value}" style="width: 150px; height: 150px;" />`;
        checkRow();
        switchMark();
        computerMove();

    } else {
        console.log('nooooooooooooooooooooo');
    }

}





// ===========================================================

// var grid = document.getElementById('grid');
// var msg = document.querySelector('.message');
var chooser = document.querySelector('form');


// add click listener to radio buttons
// function setPlayer() {
// mark.value = choiceKind.value === 'circle' ? 'circle' : 'cross';
// msg.textContent = mark + ', click on a square to make your move!';
// chooser.classList.add('game-on');
// this.checked = false;
// buildGrid();
// }

// add click listener to each cell
// function playerMove() {
//     if (this.textContent == '') {
//         this.textContent = mark;
//         checkRow();
//         switchMark();
//         computerMove();
//     }
// }

// let the computer make the next move
function computerMove() {
    const emptyCells = ref<string[]>([])
    const random = ref<number>(0)
    cells.value.forEach((cell) =>  {

        if (!document.getElementById(cell)?.innerHTML) {
            emptyCells.value.push(cell);
        }
    });

    // // computer marks a random EMPTY cell
    random.value = Math.ceil(Math.random() * emptyCells.value.length) - 1;
    // console.log('11111111111111111111111111',emptyCells.value[random.value]);
    // console.log('22222222222222222222222222',document.getElementById(emptyCells.value[random.value]));
    // console.log('33333333333333333333333333',document.getElementById(emptyCells.value[random.value])?.innerHTML);
    document.getElementById(emptyCells.value[random.value]).innerHTML = `<img src="${mark.value}" style="width: 150px; height: 150px;" />`;
    checkRow();
    switchMark();
}

// switch player mark
function switchMark() {
    if (mark.value == cross) {
        mark.value = circle;
    } else {
        mark.value = cross;
    }
}

// determine a winner
function winner(a: HTMLElement | null, b: HTMLElement | null, c: HTMLElement | null) {
    if ((a?.innerHTML.includes('circle') && b?.innerHTML.includes('circle') && c?.innerHTML.includes('circle')) || (a?.innerHTML.includes('cross') && b?.innerHTML.includes('cross') && c?.innerHTML.includes('cross'))) {
        
        msg.value = (mark.value === circle ? 'cross' : 'circle') + ' is the winner!';
        msgDialog.value = true
        a.classList.remove('firstStyle')
        a.classList.add('winner')
        b.classList.remove('firstStyle')
        b.classList.add('winner');
        c.classList.remove('firstStyle')
        c.classList.add('winner');
        return true;
    } else {
        return false;
    }
}

// check cell combinations 
function checkRow() {
    winner(document.getElementById('c11'), document.getElementById('c12'), document.getElementById('c13'));
    winner(document.getElementById('c21'), document.getElementById('c22'), document.getElementById('c23'));
    winner(document.getElementById('c31'), document.getElementById('c32'), document.getElementById('c33'));
    winner(document.getElementById('c11'), document.getElementById('c21'), document.getElementById('c31'));
    winner(document.getElementById('c12'), document.getElementById('c22'), document.getElementById('c32'));
    winner(document.getElementById('c13'), document.getElementById('c23'), document.getElementById('c33'));
    winner(document.getElementById('c11'), document.getElementById('c22'), document.getElementById('c33'));
    winner(document.getElementById('c13'), document.getElementById('c22'), document.getElementById('c31'));
}

// clear the grid
// function resetGrid() {
//     mark = 'X';
//     /* for (var i = 0; i < cells.length; i++) {
//        cells[i].textContent = '';
//        cells[i].classList.remove('winner');
//      }*/
//     cells.forEach(function (cell) {
//         cell.textContent = '';
//         cell.classList.remove('winner');
//     });
//     msg.textContent = 'Choose your player:';
//     chooser.classList.remove('game-on');
//     grid.innerHTML = '';
// }

// // build the grid
// function buildGrid() {
//     for (var i = 1; i <= 9; i++) {
//         var cell = document.createElement('li');
//         cell.id = 'c' + i;
//         cell.addEventListener('click', playerMove, false);
//         grid.appendChild(cell);
//     }
//     /* cells = document.querySelectorAll('li'); //Returns a NodeList, not an Array
//     See https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches */
//     cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
// }

// var players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
// players.forEach(function (choice) {
//     choice.addEventListener('click', setPlayer, false);
// });

// var resetButton = chooser.querySelector('button');
// resetButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     resetGrid();
// });

// ===========================================================
</script>
<style scoped>
.winner {
    animation: victoryChnaging 0.5s infinite;
    background-color: #B6BBC4;
}

@keyframes victoryChnaging {

    0%,
    100% {
        transform: scale(1.1);
    }

    12%,
    88% {
        transform: scale(1.05);
    }

    25%,
    75% {
        transform: scale(1);
    }

    37%,
    62% {
        transform: scale(0.95);
    }

    50% {
        transform: scale(0.9);
    }

}

.firstStyle {
    background-color: #31304D;
    border-radius: 15%;
}
</style>