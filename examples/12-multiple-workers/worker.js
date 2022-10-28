import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(block, rowsPerCallback = 1) {
    let rgbaData = new Uint8ClampedArray(block.width * 4 * rowsPerCallback);
    let yOffset = 0;
    let imageDataHeight = rowsPerCallback;
    function callback(x, y, color) {
        let offsetY = y - block.y;
        let offsetX = x - block.x;
        let offset = ((offsetY % rowsPerCallback) * block.width + offsetX) * 4; // each rgba takes four array elements
        rgbaData.set(color.rgba, offset);
        let bufferIsFull = offset + 4 == rgbaData.length;
        let atEndOfBlock = x == block.x + block.width - 1 && y == block.y + block.height - 1;
        if (bufferIsFull || atEndOfBlock) {
            if (atEndOfBlock) {
                imageDataHeight = block.height - yOffset;
                rgbaData = rgbaData.slice(0, (block.width * imageDataHeight * 4));
            }
            let imageData = new ImageData(rgbaData, block.width, imageDataHeight);
            let data = { command: 'putImageData', x: block.x, y: block.y + yOffset, imageData: imageData };
            self.postMessage(data);
            yOffset += rowsPerCallback;
        }
    }
    return callback;
}


self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'render':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.AssortedShapes();
            let callback = makeCallback(data.block, 40);
            renderer.render(scene, callback, data.block);
            self.close();
            self.postMessage({ command: 'finished' });
            break;
    }
});
