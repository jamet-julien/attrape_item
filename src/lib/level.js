import Render from './render.js';

export default class Level{

  constructor(){
    this.items  = [];
    this.render = Render;

    this.test      = 0;
    this.testLimit = 10;
  }


  update( freq){

    this.items.map( items => {
      items.update( freq);
      
      if (this.test > this.testLimit){
        items.trigger();
      }
      // vérification des cliques USER
    });
    
    if (this.test > this.testLimit) {
      this.test = 0;
    }else{
      this.test += freq;
    }
  }


}