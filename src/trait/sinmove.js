import { Trait } from '../lib/entity.js';
import Vector    from '../lib/vector.js';

export default class SinMove extends Trait{

    constructor( xStart){
      super('SINMOVE');
      
      this.start    = xStart;
      this.lifeTime = 0;

      this.frequence = Math.random() * 3;
      this.amplitude = Math.random() * 75;

    }

    trigger( ){

    }
    

    update( entity , deltaTime){ 
      entity.pos.x = this.start + Math.round(Math.cos(this.lifeTime * this.frequence) * this.amplitude);
      this.lifeTime += deltaTime;
    }


}