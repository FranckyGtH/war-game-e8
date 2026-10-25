
import React, { useMemo, useState } from "react";

// ---- Maquette de l'outil Quartiers : ville de 4 régions (losange, niveau 8 « Cité ») ----
// Vues : Ville / Quartier (grille fine, pose de constructions) / Rues & entrées / Fortifications.
// Les contraintes arbitrées sont appliquées à la pose et rappelées dans les contrôles.

const QUART_KEYS = ["3,2", "4,2", "3,1", "4,1"];
const WATER_KEYS = ["4,1"]; // région d'eau de l'emprise : quartier lacustre (quota d'eau d'une ville de 4 régions)
const NB_Q = QUART_KEYS.length;
const NIVEAU_VILLE = 8;

const VILLE = { nom: "Corvallon", niveau: NIVEAU_VILLE };

// Géométrie pointy-top odd-r
const mkCenter = (R) => (c, r) => ({
  x: R * Math.sqrt(3) * (c + 0.5 * (r % 2)) + (R * Math.sqrt(3)) / 2,
  y: R * 1.5 * r + R,
});
const mkCorners = (R) => (cx, cy) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
const SIDES = [["E", 0], ["SE", 60], ["SO", 120], ["O", 180], ["NO", 240], ["NE", 300]];
const sideAngle = (s) => (SIDES.find(([nm]) => nm === s) || [null, 0])[1];
const neighborOf = (c, r, s) => {
  const even = { E: [1, 0], NE: [0, -1], NO: [-1, -1], O: [-1, 0], SO: [-1, 1], SE: [0, 1] };
  const odd = { E: [1, 0], NE: [1, -1], NO: [0, -1], O: [-1, 0], SO: [0, 1], SE: [1, 1] };
  const [dc, dr] = (r % 2 === 0 ? even : odd)[s];
  return [c + dc, r + dr];
};
const inCity = (c, r) => QUART_KEYS.includes(`${c},${r}`);

// ---- Catalogue (extrait) ----
// classe : I = Institution, C = Courant, M = Monument ; stockage = borne 2 × niveau ville
const CARTES = {
  marche: { nom: "Marché", classe: "I", sym: "Mc" },
  banque: { nom: "Banque", classe: "I", sym: "Bq" },
  comptoir: { nom: "Comptoir", classe: "I", sym: "Cpt", etranger: true },
  ambassade: { nom: "Ambassade permanente", classe: "I", sym: "Amb", etranger: true },
  caserne: { nom: "Caserne", classe: "I", sym: "Cs" },
  academie: { nom: "Académie militaire", classe: "I", sym: "Am" },
  emagie: { nom: "École de magie", classe: "I", sym: "Em" },
  biblio: { nom: "Bibliothèque", classe: "I", sym: "Bt" },
  chantier: { nom: "Chantier naval", classe: "I", sym: "Cn", aqua: true },
  entrepot: { nom: "Entrepôt", classe: "C", sym: "Ep", stockage: true },
  grenier: { nom: "Grenier", classe: "C", sym: "Gr", stockage: true },
  puits: { nom: "Puits et citerne", classe: "C", sym: "Pc" },
  quai: { nom: "Quai", classe: "C", sym: "Qi" },
  temple: { nom: "Temple", classe: "C", sym: "Tpl", etranger: true },
  cathedrale: { nom: "Cathédrale", classe: "M", sym: "Cat" },
  universite: { nom: "Université", classe: "M", sym: "Uv" },
  chateau: { nom: "Château fort", classe: "M", sym: "Cf" },
  arene: { nom: "Arène", classe: "M", sym: "Ar" },
  // Sous-catalogue aquatique : quartier lacustre (région d'eau) uniquement
  quai: { nom: "Quai", classe: "X", sym: "Qa", aqua: true }, // ouvrage de contact : se pose sur la grille fine près des rives, borne la construction aquatique
  pilotis: { nom: "Entrepôt sur pilotis", classe: "C", sym: "Pl", aqua: true, stockage: true },
};
const CLASSE_LABEL = { I: "Institution", C: "Courant", M: "Monument", X: "Ouvrage de contact" };
const CLASSE_COLOR = { I: "#3a5a7a", C: "#3a6a4a", M: "#6a3a6a", X: "#2a5a7a" };
const maxNiveau = (type) =>
  CARTES[type].classe === "I" ? NB_Q : CARTES[type].stockage || CARTES[type].classe === "X" ? 2 * NIVEAU_VILLE : 12;

const porteLabel = { ouverte: "ouverte", fermee: "fermée", barricadee: "barricadée" };
const fortifColor = { aucun: "#b8b0a0", mur: "#7a5a3a", citadelle: "#3a2a1a" };

// État d'une construction : traité à l'initialisation de la partie, modifie l'apparence au rendu
const ETATS = ["intact", "endommage", "ruine"];
const ETAT_LABEL = { intact: "intact", endommage: "endommagé", ruine: "ruiné" };

const TOUR_TYPES = {
  guet: { nom: "Tour de guet", sym: "G", color: "#7a6a3a" },
  archers: { nom: "Tour d'archers", sym: "A", color: "#7a3a3a" },
  artillerie: { nom: "Tour d'artillerie", sym: "T", color: "#5a3a1a" },
  mage: { nom: "Tour de mage", sym: "M", color: "#4a3a7a" },
  sousmarine: { nom: "Tour sous-marine", sym: "S", color: "#2a5a7a" },
};

// Quartier de départ pré-rempli pour la démonstration
// Règle : un édifice de niveau n occupe n cellules contiguës de la grille fine
const initialBatiments = [
  { id: "b1", q: "3,2", type: "marche", cells: [[3, 3], [3, 4]], level: 2, owner: "Ville" },
  { id: "b2", q: "3,2", type: "grenier", cells: [[1, 5], [2, 5], [1, 4], [2, 4]], level: 4, owner: "Ville" },
  { id: "b3", q: "4,2", type: "comptoir", cells: [[3, 3]], level: 1, owner: "Puissance B" },
  { id: "b4", q: "3,1", type: "temple", cells: [[3, 3]], level: 1, owner: "Culte de Lune" },
  { id: "b5", q: "3,1", type: "cathedrale", cells: [[1, 2]], level: 1, owner: "Culte de Lune" },
];

