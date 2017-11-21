import { createAnim, createAnimLoop } from './anim.js';

export default class SpriteSheet{

    constructor( image){
        this.image      = image;
        this.tiles      = new Map();
        this.animations = new Map();
        this.explodes   = new Map();
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

    _computeMultiply({ width, height}, count) {

    let _width = width,
       _height = height,
        _count = count;

      return (listPoint, step) => {

        const bufferNew = document.createElement('canvas');

        bufferNew.width  = _width;
        bufferNew.height = _height;

        const context       = bufferNew.getContext('2d');
        context.globalAlpha = 0.6;

   
        for (let i = 0; i < _count; i++) {

          let { sprite, x, y, speed, life} = listPoint[i];

          if( life < step){
            y = y - ( speed * step);
            x = x + ( Math.cos( step ) * speed);

            context.drawImage(
                              sprite.buffer,
                              x,
                              y
                            );
          }

        }

        return bufferNew;
      }
    }

    //
    defineDecoration(name, { entity, numImage, count, size }) {

      let len        = entity.length,
          sprites    = new Array( len),
          listPoint  = new Array( count),
          topPart    = Math.round( ( size.height / 4 ) * 3),
          bottomPart = size.height - topPart;

      for( let i = 0; i < len ; i++){
        sprites[i] = this.tiles.get( entity[i]);
      }

      for (let i = 0; i < count; i++) {
        let index = Math.round( Math.random() * (len - 1));

        listPoint[i] = {
          sprite  : sprites[ index ],
          x       : Math.round( Math.random() * ( size.width  - 41)) + 20,
          y       : Math.round(Math.random() * bottomPart) + topPart,
          speed   : Math.round( Math.random() * 2) + 1,
          life    : Math.round( Math.random() * numImage)
        };

      }

      let func    = this._computeMultiply( size, count);
      let animSet = [];

      for (let i = 0; i < numImage; i++) {
        let frame = func( listPoint, i);

        if (frame) {
          animSet.push(frame);
        }
      }

      let anim = createAnim( animSet.reverse());
      this.animations.set( name, { anim, size });

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
      let anim = createAnimLoop( animSet);
      this.animations.set( name, { anim, size });
    }
  
  _computeOverlay( { buffer, w, h }, color){

    const overlay    = document.createElement('canvas');
    const overlayCtx = overlay.getContext('2d');

    overlay.width  = w;
    overlay.height = h;

    overlayCtx.drawImage( buffer, 0, 0);

    overlayCtx.globalCompositeOperation = "source-in";
    overlayCtx.fillStyle = color;
    overlayCtx.fillRect(0, 0, w, h);

    return overlay;
  }

    //
  define( name, x, y, w, h, centre, zoom = 1, blur = 0){

      const buffer  = document.createElement('canvas');
      let size      = { x: 0, y: 0};
      
      buffer.width  = Math.round( w * zoom);
      buffer.height = Math.round( h * zoom);

      centre.x      =  centre.x * zoom;
      centre.y      =  centre.y * zoom;
      
      const context = buffer.getContext('2d');

      if( blur){
        blur = Math.ceil( blur * zoom);
        context.filter = `blur(${blur}px)`;
        x -= blur;
        y -= blur;
        w += ( blur * 8);
        h += ( blur * 8);
      }

      context.drawImage( this.image, x, y, w, h, 0, 0, Math.ceil(w * zoom), Math.ceil(h * zoom));
      
      /*
      if( zoom != .3 && !~name.indexOf( "etoile") ){

        let color   = (zoom <= .2) ? 'rgba( 255, 255, 255, .4)' : 'rgba( 0, 0, 0, .3)';
        let option  = { buffer, w, h };
        let overlay = this._computeOverlay( option, color)
        
        context.drawImage( overlay, 0, 0);
        
      }
      */

      size.x = buffer.width;
      size.y = buffer.height;

      this.tiles.set( name, { buffer, centre, zoom, size});
      this.defineExplode( name);
      return this;

    }

    _overlayStart( sprite, numImg, maxSize){

      let buffer = sprite.buffer,
          w      = buffer.width,
          step   = (maxSize / numImg),
          h      = buffer.height;

      return ( num, listPoint) => {

        const overlay  = document.createElement('canvas');
        const start    = document.createElement('canvas');
        
        overlay.width  = start.width  = w;
        overlay.height = start.height = h;

        const startCtx   = start.getContext('2d');
        const overlayCtx = overlay.getContext('2d');
        

        startCtx.fillStyle = `#FFF`;

        listPoint.map((obj)=>{

          startCtx.beginPath();
          startCtx.arc(
            obj.x,
            obj.y,
            Math.round( step * num),
            0,
            2 * Math.PI,
            false
          );

          startCtx.fill();
          startCtx.closePath();
        
        });

        overlayCtx.drawImage( buffer, 0, 0);
        overlayCtx.globalCompositeOperation = "source-in";
        overlayCtx.drawImage( start, 0, 0);
        overlayCtx.drawImage( buffer, 0, 0);

        return overlay;
      }
    }

    //
    defineExplode(  name) {

      
      let numImge      = 90;
      let tailleMax    = 15;
      
      let sprite       = this.tiles.get( name);

      let particuleLen = 30 + Math.round( 150 * sprite.zoom);

      let listPoint    = new Array( particuleLen);
      let func         = this._overlayStart( sprite, numImge, tailleMax );
      let animSet      = [];

      for( let i = 0 ; i < particuleLen ; i++){

        listPoint[i] = {
          x    : Math.round( Math.random() * sprite.buffer.width),
          y    : Math.round( Math.random() * sprite.buffer.height),
          size : 0
        };

      }

      for (let i = 0; i < numImge; i++) {
        let frame = func( i, listPoint);

        if( frame){
          animSet.push(frame);
        }

      }

      let anim = createAnim(animSet);
      this.explodes.set( name, { anim });
    }



    draw( name, context, x, y){
      const obj = this.tiles.get( name);
      context.drawImage( obj.buffer, x, y);
      return this;
    }
}