(function(){

    Game( function( instance){
      console.log( instance);
       
      instance.on( 'ready', function(){
        console.log( 'start');
        instance.play();
      });
  
      instance.on( 'timeout', function () {
        console.log( 'fin');
      });
  
      instance.on( 'clicked', function( score) {
        console.log( score);
      });

    });



})();