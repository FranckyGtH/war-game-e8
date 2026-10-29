---
name: "maquette-rendu-iso-ete"
title: "Maquette de principe — Rendu isométrique des terrains (été)"
type: "react"
---

import React, { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// ---- Palette d'été : hauteur dérivée du terrain, décor par famille ----
const R = 1; // rayon des hexagones (pointy-top)

const TERRAINS_ete = {
  plaine: { h: 0.30, top: "#9fbd66", side: "#7d9950", decor: null },
  steppe: { h: 0.30, top: "#c7bd6e", side: "#a39a55", decor: null },
  savane: { h: 0.30, top: "#c9b45c", side: "#a3914a", decor: "buisson" },
  toundra: { h: 0.30, top: "#a7b795", side: "#84936f", decor: null },
  desert: { h: 0.32, top: "#e6d293", side: "#c2ae6f", decor: "dune" },
  marais: { h: 0.24, top: "#7f9d6e", side: "#647d51", decor: "eauPlane" },
  foretClair: { h: 0.34, top: "#7ba55d", side: "#5f8446", decor: "arbresClairsemes" },
  foretMoyenne: { h: 0.36, top: "#5c8f4a", side: "#477038", decor: "arbresMoyens" },
  foretEpaisse: { h: 0.38, top: "#3f7438", side: "#2f5a29", decor: "arbresDenses" },
  colline: { h: 0.75, top: "#a8b06a", side: "#838a4e", decor: "colline" },
  montagneux: { h: 1.10, top: "#9b9083", side: "#7a7166", decor: null },
  montagne: { h: 1.70, top: "#8f8478", side: "#6e655b", decor: "sommets" },
  hauteMontagne: { h: 2.40, top: "#a49a8e", side: "#80766b", decor: "neige" },
  tresHauteMontagne: { h: 3.10, top: "#b0a89d", side: "#8a8074", decor: "neige" },
  glacier: { h: 1.10, top: "#d3eaf2", side: "#a9c8d6", decor: "glace" },
  volcan: { h: 2.00, top: "#5a4640", side: "#41332e", decor: "cratere" },
  merCotiere: { h: 0.08, top: "#57a1c9", side: "#3f7fa3", decor: null, eau: true },
  merProfonde: { h: 0.02, top: "#2f6f9e", side: "#245579", decor: null, eau: true },
};

// Carte de démonstration : une île avec chaîne montagneuse, forêts, désert et mer
const COLS = 11;
const ROWS = 8;
const demoMap = (c, r) => {
  // masse centrale : chaîne de montagnes à l'ouest, plaines à l'est
  const d = Math.hypot(c - 5, (r - 3.5) * 1.1);
  if (d > 4.6) return "merProfonde";
  if (d > 4.0) return "merCotiere";
  if (c <= 2 && r >= 2 && r <= 5) {
    if (c === 2 && r >= 3 && r <= 4) return "tresHauteMontagne";
    if (r === 2 || r === 5) return "hauteMontagne";
    return "montagne";
  }
  if (c === 3 && r >= 3 && r <= 4) return "montagneux";
  if (c === 3 && (r === 2 || r === 5)) return "colline";
  if (c >= 8 && r >= 5) return "desert";
  if (c >= 7 && r <= 2) return "foretEpaisse";
  if (c === 6 && r <= 3) return "foretMoyenne";
  if (c === 5 && r <= 1) return "foretClair";
  if (r === 7 && c >= 5 && c <= 7) return "marais";
  if (c === 1 && (r === 1 || r === 6)) return "colline";
  if (c === 9 && r === 1) return "savane";
  if (c === 10 && r === 3) return "steppe";
  if (c === 4 && r === 7) return "toundra";
  return "plaine";
};

const hexPos = (c, r) => ({
  x: Math.sqrt(3) * R * (c + 0.5 * (r % 2)),
  z: 1.5 * R * r,
});

function HexTile({ c, r, t, def }) {
  const { x, z } = hexPos(c, r);
  const h = def.h;
  return (
    <group position={[x, 0, z]}>
      {/* socle hexagonal : la hauteur dérive du terrain */}
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[R, R, h, 6, 1]} />
        <meshStandardMaterial color={def.top} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* parois latérales assombries pour le relief */}
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[R * 0.999, R * 0.999, h, 6, 1, true]} />
        <meshStandardMaterial color={def.side} roughness={0.9} />
      </mesh>
      <Decor t={t} def={def} h={h} />
    </group>
  );
}

