
// ============================================================================
// MOTEUR VILLES — Édition 8 « Mondes Fantastiques », module v0.1
// ----------------------------------------------------------------------------
// Module pur (aucune dépendance, aucun DOM) : consolidation du modèle de
// données « Villes » (voir le canevas « Modèle de données — Villes »).
// Consommé par l'éditeur de carte (création) et l'application MdM (partie).
//
// Conventions géométriques partagées avec toutes les maquettes :
//   - hexagones pointy-top odd-r ; voisinage par tables paires/impaires ;
//   - angles dans le repère SVG (y vers le bas) : E 0°, SE 60°, SO 120°,
//     O 180°, NO 240°, NE 300° (référence corrigée du 25 octobre 2026) ;
//   - nœuds : C{c},{r} (centre), A{c},{r}{côté} (milieu d'arête) ;
//   - clés de côté : périmètre « c,r,côté » ; intérieur « qkA|qkB » triées.
//
// Règles arbitrées implémentées :
//   - emprise 1/3/4/7 régions selon le niveau (0-2 → 1, 3-5 → 3, 6-8 → 4,
//     9-12 → 7), connexité exigée, quotas d'eau (1 pour 3-4 régions,
//     3 pour 7 ; ville sous-marine : tout en mer) ;
//   - grille fine 7×7, demi-cases retenues (découpage au rendu) ;
//   - un édifice de niveau n occupe n cellules contiguës (adjacence
//     orthogonale) ; montée de niveau = extension d'une cellule adjacente ;
//   - bande de rue inconstructible, sauf marché et place ;
//   - classes d'emprise : Institution (une instance par quartier, somme des
//     niveaux dans la ville ≤ nombre de quartiers), Courant (une instance par
//     quartier, cartes de stockage bornées à 2 × niveau de ville), Monument
//     (unique par ville) ; bornes croisées É7 : banque + comptoir ≤ ½ marché ;
//   - quai (ouvrage de contact) : pose initiale sur cellule de rive, extension
//     libre sur cellule adjacente (pontons), niveau max 2 × niveau de ville ;
//     sans quai aucune construction ; somme des niveaux aquatiques ≤ niveau
//     du quai ; premier aménagement portuaire conditionné au quai ;
//   - entrées et portes intérieures toujours dérivées des rues ;
//   - états de construction : intact / endommagé / ruiné (initialisation) ;
//   - identifiants uniques jamais réutilisés (compteur global) ;
//   - remplissage décoratif déterministe (graine enregistrée, mulberry32).
//
// Exécution des jeux d'essais : runTests() en console renvoie la liste des
// contrôles { nom, ok } ; 53 jeux d'essais au vert (45 à la livraison, 8 ajoutés
// avec l'arbitrage « fortification porteuse » du 25 octobre 2026).
// ============================================================================

