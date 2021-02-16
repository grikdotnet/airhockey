import { makeObservable, observable, action, computed } from "mobx";
import Disc from "../Disc";

const rotate = ( x, y, sin, cos, reverse ) => [
    reverse ? ( x * cos + y * sin ) : ( x * cos - y * sin ),
    reverse ? ( y * cos - x * sin ) : ( y * cos + x * sin )
];

class Puck extends Disc {

    dx = 3;
    dy = 3;

    constructor( ...args ){
        super( ...args );

        makeObservable( this, {
            dx: observable,
            dy: observable,
            update: action,
            hit: action
        });
    }

    hit( sin, cos ){
        const { dx, dy } = this;
        this.dx = dx * cos + dy * sin;
        this.dy = dy * cos - dx * sin;
    }

    update(){

        const { radius } = this;
        const { width, height } = this.gameBoard;

        this.move( this.dx, this.dy );

        if( this.x + radius > width || this.x - radius < 0 ){
            this.dx *= -1;
        }

        if( this.y + radius > height || this.y - radius < 0 ){
            this.dy *= -1;
        }
    }
}

export default Puck;