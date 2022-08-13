precision highp float;

const int N = _N_;

const float STEP = 2.0 / float(N - 1);

const int W = _W_;

const int WAVE_STATE_ACTIVE = 2;

const float PI = 3.141592653589793;

struct Wave {
    int state;
    vec2 center;
    float amplitude;
    float speed;
    float length;
    float size;
    float travel;
};

uniform float u_height;
uniform Wave u_waves[W];

void main() {
    vec2 vertex = gl_FragCoord.xy - 0.5;

    vec2 position = -1.0 + vertex * STEP;

    float height = u_height;

    vec2 gradient = vec2(0.0);

    for (int i = 0; i < W; i++) {
        Wave wave = u_waves[i];

        if (wave.state == WAVE_STATE_ACTIVE) {
            float distance = distance(position, wave.center);
            vec2 distanceGradient = (position - wave.center) / distance;

            float c = 4.0 * 4.0 / wave.length;

            float a1 = wave.travel - distance;
            float a2 = wave.travel - distance - wave.size * wave.length;

            float packet;
            vec2 packetGradient;

            if (a1 < -wave.length || a2 > wave.length) {
                packet = 0.0;
                packetGradient = vec2(0.0);
            }
            else {
                float e1 = 1.0 + exp(-c * a1);
                float e2 = 1.0 + exp(c * a2);

                packet = 1.0 / (e1 * e2);
                packetGradient = c * distanceGradient * (e1 - e2) / (e1 * e1 * e2 * e2);
            }

            float phase = 2.0 * PI * (wave.travel - distance) / wave.length;

            float surface = wave.amplitude * sin(phase);
            vec2 surfaceGradient = wave.amplitude * cos(phase) * 2.0 * PI * (-distanceGradient) / wave.length;

            height += packet * surface;
            gradient += packetGradient * surface + packet * surfaceGradient;
        }
    }

    vec3 normal = normalize(vec3(-gradient.x, 1.0, -gradient.y));

    gl_FragColor = vec4(normal, height);
}
