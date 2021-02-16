import { makeAutoObservable, autorun } from "mobx";
import Disc from "../../models/Disc";

class GameBoard {

    canvas = null;
    rawCtx = null;

    /*
        TODO:
            do we need complex onChange logics here?
    */
    pixelRatio = window.devicePixelRatio;

    width = 0;
    height = 0;

    puck = new Disc( this );

    handle1 = new Disc( this );
    handle2 = new Disc( this );

    initializeCanvas = el => {
        this.canvas = el;
        this.rawCtx = el && el.getContext( "2d" );
    }

    setDimensions( width, height ){
        this.width = width;
        this.height = height;

        this.resetDiscPositions();
    }

    resetDiscPositions(){
        const { height, width } = this;
        const halfWidth = Math.round( width / 2 );
        const halfHeight = Math.round( height / 2 );

        this.puck.set( halfWidth, halfHeight );
        this.handle1.set( halfWidth, height - 30 );
        this.handle2.set( halfWidth, 30 );
    }

    get ctx(){
        const { canvas, rawCtx } = this;
        if( canvas ){
            canvas.style.width = this.width + "px";
            canvas.style.height = this.height + "px";

            const scale = this.pixelRatio;

            canvas.width = Math.trunc( this.width * scale );
            canvas.height = Math.trunc( this.height * scale );

            rawCtx.imageSmoothingEnabled = false;
            rawCtx.scale( scale, scale );
        }
        return rawCtx;
    }

    constructor(){
        makeAutoObservable( this );

        autorun(() => {
            const { ctx, width, height } = this;
            ctx.clearRect( 0, 0, width, height );

            this.handle1.draw();
            this.handle2.draw();
            this.puck.draw();
        }, { scheduler: requestAnimationFrame });
    }
}

export default new GameBoard;