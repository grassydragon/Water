class Camera {

    /**
     * Constructor
     * @param {Number} minDistance the minimum distance to the coordinate system origin
     * @param {Number} maxDistance the maximum distance to the coordinate system origin
     */
    constructor(minDistance, maxDistance) {
        this._minDistance = minDistance;
        this._maxDistance = maxDistance;
        this._distance = maxDistance;
        this._horizontal = 0;
        this._vertical = 0;
        this._position = new Vector3([0, 0, this.distance]);
        this._update = false;
    }

    get distance() {
        return this._distance;
    }

    set distance(value) {
        if (value < this._minDistance) this._distance = this._minDistance;
        else if (value > this._maxDistance) this._distance = this._maxDistance;
        else this._distance = value;

        this._update = true;
    }

    get horizontal() {
        return this._horizontal;
    }

    set horizontal(value) {
        this._horizontal = value % (2 * Math.PI);

        this._update = true;
    }

    get vertical() {
        return this._vertical;
    }

    set vertical(value) {
        if (value < -Math.PI / 2) this._vertical = -Math.PI / 2;
        else if (value > Math.PI / 2) this._vertical = Math.PI / 2;
        else this._vertical = value;

        this._update = true;
    }

    get position() {
        if (this._update) {
            let projection = this._distance * Math.cos(this._vertical);

            this._position.x = projection * Math.sin(this._horizontal);
            this._position.y = this._distance * Math.sin(this._vertical);
            this._position.z = projection * Math.cos(this._horizontal);

            this._update = false;
        }

        return this._position;
    }

}
