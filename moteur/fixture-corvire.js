// ============================================================================
// FIXTURE « LA CITÉ DE CORVIRE » — roman de test urbain (Édition 8), v0.2
// ----------------------------------------------------------------------------
// Ville scénario du roman de test urbain (voir specs/roman-test-urbain.md) :
// chaque chapitre du roman correspond à une étape de construction de la ville
// et à des contrôles du module moteur. La variante « Melgar-sur-Argent »
// (chapitre IX) couvre le cas d'un fleuve à plusieurs régions d'eau : un côté
// partagé par deux régions d'eau n'est pas une rive.
//
// Arbitrage du 25 octobre 2026 (fortification porteuse) : la tour de guet se
// pose seule aux sommets ; les tours de tir (archers, artillerie, mage,
// sous-marine, baliste) exigent un côté fortifié porteur, la tour sous-marine
// un côté maritime.
//
// Exécution : runFixtureTests() renvoie la liste des contrôles { nom, ok }.
// La construction de la ville est auto-validée : toute pose impossible lève
// une erreur explicite (la fixture ne peut pas décrire une ville illégale).
// ============================================================================

const { MOTEUR_VILLES: M } = require("./moteur-villes.js");

// ---- Recherche de cellules pour une pose conforme (DFS borné) ----
// Renvoie `level` cellules contiguës libres (hors bande de rue sauf marché et
// place, hors occupation) dont la pose complète passe controlesPose.
function findCells(ville, qk, type, level, opts = {}) {
  const excls = opts.excludeIds || [];
  const exempt = ["marche", "place"].includes(type) || M.CATALOGUE[type].classe === "X";
  const occ = new Set(
    (ville.constructions || [])
      .filter((b) => b.q === qk && !excls.includes(b.id))
      .flatMap((b) => b.cells.map(([i, j]) => i + "," + j))
  );
  const rc = new Set(exempt ? [] : M.rueCells(ville, qk));
  const free = (i, j) => M.hasCell(i, j) && !occ.has(i + "," + j) && !rc.has(i + "," + j);

  let seeds;
  if (opts.seed) seeds = [opts.seed];
  else if (exempt && (type === "marche" || type === "place"))
    seeds = M.rueCells(ville, qk).map((k) => k.split(",").map(Number)).filter(([i, j]) => free(i, j));
  else
    seeds = M.CELLS.map(([i, j]) => [i, j])
      .filter(([i, j]) => free(i, j))
      .sort((a, b) => (b[0] - 3) ** 2 + (b[1] - 3) ** 2 - ((a[0] - 3) ** 2 + (a[1] - 3) ** 2));

  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const seen = new Set();
  let budget = 100000;
  const dfs = (cells) => {
    if (cells.length === level) return cells;
    if (budget-- <= 0) return null;
    const cand = new Set();
    for (const [i, j] of cells)
      for (const [di, dj] of DIRS) { const ni = i + di, nj = j + dj; if (free(ni, nj)) cand.add(ni + "," + nj); }
    for (const k of cand) {
      const c = [...cells, k.split(",").map(Number)];
      const key = c.map((x) => x.join(",")).sort().join(";");
      if (seen.has(key)) continue;
      seen.add(key);
      if (M.controlesPose(ville, qk, type, c, { excludeIds: excls }).ok) {
        const r = dfs(c);
        if (r) return r;
      }
    }
    return null;
  };
  for (const s of seeds) {
    if (!M.controlesPose(ville, qk, type, [s], { excludeIds: excls }).ok) continue;
    const r = dfs([s]);
    if (r) return r;
  }
  return null;
}

// Pose d'un édifice : trouve les cellules puis l'ajoute à la ville.
function pose(ville, id, qk, type, level, opts = {}) {
  const cells = findCells(ville, qk, type, level, opts);
  if (!cells) throw new Error(`Fixture Corvire : pose impossible de ${type} niveau ${level} en ${qk}`);
  const b = { id, q: qk, type, cells, level, owner: opts.owner || "Ville", etat: opts.etat || "intact" };
  ville.constructions.push(b);
  return b;
}

