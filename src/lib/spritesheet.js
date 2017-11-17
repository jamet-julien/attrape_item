import { createAnim } from './anim.js';

export default class SpriteSheet{

    constructor( image){
        this.image      = image;
        this.tiles      = new Map();
        this.animations = new Map();
    }

    //
    _computeMaxLength( { centre, buffer}){
      let maxSize = Math.pow( Math.max( buffer.width - centre.x, centre.x), 2) + Math.pow( Math.max( buffer.height - centre.y, centre.y), 2);
      return Math.ceil( Math.sqrt( maxSize));
    }

    //
    _computeRotate( { buffer, centre }, size ){

      return ( deg) => {
        
        const bufferNew  = document.createElement( 'canvas');

        bufferNew.width  = size * 2;
        bufferNew.height = size * 2;
        
        const context = bufferNew.getContext('2d');
  
        context.save();
        context.translate( size, size);
        context.rotate( deg * Math.PI / 180);
        context.drawImage( buffer, -centre.x, -centre.y);
        context.restore();
  
        return bufferNew;
      }
    }
    
    //
    defineAnimation( name, { entity , deg, freq}){

      let sprite     = this.tiles.get( entity);
      let size       = this._computeMaxLength( sprite);
      let func       = this._computeRotate( sprite, size);
      let animSet    = [];
      let degCurrent = -deg;
      let step       = (deg*2)/freq;

      for (let i = degCurrent; i < deg; i += step ){
        animSet.push( func( i));
      }
      let anim = createAnim( animSet);
      this.animations.set( name, { anim, size });
    }

    //
  define( name, x, y, w, h, centre, size = 1, blur = 0){

      const buffer  = document.createElement('canvas');
      
      buffer.width  = Math.round( w * size);
      buffer.height = Math.round( h * size);

      centre.x      = Math.round( centre.x * size),
      centre.y      = Math.round( centre.y * size);
      
      const context = buffer.getContext('2d');

      if( blur){
        blur = Math.ceil( blur * size);
        context.filter = `blur(${blur}px)`;
        x -= blur;
        y -= blur;
        w += ( blur * 4);
        h += ( blur * 4);
      }
      
      context.drawImage( this.image, x, y, w, h, 0, 0, Math.round(w * size), Math.round(h * size));
      
      this.tiles.set( name, { buffer, centre, size});

      return this;

    }

    draw( name, context, x, y){
      const obj = this.tiles.get( name);
      context.drawImage( obj.buffer, x, y);
      return this;
    }
}