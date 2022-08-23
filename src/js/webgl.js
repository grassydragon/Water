export class WebGL {

    /**
     * Creates the shader
     * @param {WebGLRenderingContext} gl the WebGL context
     * @param {String} source the shader source
     * @param {GLenum} type the shader type
     * @return {WebGLShader} the created shader
     */
    static createShader(gl, source, type) {
        let shader = gl.createShader(type);

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            let log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw `WebGLUtils.createShader: the shader compilation completed with errors:\n${log}`;
        }

        return shader;
    }

    /**
     * Creates the program
     * @param {WebGLRenderingContext} gl the WebGl context
     * @param {WebGLShader} vertexShader the vertex shader
     * @param {WebGLShader} fragmentShader the fragment shader
     * @return {WebGLProgram} the created program
     */
    static createProgram(gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            let log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw `WebGLUtils.createProgram: the program linking completed with errors:\n${log}`;
        }

        return program;
    }

    /**
     * Creates the buffer
     * @param {WebGLRenderingContext} gl the WebGl context
     * @param {BufferSource} data the buffer data
     * @param {GLenum} target the buffer target
     * @param {GLenum} usage the buffer usage
     * @return {WebGLBuffer} the created buffer
     */
    static createBuffer(gl, data, target, usage) {
        let buffer = gl.createBuffer();

        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, usage);

        gl.bindBuffer(target, null);

        return buffer;
    }

}
