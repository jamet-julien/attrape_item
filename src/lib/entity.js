import Vector from './vector.js';
import HitBox from './hitbox.js';


export class Trait{

  ///
  constructor( name){
    this.NAME = name;
  }

  ///
  trigger( entity, arg){

  }

  ///
  update( deltaTime){
    console.warn( 'créer méthode update');
  }

}


export default class Entity{

  ////////
  constructor(){

    this.pos      = new Vector( 0, 0);
    this.vel      = new Vector( 0, 0);

    this.size     = new Vector( 0, 0);
    this.hitBox   = new HitBox( this.pos, this.size);


    this.traits   = [];

    this.lifetime = 0;

  }

  ////////
  addTrait( trait){
    this.traits.push( trait);
    this[ trait.NAME ] = trait;
  }

  ////////
  trigger( ...arg){
    this.traits.map( trait => {
        trait.trigger( this, arg );
    });
  }

  ////////
  update( deltaTime) {

    this.traits.map(trait => {
      trait.update( this, deltaTime);
    });

    this.lifetime += deltaTime
  }


}