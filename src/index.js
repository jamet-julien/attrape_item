import Timer from './lib/timer.js';
import { createLevel } from './lib/createlevel.js';

const board   = document.getElementById('game'),
      context = board.getContext('2d');

async function init(){

  let loadLevel = createLevel(), //factoryItems
      level     = await loadLevel( 'easy'),
      timer     = new Timer( 1 / 60);

  timer.draw   = () => {
    level.render.draw( context);
  };

  timer.update = ( freq) => {
    level.update( freq);
  };

  timer.start();

}

init();