const MOTEUR_VILLES = (function () {
  // ---- Conventions géométriques partagées (identiques aux maquettes) ----
  const SIDES = [["E", 0], ["SE", 60], ["SO", 120], ["O", 180], ["NO", 240], ["NE", 300]];
  const sideAngle = (s) => (SIDES.find(([nm]) => nm === s) || [null, 0])[1];
  const neighborOf = (c, r, s) => {
    const even = { E: [1, 0], NE: [0, -1], NO: [-1, -1], O: [-1, 0], SO: [-1, 1], SE: [0, 1] };
    const odd = { E: [1, 0], NE: [1, -1], NO: [0, -1], O: [-1, 0], SO: [0, 1], SE: [1, 1] };
    const [dc, dr] = (r % 2 === 0 ? even : odd)[s];
    return [c + dc, r + dr];
  };
  const sideBetween = (qk1, qk2) => {
    const [c, r] = qk1.split(",").map(Number);
    for (const [s] of SIDES) { const [nc, nr] = neighborOf(c, r, s); if (`${nc},${nr}` === qk2) return s; }
    return null;
  };
  const innerKey = (qkA, qkB) => [qkA, qkB].sort().join("|");

  // ---- Grille fine 7 × 7 (cellules retenues, demi-cases comprises) ----
  const NB = 7, CS = 42, Rq = 190, apoQ = (Rq * Math.sqrt(3)) / 2;
  const CELLS = (() => {
    const out = [];
    for (let i = 0; i < NB; i++) for (let j = 0; j < NB; j++) {
      const x = (i - 3) * CS, y = (j - 3) * CS;
      let ok = true;
      for (const [s] of SIDES) {
        const a = (sideAngle(s) * Math.PI) / 180;
        if (Math.abs(x * Math.cos(a) + y * Math.sin(a)) > apoQ + CS * 0.35) ok = false;
      }
      if (ok) out.push([i, j, x, y]);
    }
    return out;
  })();
  const cellKey = (i, j) => `${i},${j}`;
  const hasCell = (i, j) => CELLS.some(([ci, cj]) => ci === i && cj === j);

  // ---- Catalogue (extrait conforme aux maquettes) ----
  // classe : I = Institution, C = Courant, M = Monument, X = Ouvrage de contact
  // aqua = sous-catalogue aquatique ; stockage = carte de stockage (borne 2 × niveau ville)
  const CATALOGUE = {
    marche: { nom: "Marché", classe: "I" },
    banque: { nom: "Banque", classe: "I" },
    comptoir: { nom: "Comptoir", classe: "I" },
    ambassade: { nom: "Ambassade permanente", classe: "I" },
    caserne: { nom: "Caserne", classe: "I" },
    academie: { nom: "Académie militaire", classe: "I" },
    emagie: { nom: "École de magie", classe: "I" },
    biblio: { nom: "Bibliothèque", classe: "I" },
    chantier: { nom: "Chantier naval", classe: "I", aqua: true },
    entrepot: { nom: "Entrepôt", classe: "C", stockage: true },
    grenier: { nom: "Grenier", classe: "C", stockage: true },
    puits: { nom: "Puits et citerne", classe: "C" },
    temple: { nom: "Temple", classe: "C" },
    place: { nom: "Place", classe: "C" },
    cathedrale: { nom: "Cathédrale", classe: "M" },
    universite: { nom: "Université", classe: "M" },
    chateau: { nom: "Château fort", classe: "M" },
    arene: { nom: "Arène", classe: "M" },
    quai: { nom: "Quai", classe: "X", aqua: true },
    pilotis: { nom: "Entrepôt sur pilotis", classe: "C", aqua: true, stockage: true },
  };
  const CLASSE_LABEL = { I: "Institution", C: "Courant", M: "Monument", X: "Ouvrage de contact" };
  const ETATS = ["intact", "endommage", "ruine"];
  const PORTES_ETATS = ["ouverte", "fermee", "barricadee"];
  const PORTS_ETATS = ["aucun", "port1", "port2", "port3", "fortifie"];
  // Tours de fortification (arbitrage du 25 octobre 2026 : fortification porteuse)
  // — guet : sommet, sans porteur ; tours de tir : côté fortifié porteur.
  const TYPES_TOURS = {
    guet: { nom: "Tour de guet" },
    archers: { nom: "Tour d'archers" },
    artillerie: { nom: "Tour d'artillerie" },
    mage: { nom: "Tour de mage" },
    sousmarine: { nom: "Tour sous-marine", maritime: true },
    baliste: { nom: "Tour de balistes" },
  };
  const FORTIF_ETATS = ["aucun", "mur", "citadelle"];
  const SOMMETS = [-90, -30, 30, 90, 150, 210];

  // ---- Emprise : niveaux 0-12, tailles 1/3/4/7 ----
  const empriseParNiveau = (n) => (n <= 2 ? 1 : n <= 5 ? 3 : n <= 8 ? 4 : 7);
  const orientationsFor = (c, r, taille) => {
    if (taille === 1) return [[`${c},${r}`]];
    const voisins = SIDES.map(([s]) => neighborOf(c, r, s).join(","));
    if (taille === 7) return [[`${c},${r}`, ...voisins]];
    const out = [];
    for (let k = 0; k < 6; k++) {
      const trio = [voisins[k], voisins[(k + 1) % 6], voisins[(k + 2) % 6]];
      out.push([`${c},${r}`, ...(taille === 3 ? trio.slice(0, 2) : trio)]);
    }
    return out;
  };
  const connexe = (regions) => {
    const set = new Set(regions), vu = new Set([regions[0]]), pile = [regions[0]];
    while (pile.length) { const qk = pile.pop(); const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) { const nk = neighborOf(c, r, s).join(","); if (set.has(nk) && !vu.has(nk)) { vu.add(nk); pile.push(nk); } } }
    return vu.size === set.size;
  };
  const validerEmprise = ({ niveau, sousMarine, regions, regionsEau }) => {
    const motifs = [];
    const uniq = [...new Set(regions)];
    if (uniq.length !== regions.length) motifs.push("Régions dupliquées dans l'emprise.");
    const attendu = empriseParNiveau(niveau);
    if (uniq.length !== attendu) motifs.push(`Emprise de ${uniq.length} région(s) : ${attendu} attendue(s) pour un niveau ${niveau}.`);
    if (uniq.length && !connexe(uniq)) motifs.push("Emprise non connexe.");
    const eau = new Set(regionsEau || []);
    const nbEau = uniq.filter((q) => eau.has(q)).length;
    if (sousMarine) { if (nbEau !== uniq.length) motifs.push("Ville sous-marine : toutes les régions doivent être en mer."); }
    else {
      const max = attendu === 7 ? 3 : attendu >= 3 ? 1 : 0;
      if (nbEau > max) motifs.push(`Quota d'eau dépassé : ${nbEau} région(s) de mer pour un maximum de ${max}.`);
    }
    return { ok: motifs.length === 0, motifs };
  };

  // ---- Dérivations des rues : entrées, portes intérieures ----
  const perimSides = (ville) => {
    const set = new Set();
    const regs = new Set(ville.regions);
    for (const qk of ville.regions) { const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) if (!regs.has(neighborOf(c, r, s).join(","))) set.add(`${c},${r},${s}`); }
    return [...set];
  };
  const deriverRues = (ville) => {
    const perim = new Set(perimSides(ville));
    const regs = new Set(ville.regions);
    const entrees = new Set(), inter = new Set();
    for (const rue of ville.rues || []) {
      for (const n of rue.nodes) {
        const m = n.k.match(/^A(\d+),(\d+)(\w+)$/);
        if (!m) continue;
        const key = `${m[1]},${m[2]},${m[3]}`;
        if (perim.has(key)) entrees.add(key);
        const nk = neighborOf(+m[1], +m[2], m[3]).join(",");
        if (regs.has(nk)) inter.add(innerKey(`${m[1]},${m[2]}`, nk));
      }
      const ks = rue.nodes.map((n) => n.k);
      for (let i = 1; i < ks.length; i++) {
        const p = ks[i - 1].match(/^C(\d+),(\d+)$/), q = ks[i].match(/^C(\d+),(\d+)$/);
        if (!p || !q) continue;
        const adj = SIDES.some(([s]) => { const [nc, nr] = neighborOf(+p[1], +p[2], s); return nc === +q[1] && nr === +q[2]; });
        if (adj) inter.add(innerKey(`${p[1]},${p[2]}`, `${q[1]},${q[2]}`));
      }
    }
    return { entrees: [...entrees], portesInterieures: [...inter] };
  };
  // Bande de rue d'un quartier : cellules traversées par les tracés
  // (projection locale des nœuds ; tronçon direct centre-centre inclus).
  const rueCells = (ville, qk) => {
    const [qc, qr] = qk.split(",").map(Number);
    const sideToward = (c, r) => { for (const [s] of SIDES) { const [nc, nr] = neighborOf(qc, qr, s); if (nc === c && nr === r) return s; } return null; };
    const localPoint = (k) => {
      const m = k.match(/^([CA])(\d+),(\d+)(\w+)?$/);
      if (!m) return null;
      const t = m[1], c = +m[2], r = +m[3], s = m[4];
      if (t === "C" && c === qc && r === qr) return { x: 0, y: 0 };
      if (t === "A" && c === qc && r === qr) { const a = (sideAngle(s) * Math.PI) / 180; return { x: apoQ * Math.cos(a), y: apoQ * Math.sin(a) }; }
      const st = sideToward(c, r); if (!st) return null;
      const a = (sideAngle(st) * Math.PI) / 180; return { x: apoQ * Math.cos(a), y: apoQ * Math.sin(a) };
    };
    const segs = [];
    for (const rue of ville.rues || []) {
      const pts = rue.nodes.map((n) => localPoint(n.k));
      for (let i = 1; i < pts.length; i++)
        if (pts[i - 1] && pts[i] && (pts[i - 1].x !== pts[i].x || pts[i - 1].y !== pts[i].y)) segs.push([pts[i - 1], pts[i]]);
    }
    const band = CS * 0.8, out = new Set();
    for (const [i, j, x, y] of CELLS) {
      for (const [a, b] of segs) {
        const vx = b.x - a.x, vy = b.y - a.y;
        const tt = Math.max(0, Math.min(1, ((x - a.x) * vx + (y - a.y) * vy) / (vx * vx + vy * vy || 1)));
        const px = a.x + tt * vx, py = a.y + tt * vy;
        if (Math.hypot(x - px, y - py) < band) { out.add(cellKey(i, j)); break; }
      }
    }
    return [...out];
  };
  // Rives d'un quartier lacustre : bande le long des côtés non adjacents
  // à une autre région d'eau (pose initiale du quai).
  const deriverRives = (ville, qk) => {
    const [c, r] = qk.split(",").map(Number);
    const eau = new Set(ville.regionsEau || []);
    const band = CS * 0.8, out = new Set();
    for (const [s] of SIDES) {
      if (eau.has(neighborOf(c, r, s).join(","))) continue;
      const a = (sideAngle(s) * Math.PI) / 180, nx = Math.cos(a), ny = Math.sin(a);
      for (const [i, j, x, y] of CELLS) if (x * nx + y * ny >= apoQ - band) out.add(cellKey(i, j));
    }
    return [...out];
  };
  // Côtés terre-eau (installations portuaires) : « qkA|qkB » avec une région d'eau.
  const terreEauSides = (ville) => {
    const eau = new Set(ville.regionsEau || []);
    const out = new Set();
    for (const qk of ville.regions) { const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) { const nk = neighborOf(c, r, s).join(",");
        if (eau.has(qk) !== eau.has(nk) && ville.regions.includes(nk)) out.add(innerKey(qk, nk)); } }
    return [...out];
  };

  // ---- Occupation, contiguïté, classes d'emprise ----
  const consof = (ville, qk) => (ville.constructions || []).filter((b) => b.q === qk);
  const occupied = (ville, qk) => new Set(consof(ville, qk).flatMap((b) => b.cells.map(([i, j]) => cellKey(i, j))));
  const contigu = (cells) => {
    const keys = new Set(cells.map(([i, j]) => cellKey(i, j))), vu = new Set([cellKey(...cells[0])]), pile = [cells[0]];
    while (pile.length) { const [i, j] = pile.pop();
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = cellKey(i + di, j + dj);
        if (keys.has(k) && !vu.has(k)) { vu.add(k); pile.push([i + di, j + dj]); } } }
    return vu.size === keys.size;
  };
  const sumLevels = (ville, filtre) => (ville.constructions || []).filter(filtre).reduce((s, b) => s + b.level, 0);
  const quaiOf = (ville, qk) => consof(ville, qk).find((b) => CATALOGUE[b.type].classe === "X");

  // ---- Contrôles de pose : refus motivé ou acceptation ----
  // opts.excludeIds : identifiants ignorés pour l'occupation et l'unicité
  // (montée de niveau d'une construction existante = extension).
  const controlesPose = (ville, qk, type, cells, opts = {}) => {
    const motifs = [];
    const carte = CATALOGUE[type];
    if (!carte) return { ok: false, motifs: ["Type inconnu au catalogue."] };
    if (!ville.regions.includes(qk)) return { ok: false, motifs: ["Quartier hors de l'emprise de la ville."] };
    const eauQ = (ville.regionsEau || []).includes(qk);
    const level = cells.length; // règle : un édifice de niveau n occupe n cellules
    if (!cells.length) motifs.push("Aucune cellule.");
    if (new Set(cells.map(([i, j]) => cellKey(i, j))).size !== cells.length) motifs.push("Cellules dupliquées.");
    if (cells.some(([i, j]) => !hasCell(i, j))) motifs.push("Cellule hors de la grille fine.");
    if (cells.length && !contigu(cells)) motifs.push("Cellules non contiguës (adjacence orthogonale exigée).");
    const occ = occupied(ville, qk);
    const excls = opts.excludeIds || [];
    const proprioDe = (i, j) => consof(ville, qk).find((b) => b.cells.some(([ci, cj]) => ci === i && cj === j));
    if (cells.some(([i, j]) => { const p = occ.has(cellKey(i, j)) ? proprioDe(i, j) : null; return p && !excls.includes(p.id); }))
      motifs.push("Cellule déjà occupée.");
    // Bande de rue inconstructible, sauf marché et place
    if (carte.classe !== "X" && !["marche", "place"].includes(type)) {
      const rc = new Set(rueCells(ville, qk));
      if (cells.some(([i, j]) => rc.has(cellKey(i, j)))) motifs.push("Cellule dans la bande de rue (marché et place exceptés).");
    }
    const NBQ = ville.regions.length;
    if (carte.classe === "X") { // quai
      if (!eauQ) motifs.push("Un quai se pose dans un quartier lacustre.");
      if (consof(ville, qk).some((b) => CATALOGUE[b.type].classe === "X" && !excls.includes(b.id))) motifs.push("Un seul quai par région d'eau.");
      if (level === 1) { const rives = new Set(deriverRives(ville, qk));
        if (!cells.every(([i, j]) => rives.has(cellKey(i, j)))) motifs.push("Pose initiale du quai : cellule de rive exigée."); }
      if (level > 2 * ville.niveau) motifs.push(`Niveau ${level} supérieur au maximum du quai (${2 * ville.niveau}).`);
    } else if (carte.aqua) { // sous-catalogue aquatique
      if (!eauQ) motifs.push("Construction aquatique : quartier lacustre requis.");
      const q = quaiOf(ville, qk);
      if (!q) motifs.push("Aucun quai dans ce quartier : construction aquatique impossible.");
      else if (sumLevels(ville, (b) => b.q === qk && CATALOGUE[b.type].aqua && CATALOGUE[b.type].classe !== "X") + level > q.level)
        motifs.push(`Somme des niveaux aquatiques supérieure au niveau du quai (${q.level}).`);
    } else {
      if (eauQ) motifs.push("Construction terrestre interdite en quartier lacustre.");
    }
    if (carte.classe === "I") {
      if (consof(ville, qk).some((b) => b.type === type && !excls.includes(b.id))) motifs.push("Une seule instance de cette Institution par quartier.");
      if (level > NBQ) motifs.push(`Niveau ${level} supérieur au nombre de quartiers (${NBQ}).`);
      if (sumLevels(ville, (b) => b.type === type) + level > NBQ) motifs.push(`Somme des niveaux de ce type supérieure au nombre de quartiers (${NBQ}).`);
    }
    if (carte.classe === "C" && !carte.aqua) {
      if (consof(ville, qk).some((b) => b.type === type && !excls.includes(b.id))) motifs.push("Une seule instance de ce Courant par quartier.");
      if (carte.stockage && level > 2 * ville.niveau) motifs.push(`Carte de stockage : niveau ${level} supérieur à ${2 * ville.niveau} (2 × niveau de ville).`);
    }
    if (carte.classe === "M" && (ville.constructions || []).some((b) => b.type === type && !excls.includes(b.id)))
      motifs.push("Monument unique par ville.");
    // Bornes croisées É7 : banque et comptoir ≤ moitié du marché
    const nivType = (t) => sumLevels(ville, (b) => b.type === t);
    if (["banque", "comptoir"].includes(type) && nivType("banque") + nivType("comptoir") + level > Math.floor(nivType("marche") / 2))
      motifs.push("Bornes croisées É7 : banque et comptoir ne peuvent excéder la moitié du marché.");
    return { ok: motifs.length === 0, motifs, level };
  };

  // ---- Contrôles de cohérence de la ville (invariants §3 du modèle) ----
  const controlesCoherence = (ville) => {
    const out = [];
    const add = (ok, msg) => out.push({ ok, msg });
    const emp = validerEmprise({ niveau: ville.niveau, sousMarine: ville.sousMarine, regions: ville.regions, regionsEau: ville.regionsEau });
    add(emp.ok, emp.ok ? "Emprise valide (taille, connexité, quota d'eau)." : emp.motifs.join(" "));
    const ids = new Set();
    let doublons = false;
    const cellOcc = new Map();
    for (const b of ville.constructions || []) {
      if (ids.has(b.id)) doublons = true; ids.add(b.id);
      for (const [i, j] of b.cells) { const k = b.q + "|" + cellKey(i, j); if (cellOcc.has(k)) doublons = true; cellOcc.set(k, b.id); }
      if (b.cells.length !== b.level) add(false, `${b.id} : un édifice de niveau ${b.level} doit occuper ${b.level} cellules (${b.cells.length}).`);
      if (!contigu(b.cells)) add(false, `${b.id} : cellules non contiguës.`);
      if (!CATALOGUE[b.type]) add(false, `${b.id} : type inconnu.`);
      if (!ETATS.includes(b.etat || "intact")) add(false, `${b.id} : état invalide.`);
    }
    add(!doublons, doublons ? "Identifiants ou cellules en collision." : "Identifiants uniques et cellules sans chevauchement.");
    // Bande de rue (marché et place exceptés) contrôlée construction par construction
    const eauSet = new Set(ville.regionsEau || []);
    for (const b of ville.constructions || []) {
      if (["marche", "place"].includes(b.type) || CATALOGUE[b.type]?.classe === "X") continue;
      const autres = ville.constructions.filter((x) => x.id !== b.id);
      const rc = new Set(rueCells({ ...ville, constructions: autres }, b.q));
      if (b.cells.some(([i, j]) => rc.has(cellKey(i, j)))) add(false, `${b.id} empiète sur la bande de rue.`);
    }
    const NBQ = ville.regions.length;
    const parTypeVille = {}, parQuartType = {};
    for (const b of ville.constructions || []) {
      const carte = CATALOGUE[b.type]; if (!carte) continue;
      parTypeVille[b.type] = (parTypeVille[b.type] || 0) + b.level;
      parQuartType[b.q + "|" + b.type] = (parQuartType[b.q + "|" + b.type] || 0) + 1;
      if (carte.aqua && !eauSet.has(b.q)) add(false, `${b.id} : aquatique hors quartier lacustre.`);
      if (!carte.aqua && carte.classe !== "X" && eauSet.has(b.q)) add(false, `${b.id} : terrestre en quartier lacustre.`);
    }
    let clsOk = true;
    for (const b of ville.constructions || []) {
      const carte = CATALOGUE[b.type]; if (!carte) continue;
      if (carte.classe === "I" && (parQuartType[b.q + "|" + b.type] > 1 || parTypeVille[b.type] > NBQ)) clsOk = false;
      if (carte.classe === "C" && parQuartType[b.q + "|" + b.type] > 1) clsOk = false;
      if (carte.classe === "M" && ville.constructions.filter((x) => x.type === b.type).length > 1) clsOk = false;
      if (carte.stockage && b.level > 2 * ville.niveau) clsOk = false;
    }
    if (Math.floor((parTypeVille.marche || 0) / 2) < (parTypeVille.banque || 0) + (parTypeVille.comptoir || 0)) clsOk = false;
    add(clsOk, clsOk ? "Classes d'emprise respectées (Institution, Courant, Monument, bornes croisées)." : "Violation des classes d'emprise ou des bornes.");
    // Quai et chaîne aquatique de chaque quartier lacustre
    for (const qk of ville.regionsEau || []) {
      const q = quaiOf(ville, qk);
      const aqua = sumLevels(ville, (b) => b.q === qk && CATALOGUE[b.type]?.aqua && CATALOGUE[b.type].classe !== "X");
      if (q && q.level > 2 * ville.niveau) add(false, `Quai de ${qk} au-delà du niveau maximum.`);
      if (!q && aqua > 0) add(false, `Constructions aquatiques sans quai en ${qk}.`);
      if (q && aqua > q.level) add(false, `Somme aquatique (${aqua}) supérieure au quai (${q.level}) en ${qk}.`);
    }
    // Installations portuaires : côtés terre-eau uniquement, premier aménagement exige un quai
    const te = new Set(terreEauSides(ville));
    let portsOk = true;
    for (const [k, etat] of Object.entries(ville.ports || {})) {
      if (!te.has(k)) portsOk = false;
      if (!PORTS_ETATS.includes(etat)) portsOk = false;
      if (etat !== "aucun") { const eauQ = k.split("|").find((x) => eauSet.has(x)); if (eauQ && !quaiOf(ville, eauQ)) portsOk = false; }
    }
    add(portsOk, portsOk ? "Installations portuaires cohérentes (côtés terre-eau, condition de quai)." : "Installation portuaire invalide (côté, état ou absence de quai).");
    // Fortifications et tours (arbitrage du 25 octobre 2026 : fortification porteuse)
    // Côtés valides : périmètre et côtés intérieurs, hors côtés terre-eau (cycle portuaire).
    const regSet = new Set(ville.regions);
    const perimSet = new Set(perimSides(ville));
    const innerSidesSet = new Set();
    for (const qk of ville.regions) { const [c, r] = qk.split(",").map(Number);
      for (const [s] of SIDES) { const nk = neighborOf(c, r, s).join(","); if (regSet.has(nk)) innerSidesSet.add(innerKey(qk, nk)); } }
    let fortifOk = true;
    for (const [k, etat] of Object.entries(ville.fortif || {}))
      if (!(perimSet.has(k) || innerSidesSet.has(k)) || te.has(k) || !FORTIF_ETATS.includes(etat)) fortifOk = false;
    add(fortifOk, fortifOk ? "Fortifications cohérentes (côtés existants hors terre-eau, états du registre)." : "Fortification invalide (côté inexistant, terre-eau ou état hors registre aucun/mur/citadelle).");
    let toursOk = true;
    for (const t of ville.tours || []) {
      const carte = TYPES_TOURS[t.type];
      if (!carte) { toursOk = false; continue; }
      if (t.type === "guet") {
        const m = (t.key || "").match(/^(\d+),(\d+),(-?\d+)$/);
        if (!m || !regSet.has(`${m[1]},${m[2]}`) || !SOMMETS.includes(+m[3])) toursOk = false;
      } else {
        if (!(perimSet.has(t.key) || innerSidesSet.has(t.key)) || te.has(t.key) || !["mur", "citadelle"].includes((ville.fortif || {})[t.key])) toursOk = false;
        if (carte.maritime) {
          const m = (t.key || "").match(/^(\d+),(\d+),\w+$/);
          const eauCote = m ? eauSet.has(`${m[1]},${m[2]}`) : (t.key || "").split("|").some((x) => eauSet.has(x));
          if (!eauCote) toursOk = false;
        }
      }
    }
    add(toursOk, toursOk ? "Tours cohérentes (registre, position, fortification porteuse)." : "Tour invalide (type hors registre, position inexistante ou fortification porteuse absente).");
    // Portes toujours dérivées des rues ; ville sans entrée : avertissement non bloquant
    const { entrees, portesInterieures } = deriverRues(ville);
    for (const [k, etat] of Object.entries(ville.portes || {})) {
      const legit = entrees.includes(k) || portesInterieures.includes(k);
      if (!legit) add(false, `Porte ${k} sans rue traversante.`);
      if (!PORTES_ETATS.includes(etat)) add(false, `Porte ${k} : état invalide.`);
    }
    add(entrees.length > 0, entrees.length ? `Entrées dérivées des rues : ${entrees.length}.` : "Ville sans entrée (avertissement).");
    return out;
  };

  // ---- Remplissage décoratif déterministe (graine enregistrée) ----
  const mulberry32 = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t2 = Math.imul(a ^ (a >>> 15), 1 | a); t2 = (t2 + Math.imul(t2 ^ (t2 >>> 7), 61 | t2)) ^ t2; return ((t2 ^ (t2 >>> 14)) >>> 0) / 4294967296; };
  const remplissageDecoratif = (ville, graine) => {
    const rng = mulberry32(graine), DECOR = ["habitation", "habitation", "habitation", "commerce", "boutique", "taverne", "atelier"];
    const res = {};
    for (const qk of [...ville.regions].sort()) {
      if ((ville.regionsEau || []).includes(qk)) continue; // quartiers terrestres uniquement
      const occ = occupied(ville, qk), rc = new Set(rueCells(ville, qk));
      res[qk] = [];
      for (const [i, j] of CELLS.map(([a, b]) => [a, b]).sort((x, y) => (x[0] - y[0]) || (x[1] - y[1]))) {
        const k = cellKey(i, j);
        if (occ.has(k) || rc.has(k)) continue;
        res[qk].push({ cellule: [i, j], type: DECOR[Math.floor(rng() * DECOR.length)] });
      }
    }
    return res;
  };

  // ---- Identifiants, export, import ----
  let idc = 100; // départ à 100 : jamais de collision avec les identifiants de démonstration
  const nextId = (p) => `${p}${idc++}`;
  const exporter = (ville) => JSON.stringify({ format: "villes-e8", version: "0.1", ville }, null, 2);
  const importer = (json) => {
    const o = typeof json === "string" ? JSON.parse(json) : json;
    if (o.format !== "villes-e8") throw new Error("Format de ville inconnu.");
    const v = o.ville;
    for (const f of ["id", "nom", "niveau", "regions", "constructions", "rues"]) if (!(f in v)) throw new Error(`Champ manquant : ${f}.`);
    return v;
  };

  return { SIDES, sideAngle, neighborOf, sideBetween, innerKey, CELLS, hasCell, CATALOGUE, CLASSE_LABEL, ETATS, PORTES_ETATS, PORTS_ETATS, TYPES_TOURS, FORTIF_ETATS, SOMMETS,
    empriseParNiveau, orientationsFor, connexe, validerEmprise, perimSides, deriverRues, rueCells, deriverRives, terreEauSides,
    occupied, contigu, controlesPose, controlesCoherence, remplissageDecoratif, nextId, exporter, importer };
})();

