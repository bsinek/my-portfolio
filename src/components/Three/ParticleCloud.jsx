import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vPos;

  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 3.0;
  }
`;

const fragmentShader = `
varying vec3 vPos;
uniform float uTime;
uniform float uRadius;
uniform float uFeather;

// hash + noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1,0));
  float c = hash(i + vec2(0,1));
  float d = hash(i + vec2(1,1));

  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

void main() {
  // round particles
  vec2 c = gl_PointCoord - vec2(0.5);
  if (length(c) > 0.5) discard;

  vec2 p = vPos.xy;

  // -----------------------------
  // RADIAL FEATHER
  // -----------------------------
  float dist = length(p);
  float edge = 1.0 - smoothstep(uRadius - uFeather, uRadius, dist);

  // -----------------------------
  // NORMALIZED COORDS (0..1 across disc)
  // -----------------------------
  vec2 pn = p / uRadius;

  // -----------------------------
  // ROTATE SPACE
  // -----------------------------
  float ang = uTime * 0.05;
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  vec2 pr = rot * pn;

  // -----------------------------
  // LARGE-SCALE RANDOM FIELD (ONLY 1–2 BLOBS)
  // -----------------------------
  float env = noise(pr * 1.2 + uTime * 0.03);

  // shape it so we get big smooth regions
  env = smoothstep(0.3, 0.7, env);

  // -----------------------------
  // RANDOMIZED WAVE FIELD (FEW BANDS)
  // -----------------------------
  float freq1 = mix(0.8, 1.8, env);   // only ~1–2 waves across disc
  float freq2 = mix(0.6, 1.4, env);

  float phase = noise(pr * 0.8 - uTime * 0.7) * 3.0;

// Dominant direction = X (long linear bands)
float w1 = sin(pr.x * 3.1415 * freq1 + phase - uTime * 0.8);

// Much weaker Y modulation (just to break perfection)
float w2 = sin(pr.y * 3.1415 * freq2 + phase - uTime * 0.6);

// Mostly linear bands
float wave = w1 + w2 * 0.15;

// Make bands thinner (sharper)
float base = clamp(0.82 + 0.25 * wave, 0.0, 1.0);

  // -----------------------------
  // ENVELOPE (SCALED TO DISC SIZE)
  // -----------------------------
  float envelope = mix(0.6, 1.0, env); // never kills everything

  // -----------------------------
  // FINAL LIGHT
  // -----------------------------
  float brightness = pow(base, 1.4) * envelope;

  brightness = max(brightness, 0.25); // never black

  float lit = brightness * edge;

  vec3 baseColor = vec3(0.3, 0.3, 0.3);
  vec3 color = baseColor * lit;

  gl_FragColor = vec4(color, lit);
}
`;

function ParticleDisc() {
  const matRef = useRef();
  const count = 100000;

  // 🎛 MAIN CONTROLS
  const radius = 6;   // disc size
  const feather = 0.8;  // edge softness

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(Math.random()) * radius;
      const a = Math.random() * Math.PI * 2.0;

      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      const z = 0;

      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    return arr;
  }, [radius]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points position={[3, -1, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uRadius: { value: radius },
          uFeather: { value: feather },
        }}
      />
    </points>
  );
}

export const ParticleCloud = () => {
  return (
    <div className="h-full w-full p-32">
      <Canvas className="border border-light-grey">
        <ParticleDisc />
      </Canvas>
    </div>
  );
};
