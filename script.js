
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        running = true;
        paused = false;
        startPauseBtn.innerText = 'Pause';
    } else if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
        startPauseBtn.innerText = 'Resume';
    } else {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        paused = false;
        startPauseBtn.innerText = 'Pause';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerText = '00:00:00';
    startPauseBtn.innerText = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.innerText;
        const li = document.createElement('li');
        li.innerText = lapTime;
        laps.appendChild(li);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}
