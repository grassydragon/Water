attribute vec2 a_position;
attribute vec2 a_coordinates;

uniform mat4 u_matrix;

varying vec2 v_coordinates;

void main() {
    v_coordinates = a_coordinates;

    gl_Position = u_matrix * vec4(a_position.x, 0.0, a_position.y, 1.0);
}