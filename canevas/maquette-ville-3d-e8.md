---
name: "maquette-ville-3d-e8"
title: "Maquette de principe — Ville de 4 quartiers (été)"
type: "react"
---

import React, { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// ---- Géométrie : hexagones pointy-top, odd-r (identique à l'éditeur) ----
const R = 1; // rayon (circonrayon)
const APO = (R * Math.sqrt(3)) / 2; // apothème (distance centre-arête)

const center = (c, r) => ({
  x: R * Math.sqrt(3) * (c + 0.5 * (r % 2)) + R * Math.sqrt(3) / 2,
  z: R * 1.5 * r + R,
});

const SIDES = [["E", 0], ["SE", 60], ["SO", 120], ["O", 180], ["NO", 240], ["NE", 300]];
const VERTS = [-90, -30, 30, 90, 150, 210];
const sideAngle = (s) => (SIDES.find(([nm]) => nm === s) || [null, 0])[1];

// ---- Palette d'été ----
const PAL = {
  plaine: { h: 0.30, top: "#9fbd66", side: "#7d9950" },
  colline: { h: 0.75, top: "#a8b06a", side: "#838a4e" },
  villeSol: { h: 0.34, top: "#8f8778", side: "#6e675c" },
  rue: "#a89468",
  mur: "#9a9184",
  toitMaison: "#a4553f",
  murMaison: "#d8cbb2",
  templeMur: "#e8e2cf",
  templeToit: "#4a6b8a",
  donjonMur: "#8d8678",
  donjonToit: "#5a4a6e",
  arbre: "#3f7438",
};

// ---- Carte de démonstration : un bourg sur une plaine vallonnée ----
const COLS = 8;
const ROWS = 5;

// Emprise de la ville : losange de 4 régions (niveau 7-9)
// graine (3,2), voisins E (4,2) et NE (3,1), quatrième région (4,1)
const VILLE = {
  hexes: [[3, 2], [4, 2], [3, 1], [4, 1]],
  // Rue principale : d'ouest en est par les deux régions du sud
  // => entrées sur le côté O de (3,2) et le côté E de (4,2)
  entrees: [
    { c: 3, r: 2, cote: "O", nom: "Porte de l'Ouest" },
    { c: 4, r: 2, cote: "E", nom: "Porte de l'Est" },
  ],
  // Côtés fortifiés : tous les côtés périphériques sauf les deux entrées
  remparts: [
    [3, 2, "SO"], [3, 2, "SE"], [3, 2, "NO"],
    [4, 2, "SE"], [4, 2, "SO"],
    [3, 1, "NO"], [3, 1, "O"], [3, 1, "NE"],
    [4, 1, "E"], [4, 1, "NE"], [4, 1, "NO"],
  ],
};

const terrain = (c, r) => {
  if (r === 0) return "colline";
  if (c === 0 && r === 4) return "colline";
  if (c === 7 && r === 0) return "colline";
  return "plaine";
};

const isVille = (c, r) => VILLE.hexes.some(([a, b]) => a === c && b === r);

// ---- Constructions schématiques par quartier (grille fine implicite) ----
// Coordonnées locales dans la région : { x, z, type, s (échelle) }
const QUARTIERS = {
  "3,2": [
    { x: -0.28, z: 0.32, type: "maison" }, { x: -0.30, z: -0.14, type: "maison" },
    { x: -0.24, z: -0.44, type: "maison" }, { x: 0.24, z: 0.34, type: "marche" },
    { x: 0.05, z: -0.40, type: "maison" },
  ],
  "4,2": [
    { x: -0.05, z: 0.34, type: "marche" },
    { x: 0.30, z: 0.05, type: "maison" }, { x: 0.32, z: -0.35, type: "maison" },
    { x: -0.30, z: -0.38, type: "atelier" }, { x: -0.26, z: 0.05, type: "maison" },
  ],
  "3,1": [
    { x: -0.10, z: -0.05, type: "temple" },
    { x: -0.42, z: 0.38, type: "maison" }, { x: 0.34, z: 0.36, type: "maison" },
    { x: -0.44, z: -0.36, type: "maison" },
  ],
  "4,1": [
    { x: 0.10, z: -0.08, type: "donjon" },
    { x: -0.40, z: 0.32, type: "caserne" }, { x: -0.38, z: -0.38, type: "maison" },
    { x: 0.40, z: 0.34, type: "maison" },
  ],
};

// ---- Composants de construction (schématiques) ----
function Maison({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={p.s || 0.55}>
      <mesh position={[0, 0.07, 0]} castShadow>
        <boxGeometry args={[0.24, 0.14, 0.3]} />
        <meshStandardMaterial color={PAL.murMaison} />
      </mesh>
      <mesh position={[0, 0.185, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.20, 0.1, 4]} />
        <meshStandardMaterial color={PAL.toitMaison} />
      </mesh>
    </group>
  );
}

function Temple({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={0.85}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.34, 0.24, 0.44]} />
        <meshStandardMaterial color={PAL.templeMur} />
      </mesh>
      <mesh position={[0, 0.30, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.28, 0.16, 4]} />
        <meshStandardMaterial color={PAL.templeToit} />
      </mesh>
    </group>
  );
}

