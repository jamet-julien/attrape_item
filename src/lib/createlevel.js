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
  
  let createEntity = factoryEntity(sprite, objectConf),
        entity, entities = [];

    for( let i = 0 ; i < 20; i++){
      entities.push( createEntity());
    }

    entities.sort( (a, b) => {
        return a.size - b.size;
    }).map( entity =>{
      level.items.push( entity);
      level.render.push( entity.draw.bind( entity));
    });


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

          return level;

        });
    }
}