function Decor({ t, def, h }) {
  const rand = (i) => ((Math.sin(i * 127.1 + t.length * 311.7) * 43758.5453) % 1 + 1) % 1;
  switch (def.decor) {
    case "arbresClairsemes":
    case "arbresMoyens":
    case "arbresDenses": {
      const n = def.decor === "arbresClairsemes" ? 3 : def.decor === "arbresMoyens" ? 5 : 8;
      const green = def.decor === "arbresDenses" ? "#2c6329" : "#3f8438";
      return (
        <group>
          {Array.from({ length: n }, (_, i) => {
            const a = rand(i) * Math.PI * 2;
            const d = 0.15 + rand(i + 50) * 0.6;
            return (
              <group key={i} position={[Math.cos(a) * d, h, Math.sin(a) * d]}>
                <mesh position={[0, 0.14, 0]} castShadow>
                  <cylinderGeometry args={[0.04, 0.05, 0.28, 5]} />
                  <meshStandardMaterial color="#6b4a2e" roughness={1} />
                </mesh>
                <mesh position={[0, 0.42, 0]} castShadow>
                  <coneGeometry args={[0.16, 0.38, 7]} />
                  <meshStandardMaterial color={green} roughness={0.9} />
                </mesh>
              </group>
            );
          })}
        </group>
      );
    }
    case "colline":
    case "sommets":
      return (
        <group>
          <mesh position={[0, h + 0.18, 0]} rotation={[rand(1), rand(2), 0]} castShadow>
            <dodecahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color={def.decor === "colline" ? "#93906b" : "#7c7267"} roughness={0.95} />
          </mesh>
        </group>
      );
    case "neige":
      return (
        <group>
          <mesh position={[0, h + 0.26, 0]} castShadow>
            <coneGeometry args={[0.38, 0.62, 6]} />
            <meshStandardMaterial color="#8f877c" roughness={0.95} />
          </mesh>
          <mesh position={[0, h + 0.62, 0]}>
            <coneGeometry args={[0.17, 0.26, 6]} />
            <meshStandardMaterial color="#f5f9fc" roughness={0.6} />
          </mesh>
        </group>
      );
    case "cratere":
      return (
        <group>
          <mesh position={[0, h + 0.3, 0]} castShadow>
            <coneGeometry args={[0.42, 0.72, 6]} />
            <meshStandardMaterial color="#4c3b34" roughness={1} />
          </mesh>
          <mesh position={[0, h + 0.67, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.05, 6]} />
            <meshStandardMaterial color="#d1502a" emissive="#c03418" emissiveIntensity={0.7} roughness={0.7} />
          </mesh>
        </group>
      );
    case "glace":
      return (
        <mesh position={[0, h + 0.1, 0]} rotation={[0.2, 0.5, 0.1]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#e8f6fb" roughness={0.25} />
        </mesh>
      );
    case "buisson":
      return (
        <mesh position={[0.2, h + 0.08, -0.15]} castShadow>
          <dodecahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#8a9646" roughness={1} />
        </mesh>
      );
    case "dune":
      return (
        <mesh position={[0, h + 0.06, 0]} rotation={[0, 0.3, 0]}>
          <sphereGeometry args={[0.35, 12, 8, 0, Math.PI * 2, 0, Math.PI / 5]} />
          <meshStandardMaterial color="#efdc9d" roughness={1} />
        </mesh>
      );
    case "eauPlane":
      return (
        <mesh position={[0, h + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[R * 0.75, 6]} />
          <meshStandardMaterial color="#4b7f9c" transparent opacity={0.8} roughness={0.2} />
        </mesh>
      );
    default:
      return null;
  }
}

function GridLine({ c, r, h, opacity }) {
  const { x, z } = hexPos(c, r);
  const pts = [];
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 180) * (60 * k + 30);
    pts.push([x + Math.cos(a) * R, h + 0.02, z + Math.sin(a) * R]);
  }
  pts.push(pts[0]);
  return (
    <lineSegments position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(pts.flatMap((p) => p)), 3]}
        />
      </bufferGeometry>
          <lineBasicMaterial color="#2b2417" transparent opacity={opacity ?? 0.45} />
    </lineSegments>
  );
}

export default function App() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [gridOpacity, setGridOpacity] = React.useState(0.45);
  const tiles = useMemo(() => {
    const list = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const t = demoMap(c, r);
        list.push({ c, r, t, def: TERRAINS_ete[t] });
      }
    return list;
  }, []);

  return (
    <div className="flex h-screen flex-col bg-stone-900 text-stone-100">
      <header className="flex items-center justify-between border-b border-stone-700 px-4 py-2">
        <div>
          <h1 className="text-base font-semibold">Maquette de principe — Rendu isométrique, terrains d'été</h1>
          <p className="text-xs text-stone-400">Hauteur dérivée du terrain · grille de régions visible · moteur Three.js</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
            Grille des régions
          </label>
          {showGrid && (
            <label className="flex items-center gap-2 text-xs text-stone-300">
              Contraste
              <input type="range" min={0.1} max={1} step={0.05} value={gridOpacity}
                onChange={(e) => setGridOpacity(Number(e.target.value))} className="w-24" />
            </label>
          )}
        </div>
      </header>
      <main className="relative flex-1">
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-stone-800/70 px-3 py-1 text-xs text-stone-300">
          Rotation : glisser avec la souris · Zoom : molette · Pivoter : clic droit
        </div>
        <Canvas shadows camera={{ position: [9, 11, 12], fov: 42 }} dpr={[1, 2]}>
          <color attach="background" args={["#1c2733"]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 14, 6]} intensity={1.5} castShadow
            shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <group>
            {tiles.map(({ c, r, t, def }) => (
              <group key={`${c},${r}`}>
                <HexTile c={c} r={r} t={t} def={def} />
                {showGrid && <GridLine c={c} r={r} h={def.h} opacity={gridOpacity} />}
              </group>
            ))}
          </group>
          <OrbitControls target={[Math.sqrt(3) * 5, 0.8, 5]} maxPolarAngle={Math.PI / 2.15} />
        </Canvas>
      </main>
      <footer className="border-t border-stone-700 px-4 py-1.5 text-xs text-stone-400">
        Maquette de style : la même source de données alimente le rendu symbolique à plat (prototypage/édition) et ce rendu final.
        Palette d'été : plaines et prairies tendres, forêts par densité, gradient montagneux, eaux en profondeur. Saisons à venir : automne, hiver, printemps.
      </footer>
    </div>
  );
}
