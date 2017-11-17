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
      let { x, y, w, h, centre, size = 1, blur = 0 } = Object.assign({}, conf.items[entity.item], entity);
      spritesheet.define( name, x, y, w, h, centre, size, blur);
    }
  
    for (let name in conf.animations) {
      let entity = conf.animations[name];
      spritesheet.defineAnimation( name, entity);
    }
    
    return spritesheet;
  })
}

