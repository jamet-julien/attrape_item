

export function createAnimLoop( frames){

  return function looper( step) {

    let norm      = ( step % frames.length) / frames.length;
    let index     = Math.cos( norm * Math.PI * 2 ) + 1;
    let realIndex = Math.floor( index / 2 * (frames.length - 1));

    return frames[ realIndex ];

  }
}

export function createAnim(frames) {

  return (trigger) => ( step) => {

    let norm      = (step % frames.length) / frames.length;
    let index     = Math.cos(norm * Math.PI * 2);
    let realIndex = Math.floor( index * ( frames.length - 1) );

    if(realIndex < 0){
      trigger();
      return frames[0];
    }else{
      return frames[ realIndex ];
    } 

  }
}