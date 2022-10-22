let runWorkerButton = document.getElementById("run-worker-button");
let stopWorkerButton = document.getElementById("stop-worker-button");

function output(str) {
    let p = document.createElement('p');
    p.innerHTML = str;
    let output = document.getElementById('output-div');
    output.appendChild(p);
}

function handleMessageFromWorker(msg) {
    output(msg.data.contents);
}

let workerNumber = 1;

function start() {
    let number = workerNumber++;
    let delay = parseFloat(document.getElementById('delay-input').value) || 5;

    let worker = new Worker('worker.js', { type: 'module' });
    worker.addEventListener('message', handleMessageFromWorker);
    worker.postMessage({ command: 'start', delay: delay, number: number });

    stopWorkerButton.addEventListener("click", function () {
        if (worker && worker.terminate) {
            worker.terminate();
            output(`Worker ${number} stopped.`);
            worker = null;
        }
    });
}

runWorkerButton.addEventListener("click", start);

