import Entity from './entity.js';
import Fall   from '../trait/fall.js';
import SinMove   from '../trait/sinmove.js';


export function factoryEntity( sprite, listAnim){

      let listAnimArray = [...listAnim];

      function draw( context){
        let animObj = sprite.animations.get( this.anim );
        context.drawImage( animObj.anim( this.pos.y), this.pos.x - animObj.size, this.pos.y - animObj.size)
      }

      return function createItem(){
       
        let item      = new Entity();
        let iLen      = listAnimArray.length - 1;
        let randIndex = Math.round(Math.random() * iLen);

        item.pos.x    = Math.random() * 640;
        item.pos.y    = (Math.random() * -640)- 30;
        item.anim     = listAnimArray[randIndex];

        item.addTrait( new Fall( item.pos.y));
        item.addTrait( new SinMove( item.pos.x));
        
        item.draw = draw;

        return item;

      }

}