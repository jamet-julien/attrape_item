

export function createAnim( frames){

  return function looper( step) {

    let norm      = ( step % frames.length) / frames.length;
    let index     = Math.cos( norm * Math.PI * 2 ) + 1;
    let realIndex = Math.abs( Math.floor( index / 2 * (frames.length - 1)));

    return frames[ realIndex ];

  }
}