import useResizeObserver from "use-resize-observer";
import GameBoard from "../../singletons/GameBoard";
import css from "./style.module.scss";

const App = () => {

    const keyDownHandler = e => {
        switch( e.key ){
            case "ArrowLeft":
                GameBoard.handle1.move( -1, 0 );
                break;
            case "ArrowRight":
                GameBoard.handle1.move( 1, 0 );
                break;
            case "ArrowDown":
                GameBoard.handle1.move( 0, -1 );
                break;
            case "ArrowUp":
                GameBoard.handle1.move( 0, 1 );
                break;
        }
    }

    const { ref } = useResizeObserver({
        onResize: ({ height, width }) => GameBoard.setDimensions( width, height )
    });

    return (
        <div ref={ref} className={css.wrapper}>
            <canvas
                className={css.canvas}
                ref={GameBoard.initializeCanvas}
                onKeyDown={keyDownHandler}
            />
        </div>
    );
}

export default App;