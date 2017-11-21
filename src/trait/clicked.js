import { Trait } from '../lib/entity.js';
import Vector    from '../lib/vector.js';

export default class Clicked extends Trait{

    constructor( start){
      super( 'CLICKED');
    }

    trigger( entity){
        entity.died = true
    }
    
    update( entity , deltaTime){}


}