// ---- Chapitres I à VIII : la Cité de Corvire ----
// Niveau 7 (Ville, 4 régions) ; le Chenal (4,1) est la région d'eau du fleuve.
// Rive Haute = 3,2 ; Rive Basse = 3,3 ; Gué = 4,2 ; Chenal = 4,1.
function corvire() {
  const ville = {
    id: "corvire", nom: "Corvire", niveau: 7, sousMarine: false,
    regions: ["3,2", "3,3", "4,2", "4,1"], regionsEau: ["4,1"],
    constructions: [],
    rues: [
      { id: "r1", nodes: [{ k: "A3,2O" }, { k: "C3,2" }, { k: "A3,2E" }, { k: "C4,2" }, { k: "A4,2E" }] },
      { id: "r2", nodes: [{ k: "A3,3O" }, { k: "C3,3" }, { k: "A3,3NE" }, { k: "C4,2" }] },
    ],
    // périmètre + mur intérieur (réduit du Gué) + littoral fortifié du Chenal
    fortif: { "3,3,SO": "mur", "3,3,O": "mur", "3,3|4,2": "mur", "4,1,SE": "mur" },
    portes: { "3,2,O": "ouverte", "4,2,E": "ouverte", "3,3,O": "barricadee", "3,3|4,2": "fermee" },
    ports: {},
    // arbitrage « fortification porteuse » : guet au sommet, tours de tir sur côtés fortifiés
    tours: [
      { id: "t1", key: "3,3,90", type: "guet" },        // tour de guet : sommet, sans porteur
      { id: "t2", key: "3,3,SO", type: "archers" },     // tour d'archers : mur sud de la Rive Basse
      { id: "t3", key: "3,3|4,2", type: "baliste" },    // tour de balistes : mur intérieur du réduit
      { id: "t4", key: "4,1,SE", type: "sousmarine" },   // tour sous-marine : littoral fortifié du Chenal
    ],
    graineRemplissage: 7,
  };

  pose(ville, "c1", "4,2", "marche", 4, { owner: "Ville" });                 // ch. III : marché du Gué, niveau 4
  pose(ville, "c2", "3,2", "temple", 1, { owner: "Culte de Lune" });         // ch. II : temple déplacé hors de la bande
  pose(ville, "c3", "3,3", "cathedrale", 1, { owner: "Culte de Lune" });     // Monument
  pose(ville, "c5", "3,3", "banque", 2, { owner: "Sethar" });                // ch. III : banque = ½ marché
  pose(ville, "c4", "3,2", "grenier", 12, { owner: "Ville", etat: "endommage" }); // ch. VII : grenier frappé au siège
  pose(ville, "c6", "4,2", "puits", 1, { owner: "Ville" });                 // ch. VI : le réduit du Gué

  // ch. IV : quai du Chenal — pose initiale sur une rive, puis pontons sur l'eau
  const rives = M.deriverRives(ville, "4,1");
  if (!rives.length) throw new Error("Fixture Corvire : aucune rive dérivée au Chenal");
  const quai = pose(ville, "c7", "4,1", "quai", 1, { seed: rives[0].split(",").map(Number), owner: "Half-Œil" });
  // pontons sur l'eau : au moins une cellule d'extension hors du ruban de rive
  const rivesSet = new Set(rives);
  const occQ = new Set(ville.constructions.filter((b) => b.q === "4,1" && b.id !== quai.id).flatMap((b) => b.cells.map(([i, j]) => i + "," + j)));
  let ponton = null;
  for (const [i, j] of quai.cells)
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ni = i + di, nj = j + dj, k = ni + "," + nj;
      if (!ponton && M.hasCell(ni, nj) && !rivesSet.has(k) && !occQ.has(k)) ponton = [ni, nj];
    }
  if (!ponton) throw new Error("Fixture Corvire : aucun ponton hors rive disponible");
  const ext = [...quai.cells, ponton];
  while (ext.length < 3) {
    let ajout = null;
    for (const [i, j] of ext)
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ni = i + di, nj = j + dj, k = ni + "," + nj;
        if (!ajout && M.hasCell(ni, nj) && !ext.some(([a, b]) => a === ni && b === nj) && !occQ.has(k)) ajout = [ni, nj];
      }
    if (!ajout) throw new Error("Fixture Corvire : extension du quai impossible (3 cellules)");
    ext.push(ajout);
  }
  const ctrlQuai = M.controlesPose(ville, "4,1", "quai", ext, { excludeIds: [quai.id] });
  if (!ctrlQuai.ok) throw new Error("Fixture Corvire : extension du quai refusée — " + ctrlQuai.motifs.join(" "));
  quai.cells = ext; quai.level = 3;

  pose(ville, "c8", "4,1", "pilotis", 2, { owner: "Sethar" });               // ch. IV : entrepôt sur pilotis (≤ quai 3)

  // ch. V : port fortifié sur le côté terre-eau Rive Basse / Chenal
  const te = M.terreEauSides(ville);
  const cote = te.find((k) => k === "4,1|4,2") || te[0];
  ville.ports = { [cote]: "fortifie" };
  return ville;
}

