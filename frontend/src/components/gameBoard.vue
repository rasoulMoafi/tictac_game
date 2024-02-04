<template>
    <v-container fluid style="background-color: #161A30;text-align: center; height: 100dvh;">
        <v-row>
        </v-row>
        <v-row>
            <!-- <v-col cols="5"> -->


            <v-dialog v-model="chooseModal" transition="dialog-top-transition" width="500" height="300" persistent>
                <div style="background-color: #F0ECE5; border-radius: 10px; padding: 20px;"
                    class="d-flex flex-wrap flex-row justify-center">
                    <v-text class="w-100 d-flex justify-center mb-2">
                        Which One? 😃
                    </v-text>

                    <div style="width: 100%; display: flex; justify-content: center;">
                        <div class="selected"
                            style="width: 40%; margin:10px 20px; padding: 10px; border-radius: 15%;background-color:#F0ECE5; display: flex;align-items: center;justify-content: center; "
                            @click="select(circle, $event)">
                            <img :src="circle" style="width: 80%;" />
                        </div>

                        <div class="selected"
                            style="width: 40%; margin:10px 20px; padding: 10px; border-radius: 15%;background-color:#F0ECE5 ; display: flex;align-items: center;justify-content: center; "
                            @click="select(cross, $event)">
                            <img :src="cross" style="width: 80%;" />
                        </div>

                    </div>
                </div>

            </v-dialog>




            <!-- </v-col> -->

            <v-col cols="12" style="margin: 100px auto; width: 100%; height: 100%;" class="d-flex justify-center">
                <v-col cols="12" sm="8" md="6" lg="3" style="height: 130px; padding: 0;"
                    class="d-flex justify-center flex-wrap">
                    <div v-for="(item, i) in 3" :key="i"
                        style=" width:100%; height: 90%; background-color: #B6BBC4; display: flex; align-items: center; justify-content: center;">

                        <div v-for="(box, k) in 3" :key="k" style="width: 30%; height: 85%; margin: 0 5px;">
                            <div class="firstStyle" :id="'c' + item + box"
                                style=" width: 100%; height: 100%;  display: flex;align-items: center;justify-content: space-evenly;"
                                @click="playerMove">
                            </div>

                        </div>
                    </div>
                </v-col>
            </v-col>
        </v-row>
        <v-dialog v-model="msgDialog" transition="dialog-bottom-transition" width="auto">

            <v-card class="rounded-xl" style="border: 13px solid #F6D776; margin: 13px;">
                <v-card-text style="background-color: #F0ECE5;">
                    <div class="text-h2 pa-12" style="color:#0F1035 ;">{{ msg }}</div>
                </v-card-text>
                <v-card-actions style="background-color: #F0ECE5;" class="justify-center">
                    <v-btn variant="text" @click="startGame" class="text-h4 px-12 pt-8 pb-16 mb-6 rounded-xl endBtn"
                        color="white">try again</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="msgDialog"></v-dialog> -->
    </v-container>
</template>
<script setup lang="ts">
import circle from '../assets/circle.svg';
import cross from '../assets/cross.svg';
import { ref, watch, onMounted } from 'vue';
// import   from './'; 

// const clickBox = ref<boolean>(false)

const chooseModal = ref<boolean>(true)




const mark = ref<string>('')
const cells = ref<string[]>(['c11', 'c12', 'c13', 'c21', 'c22', 'c23', 'c31', 'c32', 'c33'])
const msg = ref<string>('')
const msgDialog = ref<boolean>(false)
const endGame = ref<boolean>(false)
const bestMovie = ref<string>('')

// const xx = document 

function select(item: string, e: Event) {
    mark.value = item;

    (e.target as HTMLDivElement).parentElement!.style.backgroundColor = "rgba(176, 250, 66, 0.5)";
    (e.target as HTMLDivElement).style.transition = '2s';
    (e.target as HTMLDivElement).style.transform = "rotate(450deg)";

    setTimeout(() => {
        chooseModal.value = false
    }, 1500)
}

function startGame() {
    endGame.value = false;
    bestMovie.value = '';
    cells.value.forEach((cell) => {
        document.getElementById(cell)!.innerHTML = '';
        document.getElementById(cell)!.classList.remove('winner')
        document.getElementById(cell)!.classList.add('firstStyle')
    });
    msgDialog.value = false;
}

