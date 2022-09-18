import App from "./App";
import Config from "./Config";

import './style.css'

const config = Config.getInstance();
const app = new App(config);

app.start();

window.app = app

export default app
