import SpriteSheet from './spritesheet.js';

export function loadImage( pathSrc) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = pathSrc;
  });
}

export function loadJson( pathSrc) {
  return new Promise( resolve => {
      let xhr = new XMLHttpRequest();
      
      xhr.overrideMimeType("application/json");

      xhr.onreadystatechange = function(){
        
        if ( this.readyState == 4 && this.status == "200") {
          resolve( JSON.parse( this.responseText));
        }
        
      };

      xhr.open( 'GET', pathSrc, true)
      xhr.send();

  });
}

export function loadSprite( conf, pathSrc) {
  return loadImage( pathSrc).then( image => {

    let spritesheet = new SpriteSheet( image);
    
    //on stock les images de 
    for (let name in conf.entity) {
      let entity = conf.entity[name];
      let { x, y, w, h, centre, zoom = 1, blur = 0 } = Object.assign({}, conf.frames[entity.item], entity);

      spritesheet.define( name, x, y, w, h, centre, zoom, blur);
    }

    for( let name in conf.decoration){
      let entity = conf.decoration[name];
      spritesheet.defineDecoration( name, entity);
    }
    
    for (let name in conf.collectable) {
      let entity = conf.collectable[name];
      spritesheet.defineAnimation( name, entity);
    }
    
    return spritesheet;
  })
}

