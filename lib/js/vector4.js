class Vector4 {

    /**
     * Constructor
     * @param {Vector4, Vector3, Array, Float32Array} [src] the source of the elements
     */
    constructor(src) {
        if (src) {
            if (src instanceof Vector4) {
                this.elements = new Float32Array(src.elements);
            }
            else if (src instanceof Vector3) {
                this.elements = new Float32Array([0, 0, 0, 1]);
                this.elements.set(src.elements);
            }
            else if (src instanceof Array || src instanceof Float32Array) {
                if (src.length === 4) this.elements = new Float32Array(src);
                else throw `Vector4.constructor: "src.length" is ${src.length}`
            }
            else {
                throw `Vector4.constructor: "src" has a type ${src.constructor.name}`;
            }
        }
        else {
            this.elements = new Float32Array([0, 0, 0, 1]);
        }
    }

    /**
     * Copies the elements
     * @param {Vector4, Vector3, Array, Float32Array} src the source of the elements
     * @return {Vector4} this
     */
    set(src) {
        if (src instanceof Vector4) {
            this.elements.set(src.elements);
        }
        else if (src instanceof Vector3) {
            this.elements.set(src.elements);
            this.elements[3] = 1;
        }
        else if (src instanceof Array || src instanceof Float32Array) {
            if (src.length === 4) this.elements.set(src);
            else throw `Vector4.set: "src.length" is ${src.length}`
        }
        else {
            throw `Vector4.set: "src" has a type ${src.constructor.name}`;
        }

        return this;
    }

    /**
     * Gets the x component
     * @return {Number} x
     */
    get x() {
        return this.elements[0];
    }

    /**
     * Sets the x component
     * @param {Number} value
     */
    set x(value) {
        this.elements[0] = value;
    }

    /**
     * Gets the y component
     * @return {Number} y
     */
    get y() {
        return this.elements[1];
    }

    /**
     * Sets the y component
     * @param {Number} value
     */
    set y(value) {
        this.elements[1] = value;
    }

    /**
     * Gets the z component
     * @return {Number} z
     */
    get z() {
        return this.elements[2];
    }

    /**
     * Sets the z component
     * @param {Number} value
     */
    set z(value) {
        this.elements[2] = value;
    }

    /**
     * Gets the w component
     * @return {Number} w
     */
    get w() {
        return this.elements[3];
    }

    /**
     * Sets the w component
     * @param {Number} value
     */
    set w(value) {
        this.elements[3] = value;
    }

    /**
     * Gets the r component
     * @return {Number} r
     */
    get r() {
        return this.elements[0];
    }

    /**
     * Sets the r component
     * @param {Number} value
     */
    set r(value) {
        this.elements[0] = value;
    }

    /**
     * Gets the g component
     * @return {Number} g
     */
    get g() {
        return this.elements[1];
    }

    /**
     * Sets the g component
     * @param {Number} value
     */
    set g(value) {
        this.elements[1] = value;
    }

    /**
     * Gets the b component
     * @return {Number} b
     */
    get b() {
        return this.elements[2];
    }

    /**
     * Sets the b component
     * @param {Number} value
     */
    set b(value) {
        this.elements[2] = value;
    }

    /**
     * Gets the a component
     * @return {Number} a
     */
    get a() {
        return this.elements[3];
    }

    /**
     * Sets the a component
     * @param {Number} value
     */
    set a(value) {
        this.elements[3] = value;
    }

}
