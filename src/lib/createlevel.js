import {loadJson, loadSprite } from './loader.js';
import { factoryEntity } from './factoryentity.js';
import Level from './level.js';


/**
 * 
 * @param {*} objectConf 
 * @param {*} level 
 * @param {*} sprite 
 */
function setupBackground( objectConf, level, sprite){

  level.render.push( entity.draw.bind(entity));
}


/**
 * 
 * @param {*} objectConf 
 * @param {*} level 
 * @param {*} sprite 
 */
function setupEntity( objectConf, level, sprite){
  
  let createEntity = factoryEntity( sprite, Object.keys( objectConf.animations)),
        entity;

    for( let i = 0 ; i < 100; i++){
      entity = createEntity();

      level.items.push( entity);
      level.render.push( entity.draw.bind( entity));
    }

}

/**
 * 
 * @param {*} factoryEntity 
 */
export function createLevel( factoryEntity = null){

    return function loadLevel( mode){
      return loadJson( `./conf/${mode}.json`)
        .then( objectConf => Promise.all([
          objectConf,
          loadSprite( objectConf, objectConf.spritesheet)
        ]))
        .then(([ objectConf, sprite]) => {

          let level    = new Level();

          //setupBackground( objectConf, level, sprite);
          setupEntity( objectConf, level, sprite);

          //sprite.animations.get( "anim1");

          return level;

        });
    }
}