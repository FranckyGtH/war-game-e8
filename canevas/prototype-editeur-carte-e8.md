---
name: "prototype-editeur-carte-e8"
title: "Prototype jetable — Éditeur de carte hexagonal (Édition 8)"
type: "react"
---

import React, { useMemo, useRef, useState } from "react";

// ---- Constantes du monde ----
const COLS = 14;
const ROWS = 9;
const R = 30; // rayon des hexagones (pointy-top, odd-r)

const TERRAINS = {
  plaine: { label: "Plaine", fill: "#d9c98e", stroke: "#6b5a3a" },
  colline: { label: "Colline", fill: "#c4a96a", stroke: "#6b5a3a" },
  montagne: { label: "Montagne", fill: "#9c8f80", stroke: "#4a4038" },
  foret: { label: "Forêt", fill: "#6f9a5e", stroke: "#2f4a26" },
  mer: { label: "Mer", fill: "#8db6d6", stroke: "#2a5a80" },
  marais: { label: "Marais", fill: "#8ba98a", stroke: "#3a5a3a" },
  desert: { label: "Désert", fill: "#e2cf9a", stroke: "#8a7440" },
};

const LIEUX = {
  chateau: { label: "Château", sym: "C", color: "#303a7a" },
  tour: { label: "Tour", sym: "T", color: "#303a7a" },
  ruine: { label: "Ruine", sym: "R", color: "#555555" },
  mine: { label: "Mine (entrée)", sym: "M", color: "#5a3a1a" },
  sanctuaire: { label: "Sanctuaire", sym: "S", color: "#7a5a9a" },
  depotrelais: { label: "Dépôt relais (niveau 2)", sym: "Dr", color: "#2a6a3a", needsRoad: true },
  depotrelaisentrepot: { label: "Dépôt relais entrepôt (niveau 2)", sym: "De", color: "#1a5a2a", needsRoad: true },
};

// Villes multi-régions : niveau 0 à 12, emprise symétrique centrée
const VILLES = [
  { niveau: 0, nom: "Relais", n: 1 },
  { niveau: 1, nom: "Hameau", n: 1 },
  { niveau: 2, nom: "Bourg", n: 1 },
  { niveau: 3, nom: "Bourgade", n: 3 },
  { niveau: 4, nom: "Petit Village", n: 3 },
  { niveau: 5, nom: "Village", n: 3 },
  { niveau: 6, nom: "Village Fortifié", n: 3 },
  { niveau: 7, nom: "Ville", n: 4 },
  { niveau: 8, nom: "Cité", n: 4 },
  { niveau: 9, nom: "Cité de Province", n: 4 },
  { niveau: 10, nom: "Cité de Royaume", n: 7 },
  { niveau: 11, nom: "Megapole", n: 7 },
  { niveau: 12, nom: "Megapole Impériale", n: 7 },
];

const PAIRES_DIR = [["E", "NE"], ["NE", "NO"], ["NO", "O"], ["O", "SO"], ["SO", "SE"], ["SE", "E"]];

const LINEAIRES = {
  riviere: { label: "Rivière", color: "#2a6fb0", width: 4 },
  fleuve: { label: "Fleuve", color: "#1a4f90", width: 6 },
  route: { label: "Route", color: "#8a5a2a", width: 4, dash: "8 5" },
  chemin: { label: "Chemin", color: "#a07a4a", width: 3, dash: "4 4" },
  canal: { label: "Canal", color: "#3a8aa0", width: 3 },
};

const PROV_COLORS = ["#c98181", "#81a5c9", "#a5c981", "#c9b581", "#b581c9", "#81c9c0"];

const key = (c, r) => `${c},${r}`;

// Géométrie : hexagones pointy-top, odd-r (rangées impaires décalées)
const center = (c, r) => ({
  x: R * Math.sqrt(3) * (c + 0.5 * (r % 2)) + R * Math.sqrt(3) / 2,
  y: R * 1.5 * r + R,
});

const corners = (cx, cy) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });

const neighbors = (c, r) => {
  const even = [
    [1, 0], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1],
  ];
  const odd = [
    [1, 0], [1, -1], [0, -1], [-1, 0], [0, 1], [1, 1],
  ];
  return (r % 2 === 0 ? even : odd)
    .map(([dc, dr]) => [c + dc, r + dr])
    .filter(([nc, nr]) => nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS);
};

// ---- Géométrie des nœuds : centres, milieux d'arête (côtés partagés), sommets ----
// Convention d'angles dans le repère SVG (y vers le bas) : E 0°, SE 60°, SO 120°, O 180°, NO 240°, NE 300°
const SIDES = [["E", 0], ["SE", 60], ["SO", 120], ["O", 180], ["NO", 240], ["NE", 300]];
const APO = (R * Math.sqrt(3)) / 2;
const sideAngle = (s) => (SIDES.find(([nm]) => nm === s) || [null, 0])[1];

const neighborOf = (c, r, s) => {
  const even = { E: [1, 0], NE: [0, -1], NO: [-1, -1], O: [-1, 0], SO: [-1, 1], SE: [0, 1] };
  const odd = { E: [1, 0], NE: [1, -1], NO: [0, -1], O: [-1, 0], SO: [0, 1], SE: [1, 1] };
  const [dc, dr] = (r % 2 === 0 ? even : odd)[s];
  const nc = c + dc, nr = r + dr;
  return nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS ? [nc, nr] : null;
};

const edgeMidNode = (c, r, s) => {
  const a = (sideAngle(s) * Math.PI) / 180;
  const ctr = center(c, r);
  return { x: ctr.x + APO * Math.cos(a), y: ctr.y + APO * Math.sin(a) };
};

const vertexNode = (c, r, deg) => {
  const a = (deg * Math.PI) / 180;
  const ctr = center(c, r);
  return { x: ctr.x + R * Math.cos(a), y: ctr.y + R * Math.sin(a) };
};

const posKey = (p) => `${Math.round(p.x * 10)}_${Math.round(p.y * 10)}`;

// Intersection de deux segments, si elle existe
const segIntersect = (p1, p2, p3, p4) => {
  const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
  const d2x = p4.x - p3.x, d2y = p4.y - p3.y;
  const denom = d1x * d2y - d1y * d2x;
  if (Math.abs(denom) < 1e-9) return null;
  const t = ((p3.x - p1.x) * d2y - (p3.y - p1.y) * d2x) / denom;
  const u = ((p3.x - p1.x) * d1y - (p3.y - p1.y) * d1x) / denom;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: p1.x + t * d1x, y: p1.y + t * d1y };
};

