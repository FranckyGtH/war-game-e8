---
name: "maquette-fiche-leader-e8"
title: "Maquette de la fiche de leader — Édition 8"
type: "text/html"
---

<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fiche de Leader — Édition 8</title>
<style>
  :root {
    --fond: #14100c; --panneau: #1e1812; --panneau2: #262019; --bord: #4a3b28;
    --or: #c9a227; --or2: #e8c96a; --texte: #e8dfc8; --sous: #a89a7d;
    --ok: #7da35a; --cal: #d9a441; --ecl: #c96a5a; --chant: #7a9ec2;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, 'Times New Roman', serif; background: var(--fond); color: var(--texte); padding: 18px; }
  h1, h2, h3 { font-variant: small-caps; letter-spacing: .04em; color: var(--or2); }
  header { border-bottom: 2px solid var(--or); padding-bottom: 14px; margin-bottom: 14px; display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; }
  .identite h1 { font-size: 26px; }
  .identite .titre { color: var(--sous); font-style: italic; margin-top: 2px; }
  .badges { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .badge { font-size: 11px; font-family: Verdana, sans-serif; padding: 3px 9px; border: 1px solid var(--bord); border-radius: 10px; color: var(--sous); }
  .badge.or { border-color: var(--or); color: var(--or2); }
  .tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .tab { font-family: Verdana, sans-serif; font-size: 12px; padding: 7px 13px; background: var(--panneau); border: 1px solid var(--bord); color: var(--sous); cursor: pointer; border-radius: 4px 4px 0 0; }
  .tab:hover { color: var(--or2); }
  .tab.actif { background: var(--panneau2); color: var(--or2); border-bottom-color: var(--panneau2); }
  .panneau { display: none; background: var(--panneau); border: 1px solid var(--bord); padding: 18px; border-radius: 0 6px 6px 6px; }
  .panneau.actif { display: block; }
  .grille2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
  .bloc { background: var(--panneau2); border: 1px solid var(--bord); border-radius: 6px; padding: 14px; margin-bottom: 14px; }
  .bloc h3 { font-size: 15px; margin-bottom: 10px; border-bottom: 1px solid var(--bord); padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 5px 8px; border-bottom: 1px solid #33291d; }
  th { font-family: Verdana, sans-serif; font-size: 10.5px; text-transform: uppercase; letter-spacing: .05em; color: var(--sous); }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  .barre { height: 8px; background: #33291d; border-radius: 4px; overflow: hidden; margin-top: 3px; }
  .barre > div { height: 100%; background: linear-gradient(90deg, #8a6d1f, var(--or2)); }
  .jauges { display: flex; gap: 18px; flex-wrap: wrap; }
  .jauge { min-width: 130px; }
  .jauge .lab { font-family: Verdana, sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .05em; color: var(--sous); }
  .jauge .val { font-size: 20px; color: var(--or2); font-variant-numeric: tabular-nums; }
  .jauge .sousval { font-size: 11px; color: var(--sous); }
  .note { font-size: 12px; color: var(--sous); font-style: italic; margin-top: 8px; }
  .etat { font-family: Verdana, sans-serif; font-size: 10px; padding: 2px 7px; border-radius: 9px; white-space: nowrap; }
  .etat.ok { background: #26331e; color: var(--ok); }
  .etat.cal { background: #33280f; color: var(--cal); }
  .etat.ecl { background: #331d17; color: var(--ecl); }
  .etat.chant { background: #1c2631; color: var(--chant); }
  .cle { font-family: Verdana, sans-serif; font-size: 11px; color: var(--sous); }
  .k { color: var(--or2); font-weight: bold; }
  .legende { display: flex; gap: 14px; flex-wrap: wrap; margin: 10px 0; font-family: Verdana, sans-serif; font-size: 11px; color: var(--sous); }
  body.audit .cal { outline: 2px solid var(--cal); outline-offset: 2px; border-radius: 4px; }
  body.audit .ecl { outline: 2px solid var(--ecl); outline-offset: 2px; border-radius: 4px; }
  body.audit .chant { outline: 2px solid var(--chant); outline-offset: 2px; border-radius: 4px; }
  .btn-audit { font-family: Verdana, sans-serif; font-size: 11px; padding: 6px 12px; background: var(--panneau); color: var(--cal); border: 1px solid var(--cal); border-radius: 4px; cursor: pointer; }
  .btn-audit.actif { background: var(--cal); color: #14100c; }
  .prof { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
  .prof .nom { font-size: 17px; color: var(--or2); }
  .prof .niv { font-size: 24px; font-weight: bold; color: var(--texte); font-variant-numeric: tabular-nums; }
  .bandes { display: flex; gap: 3px; margin-top: 6px; }
  .bande { flex: 1; text-align: center; font-family: Verdana, sans-serif; font-size: 10px; padding: 3px 0; background: #2b2318; color: var(--sous); border-radius: 3px; }
  .bande.presente { background: var(--or); color: #14100c; font-weight: bold; }
  .filtres { display: flex; gap: 6px; margin: 10px 0; flex-wrap: wrap; }
  .filtre { font-family: Verdana, sans-serif; font-size: 11px; padding: 4px 10px; border: 1px solid var(--bord); border-radius: 12px; color: var(--sous); cursor: pointer; }
  .filtre.actif { border-color: var(--or); color: var(--or2); }
  .mini { font-size: 11px; color: var(--sous); }
  @media (max-width: 720px) { .jauges { flex-direction: column; } }
</style>
</head>
<body>

<header>
  <div class="identite">
    <h1>Kaelen Morvran</h1>
    <div class="titre">Duc-Général de Vhalorn — exemple rempli de bout en bout (échantillon de validation)</div>
  </div>
  <div class="badges" style="margin-left:auto">
    <span class="badge or">Humain</span>
    <span class="badge">Moralité : Loyal Mal</span>
    <span class="badge">Statut : Général (Pop initiale +2)</span>
    <span class="badge">Bande F des deux métiers</span>
    <button class="btn-audit" id="btnAudit" onclick="toggleAudit()">MODE AUDIT</button>
  </div>
</header>

<div class="tabs">
  <div class="tab actif" data-p="identite">Identité et caractéristiques</div>
  <div class="tab" data-p="professions">Professions et habiletés</div>
  <div class="tab" data-p="commandement">Commandement</div>
  <div class="tab" data-p="sante">Santé et besoins</div>
  <div class="tab" data-p="magie">Magie</div>
  <div class="tab" data-p="equipement">Équipement</div>
  <div class="tab" data-p="epreuve">Épreuve (jet D20)</div>
  <div class="tab" data-p="audit">Audit de complétude</div>
</div>

<!-- ============ IDENTITE ============ -->
<section class="panneau actif" id="p-identite">
  <div class="grille2">
    <div class="bloc">
      <h3>État civil</h3>
      <table>
        <tr><td>Nom et titre</td><td>Kaelen Morvran, Duc-Général de Vhalorn</td></tr>
        <tr><td>Race et culture</td><td>Humain, vhalornais</td></tr>
        <tr><td>Alignement / moralité</td><td>Loyal Mal</td></tr>
        <tr><td>Sexe, âge, taille, poids</td><td>M ; 47 ans ; 1,91 m ; 92 kg — informatif (déjà pris en compte par PP et TC)</td></tr>
        <tr><td class="cal">Popularité (Pop)</td><td>4 — Général (+2), deux campagnes gagnées (+2) ; +½ par niveau en Politique (Plt 0)</td></tr>
        <tr class="ecl"><td>Valeur morale (VM)</td><td>8 — perte de moral de la puissance en cas de mort ou capture ; l'ordre de grandeur n'est pas table au corpus</td></tr>
        <tr class="cal"><td>Points de faveur divine (PFD)</td><td>0 — pas d'investissement religieux ; règle d'accès du non-prêtre à préciser</td></tr>
        <tr><td>Trésor personnel</td><td>74 S sur lui (plafond 100 S sans pénaliser le déplacement)</td></tr>
        <tr class="chant"><td>Pion leader</td><td>Oui — fiche séparée à prévoir (escorte, PF, moitié des PMB)</td></tr>
        <tr><td>État-major</td><td>15 personnes (fourchette native 10 à 20) — escorte et assiste</td></tr>
      </table>
    </div>
    <div class="bloc">
      <h3>Caractéristiques naturelles (fiche individuelle)</h3>
      <p class="mini">Conversion D20 : modificateur = (valeur − 10) ÷ 2. Les caractéristiques mentales nourrissent habiletés, commandement et magie ; jamais les PF de lot.</p>
      <table id="tCarac"></table>
      <p class="note">PP (puissance physique comparée à la taille) et TC (racine cubique de la masse) sont des données d'espèce : 1 et environ 0,57 pour un humain de 92 kg.</p>
    </div>
  </div>
</section>

<!-- ============ PROFESSIONS ============ -->
<section class="panneau" id="p-professions">
  <div class="grille2">
    <div class="bloc">
      <h3>Les professions et leurs niveaux</h3>
      <p class="mini">Le niveau est enregistré séparément pour chaque profession ; les ressources ne se prennent qu'une fois ; l'habileté prend le meilleur calcul parmi les professions exercées (proposition à valider).</p>
      <div id="tProfs"></div>
      <p class="mini" style="margin-top:10px">Bandes É8 (mapping adopté) : A 1-2, B 3-7, C 8-11, D 12-15, E 16-19, F 20 et au-delà.</p>
    </div>
    <div class="bloc">
      <h3>Les habiletés (liste É7 conservée + six nouvelles)</h3>
      <p class="mini">Échelle non militaire : −6 (aucune compétence) à 40 (maître de renommée mondiale) ; l'habileté est le pourcentage du niveau dans la profession, arrondi au supérieur.</p>
      <div class="filtres">
        <div class="filtre actif" onclick="filtreHab('tous', this)">Toutes</div>
        <div class="filtre" onclick="filtreHab('exercees', this)">Exercées</div>
        <div class="filtre" onclick="filtreHab('militaires', this)">Militaires</div>
      </div>
      <table id="tHab"></table>
      <p class="note">Lien 3.5 proposé : conv. = (niveau − 20) ÷ 2, arrondi vers le bas ; BE = conv. + mod. de la caractéristique dirigeante (colonne Car. dir.). Le niveau paie, la caractéristique bonifie. L'échelle militaire garde [(niveau + 10) × 2] en conversion de référence.</p>
    </div>
  </div>
</section>

<!-- ============ COMMANDEMENT ============ -->
<section class="panneau" id="p-commandement">
  <div class="grille2">
    <div class="bloc">
      <h3>Le châssis à deux étages (sentences du 30 octobre)</h3>
      <table>
        <tr><td><span class="k">Étage des engagements</span></td><td>Le BCM du milieu s'ajoute au jet de chaque lot dirigé — un engagement, un milieu, un leader.</td></tr>
        <tr><td><span class="k">Étage du verdict</span></td><td>Le BC du général en chef (plein s'il charge, moitié en arrière) et le BR pèsent sur le moral agrégé ; cumul dégressif à division continue (demi, quart, huitième...).</td></tr>
        <tr><td><span class="k">Position et rang</span></td><td>Orthogonaux : la position module le BC individuel, le rang module le cumul.</td></tr>
      </table>
      <h3 style="margin-top:14px">Bonus de commandement militaire (BCM)</h3>
      <table>
        <tr><th>Milieu</th><th class="num">Bonus</th><th>Origine</th></tr>
        <tr><td>CMT — terrestre (spécialité)</td><td class="num">+5</td><td>Cbt 28, bande 27-30 ; domaines déduits à −3 et −6</td></tr>
        <tr><td>CMA — aérien</td><td class="num">+2</td><td>dérivé (−3)</td></tr>
        <tr><td>CMM — maritime</td><td class="num">−1</td><td>dérivé (−6)</td></tr>
      </table>
      <p class="note">Ajustements d'histoire par le MdM : transferts 1 pour 1 en terrestre ou aérien, 1 pour 2 en maritime.</p>
    </div>
    <div>
      <div class="bloc">
        <h3>Les autres leviers du leader</h3>
        <table>
          <tr><td>BC — charisme (motivation)</td><td class="num">+3</td><td>au verdict ; plein s'il charge, moitié en arrière</td></tr>
          <tr><td>BR — réputation (transcendance)</td><td class="num">+2</td><td>au verdict ; anonymat possible par renonciation</td></tr>
          <tr class="cal"><td>LDS — leadership</td><td class="num">—</td><td>apanage des leaders secrets ; champ à prévoir pour un double profil guilde</td></tr>
          <tr><td>CDS — déplacement en stack</td><td class="num">15 unités</td><td>5 + BCM(5) + BR(2) + BC(3)</td></tr>
          <tr><td>CDD — déplacement à distance</td><td class="num">4 unités à 5 hex</td><td>BR(2) + ½ BCM(2,5) ; portée = BCM</td></tr>
          <tr><td>Évaluation des forces</td><td class="num">diff. −28</td><td>jet ouvert [−Cbt] ; marge d'erreur 100 % − 5 % par marge</td></tr>
          <tr><td>Ordre des unités</td><td>oui</td><td>un leader présent et commandant peut changer l'ordre par défaut</td></tr>
        </table>
      </div>
      <div class="bloc">
        <h3>Le risque du commandant</h3>
        <table>
          <tr class="chant"><td>Jet de survie (assaut)</td><td>proposition v2 déposée — marge de son engagement, marge du verdict pour le général ; sentence attendue</td></tr>
          <tr class="chant"><td>Protection magique personnelle</td><td>remplacement de la clause RAM/TAM morte — à arbitrer au banc d'essai</td></tr>
          <tr><td>Évasion (4 PA)</td><td>perte de la VM en moral avant l'assaut ; double VM en cours ; tentative ratée : il ne conserve que le BR</td></tr>
          <tr><td>Charge à la tête des troupes</td><td>BC plein au verdict ; ne pas charger : survie facilitée de 10</td></tr>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- ============ SANTE ============ -->
<section class="panneau" id="p-sante">
  <div class="grille2">
    <div class="bloc">
      <h3>Santé</h3>
      <div class="jauges">
        <div class="jauge"><div class="lab">Niveau d'énergie (NE)</div><div class="val cal">96</div><div class="sousval">formule leader à calibrer</div></div>
        <div class="jauge"><div class="lab">PV actuels</div><div class="val">96 / 96</div><div class="sousval">indemne</div></div>
        <div class="jauge"><div class="lab">Blessures</div><div class="val">0</div><div class="sousval">aucune</div></div>
        <div class="jauge"><div class="lab">Régime CCSN</div><div class="val">1</div><div class="sousval">omnivore</div></div>
      </div>
      <table style="margin-top:12px">
        <tr><td>Blessé au combat</td><td>état repris par le jet de survie (blessé : survie −3)</td></tr>
        <tr><td>Résurrection</td><td>le tour de la mort : coût ÷2 ; au-delà : jet ouvert [15 + 2n − NE] contre la perte d'1 NE</td></tr>
        <tr class="chant"><td>Cycle du Destin</td><td>maladies, séquelles et guérison longue — chantier à ouvrir (le Chirurgien en est le porteur)</td></tr>
      </table>
    </div>
    <div class="bloc">
      <h3>Besoins de nourriture</h3>
      <table>
        <tr><th>Poste</th><th class="num">Besoins / jour</th><th>Statut</th></tr>
        <tr><td>Kaelen (CCSN 1, omnivore)</td><td class="num">1 ration</td><td><span class="etat ok">CONSERVÉ</span></td></tr>
        <tr class="cal"><td>État-major (15 personnes)</td><td class="num">15 rations</td><td><span class="etat cal">INTERPRÉTATION</span></td></tr>
        <tr class="chant"><td>Escorte du pion leader</td><td class="num">—</td><td><span class="etat chant">À DÉFINIR</span></td></tr>
        <tr><td>En campagne avec un stack</td><td class="num">au prorata du stack</td><td><span class="etat ok">NATIF</span></td></tr>
      </table>
      <p class="note">Le CCSN (0, 1 ou 2) est une donnée d'unité ; la lecture individuelle du leader et de son état-major n'est pas table au corpus : l'interprétation « une ration par tête » est proposée pour l'audit. Le sort Nourriture (1 PST nourri par PMR) couvre les pénuries ; en réflecte de survie, double coût.</p>
    </div>
  </div>
  <div class="bloc">
    <h3>Moral (l'échelle du leader)</h3>
    <p class="mini">Le moral de campagne (PM) appartient à la puissance, pas au leader ; la fiche en montre les points de contact.</p>
    <div class="jauges">
      <div class="jauge"><div class="lab">Pop (réaction des foules)</div><div class="val">4</div><div class="barre"><div style="width:16%"></div></div></div>
      <div class="jauge"><div class="lab">VM (le coût de sa mort)</div><div class="val ecl">8</div><div class="barre"><div style="width:32%"></div></div></div>
      <div class="jauge"><div class="lab">Peur qu'il inspire (Itd)</div><div class="val">17</div><div class="barre"><div style="width:42%"></div></div></div>
    </div>
    <p class="note">Dissolution : le leader principal répond des jets [−Pop] et [−Moral + Pop], modifiés par ses BCM, BR et BC pour une puissance barbare ou de guilde.</p>
  </div>
</section>

<!-- ============ MAGIE ============ -->
<section class="panneau" id="p-magie">
  <div class="grille2">
    <div class="bloc">
      <h3>Le lanceur</h3>
      <table>
        <tr><td>Royaumes maîtrisés</td><td>Théurgie et Essence (nécromant)</td></tr>
        <tr><td>PMB du leader</td><td class="num">25</td><td>formule n(n+1) ÷ 20, n = 22</td></tr>
        <tr><td>Avec le pion leader</td><td class="num">50</td><td>le leader fournit la moitié, le pion l'autre moitié</td></tr>
        <tr><td>Activités magiques (AM)</td><td class="num">3 / tour</td><td>avec le pion ; 2 sinon ; 1 PA achète 1 AM</td></tr>
        <tr class="cal"><td>Niveau de magie (NM)</td><td class="num">12</td><td>montée par les armes et armures magiques — borne de l'apport à calibrer</td></tr>
        <tr><td>Échange de PMB</td><td>receveur</td><td>théurgie et essence recevables ; les donneuses stackées avec lui</td></tr>
        <tr><td>Régénération</td><td>tour sur tour</td><td>PMB non utilisés perdus en fin de tour</td></tr>
      </table>
      <p class="note">Grande magie et magie rituelle : 43 sorts relevés — non affichés ici (relais chantier magie).</p>
    </div>
    <div class="bloc" style="min-width: 55%">
      <h3>Sorts accessibles (magie standard — 35 relevés)</h3>
      <p class="mini">Coût en PMB pour 1 PMR, classe Nc. Le palier NM filtre l'accès : Équipement magique (NM 14) lui échappe.</p>
      <div class="filtres">
        <div class="filtre actif" onclick="filtreSort('tous', this)">Tous</div>
        <div class="filtre" onclick="filtreSort('offensif', this)">Offensifs</div>
        <div class="filtre" onclick="filtreSort('défensif', this)">Défensifs</div>
        <div class="filtre" onclick="filtreSort('divination', this)">Divination</div>
      </div>
      <table id="tSorts"></table>
    </div>
  </div>
</section>

<!-- ============ EQUIPEMENT ============ -->
<section class="panneau" id="p-equipement">
  <div class="grille2">
    <div class="bloc">
      <h3>Armes — la percussion</h3>
      <p class="mini">L'arme agit sur la marge, jamais sur les jets ni les PF : marge nette = marge du duel + bonus de l'arme − absorption adverse.</p>
      <table>
        <tr><th>Arme</th><th>Catégorie</th><th class="num">Qualité</th><th class="num">Bonus de marge</th><th class="num">Enchantement</th></tr>
        <tr><td>Épée bâtarde « Givre »</td><td>Mêlée</td><td class="num">D</td><td class="num">+2</td><td class="num">+2 (total +4)</td></tr>
        <tr><td>Arc de guerre</td><td>Jet / missile</td><td class="num">C</td><td class="num">+2</td><td class="num">—</td></tr>
        <tr><td>Dagues (2)</td><td>Mêlée</td><td class="num">B</td><td class="num">+1</td><td class="num">—</td></tr>
        <tr><td>Naturelles</td><td>—</td><td colspan="3">humain : aucune (donnée d'espèce)</td></tr>
      </table>
      <p class="note">Empilement : naturelle + une arme portée + enchantement ; deux armes portées ne s'ajoutent pas. Pénétrante et Perforante demeurent des features déclarées.</p>
    </div>
    <div class="bloc">
      <h3>Armures — l'encaissement</h3>
      <p class="mini">L'armure réduit la marge de chaque attaque subie ; une marge réduite à zéro ne pénètre pas.</p>
      <table>
        <tr><th>Pièce</th><th>Type</th><th class="num">Qualité</th><th class="num">Absorption</th><th class="num">Magique</th></tr>
        <tr><td>Harnois de campagne</td><td>Lourde</td><td class="num">C</td><td class="num">5</td><td class="num">+1 (total 6)</td></tr>
        <tr><td>Naturelle</td><td>—</td><td colspan="3">humain : aucune (donnée d'espèce)</td></tr>
      </table>
      <table style="margin-top:10px">
        <tr class="cal"><td>Contreparties du harnois</td><td>mobilité, PMV, terrains difficiles, chaleur — valeurs à caler au chantier mouvement</td></tr>
        <tr><td>Entretien</td><td>la qualité évolue avec l'usure et les acquisitions (registre économique)</td></tr>
      </table>
    </div>
  </div>
  <div class="bloc">
    <h3>Panoplies et relier</h3>
    <p class="mini">Le personnage embarque : la panoplie du guerrier (Cbt), la panoplie du nécromancien (Bbl, onyx rituel), la garde d'apparat (Pop +1 en revue). Relier chaque panoplie à son habileté d'origine évite le double comptage — <span class="etat chant">CHANTIER</span> table unique des panoplies à ouvrir.</p>
  </div>
</section>

<!-- ============ EPREUVE ============ -->
<section class="panneau" id="p-epreuve">
  <div class="grille2">
    <div class="bloc">
      <h3>La chaîne de l'épreuve (lien D&D 3.5, proposition)</h3>
      <p class="mini">Le niveau paie, la caractéristique bonifie, la situation penche, le dé tranche.</p>
      <table>
        <tr><td><span class="k">1. La caractéristique</span></td><td>assise 3.5 : modificateur = (score − 10) ÷ 2, arrondi vers le bas</td></tr>
        <tr><td><span class="k">2. Le niveau</span></td><td>l'habileté = pourcentage du niveau dans la profession (matrice), meilleur calcul entre professions</td></tr>
        <tr><td><span class="k">3. La bonification</span></td><td>bonus d'épreuve BE = (niveau d'habileté − 20) ÷ 2 + mod. de la caractéristique dirigeante</td></tr>
        <tr><td><span class="k">4. La situation</span></td><td>avantage ou désavantage : deux dé, on garde le meilleur ou le pire (jamais cumulables, ils s'annulent)</td></tr>
        <tr><td><span class="k">5. Le verdict</span></td><td>réussite si d20 + BE ≥ 11 + difficulté ; marge = d20 + BE − 11 − difficulté</td></tr>
      </table>
      <p class="note">Le jet des actions individuelles (leaders, unités spéciales, actions hors combat de masse) est OUVERT : le 20 relance et cumule (le critique explose), le 1 enchaîne (le fumble cascade). La résolution de masse par lots demeure FERMÉE [11 + difficulté] — la marge y reste la seule monnaie de dégâts, les caractéristiques n'y entrent jamais.</p>
    </div>
    <div class="bloc">
      <h3>L'éventail des résultats (proposition)</h3>
      <table>
        <tr><th>Résultat</th><th>Déclencheur</th><th>Effet</th></tr>
        <tr><td><span class="etat ecl">FUMBLE</span></td><td>1 naturel : relance et soustrais, cascade tant que le 1 revient</td><td>marge très négative ; complication à l'arbitrage du MdM — arme lâchée, bruit, chute, exposition ; en embuscade : repérage automatique</td></tr>
        <tr><td><span class="etat cal">ÉCHEC GRAVE</span></td><td>marge ≤ −5</td><td>échec avec conséquence : en combat individuel, l'état passe à blessé ; contre-temps majeur pour l'action</td></tr>
        <tr><td>Échec</td><td>d20 + BE &lt; 11 + difficulté</td><td>rien ne se passe, ou presque — la marge négative module la contre-performance</td></tr>
        <tr><td>Réussite</td><td>d20 + BE ≥ 11 + difficulté</td><td>effet standard ; la marge positive module la portée</td></tr>
        <tr><td><span class="etat ok">FRANCHE</span></td><td>marge ≥ 5</td><td>réussite éclatante : information totale, chef-d'œuvre, avantage au jet lié de la suite</td></tr>
        <tr><td><span class="etat ok">CRITIQUE</span></td><td>20 naturel : relance et cumule, cascade tant que le 20 revient</td><td>la marge s'emballe ; en combat individuel : blessure maximale ; le MdM offre l'effet héroïque</td></tr>
      </table>
      <p class="note">Cas particuliers natifs conservés : capture sur jet de survie raté de moins de 5 ; « à moins d'un fumble, le jet est réussi » des embuscades faciles.</p>
    </div>
  </div>
  <div class="bloc">
    <h3>Simulateur d'épreuve (échantillon)</h3>
    <div class="filtres" id="sAction">
      <div class="filtre actif" data-be="7" onclick="choixAction(this)">Attaque à l'épée (Cbt 28 + F +3) — BE +7</div>
      <div class="filtre" data-be="0" onclick="choixAction(this)">Discours de guerre (Itd 17 + Cha +2) — BE +0</div>
      <div class="filtre" data-be="-2" onclick="choixAction(this)">Repérage en rase campagne (Dse 14 + D +1) — BE −2</div>
    </div>
    <div class="filtres">
      <div class="filtre actif" id="mNormal" onclick="choixMode('normal', this)">Normal</div>
      <div class="filtre" id="mAv" onclick="choixMode('avantage', this)">Avantage</div>
      <div class="filtre" id="mDes" onclick="choixMode('desavantage', this)">Désavantage</div>
      <label class="mini" style="margin-left:12px">Difficulté : <input type="number" id="sDiff" value="0" style="width:52px;background:#33291d;border:1px solid var(--bord);color:var(--texte);padding:3px 6px;border-radius:3px"> <span class="cle">(réussite à 11 + difficulté)</span></label>
    </div>
    <button class="btn-audit" style="color:var(--or2);border-color:var(--or)" onclick="lancer()">LANCER LE DÉ</button>
    <div id="sResultat" style="margin-top:12px"></div>
  </div>
</section>

<!-- ============ AUDIT ============ -->
<section class="panneau" id="p-audit">
  <div class="legende">
    <span><span class="etat ok">OK</span> donnée native ou sentencée</span>
    <span><span class="etat cal">CAL</span> à calibrer (ordre de grandeur, formule)</span>
    <span><span class="etat ecl">ÉLUCIDER</span> sens ou valeur à retrouver</span>
    <span><span class="etat chant">CHANTIER</span> renvoi à un chantier ouvert</span>
  </div>
  <table id="tAudit"></table>
  <p class="note">Le mode audit surligne dans les autres onglets les champs marqués CAL, ÉLUCIDER ou CHANTIER.</p>
</section>

<script>
// ---------- DONNEES ----------
const caracs = [
  ["Force", 17], ["Dextérité", 13], ["Constitution", 14],
  ["Intelligence", 16], ["Sagesse", 12], ["Charisme", 15],
];
const bandes = [["A","1-2"],["B","3-7"],["C","8-11"],["D","12-15"],["E","16-19"],["F","20+"]];
const profs = [
  { nom: "Guerrier", sig: "Gu", niv: 28, famille: "Non lanceur — canal physique", canal: "Cbt 100, Dse 50, Frg 75, Srv 75, Trc 50" },
  { nom: "Nécromant", sig: "Nc", niv: 22, famille: "Pur lanceur — théurgie et essence", canal: "Bbl 75, Dsv 75" },
];
const habiletes = [
  ["Combat", "Cbt", 28, "Guerrier 100 %", true],
  ["Forgeage", "Frg", 21, "Guerrier 75 %", true],
  ["Survie", "Srv", 21, "Guerrier 75 %", true],
  ["Discrétion extérieure", "Dse", 14, "Guerrier 50 %", true],
  ["Tracking", "Trc", 14, "Guerrier 50 %", true],
  ["Bibliothèque", "Bbl", 17, "Nécromant 75 %", true],
  ["Discrétion en ville", "Dsv", 17, "Nécromant 75 %", true],
  ["Intimidation", "Itd", 17, "création É8 — MdM (histoire)", true],
  ["Administration", "Adm", 0, "par défaut Plt ÷ 2", false],
  ["Politique", "Plt", 0, "—", false],
  ["Négoce", "Ngc", 0, "—", false],
  ["Séduction", "Sed", 0, "—", false],
  ["Vol", "Vol", 0, "—", false],
  ["Assassinat", "Ass", 0, "—", false],
  ["Espionnage", "Esp", 0, "—", false],
  ["Désinformation", "Dsf", 0, "—", false],
];
const sorts = [
  ["Aide aux opérations secrètes", 3, 30, "soutien"], ["Aide au combat", 5, 6, "soutien"],
  ["Aide au mouvement", 5, 1, "soutien"], ["Changement de plan", 12, 18, "déplacement"],
  ["Communion", 10, 2, "divination"], ["Conjuration de monstres", 7, 2, "offensif"],
  ["Contact", 7, 15, "soutien"], ["Création de structure", 9, 9, "défensif"],
  ["Déplacement sur l'eau", 7, 10, "déplacement"], ["Déplacement sous l'eau", 5, 15, "déplacement"],
  ["Déplacement terrestre", 7, 6, "déplacement"], ["Destruction", 3, 2, "offensif"],
  ["Destruction de structure", 9, 12, "offensif"], ["Détection de magie", 1, 6, "divination"],
  ["Diplomate magique", 10, 75, "défensif"], ["Dispel", 5, 10, "défensif"],
  ["Dissimulation", 5, 1, "défensif"], ["Divination hex", 10, 45, "divination"],
  ["Divination ville", 8, 30, "divination"], ["Équipement magique", 14, 15, "soutien"],
  ["Légendes", 12, 60, "divination"], ["Lévitation de vaisseaux", 11, 6, "déplacement"],
  ["Minage", 5, 6, "offensif"], ["Nécro dialogue", 7, 0.5, "divination"],
  ["Nourriture", 5, 2, "soutien"], ["Passage d'obstacle", 9, 75, "défensif"],
  ["Polymorphose", 7, 6, "soutien"], ["Protection vs divination", 3, 3, "défensif"],
  ["Protection de personnel", 3, 6, "défensif"], ["Protection de structure", 9, 6, "défensif"],
  ["Recherche", 9, 2, "divination"], ["Résurrection", 12, 80, "soutien"],
  ["Soins", 5, 20, "soutien"], ["Téléportation", 11, 24, "déplacement"], ["Vol", 7, 6, "déplacement"],
];
const audit = [
  ["Identité et statut", "Pop initiale (statut), trésor, état-major", "OK", "natives É7"],
  ["Caractéristiques", "F/D/C/I/S/Cha + conversion D20", "OK", "annexes de profils"],
  ["Professions, niveaux, bandes", "niveaux séparés, bandes A-F", "OK", "grille des métiers"],
  ["Habiletés", "matrice métier × habileté", "OK", "matrice V7 transcrite"],
  ["Cumul entre professions", "le meilleur calcul, jamais la somme", "CAL", "proposition à valider"],
  ["Conversion habileté vers bonus D20", "(niveau − 20) ÷ 2", "CAL", "proposition à valider"],
  ["Chaîne de l'épreuve (lien 3.5)", "BE = conv. + mod. caractéristique dirigeante ; avantage/désavantage ; éventail fumble-critique", "CAL", "sentences attendues"],
  ["NE et PV du leader", "formule de dérivation individuelle", "ÉLUCIDER", "annexes de profils, étage 1"],
  ["Nourriture du leader et de l'état-major", "CCSN 1 par tête : interprétation", "CAL", "à trancher"],
  ["VM (valeur morale)", "ordre de grandeur non table", "ÉLUCIDER", "à calibrer"],
  ["PFD du non-prêtre", "règle d'accès", "CAL", "à préciser"],
  ["LDS du leader militaire", "double profil guilde", "CAL", "chantier bas-fonds"],
  ["Pion leader", "fiche séparée (escorte, PF, PMB)", "CHANTIER", "à ouvrir"],
  ["Jet de survie du leader", "proposition v2 déposée", "CHANTIER", "sentence attendue"],
  ["Protection magique personnelle", "remplacement RAM/TAM", "CHANTIER", "banc d'essai"],
  ["BCM, BC, BR — application", "châssis à deux étages", "OK", "sentencé ce soir"],
  ["Échelle du cumul", "division continue", "OK", "sentencé ce soir"],
  ["Magie : PMB, AM, NM", "formules natives", "OK", "relevé des sorts"],
  ["Borne du NM par objets", "montée par équipement magique", "CAL", "chantier magie"],
  ["Sorts accessibles", "35 standard + 43 grande magie", "OK", "relevé complet"],
  ["Armes et armures", "marge et absorption", "OK", "chantier armures v0.6"],
  ["Contreparties armure lourde", "PMV, terrains, chaleur", "CAL", "chantier mouvement"],
  ["Panoplies", "relier panoplie et habileté", "CHANTIER", "table unique à ouvrir"],
  ["Cycle du Destin", "santé longue, séquelles", "CHANTIER", "à ouvrir (Chirurgien)"],
  ["PMV du leader", "30 PMV attendus", "CAL", "chantier mouvement"],
];

// ---------- RENDU ----------
const $ = (id) => document.getElementById(id);

$("tCarac").innerHTML = "<tr><th>Caractéristique</th><th class='num'>Valeur</th><th class='num'>Mod. D20</th></tr>" +
  caracs.map(c => "<tr><td>" + c[0] + "</td><td class='num'>" + c[1] + "</td><td class='num'>" + (((c[1]-10)/2) >= 0 ? "+" : "") + ((c[1]-10)/2) + "</td></tr>").join("");

$("tProfs").innerHTML = profs.map(p => {
  const present = b => {
    const n = p.niv;
    const inB = (b[1] === "20+") ? n >= 20 : (n >= +b[1].split("-")[0] && n <= +b[1].split("-")[1]);
    return "<div class='bande " + (inB ? "presente" : "") + "'>" + b[0] + "</div>";
  };
  return "<div style='margin-bottom:12px'><div class='prof'><span class='nom'>" + p.nom + " (" + p.sig + ")</span><span class='niv'>" + p.niv + "</span>" +
    "<span class='badge'>" + p.famille + "</span></div>" +
    "<div class='bandes'>" + bandes.map(present).join("") + "</div>" +
    "<div class='mini' style='margin-top:4px'>Lignes de matrice : " + p.canal + "</div></div>";
}).join("");

const modsCar = { "F": 3, "D": 1, "C": 2, "I": 3, "S": 1, "Cha": 2 }; // F17 D13 C14 I16 S12 Cha15
const dirige = { "Cbt": "F", "Frg": "I", "Srv": "S", "Dse": "D", "Trc": "S", "Bbl": "I", "Dsv": "D", "Itd": "Cha", "Adm": "I", "Plt": "Cha", "Ngc": "Cha", "Sed": "Cha", "Vol": "D", "Ass": "D", "Esp": "I", "Dsf": "Cha" };
const be = (niv, sig) => Math.floor((niv - 20) / 2) + modsCar[dirige[sig]];

function ligneHab(h) {
  const [nom, sig, niv, src, ex] = h;
  const conv = niv > 0 ? Math.floor((niv - 20) / 2) : null;
  const vBE = niv > 0 ? be(niv, sig) : null;
  return "<tr class='hab " + (ex ? "exercee" : "") + "'>" +
    "<td>" + nom + " <span class='cle'>(" + sig + ")</span></td><td class='num'>" + (niv > 0 ? niv : "—") + "</td>" +
    "<td class='num'>" + (niv > 0 ? ((conv >= 0 ? "+" + conv : conv)) : "—") + "</td>" +
    "<td class='num'>" + (niv > 0 ? dirige[sig] + " " + (modsCar[dirige[sig]] >= 0 ? "+" : "") + modsCar[dirige[sig]] : "—") + "</td>" +
    "<td class='num be" + (vBE !== null && vBE >= 0 ? "pos" : "neg") + "'>" + (vBE !== null ? (vBE >= 0 ? "+" + vBE : vBE) : "—") + "</td>" +
    "<td class='mini'>" + src + "</td></tr>";
}
const enteteHab = "<tr><th>Habileté</th><th class='num'>Niveau</th><th class='num'>Conv.</th><th class='num'>Car. dir.</th><th class='num'>BE</th><th>Source</th></tr>";
$("tHab").innerHTML = enteteHab + habiletes.map(ligneHab).join("") +
  [["Capacité militaire terrestre", "CMT", "+5", "échelle militaire −10 à +10"],
   ["Capacité militaire aérienne", "CMA", "+2", "dérivé de CMT (−3)"],
   ["Capacité militaire maritime", "CMM", "−1", "dérivé de CMT (−6)"],
   ["Leadership", "LDS", "—", "leaders secrets uniquement"]]
  .map(x => "<tr class='hab milit'><td>" + x[0] + " <span class='cle'>(" + x[1] + ")</span></td><td class='num'>" + x[2] + "</td><td class='num'>—</td><td class='num'>—</td><td class='num'>—</td><td class='mini'>" + x[3] + "</td></tr>").join("");

function filtreHab(mode, el) {
  document.querySelectorAll("#p-professions .filtre").forEach(f => f.classList.remove("actif"));
  el.classList.add("actif");
  document.querySelectorAll("#tHab tr.hab").forEach(tr => {
    const estMil = tr.classList.contains("milit");
    const estEx = tr.classList.contains("exercee");
    tr.style.display = (mode === "tous" || (mode === "exercees" && estEx) || (mode === "militaires" && estMil)) ? "" : "none";
  });
}

$("tSorts").innerHTML = "<tr><th>Sort</th><th class='num'>NM</th><th class='num'>PMB / PMR</th><th>Catégorie</th><th>Accès</th></tr>" +
  sorts.map(s => {
    const accessible = s[1] <= 12;
    return "<tr class='sort " + s[3] + "'>" +
      "<td>" + s[0] + "</td><td class='num'>" + s[1] + "</td><td class='num'>" + s[2] + "</td><td class='mini'>" + s[3] + "</td>" +
      "<td>" + (accessible ? "<span class='etat ok'>OK</span>" : "<span class='etat ecl'>NM 14</span>") + "</td></tr>";
  }).join("");
function filtreSort(mode, el) {
  document.querySelectorAll("#p-magie .filtre").forEach(f => f.classList.remove("actif"));
  el.classList.add("actif");
  document.querySelectorAll("#tSorts tr.sort").forEach(tr => {
    tr.style.display = (mode === "tous" || tr.classList.contains(mode)) ? "" : "none";
  });
}

$("tAudit").innerHTML = "<tr><th>Champ de la fiche</th><th>Contenu</th><th>Statut</th><th>Renvoi</th></tr>" +
  audit.map(a => {
    const cls = a[2] === "OK" ? "ok" : a[2] === "CAL" ? "cal" : a[2] === "ÉLUCIDER" ? "ecl" : "chant";
    return "<tr class='" + cls + "'><td>" + a[0] + "</td><td class='mini'>" + a[1] + "</td><td><span class='etat " + cls + "'>" + a[2] + "</span></td><td class='mini'>" + a[3] + "</td></tr>";
  }).join("");

// ---------- INTERACTIONS ----------
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("actif"));
  document.querySelectorAll(".panneau").forEach(x => x.classList.remove("actif"));
  t.classList.add("actif");
  $("p-" + t.dataset.p).classList.add("actif");
}));
function toggleAudit() {
  document.body.classList.toggle("audit");
  $("btnAudit").classList.toggle("actif");
}

// ---------- SIMULATEUR D'EPREUVE ----------
let sBE = 7, sMode = "normal";
function choixAction(el) {
  document.querySelectorAll("#sAction .filtre").forEach(f => f.classList.remove("actif"));
  el.classList.add("actif");
  sBE = +el.dataset.be;
  $("sResultat").innerHTML = "";
}
function choixMode(mode, el) {
  ["mNormal", "mAv", "mDes"].forEach(id => $(id).classList.remove("actif"));
  el.classList.add("actif");
  sMode = mode;
  $("sResultat").innerHTML = "";
}
const d20 = () => 1 + Math.floor(Math.random() * 20);
function lancer() {
  const diff = +($("sDiff").value || 0);
  let detail = "", de;
  if (sMode === "avantage") { const a = d20(), b = d20(); de = Math.max(a, b); detail = "2d20 (" + a + ", " + b + ") — on garde le meilleur : " + de; }
  else if (sMode === "desavantage") { const a = d20(), b = d20(); de = Math.min(a, b); detail = "2d20 (" + a + ", " + b + ") — on garde le pire : " + de; }
  else { de = d20(); detail = "1d20 : " + de; }
  let total = de, fumble = de === 1, critique = de === 20;
  if (critique) { let r = d20(); detail += " — 20 naturel : relance et cumule"; while (r === 20) { detail += " (encore 20 !)"; total += r; r = d20(); } total += r; detail += " (+" + r + ")"; }
  if (fumble) { let r = d20(); detail += " — 1 naturel : relance et soustrais"; while (r === 1) { detail += " (encore 1 ...)"; total -= r; r = d20(); } total -= r; detail += " (−" + r + ")"; }
  const score = total + sBE;
  const marge = score - 11 - diff;
  let verdict, cls;
  if (fumble) { verdict = "FUMBLE — le 1 enchaîne"; cls = "ecl"; }
  else if (critique) { verdict = "CRITIQUE — le 20 relance et cumule"; cls = "ok"; }
  else if (marge >= 5) { verdict = "RÉUSSITE FRANCHE (marge ≥ 5)"; cls = "ok"; }
  else if (marge >= 0) { verdict = "RÉUSSITE"; cls = "ok"; }
  else if (marge <= -5) { verdict = "ÉCHEC GRAVE (marge ≤ −5)"; cls = "cal"; }
  else { verdict = "ÉCHEC"; cls = "cal"; }
  $("sResultat").innerHTML =
    "<table><tr><td class='mini'>" + detail + "</td></tr>" +
    "<tr><td>d20 " + (total !== de ? "(" + total + ") " : "") + "+ BE (" + (sBE >= 0 ? "+" : "") + sBE + ") = <b>" + score + "</b> contre 11 + " + diff + " — marge <b>" + (marge >= 0 ? "+" : "") + marge + "</b></td></tr>" +
    "<tr><td><span class='etat " + cls + "'>" + verdict + "</span></td></tr></table>";
}

</script>
</body>
</html>
