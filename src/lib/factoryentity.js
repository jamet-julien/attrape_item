import Entity    from './entity.js';
import Fall      from '../trait/fall.js';
import SinMove   from '../trait/sinmove.js';
import Clicked   from '../trait/clicked.js';


export function factoryEntity( sprite, objectConf, { width, height }){

  let listAnimArray    = [...Object.keys(objectConf.collectable)],
          widthCanvas  = width,
          heightCanvas = height,
          animEtoile   = sprite.animations.get("explode"),
          margeWidth   = Math.round( widthCanvas / 6);

      function draw( context, cumulateTime){

        if (!this.died){
          let animObj = sprite.animations.get( this.anim );
          context.drawImage( animObj.anim( this.pos.y), this.pos.x - animObj.size, this.pos.y - animObj.size)
        }else{
          if( !this.animeEnd){
            this.drawExplode( context, cumulateTime);
          }
        }

      }

      function drawExplode( context, cumulateTime) {

          context.drawImage(
              this.explodeAnim( this.numExplode),
              this.pos.x ,
              this.pos.y
          );

          context.drawImage(
            this.explodeEtoile( this.numExplode),
            this.pos.x + this.etoileOffset.x,
            this.hitBox.bottom + this.etoileOffset.y
          );

          this.numExplode += Math.ceil( cumulateTime);
      
      }


      function reset(){

        if (this.FALL){
          this.FALL.reset( this);
        }

      }

      function dieAnimeEnd(){
        this.numExplode = 0;
        this.animeEnd   = true;
      }

      return function createItem( ){
       
        let item        = new Entity();
        let iLen        = listAnimArray.length - 1;
        let randIndex   = Math.round( Math.random() * iLen);

        item.animeEnd   = false;
        item.died       = false;

        item.pos.x    = Math.random() * (widthCanvas - margeWidth * 2) + margeWidth;
        item.pos.y    = (Math.random() * -heightCanvas) - Math.round(heightCanvas/5);
        item.addTrait( new Fall(item.pos.y, height+40));
        item.addTrait( new SinMove( item.pos.x));
        item.addTrait( new Clicked());
        
        item.anim       = listAnimArray[ randIndex];
        let confItem    = objectConf.collectable[item.anim];

        item.numExplode  = 0;

        item.draw        = draw;         //explode
        item.drawExplode = drawExplode;
        item.reset       = reset.bind(item);
        item.score       = confItem.score;

        
        let tileName = confItem.entity;
        let tiles    = sprite.tiles.get( tileName);
        
        item.size.x = tiles.size.x;
        item.size.y = tiles.size.y;
        
        item.explodeAnim   = sprite.explodes.get( tileName).anim( dieAnimeEnd.bind( item));
        item.explodeEtoile = animEtoile.anim( dieAnimeEnd.bind( item));

        item.zoom = objectConf.entity[tileName].zoom;

        item.etoileOffset  = {
          x : -Math.round((animEtoile.size.width  - item.size.x)*.5),
          y : -animEtoile.size.height,
        };

        return item;

      }

}