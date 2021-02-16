import Disc from "../Disc";

class Handle extends Disc {

    get xPuckDist(){
        return this.x - this.gameBoard.puck.x;
    }

    get yPuckDist(){
        return this.y - this.gameBoard.puck.y;
    }

    get puckDist(){
        return Math.hypot( this.xPuckDist, this.yPuckDist );
    }
}

export default Handle;