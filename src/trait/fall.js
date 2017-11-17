import { Trait } from '../lib/entity.js';
import Vector    from '../lib/vector.js';

export default class Fall extends Trait{

    constructor( start){
      super('fall');
      this.vit      = Math.ceil( Math.random() * 2);
      this.bottom   = 640;
      this.start    = start;
    }

    trigger( ){

    }
    

    update( entity , deltaTime){

      if( entity.pos.y >= this.bottom){
        entity.animeEnd = false;
        entity.died     = false;
        entity.pos.y    = this.start;
      }else{
        entity.pos.y += this.vit;
      }
    }


}