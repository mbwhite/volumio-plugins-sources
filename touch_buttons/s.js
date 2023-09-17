const MPR121 = require('./mpr121.js');

mpr121  = new MPR121(0x5A, 1);

// listen for touch events
mpr121.on('touch', (pin) => console.log(`pin ${pin} touched`));


