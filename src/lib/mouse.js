


const Mouse = () => {

  var oPublic = {
    draw,
    setScope,
    forceDown,
    x   : 0,
    y   : 0,
    down: false
  }, _oScope = { offsetLeft: 0, offsetTop: 0 },
  timer = null;

  /**
   * [setScope description]
   * @param {[type]} oDom [description]
   */
  function setScope(oDom) {
    _oScope = oDom;
  }

  function forceDown(){
    oPublic.down = false;
    if( timer) {
      clearTimeout( timer);
    }
  }

  function draw( context, time){
    context.fillStyle = "green";
    context.beginPath();
    context.rect( oPublic.x-5,oPublic.y-5, 10, 10);
    context.fill();
  }

  window.addEventListener('mousemove', (e) => {
    oPublic.x = e.pageX - _oScope.offsetLeft;
    oPublic.y = e.pageY - _oScope.offsetTop;
  });

  window.addEventListener('mousedown', (e) => {
    oPublic.down = true;
    if(timer){
      clearTimeout( timer); 
    }
    timer = setTimeout(()=>{
      oPublic.down = false;
    }, 200);
  });

  window.addEventListener('mouseup', (e) => {
    oPublic.forceDown();
  });

  return oPublic;

};


export default Mouse;
