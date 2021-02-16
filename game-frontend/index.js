import { render } from "react-dom";
import App from "./components/App";
import "normalize.css";
import "./style.scss";

const root = document.createElement( "div" );
root.id = "app_root";
document.body.appendChild( root );

render( <App />, root );