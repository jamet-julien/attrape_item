export default class Timer {

  constructor( frequence = 1/60){

      this.lastTick        = 0;
      this.cumulateTime    = 0;
      this.visibilityState = 'visible';
      this.play            = false;

      document.addEventListener( 'visibilitychange',() => {
        this.visibilityState = document.visibilityState;
      });

      this.proxyRun = ( time) => {

        this.cumulateTime += (time - this.lastTick || 0) / 1000;

        if (this.cumulateTime > 1) {
          this.cumulateTime = 1;
        }

        while (this.cumulateTime > frequence) {
          this.update(frequence);
          this.cumulateTime -= frequence;
        }

        this.lastTick = time;

        if (this.visibilityState == "visible") {
          this.draw(this.cumulateTime);
        }

        this.play && this.enqueue();

      };
  }

  stop(){
    this.play = false;
  }

  enqueue(){
    requestAnimationFrame( this.proxyRun);
  }


  start(){
    this.play = true;
    this.enqueue();
  }

}