function Donjon({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={0.9}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.20, 0.6, 8]} />
        <meshStandardMaterial color={PAL.donjonMur} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <coneGeometry args={[0.22, 0.2, 8]} />
        <meshStandardMaterial color={PAL.donjonToit} />
      </mesh>
    </group>
  );
}

function Caserne({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={0.7}>
      <mesh position={[0, 0.09, 0]} castShadow>
        <boxGeometry args={[0.4, 0.18, 0.26]} />
        <meshStandardMaterial color={PAL.donjonMur} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.42, 0.07, 0.28]} />
        <meshStandardMaterial color={PAL.murMaison} />
      </mesh>
    </group>
  );
}

function Atelier({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={0.6}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[0.3, 0.16, 0.24]} />
        <meshStandardMaterial color={PAL.murMaison} />
      </mesh>
      <mesh position={[0, 0.19, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.32, 0.06, 0.26]} />
        <meshStandardMaterial color={PAL.toitMaison} />
      </mesh>
      <mesh position={[0.18, 0.28, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
        <meshStandardMaterial color="#777" />
      </mesh>
    </group>
  );
}

function Marche({ p }) {
  return (
    <group position={[p.x, 0, p.z]} scale={0.8}>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.44, 0.02, 0.34]} />
        <meshStandardMaterial color="#c9b581" />
      </mesh>
      {[-0.14, 0.0, 0.14].map((x, i) => (
        <group key={i} position={[x, 0, i % 2 === 0 ? -0.08 : 0.08]}>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.09, 0.09, 0.09]} />
            <meshStandardMaterial color="#b5503a" />
          </mesh>
          <mesh position={[0, 0.13, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.16, 0.02, 0.14]} />
            <meshStandardMaterial color="#e8dfc8" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const BATIS = { maison: Maison, temple: Temple, donjon: Donjon, caserne: Caserne, atelier: Atelier, marche: Marche };

function Tour({ pos }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.32, 8]} />
        <meshStandardMaterial color={PAL.mur} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <coneGeometry args={[0.13, 0.12, 8]} />
        <meshStandardMaterial color={PAL.donjonToit} />
      </mesh>
    </group>
  );
}

