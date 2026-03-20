// 目標
// 1.ボタン取得
// 2.変数を作る
// 3.formatTime作る
// 4.start
// 5.stop
// 6.lap
// 7.reset

const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapsDisplay = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerId = null;

let lastLapTime = 0;
let lapCount = 0;

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const milliSeconds = ms % 1000;

    return `${minutes.toString().padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}:${Math.floor(milliSeconds / 10).toString().padStart(2, "0")}`;
}

startBtn.onclick = () => {
    if(timerId) return;

    startTime = Date.now() - elapsedTime;

    timerId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
};

stopBtn.onclick = () => {
    clearInterval(timerId);
    timerId = null;
};

lapBtn.onclick = () => {
    const lapTime = document.createElement("li");

    const currentTime = elapsedTime;

    lapCount++;

    let text = "";

    if(lapCount === 1) {
        text = `1. ${formatTime(currentTime)}`;
    } else {
        const diffLap = currentTime - lastLapTime;
        text = `${lapCount}. ${formatTime(currentTime)} (+${formatTime(diffLap)})`;
    }

    lastLapTime = currentTime;

    lapTime.textContent = text;
    lapsDisplay.appendChild(lapTime);
};

resetBtn.onclick = () => {
    clearInterval(timerId);
    timerId = null;

    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00";

    lapCount = 0;
    lapsDisplay.innerHTML = "";
    lastLapTime = 0;
};