// ---- Chapitre IX : Melgar-sur-Argent, megapole de rive (niveau 9) ----
// 7 régions dont 3 d'eau en chaîne (2,3 — 3,3 — 4,2) : le côté partagé par
// deux régions d'eau n'est pas une rive, le ruban du quai s'y interrompt.
function melgar() {
  const regions = M.orientationsFor(3, 2, 7)[0];
  const ville = {
    id: "melgar", nom: "Melgar-sur-Argent", niveau: 9, sousMarine: false,
    regions, regionsEau: ["4,2", "3,3", "2,3"],
    constructions: [],
    rues: [{ id: "rm1", nodes: [{ k: "A2,2O" }, { k: "C2,2" }, { k: "A2,2E" }, { k: "C3,2" }] }],
    fortif: {}, portes: {}, ports: {}, tours: [],
    graineRemplissage: 9,
  };
  const rives = M.deriverRives(ville, "4,2");
  if (!rives.length) throw new Error("Fixture Melgar : aucune rive dérivée au quartier 4,2");
  pose(ville, "m1", "4,2", "quai", 1, { seed: rives[0].split(",").map(Number), owner: "Guilde des Bateliers" });
  return ville;
}

// Cellule de la bande du côté SO de la région 4,2 (vers la région d'eau 3,3).
function celluleBandeSO(ville, qk) {
  const [c, r] = qk.split(",").map(Number);
  const apo = (190 * Math.sqrt(3)) / 2; // Rq = 190, mêmes constantes que le moteur
  const a = (120 * Math.PI) / 180;
  for (const [i, j, x, y] of M.CELLS)
    if (x * Math.cos(a) + y * Math.sin(a) >= apo - 42 * 0.8) return [i, j];
  return null;
}

