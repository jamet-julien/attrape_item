import Render   from './render.js';
import Mouse    from './mouse.js';
import Collider from './collider.js';

export default class Level{

  constructor({ width, height }){
    this.items  = [];
    this.render = Render({ width, height });
    this.mouse  = Mouse();
    //this.render.push( this.mouse.draw);
    this.collider = new Collider( this.mouse);
  }


  update( freq){
    this.items.map( item => {
      item.update( freq);
      this.collider.check( item);
    });
  }


}