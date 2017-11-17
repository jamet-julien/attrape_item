

export default (function Render(){

  let layers = [];

  function push( funcDraw){
    layers.push( funcDraw);
  }

  function draw( context, deltaTime){
    context.clearRect( 0, 0, 640, 640);
    layers.map(funcDraw =>{
      funcDraw( context, deltaTime);
    });
  }

  return {
      push,
      draw,
  }
  
})()