export default function App() {
  const [tool, setTool] = useState("terrain"); // terrain | lieu | lineaire | province | effacer
  const [terrainSel, setTerrainSel] = useState("plaine");
  const [lieuSel, setLieuSel] = useState("ville:7");
  const [villes, setVilles] = useState([]); // {id, nom, niveau, hexes}
  const [villeNom, setVilleNom] = useState("");
  const [sousMarine, setSousMarine] = useState(false); // ville posée uniquement sur des régions de mer
  const [villePlace, setVillePlace] = useState(null); // pose manuelle en cours : {niveau, n, sousMarine, picked: [clés]}
  const [lineaireSel, setLineaireSel] = useState("riviere");
  const [trace, setTrace] = useState([]); // points du tracé en cours : centres, milieux d'arête, sommets
  const [traceDirect, setTraceDirect] = useState(true); // chemin automatique entre deux clics
  const [provinces, setProvinces] = useState([]); // {id, name, color, royaume}
  const [royaumes, setRoyaumes] = useState([]); // {id, name, color, empire}
  const [empires, setEmpires] = useState([]); // {id, name, color}
  const [provSel, setProvSel] = useState(null);
  const [hexes, setHexes] = useState(() => {
    const m = new Map();
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        // monde de départ : grandes masses, à repeindre par le MdM
        let t = "plaine";
        if (r <= 1) t = "foret";
        if (c >= 10) t = "montagne";
        if (r >= 6) t = "colline";
        if (r >= 7 && c >= 8) t = "marais";
        m.set(key(c, r), { c, r, terrain: t, lieux: [], province: null });
      }
    // une mer intérieure pour tester le contrôle "cours d'eau aboutit en mer/lac"
    for (let r = 3; r <= 4; r++)
      for (let c = 4; c <= 6; c++) m.get(key(c, r)).terrain = "mer";
    return m;
  });
  const [features, setFeatures] = useState([]); // {id, type, hexes: [keys]}
  const [selected, setSelected] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [notice, setNotice] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [crossings, setCrossings] = useState([]); // franchissements arbitrés {id, x, y, kind, at}
  const [pendingCrossings, setPendingCrossings] = useState([]); // croisements à arbitrer
  const [newProv, setNewProv] = useState("");
  const [newRoyaume, setNewRoyaume] = useState("");
  const [newEmpire, setNewEmpire] = useState("");
  const svgRef = useRef(null);

  const width = COLS * R * Math.sqrt(3) + R;
  const height = ROWS * R * 1.5 + R * 0.5 + R;

  // Position d'un emplacement de lieu : "C" = centre, sinon un des six côtés
  const SLOTS = ["C", "E", "NE", "NO", "O", "SO", "SE"];
  const slotAngle = (slot) => (({ E: 0, SE: 60, SO: 120, O: 180, NO: 240, NE: 300 })[slot] ?? 0);
  const slotPos = (h, slot) => {
    const ctr = center(h.c, h.r);
    if (slot === "C") return ctr;
    const a = (Math.PI / 180) * slotAngle(slot);
    return { x: ctr.x + Math.cos(a) * R * 0.62, y: ctr.y + Math.sin(a) * R * 0.62 };
  };

  const svgPoint = (e) => {
    const svg = svgRef.current;
    // Conversion via la matrice réelle du SVG (gère le centrage et la mise à l'échelle du contenu)
    if (svg && svg.createSVGPoint && svg.getScreenCTM) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      return { x: p.x, y: p.y };
    }
    const rect = svg.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (width / rect.width),
      y: (e.clientY - rect.top) * (height / rect.height),
    };
  };

  // Emplacement visé par le clic : près du centre = centre (villes), sinon le côté le plus proche
  const slotFromEvent = (h, e) => {
    const p = svgPoint(e);
    const ctr = center(h.c, h.r);
    const dx = p.x - ctr.x, dy = p.y - ctr.y;
    if (Math.hypot(dx, dy) < R * 0.45) return "C";
    const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
    const names = ["E", "SE", "SO", "O", "NO", "NE"];
    return names[Math.round(deg / 60) % 6];
  };
  const nearestSideFromEvent = (h, e) => {
    const p = svgPoint(e);
    const ctr = center(h.c, h.r);
    const deg = ((Math.atan2(p.y - ctr.y, p.x - ctr.x) * 180) / Math.PI + 360) % 360;
    const names = ["E", "SE", "SO", "O", "NO", "NE"];
    return names[Math.round(deg / 60) % 6];
  };

  const clearTrace = () => setTrace([]);

  const isWaterTool = () => ["riviere", "fleuve", "canal"].includes(lineaireSel);

  // Classification d'un point de la grille : centre (C), milieu d'arête (A) ou sommet (S) d'une région
  const classifyPoint = (p) => {
    let bc = 0, br = 0, bd = 1e9;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const ctr = center(c, r);
        const d = Math.hypot(p.x - ctr.x, p.y - ctr.y);
        if (d < bd) { bd = d; bc = c; br = r; }
      }
    const ctr = center(bc, br);
    if (Math.hypot(p.x - ctr.x, p.y - ctr.y) < 0.1 * R) return { t: "C", c: bc, r: br };
    for (const [s] of SIDES) {
      const M = edgeMidNode(bc, br, s);
      if (Math.hypot(p.x - M.x, p.y - M.y) < 0.1 * R) return { t: "A", c: bc, r: br, s };
    }
    for (let k = 0; k < 6; k++) {
      const a = -90 + 60 * k;
      const V = vertexNode(bc, br, a);
      if (Math.hypot(p.x - V.x, p.y - V.y) < 0.1 * R) return { t: "S", c: bc, r: br, a };
    }
    return null;
  };

  // Nœuds adjacents dans la géométrie : centre—arête, centre—sommet, arête—sommet, arête—centre voisin, sommet—arêtes, sommet—centres
  const nodeNeighbors = (p, forWater) => {
    const res = new Map();
    const add = (q) => res.set(posKey(q), q);
    const cls = classifyPoint(p);
    if (!cls) return [];
    if (cls.t === "C") {
      for (const [s] of SIDES) add(edgeMidNode(cls.c, cls.r, s));
      for (let k = 0; k < 6; k++) add(vertexNode(cls.c, cls.r, -90 + 60 * k));
    } else if (cls.t === "A") {
      add(center(cls.c, cls.r));
      const n = neighborOf(cls.c, cls.r, cls.s);
      if (n) add(center(n[0], n[1]));
      const ang = sideAngle(cls.s);
      add(vertexNode(cls.c, cls.r, ang - 30));
      add(vertexNode(cls.c, cls.r, ang + 30));
    } else {
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          const ctr = center(c, r);
          if (Math.abs(Math.hypot(p.x - ctr.x, p.y - ctr.y) - R) < 0.05 * R) add(ctr);
          for (const [s] of SIDES) {
            const M = edgeMidNode(c, r, s);
            if (Math.abs(Math.hypot(p.x - M.x, p.y - M.y) - R / 2) < 0.05 * R) add(M);
          }
        }
    }
    const out = [];
    for (const q of res.values()) {
      if (forWater) {
        const qc = classifyPoint(q);
        if (qc && qc.t === "C" && hexes.get(key(qc.c, qc.r))?.terrain === "mer") continue;
      }
      out.push(q);
    }
    return out;
  };

  // Plus court chemin dans le graphe des nœuds, pondéré par la longueur réelle des tronçons
  // (Dijkstra : le chemin le plus court au sens géométrique, non au sens du nombre de sauts)
  const nodePath = (from, to, forWater) => {
    const fromK = posKey(from), toK = posKey(to);
    if (fromK === toK) return [from];
    const dist = new Map([[fromK, 0]]);
    const prev = new Map();
    const nodeOf = new Map([[fromK, from]]);
    const visited = new Set();
    const frontier = [{ k: fromK, d: 0 }];
    while (frontier.length) {
      let bi = 0;
      for (let i = 1; i < frontier.length; i++) if (frontier[i].d < frontier[bi].d) bi = i;
      const cur = frontier.splice(bi, 1)[0];
      if (visited.has(cur.k)) continue;
      visited.add(cur.k);
      if (cur.k === toK) break;
      const curNode = nodeOf.get(cur.k);
      for (const nb of nodeNeighbors(curNode, forWater)) {
        const nk = posKey(nb);
        if (visited.has(nk)) continue;
        const w = Math.hypot(nb.x - curNode.x, nb.y - curNode.y);
        const nd = cur.d + w;
        if (nd < (dist.get(nk) ?? Infinity)) {
          dist.set(nk, nd);
          prev.set(nk, cur.k);
          nodeOf.set(nk, nb);
          frontier.push({ k: nk, d: nd });
        }
      }
    }
    if (!visited.has(toK)) return null;
    const path = [];
    let k = toK;
    while (k) {
      path.unshift(nodeOf.get(k));
      k = prev.get(k);
    }
    return path;
  };

  // Magnétisme : le clic cible le nœud le plus proche (centre, arête ou sommet) parmi la région visée et ses voisines
  const snapNode = (p) => {
    let bc = 0, br = 0, scanD = 1e9;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const ctr = center(c, r);
        const d = Math.hypot(p.x - ctr.x, p.y - ctr.y);
        if (d < scanD) { scanD = d; bc = c; br = r; }
      }
    let best = null, bd = Infinity;
    const isMerCenter = (c, r) => hexes.get(key(c, r))?.terrain === "mer";
    const pushCenter = (c, r) => {
      if (isWaterTool() && isMerCenter(c, r)) return;
      const q = center(c, r);
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < bd) { bd = d; best = q; }
    };
    const push = (q) => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < bd) { bd = d; best = q; }
    };
    pushCenter(bc, br);
    for (const [s] of SIDES) push(edgeMidNode(bc, br, s));
    for (let k = 0; k < 6; k++) push(vertexNode(bc, br, -90 + 60 * k));
    for (const [nc, nr] of neighbors(bc, br)) pushCenter(nc, nr);
    return best;
  };

  const addTraceNode = (node) => {
    if (traceDirect && trace.length > 0) {
      const from = trace[trace.length - 1];
      if (posKey(node) === posKey(from)) return;
      const path = nodePath(from, node, isWaterTool());
      if (!path) { setNotice("Aucun chemin trouvé dans la géométrie entre ces deux points."); return; }
      setTrace((prev) => [...prev, ...path.slice(1)]);
      return;
    }
    setTrace((prev) =>
      prev.length && posKey(prev[prev.length - 1]) === posKey(node) ? prev : [...prev, node]
    );
  };

  const finishTrace = () => {
    if (trace.length < 2) { clearTrace(); return; }
    // Contrôle 1 : continuité — chaque point doit être adjacent au précédent dans la géométrie
    for (let i = 1; i < trace.length; i++) {
      const ok = nodeNeighbors(trace[i - 1], false).some((nb) => posKey(nb) === posKey(trace[i]));
      if (!ok) {
        setNotice("Tracé non continu : chaque point doit être adjacent au précédent (centre, milieu d'arête ou sommet).");
        return;
      }
    }
    // Contrôle 2 : un cours d'eau aboutit en mer/marais ou rejoint un autre cours d'eau
    if (isWaterTool()) {
      const last = trace[trace.length - 1];
      const cls = classifyPoint(last);
      let bout = false;
      if (cls && cls.t === "C" && hexes.get(key(cls.c, cls.r))?.terrain === "marais") bout = true;
      if (cls && cls.t === "A") {
        const n = neighborOf(cls.c, cls.r, cls.s);
        if (hexes.get(key(cls.c, cls.r))?.terrain === "mer" || (n && hexes.get(key(n[0], n[1]))?.terrain === "mer")) bout = true;
      }
      if (cls && cls.t === "S") {
        for (const nb of nodeNeighbors(last, false)) {
          const q = classifyPoint(nb);
          if (q && q.t === "C" && hexes.get(key(q.c, q.r))?.terrain === "mer") { bout = true; break; }
        }
      }
      if (!bout) {
        for (const f of features) {
          if (!["riviere", "fleuve", "canal"].includes(f.type)) continue;
          if (f.nodes.some((n) => posKey(n) === posKey(last))) { bout = true; break; } // confluence
        }
      }
      if (!bout) {
        setNotice("Avertissement : ce cours d'eau ne se termine ni en mer, ni en marais, ni sur un autre cours d'eau. Enregistré comme source ou cours d'eau asséché — à confirmer par le MdM.");
      }
    }
    // Détection des franchissements : croisements entre le nouveau tracé et les éléments complémentaires
    const newId = `f${features.length + 1}`;
    const otherKinds = isWaterTool() ? ["route", "chemin"] : ["riviere", "fleuve", "canal"];
    const others = features.filter((f) => otherKinds.includes(f.type));
    const crossPts = [];
    const seenCross = new Set();
    const addCross = (p) => {
      const k = posKey(p);
      if (!seenCross.has(k)) { seenCross.add(k); crossPts.push({ x: p.x, y: p.y }); }
    };
    for (const f of others) {
      for (const n of trace) if (f.nodes.some((m) => posKey(m) === posKey(n))) addCross(n);
      for (let i = 1; i < trace.length; i++)
        for (let j = 1; j < f.nodes.length; j++) {
          const p = segIntersect(trace[i - 1], trace[i], f.nodes[j - 1], f.nodes[j]);
          if (p) addCross(p);
        }
    }
    setFeatures((prev) => [
      ...prev,
      { id: newId, type: lineaireSel, nodes: trace.map((n) => ({ x: n.x, y: n.y })) },
    ]);
    if (crossPts.length > 0) {
      setPendingCrossings((prev) => [
        ...prev,
        ...crossPts.map((p, i) => ({
          id: `c${crossings.length + prev.length + i + 1}`,
          x: p.x, y: p.y, at: newId,
        })),
      ]);
      setNotice("Franchissements à arbitrer : indiquez pour chaque croisement un pont, un gué, ou rien.");
    }
    clearTrace();
  };

  const chooseCrossing = (id, kind) => {
    const pc = pendingCrossings.find((c) => c.id === id);
    if (!pc) return;
    setCrossings((prev) => [...prev, { ...pc, kind }]);
    setPendingCrossings((prev) => prev.filter((c) => c.id !== id));
  };

  // ---- Villes multi-régions ----
  // Une région est disponible si elle existe et ne porte aucun lieu
  const hexFree = (c, r) => {
    const hh = hexes.get(key(c, r));
    return !!hh && hh.lieux.length === 0;
  };

  // Quota d'eau d'une ville terrestre : 1 région de mer pour 3 ou 4 hex, 3 pour 7 hex
  const maxEau = (n) => (n >= 7 ? 3 : n >= 3 ? 1 : 0);

  // Orientations possibles autour d'une graine, sous forme de listes de clés
  const orientations3 = (c, r) =>
    PAIRES_DIR.map(([s1, s2]) => [neighborOf(c, r, s1), neighborOf(c, r, s2)])
      .filter(([a, b]) => a && b)
      .map(([a, b]) => [key(c, r), key(a[0], a[1]), key(b[0], b[1])]);

  const orientations4 = (c, r) => {
    const res = [];
    const seedK = key(c, r);
    for (const [s1, s2] of PAIRES_DIR) {
      const a = neighborOf(c, r, s1);
      const b = neighborOf(c, r, s2);
      if (!a || !b) continue;
      const ka = key(a[0], a[1]);
      const kb = key(b[0], b[1]);
      const nbA = neighbors(a[0], a[1]).map(([x, y]) => key(x, y));
      const nbB = neighbors(b[0], b[1]).map(([x, y]) => key(x, y));
      const common = nbA.find((k) => k !== seedK && k !== ka && k !== kb && nbB.includes(k));
      if (common) res.push([seedK, ka, kb, common]);
    }
    return res;
  };

  const orientationsFor = (c, r, n) => (n === 3 ? orientations3(c, r) : n === 4 ? orientations4(c, r) : []);

  // Validité d'une orientation : régions libres, graine terrestre sauf sous-marine,
  // quota d'eau respecté (ville terrestre), toutes régions de mer (ville sous-marine)
  const orientOk = (keys, n, sousM) => {
    const seed = hexes.get(keys[0]);
    if (!seed || seed.lieux.length > 0) return false;
    if (sousM && seed.terrain !== "mer") return false;
    if (!sousM && seed.terrain === "mer") return false;
    let eau = 0;
    for (const k of keys) {
      const hh = hexes.get(k);
      if (!hh || hh.lieux.length > 0) return false;
      if (hh.terrain === "mer") eau++;
      else if (sousM) return false;
    }
    return sousM ? true : eau <= maxEau(n);
  };

  // Emprise automatique pour n = 1 et n = 7 (aucune orientation à choisir)
  const computeEmprise = (h, n, sousM) => {
    if (!hexFree(h.c, h.r)) return null;
    const seed = key(h.c, h.r);
    if (n === 1) return orientOk([seed], 1, sousM) ? [seed] : null;
    if (n === 7) {
      const res = [seed];
      for (const [s] of SIDES) {
        const v = neighborOf(h.c, h.r, s);
        if (!v) return null;
        res.push(key(v[0], v[1]));
      }
      return orientOk(res, 7, sousM) ? res : null;
    }
    return null;
  };

  // Poses manuelles (n = 3 ou 4) : orientations encore réalisables et régions candidates
  const placementInfo = () => {
    if (!villePlace) return { feas: [], cands: new Set() };
    const [sc, sr] = villePlace.picked[0].split(",").map(Number);
    const feas = orientationsFor(sc, sr, villePlace.n)
      .filter((o) => orientOk(o, villePlace.n, villePlace.sousMarine)
        && villePlace.picked.every((p) => o.includes(p)));
    const cands = new Set();
    for (const o of feas) for (const k of o) if (!villePlace.picked.includes(k)) cands.add(k);
    return { feas, cands };
  };

  const finalizeVille = (emprise, niveau, sousM, def) => {
    const id = `v${villes.length + 1}`;
    const nom = villeNom.trim() || `${def.nom} ${id}`;
    setVilles((prev) => [...prev, { id, nom, niveau, hexes: emprise, sousMarine: sousM }]);
    setHexes((prev) => {
      const m = new Map(prev);
      for (const k of emprise) {
        const hh = m.get(k);
        m.set(k, { ...hh, lieux: [...hh.lieux, { slot: "C", type: "ville", villeId: id, niveau }] });
      }
      return m;
    });
    setVillePlace(null);
    setVilleNom("");
  };

  // Une voie carrossable (route, chemin) traverse ou longe-t-elle la région ?
  const voieProche = (h) => {
    const c0 = center(h.c, h.r);
    for (const f of features) {
      if (f.type !== "route" && f.type !== "chemin") continue;
      for (let i = 1; i < f.nodes.length; i++) {
        const p1 = f.nodes[i - 1], p2 = f.nodes[i];
        const steps = Math.max(1, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / (R / 4)));
        for (let s = 0; s <= steps; s++) {
          const x = p1.x + ((p2.x - p1.x) * s) / steps;
          const y = p1.y + ((p2.y - p1.y) * s) / steps;
          if (Math.hypot(x - c0.x, y - c0.y) <= R * 1.02) return true;
        }
      }
    }
    return false;
  };

  // Pose d'un lieu : ville multi-régions (pose guidée) ou lieu simple (7 emplacements par région)
  const placeLieu = (h, k, e) => {
    if (lieuSel.startsWith("ville:")) {
      const niveau = Number(lieuSel.split(":")[1]);
      const def = VILLES.find((v) => v.niveau === niveau);
      // Pose manuelle en cours : clic sur une région candidate
      if (villePlace) {
        const { feas } = placementInfo();
        if (!feas.some((o) => o.includes(k))) {
          setNotice("Cette région ne fait partie d'aucune orientation encore possible pour cette ville. Les régions surlignées sont les seules éligibles.");
          return;
        }
        const picked = [...villePlace.picked, k];
        if (picked.length === def.n) {
          const o = feas.find((o2) => o2.every((x) => picked.includes(x)));
          if (!o) { setNotice("Ces régions ne forment pas une emprise symétrique valide."); return; }
          finalizeVille(o, niveau, villePlace.sousMarine, def);
        } else {
          setVillePlace({ ...villePlace, picked });
        }
        return;
      }
      // Premier clic : région de départ
      if (!hexFree(h.c, h.r)) { setNotice("Cette région contient déjà un lieu."); return; }
      if (sousMarine && h.terrain !== "mer") {
        setNotice("Une ville sous-marine se pose uniquement sur des régions de mer.");
        return;
      }
      if (!sousMarine && h.terrain === "mer") {
        setNotice("Une ville terrestre part d'une région terrestre ; elle pourra ensuite inclure des régions d'eau dans la limite du quota.");
        return;
      }
      if (def.n === 1) { finalizeVille([k], niveau, sousMarine, def); return; }
      if (def.n === 7) {
        const emp = computeEmprise(h, 7, sousMarine);
        if (!emp) { setNotice("Impossible de poser cette ville : régions voisines manquantes, occupées, ou quota d'eau dépassé."); return; }
        finalizeVille(emp, niveau, sousMarine, def);
        return;
      }
      // n = 3 ou 4 : pose manuelle, clics successifs sur les régions candidates
      const feas = orientationsFor(h.c, h.r, def.n).filter((o) => orientOk(o, def.n, sousMarine));
      if (!feas.length) { setNotice("Aucune orientation possible autour de cette région de départ."); return; }
      setVillePlace({ niveau, n: def.n, sousMarine, picked: [k] });
      setNotice(`Pose guidée : cliquez les ${def.n - 1} régions surlignées pour compléter l'emprise de la ville.`);
    } else {
      if (h.terrain === "mer") {
        setNotice("Aucun lieu ne se pose sur une région de mer.");
        return;
      }
      if (h.lieux.some((L) => L.type === "ville")) {
        setNotice("Cette région appartient à une ville : les autres lieux s'en tiennent à l'extérieur.");
        return;
      }
      if (LIEUX[lieuSel].needsRoad && !voieProche(h)) {
        setNotice("Ce lieu doit être posé le long d'une voie carrossable : tracez d'abord une route ou un chemin traversant ou longeant la région.");
        return;
      }
      // Emplacement : le plus proche du clic parmi les sept (centre + six côtés), libre uniquement
      const occ = new Set(h.lieux.map((L) => L.slot));
      const p = svgPoint(e);
      let slot = null, bestD = Infinity;
      for (const s of SLOTS) {
        if (occ.has(s)) continue;
        const sp = slotPos(h, s);
        const d = Math.hypot(p.x - sp.x, p.y - sp.y);
        if (d < bestD) { bestD = d; slot = s; }
      }
      if (!slot) {
        setNotice("Cette région accueille déjà sept lieux (un au centre, six autour) : le maximum est atteint.");
        return;
      }
      setHexes((prev) => new Map(prev).set(key(h.c, h.r), { ...h, lieux: [...h.lieux, { slot, type: lieuSel }] }));
    }
  };

  const clickHex = (k, e) => {
    const h = hexes.get(k);
    if (!h) return;
    if (tool === "lineaire") {
      const node = snapNode(svgPoint(e));
      if (node) addTraceNode(node);
      setSelected(k);
      return;
    }
    setSelected(k);
    if (tool === "terrain") {
      setHexes((prev) => new Map(prev).set(k, { ...h, terrain: terrainSel }));
    } else if (tool === "lieu") {
      placeLieu(h, k, e);
    } else if (tool === "effacer") {
      // Retire le lieu le plus proche du clic, sinon retire les éléments linéaires traversant l'hex
      const p = svgPoint(e);
      let best = null, bestD = R * 0.35;
      for (const L of h.lieux) {
        const lp = slotPos(h, L.slot);
        const d = Math.hypot(p.x - lp.x, p.y - lp.y);
        if (d < bestD) { best = L; bestD = d; }
      }
      if (best) {
        if (best.type === "ville" && best.villeId) {
          const vid = best.villeId;
          setVilles((prev) => prev.filter((v) => v.id !== vid));
          setHexes((prev) => {
            const m = new Map(prev);
            for (const [k2, hh] of m)
              if (hh.lieux.some((L) => L.villeId === vid))
                m.set(k2, { ...hh, lieux: hh.lieux.filter((L) => L.villeId !== vid) });
            return m;
          });
        } else {
          setHexes((prev) => new Map(prev).set(k, { ...h, lieux: h.lieux.filter((L) => L !== best) }));
        }
      } else {
        const nearCross = crossings.find((c) => Math.hypot(p.x - c.x, p.y - c.y) < R * 0.35);
        if (nearCross) {
          setCrossings((prev) => prev.filter((c) => c.id !== nearCross.id));
        } else {
          setFeatures((prev) => prev.filter((f) => {
            const ctr = center(h.c, h.r);
            return !f.nodes.some((n) => Math.hypot(n.x - ctr.x, n.y - ctr.y) < R);
          }));
        }
      }
    } else if (tool === "province") {
      if (!provSel) {
        setNotice("Créez ou sélectionnez d'abord une province dans le panneau de gauche.");
        return;
      }
      setHexes((prev) => new Map(prev).set(k, { ...h, province: provSel }));
    }
  };

  const createProvince = () => {
    const name = newProv.trim();
    if (!name) { setNotice("Saisissez un nom de province avant de créer."); return; }
    const p = {
      id: `p${provinces.length + 1}`,
      name,
      color: PROV_COLORS[provinces.length % PROV_COLORS.length],
      royaume: null,
    };
    setProvinces((prev) => [...prev, p]);
    setProvSel(p.id);
    setNewProv("");
  };

  const createRoyaume = () => {
    const name = newRoyaume.trim();
    if (!name) { setNotice("Saisissez un nom de royaume avant de créer."); return; }
    const k = {
      id: `k${royaumes.length + 1}`,
      name,
      color: PROV_COLORS[(royaumes.length + 2) % PROV_COLORS.length],
      empire: null,
    };
    setRoyaumes((prev) => [...prev, k]);
    setNewRoyaume("");
  };

  const createEmpire = () => {
    const name = newEmpire.trim();
    if (!name) { setNotice("Saisissez un nom d'empire avant de créer."); return; }
    const e = {
      id: `e${empires.length + 1}`,
      name,
      color: PROV_COLORS[(empires.length + 4) % PROV_COLORS.length],
    };
    setEmpires((prev) => [...prev, e]);
    setNewEmpire("");
  };

  const setProvinceRoyaume = (pid, kid) => {
    setProvinces((prev) => prev.map((p) => (p.id === pid ? { ...p, royaume: kid || null } : p)));
  };

  const setRoyaumeEmpire = (kid, eid) => {
    setRoyaumes((prev) => prev.map((k) => (k.id === kid ? { ...k, empire: eid || null } : k)));
  };

  const deleteProvince = (pid) => {
    setProvinces((prev) => prev.filter((p) => p.id !== pid));
    setHexes((prev) => {
      const m = new Map(prev);
      for (const [k, h] of m) if (h.province === pid) m.set(k, { ...h, province: null });
      return m;
    });
    if (provSel === pid) setProvSel(null);
  };

  const deleteRoyaume = (kid) => {
    setRoyaumes((prev) => prev.filter((k) => k.id !== kid));
    setProvinces((prev) => prev.map((p) => (p.royaume === kid ? { ...p, royaume: null } : p)));
  };

  const deleteEmpire = (eid) => {
    setEmpires((prev) => prev.filter((e) => e.id !== eid));
    setRoyaumes((prev) => prev.map((k) => (k.empire === eid ? { ...k, empire: null } : k)));
  };

  const removeHexFromProvince = (k) => {
    const h = hexes.get(k);
    if (!h) return;
    setHexes((prev) => new Map(prev).set(k, { ...h, province: null }));
  };

  const selHex = selected ? hexes.get(selected) : null;
  const selProv = provinces.find((p) => p.id === selHex?.province);

  const jsonExport = useMemo(() => {
    const data = {
      monde: { colonnes: COLS, rangees: ROWS },
      hexes: [...hexes.values()].map((h) => ({
        coord: [h.c, h.r],
        terrain: h.terrain,
        lieux: h.lieux.map((L) => ({
          emplacement: L.slot,
          type: L.type,
          ...(L.type === "ville" ? { villeId: L.villeId, niveau: L.niveau } : {}),
          ...(["depotrelais", "depotrelaisentrepot"].includes(L.type) ? { niveau: 2 } : {}),
        })),
        province: h.province,
      })),
      villes: villes.map((v) => ({
        id: v.id,
        nom: v.nom,
        niveau: v.niveau,
        sousMarine: !!v.sousMarine,
        regions: v.hexes.map((x) => x.split(",").map(Number)),
        graineRemplissage: 1,
      })),
      lineaires: features.map((f) => ({
        type: f.type,
        points: f.nodes.map((n) => {
          const cls = classifyPoint(n);
          if (!cls) return { libre: true, x: Math.round(n.x), y: Math.round(n.y) };
          return {
            noeud: cls.t === "C" ? "centre" : cls.t === "A" ? "arête" : "sommet",
            region: [cls.c, cls.r],
            cote: cls.s ?? null,
          };
        }),
      })),
      provinces: provinces.map((p) => ({ id: p.id, nom: p.name, royaume: p.royaume })),
      royaumes: royaumes.map((k) => ({ id: k.id, nom: k.name, empire: k.empire })),
      empires: empires.map((e) => ({ id: e.id, nom: e.name })),
      franchissements: crossings.map((c) => ({ nature: c.kind, x: Math.round(c.x), y: Math.round(c.y) })),
    };
    return JSON.stringify(data, null, 2);
  }, [hexes, features, provinces, royaumes, empires, crossings, villes]);

  return (
    <div className="flex h-screen flex-col bg-stone-100 text-stone-900">
      <header className="border-b border-stone-300 bg-stone-800 px-4 py-3 text-white">
        <h1 className="text-lg font-semibold">Prototype jetable — Éditeur de carte hexagonal (Édition 8)</h1>
        <p className="text-xs text-stone-300">
          Données non destinées à la carte de test. Ergonomie à éprouver : terrain, éléments linéaires, lieux, provinces, royaumes, empires.
        </p>
      </header>

      {notice && (
        <div className="flex items-center justify-between gap-2 border-b border-amber-300 bg-amber-100 px-4 py-1.5 text-sm text-amber-900">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="shrink-0 underline">Fermer</button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Barre d'outils */}
        <aside className="w-56 shrink-0 space-y-4 overflow-y-auto border-r border-stone-300 bg-stone-50 p-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Outil</p>
            <div className="grid gap-1">
              {[
                ["terrain", "Terrain (niveau 0)"],
                ["lineaire", "Linéaire (niveau 1)"],
                ["lieu", "Lieux (niveau 2)"],
                ["province", "Provinces"],
                ["effacer", "Gomme (lieux, linéaires)"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => { setTool(id); clearTrace(); setVillePlace(null); }}
                  className={`rounded px-2 py-1.5 text-left text-sm ${
                    tool === id ? "bg-stone-800 text-white" : "bg-white hover:bg-stone-200"
                  } border border-stone-300`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {pendingCrossings.length > 0 && (
            <div className="rounded border border-amber-400 bg-amber-50 p-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-800">Franchissements à arbitrer</p>
              {pendingCrossings.map((c) => (
                <div key={c.id} className="mb-2 rounded bg-white p-1.5 text-xs">
                  <p className="mb-1">Croisement en ({Math.round(c.x)}, {Math.round(c.y)})</p>
                  <div className="flex gap-1">
                    <button onClick={() => chooseCrossing(c.id, "pont")} className="flex-1 rounded bg-stone-800 px-2 py-1 text-white">Pont</button>
                    <button onClick={() => chooseCrossing(c.id, "gue")} className="flex-1 rounded bg-stone-600 px-2 py-1 text-white">Gué</button>
                    <button onClick={() => chooseCrossing(c.id, "rien")} className="flex-1 rounded border border-stone-400 bg-white px-2 py-1">Rien</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tool === "terrain" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Palette de terrains</p>
              <div className="grid gap-1">
                {Object.entries(TERRAINS).map(([id, t]) => (
                  <button
                    key={id}
                    onClick={() => setTerrainSel(id)}
                    className={`flex items-center gap-2 rounded px-2 py-1 text-sm ${
                      terrainSel === id ? "ring-2 ring-stone-800" : ""
                    } border border-stone-300 bg-white`}
                  >
                    <span className="inline-block h-4 w-4 rounded-sm" style={{ background: t.fill }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool === "lieu" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Palette de lieux</p>
              <select
                value={lieuSel}
                onChange={(e) => { setLieuSel(e.target.value); setVillePlace(null); }}
                className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm"
              >
                {VILLES.map((v) => (
                  <option key={"v" + v.niveau} value={`ville:${v.niveau}`}>
                    Niv {v.niveau} — {v.nom} ({v.n} rég.)
                  </option>
                ))}
                {Object.entries(LIEUX).map(([id, l]) => (
                  <option key={id} value={id}>{l.label}</option>
                ))}
              </select>
              {lieuSel.startsWith("ville:") && (
                <>
                  <label className="mt-1 flex items-center gap-2 rounded bg-white px-2 py-1 text-xs">
                    <input type="checkbox" checked={sousMarine}
                      onChange={(e) => { setSousMarine(e.target.checked); setVillePlace(null); }} />
                    Ville sous-marine (toutes les régions en mer)
                  </label>
                  <input value={villeNom} onChange={(e) => setVilleNom(e.target.value)}
                    placeholder="Nom de la ville (optionnel)"
                    className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1 text-sm" />
                  {villePlace ? (
                    <div className="mt-1 rounded border border-amber-400 bg-amber-50 p-2 text-xs">
                      <p>Pose guidée en cours : {villePlace.picked.length} / {villePlace.n} régions. Cliquez une région surlignée en orange.</p>
                      <button onClick={() => setVillePlace(null)}
                        className="mt-1 w-full rounded border border-stone-400 bg-white px-2 py-1">
                        Annuler la pose
                      </button>
                    </div>
                  ) : null}
                </>
              )}
              <p className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-800">
                Jusqu'à sept lieux par région terrestre : un au centre, six autour — le lieu se pose sur l'emplacement
                libre le plus proche du clic, ce qui permet de le placer du côté de la route (dépôts relais) ou du
                côté visé. Les dépôts relais exigent une route ou un chemin
                traversant ou longeant la région. Une ville exige des régions entièrement libres. Villes à 3 ou 4 régions : cliquez la région de départ,
                puis complétez l'emprise en cliquant les régions candidates surlignées. Quota d'eau d'une ville
                terrestre : 1 région de mer (3 ou 4 régions), 3 régions de mer (7 régions). Ville sous-marine :
                uniquement des régions de mer.
              </p>
            </div>
          )}

          {tool === "lineaire" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Type d'élément</p>
              <div className="grid gap-1">
                {Object.entries(LINEAIRES).map(([id, l]) => (
                  <button
                    key={id}
                    onClick={() => { setLineaireSel(id); clearTrace(); }}
                    className={`flex items-center gap-2 rounded px-2 py-1 text-sm ${
                      lineaireSel === id ? "ring-2 ring-stone-800" : ""
                    } border border-stone-300 bg-white`}
                  >
                    <span className="inline-block h-1 w-6" style={{ background: l.color }} />
                    {l.label}
                  </button>
                ))}
              </div>
              <label className="mt-2 flex items-center gap-2 rounded bg-white px-2 py-1 text-xs">
                <input type="checkbox" checked={traceDirect} onChange={(e) => setTraceDirect(e.target.checked)} />
                Tracé direct : le chemin entre deux clics est calculé automatiquement (régions intermédiaires traversées)
              </label>
              <p className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-800">
                Un élément linéaire est une polyligne de la grille : il peut passer par les centres de région, les milieux d'arête et les sommets. En tracé direct, cliquez l'origine puis l'arrivée — même éloignées ou séparées par une ligne de régions — le chemin est calculé au plus court. Un clic près d'une arête ou d'un sommet cible ce point précis. Décochez pour tracer point par point.
              </p>
              <div className="mt-2 flex gap-1">
                <button onClick={finishTrace} className="flex-1 rounded bg-stone-800 px-2 py-1 text-sm text-white">
                  Valider ({trace.length})
                </button>
                <button onClick={clearTrace} className="rounded border border-stone-300 bg-white px-2 py-1 text-sm">
                  Annuler
                </button>
              </div>
            </div>
          )}

          {tool === "province" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Provinces</p>
              <div className="flex gap-1">
                <input value={newProv} onChange={(e) => setNewProv(e.target.value)}
                  placeholder="Nom de la province"
                  className="min-w-0 flex-1 rounded border border-stone-300 bg-white px-2 py-1 text-sm" />
                <button onClick={createProvince} className="rounded bg-stone-800 px-2 py-1 text-sm text-white">
                  Créer
                </button>
              </div>
              <div className="mt-2 grid gap-1">
                {provinces.map((p) => {
                  const hexCount = [...hexes.values()].filter((h) => h.province === p.id).length;
                  return (
                    <div key={p.id} className={`rounded border border-stone-300 bg-white p-1.5 text-sm ${
                      provSel === p.id ? "ring-2 ring-stone-800" : ""}`}>
                      <button onClick={() => setProvSel(p.id)} className="flex w-full items-center gap-2 text-left">
                        <span className="inline-block h-3 w-3 rounded-full" style={{ background: p.color }} />
                        <span className="flex-1">{p.name} ({hexCount} hex)</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <select
                          value={p.royaume || ""}
                          onChange={(e) => setProvinceRoyaume(p.id, e.target.value)}
                          className="min-w-0 flex-1 rounded border border-stone-300 bg-stone-50 px-1 py-0.5 text-xs"
                        >
                          <option value="">— sans royaume —</option>
                          {royaumes.map((k) => (
                            <option key={k.id} value={k.id}>Royaume : {k.name}</option>
                          ))}
                        </select>
                        <button onClick={() => deleteProvince(p.id)} title="Supprimer la province"
                          className="shrink-0 rounded border border-red-300 bg-red-50 px-1.5 py-0.5 text-xs text-red-700">
                          Suppr.
                        </button>
                      </div>
                    </div>
                  );
                })}
                {provinces.length === 0 && (
                  <p className="text-xs text-stone-500">Aucune province. Créez-en une, puis peignez ses hexagones.</p>
                )}
              </div>
              <p className="mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Royaumes (ensembles de provinces)</p>
              <div className="flex gap-1">
                <input value={newRoyaume} onChange={(e) => setNewRoyaume(e.target.value)}
                  placeholder="Nom du royaume"
                  className="min-w-0 flex-1 rounded border border-stone-300 bg-white px-2 py-1 text-sm" />
                <button onClick={createRoyaume} className="rounded bg-stone-800 px-2 py-1 text-sm text-white">
                  Créer
                </button>
              </div>
              <div className="mt-2 grid gap-1">
                {royaumes.map((k) => {
                  const provCount = provinces.filter((p) => p.royaume === k.id).length;
                  return (
                    <div key={k.id} className="rounded border border-stone-300 bg-white p-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-3 w-3 rounded" style={{ background: k.color }} />
                        <span className="flex-1">{k.name} ({provCount} prov.)</span>
                        <button onClick={() => deleteRoyaume(k.id)} title="Supprimer le royaume"
                          className="shrink-0 rounded border border-red-300 bg-red-50 px-1.5 py-0.5 text-xs text-red-700">
                          Suppr.
                        </button>
                      </div>
                      <select
                        value={k.empire || ""}
                        onChange={(e) => setRoyaumeEmpire(k.id, e.target.value)}
                        className="mt-1 w-full rounded border border-stone-300 bg-stone-50 px-1 py-0.5 text-xs"
                      >
                        <option value="">— sans empire —</option>
                        {empires.map((e) => (
                          <option key={e.id} value={e.id}>Empire : {e.name}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
                {royaumes.length === 0 && (
                  <p className="text-xs text-stone-500">Aucun royaume. Chaque royaume regroupe des provinces.</p>
                )}
              </div>
              <p className="mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Empires (ensembles de royaumes)</p>
              <div className="flex gap-1">
                <input value={newEmpire} onChange={(e) => setNewEmpire(e.target.value)}
                  placeholder="Nom de l'empire"
                  className="min-w-0 flex-1 rounded border border-stone-300 bg-white px-2 py-1 text-sm" />
                <button onClick={createEmpire} className="rounded bg-stone-800 px-2 py-1 text-sm text-white">
                  Créer
                </button>
              </div>
              <div className="mt-2 grid gap-1">
                {empires.map((e) => {
                  const kCount = royaumes.filter((k) => k.empire === e.id).length;
                  return (
                    <div key={e.id} className="flex items-center gap-2 rounded border border-stone-300 bg-white px-2 py-1 text-sm">
                      <span className="inline-block h-3 w-3 rounded" style={{ background: e.color }} />
                      <span className="flex-1">{e.name} ({kCount} royaume{kCount > 1 ? "s" : ""})</span>
                      <button onClick={() => deleteEmpire(e.id)} title="Supprimer l'empire"
                        className="shrink-0 rounded border border-red-300 bg-red-50 px-1.5 py-0.5 text-xs text-red-700">
                        Suppr.
                      </button>
                    </div>
                  );
                })}
                {empires.length === 0 && (
                  <p className="text-xs text-stone-500">Aucun empire. Un royaume appartient à au plus un empire.</p>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Carte */}
        <main className="flex-1 overflow-auto p-4">
          <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="mx-auto max-w-full" style={{ height: "90%" }}
               onMouseMove={(e) => setHoverNode(tool === "lineaire" ? snapNode(svgPoint(e)) : null)}
               onMouseLeave={() => setHoverNode(null)} >
            {[...hexes.values()].map((h) => {
              const { x, y } = center(h.c, h.r);
              const pts = corners(x, y).map((c) => c.join(",")).join(" ");
              const t = TERRAINS[h.terrain];
              return (
                <g key={key(h.c, h.r)} onClick={(e) => clickHex(key(h.c, h.r), e)}
                   className="cursor-pointer" role="button">
                  <polygon points={pts} fill={t.fill} stroke={selected === key(h.c, h.r) ? "#111" : t.stroke}
                    strokeWidth={selected === key(h.c, h.r) ? 3 : 1.5} />
                  {h.lieux.some((L) => L.type === "ville") && (
                    <polygon points={pts} fill="#6b655c" fillOpacity={0.32} pointerEvents="none" />
                  )}
                  {h.lieux.map((L) => {
                    const pos = slotPos(h, L.slot);
                    if (L.type === "ville") {
                      return (
                        <text key={L.slot} x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={16}
                          fontWeight="bold" fill="#4a1212" stroke="#fffbf0" strokeWidth={3} paintOrder="stroke" pointerEvents="none">
                          {L.niveau}
                        </text>
                      );
                    }
                    return (
                      <text key={L.slot} x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={13}
                        fontWeight="bold" fill={LIEUX[L.type].color} pointerEvents="none">
                        {LIEUX[L.type].sym}
                      </text>
                    );
                  })}
                </g>
              );
            })}

            {/* Repères d'emplacement des lieux sur la région sélectionnée (outil Lieux) */}
            {tool === "lieu" && !lieuSel.startsWith("ville:") && selected && hexes.get(selected) && (() => {
              const h = hexes.get(selected);
              const occ = new Set(h.lieux.map((L) => L.slot));
              return SLOTS.map((s) => {
                const sp = slotPos(h, s);
                return <circle key={"sl" + s} cx={sp.x} cy={sp.y} r={5} fill="none"
                  stroke={occ.has(s) ? "#b91c1c" : "#b45309"} strokeWidth={2}
                  strokeDasharray={occ.has(s) ? "0" : "3 3"} pointerEvents="none" />;
              });
            })()}

            {provinces.map((p) => (
              <g key={p.id} pointerEvents="none">
                {[...hexes.values()].filter((h) => h.province === p.id).map((h) => {
                  const { x, y } = center(h.c, h.r);
                  const pts = corners(x, y).map((c) => c.join(",")).join(" ");
                  return (
                    <polygon key={p.id + h.c + "," + h.r} points={pts}
                      fill={p.color} fillOpacity={0.18}
                      stroke={p.color} strokeWidth={3.5} opacity={0.9} />
                  );
                })}
              </g>
            ))}

            {provinces.map((p) => {
              const members = [...hexes.values()].filter((h) => h.province === p.id);
              if (members.length === 0) return null;
              const cx = members.reduce((s, h) => s + center(h.c, h.r).x, 0) / members.length;
              const cy = members.reduce((s, h) => s + center(h.c, h.r).y, 0) / members.length;
              return (
                <text key={"pname" + p.id} x={cx} y={cy - R * 0.45} textAnchor="middle"
                  fontSize={13} fontWeight="bold" fill="#1c1917"
                  stroke="#fffbf0" strokeWidth={3.5} paintOrder="stroke" pointerEvents="none">
                  {p.name}
                </text>
              );
            })}

            {features.map((f) => {
              const l = LINEAIRES[f.type];
              return (
                <polyline key={f.id} points={f.nodes.map((n) => `${n.x},${n.y}`).join(" ")}
                  fill="none" stroke={l.color} strokeWidth={l.width} strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray={l.dash || "none"} pointerEvents="none" />
              );
            })}

            {tool === "lineaire" && (
              <g pointerEvents="none">
                {[...hexes.values()].map((h) => {
                  const ctr = center(h.c, h.r);
                  return (
                    <g key={"nodes" + h.c + "," + h.r}>
                      <circle cx={ctr.x} cy={ctr.y} r={3.5} fill="#333" fillOpacity={0.55} />
                      {SIDES.map(([s]) => {
                        const M = edgeMidNode(h.c, h.r, s);
                        return <circle key={s} cx={M.x} cy={M.y} r={2.2} fill="#333" fillOpacity={0.35} />;
                      })}
                      {Array.from({ length: 6 }, (_, k) => {
                        const V = vertexNode(h.c, h.r, -90 + 60 * k);
                        return <circle key={k} cx={V.x} cy={V.y} r={2.2} fill="#333" fillOpacity={0.35} />;
                      })}
                    </g>
                  );
                })}
                {hoverNode && (
                  <circle cx={hoverNode.x} cy={hoverNode.y} r={8} fill="none" stroke="#b91c1c" strokeWidth={2.5} />
                )}
              </g>
            )}

            {crossings.filter((c) => c.kind !== "rien").map((c) => (
              <g key={c.id} pointerEvents="none">
                <circle cx={c.x} cy={c.y} r={7.5} fill="#fffdf5" stroke="#4a4038" strokeWidth={1.5} />
                <text x={c.x} y={c.y + 3.5} textAnchor="middle" fontSize={9.5} fontWeight="bold"
                  fill={c.kind === "pont" ? "#303a7a" : "#7a4a1a"}>
                  {c.kind === "pont" ? "P" : "G"}
                </text>
              </g>
            ))}

            {villePlace && (() => {
              const { cands } = placementInfo();
              const pickedSet = new Set(villePlace.picked);
              const poly = (c, r) => corners(center(c, r).x, center(c, r).y).map((p) => p.join(",")).join(" ");
              return (
                <g pointerEvents="none">
                  {[...cands].map((k) => {
                    const [c, r] = k.split(",").map(Number);
                    return (
                      <polygon key={"cand" + k} points={poly(c, r)}
                        fill="#f59e0b" fillOpacity={0.3} stroke="#b45309" strokeWidth={2} strokeDasharray="4 3" />
                    );
                  })}
                  {[...pickedSet].map((k) => {
                    const [c, r] = k.split(",").map(Number);
                    return (
                      <polygon key={"pick" + k} points={poly(c, r)}
                        fill="#6b655c" fillOpacity={0.5} stroke="#111" strokeWidth={2} />
                    );
                  })}
                </g>
              );
            })()}

            {trace.length > 0 && (
              <polyline points={trace.map((n) => `${n.x},${n.y}`).join(" ")}
                fill="none" stroke="#444" strokeWidth={2} strokeDasharray="5 5" pointerEvents="none" />
            )}
            {trace.map((n) => (
              <circle key={posKey(n)} cx={n.x} cy={n.y} r={5} fill="#444" pointerEvents="none" />
            ))}
          </svg>
        </main>

        {/* Panneau d'inspection */}
        <aside className="w-64 shrink-0 space-y-4 overflow-y-auto border-l border-stone-300 bg-stone-50 p-3 text-sm">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Hexagone sélectionné</p>
            {selHex ? (
              <div className="rounded border border-stone-300 bg-white p-2">
                <p><span className="font-semibold">Coordonnées :</span> {selHex.c}, {selHex.r}</p>
                <p><span className="font-semibold">Terrain :</span> {TERRAINS[selHex.terrain].label}</p>
                <p><span className="font-semibold">Lieux :</span> {selHex.lieux.length ? selHex.lieux.map((L) => L.type === "ville" ? `${villes.find((v) => v.id === L.villeId)?.nom} (niveau ${L.niveau})` : `${LIEUX[L.type].label} (${L.slot === "C" ? "centre" : L.slot})`).join(", ") : "—"}</p>
                <p><span className="font-semibold">Province :</span> {selProv ? selProv.name : "—"}</p>
                {selHex.province && (
                  <button onClick={() => removeHexFromProvince(selected)} className="mt-1 text-xs text-red-700 underline">
                    Retirer de la province
                  </button>
                )}
              </div>
            ) : (
              <p className="text-stone-500">Cliquez un hexagone.</p>
            )}
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Contrôles de cohérence</p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-stone-600">
              <li>Tracé continu dans la géométrie de la grille (centres, arêtes, sommets) : appliqué à la validation.</li>
              <li>Cours d'eau aboutissant en mer ou marais : appliqué à la validation.</li>
              <li>Chaque lieu occupe une région entière, centré ; villes multi-régions : 1, 3, 4 ou 7 régions selon le niveau 0 à 12. Pose guidée pour 3 et 4 régions, emprise générée pour 1 et 7 : appliqué à la pose.</li>
              <li>Quota d'eau d'une ville terrestre : au plus 1 région de mer (villes de 3 ou 4 régions), au plus 3 (villes de 7 régions) ; ville sous-marine : toutes les régions en mer : appliqué à la pose.</li>
              <li>Contiguïté des provinces uniquement ; royaumes non contigus admis (sécession, conquête, enclaves) : à implémenter dans l'outil définitif (signalement informatif).</li>
            </ul>
          </div>

          <div>
            <button onClick={() => setShowJson(!showJson)} className="w-full rounded bg-stone-800 px-2 py-1 text-white">
              {showJson ? "Masquer" : "Voir"} l'export JSON
            </button>
            {showJson && (
              <textarea readOnly value={jsonExport}
                className="mt-2 h-64 w-full rounded border border-stone-300 bg-white p-2 font-mono text-[10px]" />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
