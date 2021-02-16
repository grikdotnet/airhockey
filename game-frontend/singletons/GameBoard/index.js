import { makeAutoObservable, autorun } from "mobx";
import Handle from "../../models/Handle";
import Puck from "../../models/Puck";

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

    puck = new Puck( this );

    handles = Array.from({ length: 2 }, () => new Handle( this ));

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
        this.handles[ 0 ].set( halfWidth, height - 30 );
        this.handles[ 1 ].set( halfWidth, 30 );
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

    get handleTouchingPuck(){
        return this.handles.find( handle => handle.puckDist < handle.radius + this.puck.radius );
    }

    constructor(){
        makeAutoObservable( this, {
            handles: false
        });

        autorun(() => {
            const { handleTouchingPuck } = this;
            if( handleTouchingPuck ){
                const angle = Math.atan2( handleTouchingPuck.xPuckDist, handleTouchingPuck.yPuckDist );
                const sin = Math.sin( angle );
                const cos = Math.cos( angle );
                console.log( "HIT", angle )
           //     this.puck.hit( sin, cos );
            }
        })

        autorun(() => {
            const { ctx, width, height } = this;
            ctx.clearRect( 0, 0, width, height );

            for( let handle of this.handles ){
                handle.draw();
            }

            this.puck.draw();

            this.puck.update();
        }, { scheduler: requestAnimationFrame });
    }
}

export default new GameBoard;