export default function App() {
  // Compteur global d'identifiants : départ à 100 pour ne jamais entrer en collision
  // avec les identifiants pré-remplis de la démonstration (b1..b5, r1..r2, t1..t2)
  const idRef = React.useRef(100);
  const nextId = (p) => `${p}${idRef.current++}`;
  const [view, setView] = useState("ville"); // ville | quartier | rues | fortif
  const [selQ, setSelQ] = useState("3,2");
  const [paletteSel, setPaletteSel] = useState("marche");
  const [ownerSel, setOwnerSel] = useState("Ville");
  const [batiments, setBatiments] = useState(initialBatiments);
  const [selBat, setSelBat] = useState(null);
  const [pendingLevel, setPendingLevel] = useState(null); // édifice en cours de montée de niveau
  const etatOf = (b) => b.etat ?? "intact";
  const cycleEtat = (id) => {
    setBatiments((prev) => prev.map((b) => b.id === id
      ? { ...b, etat: ETATS[(ETATS.indexOf(etatOf(b)) + 1) % ETATS.length] } : b));
  };
  const [notice, setNotice] = useState(null);
  const [rues, setRues] = useState([
    { id: "r1", nodes: [{ k: "A3,2O" }, { k: "C3,2" }, { k: "A3,2E" }, { k: "C4,2" }, { k: "A4,2E" }] },
    // rue vers l'ouest : entrée extérieure par le côté O du quartier 3,1
    { id: "r2", nodes: [{ k: "A3,1NE" }, { k: "C3,1" }, { k: "A3,1O" }] },
  ]);
  const [traceRue, setTraceRue] = useState([]);
  const [fortif, setFortif] = useState({}); // clé périmètre "c,r,cote" ; clé intérieure "qkA|qkB" ; défaut : périmètre mur, intérieur aucun
  const [portes, setPortes] = useState({ "3,2,O": "ouverte", "4,2,E": "ouverte" }); // entrées et portes intérieures -> ouverte|fermee|barricadee
  const [ports, setPorts] = useState({}); // installations portuaires sur les côtés terre-eau : aucun|port1|port2|port3|fortifie
  const [tours, setTours] = useState([
    { id: "t1", key: "3,2,-90", type: "archers" },
    { id: "t2", key: "4,2,90", type: "guet" },
  ]);
  const [tourSel, setTourSel] = useState("archers");
  const [showJson, setShowJson] = useState(false);

  // ---- Géométrie carte ville (rues, fortifications) ----
  const Rv = 48;
  const ctr = mkCenter(Rv);
  const cornersOf = mkCorners(Rv);
  const apo = (Rv * Math.sqrt(3)) / 2;

  const perimSides = useMemo(() => {
    const out = [];
    for (const qk of QUART_KEYS) {
      const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) if (!inCity(...neighborOf(c, r, s))) out.push(`${c},${r},${s}`);
    }
    return out;
  }, []);

  // État de fortification par défaut : mur sur le périmètre, aucun sur les côtés intérieurs
  const fortifEtat = (key) => fortif[key] ?? (key.includes("|") ? "aucun" : "mur");

  // ---- Entrées dérivées des rues ----
  const entrees = useMemo(() => {
    const set = new Set();
    for (const rue of rues)
      for (const n of rue.nodes) {
        const m = n.k.match(/^A(\d+),(\d+)(\w+)$/);
        if (m) {
          const key = `${m[1]},${m[2]},${m[3]}`;
          if (perimSides.includes(key)) set.add(key);
        }
      }
    return [...set];
  }, [rues, perimSides]);

  const porteEtat = (key) => portes[key] ?? "ouverte";

  // ---- Fortifications intérieures : côtés partagés par deux quartiers ----
  const sideBetween = (qk1, qk2) => {
    const [c, r] = qk1.split(",").map(Number);
    for (const [s] of SIDES) {
      const [nc, nr] = neighborOf(c, r, s);
      if (`${nc},${nr}` === qk2) return s;
    }
    return null;
  };

  // Tous les côtés de l'emprise : périmètre (« c,r,s ») et intérieurs (« qkA|qkB »)
  const sideGeoms = useMemo(() => {
    const set = new Set();
    for (const qk of QUART_KEYS) {
      const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) {
        const [nc, nr] = neighborOf(c, r, s);
        set.add(inCity(nc, nr) ? [qk, `${nc},${nr}`].sort().join("|") : `${c},${r},${s}`);
      }
    }
    return [...set].map((key) => {
      let c, r, s;
      if (key.includes("|")) {
        const [a, b] = key.split("|");
        s = sideBetween(a, b);
        [c, r] = a.split(",").map(Number);
      } else {
        const p = key.split(",");
        c = +p[0]; r = +p[1]; s = p[2];
      }
      const cc = ctr(c, r);
      const ang = (sideAngle(s) * Math.PI) / 180;
      return { key, mx: cc.x + apo * Math.cos(ang), my: cc.y + apo * Math.sin(ang), ang, perim: !key.includes("|") };
    });
  }, []);

  // Portes intérieures : côtés intérieurs traversés par une rue
  // (explicitement par un milieu d'arête, ou implicitement par un tronçon direct centre à centre)
  const gatesInterieur = useMemo(() => {
    const set = new Set();
    for (const rue of rues) {
      for (const n of rue.nodes) {
        const m = n.k.match(/^A(\d+),(\d+)(\w+)$/);
        if (!m) continue;
        const [nc, nr] = neighborOf(+m[1], +m[2], m[3]);
        if (inCity(nc, nr)) set.add([`${m[1]},${m[2]}`, `${nc},${nr}`].sort().join("|"));
      }
      const keys = rue.nodes.map((n) => n.k);
      for (let i = 1; i < keys.length; i++) {
        const p = keys[i - 1].match(/^C(\d+),(\d+)$/);
        const q = keys[i].match(/^C(\d+),(\d+)$/);
        if (!p || !q) continue;
        const adjacent = SIDES.some(([s]) => {
          const [nc, nr] = neighborOf(+p[1], +p[2], s);
          return nc === +q[1] && nr === +q[2];
        });
        if (adjacent) set.add([`${p[1]},${p[2]}`, `${q[1]},${q[2]}`].sort().join("|"));
      }
    }
    return [...set];
  }, [rues]);

  // ---- Vue quartier : grille fine 7 × 7 ----
  const Rq = 190;
  const apoQ = (Rq * Math.sqrt(3)) / 2;
  const CS = 42;
  const cellsInHex = useMemo(() => {
    const out = [];
    // La grille retient aussi les cellules partiellement recouvertes par l'hexagone (demi-cases des bords),
    // le rendu étant découpé au contour par un clipPath.
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 7; j++) {
        const x = (i - 3) * CS, y = (j - 3) * CS;
        let ok = true;
        for (const [s] of SIDES) {
          const a = (sideAngle(s) * Math.PI) / 180;
          if (Math.abs(x * Math.cos(a) + y * Math.sin(a)) > apoQ + CS * 0.35) ok = false;
        }
        if (ok) out.push([i, j, x, y]);
      }
    return out;
  }, [apoQ]);

  const cellFree = (qk, ci, cj) =>
    !batiments.some((b) => b.q === qk && b.cells.some(([i, j]) => i === ci && j === cj));

  // Bande de rue dans la grille fine du quartier sélectionné : cellules traversées par le tracé
  // (projection des nœuds de rue — centre et milieux d'arête — sur la grille, tronçon direct centre-centre inclus).
  // Inconstructibles, sauf pour un marché ou une place, compatibles avec la rue.
  const rueCells = useMemo(() => {
    const [qc, qr] = selQ.split(",").map(Number);
    const sideToward = (c, r) => {
      for (const [s] of SIDES) { const [nc, nr] = neighborOf(qc, qr, s); if (nc === c && nr === r) return s; }
      return null;
    };
    const localPoint = (k) => {
      const m = k.match(/^([CA])(\d+),(\d+)(\w+)?$/);
      if (!m) return null;
      const t = m[1], c = +m[2], r = +m[3], s = m[4];
      if (t === "C" && c === qc && r === qr) return { x: 0, y: 0 };
      if (t === "A" && c === qc && r === qr) {
        const a = (sideAngle(s) * Math.PI) / 180;
        return { x: apoQ * Math.cos(a), y: apoQ * Math.sin(a) };
      }
      const st = sideToward(c, r);
      if (!st) return null;
      const a = (sideAngle(st) * Math.PI) / 180;
      return { x: apoQ * Math.cos(a), y: apoQ * Math.sin(a) };
    };
    const segs = [];
    for (const rue of rues) {
      const pts = rue.nodes.map((n) => localPoint(n.k));
      for (let i = 1; i < pts.length; i++)
        if (pts[i - 1] && pts[i] && (pts[i - 1].x !== pts[i].x || pts[i - 1].y !== pts[i].y))
          segs.push([pts[i - 1], pts[i]]);
    }
    const set = new Set();
    const band = CS * 0.8;
    for (const [ci, cj, x, y] of cellsInHex) {
      for (const [p1, p2] of segs) {
        const vx = p2.x - p1.x, vy = p2.y - p1.y;
        const len2 = vx * vx + vy * vy;
        let t = len2 === 0 ? 0 : ((x - p1.x) * vx + (y - p1.y) * vy) / len2;
        t = Math.max(0, Math.min(1, t));
        const dx = x - (p1.x + t * vx), dy = y - (p1.y + t * vy);
        if (dx * dx + dy * dy <= band * band) { set.add(`${ci},${cj}`); break; }
      }
    }
    return set;
  }, [rues, selQ, cellsInHex]);
  const inRueBand = (ci, cj) => rueCells.has(`${ci},${cj}`);

  // ---- Quartier lacustre : rives, cellules de quai, plafond de construction ----
  const quaiOf = (qk) => batiments.find((b) => b.q === qk && b.type === "quai");
  const sumAqua = (qk) => batiments.filter((b) => b.q === qk && CARTES[b.type].aqua && CARTES[b.type].classe !== "X")
    .reduce((s, b) => s + b.level, 0);
  // Rives : tout côté non adjacent à une autre région d'eau de la ville (berges internes vers la terre,
  // et littoral vers l'extérieur de l'emprise ; seul un côté vers une autre région d'eau — fleuve — n'est pas une rive)
  const landSides = useMemo(() => {
    const [c, r] = selQ.split(",").map(Number);
    const out = [];
    for (const [s] of SIDES) {
      const n = neighborOf(c, r, s);
      const nk = n ? `${n[0]},${n[1]}` : null;
      if (nk && QUART_KEYS.includes(nk) && WATER_KEYS.includes(nk)) continue;
      out.push(s);
    }
    return out;
  }, [selQ]);
  // Cellule de quai : bande longeant une rive (segment du côté terre-eau de l'hexagone du quartier)
  const isQuaiCell = (ci, cj) => {
    if (!WATER_KEYS.includes(selQ)) return false;
    const cell = cellsInHex.find(([i, j]) => i === ci && j === cj);
    if (!cell) return false;
    const x = cell[2], y = cell[3];
    return landSides.some((s) => {
      const ang = (sideAngle(s) * Math.PI) / 180;
      // côté de l'hexagone : du sommet ang-30° au sommet ang+30° (rayon Rq)
      const c1 = { x: Rq * Math.cos(ang - Math.PI / 6), y: Rq * Math.sin(ang - Math.PI / 6) };
      const c2 = { x: Rq * Math.cos(ang + Math.PI / 6), y: Rq * Math.sin(ang + Math.PI / 6) };
      const vx = c2.x - c1.x, vy = c2.y - c1.y;
      const len2 = vx * vx + vy * vy;
      let t = ((x - c1.x) * vx + (y - c1.y) * vy) / len2;
      t = Math.max(0, Math.min(1, t));
      const px = c1.x + t * vx, py = c1.y + t * vy;
      return Math.hypot(x - px, y - py) <= CS * 0.95;
    });
  };

  const placeBatiment = (ci, cj) => {
    // Extension en cours : la montée de niveau se fait en cliquant une cellule libre adjacente
    if (pendingLevel) {
      const b = batiments.find((x) => x.id === pendingLevel);
      if (!b) { setPendingLevel(null); return; }
      if (!b.cells.some(([i, j]) => Math.abs(i - ci) + Math.abs(j - cj) === 1)) {
        setNotice(`L'extension de « ${CARTES[b.type].nom} » doit se faire sur une cellule libre adjacente (les candidates sont surlignées).`);
        return;
      }
      if (!cellFree(selQ, ci, cj)) { setNotice("Cellule déjà occupée dans ce quartier."); return; }
      // Extension du quai : dès qu'un quai existe, l'extension se fait sur toute cellule libre adjacente
      // (pontons et appontements s'avancent ainsi hors du ruban de rive)
      if (CARTES[b.type].aqua && CARTES[b.type].classe !== "X" && sumAqua(selQ) + 1 > (quaiOf(selQ)?.level ?? 0)) {
        setNotice(`Plafond du quai atteint : ${sumAqua(selQ)} niveaux de constructions aquatiques posés, quai de niveau ${quaiOf(selQ)?.level}.`);
        return;
      }
      if (inRueBand(ci, cj) && b.type !== "marche") {
        setNotice(`L'extension de « ${CARTES[b.type].nom} » ne peut empiéter sur la bande de la rue : seuls un marché ou une place y sont admis.`);
        return;
      }
      setBatiments((prev) => prev.map((x) => x.id === pendingLevel
        ? { ...x, level: x.level + 1, cells: [...x.cells, [ci, cj]] } : x));
      setPendingLevel(null);
      setNotice(null);
      return;
    }
    const isWaterQ = WATER_KEYS.includes(selQ);
    const carte = CARTES[paletteSel];
    // Quai : ouvrage de contact, posé sur la grille fine près des rives ; borne la construction aquatique
    if (carte.classe === "X") {
      if (!isWaterQ) { setNotice("Le quai se pose uniquement sur la région d'eau de la ville (quartier lacustre)."); return; }
      if (quaiOf(selQ)) { setNotice("Un seul quai par région d'eau : étendez le quai existant avec « Niveau +1 »."); return; }
      if (!isQuaiCell(ci, cj)) { setNotice("Le quai se pose sur une cellule proche d'une rive — côté partagé avec une région de terre (cellules surlignées en bleu)."); return; }
    } else {
      if (isWaterQ) {
        const q = quaiOf(selQ);
        if (!q) { setNotice("Sans quai, on ne construit que sur les régions de terre : posez d'abord le quai près d'une rive."); return; }
        if (!carte.aqua) { setNotice("Construction terrestre refusée : ce quartier est lacustre, seul le sous-catalogue aquatique s'y pose."); return; }
        if (sumAqua(selQ) + 1 > q.level) {
          setNotice(`Plafond du quai atteint : ${sumAqua(selQ)} niveaux de constructions aquatiques posés, quai de niveau ${q.level} — étendez le quai pour construire davantage.`);
          return;
        }
      }
      if (!isWaterQ && carte.aqua) { setNotice("Cette construction aquatique se pose uniquement dans un quartier lacustre (région d'eau)."); return; }
    }
    if (!cellFree(selQ, ci, cj)) { setNotice("Cellule déjà occupée dans ce quartier."); return; }
    if (inRueBand(ci, cj) && paletteSel !== "marche") {
      setNotice("Cellule située dans la bande de la rue principale : seuls un marché ou une place peuvent y être posés.");
      return;
    }
    if (carte.classe === "M" && batiments.some((b) => CARTES[b.type].classe === "M")) {
      setNotice("Un seul Monument par ville (cathédrale, université, château fort, arène).");
      return;
    }
    if (batiments.some((b) => b.q === selQ && b.type === paletteSel)) {
      setNotice(`Un seul exemplaire de « ${carte.nom} » par quartier (classe ${CLASSE_LABEL[carte.classe]}).`);
      return;
    }
    if (carte.classe === "I" && batiments.filter((b) => b.type === paletteSel).reduce((s, b) => s + b.level, 0) >= NB_Q) {
      setNotice(`Plafond atteint : la somme des niveaux de « ${carte.nom} » dans la ville ne peut dépasser ${NB_Q} (nombre de quartiers).`);
      return;
    }
    setBatiments((prev) => [
      ...prev,
      { id: nextId("b"), q: selQ, type: paletteSel, cells: [[ci, cj]], level: 1, etat: "intact", owner: carte.etranger ? ownerSel : "Ville" },
    ]);
    setNotice(null);
  };

  const upLevel = (id) => {
    const b = batiments.find((x) => x.id === id);
    if (!b) return;
    if (b.level >= maxNiveau(b.type)) {
      setNotice(`Niveau maximum atteint pour « ${CARTES[b.type].nom} » (borne ${maxNiveau(b.type)}).`);
      return;
    }
    if (CARTES[b.type].classe === "I" && batiments.filter((x) => x.type === b.type).reduce((s, x) => s + x.level, 0) >= NB_Q) {
      setNotice(`Plafond atteint : la somme des niveaux de « ${CARTES[b.type].nom} » dans la ville est déjà de ${NB_Q} (nombre de quartiers).`);
      return;
    }
    setPendingLevel(id);
    setNotice(`Niveau ${b.level + 1} pour « ${CARTES[b.type].nom} » : cliquez une cellule libre adjacente (les candidates sont surlignées en orange).`);
  };

  // ---- Installations portuaires : côtés terre-eau (entre un quartier lacustre et un quartier terrestre) ----
  const PORT_ORDER = ["aucun", "port1", "port2", "port3", "fortifie"];
  const PORT_LABEL = { aucun: "aucun", port1: "port n1", port2: "port n2", port3: "port n3", fortifie: "port fortifié (NFPM)" };
  const PORT_COLOR = { aucun: "#b8b0a0", port1: "#4a6b8a", port2: "#3a5a7a", port3: "#2a4a6a", fortifie: "#1c3a5a" };
  const waterPart = (key) => key.split("|").find((k) => WATER_KEYS.includes(k));
  const waterSides = useMemo(() => sideGeoms.filter((s) => s.key.includes("|") && !!waterPart(s.key)).map((s) => s.key), [sideGeoms]);
  const portEtat = (key) => ports[key] ?? "aucun";
  const cyclePort = (key) => {
    const next = PORT_ORDER[(PORT_ORDER.indexOf(portEtat(key)) + 1) % PORT_ORDER.length];
    if (next === "port1" && !quaiOf(waterPart(key))) {
      setNotice("Un port s'aménage sur un côté terre-eau dont la région d'eau porte un quai : posez d'abord le quai.");
      return;
    }
    setPorts((prev) => ({ ...prev, [key]: next }));
  };

  // ---- Rues : nœuds (centres et milieux d'arête) dans l'emprise, dédupliqués par position ----
  const rueNodes = useMemo(() => {
    const m = new Map();
    const seenPos = new Map();
    const add = (k, pos, perim) => {
      const pk = `${Math.round(pos.x * 10)}_${Math.round(pos.y * 10)}`;
      if (seenPos.has(pk)) return;
      seenPos.set(pk, k);
      m.set(k, { pos, perim });
    };
    for (const qk of QUART_KEYS) {
      const [c, r] = qk.split(",").map(Number);
      add(`C${c},${r}`, ctr(c, r), false);
      for (const [s] of SIDES) {
        const a = (sideAngle(s) * Math.PI) / 180;
        const p = ctr(c, r);
        add(`A${c},${r}${s}`, { x: p.x + apo * Math.cos(a), y: p.y + apo * Math.sin(a) }, !inCity(...neighborOf(c, r, s)));
      }
    }
    return m;
  }, [ctr, apo]);

  const nodeAdj = (k1, k2) => {
    const parse = (k) => {
      const m = k.match(/^([CA])(\d+),(\d+)(\w+)?$/);
      return { t: m[1], c: +m[2], r: +m[3], s: m[4] };
    };
    const a = parse(k1), b = parse(k2);
    if (a.t === "C" && b.t === "C") {
      if (a.c === b.c && a.r === b.r) return true;
      // deux centres de quartiers voisins : tronçon direct, traversant le côté partagé
      for (const [s] of SIDES) {
        const [nc, nr] = neighborOf(a.c, a.r, s);
        if (nc === b.c && nr === b.r) return true;
      }
      return false;
    }
    if (a.t === "C" && b.t === "A") {
      if (a.c === b.c && a.r === b.r) return true;
      const [nc, nr] = neighborOf(b.c, b.r, b.s);
      return nc === a.c && nr === a.r;
    }
    if (a.t === "A" && b.t === "C") {
      if (a.c === b.c && a.r === b.r) return true;
      const [nc, nr] = neighborOf(a.c, a.r, a.s);
      return nc === b.c && nr === b.r;
    }
    // A — A : même position (arête partagée par deux quartiers)
    const [na1, nr1] = neighborOf(a.c, a.r, a.s);
    const [nb1, nb2] = neighborOf(b.c, b.r, b.s);
    return a.c === b.c && a.r === b.r && a.s === b.s
      ? true
      : na1 === b.c && nr1 === b.r && nb1 === a.c && nb2 === a.r;
  };

  // Position d'un nœud recalculée depuis sa clé (robuste aux clés jumelles dédupliquées)
  const posOfKey = (k) => {
    const m = k.match(/^([CA])(\d+),(\d+)(\w+)?$/);
    const p = ctr(+m[2], +m[3]);
    if (m[1] === "C") return p;
    const a = (sideAngle(m[4]) * Math.PI) / 180;
    return { x: p.x + apo * Math.cos(a), y: p.y + apo * Math.sin(a) };
  };

  const clickRueNode = (k) => {
    const node = rueNodes.get(k);
    if (traceRue.length === 0) {
      setTraceRue([k]);
      return;
    }
    const last = traceRue[traceRue.length - 1];
    if (k === last) return;
    if (!nodeAdj(last, k)) { setNotice("Un tronçon de rue relie deux nœuds adjacents (centre et milieu d'arête)."); return; }
    if (node.perim && traceRue.some((x) => rueNodes.get(x).perim)) {
      setNotice("Un milieu d'arête du périmètre ne peut être qu'un point de départ ou d'arrivée de la rue.");
      return;
    }
    setTraceRue([...traceRue, k]);
    setNotice(null);
  };

  const validerRue = () => {
    if (traceRue.length < 2) { setTraceRue([]); return; }
    setRues((prev) => [...prev, { id: nextId("r"), nodes: traceRue.map((k) => ({ k })) }]);
    setTraceRue([]);
    setNotice(null);
  };

  // ---- Fortifications ----
  const cycleFortif = (key) => {
    const order = ["aucun", "mur", "citadelle"];
    const cur = fortifEtat(key);
    setFortif((prev) => ({ ...prev, [key]: order[(order.indexOf(cur) + 1) % 3] }));
  };
  const cyclePorte = (key) => {
    const order = ["ouverte", "fermee", "barricadee"];
    setPortes((prev) => ({ ...prev, [key]: order[(order.indexOf(porteEtat(key)) + 1) % 3] }));
  };

  const tourClick = (c, r, deg) => {
    const key = `${c},${r},${deg}`;
    if (tours.some((t) => t.key === key)) {
      setTours((prev) => prev.filter((t) => t.key !== key));
      return;
    }
    setTours((prev) => [...prev, { id: nextId("t"), key, type: tourSel }]);
  };

  // ---- Contrôles de cohérence ----
  const controles = useMemo(() => {
    const out = [];
    const monuments = batiments.filter((b) => CARTES[b.type].classe === "M");
    out.push([monuments.length <= 1, "Un seul Monument par ville : " + (monuments.length ? monuments.map((b) => CARTES[b.type].nom).join(", ") : "aucun")]);
    for (const qk of QUART_KEYS) {
      const inst = batiments.filter((b) => b.q === qk && CARTES[b.type].classe !== "C");
      out.push([inst.length <= 1, `Quartier ${qk} : ${inst.length} Institution/Monument (maximum 1)`]);
      for (const b of inst)
        out.push([b.level <= NB_Q, `« ${CARTES[b.type].nom} » (${qk}) : niveau ${b.level} / ${NB_Q} quartiers`]);
      for (const t of new Set(inst.map((b) => b.type))) {
        const som = batiments.filter((b) => b.type === t).reduce((s, b) => s + b.level, 0);
        out.push([som <= NB_Q, `« ${CARTES[t].nom} » (somme ville) : ${som} niveaux / ${NB_Q} quartiers`]);
      }
      const stock = batiments.filter((b) => b.q === qk && CARTES[b.type].stockage);
      for (const b of stock)
        out.push([b.level <= 2 * NIVEAU_VILLE, `« ${CARTES[b.type].nom} » (${qk}) : niveau ${b.level} / ${2 * NIVEAU_VILLE} (double du niveau de la ville)`]);
    }
    for (const qk of WATER_KEYS) {
      const q = quaiOf(qk);
      out.push([!!q, `Quartier lacustre ${qk} : ${q ? `quai de niveau ${q.level} (${q.cells.length} cell.), sous-catalogue aquatique débloqué` : "sans quai, construction limitée aux régions de terre"}`]);
      if (q) out.push([sumAqua(qk) <= q.level, `Constructions aquatiques ${qk} : ${sumAqua(qk)} niveaux posés / plafond du quai ${q.level}`]);
    }
    for (const key of waterSides) {
      const pe = portEtat(key);
      if (pe !== "aucun")
        out.push([true, `Côté terre-eau ${key.replace("|", " ↔ ")} : ${PORT_LABEL[pe]}`]);
    }
    const mc = batiments.filter((b) => b.type === "marche").reduce((s, b) => s + b.level, 0);
    for (const t of ["banque", "comptoir"]) {
      const niv = batiments.filter((b) => b.type === t).reduce((s, b) => s + b.level, 0);
      out.push([niv <= Math.floor(mc / 2), `« ${CARTES[t].nom} » : ${niv} niveaux, plafond ${Math.floor(mc / 2)} (moitié du marché)`]);
    }
    out.push([entrees.length > 0, `Entrées dérivées des rues : ${entrees.length ? entrees.length : "aucune (ville sans accès terrestre régulier)"}`]);
    for (const key of gatesInterieur) {
      if (fortifEtat(key) === "aucun") continue;
      const ok = porteEtat(key) === "ouverte";
      out.push([ok, `Porte intérieure ${key.replace("|", " ↔ ")} : ${porteLabel[porteEtat(key)]}${ok ? "" : " — circulation inter-quartiers coupée"}`]);
    }
    return out;
  }, [batiments, entrees, gatesInterieur, waterSides, ports]);

  // ---- Export ----
  const jsonExport = useMemo(() => JSON.stringify({
    ville: { id: "demo-corvallon", nom: VILLE.nom, niveau: VILLE.niveau, sousMarine: false, regions: QUART_KEYS, regionsEau: WATER_KEYS, quais: WATER_KEYS.filter((qk) => quaiOf(qk)).map((qk) => ({ quartier: qk, niveau: quaiOf(qk).level, cellules: quaiOf(qk).cells })), graineRemplissage: 1 },
    constructions: batiments.map((b) => ({ id: b.id, quartier: b.q, type: b.type, classe: CARTES[b.type].classe, cellules: b.cells, niveau: b.level, etat: etatOf(b), proprietaire: b.owner })),
    rues: rues.map((r) => ({ noeuds: r.nodes.map((n) => n.k) })),
    entrees: entrees.map((e) => ({ cote: e, porte: porteEtat(e) })),
    portesInterieures: gatesInterieur.filter((k) => fortifEtat(k) !== "aucun").map((k) => ({ entreQuartiers: k.split("|"), porte: porteEtat(k) })),
    fortifications: sideGeoms.filter((s) => !(!s.perim && waterSides.includes(s.key))).map((s) => ({ cote: s.key, etat: fortifEtat(s.key) })),
    ports: waterSides.filter((k) => portEtat(k) !== "aucun").map((k) => ({ cote: k, etat: portEtat(k) })),
    tours: tours.map((t) => ({ position: t.key, type: t.type })),
  }, null, 2), [batiments, rues, entrees, fortif, portes, tours, gatesInterieur, sideGeoms, waterSides, ports]);

  const selBatiment = batiments.find((b) => b.id === selBat) || null;
  const batInQ = (qk) => batiments.filter((b) => b.q === qk);

  const cityWidth = Rv * Math.sqrt(3) * 6 + Rv;
  const cityHeight = Rv * 1.5 * 4 + Rv;

  return (
    <div className="flex h-screen flex-col bg-stone-100 text-stone-900">
      <header className="border-b border-stone-300 bg-stone-800 px-4 py-2.5 text-white">
        <h1 className="text-base font-semibold">Outil Quartiers — {VILLE.nom}, niveau {VILLE.niveau} (Cité, 4 quartiers)</h1>
        <div className="mt-1 flex gap-1">
          {[["ville", "Ville"], ["quartier", "Quartier"], ["rues", "Rues & entrées"], ["fortif", "Fortifications"]].map(([id, l]) => (
            <button key={id} onClick={() => setView(id)}
              className={`rounded px-3 py-1 text-sm ${view === id ? "bg-stone-200 text-stone-900" : "bg-stone-600 hover:bg-stone-500"}`}>
              {l}
            </button>
          ))}
        </div>
      </header>

      {notice && (
        <div className="flex items-center justify-between border-b border-amber-300 bg-amber-100 px-4 py-1 text-sm text-amber-900">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="underline">Fermer</button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 shrink-0 space-y-3 overflow-y-auto border-r border-stone-300 bg-stone-50 p-3 text-sm">
          {view === "ville" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Quartiers de la ville</p>
              {QUART_KEYS.map((qk) => {
                const inst = batInQ(qk).filter((b) => CARTES[b.type].classe !== "C");
                const cour = batInQ(qk).filter((b) => CARTES[b.type].classe === "C");
                return (
                  <button key={qk} onClick={() => { setSelQ(qk); setView("quartier"); }}
                    className="mb-1 w-full rounded border border-stone-300 bg-white p-2 text-left hover:bg-stone-100">
                    <p className="font-semibold">Quartier {qk}{WATER_KEYS.includes(qk) ? " (lacustre)" : ""}</p>
                    {WATER_KEYS.includes(qk) && (
                      <p className="text-xs text-stone-600">{quaiOf(qk) ? `Quai de niveau ${quaiOf(qk).level} — construction débloquée` : "Quai absent : construction verrouillée (terre uniquement)"}</p>
                    )}
                    {WATER_KEYS.includes(qk) && !quaiOf(qk) && (
                      <span onClick={(e) => { e.stopPropagation(); setSelQ(qk); setPaletteSel("quai"); setView("quartier"); }}
                        className="mt-1 inline-block rounded bg-stone-800 px-2 py-0.5 text-xs text-white">
                        Poser le quai (choix de la cellule)
                      </span>
                    )}
                    <p className="text-xs text-stone-600">Institution / Monument : {inst.length ? inst.map((b) => `${CARTES[b.type].nom} n${b.level}${b.owner !== "Ville" ? " (" + b.owner + ")" : ""}`).join(", ") : "—"}</p>
                    <p className="text-xs text-stone-600">Courants : {cour.length ? cour.map((b) => `${CARTES[b.type].nom} n${b.level}`).join(", ") : "—"}</p>
                  </button>
                );
              })}
              <p className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-800">
                Un quartier accueille au plus une Institution ou un Monument ; les Courants coexistent. Cliquez un quartier pour l'éditer.
              </p>
            </div>
          )}

          {view === "quartier" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Palette — quartier {selQ}</p>
              <select value={paletteSel} onChange={(e) => setPaletteSel(e.target.value)}
                className="w-full rounded border border-stone-300 bg-white px-2 py-1">
                {(WATER_KEYS.includes(selQ) ? ["X", "I", "C"] : ["I", "C", "M"]).map((cl) => (
                  <optgroup key={cl} label={CLASSE_LABEL[cl]}>
                    {Object.entries(CARTES).filter(([, c]) => c.classe === cl && (WATER_KEYS.includes(selQ) ? c.aqua : !c.aqua))
                      .map(([id, c]) => <option key={id} value={id}>{c.sym} — {c.nom}</option>)}
                  </optgroup>
                ))}
              </select>
              {CARTES[paletteSel].etranger && (
                <select value={ownerSel} onChange={(e) => setOwnerSel(e.target.value)}
                  className="mt-1 w-full rounded border border-stone-300 bg-white px-2 py-1 text-xs">
                  {["Ville", "Puissance A", "Puissance B", "Puissance C", "Culte de Lune", "Culte du Feu"].map((o) => <option key={o}>{o}</option>)}
                </select>
              )}
              <p className="mt-1 text-xs text-stone-500">
                {CLASSE_LABEL[CARTES[paletteSel].classe]} — niveau maximum {maxNiveau(paletteSel)}. Un édifice de niveau n occupe n cellules contiguës : cliquez une cellule libre pour le poser, puis étendez-le cellule par cellule adjacente à chaque niveau supplémentaire. Les cellules beiges appartiennent à la bande d'une rue principale : inconstructibles, sauf pour un marché ou une place.
                {WATER_KEYS.includes(selQ) && " Quartier lacustre : sans quai, aucune construction ne se pose ici ; le quai se pose d'abord sur une cellule de rive (surlignée en bleu), puis s'étend sur toute cellule libre adjacente (pontons) ; il monte jusqu'au double du niveau de la ville et borne la somme des niveaux des constructions aquatiques."}
              </p>

              {pendingLevel && (
                <div className="mt-2 rounded border border-amber-400 bg-amber-50 p-2 text-xs">
                  <p>Montée de niveau en cours : cliquez une cellule libre adjacente surlignée en orange, ou annulez.</p>
                  <button onClick={() => { setPendingLevel(null); setNotice(null); }}
                    className="mt-1 w-full rounded border border-stone-400 bg-white px-2 py-1">
                    Annuler l'extension
                  </button>
                </div>
              )}

              {selBatiment && (
                <div className="mt-3 rounded border border-stone-400 bg-white p-2">
                  <p className="font-semibold">{CARTES[selBatiment.type].nom} — niv. {selBatiment.level} ({selBatiment.cells.length} cell.)</p>
                  <p className="mb-1 text-xs text-stone-500">Propriétaire : {selBatiment.owner}</p>
                  <button onClick={() => cycleEtat(selBatiment.id)}
                    className="mb-1 w-full rounded border border-stone-400 bg-white px-2 py-1 text-xs">
                    État : {ETAT_LABEL[etatOf(selBatiment)]} (cliquer pour changer)
                  </button>
                  <p className="mb-1 text-xs text-stone-600">
                    Niveaux disponibles pour augmentation : {Math.max(0, Math.min(maxNiveau(selBatiment.type) - selBatiment.level, CARTES[selBatiment.type].classe === "I" ? NB_Q - batiments.filter((b) => b.type === selBatiment.type).reduce((s, b) => s + b.level, 0) : Infinity))} (plafond {maxNiveau(selBatiment.type)}{CARTES[selBatiment.type].stockage ? ", double du niveau de la ville" : CARTES[selBatiment.type].classe === "I" ? " : somme des niveaux de ce type dans la ville limitée au nombre de quartiers" : ""})
                  </p>
                  <div className="flex gap-1">
                    <button onClick={() => upLevel(selBatiment.id)} className="flex-1 rounded bg-stone-800 px-2 py-1 text-xs text-white">Niveau +1</button>
                    <button onClick={() => { setBatiments((p) => p.filter((b) => b.id !== selBatiment.id)); setSelBat(null); }}
                      className="rounded border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700">Suppr.</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {view === "rues" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Rues principales</p>
              <p className="text-xs text-stone-600">Cliquez les nœuds pour tracer une rue : du périmètre vers l'intérieur, ou entre quartiers. Un point du périmètre doit être le départ ou l'arrivée. Chaque côté du périmètre utilisé devient une entrée ; chaque côté intérieur traversé devient une porte intérieure si ce côté est fortifié.</p>
              <div className="mt-2 flex gap-1">
                <button onClick={validerRue} className="flex-1 rounded bg-stone-800 px-2 py-1 text-xs text-white">Valider la rue ({traceRue.length})</button>
                <button onClick={() => setTraceRue([])} className="rounded border border-stone-300 bg-white px-2 py-1 text-xs">Annuler</button>
              </div>
              <p className="mt-2 text-xs font-semibold text-stone-600">Rues :</p>
              {rues.map((r) => (
                <p key={r.id} className="text-xs text-stone-600">
                  {r.id} : {r.nodes.map((n) => n.k).join(" → ")}
                </p>
              ))}
              <p className="mt-2 text-xs font-semibold text-stone-600">Entrées dérivées :</p>
              {entrees.length ? entrees.map((e) => (
                <p key={e} className="text-xs text-stone-600">Côté {e} — porte {porteLabel[porteEtat(e)]}</p>
              )) : <p className="text-xs text-stone-500">Aucune.</p>}
              <p className="mt-2 text-xs font-semibold text-stone-600">Portes intérieures (côtés entre quartiers traversés) :</p>
              {gatesInterieur.length ? gatesInterieur.map((key) => (
                <p key={key} className="text-xs text-stone-600">
                  {key.replace("|", " ↔ ")} — {fortifEtat(key) === "aucun" ? "côté non fortifié (passage libre)" : `porte ${porteLabel[porteEtat(key)]}`}
                </p>
              )) : <p className="text-xs text-stone-500">Aucune.</p>}
            </div>
          )}

          {view === "fortif" && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Fortifications</p>
              <p className="text-xs text-stone-600">Cliquez un côté, du périmètre ou entre quartiers : aucun → mur → citadelle (le survol affiche l'état actuel ; les côtés intérieurs non fortifiés sont en pointillés gris). Une porte apparaît sur les entrées et les côtés intérieurs fortifiés traversés par une rue — cliquez-la pour changer son état. Cliquez un sommet pour poser ou retirer une tour du type choisi.</p>
              <p className="mt-1 text-[11px] text-stone-600">Côtés terre-eau (entre quartier lacustre et quartier terrestre) : installations portuaires — aucun → port n1 → port n2 → port n3 → port fortifié (NFPM) ; le premier aménagement exige un quai sur la région d'eau. Les tours sous-marines se posent aux sommets.</p>
              <p className="mt-1 text-[11px] text-stone-500">Couleurs : pointillés gris = aucun, brun = mur, brun sombre = citadelle, bleu = côté porte, bleu sombre = installations portuaires.</p>
              <p className="mt-2 text-xs font-semibold text-stone-600">Installations portuaires :</p>
              {waterSides.map((key) => (
                <p key={key} className="text-xs text-stone-600">{key.replace("|", " ↔ ")} — {PORT_LABEL[portEtat(key)]}</p>
              ))}
              <p className="mt-2 mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Type de tour</p>
              <select value={tourSel} onChange={(e) => setTourSel(e.target.value)}
                className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-xs">
                {Object.entries(TOUR_TYPES).map(([id, t]) => <option key={id} value={id}>{t.nom}</option>)}
              </select>
              <p className="mt-2 text-xs font-semibold text-stone-600">Tours posées :</p>
              {tours.map((t) => (
                <p key={t.id} className="text-xs text-stone-600">{TOUR_TYPES[t.type].nom} — sommet {t.key}</p>
              ))}
            </div>
          )}

          <div className="pt-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Contrôles de cohérence</p>
            <ul className="space-y-1 text-xs">
              {controles.map(([ok, txt], i) => (
                <li key={i} className={ok ? "text-green-700" : "text-red-700"}>{ok ? "✔ " : "✘ "}{txt}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button onClick={() => setShowJson(!showJson)} className="w-full rounded bg-stone-800 px-2 py-1 text-xs text-white">
              {showJson ? "Masquer" : "Voir"} l'export JSON
            </button>
            {showJson && <textarea readOnly value={jsonExport} className="mt-2 h-56 w-full rounded border border-stone-300 bg-white p-2 font-mono text-[10px]" />}
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4">
          {(view === "ville" || view === "rues" || view === "fortif") && (
            <svg viewBox={`0 0 ${cityWidth} ${cityHeight}`} className="mx-auto max-w-full" style={{ height: "88%" }}>
              {QUART_KEYS.map((qk) => {
                const [c, r] = qk.split(",").map(Number);
                const p = ctr(c, r);
                const pts = cornersOf(p.x, p.y).map((x) => x.join(",")).join(" ");
                const bats = batInQ(qk);
                return (
                  <g key={qk} onClick={() => { setSelQ(qk); if (view === "ville") setView("quartier"); }} className="cursor-pointer">
                    <polygon points={pts} fill={WATER_KEYS.includes(qk) ? "#7a94aa" : "#8f8778"} stroke="#3a3530" strokeWidth={view === "quartier" || selQ === qk ? 2.5 : 1.5} />
                    <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={11} fill="#1c1917" fontWeight="bold">Quartier {qk}{WATER_KEYS.includes(qk) ? " (lacustre)" : ""}</text>
                    {WATER_KEYS.includes(qk) && quaiOf(qk) && (
                      <text x={p.x} y={p.y + 2} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#1c3a5a" pointerEvents="none">Qa n{quaiOf(qk).level}</text>
                    )}
                    {bats.slice(0, 3).map((b, i) => (
                      <text key={b.id} x={p.x} y={p.y + i * 13} textAnchor="middle" fontSize={10} fill="#2a2520">
                        {CARTES[b.type].sym} n{b.level}{b.owner !== "Ville" ? ` (${b.owner})` : ""}
                      </text>
                    ))}
                    {bats.length > 3 && (
                      <text x={p.x} y={p.y + 39} textAnchor="middle" fontSize={10} fill="#2a2520">…</text>
                    )}
                  </g>
                );
              })}

              {/* Fortifications : périmètre et côtés intérieurs entre quartiers */}
              {(view === "fortif" || view === "ville") && sideGeoms.map(({ key, mx, my, ang, perim }) => {
                const etat = fortifEtat(key);
                const isEntr = perim && entrees.includes(key);
                const isGate = !perim && gatesInterieur.includes(key);
                const isWaterSide = !perim && waterSides.includes(key);
                const petat = isWaterSide ? portEtat(key) : "aucun";
                if (view === "ville" && (isWaterSide
                  ? petat === "aucun"
                  : ((perim && !isEntr && etat === "mur") || (!perim && etat === "aucun")))) return null;
                const dx = (Rv / 2) * Math.cos(ang), dy = (Rv / 2) * Math.sin(ang);
                const gateVisible = !isWaterSide && (isEntr || (isGate && etat !== "aucun")) && etat !== "aucun";
                const sideColor = isWaterSide ? PORT_COLOR[petat] : gateVisible ? "#4a6b8a" : fortifColor[etat];
                const sideW = isWaterSide ? (petat === "aucun" ? 2 : 8) : etat === "aucun" ? 2 : perim ? 7 : 6;
                return (
                  <g key={key}>
                    {/* trait visible */}
                    <line x1={mx - dx} y1={my - dy} x2={mx + dx} y2={my + dy}
                      stroke={sideColor}
                      strokeWidth={sideW}
                      strokeDasharray={(isWaterSide ? petat : etat) === "aucun" ? "2 5" : undefined}
                      pointerEvents="none" />
                    {/* zone de clic élargie (invisible) : un clic fait progresser l'état du côté */}
                    {view === "fortif" && (
                      <line x1={mx - dx} y1={my - dy} x2={mx + dx} y2={my + dy}
                        stroke="transparent" strokeWidth={16} pointerEvents="all" className="cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); isWaterSide ? cyclePort(key) : cycleFortif(key); }}>
                        <title>{isWaterSide
                          ? `Côté terre-eau ${key.replace("|", " ↔ ")} : ${PORT_LABEL[petat]}`
                          : key.includes("|") ? `Côté intérieur ${key.replace("|", " ↔ ")} : ${fortifEtat(key)}` : `Côté ${key} : ${fortifEtat(key)}`}</title>
                      </line>
                    )}
                    {/* installations portuaires : marqueur d'ancre sur un côté aménagé */}
                    {view === "fortif" && isWaterSide && petat !== "aucun" && (
                      <g pointerEvents="none">
                        <circle cx={mx} cy={my} r={11} fill="#fffdf5" stroke={PORT_COLOR[petat]} strokeWidth={2} />
                        <text x={mx} y={my + 3.5} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#1c3a5a">P</text>
                      </g>
                    )}
                    {/* porte : marqueur cliquable (entrée extérieure ou porte intérieure fortifiée) */}
                    {view === "fortif" && gateVisible && (
                      <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); cyclePorte(key); }}>
                        <title>Porte : {porteLabel[porteEtat(key)]}</title>
                        <circle cx={mx} cy={my} r={11} fill="#fffdf5" stroke="#4a6b8a" strokeWidth={2} />
                        <text x={mx} y={my + 3.5} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#1c3a5a" pointerEvents="none">P</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Entrées : étiquette de porte */}
              {view !== "quartier" && entrees.map((key) => {
                const [c, r, s] = key.split(",");
                const cc = ctr(+c, +r);
                const a = (sideAngle(s) * Math.PI) / 180;
                return (
                  <text key={"e" + key} x={cc.x + (apo + 14) * Math.cos(a)} y={cc.y + (apo + 14) * Math.sin(a) + 4}
                    textAnchor="middle" fontSize={10} fontWeight="bold" fill="#1c3a5a" pointerEvents="none">
                    P
                  </text>
                );
              })}

              {/* Tours posées */}
              {view !== "quartier" && tours.map((t) => {
                const [c, r, deg] = t.key.split(",");
                const cc = ctr(+c, +r);
                const a = (deg * Math.PI) / 180;
                const tx = cc.x + Rv * Math.cos(a), ty = cc.y + Rv * Math.sin(a);
                return (
                  <g key={t.id} className={view === "fortif" ? "cursor-pointer" : ""}
                    onClick={(e) => { e.stopPropagation(); if (view === "fortif") tourClick(+c, +r, +deg); }}>
                    <circle cx={tx} cy={ty} r={9} fill="#fffdf5" stroke={TOUR_TYPES[t.type].color} strokeWidth={2} />
                    <text x={tx} y={ty + 3.5} textAnchor="middle" fontSize={10} fontWeight="bold" fill={TOUR_TYPES[t.type].color} pointerEvents="none">
                      {TOUR_TYPES[t.type].sym}
                    </text>
                  </g>
                );
              })}

              {/* Sommets cliquables en vue fortifications */}
              {view === "fortif" && QUART_KEYS.map((qk) => {
                const [c, r] = qk.split(",").map(Number);
                const cc = ctr(c, r);
                return Array.from({ length: 6 }, (_, k) => {
                  const deg = -90 + 60 * k;
                  const a = (deg * Math.PI) / 180;
                  const vx = cc.x + Rv * Math.cos(a), vy = cc.y + Rv * Math.sin(a);
                  return <circle key={qk + k} cx={vx} cy={vy} r={8} fill="transparent" pointerEvents="all" stroke="#b45309" strokeOpacity={0.7}
                    className="cursor-pointer" onClick={(e) => { e.stopPropagation(); tourClick(c, r, deg); }} />;
                });
              })}

              {/* Rues */}
              {(view === "rues" || view === "fortif") && rues.map((r) => {
                const pts = r.nodes.map((n) => { const p = posOfKey(n.k); return `${p.x},${p.y}`; }).join(" ");
                return <polyline key={r.id} points={pts} fill="none" stroke="#a89468" strokeWidth={7} pointerEvents="none" />;
              })}

              {/* Nœuds de rue cliquables */}
              {view === "rues" && [...rueNodes.entries()].map(([k, nd]) => (
                <circle key={k} cx={nd.pos.x} cy={nd.pos.y} r={nd.perim ? 6 : 4.5}
                  fill={traceRue.includes(k) ? "#b91c1c" : nd.perim ? "#b45309" : "#444"}
                  className="cursor-pointer" onClick={(e) => { e.stopPropagation(); clickRueNode(k); }} />
              ))}
              {view === "rues" && traceRue.length > 0 && (() => {
                const pts = traceRue.map((k) => { const p = posOfKey(k); return `${p.x},${p.y}`; }).join(" ");
                return <polyline points={pts} fill="none" stroke="#b91c1c" strokeWidth={4} strokeDasharray="5 4" pointerEvents="none" />;
              })()}
            </svg>
          )}

          {view === "quartier" && (() => {
            const pts = mkCorners(Rq)(0, 0).map((x) => x.join(",")).join(" ");
            return (
              <svg viewBox={`${-Rq - 10} ${-Rq - 10} ${2 * Rq + 20} ${2 * Rq + 20}`} className="mx-auto max-w-full" style={{ height: "88%" }}>
                <polygon points={pts} fill={WATER_KEYS.includes(selQ) ? "#7a94aa" : "#8f8778"} stroke="#3a3530" strokeWidth={2} />
                {/* Découpe au contour de l'hexagone : les cellules des bords deviennent des demi-cases */}
                <defs>
                  <clipPath id="hexClip"><polygon points={pts} /></clipPath>
                </defs>
                <g clipPath="url(#hexClip)">
                {WATER_KEYS.includes(selQ) && !quaiOf(selQ) && (
                  <text x={0} y={-Rq + 26} textAnchor="middle" fontSize={10} fill="#1c3a5a" pointerEvents="none">Quai non posé — construction verrouillée</text>
                )}
                {/* Grille fine */}
                {cellsInHex.map(([ci, cj, x, y]) => {
                  const free = cellFree(selQ, ci, cj);
                  const band = inRueBand(ci, cj);
                  const pendB = pendingLevel ? batiments.find((x2) => x2.id === pendingLevel) : null;
                  const isCand = !!pendB && free && pendB.q === selQ
                    && pendB.cells.some(([i, j]) => Math.abs(i - ci) + Math.abs(j - cj) === 1);
                  const quaiCand = !pendB && free && paletteSel === "quai" && WATER_KEYS.includes(selQ) && !quaiOf(selQ) && isQuaiCell(ci, cj);
                  return (
                    <rect key={`${ci}-${cj}`} x={x - CS / 2 + 1.5} y={y - CS / 2 + 1.5} width={CS - 3} height={CS - 3}
                      fill={isCand ? "#f59e0b" : !free ? "#e8e0d0" : quaiCand ? "#7aa9d9" : band ? "#dcc394" : "#fffdf5"}
                      fillOpacity={free || isCand ? 0.55 : 0.55}
                      stroke={isCand ? "#b45309" : quaiCand ? "#1c3a5a" : "#6b655c"} strokeWidth={isCand || quaiCand ? 2.5 : 0.8}
                      className={free || isCand ? "cursor-pointer" : ""}
                      onClick={() => placeBatiment(ci, cj)}>
                      {quaiCand && <title>Cellule de rive : emplacement éligible pour le quai</title>}
                      {band && <title>Bande de la rue : inconstructible, sauf marché ou place</title>}
                    </rect>
                  );
                })}
                {/* Constructions : un édifice de niveau n couvre n cellules contiguës */}
                {batiments.filter((b) => b.q === selQ).map((b) => {
                  const c = CARTES[b.type];
                  const etat = etatOf(b);
                  const cellPts = b.cells
                    .map(([i, j]) => cellsInHex.find(([ci, cj]) => ci === i && cj === j))
                    .filter(Boolean);
                  const lx = cellPts.reduce((s, [, , x]) => s + x, 0) / cellPts.length;
                  const ly = cellPts.reduce((s, [, , , y]) => s + y, 0) / cellPts.length;
                  return (
                    <g key={b.id} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelBat(b.id); }}>
                      {cellPts.map(([i, j, x, y]) => (
                        <rect key={`${i}-${j}`} x={x - CS / 2 + 1.5} y={y - CS / 2 + 1.5} width={CS - 3} height={CS - 3} rx={3}
                          fill={CLASSE_COLOR[c.classe]} fillOpacity={etat === "ruine" ? 0.35 : etat === "endommage" ? 0.6 : 0.85}
                          stroke={selBat === b.id ? "#b91c1c" : "#2a2520"} strokeWidth={selBat === b.id ? 3 : 1}
                          strokeDasharray={etat !== "intact" ? (etat === "ruine" ? "3 4" : "6 4") : undefined}>
                          <title>{`${c.nom} n${b.level} — ${ETAT_LABEL[etat]}`}</title>
                        </rect>
                      ))}
                      <text x={lx} y={ly - 2} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#fffbf0" pointerEvents="none">{c.sym}</text>
                      <text x={lx} y={ly + 10} textAnchor="middle" fontSize={9} fill="#fffbf0" pointerEvents="none">n{b.level}</text>
                      {b.owner !== "Ville" && (
                        <text x={lx} y={ly + 20} textAnchor="middle" fontSize={7.5} fill="#ffe9c9" pointerEvents="none">{b.owner.slice(0, 8)}</text>
                      )}
                    </g>
                  );
                })}
                </g>
              </svg>
            );
          })()}
        </main>
      </div>
    </div>
  );
}