export default function App() {
  const [showRemparts, setShowRemparts] = useState(true);
  const [showGrille, setShowGrille] = useState(true);
  const [showEntrees, setShowEntrees] = useState(true);

  const socles = useMemo(() => {
    const out = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        out.push({ c, r, ...center(c, r), ville: isVille(c, r), t: terrain(c, r) });
    return out;
  }, []);

  // Segments de rempart : un par côté fortifié ; axe long aligné sur l'arête
  const murs = useMemo(() => VILLE.remparts.map(([c, r, s]) => {
    const a = (sideAngle(s) * Math.PI) / 180;
    const ctr = center(c, r);
    return {
      key: `${c},${r},${s}`,
      pos: [ctr.x + APO * Math.cos(a), PAL.villeSol.h / 2 + 0.14, ctr.z + APO * Math.sin(a)],
      rot: -(Math.PI / 2 + a),
    };
  }), []);

  // Tours de périmètre : sommets des régions de la ville non partagés par deux régions de l'emprise
  const tours = useMemo(() => {
    const count = new Map();
    for (const [c, r] of VILLE.hexes)
      for (const v of VERTS) {
        const a = (v * Math.PI) / 180;
        const ctr = center(c, r);
        const px = ctr.x + R * Math.cos(a), pz = ctr.z + R * Math.sin(a);
        const k = `${px.toFixed(2)}_${pz.toFixed(2)}`;
        count.set(k, (count.get(k) || 0) + 1);
      }
    return [...count.entries()]
      .filter(([, n]) => n === 1)
      .map(([k]) => {
        const [px, pz] = k.split("_").map(Number);
        return { key: k, pos: [px, PAL.villeSol.h / 2, pz] };
      });
  }, []);

  // Rue principale : bande d'ouest en est par les régions sud
  const rue = useMemo(() => {
    const a = center(3, 2), b = center(4, 2);
    const x0 = a.x - APO, x1 = b.x + APO;
    const len = x1 - x0;
    return { pos: [(x0 + x1) / 2, PAL.villeSol.h + 0.008, a.z], len };
  }, []);

  // Portes : deux tours d'angle + linteau, sur chaque côté d'entrée (axe long aligné sur l'arête)
  const portes = useMemo(() => VILLE.entrees.map((e) => {
    const a = (sideAngle(e.cote) * Math.PI) / 180;
    const ctr = center(e.c, e.r);
    return {
      key: e.nom,
      nom: e.nom,
      pos: [ctr.x + APO * Math.cos(a), PAL.villeSol.h / 2, ctr.z + APO * Math.sin(a)],
      rot: -(Math.PI / 2 + a),
    };
  }), []);

  return (
    <div className="flex h-screen flex-col bg-stone-100 text-stone-900">
      <header className="border-b border-stone-300 bg-stone-800 px-4 py-3 text-white">
        <h1 className="text-lg font-semibold">Maquette de principe — Ville de 4 quartiers, rendu été</h1>
        <p className="text-xs text-stone-300">
          Chantier Villes, incrément V1 : quatre quartiers (losange de régions), constructions schématiques sur grille fine,
          rue principale à deux entrées, remparts côté par côté. OrbitControls : rotation, zoom.
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 shrink-0 space-y-3 border-r border-stone-300 bg-stone-50 p-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Affichage</p>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showRemparts} onChange={(e) => setShowRemparts(e.target.checked)} />
            Remparts et tours
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showEntrees} onChange={(e) => setShowEntrees(e.target.checked)} />
            Portes (entrées)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showGrille} onChange={(e) => setShowGrille(e.target.checked)} />
            Grille fine des quartiers
          </label>

          <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-stone-500">Quartiers</p>
          <ul className="space-y-1 text-xs text-stone-700">
            <li><b>Ouest</b> (3,2) : maisons et marché.</li>
            <li><b>Est</b> (4,2) : marché, atelier, maisons.</li>
            <li><b>Nord-ouest</b> (3,1) : temple et maisons.</li>
            <li><b>Nord-est</b> (4,1) : donjon, caserne, maisons.</li>
          </ul>

          <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-stone-500">Principes illustrés</p>
          <ul className="list-disc space-y-1 pl-4 text-xs text-stone-600">
            <li>Un quartier par région de l'emprise ; sol dérivé du terrain.</li>
            <li>La rue principale traverse deux côtés : ce sont les seules entrées.</li>
            <li>Côtés fortifiés : mur simple avec tours aux sommets du périmètre.</li>
            <li>La grille fine (7 divisions) précise les cellules constructibles.</li>
          </ul>
        </aside>

        <main className="relative flex-1">
          <Canvas shadows camera={{ position: [8, 7, 8], fov: 45 }} className="absolute inset-0">
            <color attach="background" args={["#cfe4f0"]} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 4]} intensity={1.1} castShadow
              shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

            {/* Socles du terrain ; les régions de la ville reçoivent un sol urbain */}
            {socles.map(({ c, r, x, z, ville, t }) => {
              const p = ville ? PAL.villeSol : PAL[t];
              return (
                <mesh key={`${c},${r}`} position={[x, p.h / 2, z]} receiveShadow castShadow>
                  <cylinderGeometry args={[R, R, p.h, 6]} />
                  <meshStandardMaterial color={p.top} />
                </mesh>
              );
            })}

            {/* Grille fine de chaque quartier */}
            {showGrille && VILLE.hexes.map(([c, r]) => {
              const ctr = center(c, r);
              return (
                <gridHelper key={`g${c},${r}`} args={[1.42, 7, "#ffffff", "#ffffff"]}
                  position={[ctr.x, PAL.villeSol.h + 0.004, ctr.z]}
                  material-opacity={0.35} material-transparent />
              );
            })}

            {/* Rue principale */}
            <mesh position={rue.pos} receiveShadow>
              <boxGeometry args={[rue.len, 0.016, 0.17]} />
              <meshStandardMaterial color={PAL.rue} />
            </mesh>

            {/* Constructions des quartiers */}
            {VILLE.hexes.map(([c, r]) => {
              const ctr = center(c, r);
              const batis = QUARTIERS[`${c},${r}`] || [];
              return (
                <group key={`q${c},${r}`} position={[ctr.x, PAL.villeSol.h, ctr.z]}>
                  {batis.map((b, i) => {
                    const Comp = BATIS[b.type];
                    return <Comp key={i} p={b} />;
                  })}
                </group>
              );
            })}

            {/* Remparts : un segment par côté fortifié */}
            {showRemparts && murs.map((m) => (
              <mesh key={m.key} position={m.pos} rotation={[0, m.rot, 0]} castShadow>
                <boxGeometry args={[R * 0.98, 0.28, 0.09]} />
                <meshStandardMaterial color={PAL.mur} />
              </mesh>
            ))}

            {/* Tours de périmètre */}
            {showRemparts && tours.map((t) => <Tour key={t.key} pos={t.pos} />)}

            {/* Portes : interrompent le rempart, matérialisent l'entrée */}
            {showEntrees && portes.map((p) => (
              <group key={p.key} position={[p.pos[0], p.pos[1], p.pos[2]]} rotation={[0, p.rot, 0]}>
                <mesh position={[-0.26, 0.12, 0]} castShadow>
                  <boxGeometry args={[0.1, 0.34, 0.12]} />
                  <meshStandardMaterial color={PAL.mur} />
                </mesh>
                <mesh position={[0.26, 0.12, 0]} castShadow>
                  <boxGeometry args={[0.1, 0.34, 0.12]} />
                  <meshStandardMaterial color={PAL.mur} />
                </mesh>
                <mesh position={[0, 0.32, 0]} castShadow>
                  <boxGeometry args={[0.62, 0.09, 0.12]} />
                  <meshStandardMaterial color={PAL.donjonMur} />
                </mesh>
                <mesh position={[0, 0.14, 0]}>
                  <boxGeometry args={[0.42, 0.2, 0.05]} />
                  <meshStandardMaterial color="#5a4632" />
                </mesh>
              </group>
            ))}

            <OrbitControls maxPolarAngle={Math.PI / 2.15} minDistance={4} maxDistance={26} />
          </Canvas>
        </main>
      </div>
    </div>
  );
}
