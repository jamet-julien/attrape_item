import Render   from './render.js';
import Mouse    from './mouse.js';
import Collider from './collider.js';
import Event    from './event.js';

export default class Level{

  constructor({ width, height }){

    this.history  = [];

    this.event    = Event;
    this.score    = 0;
    this.time     = 0;
    this.items    = [];
    this.render   = Render({ width, height });
    this.mouse    = Mouse();
    //this.render.push( this.mouse.draw);
    this.collider = new Collider( this.mouse);
  }


  validScore( _score){
    let score      = 0;
    let timeCumul  = 0;
    let timeMedian = 0;

    let oResult = this.history.reduce((cumul, current)=>{

      let difTime = current.time - cumul.timeCumul;
      cumul.score     += current.score;
      cumul.timeCumul += current.time;
      cumul.timeMedian = Math.round((cumul.timeMedian + difTime)/2);

      return cumul;
    }, { score, timeCumul, timeMedian});

    return oResult.score == _score;


  }

  destroy(){
    this.items.map(item => {
      item.trigger();
    });
  }

  reset() {

    this.history = [];
    this.score   = 0;

    this.items.map(item => {
      item.reset();
    });
  }


  update( freq){
    this.items.map( item => {
      item.update( freq);

      if( this.collider.check( item)){

        this.history.push({
            score : item.score,
            time  : (new Date)*1
        });

        this.score += item.score;

        this.event.emit( 'clicked', this.score);
      }

    });
  }


}