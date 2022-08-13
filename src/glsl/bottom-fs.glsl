precision highp float;

uniform sampler2D u_bottomTexture;
uniform sampler2D u_causticTexture;

varying vec2 v_coordinates;

void main() {
    gl_FragColor = texture2D(u_bottomTexture, v_coordinates) * (texture2D(u_causticTexture, v_coordinates) + 0.2);
}
