const int N = _N_;

const float STEP = 2.0 / float(N - 1);

const float PIXEL_SIZE = 1.0 / float(N);
const float HALF_PIXEL_SIZE = PIXEL_SIZE / 2.0;

attribute vec2 a_vertex;

uniform sampler2D u_normalHeightTexture;
uniform vec3 u_light;
uniform mat4 u_matrix;

varying vec4 v_color;

void main() {
    vec2 coordinates = HALF_PIXEL_SIZE + a_vertex * PIXEL_SIZE;

    vec4 normalHeight = texture2D(u_normalHeightTexture, coordinates);

    vec3 normal = normalHeight.xyz;
    float height = normalHeight.w;

    vec4 position = vec4(-1.0 + a_vertex.x * STEP, height, -1.0 + a_vertex.y * STEP, 1.0);

    float lighting = max(-dot(normal, u_light), 0.0);

    v_color = vec4(pow(lighting, 2.0) * vec3(0.0, 0.8, 1.0), 0.4);

    gl_Position = u_matrix * position;
}