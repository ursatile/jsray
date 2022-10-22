import sleep from './sleep.js';

self.addEventListener('message', function (msg) {
    let data = msg.data;
    switch (data.command) {
        case 'start':
            self.postMessage({
                what: 'starting',
                contents: `Worker #${data.number} starting...`
            });
            sleep(data.delay);
            self.postMessage({
                what: 'completed',
                contents: `Worker #${data.number} finished after ${data.delay} seconds`
            });
            break;
    }
});