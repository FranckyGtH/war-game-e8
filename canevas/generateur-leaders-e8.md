---
name: "generateur-leaders-e8"
title: "Le générateur de leaders et de semi-leaders — Édition 8, v0.4"
type: "text/html"
---

<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Générateur de leaders — Édition 8</title>
<style>
  :root {
    --fond: #14100c; --panneau: #1e1812; --panneau2: #262019; --bord: #4a3b28;
    --or: #c9a227; --or2: #e8c96a; --texte: #e8dfc8; --sous: #a89a7d;
    --ok: #7da35a; --cal: #d9a441; --ecl: #c96a5a; --chant: #7a9ec2; --danger: #b05a4a;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, "Times New Roman", serif; background: var(--fond); color: var(--texte); padding: 16px; }
  h1, h2, h3 { font-variant: small-caps; letter-spacing: .04em; color: var(--or2); }
  h1 { font-size: 24px; }
  header.top { border-bottom: 2px solid var(--or); padding-bottom: 10px; margin-bottom: 14px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; }
  .tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .tab { font-family: Verdana, sans-serif; font-size: 12px; padding: 7px 14px; background: var(--panneau); border: 1px solid var(--bord); color: var(--sous); cursor: pointer; border-radius: 4px 4px 0 0; }
  .tab:hover { color: var(--or2); }
  .tab.actif { background: var(--panneau2); color: var(--or2); border-bottom-color: var(--panneau2); }
  section.vue { display: none; }
  section.vue.actif { display: block; }
  .grille2 { display: grid; grid-template-columns: minmax(340px, 1fr) minmax(380px, 1.25fr); gap: 16px; align-items: start; }
  @media (max-width: 980px) { .grille2 { grid-template-columns: 1fr; } }
  .bloc { background: var(--panneau); border: 1px solid var(--bord); border-radius: 6px; padding: 14px; margin-bottom: 14px; }
  .bloc h3 { font-size: 15px; margin-bottom: 10px; border-bottom: 1px solid var(--bord); padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 4px 7px; border-bottom: 1px solid #33291d; }
  th { font-family: Verdana, sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .05em; color: var(--sous); }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  label { display: block; font-family: Verdana, sans-serif; font-size: 11px; color: var(--sous); margin: 8px 0 3px; text-transform: uppercase; letter-spacing: .04em; }
  select, input, textarea { width: 100%; background: #33291d; border: 1px solid var(--bord); color: var(--texte); padding: 6px 8px; border-radius: 3px; font-family: Georgia, serif; font-size: 13px; }
  textarea { resize: vertical; }
  input[type="number"] { text-align: right; }
  .btn { font-family: Verdana, sans-serif; font-size: 11px; padding: 7px 12px; background: var(--panneau2); border: 1px solid var(--or); color: var(--or2); cursor: pointer; border-radius: 3px; }
  .btn:hover { background: #352c1f; }
  .btn.sec { border-color: var(--bord); color: var(--sous); }
  .btn.danger { border-color: var(--danger); color: #e0a292; }
  .btn.grand { font-size: 13px; padding: 10px 18px; width: 100%; }
  .rangée { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .rangée > * { flex: 1; min-width: 90px; }
  .mini { font-size: 11px; color: var(--sous); font-style: italic; }
  .note { font-size: 12px; color: var(--sous); font-style: italic; margin-top: 8px; }
  .etat { font-family: Verdana, sans-serif; font-size: 10px; padding: 2px 7px; border-radius: 9px; white-space: nowrap; }
  .etat.ok { background: #26331e; color: var(--ok); }
  .etat.cal { background: #33280f; color: var(--cal); }
  .etat.ecl { background: #331d17; color: var(--ecl); }
  .etat.chant { background: #1c2631; color: var(--chant); }
  .jauges { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
  .jauge .lab { font-family: Verdana, sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .05em; color: var(--sous); }
  .jauge .val { font-size: 19px; color: var(--or2); font-variant-numeric: tabular-nums; }
  .portrait-cadre { display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
  .portrait-cadre svg, .portrait-cadre img { border-radius: 6px; border: 2px solid var(--or); background: #241a10; }
  .filtres { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; align-items: center; }
  .filtre { font-family: Verdana, sans-serif; font-size: 11px; padding: 4px 10px; border: 1px solid var(--bord); border-radius: 11px; color: var(--sous); cursor: pointer; }
  .filtre.actif { border-color: var(--or); color: var(--or2); background: #2e2417; }
  .cartes { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
  .carte { background: var(--panneau2); border: 1px solid var(--bord); border-left: 4px solid var(--or); border-radius: 5px; padding: 10px; cursor: pointer; }
  .carte:hover { border-color: var(--or); }
  .carte .cn { font-size: 15px; color: var(--or2); }
  .carte .cs { font-size: 11px; color: var(--sous); margin-top: 3px; line-height: 1.5; }
  .pastille { display: inline-block; width: 10px; height: 10px; border-radius: 50%; border: 1px solid #00000055; margin-right: 5px; vertical-align: -1px; }
  .identite { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
  .medaillon { width: 76px; height: 92px; min-width: 76px; border-radius: 6px; border: 2px solid var(--or); background: #241a10; overflow: hidden; }
  .medaillon svg, .medaillon img { width: 100%; height: 100%; display: block; }
  .k { color: var(--or2); font-weight: bold; }
  .alerte { color: var(--ecl); font-size: 12px; }
  .ligne-eq { font-family: Verdana, sans-serif; font-size: 11px; color: var(--sous); margin-top: 6px; }
  .grosse-carte { background: var(--panneau); border: 1px solid var(--bord); border-radius: 6px; padding: 16px; }
</style>
</head>
<body>

<header class="top">
  <div>
    <h1>Le générateur de leaders et de semi-leaders</h1>
    <div class="mini">Édition 8 — moteur de la maquette de fiche, matrice de la grille des métiers, registre de la fiche des races. v0.4 du 8 novembre 2026.</div>
  </div>
  <div class="rangée" style="flex:none">
    <button class="btn sec" onclick="exporter()">EXPORTER LA PARTIE (JSON)</button>
    <label class="btn sec" style="margin:0;cursor:pointer">IMPORTER<input type="file" id="fImport" accept=".json" style="display:none" onchange="importer(this)"></label>
  </div>
</header>

<div class="tabs">
  <div class="tab actif" id="t-atelier" onclick="vue('atelier')">ATELIER DE CRÉATION</div>
  <div class="tab" id="t-registre" onclick="vue('registre')">REGISTRE DES PERSONNAGES</div>
  <div class="tab" id="t-puissances" onclick="vue('puissances')">PUISSANCES</div>
  <div class="tab" id="t-fiche" onclick="vue('fiche')">FICHE</div>
</div>

<section class="vue actif" id="v-atelier"></section>
<section class="vue" id="v-registre"></section>
<section class="vue" id="v-puissances"></section>
<section class="vue" id="v-fiche"></section>

<script>
/* ============================================================
   1. LE GÉNÉRATEUR ALÉATOIRE DÉTERMINISTE (mulberry32)
   ============================================================ */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function R(seed) {
  var f = mulberry32(seed);
  return {
    f: f,
    rint: function (a, b) { return a + Math.floor(f() * (b - a + 1)); },
    pick: function (arr) { return arr[Math.floor(f() * arr.length)]; },
    chance: function (p) { return f() < p; }
  };
}
function graine() { return Math.floor(Math.random() * 2147483646) + 1; }

/* ============================================================
   2. LES DONNÉES É8 — habiletés, paires, bases
   Paires des six premières créations : É7/maquette.
   Paires d'Ing à Mnf : PROPOSITIONS de l'assistant (8 novembre).
   ============================================================ */
var CARACS = ["For", "Dex", "Con", "Int", "Sag", "Cha"];
var HABS = {
  Cbt: { nom: "Combat", base: 0, paire: ["For", "Dex"] },
  Srv: { nom: "Survie", base: 0, paire: ["Sag", "Con"] },
  Trc: { nom: "Traque", base: 5, paire: ["Sag", "Dex"] },
  Dse: { nom: "Discrétion extérieure", base: 5, paire: ["Dex", "Sag"] },
  Dsv: { nom: "Discrétion en ville", base: 5, paire: ["Dex", "Cha"] },
  Vol: { nom: "Vol", base: 5, paire: ["Dex", "Int"] },
  Ass: { nom: "Assassinat", base: 5, paire: ["Dex", "Int"] },
  Esp: { nom: "Espionnage", base: 5, paire: ["Int", "Cha"] },
  Sed: { nom: "Séduction", base: 5, paire: ["Cha", "Dex"] },
  Plt: { nom: "Politique", base: 5, paire: ["Cha", "Int"] },
  Ngc: { nom: "Négoce", base: 5, paire: ["Cha", "Int"] },
  Adm: { nom: "Administration", base: 10, paire: ["Int", "Cha"] },
  Itd: { nom: "Intimidation", base: 5, paire: ["Cha", "For"] },
  Dsf: { nom: "Désinformation", base: 0, paire: ["Cha", "Int"] },
  Bbl: { nom: "Bibliothèque et recherche", base: 5, paire: ["Int", "Sag"] },
  Cpt: { nom: "Charpenterie", base: 0, paire: ["Int", "For"] },
  Cst: { nom: "Construction", base: 0, paire: ["Int", "Con"] },
  Frg: { nom: "Forge", base: 0, paire: ["Int", "For"] },
  Exa: { nom: "Exploitation agricole", base: 0, paire: ["Sag", "Con"] },
  Exf: { nom: "Exploitation forestière", base: 0, paire: ["For", "Sag"] },
  Exm: { nom: "Exploitation minière", base: 0, paire: ["Int", "Con"] },
  Ing: { nom: "Ingénierie", base: 0, paire: ["Int", "Con"], prop: true },
  Nav: { nom: "Navigation", base: 0, paire: ["Int", "Sag"], prop: true },
  Med: { nom: "Médecine", base: 0, paire: ["Int", "Sag"], prop: true },
  Lgs: { nom: "Logistique", base: 0, paire: ["Int", "Sag"], prop: true },
  Alc: { nom: "Alchimie", base: 0, paire: ["Int", "Dex"], prop: true },
  Mnf: { nom: "Manufacture", base: 0, paire: ["Dex", "Int"], prop: true }
};
var ORDRE_HABS = ["Cbt","Srv","Trc","Dse","Dsv","Vol","Ass","Esp","Sed","Plt","Ngc","Adm","Itd","Dsf","Bbl","Cpt","Cst","Frg","Exa","Exf","Exm","Ing","Nav","Med","Lgs","Alc","Mnf"];

/* ============================================================
   3. LES PROFESSIONS — matrice de la grille des métiers v0.7
   canaux en % ; * = proposition É8 ; prod = canal direct Adm
   ============================================================ */
var PROFS = {
  "Artisan charpentier":  { s: "Ch", fam: "prod",   c: { Cpt: 100, Ngc: 50, Mnf: 50, Adm: 25 } },
  "Artisan constructeur": { s: "Cn", fam: "prod",   c: { Cst: 100, Ngc: 50, Mnf: 50, Itd: 25, Adm: 25 }, prop: ["Itd"] },
  "Artisan forgeron":     { s: "Fg", fam: "prod",   c: { Frg: 100, Ngc: 50, Mnf: 50, Itd: 25, Adm: 25 }, prop: ["Itd"] },
  "Artisan manufacturier":{ s: "Mu", fam: "prod",   c: { Mnf: 100, Ngc: 50, Adm: 25 } },
  "Exploitant agricole":  { s: "Ea", fam: "prod",   c: { Exa: 100, Ngc: 50, Mnf: 50, Adm: 25 } },
  "Exploitant forestier":{ s: "Ef", fam: "prod",   c: { Exf: 100, Ngc: 50, Mnf: 50, Adm: 25 } },
  "Exploitant minier":   { s: "Em", fam: "prod",   c: { Exm: 100, Ngc: 50, Mnf: 50, Itd: 25, Adm: 25 }, prop: ["Itd"] },
  "Alchimiste":          { s: "Al", fam: "pur",    c: { Bbl: 75, Cst: 50, Frg: 100, Alc: 100, Mnf: 50, Ngc: 50, Adm: 25 }, prop: ["Alc"] },
  "Guerrier":            { s: "Gu", fam: "nonl",   c: { Cbt: 100, Dse: 50, Frg: 75, Srv: 75, Trc: 50, Itd: 50 }, prop: ["Itd"] },
  "Artiste martial":     { s: "Am", fam: "nonl",   c: { Ass: 50, Cbt: 100, Dse: 75, Dsv: 50, Esp: 25, Srv: 75, Trc: 25, Vol: 25, Itd: 50, Dsf: 25 }, prop: ["Itd","Dsf"] },
  "Assassin":            { s: "As", fam: "ombre",  c: { Ass: 100, Cbt: 50, Dse: 50, Dsv: 100, Esp: 75, Srv: 50, Trc: 75, Vol: 50, Itd: 50, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Voleur":              { s: "Vo", fam: "ombre",  c: { Ass: 50, Cbt: 25, Dse: 25, Dsv: 100, Esp: 100, Ngc: 50, Srv: 25, Trc: 50, Vol: 100, Itd: 25, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Espion":              { s: "Ep", fam: "ombre",  c: { Esp: 100, Dsv: 100, Dse: 75, Trc: 75, Dsf: 75, Plt: 50 }, prop: ["Esp","Dse","Trc","Dsf","Plt"] },
  "Marchand":            { s: "Mc", fam: "commerce", c: { Bbl: 50, Cbt: 50, Cpt: 25, Cst: 25, Dse: 25, Dsv: 25, Esp: 25, Exa: 25, Exf: 25, Exm: 25, Frg: 25, Ngc: 100, Plt: 75, Sed: 25, Srv: 75, Trc: 25, Vol: 25, Itd: 25, Dsf: 25 }, prop: ["Itd","Dsf"] },
  "Courtisane":          { s: "Co", fam: "commerce", c: { Bbl: 25, Dsv: 50, Esp: 75, Ngc: 50, Plt: 75, Sed: 100, Itd: 25, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Berserker":           { s: "Bs", fam: "nonl",   c: { Cbt: 100, Srv: 75, Itd: 75, Trc: 50, Dse: 25 } },
  "Ingénieur":           { s: "Ig", fam: "nonl",   c: { Ing: 100, Cst: 100, Cpt: 75, Exm: 75, Frg: 75, Cbt: 25 } },
  "Marin":               { s: "Mr", fam: "nonl",   c: { Nav: 100, Cbt: 50, Cpt: 50, Lgs: 25 } },
  "Chirurgien":          { s: "Sn", fam: "nonl",   c: { Med: 100, Srv: 50, Bbl: 25, Plt: 25, Lgs: 25 } },
  "Mage":                { s: "Mg", fam: "pur",    c: { Bbl: 75 } },
  "Archimage":           { s: "Ar", fam: "hyb",    c: { Bbl: 100 } },
  "Évocateur":           { s: "Ev", fam: "pur",    c: { Bbl: 75 } },
  "Conjurateur":         { s: "Cj", fam: "pur",    c: { Bbl: 75, Esp: 50, Dsf: 25 }, prop: ["Bbl","Esp","Dsf"] },
  "Illusionniste":       { s: "Il", fam: "pur",    c: { Bbl: 75, Dse: 25, Dsv: 50, Esp: 50, Dsf: 50 }, prop: ["Dse","Dsf"] },
  "Mentaliste":          { s: "Me", fam: "pur",    c: { Bbl: 75, Esp: 50, Ngc: 50, Plt: 50, Vol: 50, Itd: 25, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Nécromant":           { s: "Nc", fam: "hyb",    c: { Bbl: 75, Dsv: 75 } },
  "Démoniste":           { s: "De", fam: "hyb",    c: { Bbl: 75, Cbt: 50, Ngc: 75, Sed: 75, Itd: 50, Dsf: 25 }, prop: ["Itd","Dsf"] },
  "Maléficant":          { s: "Ml", fam: "hyb",    c: { Ass: 25, Bbl: 75, Dse: 25, Dsv: 25, Esp: 50, Ngc: 100, Plt: 75, Itd: 75, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Sorcier":             { s: "Sc", fam: "hyb",    c: { Bbl: 75, Plt: 25 } },
  "Warlock":             { s: "Wl", fam: "hyb",    c: { Bbl: 75 } },
  "Prêtre":              { s: "Pr", fam: "pur",    c: { Bbl: 50, Cbt: 75, Plt: 75, Sed: 25 } },
  "Druide":              { s: "Dr", fam: "pur",    c: { Cbt: 50, Cpt: 50, Cst: 25, Dse: 100, Exa: 75, Exf: 75, Exm: 50, Srv: 100, Trc: 75 } },
  "Chaman":              { s: "Sh", fam: "pur",    c: { Dse: 75, Esp: 25, Srv: 100, Trc: 75 }, prop: ["Esp"] },
  "Devin":               { s: "Dv", fam: "pur",    c: { Bbl: 75, Esp: 50, Ngc: 50, Vol: 50, Dsf: 25 }, prop: ["Dsf"] },
  "Sorcier des mers":    { s: "Sm", fam: "pur",    c: { Bbl: 50, Cpt: 75, Plt: 25, Itd: 25 }, prop: ["Plt","Itd"] },
  "Barde":               { s: "Ba", fam: "semi",   c: { Bbl: 25, Cbt: 50, Cpt: 25, Cst: 25, Dse: 50, Dsv: 50, Esp: 50, Exa: 25, Exf: 25, Exm: 25, Frg: 25, Ngc: 25, Plt: 25, Sed: 75, Srv: 50, Vol: 50, Itd: 25, Dsf: 50 }, prop: ["Itd","Dsf"] },
  "Paladin":             { s: "Pa", fam: "semi",   c: { Cbt: 100, Exm: 50, Plt: 50, Srv: 50, Itd: 25 }, prop: ["Itd"] },
  "Ranger":              { s: "Ra", fam: "semi",   c: { Cbt: 100, Dse: 100, Exf: 50, Frg: 50, Srv: 100, Trc: 100 } },
  "Sicaire":             { s: "Si", fam: "semi",   c: { Ass: 75, Bbl: 25, Cbt: 50, Dse: 50, Dsv: 100, Esp: 100, Srv: 50, Trc: 50, Vol: 75, Itd: 75, Dsf: 75 }, prop: ["Itd","Dsf","Bbl"] },
  "Warmage":              { s: "Wa", fam: "semi",   c: { Bbl: 25, Cbt: 75, Dse: 25, Srv: 50, Trc: 25, Itd: 25 }, prop: ["Itd"] },
  "Templier":            { s: "Te", fam: "semi",   c: { Cbt: 100, Frg: 75, Plt: 50, Srv: 50, Trc: 75, Itd: 50 }, prop: ["Itd"] }
};
var NOMS_PROFS = Object.keys(PROFS);
var ARTISANS_EQ = ["Artisan charpentier","Artisan constructeur","Artisan forgeron","Artisan manufacturier","Exploitant agricole","Exploitant forestier","Exploitant minier","Alchimiste","Ingénieur","Chirurgien"];
var FAM_LABEL = { prod: "production", nonl: "non lanceur", ombre: "ombre", commerce: "commerce", pur: "pur lanceur", hyb: "hybride", semi: "semi-lanceur" };

/* ============================================================
   4. LES RACES — registre de la fiche des races v0.5
   ajust 3.5 [For,Dex,Con,Int,Sag,Cha] ; ind = indicatif MM/É8
   maj : majoration de base ; plat : bonus plat au BE ;
   terr : bonus de terrain ; versat : plancher de versatilité
   ============================================================ */
var RACES = {
  "Humain":         { cat: "T1", nh: 0, tc: 1.0, pst: 10, pmv: 12, aj: [0,0,0,0,0,0], versat: 2, plat: {}, maj: {}, terr: [], port: { peau: ["#e8c5a0","#d9ae8a","#c99b76","#a97a54","#8a5a3b"], sil: "std", oreilles: "std", barbe: [0.35,0.6] } },
  "Nain":           { cat: "T1", nh: 3, tc: 1.0, pst: 10, pmv: 6, aj: [0,0,2,0,0,-2], versat: 0, plat: { Exm: 5, Frg: 5 }, maj: { Exm: 5 }, terr: [], port: { peau: ["#d9a87c","#c9956a","#b8835a"], sil: "trapu", oreilles: "std", barbe: [1,1] } },
  "Elfe":           { cat: "T1", nh: 2, tc: 0.84, pst: 6, pmv: 12, aj: [0,2,-2,0,0,0], versat: 0, plat: {}, maj: {}, terr: [{ hab: ["Trc","Dse"], b: 20, t: "forêt" }], port: { peau: ["#f0dcc4","#e6cdb0","#dcc19e"], sil: "svelte", oreilles: "pointues", barbe: [0,0] } },
  "Gnome":          { cat: "T1", nh: 0, tc: 0.59, pst: 2, pmv: 6, aj: [-2,0,2,0,0,0], versat: 0, plat: { Frg: 5, Alc: 10 }, maj: {}, terr: [], port: { peau: ["#e6c8a4","#d9b68e"], sil: "petit", oreilles: "larges", barbe: [0.5,0.5] } },
  "Hobbit":         { cat: "T1", nh: 0.5, tc: 0.74, pst: 4, pmv: 6, aj: [-2,2,0,0,0,0], versat: 0, plat: { Vol: 5 }, maj: { Dsv: 5 }, terr: [], port: { peau: ["#ecc0a0","#e0b48e","#d4a67c"], sil: "petit", oreilles: "std", barbe: [0,0.2] } },
  "Demi-elfe":      { cat: "T1", nh: 0, tc: 1.0, pst: 10, pmv: 12, aj: [0,0,0,0,0,0], versat: 0, plat: { Trc: 5, Dse: 5, Dsv: 5 }, maj: {}, terr: [], port: { peau: ["#ecd2b4","#e2c6a4","#d4b48e"], sil: "std", oreilles: "pointues", barbe: [0.15,0.4] } },
  "Demi-orque":     { cat: "T1", nh: 0, tc: 1.0, pst: 10, pmv: 12, aj: [2,0,0,-2,0,-2], versat: 0, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#a8b088","#9aa276","#8c9468"], sil: "massif", oreilles: "std", barbe: [0,0.2], defenses: true } },
  "Drow":           { cat: "T1", nh: 6, tc: 0.84, pst: 6, pmv: 12, aj: [0,2,-2,2,0,2], ind: true, versat: 0, plat: { Sed: 5, Ass: 5 }, maj: {}, terr: [{ hab: ["Dsv","Trc"], b: 10, t: "souterrain" }, { hab: ["Dsv","Trc"], b: 5, t: "forêt épaisse" }], port: { peau: ["#584a5c","#4a3e4e","#3c3242"], sil: "svelte", oreilles: "pointues", barbe: [0,0], cheveux: ["#e8e4e0","#d0ccc8"] } },
  "Nain gris":      { cat: "T1", nh: 3, tc: 1.0, pst: 10, pmv: 6, aj: [0,0,2,0,0,-2], ind: true, versat: 0, plat: {}, maj: {}, terr: [], port: { peau: ["#9a948e","#8a847e"], sil: "trapu", oreilles: "std", barbe: [0.8,1], cheveux: ["#5c5650","#4a443e"] } },
  "Elfe aquatique": { cat: "T1", nh: 0, tc: 0.84, pst: 6, pmv: 12, aj: [0,2,-2,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [{ hab: ["Dsv","Trc"], b: 15, t: "mer" }], port: { peau: ["#b8d4c8","#a8c8bc","#98bcae"], sil: "svelte", oreilles: "pointues", barbe: [0,0] } },
  "Hobgobelin":     { cat: "T2", nh: 0, tc: 1.0, pst: 10, pmv: 12, aj: [0,2,2,0,0,0], ind: true, versat: 0, plat: {}, maj: { Itd: 10 }, terr: [], port: { peau: ["#b09858","#a08848","#907838"], sil: "std", oreilles: "pointues", barbe: [0,0.3] } },
  "Orc":            { cat: "T2", nh: 1, tc: 1.0, pst: 10, pmv: 12, aj: [4,0,2,-2,-2,-2], ind: true, versat: 0, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#7a9a5c","#6a8a4c","#5c7a44"], sil: "massif", oreilles: "pointues", barbe: [0,0.2], defenses: true } },
  "Uruk":           { cat: "T2", nh: 5, tc: 1.09, pst: 13, pmv: 12, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: { Itd: 10 }, terr: [], port: { peau: ["#8c9478","#7c8468","#6c7458"], sil: "massif", oreilles: "pointues", barbe: [0,0.2], defenses: true } },
  "Gnoll":          { cat: "T2", nh: 2, tc: 1.19, pst: 17, pmv: 9, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: { Itd: 10 }, terr: [], port: { peau: ["#b09c6c","#a08c5c","#907c4c"], sil: "std", oreilles: "larges", barbe: [0.6,0.8], museau: true } },
  "Goblin":         { cat: "T2", nh: 1, tc: 0.74, pst: 4, pmv: 12, aj: [0,2,2,0,0,0], ind: true, versat: 0, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#8ca86c","#7c985c","#6c8850"], sil: "petit", oreilles: "larges", barbe: [0,0] } },
  "Kobold":         { cat: "T2", nh: 0.88, tc: 0.59, pst: 2, pmv: 6, aj: [-4,2,-2,0,0,0], ind: true, versat: 0, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#a05c3c","#905034","#804830"], sil: "petit", oreilles: "larges", barbe: [0,0], cornes: true } },
  "Homme lézard":   { cat: "T2", nh: 2, tc: 1.19, pst: 17, pmv: 12, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [], port: { peau: ["#6c9a6c","#5c8a5c","#4c7a50"], sil: "std", oreilles: "std", barbe: [0,0], ecailles: true } },
  "Sahuagin":       { cat: "T2", nh: 2, tc: 1.19, pst: 17, pmv: 24, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [{ hab: ["Trc"], b: 10, t: "mer" }], port: { peau: ["#4c7a7c","#3c6a6c","#2c5a5e"], sil: "std", oreilles: "larges", barbe: [0,0], ecailles: true } },
  "Merman":         { cat: "T2", nh: 0, tc: 1.0, pst: 10, pmv: 18, aj: [0,0,0,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [], port: { peau: ["#8cb0b8","#7ca0a8"], sil: "std", oreilles: "std", barbe: [0,0.2], ecailles: true } },
  "Triton":         { cat: "T2", nh: 0.04, tc: 1.09, pst: 13, pmv: 15, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [], port: { peau: ["#9ab8c8","#8aa8b8"], sil: "std", oreilles: "std", barbe: [0,0.2], ecailles: true } },
  "Quickling":      { cat: "T2", nh: 0.85, tc: 0.46, pst: 1, pmv: 96, aj: [-2,4,0,2,0,0], ind: true, versat: 0, plat: {}, maj: { Dsv: 10 }, terr: [], port: { peau: ["#c8bce0","#b8acce"], sil: "petit", oreilles: "pointues", barbe: [0,0] } },
  "Centaure":       { cat: "T2", nh: 3.93, tc: 1.59, pst: 40, pmv: 18, aj: [2,0,2,0,0,0], ind: true, versat: 0, plat: {}, maj: {}, terr: [], port: { peau: ["#d4ae84","#c89a72"], sil: "massif", oreilles: "pointues", barbe: [0.3,0.6] } },
  "Ogre":           { cat: "T2", nh: 5, tc: 1.91, pst: 70, pmv: 9, aj: [8,0,4,0,0,-2], ind: true, versat: 0, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#b0a078","#a09068","#908060"], sil: "massif", oreilles: "std", barbe: [0,0.2], defenses: false, massif: true } },
  "Highman":        { cat: "T2", nh: 10, tc: 1.52, pst: 35, pmv: 12, aj: [2,0,2,0,0,0], ind: true, versat: 5, plat: {}, maj: { Itd: 5 }, terr: [], port: { peau: ["#e8ccaa","#dcbe96","#d0b084"], sil: "massif", oreilles: "std", barbe: [0.2,0.5] } },
  "Drider":         { cat: "T2", nh: 6.4, tc: 1.19, pst: 17, pmv: 12, aj: [0,2,2,2,0,2], ind: true, versat: 0, plat: {}, maj: {}, terr: [{ hab: ["Dsv","Trc"], b: 5, t: "souterrain" }], port: { peau: ["#584a5c","#4a3e4e"], sil: "svelte", oreilles: "pointues", barbe: [0,0], cheveux: ["#d8d4d0","#c0bcb8"] } }
};
var NOMS_RACES = Object.keys(RACES);

/* ============================================================
   5. LES STATURES — sentences de l'auteur du 8 novembre
   budgets de points : PROPOSITIONS (fichier de calibrage)
   ============================================================ */
var STATURES = {
  LE: { nom: "Leader Élite", nprof: 3, budget: 100, nmax: 3, achatMax: 24, etat: "10 à 20 (sentence)", etatDef: 14, niveaux: [[20, 30], [12, 20], [6, 12]], pion: "L", titres: ["Roi", "Haut Roi", "Grand Duc", "Prince-Évêque", "Régent", "Archiduc"] },
  L:  { nom: "Leader", nprof: 3, budget: 80, nmax: 2, etat: "10 à 20 (sentence)", etatDef: 14, niveaux: [[15, 25], [8, 15], [4, 10]], pion: "L", titres: ["Duc", "Comte", "Maréchal", "Général", "Gouverneur", "Baron"] },
  SL:  { nom: "Semi-Leader", nprof: 2, budget: 60, nmax: 1, etat: "5 à 10 (réduit — sentence du 8 novembre)", etatDef: 7, niveaux: [[12, 20], [6, 14]], pion: "S", titres: ["Chevalier", "Capitaine", "Bailli", "Prévôt", "Banneret"] },
  MS:  { nom: "Maître Spécialiste", nprof: 2, budget: 50, nmax: 1, artisan: true, etat: "sans état-major (pion S de spécialiste)", etatDef: 0, niveaux: [[10, 18], [5, 12]], pion: "S", titres: ["Maître", "Savant", "Docteur", "Premier"] },
  MA:  { nom: "Maître Artisan", nprof: 1, budget: 40, nmax: 1, artisan: "only", etat: "sans état-major (pion S de spécialiste)", etatDef: 0, niveaux: [[12, 20]], pion: "S", titres: ["Maître", "Maître Artisan", "Patricien", "Maïor"] }
};
var COUT_ACHAT = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 6, 15: 8, 16: 10, 17: 13, 18: 16, 19: 20, 20: 24, 21: 28, 22: 32, 23: 36, 24: 40 };

/* ============================================================
   6. NOMS, TITRES, LIEUX — générateurs syllabiques
   ============================================================ */
var SYL = {
  humain: { a: ["Al","Ber","Cal","Dor","Ed","Fal","Gar","Hal","Jor","Kel","Mar","Nor","Rol","Seb","Ther","Val","Wil","Bran","Cael","Dael"], b: ["a","e","i","o","u","ar","en","or","an","ir","al"], c: ["ric","dan","win","mund","bert","mar","tor","val","dric","ran","fred","ulf","wyn","stan"] },
  nain: { a: ["Bal","Dur","Grom","Thra","Kaz","Bor","Nal","Gim","Bru","Dain","Thor","Kil"], b: ["a","o","u","un","in","ar"], c: ["din","grim","nir","bur","rik","dor","lin","bek","ur","nar"] },
  elfe: { a: ["Ael","Cael","Elu","Fae","Ith","Lor","Mae","Nael","Syl","Thal","Vae","Yll"], b: ["a","e","i","ae","ia","ei"], c: ["rion","thil","wen","dir","las","riel","nor","mir","sarn","thas"] },
  drow: { a: ["Vel","Zin","Mal","Quic","Xan","Nal","Ily","Sza","Vic","Dray"], b: ["a","e","i","y","ae"], c: ["thra","zar","viir","noth","eena","riia","ssin","dus","arn","lyn"] },
  gnome: { a: ["Biz","Fon","Wiz","Nam","Glim","Tob","Pip","Diz","Bob","Zook"], b: ["a","o","i","e"], c: ["zo","bo","wick","noz","ble","kin","spark","gear","toe","fizz"] },
  hobbit: { a: ["Bil","Mer","Per","Sam","Ros","Wil","Fol","Tom","Dud","Len"], b: ["b","m","d","n","r","w"], c: ["o","a","e","in","wise","foot","bottle","kins","dy","burrow"] },
  orc: { a: ["Gro","Kar","Mug","Naz","Ug","Zog","Dro","Gor","Skab","Thok"], b: ["a","o","u","ar","ug"], c: ["nak","gash","mash","rot","ug","zog","durk","snik","tar","bloo"] },
  goblin: { a: ["Nix","Skit","Grub","Zib","Pox","Snit","Flib","Mux"], b: ["a","i","e","o"], c: ["gob","snot","rik","grik","bit","zix","nab","tooth"] },
  sibilant: { a: ["Ss","Zsh","Thra","Xss","Kss","Hss","Vss"], b: ["a","i","o","e"], c: ["kar","zish","ak","hisz","rasz","iss","okh","zzt"] },
  highman: { a: ["Ana","Elo","Ithi","Oro","Uru","Aia","Eri","Ola"], b: ["r","l","n","m","th"], c: ["mus","dor","tar","on","iel","aan","ar","os"] }
};
var RACE_SYL = { "Humain":"humain","Nain":"nain","Elfe":"elfe","Gnome":"gnome","Hobbit":"hobbit","Demi-elfe":"elfe","Demi-orque":"orc","Drow":"drow","Nain gris":"nain","Elfe aquatique":"elfe","Hobgobelin":"orc","Orc":"orc","Uruk":"orc","Gnoll":"sibilant","Goblin":"goblin","Kobold":"goblin","Homme lézard":"sibilant","Sahuagin":"sibilant","Merman":"sibilant","Triton":"humain","Quickling":"elfe","Centaure":"elfe","Ogre":"orc","Highman":"highman","Drider":"drow" };
var LIEUX = ["Vhalorn","Kharen","Dunmar","Aerendor","Brath","Colvic","Estmark","Ferrow","Grimstad","Halden","Ilmar","Jorvik","Karnth","Lorn","Mirad","Norvath","Ostmark","Pelennor","Quorin","Ravensmoor","Sundvik","Tarnholm","Uldric","Verlaine","Wyrmhaven"];
var ALIGNEMENTS = ["LN","NN","CN","LG","NG","CG","LE","NE","CE"];
var ALIGN_RACE = { "Gnome":"NG","Hobbit":"LG","Drow":"CE","Nain gris":"LE","Orc":"LE","Uruk":"LE","Gnoll":"CE","Goblin":"LE","Kobold":"LE","Homme lézard":"NN","Sahuagin":"LE","Merman":"NN","Triton":"NG","Quickling":"CE","Centaure":"CG","Ogre":"CE","Highman":"NN","Drider":"CE" };
var FEM = ["a","e","i","ia","ée","ie"];
function genNom(rng, race) {
  var b = SYL[RACE_SYL[race] || "humain"];
  var n = rng.pick(b.a) + (rng.chance(0.55) ? rng.pick(b.b) : "") + rng.pick(b.c);
  var nom = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
  if (rng.chance(0.3)) { var b2 = SYL.humain; nom += " " + (rng.pick(b2.a) + rng.pick(b2.c)); }
  return nom;
}
function genTitre(rng, stature, profPrincipale, nom) {
  var t = rng.pick(STATURES[stature].titres);
  var flavor = { "Guerrier":"-Général", "Mage":"-Archimage", "Prêtre":"-Évêque", "Marchand":"-Bourgmestre", "Voleur":"-Renard", "Nécromant":"-Nécro", "Alchimiste":"-Parfumeur", "Druidede": "" };
  var suf = flavor[profPrincipale] || "";
  return t + suf + " de " + rng.pick(LIEUX);
}
var BIO_ORIG = ["né dans les ruelles basses", "né dans une maison de marchands", "issu de la petite noblesse", "enfant des légions", "fils de forgerons", "élevé au monastère", "né sur les routes du sel", "recueilli par une guilde"];
var BIO_EVENT = ["une campagne perdue lui laissa une cicatrice et une rancune", "un duel de cour fit sa réputation", "il survécut à un siège de trois ans", "la peste emporta sa maison, lui laissant les clés et les dettes", "un procès en hérésie fit sa fortune politique", "il tint un col seul pendant une nuit et un jour", "la ghilde des espions le forma puis le renia", "un héritage disputé lui apprit le prix du sang"];
var BIO_TRAIT = ["il parle peu et retient tout", "il paie ses dettes, même les mauvaises", "sa loyauté s'achète, mais reste acquise", "il a la patience de la pierre et la mémoire du corbeau", "il sourit rarement, et jamais deux fois à la même personne", "il préfère une vérité cruelle à un mensonge confortable"];
var BIO_AMB = ["il veut une couronne", "il veut fonder une dynastie", "il veut effacer un nom de l'histoire", "il veut une paix que personne ne pourra briser", "il veut une guerre que lui seul saura finir", "il veut que sa ville survive à tout, même à lui"];
function genBio(rng, rec) {
  var f = rec.race === "Drow" || rec.race === "Drider" ? "née" : "né";
  return rec.nom + ", " + rng.pick(BIO_ORIG) + ", " + f + " " + rec.race.toLowerCase() + ". " +
    "Dans sa vingt-cinquième année, " + rng.pick(BIO_EVENT) + ". On dit de lui que " + rng.pick(BIO_TRAIT) +
    ". Ce qu'il veut vraiment : " + rng.pick(BIO_AMB) + ".";
}

/* ============================================================
   7. LE MOTEUR É8 — calcul de la fiche
   ============================================================ */
function mod(score) { return Math.floor((score - 10) / 2); }
function modsCaracs(rec) {
  var m = {};
  CARACS.forEach(function (c) { m[c] = mod(rec.caracs[c]); });
  return m;
}
function niveauCanaux(rec, sig) {
  var meilleur = { v: 0, src: "" };
  rec.professions.forEach(function (p) {
    var def = PROFS[p.nom]; if (!def) return;
    var c = def.c[sig];
    if (c) {
      var v = Math.ceil(p.niveau * c / 100);
      if (v > meilleur.v) meilleur = { v: v, src: def.s + " " + c + "%" };
    }
  });
  return meilleur;
}
function computeHabiletes(rec) {
  var m = modsCaracs(rec);
  var race = RACES[rec.race];
  var out = [];
  ORDRE_HABS.forEach(function (sig) {
    var h = HABS[sig];
    if (sig === "Adm") return; // traitée après
    var canal = niveauCanaux(rec, sig);
    var natBase = h.base + (race.maj[sig] || 0);
    var val = canal.v > 0 ? canal.v : natBase;
    var interdit = canal.v === 0 && natBase === 0;
    var versat = race.versat || 0;
    var effVal = interdit ? (versat > 0 ? versat : null) : Math.max(val, versat);
    var plat = race.plat[sig] || 0;
    var terr = race.terr.filter(function (t) { return t.hab.indexOf(sig) >= 0; });
    var be = effVal === null ? null : effVal + m[h.paire[0]] + m[h.paire[1]] + plat;
    out.push({ sig: sig, nom: h.nom, val: effVal, natBase: natBase, canal: canal.v, src: canal.src, interdit: interdit, versat: (interdit && versat > 0 ? versat : (versat > 0 && val < versat ? versat : 0)), plat: plat, terr: terr, be: be, paire: h.paire, prop: h.prop });
  });
  return out;
}
function computeAdm(rec, pltVal) {
  var h = HABS.Adm;
  var m = modsCaracs(rec);
  var canal = niveauCanaux(rec, "Adm");
  var admVal = canal.v > 0 ? canal.v : Math.max(10, Math.floor(pltVal / 2));
  var note = canal.v > 0 ? "canal direct (" + canal.src + ")" : "Adm = Plt ÷ 2 (défaut É7), base 10 native";
  return { sig: "Adm", nom: h.nom, val: admVal, natBase: 10, canal: canal.v, src: canal.src, interdit: false, versat: 0, plat: 0, terr: [], be: admVal + m.Int + m.Cha, paire: h.paire, prop: false, noteAdm: note };
}
function computePlt(rec) {
  var canal = niveauCanaux(rec, "Plt");
  var race = RACES[rec.race];
  var natBase = 5 + (race.maj["Plt"] || 0);
  var versat = race.versat || 0;
  var val = canal.v > 0 ? canal.v : natBase;
  val = Math.max(val, versat);
  return val;
}
function computeFiche(rec) {
  var m = modsCaracs(rec);
  var pltVal = computePlt(rec);
  var habs = computeHabiletes(rec);
  var adm = computeAdm(rec, pltVal);
  // Plt des productions : processus inversé (Plt = Adm ÷ 2)
  var prodSeul = rec.professions.every(function (p) { return PROFS[p.nom] && PROFS[p.nom].fam === "prod"; });
  if (prodSeul && rec.professions.length > 0 && niveauCanaux(rec, "Plt").v === 0) {
    var plt = habs.filter(function (h) { return h.sig === "Plt"; })[0];
    plt.val = Math.max(5, Math.floor(adm.val / 2));
    plt.noteAdm = "processus inversé : Plt = Adm ÷ 2";
    plt.be = plt.val + m.Cha + m.Int;
  }
  habs.splice(11, 0, adm);
  var maxNiv = 0;
  rec.professions.forEach(function (p) { maxNiv = Math.max(maxNiv, p.niveau); });
  var cbt = habs.filter(function (h) { return h.sig === "Cbt"; })[0];
  var cbtVal = cbt && cbt.val !== null ? cbt.val : 0;
  var lds = ldsDe(cbtVal);
  var bcmBase = bcmDe(cbtVal);
  return {
    mods: m, habs: habs, plt: pltVal, adm: adm,
    pa: Math.round(maxNiv / 10), pmv: 30,
    lds: lds, bcm: [bcmBase, bcmBase - 3, bcmBase - 6],
    cbtVal: cbtVal, race: RACES[rec.race]
  };
}
var TABLE_LDS = [[3,6,-2],[7,10,0],[11,14,1],[15,18,2],[19,22,3],[23,26,4],[27,30,5],[31,34,6],[35,38,7],[39,42,8],[43,46,9]];
function ldsDe(cbt) {
  if (cbt < 3) return "—";
  for (var i = 0; i < TABLE_LDS.length; i++) { var t = TABLE_LDS[i]; if (cbt >= t[0] && cbt <= t[1]) return (t[2] >= 0 ? "+" : "") + t[2]; }
  return "+10";
}
function bcmDe(cbt) {
  if (cbt < 3) return 0;
  for (var i = 0; i < TABLE_LDS.length; i++) { var t = TABLE_LDS[i]; if (cbt >= t[0] && cbt <= t[1]) return t[2]; }
  return 10;
}

/* ============================================================
   8. LA RÉPARTITION AUTOMATIQUE DES POINTS D'ACHAT
   ============================================================ */
function poidsCaracs(rec) {
  var w = { For: 3, Dex: 3, Con: 3, Int: 3, Sag: 3, Cha: 3 };
  rec.professions.forEach(function (p) {
    var def = PROFS[p.nom]; if (!def) return;
    Object.keys(def.c).forEach(function (sig) {
      var c = def.c[sig]; if (!c || c < 25) return;
      var paire = HABS[sig].paire;
      var coef = c >= 100 ? 2.2 : c >= 75 ? 1.7 : c >= 50 ? 1.3 : 0.8;
      w[paire[0]] += p.niveau * coef;
      w[paire[1]] += p.niveau * coef * 0.6;
    });
  });
  if (rec.stature === "LE" || rec.stature === "L") w.Cha += 6;
  if (rec.stature === "SL") w.Cha += 2;
  return w;
}
function defautMax(rec) {
  /* Coches par défaut (sentence du 8 novembre) : les caractéristiques
     les plus pertinentes des professions retenues, au nombre que la
     stature autorise (LE 3, L 2, autres 1). */
  var st = STATURES[rec.stature];
  var w = { For: 3, Dex: 3, Con: 3, Int: 3, Sag: 3, Cha: 3 };
  rec.professions.forEach(function (p) {
    var def = PROFS[p.nom]; if (!def) return;
    Object.keys(def.c).forEach(function (sig) {
      var c = def.c[sig]; if (!c || c < 25) return;
      var paire = HABS[sig].paire;
      var coef = c >= 100 ? 2.2 : c >= 75 ? 1.7 : c >= 50 ? 1.3 : 0.8;
      w[paire[0]] += p.niveau * coef;
      w[paire[1]] += p.niveau * coef * 0.6;
    });
  });
  var tri = CARACS.slice().sort(function (a, b) { return w[b] - w[a] || CARACS.indexOf(a) - CARACS.indexOf(b); });
  return tri.slice(0, st.nmax);
}
function distribuerAuto(rec, seed) {
  var rng = R(seed);
  var w = poidsCaracs(rec);
  var scores = { For: 8, Dex: 8, Con: 8, Int: 8, Sag: 8, Cha: 8 };
  var reste = STATURES[rec.stature].budget;
  /* Phase 1 — les coches au maximum (18 à l'achat, hors modificateurs
     raciaux), dans l'ordre de pertinence ; le budget de chaque stature
     est taillé pour les porter tous. */
  var coches = (rec.maxCaracs || []).slice().sort(function (a, b) { return w[b] - w[a]; });
  coches.forEach(function (c) {
    if (CARACS.indexOf(c) < 0) return;
    var c18 = COUT_ACHAT[18] - COUT_ACHAT[scores[c]];
    if (c18 > 0 && c18 <= reste) { reste -= c18; scores[c] = 18; }
  });
  var garde = 0;
  while (reste > 0 && garde < 200) {
    garde++;
    var best = null, bestRatio = -1;
    CARACS.forEach(function (c) {
      if (scores[c] >= 18) return;
      var delta = COUT_ACHAT[scores[c] + 1] - COUT_ACHAT[scores[c]];
      if (delta > reste) return;
      var ratio = (w[c] + rng.f() * 2) / delta;
      if (ratio > bestRatio) { bestRatio = ratio; best = c; }
    });
    if (!best) break;
    reste -= COUT_ACHAT[scores[best] + 1] - COUT_ACHAT[scores[best]];
    scores[best]++;
  }
  return scores;
}
function coutAchatTotal(caracs, plafond) {
  var p = plafond || 18;
  var t = 0;
  CARACS.forEach(function (c) { t += COUT_ACHAT[Math.max(8, Math.min(p, caracs[c]))] || 0; });
  return t;
}

/* ============================================================
   9. LE PORTRAIT SVG PROCÉDURAL (déterministe par graine)
   ============================================================ */
function portraitSVG(rec, taille) {
  var t = taille || 200;
  var rng = R(rec.portraitSeed);
  var race = RACES[rec.race] || RACES["Humain"];
  var p = race.port;
  var peau = rng.pick(p.peau);
  var fam = rec.professions.length ? PROFS[rec.professions[0].nom].fam : "nonl";
  var vetement = { prod: "#7a5a34", nonl: "#5c5c6e", ombre: "#3a3a44", commerce: "#7a2a3a", pur: "#4a3a6e", hyb: "#5a3a5c", semi: "#4a4a6a" }[fam] || "#5c5c6e";
  var cheveuxCols = p.cheveux || ["#3c2a1a","#57402a","#6e5236","#26201a","#8a6a3c","#a88a5a","#b8b0a8"];
  var cheveux = rng.pick(cheveuxCols);
  var yeuxCols = ["#4a3a26","#2e4a3a","#3a4a6a","#5a4a2a","#2a2a2a","#6a6a3c"];
  var yeux = rng.pick(yeuxCols);
  var sil = p.sil || "std";
  var rxTete = sil === "massif" ? 42 : sil === "trapu" ? 40 : sil === "svelte" ? 30 : sil === "petit" ? 32 : 34;
  var ryTete = rxTete + (sil === "massif" ? 2 : 6);
  var cx = 100, cy = 92;
  var barbe = rng.chance(p.barbe[1]) ? "pleine" : (rng.chance(p.barbe[0]) ? "rase" : "aucune");
  var styleCheveux = rng.pick(["arrière","mèche","dégarni","brossé","sauvage","chignon"]);
  var orn = rec.stature === "LE" ? "couronne" : rec.stature === "L" ? "diadème" : rec.stature === "SL" ? "fermail" : rec.stature === "MS" ? "chainette" : "rond";
  var cadre = { LE: "#e8c96a", L: "#c9a227", SL: "#a8b0b8", MS: "#b08a4a", MA: "#b08a4a" }[rec.stature] || "#c9a227";
  var fond = ["#241a10","#1a1420","#101a1c","#20141a"][rng.rint(0, 3)];
  var tilt = rng.rint(-3, 3);
  var cicatrice = rng.chance(0.22);
  var bouche = rng.rint(-2, 3);

  var s = "";
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="' + t + '" height="' + (t * 1.2) + '">';
  s += '<rect width="200" height="240" fill="' + fond + '"/>';
  s += '<circle cx="100" cy="96" r="86" fill="none" stroke="' + cadre + '" stroke-width="2.5" opacity="0.85"/>';
  for (var i = 0; i < 12; i++) {
    var a1 = (i * 30 - 15) * Math.PI / 180;
    s += '<path d="M100,96 L' + (100 + 86 * Math.cos(a1)).toFixed(1) + ',' + (96 + 86 * Math.sin(a1)).toFixed(1) + '" stroke="' + cadre + '" stroke-width="1" opacity="0.12"/>';
  }
  // épaules et vêtement
  var large = sil === "massif" ? 62 : sil === "trapu" ? 56 : sil === "petit" ? 40 : 50;
  s += '<path d="M' + (100 - large) + ',240 Q' + (100 - large) + ',196 ' + (cx - rxTete + 6) + ',178 L' + (cx + rxTete - 6) + ',178 Q' + (100 + large) + ',196 ' + (100 + large) + ',240 Z" fill="' + vetement + '"/>';
  s += '<path d="M' + (cx - 14) + ',186 L' + cx + ',206 L' + (cx + 14) + ',186 Q' + (cx + 18) + ',196 ' + (cx + 14) + ',204 Q' + cx + ',214 ' + (cx - 14) + ',204 Q' + (cx - 18) + ',196 ' + (cx - 14) + ',186 Z" fill="' + peau + '"/>';
  s += '<path d="M' + (cx - 15) + ',188 L' + cx + ',208 L' + (cx + 15) + ',188" fill="none" stroke="#00000033" stroke-width="2"/>';
  // cou
  s += '<rect x="' + (cx - 9) + '" y="150" width="18" height="34" rx="6" fill="' + peau + '"/>';
  // oreilles
  function oreille(x) {
    if (p.oreilles === "pointues") return '<path d="M' + x + ',' + (cy - 2) + ' L' + (x + (x < cx ? -14 : 14)) + ',' + (cy - 16) + ' L' + x + ',' + (cy + 6) + ' Z" fill="' + peau + '"/>';
    if (p.oreilles === "larges") return '<ellipse cx="' + x + '" cy="' + cy + '" rx="9" ry="13" fill="' + peau + '"/>';
    return '<ellipse cx="' + x + '" cy="' + cy + '" rx="5" ry="9" fill="' + peau + '"/>';
  }
  s += oreille(cx - rxTete + 2) + oreille(cx + rxTete - 2);
  // tête
  s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rxTete + '" ry="' + ryTete + '" fill="' + peau + '"/>';
  if (p.ecailles) s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rxTete + '" ry="' + ryTete + '" fill="none" stroke="#00000022" stroke-width="2" stroke-dasharray="3,5"/>';
  if (p.museau) s += '<ellipse cx="' + cx + '" cy="' + (cy + 16) + '" rx="16" ry="11" fill="' + peau + '" stroke="#00000022" stroke-width="1.5"/>';
  // cheveux
  var hy = cy - ryTete + 4;
  if (styleCheveux === "chignon") {
    s += '<path d="M' + (cx - rxTete) + ',' + (cy - 6) + ' Q' + (cx - rxTete + 2) + ',' + hy + ' ' + (cx - 10) + ',' + (hy - 4) + ' Q' + cx + ',' + (hy - 14) + ' ' + (cx + 10) + ',' + (hy - 4) + ' Q' + (cx + rxTete - 2) + ',' + hy + ' ' + (cx + rxTete) + ',' + (cy - 6) + ' Q' + cx + ',' + (cy - 20) + ' ' + (cx - rxTete) + ',' + (cy - 6) + ' Z" fill="' + cheveux + '"/>';
    s += '<circle cx="' + (cx + rxTete - 4) + '" cy="' + (cy - 14) + '" r="9" fill="' + cheveux + '"/>';
  } else if (styleCheveux === "dégarni") {
    s += '<path d="M' + (cx - rxTete + 4) + ',' + (hy + 8) + ' Q' + cx + ',' + (hy + 2) + ' ' + (cx + rxTete - 4) + ',' + (hy + 8) + ' Q' + cx + ',' + (hy + 5) + ' ' + (cx - rxTete + 4) + ',' + (hy + 8) + ' Z" fill="' + cheveux + '" opacity="0.7"/>';
  } else if (styleCheveux === "sauvage") {
    s += '<path d="M' + (cx - rxTete) + ',' + cy + ' Q' + (cx - rxTete - 2) + ',' + (hy - 8) + ' ' + (cx - 8) + ',' + (hy - 10) + ' L' + cx + ',' + (hy - 2) + ' L' + (cx + 8) + ',' + (hy - 10) + ' Q' + (cx + rxTete + 2) + ',' + (hy - 8) + ' ' + (cx + rxTete) + ',' + cy + ' Q' + cx + ',' + (hy - 4) + ' ' + (cx - rxTete) + ',' + cy + ' Z" fill="' + cheveux + '"/>';
    s += '<path d="M' + (cx - 20) + ',' + (hy - 4) + ' l-8,-14 l10,8 Z M' + (cx + 20) + ',' + (hy - 4) + ' l8,-14 l-10,8 Z" fill="' + cheveux + '"/>';
  } else {
    var mch = styleCheveux === "mèche" ? -3 : 0;
    s += '<path d="M' + (cx - rxTete) + ',' + (cy - 2) + ' Q' + (cx - rxTete + 1) + ',' + (hy - 6) + ' ' + (cx - 12 + mch * 3) + ',' + (hy - 8) + ' Q' + cx + ',' + (hy - 16) + ' ' + (cx + 12) + ',' + (hy - 8) + ' Q' + (cx + rxTete - 1) + ',' + (hy - 6) + ' ' + (cx + rxTete) + ',' + (cy - 2) + ' Q' + cx + ',' + (cy - 18) + ' ' + (cx - rxTete) + ',' + (cy - 2) + ' Z" fill="' + cheveux + '"/>';
    if (styleCheveux === "mèche") s += '<path d="M' + (cx - 14) + ',' + (hy - 6) + ' Q' + (cx + 4) + ',' + (hy - 2) + ' ' + (cx + 18) + ',' + (hy + 6) + '" stroke="' + cheveux + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
  }
  if (p.cornes) {
    s += '<path d="M' + (cx - 16) + ',' + (hy + 2) + ' q-6,-14 2,-20 q2,10 6,16 Z" fill="#d8cfae"/>';
    s += '<path d="M' + (cx + 16) + ',' + (hy + 2) + ' q6,-14 -2,-20 q-2,10 -6,16 Z" fill="#d8cfae"/>';
  }
  // sourcils, yeux, nez, bouche
  var ey = cy - 4;
  s += '<path d="M' + (cx - 22) + ',' + (ey - 8 + tilt) + ' q9,-4 17,-1" stroke="#1a120a" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  s += '<path d="M' + (cx + 5) + ',' + (ey - 9 - tilt) + ' q9,-3 17,1" stroke="#1a120a" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  s += '<ellipse cx="' + (cx - 13) + '" cy="' + ey + '" rx="6.5" ry="4" fill="#e8e2d4"/>';
  s += '<ellipse cx="' + (cx + 13) + '" cy="' + ey + '" rx="6.5" ry="4" fill="#e8e2d4"/>';
  s += '<circle cx="' + (cx - 13) + '" cy="' + ey + '" r="2.3" fill="' + yeux + '"/>';
  s += '<circle cx="' + (cx + 13) + '" cy="' + ey + '" r="2.3" fill="' + yeux + '"/>';
  s += '<path d="M' + cx + ',' + (ey + 4) + ' q5,9 -2,12" stroke="#00000044" stroke-width="2" fill="none" stroke-linecap="round"/>';
  s += '<path d="M' + (cx - 12) + ',' + (cy + 22 + bouche) + ' q12,' + (bouche >= 0 ? 5 : -3) + ' 24,0" stroke="#6a3a34" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  if (p.defenses) {
    s += '<path d="M' + (cx - 10) + ',' + (cy + 20) + ' l-3,7 l5,-3 Z" fill="#e8e2d0"/>';
    s += '<path d="M' + (cx + 10) + ',' + (cy + 20) + ' l3,7 l-5,-3 Z" fill="#e8e2d0"/>';
  }
  if (barbe === "pleine") {
    s += '<path d="M' + (cx - rxTete + 3) + ',' + (cy + 2) + ' Q' + (cx - rxTete + 4) + ',' + (cy + ryTete + 16) + ' ' + cx + ',' + (cy + ryTete + 18) + ' Q' + (cx + rxTete - 4) + ',' + (cy + ryTete + 16) + ' ' + (cx + rxTete - 3) + ',' + (cy + 2) + ' Q' + cx + ',' + (cy + 26) + ' ' + (cx - rxTete + 3) + ',' + (cy + 2) + ' Z" fill="' + cheveux + '"/>';
    s += '<path d="M' + (cx - 12) + ',' + (cy + 21) + ' q12,4 24,0" stroke="none" fill="none"/>';
  } else if (barbe === "rase") {
    s += '<path d="M' + (cx - 16) + ',' + (cy + 18) + ' q16,10 32,0 q-16,4 -32,0 Z" fill="' + cheveux + '" opacity="0.35"/>';
  }
  if (cicatrice) s += '<path d="M' + (cx + 20) + ',' + (cy - 14) + ' l-7,18" stroke="#8a5a4a" stroke-width="1.8" stroke-linecap="round"/>';
  // ornement de stature
  if (orn === "couronne") {
    s += '<path d="M' + (cx - 20) + ',' + (hy - 2) + ' L' + (cx - 20) + ',' + (hy - 12) + ' L' + (cx - 10) + ',' + (hy - 5) + ' L' + cx + ',' + (hy - 15) + ' L' + (cx + 10) + ',' + (hy - 5) + ' L' + (cx + 20) + ',' + (hy - 12) + ' L' + (cx + 20) + ',' + (hy - 2) + ' Z" fill="#e8c96a" stroke="#8a6d1f"/>';
  } else if (orn === "diadème") {
    s += '<path d="M' + (cx - 18) + ',' + (hy - 3) + ' Q' + cx + ',' + (hy - 9) + ' ' + (cx + 18) + ',' + (hy - 3) + '" stroke="#e8c96a" stroke-width="3" fill="none"/>';
    s += '<circle cx="' + cx + '" cy="' + (hy - 6) + '" r="2.5" fill="#e8c96a"/>';
  } else if (orn === "fermail") {
    s += '<circle cx="' + cx + '" cy="' + (hy - 5) + '" r="3" fill="#a8b0b8" stroke="#5c5c66"/>';
  } else if (orn === "chainette") {
    s += '<path d="M' + (cx - 14) + ',' + (hy - 3) + ' Q' + cx + ',' + (hy - 7) + ' ' + (cx + 14) + ',' + (hy - 3) + '" stroke="#b08a4a" stroke-width="1.6" fill="none" stroke-dasharray="2,2"/>';
  } else {
    s += '<circle cx="' + cx + '" cy="' + (hy - 4) + '" r="2.2" fill="#b08a4a"/>';
  }
  s += '</svg>';
  return s;
}

/* ============================================================
   10. L'ÉTAT DE LA PARTIE — stockage local et JSON
   ============================================================ */
var CLE = "genLeadersE8::partie";
var etat = { meta: { version: 1 }, seqP: 1, seqL: 1, puissances: [], leaders: [] };
function charger() {
  try {
    var brut = localStorage.getItem(CLE);
    if (brut) { var e = JSON.parse(brut); if (e && e.leaders) etat = e; }
  } catch (e) { /* première visite */ }
}
function sauver() { try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { alert("Stockage local saturé — exportez la partie."); } }
function exporter() {
  var blob = new Blob([JSON.stringify(etat, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "partie-leaders-e8.json";
  a.click();
}
function importer(input) {
  var f = input.files[0]; if (!f) return;
  var fr = new FileReader();
  fr.onload = function () {
    try {
      var e = JSON.parse(fr.result);
      if (!e || !e.leaders) { alert("Fichier invalide."); return; }
      etat = e; sauver(); rendToutes();
      alert("Partie importée : " + etat.leaders.length + " personnages, " + etat.puissances.length + " puissances.");
    } catch (err) { alert("Lecture impossible."); }
  };
  fr.readAsText(f);
}
function puissant(id) {
  for (var i = 0; i < etat.puissances.length; i++) if (etat.puissances[i].id === id) return etat.puissances[i];
  return null;
}
function pionId(stature) {
  var p = STATURES[stature].pion;
  var n = etat.seqL; etat.seqL++;
  return p + ("000" + n).slice(-3);
}

/* ============================================================
   11. L'ATELIER — le brouillon en cours
   ============================================================ */
var br = null;
function nouveauBrouillon(stature) {
  br = {
    seed: graine(), portraitSeed: graine(),
    stature: stature || "L",
    race: null, raceAuto: true,
    align: null, alignAuto: true,
    professions: [], profAuto: true,
    caracs: null, maxCaracs: [], nom: "", titre: "", bio: "",
    portraitMode: "svg", iaData: null,
    puissance: "", attributs: { POP: 1, BR: 0, VM: 5, PFD: 0, tresor: 10, etatMajor: null }
  };
  tirer(true, true);
}
function tirer(tout, premier) {
  var rng = R(br.seed);
  // race
  if (br.raceAuto || tout) {
    var cult = null;
    if (br.puissance) { var p = puissant(br.puissance); if (p && p.cultures && p.cultures.length) cult = p.cultures; }
    var pool = cult && cult.length ? cult : NOMS_RACES;
    var races = pool.filter(function (r) { return RACES[r]; });
    br.race = races[rng.rint(0, races.length - 1)];
  }
  // alignement
  if (br.alignAuto || tout) {
    var fixe = ALIGN_RACE[br.race];
    br.align = fixe && !rng.chance(0.2) ? fixe : rng.pick(ALIGNEMENTS);
  }
  // professions
  var st = STATURES[br.stature];
  if (br.profAuto || tout) {
    br.professions = [];
    var n = st.nprof;
    var premierNom = null;
    if (st.artisan === "only") {
      premierNom = rng.pick(ARTISANS_EQ);
    } else if (st.artisan) {
      premierNom = rng.chance(0.7) ? rng.pick(ARTISANS_EQ) : rng.pick(NOMS_PROFS);
    } else {
      premierNom = rng.pick(NOMS_PROFS);
    }
    var deja = {};
    var pool2 = st.artisan === "only" ? ARTISANS_EQ : (st.artisan ? NOMS_PROFS : NOMS_PROFS);
    br.professions.push({ nom: premierNom, niveau: rng.rint(st.niveaux[0][0], st.niveaux[0][1]) });
    deja[premierNom] = 1;
    var poolRestant = pool2.filter(function (x) { return !deja[x]; });
    for (var i = 1; i < n; i++) {
      if (st.artisan && i === 1 && st.artisan !== "only") {
        // garantir un artisan si le premier ne l'était pas
        if (ARTISANS_EQ.indexOf(premierNom) < 0) {
          var a = rng.pick(ARTISANS_EQ.filter(function (x) { return !deja[x]; }));
          br.professions.push({ nom: a, niveau: rng.rint(st.niveaux[1][0], st.niveaux[1][1]) });
          deja[a] = 1; continue;
        }
      }
      var choix = poolRestant[rng.rint(0, poolRestant.length - 1)];
      br.professions.push({ nom: choix, niveau: rng.rint(st.niveaux[i][0], st.niveaux[i][1]) });
      deja[choix] = 1;
      poolRestant = poolRestant.filter(function (x) { return !deja[x]; });
    }
    br.maxCaracs = br.professions.length ? defautMax(br) : [];
  }
  // caractéristiques
  if (br.caracs === null || tout) br.caracs = distribuerAuto(br, br.seed ^ 0x9E3779B);
  // identité
  if (!br.nom || tout) br.nom = genNom(R(br.seed ^ 0x51), br.race);
  if (!br.titre || tout) br.titre = genTitre(R(br.seed ^ 0x77), br.stature, br.professions[0] ? br.professions[0].nom : "", br.nom);
  if (!br.bio || tout) br.bio = genBio(R(br.seed ^ 0x1234), br);
  if (tout) br.portraitSeed = graine();
  if (!premier) rendAtelier();
}
function relancer(champ) {
  if (champ === "race") { br.race = null; tirer(false, false); }
  if (champ === "profs") { br.profAuto = true; br.professions = []; tirer(false, false); }
  if (champ === "caracs") { br.caracs = distribuerAuto(br, graine() ^ 0x9E3779B); rendAtelier(); }
  if (champ === "nom") { br.nom = genNom(R(graine()), br.race); rendAtelier(); }
  if (champ === "titre") { br.titre = genTitre(R(graine()), br.stature, br.professions[0] ? br.professions[0].nom : "", br.nom); rendAtelier(); }
  if (champ === "bio") { br.bio = genBio(R(graine()), br); rendAtelier(); }
  if (champ === "portrait") { br.portraitSeed = graine(); rendAtelier(); }
  if (champ === "graine") { br.seed = graine(); tirer(true, false); }
}
function majBrouillon(champ, val) {
  if (champ === "stature") { br.stature = val; br.professions = []; br.caracs = null; br.maxCaracs = []; tirer(false, false); }
  if (champ === "race") { br.race = val; br.raceAuto = false; rendAtelier(); }
  if (champ === "align") { br.align = val; br.alignAuto = false; rendAtelier(); }
  if (champ === "puissance") { br.puissance = val; rendAtelier(); }
  if (champ === "prof") {
    var i = val[0];
    if (!val[1]) { br.professions.splice(i, 1); }
    else { if (br.professions[i]) br.professions[i].nom = val[1]; else br.professions.push({ nom: val[1], niveau: 5 }); }
    br.profAuto = false; br.maxCaracs = br.professions.length ? defautMax(br) : []; rendAtelier();
  }
  if (champ === "niveau") { br.professions[val[0]].niveau = Math.max(1, Math.min(40, parseInt(val[1]) || 1)); }
  if (champ === "carac") { br.caracs[val[0]] = Math.max(8, Math.min(STATURES[br.stature].achatMax || 18, parseInt(val[1]) || 8)); majEqAchat(); }
  if (champ === "max") {
    var stx = STATURES[br.stature];
    if (val[1]) {
      if (br.maxCaracs.indexOf(val[0]) < 0) {
        if (br.maxCaracs.length >= stx.nmax) { alert(stx.nom + " : " + stx.nmax + " caractéristique(s) au maximum (sentence du 8 novembre) — décochez d'abord."); rendAtelier(); return; }
        br.maxCaracs.push(val[0]);
      }
    } else { br.maxCaracs = br.maxCaracs.filter(function (x) { return x !== val[0]; }); }
    rendAtelier();
  }
  if (champ === "nom") br.nom = val;
  if (champ === "titre") br.titre = val;
  if (champ === "bio") br.bio = val;
  if (champ.indexOf("attr:") === 0) { br.attributs[champ.slice(5)] = val === "" ? "" : (parseFloat(val) || 0); }
}
function majEqAchat() {
  var st = STATURES[br.stature];
  var el = document.getElementById("eqAchat");
  if (el) el.innerHTML = "Équivalence : <b>" + coutAchatTotal(br.caracs, st.achatMax || 18) + "</b> points d'achat — budget de la stature : " + st.budget +
    (coutAchatTotal(br.caracs) > st.budget ? ' <span class="alerte">(dépassement assumé par le MdM)</span>' : "");
}

/* ============================================================
   12. RENDU — vues
   ============================================================ */
function vue(v) {
  ["atelier", "registre", "puissances", "fiche"].forEach(function (x) {
    document.getElementById("v-" + x).classList.toggle("actif", x === v);
    document.getElementById("t-" + x).classList.toggle("actif", x === v);
  });
  if (v === "atelier") rendAtelier();
  if (v === "registre") rendRegistre();
  if (v === "puissances") rendPuissances();
  if (v === "fiche") rendFiche();
}
function rendToutes() { vue("registre"); }

function optionsRaces(sel) {
  var o = '<option value="">— aléatoire —</option>';
  NOMS_RACES.forEach(function (r) { o += '<option value="' + r + '"' + (sel === r ? " selected" : "") + ">" + r + (RACES[r].ind ? " (indicatif MM/É8)" : "") + "</option>"; });
  return o;
}
function optionsProfs(sel) {
  var o = '<option value="">— vide —</option>';
  NOMS_PROFS.forEach(function (p) { o += '<option value="' + p + '"' + (sel === p ? " selected" : "") + ">" + p + " (" + PROFS[p].s + ", " + FAM_LABEL[PROFS[p].fam] + ")</option>"; });
  return o;
}
function selectStature() {
  var o = "";
  Object.keys(STATURES).forEach(function (k) {
    var s = STATURES[k];
    o += '<div class="filtre' + (br.stature === k ? " actif" : "") + '" onclick="majBrouillon(\'stature\',\'' + k + '\')">' + s.nom + " — " + s.nprof + " prof., " + s.budget + " pts</div>";
  });
  return o;
}
function rendAtelier() {
  if (!br) nouveauBrouillon();
  var st = STATURES[br.stature];
  var race = RACES[br.race];
  var el = document.getElementById("v-atelier");
  var fiche = computeFiche(br);
  var profsHtml = "";
  for (var i = 0; i < st.nprof; i++) {
    var p = br.professions[i];
    profsHtml += '<div class="rangée" style="margin-bottom:6px">' +
      '<div style="flex:2.2"><select onchange="majBrouillon(\'prof\',[' + i + ',this.value])">' + optionsProfs(p ? p.nom : "") + "</select></div>" +
      '<div style="flex:0 0 92px"><input type="number" value="' + (p ? p.niveau : "") + '" min="1" max="40" placeholder="niveau" onchange="majBrouillon(\'niveau\',[' + i + ',this.value])"></div>' +
      "</div>";
  }
  var caracsHtml = "";
  CARACS.forEach(function (c) {
    var brut = br.caracs[c];
    var fin = Math.max(3, brut + race.aj[CARACS.indexOf(c)]);
    caracsHtml += '<tr><td>' + c + '</td><td class="num"><input type="number" style="width:64px" min="8" max="' + (st.achatMax || 18) + '" value="' + brut + '" onchange="majBrouillon(\'carac\',[\'' + c + '\',this.value])"></td>' +
      '<td class="num">' + (race.aj[CARACS.indexOf(c)] >= 0 ? "+" : "") + race.aj[CARACS.indexOf(c)] + '</td><td class="num"><b>' + fin + '</b></td><td class="num">' + (fiche.mods[c] >= 0 ? "+" : "") + fiche.mods[c] + '</td><td class="num"><input type="checkbox"' + (br.maxCaracs.indexOf(c) >= 0 ? " checked" : "") + ' title="Forcer le maximum à la répartition (18, hors modificateurs raciaux)" onchange="majBrouillon(\'max\',[\'' + c + '\',this.checked])"></td></tr>';
  });
  var portraitHtml = br.portraitMode === "ia" && br.iaData
    ? '<img src="' + br.iaData + '" width="200" alt="portrait">'
    : portraitSVG(br, 200);

  el.innerHTML =
    '<div class="grille2">' +
    "<div>" +
      '<div class="bloc"><h3>1. La stature</h3><div class="filtres">' + selectStature() + "</div>" +
        '<p class="mini">' + st.nom + " — " + st.nprof + " profession(s)" + (st.artisan ? (st.artisan === "only" ? ", artisan obligatoire" : ", dont un artisan ou équivalent") : "") + " ; budget d'achat : " + st.budget + " points (sentence du 8 novembre) ; maximum(s) par coche : " + st.nmax + " (sentence) ; état-major : " + st.etat + " ; pion " + st.pion + ".</p></div>" +
      '<div class="bloc"><h3>2. La puissance <button class="btn sec" onclick="relancer(\'graine\')">NOUVELLE GRAINE</button></h3>' +
        '<label>Puissance d\'attribution (optionnel)</label><select onchange="majBrouillon(\'puissance\',this.value)"><option value="">— sans puissance —</option>' +
        etat.puissances.map(function (p) { return '<option value="' + p.id + '"' + (br.puissance === p.id ? " selected" : "") + ">" + p.nom + "</option>"; }).join("") + "</select>" +
        '<label>Race <button class="btn sec" style="padding:2px 7px" onclick="relancer(\'race\')">relancer</button></label><select onchange="majBrouillon(\'race\',this.value)">' + optionsRaces(br.raceAuto ? "" : br.race) + "</select>" +
        '<p class="mini">Cat. ' + race.cat + " · NH natif " + race.nh + " · TC " + race.tc + " · PST " + race.pst + " · PMV " + race.pmv + (race.ind ? ' · <span class="etat cal">ajustements INDICATIFS (relevé MM à faire)</span>' : "") + (race.versat ? ' · <span class="etat ok">VERSATILITÉ ' + race.versat + "</span>" : "") + "</p>" +
        '<label>Alignement</label><select onchange="majBrouillon(\'align\',this.value)">' + (br.alignAuto ? '<option value="" selected>— aléatoire —</option>' : "") + ALIGNEMENTS.map(function (a) { return '<option value="' + a + '"' + (br.align === a ? " selected" : "") + ">" + a + "</option>"; }).join("") + "</select></div>" +
      '<div class="bloc"><h3>3. Les professions <button class="btn sec" onclick="relancer(\'profs\')">tirer</button></h3>' + profsHtml + "</div>" +
      '<div class="bloc"><h3>4. Les caractéristiques <button class="btn sec" onclick="relancer(\'caracs\')">répartir (auto)</button></h3>' +
        "<table><tr><th>Car.</th><th class=\"num\">Achat</th><th class=\"num\">Racial</th><th class=\"num\">Final</th><th class=\"num\">Mod.</th><th class=\"num\">Max</th></tr>" + caracsHtml + "</table>" +
        '<div class="ligne-eq" id="eqAchat">Équivalence : <b>' + coutAchatTotal(br.caracs, st.achatMax || 18) + "</b> points d'achat — budget de la stature : " + st.budget + "</div>" +
        '<p class="note">Méthode 3.5 : achat de points, les ajustements raciaux s\'appliquent après l\'achat (sentence). La coche « Max » force la caractéristique au maximum à la répartition automatique — trois coches pour un leader d\'élite, deux pour un leader, une pour les autres statures (sentence du 8 novembre) ; par défaut, les plus pertinentes des professions retenues sont cochées. Le restant du budget se répartit pondéré par les paires dirigeantes des métiers choisis et leurs niveaux. ÉCHELLE ÉLITE (sentence du 8 novembre) : le Leader Élite achète au-delà de 18 — jusqu\'à 24 à +4 points par cran (19 : 20, 20 : 24, 21 : 28, 22 : 32, 23 : 36, 24 : 40 — barème en proposition), les autres statures demeurent plafonnées à 18 ; la répartition automatique s\'arrête à 18, l\'extension Élite relève du choix manuel dans le budget.</p></div>' +
      '<div class="bloc"><h3>5. L\'identité</h3>' +
        '<label>Nom <button class="btn sec" style="padding:2px 7px" onclick="relancer(\'nom\')">relancer</button></label><input value="' + br.nom.replace(/"/g, "&quot;") + '" oninput="majBrouillon(\'nom\',this.value)">' +
        '<label>Titre <button class="btn sec" style="padding:2px 7px" onclick="relancer(\'titre\')">relancer</button></label><input value="' + br.titre.replace(/"/g, "&quot;") + '" oninput="majBrouillon(\'titre\',this.value)">' +
        '<label>Biographie <button class="btn sec" style="padding:2px 7px" onclick="relancer(\'bio\')">gabarit</button></label><textarea rows="4" oninput="majBrouillon(\'bio\',this.value)">' + br.bio.replace(/</g, "&lt;") + "</textarea></div>" +
      '<div class="bloc"><h3>6. Le portrait <button class="btn sec" onclick="relancer(\'portrait\')">régénérer</button></h3>' +
        '<div class="rangée"><label class="btn sec" style="margin:0;cursor:pointer;flex:0 0 auto">IMPORTER UNE IMAGE IA<input type="file" accept="image/*" style="display:none" onchange="importerIA(this)"></label>' +
        (br.portraitMode === "ia" ? '<button class="btn sec" onclick="br.portraitMode=\'svg\';rendAtelier()">revenir au SVG</button>' : "") + "</div>" +
        '<p class="note">Portrait SVG procédural par défaut (déterministe par graine, sensible à la race, à la famille de métier et à la stature) ; un portrait généré par IA peut être importé à la place.</p></div>' +
    "</div>" +
    "<div>" +
      '<div class="bloc"><h3>Prévisualisation</h3>' +
        '<div class="portrait-cadre">' + portraitHtml +
          '<div style="flex:1;min-width:220px"><div style="font-size:21px;color:var(--or2)">' + br.nom.replace(/</g, "&lt;") + "</div>" +
          '<div class="mini" style="font-size:13px">' + br.titre.replace(/</g, "&lt;") + "</div>" +
          '<p style="margin-top:8px;font-size:13px">' + br.race + " · " + br.align + " · " + st.nom + "<br>Pion " + st.pion + " · état-major " + st.etat + "</p></div></div></div>" +
      '<div class="bloc"><h3>Les habiletés et leurs BE</h3>' + tableHabiletes(fiche) + "</div>" +
      '<div class="bloc"><h3>Commandement et ressources</h3>' + jaugesFiche(fiche, br) + "</div>" +
      '<button class="btn grand" onclick="creer()">CRÉER LE PERSONNAGE ET L\'OUVRIR</button>' +
    "</div></div>";
}

function tableHabiletes(fiche) {
  var s = "<table><tr><th>Hab.</th><th class='num'>Val.</th><th class='num'>BE</th><th>Source</th><th>Note</th></tr>";
  fiche.habs.forEach(function (h) {
    var notes = [];
    if (h.interdit && h.val === null) { notes.push('<span class="etat ecl">INTERDIT sans formation</span>'); }
    if (h.versat) notes.push('<span class="etat ok">versatilité ' + h.versat + "</span>");
    if (h.canal === 0 && h.natBase > 0 && !h.interdit) notes.push("base native " + h.natBase);
    if (h.plat) notes.push('<span class="etat cal">+' + h.plat + " plat</span>");
    h.terr.forEach(function (t) { notes.push("+" + t.b + " en " + t.t); });
    if (h.noteAdm) notes.push(h.noteAdm);
    if (h.prop && h.canal > 0) notes.push('<span class="etat chant">paire en proposition</span>');
    s += "<tr><td>" + h.sig + " <span class='mini'>" + h.nom + "</span></td><td class='num'>" + (h.val === null ? "—" : h.val) + "</td><td class='num'><b>" + (h.be === null ? "—" : h.be) + "</b></td><td class='mini'>" + (h.src || "—") + "</td><td class='mini'>" + notes.join(" · ") + "</td></tr>";
  });
  return s + "</table>";
}
function jaugesFiche(fiche, rec) {
  return '<div class="jauges">' +
    '<div class="jauge"><div class="lab">PA</div><div class="val">' + fiche.pa + '</div><div class="lab sousval">max NH ÷ 10</div></div>' +
    '<div class="jauge"><div class="lab">PMV</div><div class="val">30</div><div class="lab sousval">leader</div></div>' +
    '<div class="jauge"><div class="lab">LDS</div><div class="val">' + fiche.lds + '</div><div class="lab sousval">par Cbt ' + fiche.cbtVal + "</div></div>" +
    '<div class="jauge"><div class="lab">BCM (T/A/M)</div><div class="val">' + (fiche.bcm[0] >= 0 ? "+" : "") + fiche.bcm[0] + " / " + (fiche.bcm[1] >= 0 ? "+" : "") + fiche.bcm[1] + " / " + (fiche.bcm[2] >= 0 ? "+" : "") + fiche.bcm[2] + "</div></div>" +
    '<div class="jauge"><div class="lab">État-major</div><div class="val">' + (rec.attributs.etatMajor === null ? STATURES[rec.stature].etatDef : rec.attributs.etatMajor) + "</div><div class='lab sousval'>" + STATURES[rec.stature].etat + "</div></div>" +
    "</div>" +
    '<p class="mini">POP ' + rec.attributs.POP + " · BR " + rec.attributs.BR + " · VM " + rec.attributs.VM + " · PFD " + rec.attributs.PFD + " · trésor " + rec.attributs.tresor + " — attributs É7 à peupler au chantier leaders.</p>";
}
function importerIA(input) {
  var f = input.files[0]; if (!f) return;
  var img = new Image();
  var fr = new FileReader();
  fr.onload = function () {
    img.onload = function () {
      var cv = document.createElement("canvas");
      var ratio = Math.min(200 / img.width, 240 / img.height);
      cv.width = Math.round(img.width * ratio); cv.height = Math.round(img.height * ratio);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      br.iaData = cv.toDataURL("image/jpeg", 0.82);
      br.portraitMode = "ia";
      rendAtelier();
    };
    img.src = fr.result;
  };
  fr.readAsDataURL(f);
}
function creer() {
  var rec = JSON.parse(JSON.stringify({
    seed: br.seed, portraitSeed: br.portraitSeed, stature: br.stature,
    race: br.race, align: br.align, professions: br.professions, caracs: br.caracs, maxCaracs: br.maxCaracs,
    nom: br.nom, titre: br.titre, bio: br.bio, portraitMode: br.portraitMode, iaData: br.iaData,
    puissance: br.puissance, attributs: br.attributs, notes: ""
  }));
  rec.id = "P" + etat.seqL;
  rec.pion = pionId(rec.stature);
  rec.attributs.etatMajor = rec.attributs.etatMajor === null ? STATURES[rec.stature].etatDef : rec.attributs.etatMajor;
  etat.leaders.push(rec);
  sauver();
  ficheCourante = rec.id;
  nouveauBrouillon(br.stature);
  vue("fiche");
}

/* ============================================================
   13. LE REGISTRE
   ============================================================ */
var filtrePuissance = "", filtreStature = "";
function rendRegistre() {
  var el = document.getElementById("v-registre");
  var liste = etat.leaders.filter(function (l) {
    return (!filtrePuissance || l.puissance === filtrePuissance) && (!filtreStature || l.stature === filtreStature);
  });
  var fP = '<div class="filtre' + (filtrePuissance === "" ? " actif" : "") + '" onclick="filtrePuissance=\'\';rendRegistre()">Toutes puissances</div>';
  etat.puissances.forEach(function (p) {
    fP += '<div class="filtre' + (filtrePuissance === p.id ? " actif" : "") + '" onclick="filtrePuissance=\'' + p.id + '\';rendRegistre()"><span class="pastille" style="background:' + p.couleur + '"></span>' + p.nom + "</div>";
  });
  var fS = '<div class="filtre' + (filtreStature === "" ? " actif" : "") + '" onclick="filtreStature=\'\';rendRegistre()">Toutes statures</div>';
  Object.keys(STATURES).forEach(function (k) {
    fS += '<div class="filtre' + (filtreStature === k ? " actif" : "") + '" onclick="filtreStature=\'' + k + '\';rendRegistre()">' + STATURES[k].nom + "</div>";
  });
  var cartes = liste.map(function (l) {
    var p = l.puissance ? puissant(l.puissance) : null;
    var profs = l.professions.map(function (pr) { return PROFS[pr.nom].s + " " + pr.niveau; }).join(" · ");
    return '<div class="carte" onclick="ficheCourante=\'' + l.id + '\';vue(\'fiche\')" style="border-left-color:' + (p ? p.couleur : "#4a3b28") + '">' +
      '<div class="cn">' + l.nom.replace(/</g, "&lt;") + '</div><div class="cs">' + l.titre.replace(/</g, "&lt;") + "<br>" +
      l.race + " · " + STATURES[l.stature].nom + " · pion " + l.pion + "<br>" + profs +
      (p ? '<br><span class="pastille" style="background:' + p.couleur + '"></span>' + p.nom : '<br><span class="mini">sans puissance</span>') + "</div></div>";
  }).join("");
  el.innerHTML = '<div class="bloc"><h3>Registre de la partie — ' + etat.leaders.length + " personnage(s)</h3>" +
    '<div class="filtres">' + fP + "</div>" + '<div class="filtres">' + fS + "</div>" +
    '<button class="btn" onclick="vue(\'atelier\')">CRÉER UN PERSONNAGE</button></div>' +
    (cartes ? '<div class="cartes">' + cartes + "</div>" : '<div class="bloc"><p class="note">Aucun personnage dans le registre. Passez par l\'atelier de création.</p></div>');
}

/* ============================================================
   14. LES PUISSANCES
   ============================================================ */
var editP = null;
function rendPuissances() {
  var el = document.getElementById("v-puissances");
  var lignes = etat.puissances.map(function (p) {
    var nb = etat.leaders.filter(function (l) { return l.puissance === p.id; }).length;
    return '<div class="bloc"><h3><span><span class="pastille" style="background:' + p.couleur + '"></span>' + p.nom + " — " + nb + " personnage(s)</span>" +
      '<span><button class="btn sec" onclick="editP=' + p.id + ';rendPuissances()">modifier</button> ' +
      '<button class="btn danger" onclick="supprimerPuissance(' + p.id + ')">supprimer</button></span></h3>' +
      '<p class="mini">Cultures : ' + (p.cultures && p.cultures.length ? p.cultures.join(", ") : "toutes (par défaut)") + "</p></div>";
  }).join("");
  var form = editP !== null ? (function () {
    var p = puissant(editP);
    return '<div class="bloc"><h3>Modifier la puissance</h3>' +
      '<label>Nom</label><input id="pNom" value="' + p.nom.replace(/"/g, "&quot;") + '">' +
      '<label>Couleur</label><input id="pCouleur" value="' + p.couleur + '">' +
      '<label>Cultures (races dominantes, séparées par des virgules)</label><input id="pCult" value="' + (p.cultures || []).join(", ") + '">' +
      '<div class="rangée" style="margin-top:10px"><button class="btn" onclick="validerPuissance()">ENREGISTRER</button><button class="btn sec" onclick="editP=null;rendPuissances()">annuler</button></div></div>';
  })() :
    '<div class="bloc"><h3>Nouvelle puissance</h3>' +
      '<label>Nom</label><input id="pNom" placeholder="Royaume de Vhalorn">' +
      '<label>Couleur (code hexadécimal)</label><input id="pCouleur" value="#c9a227">' +
      '<label>Cultures (races dominantes, séparées par des virgules — vide : toutes)</label><input id="pCult" placeholder="Humain, Nain, Hobbit">' +
      '<div class="rangée" style="margin-top:10px"><button class="btn" onclick="validerPuissance()">AJOUTER</button></div></div>';
  el.innerHTML = "<div>" + lignes + form + "</div>";
}
function validerPuissance() {
  var nom = document.getElementById("pNom").value.trim();
  var coul = document.getElementById("pCouleur").value.trim() || "#c9a227";
  var cult = document.getElementById("pCult").value.split(",").map(function (s) { return s.trim(); }).filter(function (s) { return s; });
  if (!nom) { alert("La puissance requiert un nom."); return; }
  if (editP !== null) {
    var p = puissant(editP);
    p.nom = nom; p.couleur = coul; p.cultures = cult;
    editP = null;
  } else {
    etat.seqP++;
    etat.puissances.push({ id: etat.seqP, nom: nom, couleur: coul, cultures: cult });
  }
  sauver(); rendPuissances();
}
function supprimerPuissance(id) {
  if (!confirm("Supprimer cette puissance ? Les personnages demeurent, sans attribution.")) return;
  etat.puissances = etat.puissances.filter(function (p) { return p.id !== id; });
  etat.leaders.forEach(function (l) { if (l.puissance === id) l.puissance = ""; });
  sauver(); rendPuissances();
}

/* ============================================================
   15. LA FICHE — lecture et édition
   ============================================================ */
var ficheCourante = null;
function majFiche(champ, val) {
  var l = etat.leaders.filter(function (x) { return x.id === ficheCourante; })[0];
  if (!l) return;
  if (champ === "nom") l.nom = val;
  if (champ === "titre") l.titre = val;
  if (champ === "bio") l.bio = val;
  if (champ === "notes") l.notes = val;
  if (champ === "puissance") l.puissance = val;
  if (champ === "align") l.align = val;
  if (champ === "niveau") l.professions[val[0]].niveau = Math.max(1, Math.min(40, parseInt(val[1]) || 1));
  if (champ === "prof") { if (!val[1]) l.professions.splice(val[0], 1); else if (l.professions[val[0]]) l.professions[val[0]].nom = val[1]; }
  if (champ === "ajouterProf") {
    if (l.professions.length >= 3) { alert("Trois professions maximum (sentence)."); return; }
    l.professions.push({ nom: val, niveau: 5 });
  }
  if (champ === "carac") l.caracs[val[0]] = Math.max(8, Math.min(STATURES[l.stature].achatMax || 18, parseInt(val[1]) || 8));
  if (champ === "portraitSeed") l.portraitSeed = graine();
  if (champ === "etatMajor") l.attributs.etatMajor = parseInt(val) || 0;
  if (champ.indexOf("attr:") === 0) l.attributs[champ.slice(5)] = parseFloat(val) || 0;
  if (champ === "iaData") { l.iaData = val; l.portraitMode = "ia"; }
  if (champ === "modeSvg") l.portraitMode = "svg";
  sauver();
  rendFiche();
}
function importerIAFiche(input) {
  var f = input.files[0]; if (!f) return;
  var img = new Image();
  var fr = new FileReader();
  fr.onload = function () {
    img.onload = function () {
      var cv = document.createElement("canvas");
      var ratio = Math.min(200 / img.width, 240 / img.height);
      cv.width = Math.round(img.width * ratio); cv.height = Math.round(img.height * ratio);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      majFiche("iaData", cv.toDataURL("image/jpeg", 0.82));
    };
    img.src = fr.result;
  };
  fr.readAsDataURL(f);
}
function rendFiche() {
  var el = document.getElementById("v-fiche");
  var l = etat.leaders.filter(function (x) { return x.id === ficheCourante; })[0];
  if (!l) { el.innerHTML = '<div class="bloc"><p class="note">Aucune fiche ouverte — choisissez un personnage au registre, ou créez-en un à l\'atelier.</p></div>'; return; }
  var fiche = computeFiche(l);
  var race = RACES[l.race];
  var st = STATURES[l.stature];
  var p = l.puissance ? puissant(l.puissance) : null;
  var portraitHtml = l.portraitMode === "ia" && l.iaData
    ? '<img src="' + l.iaData + '" width="200" alt="portrait">'
    : portraitSVG(l, 200);
  var profsHtml = l.professions.map(function (pr, i) {
    return '<div class="rangée" style="margin-bottom:6px"><div style="flex:2.2"><select onchange="majFiche(\'prof\',[' + i + ',this.value])">' + optionsProfs(pr.nom) + "</select></div>" +
      '<div style="flex:0 0 92px"><input type="number" min="1" max="40" value="' + pr.niveau + '" onchange="majFiche(\'niveau\',[' + i + ',this.value])"></div>' +
      '<div style="flex:0 0 auto"><button class="btn danger" onclick="majFiche(\'prof\',[' + i + ",\"]) style=\"padding:5px 8px\">retirer</button></div></div>";
  }).join("");
  var caracsHtml = "";
  CARACS.forEach(function (c) {
    var fin = Math.max(3, l.caracs[c] + race.aj[CARACS.indexOf(c)]);
    caracsHtml += "<tr><td>" + c + '</td><td class="num"><input type="number" style="width:64px" min="8" max="' + (STATURES[l.stature].achatMax || 18) + '" value="' + l.caracs[c] + '" onchange="majFiche(\'carac\',[\'' + c + '\',this.value])"></td>' +
      '<td class="num">' + (race.aj[CARACS.indexOf(c)] >= 0 ? "+" : "") + race.aj[CARACS.indexOf(c)] + '</td><td class="num"><b>' + fin + '</b></td><td class="num">' + (fiche.mods[c] >= 0 ? "+" : "") + fiche.mods[c] + "</td></tr>";
  });
  el.innerHTML =
    '<div class="grille2"><div>' +
      '<div class="bloc"><h3>Identité</h3>' +
        '<label>Nom</label><input value="' + l.nom.replace(/"/g, "&quot;") + '" oninput="majFiche(\'nom\',this.value)">' +
        '<label>Titre</label><input value="' + l.titre.replace(/"/g, "&quot;") + '" oninput="majFiche(\'titre\',this.value)">' +
        '<label>Biographie</label><textarea rows="5" oninput="majFiche(\'bio\',this.value)">' + l.bio.replace(/</g, "&lt;") + "</textarea>" +
        '<label>Puissance</label><select onchange="majFiche(\'puissance\',this.value)"><option value="">— sans puissance —</option>' +
          etat.puissances.map(function (pp) { return '<option value="' + pp.id + '"' + (l.puissance === pp.id ? " selected" : "") + ">" + pp.nom + "</option>"; }).join("") + "</select>" +
        '<label>Alignement</label><select onchange="majFiche(\'align\',this.value)">' + ALIGNEMENTS.map(function (a) { return '<option value="' + a + '"' + (l.align === a ? " selected" : "") + ">" + a + "</option>"; }).join("") + "</select>" +
        '<label>Notes du MdM</label><textarea rows="3" oninput="majFiche(\'notes\',this.value)">' + (l.notes || "").replace(/</g, "&lt;") + "</textarea></div>" +
      '<div class="bloc"><h3>Professions <button class="btn sec" onclick="majFiche(\'ajouterProf\',\'' + (NOMS_PROFS[0]) + '\')">ajouter</button></h3>' + profsHtml +
        '<p class="mini">Trois professions maximum (sentence). L\'ajout se règle ensuite dans la liste.</p></div>' +
      '<div class="bloc"><h3>Caractéristiques</h3><table><tr><th>Car.</th><th class="num">Achat</th><th class="num">Racial</th><th class="num">Final</th><th class="num">Mod.</th></tr>' + caracsHtml + "</table>" +
        '<div class="ligne-eq">Équivalence : <b>' + coutAchatTotal(l.caracs) + "</b> points d'achat — budget d'origine : " + st.budget + " (" + st.nom + ")</div></div>" +
      '<div class="bloc"><h3>Portrait <button class="btn sec" onclick="majFiche(\'portraitSeed\',0)">régénérer</button> <label class="btn sec" style="margin:0;cursor:pointer">IMPORTER UNE IMAGE IA<input type="file" accept="image/*" style="display:none" onchange="importerIAFiche(this)"></label>' +
        (l.portraitMode === "ia" ? '<button class="btn sec" onclick="majFiche(\'modeSvg\',0)">revenir au SVG</button>' : "") + "</h3>" +
        '<div class="portrait-cadre">' + portraitHtml + "</div></div>" +
      '<div class="bloc"><h3>Suppression</h3><button class="btn danger" onclick="supprimerLeader()">SUPPRIMER CE PERSONNAGE</button></div>' +
    "</div><div>" +
      '<div class="bloc"><div class="identite"><div class="medaillon">' + (l.portraitMode === "ia" && l.iaData ? '<img src="' + l.iaData + '">' : portraitSVG(l, 76)) + "</div><div>" +
        '<div style="font-size:23px;color:var(--or2)">' + l.nom.replace(/</g, "&lt;") + "</div>" +
        '<div class="mini" style="font-size:13px">' + l.titre.replace(/</g, "&lt;") + "</div>" +
        '<p style="margin-top:6px;font-size:13px">' + l.race + " · " + l.align + " · " + st.nom + ' · <span class="k">pion ' + l.pion + '</span><br>État-major : <input type="number" style="width:52px;display:inline-block;padding:2px 4px" value="' + l.attributs.etatMajor + '" onchange="majFiche(\'etatMajor\',this.value)"> créatures (' + st.etat + ")</p>" +
        (p ? '<p class="mini" style="font-size:12px"><span class="pastille" style="background:' + p.couleur + '"></span>' + p.nom + "</p>" : "") + "</div></div>" +
        '<div class="background-zone" style="font-size:12.5px">' + l.bio.replace(/</g, "&lt;") + "</div></div>" +
      '<div class="bloc"><h3>Commandement et ressources</h3>' + jaugesFiche(fiche, l) +
        '<div class="rangée" style="margin-top:8px">' +
          ["POP","BR","VM","PFD","tresor"].map(function (a) { return '<div><label>' + a + '</label><input type="number" step="0.5" value="' + l.attributs[a] + '" onchange="majFiche(\'attr:' + a + '\',this.value)"></div>'; }).join("") +
        "</div></div>" +
      '<div class="bloc"><h3>Les habiletés et leurs BE</h3>' + tableHabiletes(fiche) + "</div>" +
      '<div class="bloc"><h3>Aptitudes raciales</h3>' + aptitudesRace(l) + "</div>" +
    "</div></div>";
}
function aptitudesRace(l) {
  var race = RACES[l.race];
  var lignes = [];
  if (race.versat) lignes.push("<b>Versatilité</b> : plancher de " + race.versat + " sur toute habileté, y compris professionnelle — la valeur la plus haute garde la main.");
  Object.keys(race.maj).forEach(function (sig) { lignes.push("<b>Base majorée</b> : " + sig + " native " + (HABS[sig].base + race.maj[sig]) + " (base " + HABS[sig].base + " + " + race.maj[sig] + ")."); });
  Object.keys(race.plat).forEach(function (sig) { lignes.push("<b>Bonus plat</b> : +" + race.plat[sig] + " au BE de " + sig + "."); });
  race.terr.forEach(function (t) { lignes.push("<b>Terrain</b> : +" + t.b + " en " + t.t + " (" + t.hab.join(", ") + ")."); });
  if (!lignes.length) lignes.push("Aucune aptitude d'habileté — les constantes natives et le terrain paient.");
  return '<ul style="margin-left:18px;font-size:13px;line-height:1.7">' + lignes.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
}
function supprimerLeader() {
  var l = etat.leaders.filter(function (x) { return x.id === ficheCourante; })[0];
  if (!l) return;
  if (!confirm("Supprimer " + l.nom + " ?")) return;
  etat.leaders = etat.leaders.filter(function (x) { return x.id !== ficheCourante; });
  sauver(); vue("registre");
}

/* ============================================================
   16. DÉMARRAGE
   ============================================================ */
charger();
nouveauBrouillon("L");
vue("atelier");
</script>
</body>
</html>