// ---- Jeux d'essais du roman (chapitres I à IX) ----
function runFixtureTests() {
  const res = [];
  const t = (nom, ok) => res.push({ nom, ok });
  const sans = (ville, ids) => ({ ...ville, constructions: ville.constructions.filter((b) => !ids.includes(b.id)) });
  const kset = (arr) => new Set(arr);

  const v = corvire();
  const rives41 = M.deriverRives(v, "4,1");

  // Chapitre I — La fondation
  t("I. emprise de Corvire valide (4 régions, 1 d'eau, niveau 7)",
    M.validerEmprise({ niveau: v.niveau, sousMarine: v.sousMarine, regions: v.regions, regionsEau: v.regionsEau }).ok);
  t("I. emprise disjointe refusée",
    !M.validerEmprise({ niveau: 7, sousMarine: false, regions: ["3,2", "6,6", "3,3", "4,2"], regionsEau: ["4,1"] }).ok);
  t("I. deux régions d'eau refusées pour une emprise de 4",
    !M.validerEmprise({ niveau: 7, sousMarine: false, regions: v.regions, regionsEau: ["4,1", "3,3"] }).ok);

  // Chapitre II — Les rues et les portes
  const dr = M.deriverRues(v);
  t("II. entrées dérivées des rues (3,2,O ; 4,2,E ; 3,3,O)",
    kset(dr.entrees).size === 3 && ["3,2,O", "4,2,E", "3,3,O"].every((k) => dr.entrees.includes(k)));
  t("II. porte intérieure dérivée (3,3|4,2)", dr.portesInterieures.includes("3,3|4,2"));
  const band32 = M.rueCells(v, "3,2");
  const cellBand = band32.map((k) => k.split(",").map(Number)).find(([i, j]) => M.hasCell(i, j));
  t("II. temple sur la bande de rue refusé", !M.controlesPose(v, "3,2", "temple", [cellBand]).ok);
  const marche = v.constructions.find((b) => b.id === "c1");
  t("II. marché posé sur la bande de rue (compatible)",
    marche.cells.some(([i, j]) => band32.includes(i + "," + j)));
  t("II. entrée barricadée légitime (3,3,O)", dr.entrees.includes("3,3,O") && v.portes["3,3,O"] === "barricadee");

  // Chapitre III — Le marché et la maison des changeurs
  const somme = (type) => v.constructions.filter((b) => b.type === type).reduce((s, b) => s + b.level, 0);
  t("III. marché de niveau 4 (somme des Institutions égale au nombre de quartiers)", somme("marche") === 4);
  t("III. comptoir refusé : banque 2 = ½ marché 4 (bornes croisées É7)",
    !M.controlesPose(v, "3,3", "comptoir", [[1, 1]]).ok);
  t("III. marché de niveau 5 refusé (somme supérieure aux 4 quartiers)",
    !M.controlesPose(v, "4,2", "marche", Array.from({ length: 5 }, (_, n) => [0, n])).ok &&
    M.controlesPose(v, "4,2", "marche", Array.from({ length: 5 }, (_, n) => [0, n])).motifs.some((m) => m.includes("quartiers")));
  t("III. grenier de niveau 15 refusé (borne 2 × niveau de ville)",
    !M.controlesPose(v, "3,3", "grenier", Array.from({ length: 15 }, (_, n) => [Math.floor(n / 7), n % 7])).ok);
  t("III. grenier de niveau 12 posé (12 cellules contiguës)",
    v.constructions.find((b) => b.id === "c4").cells.length === 12);

  // Chapitre IV — Le quai des bateliers
  t("IV. rives du Chenal dérivées (littoral et berges)", rives41.length > 0);
  const cellEau = M.CELLS.map(([i, j]) => [i, j]).find(([i, j]) => !rives41.includes(i + "," + j) && M.hasCell(i, j));
  t("IV. pose initiale du quai hors rive refusée", !M.controlesPose(sans(v, ["c7", "c8"]), "4,1", "quai", [cellEau]).ok);
  t("IV. extension du quai hors rive (ponton sur l'eau) admise",
    M.controlesPose(v, "4,1", "quai", v.constructions.find((b) => b.id === "c7").cells, { excludeIds: ["c7"] }).ok);
  t("IV. entrepôt sur pilotis sans quai refusé",
    !M.controlesPose(sans(v, ["c7", "c8"]), "4,1", "pilotis", [cellEau]).ok);
  t("IV. somme aquatique supérieure au quai refusée (pilotis 4 > quai 3)",
    !M.controlesPose(v, "4,1", "pilotis", Array.from({ length: 4 }, (_, n) => [1, n]), { excludeIds: ["c8"] }).ok);

  // Chapitre V — Le port fortifié
  t("V. côté terre-eau dérivé (4,1|4,2)", M.terreEauSides(v).includes("4,1|4,2"));
  const coherencePortSansQuai = M.controlesCoherence(sans(v, ["c7", "c8"]));
  t("V. port fortifié sans quai signalé incohérent",
    coherencePortSansQuai.some((c) => !c.ok && c.msg.includes("portuaire")));
  t("V. port fortifié avec quai cohérent",
    M.controlesCoherence(v).every((c) => c.ok || !c.msg.includes("portuaire")));

  // Chapitre VI — La muraille intérieure et les tours (fortification porteuse)
  t("VI. mur intérieur fortifié (3,3|4,2)", v.fortif["3,3|4,2"] === "mur");
  t("VI. porte intérieure dérivée et fermée (coupe la circulation inter-quartiers)",
    dr.portesInterieures.includes("3,3|4,2") && v.portes["3,3|4,2"] === "fermee");
  t("VI. tour de guet au sommet, sans porteur, cohérente",
    v.tours.find((x) => x.id === "t1").type === "guet" && M.controlesCoherence(v).every((c) => c.ok));
  t("VI. tours de tir sur fortifications porteuses (archers, baliste, sous-marine maritime)",
    M.controlesCoherence(v).every((c) => c.ok));
  t("VI. tour de tir sans fortification porteuse signalée",
    !M.controlesCoherence({ ...v, fortif: {}, tours: [{ id: "tx", key: "3,2,O", type: "archers" }] }).every((c) => c.ok));
  t("VI. tour sous-marine hors côté maritime signalée",
    !M.controlesCoherence({ ...v, tours: [...v.tours, { id: "tx", key: "3,3,SO", type: "sousmarine" }] }).every((c) => c.ok));
  t("VI. type de tour hors registre signalé",
    !M.controlesCoherence({ ...v, tours: [...v.tours, { id: "tx", key: "3,3,SO", type: "catapulte" }] }).every((c) => c.ok));
  t("VI. état de fortification hors registre signalé",
    !M.controlesCoherence({ ...v, fortif: { ...v.fortif, "3,2,O": "douves" } }).every((c) => c.ok));

  // Chapitre VII — Le siège
  t("VII. grenier endommagé demeure cohérent",
    M.controlesCoherence(v).every((c) => c.ok));
  const vDetruit = { ...v, constructions: v.constructions.map((b) => b.id === "c4" ? { ...b, etat: "detruit" } : b) };
  t("VII. état inconnu (détruit) signalé incohérent",
    M.controlesCoherence(vDetruit).some((c) => !c.ok && c.msg.includes("état")));
  const vRuine = { ...v, constructions: v.constructions.map((b) => b.id === "c3" ? { ...b, etat: "ruine" } : b) };
  t("VII. état ruiné admis par le moteur (endommagement en cours de partie : chantier Siège)",
    M.controlesCoherence(vRuine).every((c) => c.ok));

  // Chapitre VIII — La reconstruction
  const f1 = M.remplissageDecoratif(v, v.graineRemplissage), f2 = M.remplissageDecoratif(v, v.graineRemplissage),
    f3 = M.remplissageDecoratif(v, v.graineRemplissage + 1);
  t("VIII. remplissage décoratif déterministe (même graine, même rendu)",
    JSON.stringify(f1) === JSON.stringify(f2));
  t("VIII. graine différente, rendu différent", JSON.stringify(f1) !== JSON.stringify(f3));
  const rt = M.importer(M.exporter(v));
  t("VIII. export/import aller-retour identique", JSON.stringify(rt) === JSON.stringify(v));
  let threw = false;
  try { M.importer('{"format":"autre"}'); } catch (e) { threw = true; }
  t("VIII. import d'un format inconnu refusé", threw);

  // Chapitre IX — Melgar-sur-Argent : fleuve à deux régions d'eau voisines
  const m = melgar();
  t("IX. megapole de rive valide (7 régions dont 3 d'eau, niveau 9)",
    M.validerEmprise({ niveau: 9, sousMarine: false, regions: m.regions, regionsEau: m.regionsEau }).ok);
  t("IX. quatre régions d'eau refusées (quota 3 pour 7)",
    !M.validerEmprise({ niveau: 9, sousMarine: false, regions: m.regions, regionsEau: [...m.regionsEau, "3,2"] }).ok);
  const rives42 = M.deriverRives(m, "4,2");
  const bandeSO = celluleBandeSO(m, "4,2");
  t("IX. côté entre deux régions d'eau exclu du ruban de rive (4,2 vers 3,3)",
    !!bandeSO && !rives42.includes(bandeSO[0] + "," + bandeSO[1]));
  t("IX. pose du quai sur ce côté refusée",
    !M.controlesPose(sans(m, ["m1"]), "4,2", "quai", [bandeSO]).ok);
  t("IX. quai du littoral extérieur admis et Melgar cohérente",
    m.constructions.find((b) => b.id === "m1").level === 1 && M.controlesCoherence(m).every((c) => c.ok));

  // Synthèse
  t("X. cohérence globale de Corvire", M.controlesCoherence(v).every((c) => c.ok));
  t("X. identifiants uniques de Corvire",
    new Set(v.constructions.map((b) => b.id)).size === v.constructions.length);

  return res;
}

if (typeof module !== "undefined") module.exports = { corvire, melgar, runFixtureTests, findCells };
