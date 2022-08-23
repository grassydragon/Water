export class Matrix4 {

    /**
     * Constructor
     * @param {Matrix4, Array, Float32Array} [src] the source of the elements
     */
    constructor(src) {
        if (src) {
            if (src instanceof Matrix4) {
                this.elements = new Float32Array(src.elements);
            }
            else if (src instanceof Array || src instanceof Float32Array) {
                if (src.length === 16) this.elements = new Float32Array(src);
                else throw `Matrix4.constructor: "src.length" is ${src.length}`;
            }
            else {
                throw `Matrix4.constructor: "src" has a type ${src.constructor.name}`;
            }
        }
        else {
            this.elements = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }
    }

    /**
     * Copies the elements
     * @param {Matrix4, Array, Float32Array} src the source of the elements
     * @return {Matrix4} this
     */
    set(src) {
        if (src instanceof Matrix4) {
            this.elements.set(src.elements);
        }
        else if (src instanceof Array || src instanceof Float32Array) {
            if (src.length === 16) this.elements.set(src);
            else throw `Matrix4.set: "src.length" is ${src.length}`;
        }
        else {
            throw `Matrix4.set: "src" has a type ${src.constructor.name}`;
        }

        return this;
    }

    /**
     * Resets the matrix
     * @return {Matrix4} this
     */
    reset() {
        this.elements.set([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

        return this;
    }

    /**
     * Transposes the matrix
     * @return {Matrix4} this
     */
    transpose() {
        let e = this.elements;

        let t;

        t = e[1];
        e[1] = e[4];
        e[4] = t;

        t = e[2];
        e[2] = e[8];
        e[8] = t;

        t = e[3];
        e[3] = e[12];
        e[12] = t;

        t = e[6];
        e[6] = e[9];
        e[9] = t;

        t = e[7];
        e[7] = e[13];
        e[13] = t;

        t = e[11];
        e[11] = e[14];
        e[14] = t;

        return this;
    }

    /**
     * Inverts the matrix
     * @return {Matrix4} this
     */
    invert() {
        let e = this.elements;

        //The transposed cofactor matrix
        let ct = new Float32Array(16);

        ct[0] = e[5] * e[10] * e[15] - e[5] * e[11] * e[14] - e[9] * e[6] * e[15]
                + e[9] * e[7] * e[14] + e[13] * e[6] * e[11] - e[13] * e[7] * e[10];
        ct[4] = -e[4] * e[10] * e[15] + e[4] * e[11] * e[14] + e[8] * e[6] * e[15]
                - e[8] * e[7] * e[14] - e[12] * e[6] * e[11] + e[12] * e[7] * e[10];
        ct[8] = e[4] * e[9] * e[15] - e[4] * e[11] * e[13] - e[8] * e[5] * e[15]
                + e[8] * e[7] * e[13] + e[12] * e[5] * e[11] - e[12] * e[7] * e[9];
        ct[12] = -e[4] * e[9] * e[14] + e[4] * e[10] * e[13] + e[8] * e[5] * e[14]
                 - e[8] * e[6] * e[13] - e[12] * e[5] * e[10] + e[12] * e[6] * e[9];

        ct[1] = -e[1] * e[10] * e[15] + e[1] * e[11] * e[14] + e[9] * e[2] * e[15]
                - e[9] * e[3] * e[14] - e[13] * e[2] * e[11] + e[13] * e[3] * e[10];
        ct[5] = e[0] * e[10] * e[15] - e[0] * e[11] * e[14] - e[8] * e[2] * e[15]
                + e[8] * e[3] * e[14] + e[12] * e[2] * e[11] - e[12] * e[3] * e[10];
        ct[9] = -e[0] * e[9] * e[15] + e[0] * e[11] * e[13] + e[8] * e[1] * e[15]
                - e[8] * e[3] * e[13] - e[12] * e[1] * e[11] + e[12] * e[3] * e[9];
        ct[13] = e[0] * e[9] * e[14] - e[0] * e[10] * e[13] - e[8] * e[1] * e[14]
                 + e[8] * e[2] * e[13] + e[12] * e[1] * e[10] - e[12] * e[2] * e[9];

        ct[2] = e[1] * e[6] * e[15] - e[1] * e[7] * e[14] - e[5] * e[2] * e[15]
                + e[5] * e[3] * e[14] + e[13] * e[2] * e[7] - e[13] * e[3] * e[6];
        ct[6] = -e[0] * e[6] * e[15] + e[0] * e[7] * e[14] + e[4] * e[2] * e[15]
                - e[4] * e[3] * e[14] - e[12] * e[2] * e[7] + e[12] * e[3] * e[6];
        ct[10] = e[0] * e[5] * e[15] - e[0] * e[7] * e[13] - e[4] * e[1] * e[15]
                 + e[4] * e[3] * e[13] + e[12] * e[1] * e[7] - e[12] * e[3] * e[5];
        ct[14] = -e[0] * e[5] * e[14] + e[0] * e[6] * e[13] + e[4] * e[1] * e[14]
                 - e[4] * e[2] * e[13] - e[12] * e[1] * e[6] + e[12] * e[2] * e[5];

        ct[3] = -e[1] * e[6] * e[11] + e[1] * e[7] * e[10] + e[5] * e[2] * e[11]
                - e[5] * e[3] * e[10] - e[9] * e[2] * e[7] + e[9] * e[3] * e[6];
        ct[7] = e[0] * e[6] * e[11] - e[0] * e[7] * e[10] - e[4] * e[2] * e[11]
                + e[4] * e[3] * e[10] + e[8] * e[2] * e[7] - e[8] * e[3] * e[6];
        ct[11] = -e[0] * e[5] * e[11] + e[0] * e[7] * e[9] + e[4] * e[1] * e[11]
                 - e[4] * e[3] * e[9] - e[8] * e[1] * e[7] + e[8] * e[3] * e[5];
        ct[15] = e[0] * e[5] * e[10] - e[0] * e[6] * e[9] - e[4] * e[1] * e[10]
                 + e[4] * e[2] * e[9] + e[8] * e[1] * e[6] - e[8] * e[2] * e[5];

        //The determinant
        let det = e[0] * ct[0] + e[1] * ct[4] + e[2] * ct[8] + e[3] * ct[12];

        if (det === 0) return this;

        for (let i = 0; i < 16; i++) e[i] = ct[i] / det;

        return this;
    }

    /**
     * Multiplies the matrix by another matrix
     * @param {Matrix4} matrix the matrix on the right
     * @return {Matrix4} this
     */
    multiply(matrix) {
        let e = this.elements;

        let t = matrix.elements;

        for (let i = 0; i < 4; i++) {
            let ei0 = e[i];
            let ei1 = e[i + 4];
            let ei2 = e[i + 8];
            let ei3 = e[i + 12];

            e[i] = ei0 * t[0] + ei1 * t[1] + ei2 * t[2] + ei3 * t[3];
            e[i + 4] = ei0 * t[4] + ei1 * t[5] + ei2 * t[6] + ei3 * t[7];
            e[i + 8] = ei0 * t[8] + ei1 * t[9] + ei2 * t[10] + ei3 * t[11];
            e[i + 12] = ei0 * t[12] + ei1 * t[13] + ei2 * t[14] + ei3 * t[15];
        }

        return this;
    }

    /**
     * Multiplies the matrix by the three-dimensional vector
     * @param vector the vector on the right
     * @return {Vector3} the resulting vector
     */
    multiplyVector3(vector) {
        let e = this.elements;

        let t = vector.elements;

        let v = new Vector3();
        let r = v.elements;

        r[0] = t[0] * e[0] + t[1] * e[4] + t[2] * e[8] + e[12];
        r[1] = t[0] * e[1] + t[1] * e[5] + t[2] * e[9] + e[13];
        r[2] = t[0] * e[2] + t[1] * e[6] + t[2] * e[10] + e[14];

        return v;
    }

    /**
     * Multiplies the matrix by the four-dimensional vector
     * @param vector the vector on the right
     * @return {Vector4} the resulting vector
     */
    multiplyVector4(vector) {
        let e = this.elements;

        let t = vector.elements;

        let v = new Vector4();
        let r = v.elements;

        r[0] = t[0] * e[0] + t[1] * e[4] + t[2] * e[8] + t[3] * e[12];
        r[1] = t[0] * e[1] + t[1] * e[5] + t[2] * e[9] + t[3] * e[13];
        r[2] = t[0] * e[2] + t[1] * e[6] + t[2] * e[10] + t[3] * e[14];
        r[3] = t[0] * e[3] + t[1] * e[7] + t[2] * e[11] + t[3] * e[15];

        return v;
    }

    /**
     * Sets the scaling matrix
     * @param {Number} x the scaling along the x axis
     * @param {Number} y the scaling along the y axis
     * @param {Number} z the scaling along the z axis
     * @return {Matrix4} this
     */
    setScale(x, y, z) {
        let e = this.elements;

        e[0] = x;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = y;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = z;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;

        return this;
    }

    /**
     * Multiplies the matrix by the scaling matrix
     * @param {Number} x the scaling along the x axis
     * @param {Number} y the scaling along the y axis
     * @param {Number} z the scaling along the z axis
     * @return {Matrix4} this
     */
    scale(x, y, z) {
        let e = this.elements;

        e[0] *= x;
        e[1] *= x;
        e[2] *= x;
        e[3] *= x;

        e[4] *= y;
        e[5] *= y;
        e[6] *= y;
        e[7] *= y;

        e[8] *= z;
        e[9] *= z;
        e[10] *= z;
        e[11] *= z;

        return this;
    }

    /**
     * Sets the translation matrix
     * @param {Number} x the translation along the x axis
     * @param {Number} y the translation along the y axis
     * @param {Number} z the translation along the z axis
     * @return {Matrix4} this
     */
    setTranslate(x, y, z) {
        let e = this.elements;

        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 1;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = 1;
        e[11] = 0;

        e[12] = x;
        e[13] = y;
        e[14] = z;
        e[15] = 1;

        return this;
    }

    /**
     * Multiplies the matrix by the translation matrix
     * @param {Number} x the translation along the x axis
     * @param {Number} y the translation along the y axis
     * @param {Number} z the translation along the z axis
     * @return {Matrix4} this
     */
    translate(x, y, z) {
        let e = this.elements;

        e[12] = e[0] * x + e[4] * y + e[8] * z + e[12];
        e[13] = e[1] * x + e[5] * y + e[9] * z + e[13];
        e[14] = e[2] * x + e[6] * y + e[10] * z + e[14];
        e[15] = e[3] * x + e[7] * y + e[11] * z + e[15];

        return this;
    }

    /**
     * Sets the rotation matrix
     * @param {Number} angle the rotation angle in degrees
     * @param {Number} x the x component of the rotation axis
     * @param {Number} y the y component of the rotation axis
     * @param {Number} z the z component of the rotation axis
     * @return {Matrix4} this
     */
    setRotate(angle, x, y, z) {
        angle = Math.PI * angle / 180;

        let e = this.elements;

        let s = Math.sin(angle);
        let c = Math.cos(angle);

        if (x !== 0 && y === 0 && z === 0) {
            //The rotation around the x axis

            if (x < 0) s = -s;

            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;

            e[4] = 0;
            e[5] = c;
            e[6] = s;
            e[7] = 0;

            e[8] = 0;
            e[9] = -s;
            e[10] = c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        else if (x === 0 && y !== 0 && z === 0) {
            //The rotation around the y axis

            if (y < 0) s = -s;

            e[0] = c;
            e[1] = 0;
            e[2] = -s;
            e[3] = 0;

            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;

            e[8] = s;
            e[9] = 0;
            e[10] = c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        else if (x === 0 && y === 0 && z !== 0) {
            //The rotation around the z axis

            if (z < 0) s = -s;

            e[0] = c;
            e[1] = s;
            e[2] = 0;
            e[3] = 0;

            e[4] = -s;
            e[5] = c;
            e[6] = 0;
            e[7] = 0;

            e[8] = 0;
            e[9] = 0;
            e[10] = 1;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        else {
            //The rotation around another axis

            let r = Math.sqrt(x * x + y * y + z * z);

            if (r !== 1) {
                x /= r;
                y /= r;
                z /= r;
            }

            let nc = 1 - c;
            let xy = x * y;
            let yz = y * z;
            let zx = z * x;
            let xs = x * s;
            let ys = y * s;
            let zs = z * s;

            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;

            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;

            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }

        return this;
    }

    /**
     * Multiplies the matrix by the rotation matrix
     * @param {Number} angle the rotation angle in degrees
     * @param {Number} x the x component of the rotation axis
     * @param {Number} y the y component of the rotation axis
     * @param {Number} z the z component of the rotation axis
     * @return {Matrix4} this
     */
    rotate(angle, x, y, z) {
        return this.multiply(new Matrix4().setRotate(angle, x, y, z));
    }

    /**
     * Sets the view matrix
     * @param {Number} eyeX the x component of the eye point
     * @param {Number} eyeY the y component of the eye point
     * @param {Number} eyeZ the z component of the eye point
     * @param {Number} centerX the x component of the reference point
     * @param {Number} centerY the y component of the reference point
     * @param {Number} centerZ the z component of the reference point
     * @param {Number} upX the x component of the up vector
     * @param {Number} upY the y component of the up vector
     * @param {Number} upZ the z component of the up vector
     * @return {Matrix4} this
     */
    setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        let fx = centerX - eyeX;
        let fy = centerY - eyeY;
        let fz = centerZ - eyeZ;

        // Normalize f.
        let rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Calculate cross product of f and up.
        let sx = fy * upZ - fz * upY;
        let sy = fz * upX - fx * upZ;
        let sz = fx * upY - fy * upX;

        // Normalize s.
        let rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;

        // Calculate cross product of s and f.
        let ux = sy * fz - sz * fy;
        let uy = sz * fx - sx * fz;
        let uz = sx * fy - sy * fx;

        let e = this.elements;

        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;

        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;

        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;

        // Translate.
        this.translate(-eyeX, -eyeY, -eyeZ);

        return this;
    }

    /**
     * Multiplies the matrix by the view matrix
     * @param {Number} eyeX the x component of the eye point
     * @param {Number} eyeY the y component of the eye point
     * @param {Number} eyeZ the z component of the eye point
     * @param {Number} centerX the x component of the reference point
     * @param {Number} centerY the y component of the reference point
     * @param {Number} centerZ the z component of the reference point
     * @param {Number} upX the x component of the up vector
     * @param {Number} upY the y component of the up vector
     * @param {Number} upZ the z component of the up vector
     * @return {Matrix4} this
     */
    lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        return this.multiply(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
    }

    /**
     * Sets the orthogonal projection matrix
     * @param {Number} left the coordinate of the left clipping plane
     * @param {Number} right the coordinate of the right clipping plane
     * @param {Number} bottom the coordinate of the bottom clipping plane
     * @param {Number} top the coordinate of the top clipping plane
     * @param {Number} near the distance to the near clipping plane (negative, if the plane is behind the view point)
     * @param {Number} far the distance to the far clipping plane (negative, if the plane is behind the view point)
     * @return {Matrix4} this
     */
    setOrthogonal(left, right, bottom, top, near, far) {
        if (left === right || bottom === top || near === far) throw `Matrix4.setOrthogonal: the clip space has a zero volume`;

        let rw = 1 / (right - left);
        let rh = 1 / (top - bottom);
        let rd = 1 / (far - near);

        let e = this.elements;

        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;

        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;

        return this;
    }

    /**
     * Multiplies the matrix by the orthogonal projection matrix
     * @param {Number} left the coordinate of the left clipping plane
     * @param {Number} right the coordinate of the right clipping plane
     * @param {Number} bottom the coordinate of the bottom clipping plane
     * @param {Number} top the coordinate of the top clipping plane
     * @param {Number} near the distance to the near clipping plane (negative, if the plane is behind the view point)
     * @param {Number} far the distance to the far clipping plane (negative, if the plane is behind the view point)
     * @return {Matrix4} this
     */
    orthogonal(left, right, bottom, top, near, far) {
        return this.multiply(new Matrix4().setOrthogonal(left, right, bottom, top, near, far));
    }

    /**
     * Sets the perspective projection matrix
     * @param {Number} left the coordinate of the left side of the near clipping plane
     * @param {Number} right the coordinate of the right side of the near clipping plane
     * @param {Number} bottom the coordinate of the bottom side of the near clipping plane
     * @param {Number} top the coordinate of the top side of the near clipping plane
     * @param {Number} near the distance to the near clipping plane (positive)
     * @param {Number} far the distance to the far clipping plane (positive)
     * @return {Matrix4} this
     */
    setFrustum(left, right, bottom, top, near, far) {
        if (left === right || top === bottom || near === far) throw `Matrix4.setFrustum: the clip space has a zero volume`;

        if (near <= 0) throw `Matrix4.setFrustum: "near" isn't positive`;

        if (far <= 0) throw `Matrix4.setFrustum: "far" isn't positive`;

        let rw = 1 / (right - left);
        let rh = 1 / (top - bottom);
        let rd = 1 / (far - near);

        let e = this.elements;

        e[0] = 2 * near * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 2 * near * rh;
        e[6] = 0;
        e[7] = 0;

        e[8] = (right + left) * rw;
        e[9] = (top + bottom) * rh;
        e[10] = -(far + near) * rd;
        e[11] = -1;

        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;

        return this;
    }

    /**
     * Multiplies the matrix by the perspective projection matrix
     * @param {Number} left the coordinate of the left side of the near clipping plane
     * @param {Number} right the coordinate of the right side of the near clipping plane
     * @param {Number} bottom the coordinate of the bottom side of the near clipping plane
     * @param {Number} top the coordinate of the top side of the near clipping plane
     * @param {Number} near the distance to the near clipping plane (positive)
     * @param {Number} far the distance to the far clipping plane (positive)
     * @return {Matrix4} this
     */
    frustum(left, right, bottom, top, near, far) {
        return this.multiply(new Matrix4().setFrustum(left, right, bottom, top, near, far));
    }

    /**
     * Sets the perspective projection matrix
     * @param {Number} fovY the field of view in the vertical plane in degrees
     * @param {Number} aspect the aspect of the near and far clipping planes
     * @param {Number} near the distance to the near clipping plane (positive)
     * @param {Number} far the distance to the far clipping plane (positive)
     * @return {Matrix4} this
     */
    setPerspective(fovY, aspect, near, far) {
        if (near === far || aspect === 0) throw `Matrix4.setPerspective: the clip space has a zero volume`;

        if (near <= 0) throw `Matrix4.setPerspective: "near" isn't positive`;

        if (far <= 0) throw `Matrix4.setPerspective: "far" isn't positive`;

        fovY = Math.PI * fovY / 180 / 2;

        let s = Math.sin(fovY);

        if (s === 0) throw `Matrix4.setPerspective: the clip space has a zero volume`;

        let rd = 1 / (far - near);

        let ct = Math.cos(fovY) / s;

        let e = this.elements;

        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;

        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;

        return this;
    }

    /**
     * Multiplies the matrix by the perspective projection matrix
     * @param {Number} fovY the field of view in the vertical plane in degrees
     * @param {Number} aspect the aspect of the near and far clipping planes
     * @param {Number} near the distance to the near clipping plane (positive)
     * @param {Number} far the distance to the far clipping plane (positive)
     * @return {Matrix4} this
     */
    perspective(fovY, aspect, near, far) {
        return this.multiply(new Matrix4().setPerspective(fovY, aspect, near, far));
    }

}
