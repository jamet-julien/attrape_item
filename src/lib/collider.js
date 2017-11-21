

export const collisionLayer = ( level)=>{
  
  return ( context, cumulateTime)=>{
    context.strokeStyle = 'red';

    level.items.map( item => {

      context.beginPath();
      context.rect(
          item.hitBox.left,
          item.hitBox.top,
          item.hitBox.width,
          item.hitBox.height
      );
      context.stroke();
    });
  };
}


export default class Collider{

  constructor( mouse){
    this.mouse = mouse;
  }

  check( item){

    if (this.mouse.down && !item.died) {

      if( this.mouse.x <= item.hitBox.right &&
          this.mouse.x >= item.hitBox.left  &&
          this.mouse.y <= item.hitBox.bottom &&
          this.mouse.y >= item.hitBox.top){
            item.trigger();
            this.mouse.forceDown();
            return true;
          }

    }

    return false;
  }



}