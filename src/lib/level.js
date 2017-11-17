import Render from './render.js';

export default class Level{

  constructor(){
    this.items  = [];
    this.render = Render;
  }


  update( freq){
    this.items.map( items => {
      
      items.update( freq);
      // vérification des cliques USER
    });
  }


}