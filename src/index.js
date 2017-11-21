import Timer              from './lib/timer.js';
import { createLevel }    from './lib/createlevel.js';
import { collisionLayer } from './lib/collider.js';

const board   = document.getElementById('game'),
      context = board.getContext('2d');

let level, timer, end, totalTime, playing = true;

function play() {
  if (!playing) {
    timer.start();
    playing   = true;
    end       = false;
    totalTime = 0;
  }
}

async function init(callBack){

  let loadLevel = createLevel({ width: window.innerWidth, height : window.innerHeight});
  
  totalTime = 0;
  level     = await loadLevel( 'easy');
  timer     = new Timer( 1 / 60);
  end       = false;

  board.width  = window.innerWidth;
  board.height = window.innerHeight;

  //level.render.push( collisionLayer(level))

  timer.draw   = ( cumulateTime) => {
    level.render.draw( context, cumulateTime);
  };

  timer.update = ( freq) => {
    totalTime += freq;

    if (totalTime > level.time && !end){
      level.destroy();
      totalTime = 0;
      end       = true;
    }

    if (end && totalTime > 1){
      timer.stop();
      level.reset();
      playing = false;
    }

    level.update( freq);
  };

  callBack({
    on  : level.event.on,
    play
  });
  
  playing = false;
  level.event.emit('ready');

}

window.Game = init;
/*
init( (o)=>{
  o.on('ready',()=>{
    o.play();
  })
});
*/