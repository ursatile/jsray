import DrawMondrian from './modules/mondrian.js';
import * as Patterns from './modules/patterns.js';

let myCanvas = document.getElementById('my-canvas');

function draw() {
  console.log(window.location.hash);
  switch (window.location.hash) {
    case "#mondrian": DrawMondrian(myCanvas); break;
    case "#lasers": Patterns.Lasers(myCanvas); break;
    case "#supernova": Patterns.Supernova(myCanvas); break;
    case "#gradiance": Patterns.Gradiance(myCanvas); break;
    default: Patterns.Chessboard(myCanvas); break;
  }
}

draw();
