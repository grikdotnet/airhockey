import { makeObservable, observable, action } from "mobx";

class Disc {

    radius = 10;
    x = 20;
    y = 20;
    color = "#000";

    constructor( gameBoard ){
        this.gameBoard = gameBoard;

        makeObservable( this, {
            x: observable,
            y: observable,
            radius: observable,
            color: observable,
            move: action,
            set: action
        });
    }

    move( x, y ){
        this.x += x;
        this.y += y;
    }

    set( x, y ){
        this.x = x;
        this.y = y;
    }

    draw(){
        const { ctx } = this.gameBoard;
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, false );
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Disc;