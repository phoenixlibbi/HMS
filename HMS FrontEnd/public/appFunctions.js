const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;

const min = document.getElementById("minimize");
const max = document.getElementById("maximize");
const clos = document.getElementById("closeBtn");

//Minimize App
min.addEventListener('click', () => {
    ipc.send('minimizeApp');
})

//Maximize App
max.addEventListener('click', () => {
    ipc.send('maximizeApp');
})

//Close App
clos.addEventListener('click', () => {
    ipc.send('closeApp');
})