function getEmptyCells() {
    const emptyCells: string[] = [];
    cells.value.forEach((cell) => {
        if (!document.getElementById(cell)?.innerHTML) {
            emptyCells.push(cell);
        }
    });
    // ======================= if the game being tie
    if (emptyCells.length < 1) {
        msg.value = 'the match is tie !';
        msgDialog.value = true
        endGame.value = true;
        return emptyCells
    }
    else {
        return emptyCells;
    }
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
function winner(a: HTMLElement | null, b: HTMLElement | null, c: HTMLElement | null, item: string | null) {
    if ((a?.innerHTML.includes('circle') && b?.innerHTML.includes('circle') && c?.innerHTML.includes('circle')) || (a?.innerHTML.includes('cross') && b?.innerHTML.includes('cross') && c?.innerHTML.includes('cross'))) {

        if (item) {
            bestMovie.value = item
        } else {
            msg.value = (mark.value === circle ? 'circle' : 'cross') + ' is the winner!';
            msgDialog.value = true
            a.classList.remove('firstStyle')
            a.classList.add('winner')
            b.classList.remove('firstStyle')
            b.classList.add('winner');
            c.classList.remove('firstStyle')
            c.classList.add('winner');
            endGame.value = true;
        }

    }
}

// check cell combinations 
function checkRow() {
    winner(document.getElementById('c11'), document.getElementById('c12'), document.getElementById('c13'), null);
    winner(document.getElementById('c21'), document.getElementById('c22'), document.getElementById('c23'), null);
    winner(document.getElementById('c31'), document.getElementById('c32'), document.getElementById('c33'), null);
    winner(document.getElementById('c11'), document.getElementById('c21'), document.getElementById('c31'), null);
    winner(document.getElementById('c12'), document.getElementById('c22'), document.getElementById('c32'), null);
    winner(document.getElementById('c13'), document.getElementById('c23'), document.getElementById('c33'), null);
    winner(document.getElementById('c11'), document.getElementById('c22'), document.getElementById('c33'), null);
    winner(document.getElementById('c13'), document.getElementById('c22'), document.getElementById('c31'), null);
}


// =================================


function playerMove(event: MouseEvent) {
    if ((event.target as HTMLDivElement).classList.value == 'firstStyle') {
        // ================== Player makes a move =========================
        (event.target as HTMLDivElement).innerHTML += `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;

        // ================== Check for a win or draw ========================
        checkRow();

        // ========================= If the game is not over, let the computer make a move
        if (!endGame.value) {
            computerMove();
        }
        // checkGameStatus();

    }

}


function computerMove() {


    // check empty cells for next choice
    const emptyCells = getEmptyCells();
    const random = ref<number>(0)

    // const emptyCells = ref<string[] | undefined>(getEmptyCells());
    if (emptyCells.length < 7) {
        for (const item in emptyCells) {
            // wining computer
            switchMark();
            calcBestMove(emptyCells[item]);
            switchMark();

        }
        if (bestMovie.value != '') {
            switchMark();
            document.getElementById(bestMovie.value)!.innerHTML = `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;
            checkRow()
            switchMark();

        } else {
            for (const item in emptyCells) {
                // loosing player
                calcBestMove(emptyCells[item]);

            }
            if (bestMovie.value != '') {
                switchMark();
                document.getElementById(bestMovie.value)!.innerHTML = `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;
                switchMark();
                bestMovie.value = '';

            } else {
                random.value = Math.ceil(Math.random() * emptyCells.length) - 1;
                switchMark();
                document.getElementById(emptyCells[random.value])!.innerHTML = `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;
                switchMark();

            }
        }
    } else {
        random.value = Math.ceil(Math.random() * emptyCells.length) - 1;
        switchMark();
        document.getElementById(emptyCells[random.value])!.innerHTML = `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;
        switchMark();

    }
}

function calcBestMove(item: string) {
    document.getElementById(item)!.innerHTML = `<img src="${mark.value}" style="width: 75px; height: 75px;" />`;


    winner(document.getElementById('c11'), document.getElementById('c12'), document.getElementById('c13'), item);
    winner(document.getElementById('c21'), document.getElementById('c22'), document.getElementById('c23'), item);
    winner(document.getElementById('c31'), document.getElementById('c32'), document.getElementById('c33'), item);
    winner(document.getElementById('c11'), document.getElementById('c21'), document.getElementById('c31'), item);
    winner(document.getElementById('c12'), document.getElementById('c22'), document.getElementById('c32'), item);
    winner(document.getElementById('c13'), document.getElementById('c23'), document.getElementById('c33'), item);
    winner(document.getElementById('c11'), document.getElementById('c22'), document.getElementById('c33'), item);
    winner(document.getElementById('c13'), document.getElementById('c22'), document.getElementById('c31'), item);

    document.getElementById(item)!.innerHTML = '';

}


</script>
<style scoped>
.selected :hover {
    cursor: pointer;
    scale: 1.1;
}

.winner {
    animation: victoryChnaging 0.5s infinite;
    background-color: #B6BBC4;
}

.endBtn {
    animation: victoryChnaging 0.5s infinite;
    background-color: #0F1035;
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