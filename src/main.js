import App from "./App";
import Config from "./Config";

import './style.css'

const config = Config.getInstance();
const app = new App(config);

app.start();

export default app