// ============================================================================
// JEUX D'ESSAIS — exécution en console : runTests()
// Ville de démonstration : Corvallon, niveau 8, quatre quartiers (3,2),
// (4,2), (3,1), (4,1) ; (4,1) lacustre. Le comptoir et le temple sont posés
// hors de la bande de rue (les tracés r1 et r2 traversent les centres).
// ============================================================================

function runTests() {
  const M = MOTEUR_VILLES;
  const res = [];
  const t = (nom, ok) => res.push({ nom, ok });
  const mkDemo = () => ({
    id: "v1", nom: "Corvallon", niveau: 8, sousMarine: false,
    regions: ["3,2", "4,2", "3,1", "4,1"], regionsEau: ["4,1"],
    constructions: [
      { id: "b1", q: "3,2", type: "marche", cells: [[3, 3], [3, 4]], level: 2, owner: "Ville" },
      { id: "b2", q: "3,2", type: "grenier", cells: [[1, 5], [2, 5], [1, 4], [2, 4]], level: 4, owner: "Ville" },
      { id: "b3", q: "4,2", type: "comptoir", cells: [[3, 5]], level: 1, owner: "Puissance B" },
      { id: "b4", q: "3,1", type: "temple", cells: [[3, 5]], level: 1, owner: "Culte de Lune" },
      { id: "b5", q: "3,1", type: "cathedrale", cells: [[1, 2]], level: 1, owner: "Culte de Lune" },
    ],
    rues: [
      { id: "r1", nodes: [{ k: "A3,2O" }, { k: "C3,2" }, { k: "A3,2E" }, { k: "C4,2" }, { k: "A4,2E" }] },
      { id: "r2", nodes: [{ k: "A3,1NE" }, { k: "C3,1" }, { k: "A3,1O" }] },
    ],
    fortif: {}, portes: { "3,2,O": "ouverte", "4,2,E": "ouverte" }, ports: {}, tours: [], graineRemplissage: 42,
  });

  // Géométrie
  const [ec, er] = M.neighborOf(3, 2, "E"); t("voisin E de 3,2 = 4,2", ec === 4 && er === 2);
  const [nc, nr] = M.neighborOf(3, 1, "NE"); t("voisin NE de 3,1 = 4,0", nc === 4 && nr === 0);
  const [bc, br] = M.neighborOf(4, 0, "SO"); t("symétrie du voisinage 3,1↔4,0", bc === 3 && br === 1);
  t("angles des côtés (E 0, NE 300)", M.sideAngle("E") === 0 && M.sideAngle("NE") === 300);
  t("clé intérieure canonique triée", M.innerKey("4,2", "3,1") === "3,1|4,2");
  const demo = mkDemo();
  t("grille fine non vide (demi-cases retenues)", M.CELLS.length > 30);

  // Emprise
  t("emprise pour niveau 8 = 4 régions", M.empriseParNiveau(8) === 4);
  t("emprise pour niveau 1 = 1 région", M.empriseParNiveau(1) === 1);
  const or4 = M.orientationsFor(3, 2, 4);
  t("6 orientations d'emprise de 4, toutes connexes", or4.length === 6 && or4.every((o) => o.length === 4 && M.connexe(o)));
  t("emprise 3,2 + 6,6 non connexe refusée", !M.validerEmprise({ niveau: 8, sousMarine: false, regions: ["3,2", "6,6", "3,1", "4,1"], regionsEau: [] }).ok);
  t("ville sous-marine de niveau 1 avec une seule région acceptée", M.validerEmprise({ niveau: 1, sousMarine: true, regions: ["5,5"], regionsEau: ["5,5"] }).ok);
  const vo7 = M.orientationsFor(3, 2, 7)[0];
  t("7 régions avec 3 d'eau acceptées", M.validerEmprise({ niveau: 9, sousMarine: false, regions: vo7, regionsEau: [vo7[1], vo7[2], vo7[3]] }).ok);
  t("4 régions avec 2 d'eau refusées (quota 1)", !M.validerEmprise({ niveau: 8, sousMarine: false, regions: vo7.slice(0, 4), regionsEau: [vo7[1], vo7[2]] }).ok);
  t("emprise démo valide", M.validerEmprise({ niveau: 8, sousMarine: false, regions: demo.regions, regionsEau: demo.regionsEau }).ok);

  // Rues : entrées et portes intérieures
  const dr = M.deriverRues(demo);
  t("4 entrées dérivées {3,2,O ; 4,2,E ; 3,1,NE ; 3,1,O}",
    ["3,2,O", "4,2,E", "3,1,NE", "3,1,O"].every((k) => dr.entrees.includes(k)) && dr.entrees.length === 4);
  t("porte intérieure 3,2|4,2 par tronçon direct centre-centre", dr.portesInterieures.includes("3,2|4,2"));

  // Pose : niveau n = n cellules contiguës, extension orthogonale
  const rc32 = new Set(M.rueCells(demo, "3,2"));
  const libre32 = (pred) => M.CELLS.find(([i, j]) => !M.occupied(demo, "3,2").has(`${i},${j}`) && !rc32.has(`${i},${j}`) && (!pred || pred(i, j)));
  const c0 = libre32();
  t("pose d'un puits niveau 1 sur une cellule libre", M.controlesPose(demo, "3,2", "puits", [c0]).ok);
  const autre = M.CELLS.find(([i, j]) => !M.occupied(demo, "3,2").has(`${i},${j}`) && !rc32.has(`${i},${j}`) && Math.abs(i - c0[0]) + Math.abs(j - c0[1]) > 1);
  t("niveau 2 sur deux cellules non contiguës refusé", !M.controlesPose(demo, "3,2", "banque", [c0, autre]).ok);
  const c0b = libre32((i, j) => Math.abs(i - c0[0]) + Math.abs(j - c0[1]) === 1);
  t("extension orthogonale admise (niveau 2 = 2 cellules contiguës)", M.controlesPose({ ...demo, constructions: [...demo.constructions, { id: "x", q: "3,2", type: "puits", cells: [c0], level: 1 }] }, "3,2", "puits", [c0, c0b], { excludeIds: ["x"] }).ok);

  // Bande de rue
  const rcell = [...rc32][0], rcoord = rcell.split(",").map(Number);
  t("bande de rue inconstructible pour un grenier", !M.controlesPose(demo, "3,2", "grenier", [rcoord]).ok);
  const rc42 = new Set(M.rueCells(demo, "4,2"));
  const r42 = [...rc42].find((k) => !M.occupied(demo, "4,2").has(k));
  t("marché compatible avec la bande de rue", r42 !== undefined && M.controlesPose(demo, "4,2", "marche", [r42.split(",").map(Number)]).ok);

  // Classes d'emprise
  t("Institution : somme des niveaux bornée par le nombre de quartiers (marché 2+3 > 4)",
    !M.controlesPose(demo, "4,2", "marche", [[3, 3], [3, 2], [3, 1]]).ok);
  t("Monument unique par ville (cathédrale déjà présente)", !M.controlesPose(demo, "4,2", "cathedrale", [[3, 3]]).ok);
  const c421 = M.CELLS.find(([i, j]) => !M.occupied(demo, "4,2").has(`${i},${j}`));
  t("carte de stockage bornée à 2 × niveau ville (grenier 17 > 16 refusé)",
    !M.controlesPose(demo, "4,2", "grenier", Array.from({ length: 17 }, (_, n) => [c421[0] + Math.floor(n / 7), c421[1] + (n % 7)])).ok);
  t("bornes croisées É7 : banque refusée quand comptoir = ½ marché", !M.controlesPose(demo, "4,2", "banque", [c421]).ok);

  // Quai et chaîne portuaire
  const rives41 = new Set(M.deriverRives(demo, "4,1"));
  t("rives du quartier lacustre non vides", rives41.size > 0);
  const riveCell = [...rives41][0].split(",").map(Number);
  t("pose du quai sur une cellule de rive", M.controlesPose(demo, "4,1", "quai", [riveCell]).ok);
  t("pose du quai hors rive refusée", !M.controlesPose(demo, "4,1", "quai", [[3, 3]]).ok);
  const vQ = { ...demo, constructions: [...demo.constructions, { id: "q1", q: "4,1", type: "quai", cells: [riveCell], level: 1, owner: "Ville" }] };
  const ext41 = M.CELLS.find(([i, j]) => Math.abs(i - riveCell[0]) + Math.abs(j - riveCell[1]) === 1);
  t("extension du quai sur cellule adjacente (ponton), rive non exigée", M.controlesPose(vQ, "4,1", "quai", [riveCell, ext41], { excludeIds: ["q1"] }).ok);
  t("construction aquatique sans quai refusée", !M.controlesPose(demo, "4,1", "chantier", [[3, 3]]).ok);
  t("somme aquatique ≤ niveau du quai (chantier 2 > quai 1 refusé)", !M.controlesPose(vQ, "4,1", "chantier", [[3, 3], [2, 3]]).ok);
  t("chantier naval accepté avec quai de niveau suffisant", M.controlesPose({ ...vQ, constructions: [...vQ.constructions.map((b) => b.id === "q1" ? { ...b, cells: [riveCell, ext41], level: 2 } : b)] }, "4,1", "chantier", [[3, 3], [2, 3]]).ok);
  t("construction terrestre interdite en quartier lacustre", !M.controlesPose(vQ, "4,1", "grenier", [[3, 3]]).ok);
  t("construction aquatique interdite en quartier terrestre", !M.controlesPose(demo, "3,2", "chantier", [c0]).ok);

  // Ports, états, cohérence
  const te = M.terreEauSides(demo);
  t("côtés terre-eau de la démo = {3,1|4,1 ; 4,1|4,2}", te.length === 2 && te.includes("3,1|4,1") && te.includes("4,1|4,2"));
  const vPort = { ...demo, ports: { "3,1|4,1": "port1" } };
  t("aménagement portuaire sans quai signalé incohérent", M.controlesCoherence(vPort).some((c) => !c.ok));
  const vPortQ = { ...vQ, ports: { "3,1|4,1": "port1" } };
  t("aménagement portuaire avec quai cohérent", M.controlesCoherence(vPortQ).every((c) => c.ok));
  t("cohérence de la ville de démonstration", M.controlesCoherence(demo).every((c) => c.ok));

  // Fortifications et tours (arbitrage du 25 octobre 2026 : fortification porteuse)
  const vT = { ...demo, fortif: { "3,2,O": "mur", "3,2|4,2": "citadelle" }, tours: [
    { id: "t1", key: "3,2,-90", type: "guet" },
    { id: "t2", key: "3,2,O", type: "archers" },
    { id: "t3", key: "3,2|4,2", type: "baliste" },
  ] };
  t("tours cohérentes : guet au sommet, archers sur mur de périmètre, baliste sur citadelle intérieure",
    M.controlesCoherence(vT).every((c) => c.ok));
  t("tour de tir sans fortification porteuse signalée",
    !M.controlesCoherence({ ...vT, fortif: {}, tours: [{ id: "t1", key: "3,2,O", type: "archers" }] }).every((c) => c.ok));
  t("tour de guet sur sommet inexistant signalée",
    !M.controlesCoherence({ ...vT, tours: [{ id: "t1", key: "9,9,45", type: "guet" }] }).every((c) => c.ok));
  t("tour de tir au sommet signalée (porteur exigé)",
    !M.controlesCoherence({ ...vT, tours: [{ id: "t1", key: "3,2,-90", type: "archers" }] }).every((c) => c.ok));
  t("type de tour hors registre signalé",
    !M.controlesCoherence({ ...vT, tours: [{ id: "t1", key: "3,2,O", type: "catapulte" }] }).every((c) => c.ok));
  t("état de fortification hors registre signalé",
    !M.controlesCoherence({ ...vT, fortif: { "3,2,O": "douves" } }).every((c) => c.ok));
  t("fortification sur côté inexistant signalée",
    !M.controlesCoherence({ ...vT, fortif: { "9,9,E": "mur" } }).every((c) => c.ok));
  t("fortification sur côté terre-eau signalée (cycle portuaire)",
    !M.controlesCoherence({ ...vT, fortif: { "4,1|4,2": "mur" } }).every((c) => c.ok));
  t("état endommagé admis, état inconnu signalé",
    M.controlesCoherence({ ...demo, constructions: [...demo.constructions.map((b) => b.id === "b4" ? { ...b, etat: "endommage" } : b)] }).every((c) => c.ok) &&
    M.controlesCoherence({ ...demo, constructions: [...demo.constructions.map((b) => b.id === "b4" ? { ...b, etat: "detruit" } : b)] }).some((c) => !c.ok));

  // Remplissage décoratif déterministe
  const f1 = M.remplissageDecoratif(demo, 42), f2 = M.remplissageDecoratif(demo, 42), f3 = M.remplissageDecoratif(demo, 43);
  t("remplissage déterministe : même graine, même résultat", JSON.stringify(f1) === JSON.stringify(f2));
  t("graine différente, remplissage différent", JSON.stringify(f1) !== JSON.stringify(f3));
  const toutesLibres = Object.entries(f1).every(([qk, l]) => { const occ = M.occupied(demo, qk), rc = new Set(M.rueCells(demo, qk));
    return l.length > 0 && l.every((e) => !occ.has(e.cellule.join(",")) && !rc.has(e.cellule.join(","))); });
  t("remplissage : uniquement des cellules libres hors bande de rue", toutesLibres);

  // Export / import, identifiants
  const rt = M.importer(M.exporter(demo));
  t("export/import : aller-retour identique", JSON.stringify(rt) === JSON.stringify(demo));
  let threw = false; try { M.importer('{"format":"autre"}'); } catch (e) { threw = true; }
  t("import : format inconnu rejeté", threw);
  const ida = M.nextId("b"), idb = M.nextId("b");
  t("identifiants uniques croissants (compteur global)", ida !== idb && +idb.slice(1) === +ida.slice(1) + 1);

  return res; // 45 contrôles ; les échecs éventuels portent ok = false
}

if (typeof module !== "undefined") module.exports = { MOTEUR_VILLES, runTests };
