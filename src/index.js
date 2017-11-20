import Timer              from './lib/timer.js';
import { createLevel }    from './lib/createlevel.js';
import { collisionLayer } from './lib/collider.js';

const board     = document.getElementById('game'),
      context   = board.getContext('2d');

async function init(){

  let loadLevel = createLevel({ width: window.innerWidth, height : window.innerHeight}),
      level     = await loadLevel( 'easy'),
      timer     = new Timer( 1 / 60);

  board.width  = window.innerWidth;
  board.height = window.innerHeight;
  
  //level.render.push( collisionLayer(level))

  timer.draw   = ( cumulateTime) => {
    level.render.draw( context, cumulateTime);
  };

  timer.update = ( freq) => {
    level.update( freq);
  };

  timer.start();

}

init();