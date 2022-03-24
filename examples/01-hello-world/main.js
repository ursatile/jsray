import * as Greeter from './greeter.js';

let greeter = new Greeter.Greeter('World');
let greeting = greeter.greet();

document.querySelector('#greeting').innerHTML = `
  <h1>${greeting}</h1>
  <p>(If you can read this, JS modules are working)</p>
  <img src="favicon.svg" style="width: 200px; height: 200px;" />
  <p><small>${new Date()}</small></p>
`;
