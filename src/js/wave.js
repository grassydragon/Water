import { Vector2 } from "../../lib/js/vector2.js";
import { WaveState } from "./wave-state.js";

export class Wave {

    constructor() {
        this.state = WaveState.INACTIVE;
        this.center = new Vector2();
        this.amplitude = 0;
        this.speed = 0;
        this.length = 0;
        this.size = 0;
        this.travel = 0;
        this.start = 0;
        this.stop = 0;
    }

}
