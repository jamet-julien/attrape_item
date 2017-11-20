


export default class HitBox{

  constructor( pos, size){
      this.pos  = pos;
      this.size = size;
  }

  get left(){
    return this.pos.x;
  }

  get right(){
    return this.pos.x + this.size.x;
  }

  get top(){
    return this.pos.y;
  }

  get bottom(){
    return this.pos.y + this.size.y;
  }

  get width(){
    return this.size.x;
  }

  get height() {
    return this.size.y;
  }


}