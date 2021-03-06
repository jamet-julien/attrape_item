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
function setupEntity(objectConf, level, sprite, { width, height }){
  
  let createEntity = factoryEntity(sprite, objectConf, { width, height }),
        entity, entities = [];

    for (let i = 0; i < objectConf.setting.num; i++){
      entities.push(createEntity({ width, height }));
    }
    
    entities.sort( (a, b) => {
      return a.zoom - b.zoom;
    }).map( entity =>{
      level.items.push( entity);
      level.render.push( entity.draw.bind( entity));
    });

    level.items.reverse();

}

/**
 * 
 * @param {*} factoryEntity 
 */
export function createLevel( {width, height}){

    return function loadLevel( mode){
      return loadJson( `./conf/${mode}.json`)
        .then( objectConf => Promise.all([
          objectConf,
          loadSprite( objectConf, objectConf.setting.spritesheet)
        ]))
        .then(([ objectConf, sprite]) => {

          let level  = new Level({ width, height });
          level.time = objectConf.setting.time;
          //setupBackground( objectConf, level, sprite);
          setupEntity( objectConf, level, sprite, { width, height });

          return level;

        });
    }
}