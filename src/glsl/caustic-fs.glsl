#extension GL_OES_standard_derivatives : enable

precision highp float;

varying vec3 v_position;
varying vec3 v_intersection;

void main() {
    float brightness = abs(dFdx(v_position.x) * dFdy(v_position.z) / (dFdx(v_intersection.x) * dFdy(v_intersection.z)) * 0.2);

    gl_FragColor = vec4(brightness, brightness, brightness, 1.0);
}