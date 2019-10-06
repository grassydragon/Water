const int N = _N_;

const float STEP = 2.0 / float(N - 1);

const float PIXEL_SIZE = 1.0 / float(N);
const float HALF_PIXEL_SIZE = PIXEL_SIZE / 2.0;

const float ETA = 1.0 / 1.33;

attribute vec2 a_vertex;

uniform sampler2D u_normalHeightTexture;
uniform vec3 u_light;

varying vec3 v_position;
varying vec3 v_intersection;

void main() {
    vec2 coordinates = HALF_PIXEL_SIZE + a_vertex * PIXEL_SIZE;

    vec4 normalHeight = texture2D(u_normalHeightTexture, coordinates);

    vec3 normal = normalHeight.xyz;
    float height = normalHeight.w;

    vec3 position = vec3(-1.0 + a_vertex.x * STEP, height, -1.0 + a_vertex.y * STEP);

    v_position = position;

    vec3 ray = refract(u_light, normal, ETA);

    float t = -position.y / ray.y;

    vec3 intersection = position + t * ray;

    v_intersection = intersection;

    gl_Position = vec4(intersection.x, -intersection.z, 0.0, 1.0);
}