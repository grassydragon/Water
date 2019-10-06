attribute vec2 a_angle;

void main() {
    gl_Position = vec4(a_angle, 0.0, 1.0);
}