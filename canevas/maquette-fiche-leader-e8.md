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
  .entete-ig { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
  .medaillon { width: 96px; height: 96px; min-width: 96px; border-radius: 50%; border: 3px solid var(--or); background: radial-gradient(circle at 35% 30%, #4a3a26, #241a10); display: flex; align-items: center; justify-content: center; flex-direction: column; }
  .medaillon .initiales { font-family: Georgia, serif; font-size: 28px; color: var(--or2); letter-spacing: 2px; }
  .medaillon .sous { font-family: Verdana, sans-serif; font-size: 8px; color: var(--sous); margin-top: 2px; }
  .background-zone { background: #241a10; border: 1px solid var(--bord); border-left: 3px solid var(--or); border-radius: 6px; padding: 14px; font-family: Georgia, serif; font-size: 13px; line-height: 1.55; color: #d8cbb2; font-style: italic; }
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
  .prof.vide { opacity: .45; border-style: dashed; }
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
  <div class="tab actif" data-p="identite">Informations générales</div>
  <div class="tab" data-p="professions">Classes et compétences</div>
  <div class="tab" data-p="commandement">Commandement</div>
  <div class="tab" data-p="sante">Santé et besoins</div>
  <div class="tab" data-p="magie">Magie</div>
  <div class="tab" data-p="equipement">Équipement</div>
  <div class="tab" data-p="epreuve">Épreuve (jet D20)</div>
  <div class="tab" data-p="features">Features</div>
  <div class="tab" data-p="audit">Audit de complétude</div>
</div>

<!-- ============ INFORMATIONS GENERALES ============ -->
<section class="panneau actif" id="p-identite">
  <div class="entete-ig">
    <div class="medaillon"><div class="initiales">KM</div><div class="sous">PORTRAIT</div></div>
    <div>
      <h2 style="margin:0;color:var(--or2);font-size:20px">Kaelen Morvran</h2>
      <p class="mini" style="margin:2px 0 0">Duc-Général de Vhalorn — Guerrier 28 / Nécromant 22 (bande F)</p>
    </div>
  </div>
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
        <tr><td>Pion leader = état-major</td><td class="cal">SENTENCE : le pion leader EST l'état-major — l'unité d'élite associée au leader (10 à 20 créatures) ; sa fiche d'unité (PF, PMV, PST, moitié des PMB, features d'unité) reste à ouvrir</td></tr>
        <tr><td>État-major</td><td>15 créatures (fourchette native 10 à 20) — escorte et assiste le leader ; c'est lui, en tant qu'unité, qui figure sur la carte</td></tr>
      </table>
    </div>
    <div class="bloc">
      <h3>Caractéristiques naturelles (fiche individuelle)</h3>
      <p class="mini">Conversion D20 : modificateur = (valeur − 10) ÷ 2. Abréviations en trigrammes : For, Dex, Con, Int, Sag, Cha. Les caractéristiques mentales nourrissent habiletés, commandement et magie ; jamais les PF de lot.</p>
      <table id="tCarac"></table>
      <p class="note">PP (puissance physique comparée à la taille) et TC (racine cubique de la masse) sont des données d'espèce : 1 et environ 0,57 pour un humain de 92 kg.</p>
    </div>
  </div>
  <div class="bloc">
    <h3>Mouvement (selon la nature de l'unité — sentence : le reste est du calcul)</h3>
    <table>
      <tr><td>Mouvement terrestre</td><td class="cal">30 PMV — ordre de grandeur attendu (CAL : formule de dérivation au chantier mouvement)</td></tr>
      <tr><td>Mouvement aérien</td><td>— (aucun : l'humain n'est pas une unité aérienne)</td></tr>
      <tr><td>Mouvement maritime</td><td>— (aucun : il embarque sur les navires comme passager — mouvement maritime rapide des leaders, natif)</td></tr>
      <tr class="cal"><td>Monture associée</td><td>cheval de guerre vhalornais — le mouvement de la monture est le sien quand il la chevauche ; ses PMV propres vivent sur la fiche de la monture (calibrage) ; sa nourriture compte (onglet Santé)</td></tr>
    </table>
    <p class="note">Coûts des terrains, effet de l'armure, marche forcée, fluvial, pillage : rien sur la fiche — c'est du calcul (livret des tables et moteur). La nature de l'unité (T, A, M, S) et la monture font la donnée.</p>
  </div>
  <div class="bloc">
    <h3>Background (l'histoire du leader)</h3>
    <div class="background-zone">Second fils d'une maison mineure des collines de Vhal, Kaelen n'hérita que d'une épée et d'une place à l'académie de guerre. Il en sortit maréchal de campagne à vingt-neuf ans, au prix d'une blessure qui le laissa pour mort sur les brousses de Kharen — et d'une nuit, dit-on, où il traita avec ce qui n'était pas la mort. Deux campagnes victorieuses contre les marches du nord lui valurent le titre de Duc-Général ; la nécromancie qu'il dissimule sous le gris de sa cuirasse lui donne ses espions les plus sûrs : ceux qui ne respirent plus. Loyal envers la couronne, mal envers tout le reste, il gouverne Vhalorn comme on entretient une lame : sans amour, sans pitié, avec une précision qui inquiète jusqu'à ses amis.</div>
  </div>
</section>

<!-- ============ CLASSES ET COMPETENCES ============ -->
<section class="panneau" id="p-professions">
  <div class="grille2">
    <div class="bloc">
      <h3>Les classes (SENTENCE : trois places au plus)</h3>
      <p class="mini">Sur une fiche de personnage, les professions s'appellent des classes et les habiletés des compétences. Le niveau est enregistré séparément pour chaque classe ; les ressources ne se prennent qu'une fois ; la compétence prend le meilleur calcul parmi les classes exercées.</p>
      <div id="tProfs"></div>
      <p class="mini" style="margin-top:10px">Bandes É8 (mapping adopté) : A 1-2, B 3-7, C 8-11, D 12-15, E 16-19, F 20 et au-delà.</p>
      <h3 style="margin-top:18px">Capacités militaires et leadership</h3>
      <table>
        <tr><th>Capacité</th><th class="num">Valeur</th><th>Lecture</th></tr>
        <tr><td>CMT (terrestre)</td><td class="num">+5</td><td>échelle militaire −10 à +10</td></tr>
        <tr><td>CMA (aérienne)</td><td class="num">+2</td><td>dérivée du CMT (−3) ; ajustements MdM 1:1</td></tr>
        <tr><td>CMM (maritime)</td><td class="num">−1</td><td>dérivée du CMT (−6) ; ajustements MdM 1:2</td></tr>
        <tr><td>LDS (leadership)</td><td class="num">—</td><td>leaders secrets uniquement ; double profil guilde au chantier bas-fonds</td></tr>
      </table>
      <p class="note">Base 10 natives, régies par le chapitre leaders (BCM et LDS). SENTENCE : pas de notion de qualité pour un leader — ce sont ses niveaux de classe qui la définissent ; la qualité (A à F, étendue au semi-divin et au divin) est une donnée d'unité : base à la création A=5, B=10, C=15, D=20, E=25, F=37 ; l'expérience élève le niveau sans changer forcément la qualité.</p>
    </div>
    <div class="bloc">
      <h3>Les compétences (habiletés É7 + créations É8)</h3>
      <p class="mini">Échelle non militaire : −6 (aucune compétence) à 40 (maître de renommée mondiale) ; la compétence est le pourcentage du niveau dans la classe, arrondi au supérieur.</p>
      <p class="note">SENTENCE de l'auteur (inversion des sentences du matin même, suites 84-87) : LA BASE EST LA VALEUR NATIVE — une compétence de base 5 se tente à 5 par quiconque, sans formation ; une compétence de base 0 NE SE TENTE PAS sans formation professionnelle (jet interdit, la valeur vient d'une profession) ; Administration, base native 10, se tente à 10 par défaut — Adm = Plt ÷ 2 pour les politiciens, processus inversé pour les administrateurs. Créations É8 sentencées : Itd base 5 (natif), Dsf base 0 (professionnelle).</p>
      <div class="filtres">
        <div class="filtre actif" onclick="filtreHab('tous', this)">Toutes</div>
        <div class="filtre" onclick="filtreHab('exercees', this)">Exercées</div>
        <div class="filtre" onclick="filtreHab('natifs', this)">Natives (base 5)</div>
        <div class="filtre" onclick="filtreHab('pros', this)">Professionnelles (base 0)</div>
      </div>
      <table id="tHab"></table>
      <p class="note">Sentence de l'auteur : BE (bonus d'épreuve) = valeur de compétence (niveau de classe × % de canal) + les bonus des DEUX caractéristiques associées, cumulés. Si les chiffres dépassent 100, ce n'est pas grave — le niveau paie, les caractéristiques bonifient sans jamais écraser le niveau. L'échelle militaire garde [(niveau + 10) × 2] en conversion de référence. Les VINGT compétences de l'É8 portent leur paire dirigeante/seconde, TOUTES SENTENCÉES — dont les cinq économiques : Cpt Int/For (géométrie navale, charpente lourde), Cst Int/Con (statics du bâtiment, endurance du chantier), Exa Sag/Con (l'œil du sol et des saisons, la peine des champs), Exf For/Sag (la force abat, la sagesse choisit), Exm Int/Con (la géologie dirige, le fond mine). LECTURE EN DEUX FAMILLES pour le livret des tables (SENTENCE) : FABRICATION — Int dirige la matière (Frg, Cpt ; Cst et Exm côté savoir) ; MILIEU NATUREL — Sag/Con (Srv, Exa ; Exf côté peine).</p>
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
      <h3>Besoins de nourriture (à la semaine — la monture compte)</h3>
      <table>
        <tr><th>Poste</th><th class="num">Par jour</th><th class="num">Par semaine</th><th>Statut</th></tr>
        <tr><td>Kaelen (CCSN 1, omnivore)</td><td class="num">1 ration</td><td class="num">7 rations</td><td><span class="etat ok">CONSERVÉ</span></td></tr>
        <tr class="cal"><td>État-major (15 créatures)</td><td class="num">15 rations</td><td class="num">105 rations</td><td><span class="etat cal">INTERPRÉTATION</span></td></tr>
        <tr class="cal"><td>Monture : cheval de guerre (CCSN 2, herbivore)</td><td class="num">2 rations</td><td class="num">14 rations</td><td><span class="etat cal">INTERPRÉTATION</span> — la monture associée compte (sentence)</td></tr>
        <tr><td>Total (leader et monture)</td><td class="num">18 rations</td><td class="num">126 rations</td><td><span class="etat ok">SOMME</span></td></tr>
        <tr><td>En campagne avec un stack</td><td class="num">au prorata du stack</td><td class="num">—</td><td><span class="etat ok">NATIF</span></td></tr>
      </table>
      <p class="note">La nourriture se lit À LA SEMAINE ; la monture associée au leader y compte comme une tête de plus (sentence de l'auteur). Le CCSN (0, 1 ou 2) est une donnée d'unité ; la lecture individuelle du leader, de son état-major et de sa monture n'est pas table au corpus : l'interprétation « une ration par tête, au CCSN de sa nature » est proposée pour l'audit. Le sort Nourriture (1 PST nourri par PMR) couvre les pénuries ; en réflecte de survie, double coût.</p>
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
        <tr><td><span class="k">0. La règle première</span></td><td>toute action déclarée par un joueur donne lieu à un jet d'habileté pour déterminer le résultat (sentence de l'auteur)</td></tr>
        <tr><td><span class="k">1. La caractéristique</span></td><td>assise 3.5 : six scores aux trigrammes For/Dex/Con/Int/Sag/Cha, modificateur = (score − 10) ÷ 2, arrondi vers le bas ; chaque habileté regarde DEUX caractéristiques associées</td></tr>
        <tr><td><span class="k">2. Le niveau</span></td><td>l'habileté = niveau de la profession × % de canal (table 100/75/50 %), meilleur calcul entre professions</td></tr>
        <tr><td><span class="k">2 bis. L'entretien</span></td><td>chaque profession fournit une valeur de base dans certaines caractéristiques selon le niveau (canaux 100/75/50 %) — cadence exacte au fichier de calibrage (proposition)</td></tr>
        <tr><td><span class="k">3. La bonification</span></td><td>BE = niveau × % + les bonus des deux caractéristiques associées, CUMULÉS ; au-delà de 100 : aucun souci (sentence de l'auteur)</td></tr>
        <tr><td><span class="k">3 bis. Les bonus applicables</span></td><td>la famille des ressources, dont les effets varient selon l'action et l'habileté (réflexion de l'auteur) : PA universels ; PS et PC (économie de l'ombre) ; PFD (points de faveur divine) ; PMR (magie rituelle) ; S (graisse civile) ; sorts de soutien, équipement magique, terrain : selon leurs tables — essai au simulateur : PA +2/point, S +1/pièce</td></tr>
        <tr><td><span class="k">4. La situation</span></td><td>avantage ou désavantage : deux dé, on garde le meilleur ou le pire (jamais cumulables, ils s'annulent) — actions individuelles ET engagements de masse (sentence de l'auteur)</td></tr>
        <tr><td><span class="k">5. Le verdict (challenge)</span></td><td>réussite si d20 + BE + bonus ≥ 11 + difficulté ; marge = total − 11 − difficulté ; PAS de relances (sentence)</td></tr>
        <tr><td><span class="k">6. Le verdict (opposition)</span></td><td>les deux camps roulent leur total ; l'ÉCART des deux jets est la marge du vainqueur — et le miroir du perdant ; la même échelle se lit sur cet écart, l'égalité d'échelle fait le par (sentence de l'auteur)</td></tr>
      </table>
      <p class="note">Le jet est FERMÉ : plus de relances sur 1 ou 20 (sentence de l'auteur). L'éventail se lit en tranches de marge. Dans la résolution de masse, l'avantage/désavantage s'applique à l'engagement pour les situations maîtresses non chiffrables (embuscade, nuit aveugle, enfoncement) ; les modificateurs chiffrés du terrain restent en marge — les deux monnaies ne se mélangent pas.</p>
    </div>
    <div class="bloc">
      <h3>L'éventail des résultats (symétrique, largeur x au banc d'essai — sentence)</h3>
      <table>
        <tr><th>Résultat</th><th>Déclencheur</th><th>Effet</th></tr>
        <tr><td><span class="etat chant">SUPER FUMBLE</span></td><td>marge ≤ −2x (≤ −10)</td><td>catastrophe : en combat individuel, blessé et désarmé ou pire ; l'action se retourne contre son auteur ; en embuscade : repérage automatique</td></tr>
        <tr><td><span class="etat ecl">FUMBLE</span></td><td>marge ≤ −x (≤ −5)</td><td>complication à l'arbitrage du MdM — arme lâchée, bruit, chute, exposition ; en combat individuel, l'état passe à blessé</td></tr>
        <tr><td>Échec</td><td>0 &gt; marge &gt; −x</td><td>rien ne se passe, ou presque — la marge négative module la contre-performance</td></tr>
        <tr><td>Réussite</td><td>0 ≤ marge &lt; +x</td><td>effet standard ; la marge positive module la portée</td></tr>
        <tr><td><span class="etat ok">SPÉCIALE</span></td><td>marge &gt; +x (&gt; +5)</td><td>réussite bonifiée : information totale, chef-d'œuvre, avantage au jet lié de la suite — effets à définir par domaine</td></tr>
        <tr><td><span class="etat ok">CRITIQUE</span></td><td>marge &gt; +2x (&gt; +10)</td><td>en combat individuel : blessure maximale ; le MdM offre l'effet héroïque</td></tr>
      </table>
      <p class="note">Une seule largeur de tranche, x, sert les six marches : spéciale à +x, critique à +2x, fumble à −x, super fumble à −2x (sentence de l'auteur ; x = 5 en piste, largeur tranchée au banc d'essai). En opposition, l'écart des deux jets se lit sur cette même échelle : le vainqueur lit +écart, le perdant lit −écart en miroir (sentence). Cas particuliers natifs conservés : capture sur jet de survie raté de moins de 5 ; « à moins d'un fumble » des embuscades se lit désormais « à moins d'une marge ≤ −x ».</p>
    </div>
  </div>
  <div class="bloc">
    <h3>L'échelle des challenges (sentence de l'auteur — de 10 en 10, la difficulté porte le numéro du niveau qui l'affronte à par)</h3>
    <table>
      <tr><th class="num">Défi</th><th>Nom</th><th>À par pour</th><th>Exemples</th></tr>
      <tr><td class="num">20</td><td>Ordinaire</td><td>professionnel de métier (niveau 20, bande F)</td><td>le pain quotidien du métier : forge d'une lame droite, discours de garnison</td></tr>
      <tr><td class="num">30</td><td>Exigeant</td><td>vétéran confirmé</td><td>siege d'une serrure de guilde, saut du fossé au galop</td></tr>
      <tr><td class="num">40</td><td>Remarquable</td><td>maître de métier</td><td>lame de qualité supérieure, embuscade en terrain hostile</td></tr>
      <tr><td class="num">50</td><td>Extraordinaire</td><td>grand maître</td><td>œuvre de cour, évasion d'une citadelle</td></tr>
      <tr><td class="num">60</td><td>Prodige</td><td>sommet de la condition mortelle</td><td>tenir seul une brèche, décrocher une alliance impossible</td></tr>
      <tr><td class="num">70</td><td>Héroïque</td><td>les exploits des chants</td><td>quête de légende, duel contre un champion de cour</td></tr>
      <tr><td class="num">80</td><td>Légendaire</td><td>actes qui fondent des dynasties</td><td>la geste que l'on grave sur les portes de la ville</td></tr>
      <tr><td class="num">90</td><td>Mythique</td><td>les douze travaux</td><td>ce que les dieux regardent</td></tr>
      <tr><td class="num">100+</td><td>Épique / divin</td><td>haute magie et héros divins</td><td>les actes des dieux incarnés</td></tr>
    </table>
    <p class="note">Sous la marche 20, le MdM ne demande pas de jet : la compétence courante suffit (règle de routine). « À par » : un praticien à 100 % du niveau nommé réussit à 11 sur le d20 — l'échelle des défis calque l'échelle des niveaux, le modificateur de tranche se lit d'un coup d'œil (défi 40 pour un niveau 30 : −10, soit deux marches de fumble en cas d'échec).</p>
  </div>
  <div class="bloc">
    <h3>Simulateur d'épreuve (échantillon)</h3>
    <div class="filtres" id="sAction">
      <div class="filtre actif" data-be="32" onclick="choixAction(this)">Attaque à l'épée (Cbt 28, For+3 / Dex+1) — BE 32</div>
      <div class="filtre" data-be="22" onclick="choixAction(this)">Discours de guerre (Itd 17, Cha+2 / For+3) — BE 22</div>
      <div class="filtre" data-be="16" onclick="choixAction(this)">Repérage en rase campagne (Dse 14, Dex+1 / Sag+1) — BE 16</div>
    </div>
    <div class="filtres">
      <div class="filtre actif" id="mNormal" onclick="choixMode('normal', this)">Normal</div>
      <div class="filtre" id="mAv" onclick="choixMode('avantage', this)">Avantage</div>
      <div class="filtre" id="mDes" onclick="choixMode('desavantage', this)">Désavantage</div>
      <label class="mini" style="margin-left:12px">Difficulté : <input type="number" id="sDiff" value="0" style="width:52px;background:#33291d;border:1px solid var(--bord);color:var(--texte);padding:3px 6px;border-radius:3px"></label>
      <label class="mini">PA investis (+2/pa, en réflexion) : <input type="number" id="sPA" value="0" min="0" style="width:40px;background:#33291d;border:1px solid var(--bord);color:var(--texte);padding:3px 6px;border-radius:3px"></label>
      <label class="mini">S dépensés (+1/S, en réflexion) : <input type="number" id="sS" value="0" min="0" style="width:40px;background:#33291d;border:1px solid var(--bord);color:var(--texte);padding:3px 6px;border-radius:3px"></label>
      <span class="cle">(réussite à 11 + difficulté — la difficulté vit à l'échelle du niveau : face à un égal, difficulté ≈ BE adverse)</span>
    </div>
    <button class="btn-audit" style="color:var(--or2);border-color:var(--or)" onclick="lancer()">LANCER LE DÉ</button>
    <div id="sResultat" style="margin-top:12px"></div>
  </div>
</section>

<!-- ============ FEATURES ============ -->
<section class="panneau" id="p-features">
  <div class="bloc">
    <h3>Features (capacités spéciales déclarées)</h3>
      <p class="mini">Chaque feature se déclare par sa SOURCE (race, profession, équipement, sort permanent) et porte sa VALEUR — rien d'implicite sur la fiche.</p>
      <table>
        <tr><th>Feature</th><th>Source</th><th>Valeur</th><th>Effet</th></tr>
        <tr class="exercee"><td>Tournage des morts-vivants</td><td>Profession : Nécromant</td><td>force = PMB ÷ 8 → 3 PF</td><td>affecte, neutralise, détruit ou prend sous contrôle des morts-vivants et créatures extraplanaires ; bonus de +4 aux nécromants ; si habileté ≥ RAT + 5 : contrôle ou destruction, sinon neutralisation pour le combat</td></tr>
        <tr class="exercee"><td>Pénétrante / Perforante</td><td>Équipement : épée +2</td><td>déclarée</td><td>features d'arme déclarées sur l'onglet Équipement — empilement régi par le chantier armures</td></tr>
        <tr><td>Aucune feature raciale</td><td>Race : Humain</td><td>—</td><td>l'humain vhalornais ne porte pas de capacité spéciale de race</td></tr>
      </table>
      <p class="note">Registre des features natives (relevé complet §8.1.3) : Archer, Berserker, bonus/malus de terrain (+x), Dissimulation (DIS), Embarquement, Ignore fortification (IF), Immortels (Imm), Immunité au poison (IP), Infravision (INF), Infravision active (INFA), Peur, Poison (x), Résistance magique (MR), Résistance à la peur (RPE), Résistance au poison (RPO), Résistance au tournage (RAT), Raider, Ravitaillement, Régénération, Tournage, Vision dans les ténèbres, Vol mono-hex. Le leader en déclare au titre de sa race, de ses professions, de son équipement ou de sorts permanents ; les features d'unités vivent sur la fiche du pion leader — l'état-major, son unité d'élite associée (10 à 20 créatures, sentence). La RPE du leader et l'amortissement de la peur par [10 + 3×(BCM+BC+BR)] : chantier leaders L8.</p>
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
  ["Force", "For", 17], ["Dextérité", "Dex", 13], ["Constitution", "Con", 14],
  ["Intelligence", "Int", 16], ["Sagesse", "Sag", 12], ["Charisme", "Cha", 15],
];
const bandes = [["A","1-2"],["B","3-7"],["C","8-11"],["D","12-15"],["E","16-19"],["F","20+"]];
const profs = [
  { nom: "Guerrier", sig: "Gu", niv: 28, famille: "Non lanceur — canal physique", canal: "Cbt 100, Dse 50, Frg 75, Srv 75, Trc 50" },
  { nom: "Nécromant", sig: "Nc", niv: 22, famille: "Pur lanceur — théurgie et essence", canal: "Bbl 75, Dsv 75" },
];
const habiletes = [
  ["Combat", "Cbt", 28, "Guerrier 100 %", true, 0],
  ["Forgeage", "Frg", 21, "Guerrier 75 %", true, 0],
  ["Survie", "Srv", 21, "Guerrier 75 %", true, 0],
  ["Discrétion extérieure", "Dse", 14, "Guerrier 50 %", true, 5],
  ["Tracking", "Trc", 14, "Guerrier 50 %", true, 5],
  ["Bibliothèque", "Bbl", 17, "Nécromant 75 %", true, 5],
  ["Discrétion en ville", "Dsv", 17, "Nécromant 75 %", true, 5],
  ["Intimidation", "Itd", 17, "création É8 — MdM (histoire)", true, 5],
  ["Administration", "Adm", 0, "base 10 natif ; Plt ÷ 2 pour les politiciens", false, 10],
  ["Politique", "Plt", 0, "—", false, 0],
  ["Négoce", "Ngc", 0, "—", false, 0],
  ["Charpenterie", "Cpt", 0, "—", false, 0],
  ["Construction", "Cst", 0, "—", false, 0],
  ["Exploitation agricole", "Exa", 0, "—", false, 0],
  ["Exploitation forestière", "Exf", 0, "—", false, 0],
  ["Exploitation minière", "Exm", 0, "—", false, 0],
  ["Séduction", "Sed", 0, "—", false, 5],
  ["Vol", "Vol", 0, "—", false, 5],
  ["Assassinat", "Ass", 0, "—", false, 5],
  ["Espionnage", "Esp", 0, "—", false, 5],
  ["Désinformation", "Dsf", 0, "création É8, professionnelle", false, 0],
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
  ["Caractéristiques", "trigrammes For/Dex/Con/Int/Sag/Cha + conversion D20", "OK", "annexes de profils"],
  ["Classes (ex-professions)", "TROIS PLACES au plus (SENTENCE) ; niveaux séparés, bandes A-F", "OK", "grille des métiers"],
  ["Qualité du leader", "AUCUNE (SENTENCE) : les niveaux de profession définissent la valeur du leader", "OK", "onglet Professions"],
  ["Compétences (ex-habiletés)", "matrice métier × habileté ; LA BASE EST LA VALEUR NATIVE : base 5 tentable à 5 par tous, base 0 interdite sans formation, Adm 10 natif — SENTENCE (inversion des suites 84-87)", "OK", "matrice V7 transcrite"],
  ["Classement natif / professionnel", "SENTENCE : base 5 = natif pour tous (Ass, Bbl, Dse, Dsv, Esp, Sed, Trc, Vol, Itd) ; base 0 = professionnel (Cbt, Cpt, Cst, Exa, Exf, Exm, Frg, Ngc, Plt, Srv, Dsf) ; Adm base 10 natif", "OK", "sentences de l'auteur"],
  ["Paires de caractéristiques", "20/20 compétences couvertes, TOUTES SENTENCÉES (16 premières + Cpt Int/For, Cst Int/Con, Exa Sag/Con, Exf For/Sag, Exm Int/Con) ; lecture en deux familles pour le livret : Fabrication (Int dirige) / Milieu naturel (Sag-Con)", "OK", "sentences de l'auteur"],
  ["Cumul entre professions", "le meilleur calcul, jamais la somme", "CAL", "proposition à valider"],
  ["Valeur d'épreuve (BE)", "niveau × % + bonus des deux caractéristiques associées cumulés ; > 100 permis", "OK", "sentence de l'auteur"],
  ["Chaîne de l'épreuve", "règle première sentencée (jet par action déclarée) ; échelle des challenges SENTENCÉE ; opposition écart/miroir SENTENCÉE ; x au banc d'essai", "CAL", "x, effets de la spéciale et ressources (PS, PC, PFD, PMR) à arbitrer"],
  ["NE et PV du leader", "formule de dérivation individuelle", "ÉLUCIDER", "annexes de profils, étage 1"],
  ["Nourriture du leader et de l'état-major", "à la semaine, monture comptée : 126 rations (interprétation une ration par tête au CCSN)", "CAL", "sentence semaine + monture"],
  ["VM (valeur morale)", "ordre de grandeur non table", "ÉLUCIDER", "à calibrer"],
  ["PFD du non-prêtre", "règle d'accès", "CAL", "à préciser"],
  ["LDS du leader militaire", "double profil guilde", "CAL", "chantier bas-fonds"],
  ["Pion leader", "NATURE SENTENCÉE : le pion leader EST l'état-major, l'unité d'élite associée (10 à 20 créatures) ; fiche d'unité (PF, PMV, PST, ½ PMB, features d'unité)", "CHANTIER", "fiche à ouvrir — nature gravée"],
  ["Qualité des unités", "base NH à la création : A=5, B=10, C=15, D=20, E=25, F=37 (SENTENCE) ; l'expérience élève le niveau sans changer forcément la qualité ; échelle étendue jusqu'au SEMI-DIVIN et au DIVIN", "CAL", "lettres et bases des marches divines à calibrer"],
  ["Jet de survie du leader", "proposition v2 déposée", "CHANTIER", "sentence attendue"],
  ["Protection magique personnelle", "remplacement RAM/TAM", "CHANTIER", "banc d'essai"],
  ["BCM, BC, BR — application", "châssis à deux étages", "OK", "sentencé ce soir"],
  ["Échelle du cumul", "division continue", "OK", "sentencé ce soir"],
  ["Magie : PMB, AM, NM", "formules natives", "OK", "relevé des sorts"],
  ["Borne du NM par objets", "montée par équipement magique", "CAL", "chantier magie"],
  ["Sorts accessibles", "35 standard + 43 grande magie", "OK", "relevé complet"],
  ["Armes et armures", "marge et absorption", "OK", "chantier armures v0.6"],
  ["Contreparties armure lourde", "PMV, terrains, chaleur", "CAL", "calcul — chantier mouvement"],
  ["Déplacement du leader", "mouvements T/A/M selon la nature + monture associée (SENTENCE) ; le reste est du calcul", "OK", "Informations générales"],
  ["Portrait et background", "médaillon + zone histoire", "OK", "Informations générales"],
  ["Features du leader", "déclarées par source (race, profession, équipement, sort) ; registre natif §8.1.3", "OK", "onglet dédié — relevé natif"],
  ["PMV du leader", "30 PMV attendus (terrestre)", "CAL", "Informations générales — formule à arbitrer"],
  ["Panoplies", "relier panoplie et habileté", "CHANTIER", "table unique à ouvrir"],
  ["Cycle du Destin", "santé longue, séquelles", "CHANTIER", "à ouvrir (Chirurgien)"],
];

// ---------- RENDU ----------
const $ = (id) => document.getElementById(id);

$("tCarac").innerHTML = "<tr><th>Caractéristique</th><th class='num'>Trig.</th><th class='num'>Valeur</th><th class='num'>Mod. D20</th></tr>" +
  caracs.map(c => "<tr><td>" + c[0] + "</td><td class='num'>" + c[1] + "</td><td class='num'>" + c[2] + "</td><td class='num'>" + (((c[2]-10)/2) >= 0 ? "+" : "") + ((c[2]-10)/2) + "</td></tr>").join("");

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
}).join("") + "<div style='margin-bottom:12px'><div class='prof vide'><span class='nom'>— classe libre (" + (3 - profs.length) + " place" + (3 - profs.length > 1 ? "s" : "") + " restante" + (3 - profs.length > 1 ? "s" : "") + ") —</span><span class='niv'>—</span></div></div>";

const modsCar = { "For": 3, "Dex": 1, "Con": 2, "Int": 3, "Sag": 1, "Cha": 2 }; // For17 Dex13 Con14 Int16 Sag12 Cha15
// Paires dirigeante / seconde par habileté — les deux bonus se CUMULENT (sentence de l'auteur)
const dirige = { "Cbt": ["For", "Dex"], "Frg": ["Int", "For"], "Srv": ["Sag", "Con"], "Dse": ["Dex", "Sag"], "Trc": ["Sag", "Dex"], "Bbl": ["Int", "Sag"], "Dsv": ["Dex", "Cha"], "Itd": ["Cha", "For"], "Adm": ["Int", "Cha"], "Plt": ["Cha", "Int"], "Ngc": ["Cha", "Int"], "Sed": ["Cha", "Dex"], "Vol": ["Dex", "Int"], "Ass": ["Dex", "Int"], "Esp": ["Int", "Cha"], "Dsf": ["Cha", "Int"], "Cpt": ["Int", "For"], "Cst": ["Int", "Con"], "Exa": ["Sag", "Con"], "Exf": ["For", "Sag"], "Exm": ["Int", "Con"] };
// Sentence : BE = niveau × % (déjà payé dans la valeur d'habileté) + Σ des bonus des deux caractéristiques associées.
// Au-delà de 100 : aucun souci — la difficulté se règle à l'échelle des niveaux.
const be = (niv, sig) => niv + modsCar[dirige[sig][0]] + modsCar[dirige[sig][1]];

function ligneHab(h) {
  const [nom, sig, niv, src, ex, base] = h;
  const interdit = niv === 0 && base === 0;
  const vNiv = niv > 0 ? niv : base;
  const vBE = interdit ? null : vNiv + modsCar[dirige[sig][0]] + modsCar[dirige[sig][1]];
  const suffixe = niv > 0 ? "" : (sig === "Adm" ? " (base 10 natif)" : " (base " + base + " natif)");
  const cellBE = interdit
    ? "<td class='num be neg'>interdit (à former)</td>"
    : "<td class='num be" + (vBE >= 0 ? "pos" : "neg") + "'>" + vBE + suffixe + "</td>";
  return "<tr class='hab " + (ex ? "exercee" : "") + (base === 5 ? " natif" : "") + (base === 0 ? " pro" : "") + (sig === "Adm" ? " adm" : "") + "'>" +
    "<td>" + nom + " <span class='cle'>(" + sig + ")</span></td><td class='num'>" + vNiv + "</td>" +
    "<td class='num'>" + base + "</td>" +
    "<td class='num'>" + dirige[sig][0] + "+" + modsCar[dirige[sig][0]] + " / " + dirige[sig][1] + "+" + modsCar[dirige[sig][1]] + "</td>" +
    cellBE +
    "<td class='mini'>" + src + "</td></tr>";
}
const enteteHab = "<tr><th>Compétence</th><th class='num'>Niveau</th><th class='num'>Base</th><th class='num'>Car. assoc.</th><th class='num'>BE</th><th>Source</th></tr>";
$("tHab").innerHTML = enteteHab + habiletes.map(ligneHab).join("");

function filtreHab(mode, el) {
  document.querySelectorAll("#p-professions .filtre").forEach(f => f.classList.remove("actif"));
  el.classList.add("actif");
  document.querySelectorAll("#tHab tr.hab").forEach(tr => {
    let show = mode === "tous";
    if (mode === "exercees") show = tr.classList.contains("exercee");
    if (mode === "natifs") show = tr.classList.contains("natif") || tr.classList.contains("adm");
    if (mode === "pros") show = tr.classList.contains("pro");
    tr.style.display = show ? "" : "none";
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
  const pa = Math.max(0, +($("sPA").value || 0));
  const sol = Math.max(0, +($("sS").value || 0));
  const bonusApp = 2 * pa + sol;
  let detail = "", de;
  if (sMode === "avantage") { const a = d20(), b = d20(); de = Math.max(a, b); detail = "2d20 (" + a + ", " + b + ") — on garde le meilleur : " + de; }
  else if (sMode === "desavantage") { const a = d20(), b = d20(); de = Math.min(a, b); detail = "2d20 (" + a + ", " + b + ") — on garde le pire : " + de; }
  else { de = d20(); detail = "1d20 : " + de; }
  const score = de + sBE + bonusApp;
  const marge = score - 11 - diff;
  let verdict, cls;
  if (marge >= 10) { verdict = "CRITIQUE (marge > +2x = +10)"; cls = "ok"; }
  else if (marge >= 5) { verdict = "SPÉCIALE (marge > +x = +5)"; cls = "ok"; }
  else if (marge >= 0) { verdict = "RÉUSSITE"; cls = "ok"; }
  else if (marge <= -10) { verdict = "SUPER FUMBLE (marge ≤ −2x = −10)"; cls = "chant"; }
  else if (marge <= -5) { verdict = "FUMBLE (marge ≤ −x = −5)"; cls = "ecl"; }
  else { verdict = "ÉCHEC"; cls = "cal"; }
  $("sResultat").innerHTML =
    "<table><tr><td class='mini'>" + detail + "</td></tr>" +
    "<tr><td>d20 + BE (" + sBE + ")" + (bonusApp ? " + bonus applicables (+" + bonusApp + (pa ? " — " + pa + " PA" : "") + (sol ? (pa ? ", " : " — ") + sol + " S" : "") + ")" : "") + " = <b>" + score + "</b> contre 11 + " + diff + " — marge <b>" + (marge >= 0 ? "+" : "") + marge + "</b></td></tr>" +
    "<tr><td><span class='etat " + cls + "'>" + verdict + "</span></td></tr></table>";
}

</script>
</body>
</html>