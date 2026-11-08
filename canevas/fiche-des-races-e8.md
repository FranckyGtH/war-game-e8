---
name: "fiche-des-races-e8"
title: "La fiche des races — Édition 8, v0.4"
type: "text/markdown"
---

# La fiche des races — Édition 8, v0.4 (8 novembre 2026)

Statut : v0.4 — LA MAIN DE L'AUTEUR sur la table des propositions (8 novembre) : QUATRIÈME VECTEUR proposé — LA VERSATILITÉ, plancher universel sur toutes les habiletés, y compris professionnelles (l'humain tente tout à 2 minimum, le highman à 5 minimum) ; races de la menace scindées en DEUX GROUPES — hobgobelin, uruk, gnoll : Itd +10 ; orc, goblin, kobold : Itd +5 (lus comme BONUS raciaux : valeurs atteintes 15 et 10 natifs) ; gnome +10 BE sur ALCHIMIE (Alc, habileté nouvelle proposée à la grille, canal propre de l'alchimiste) ; demi-elfe +5 BE sur Trc/Dse/Dsv ; drow +5 BE sur Sed et Ass ; colonne Statut portée de la main de l'auteur. v0.3 — sentences du 8 novembre (calibrage racial, argument chiffré au journal suite 95) : le BONUS DE SOCLE (majoration de la base) DEMEURE À +5 — la naissance paie le socle, la formation paie la carrière, la maîtrise efface l'origine ; le BONUS PLAT AU BE EST PORTÉ DE +2 À +5 — le +2 de la 3.5 vaut dix pour cent au dé de vingt, soit +5 à l'échelle de centaine ; un APANAGE à +10 (compétence signature d'une race extrême, précédent natif du quickling) demeure en proposition. v0.2 — SENTENCE DE L'AUTEUR (7 novembre à la nuit) : LES BONUS RACIAUX S'AJOUTENT aux compétences, voire à la valeur de base — ILS NE REMPLACENT JAMAIS. : la fiche des races doit précéder le reste du travail. QUATRE SENTENCES : (1) les ajustements de caractéristiques raciaux suivent D&amp;D 3.5 (PHB table 2-1 vérifiée à la source ; le Monster Manual 3.5, présent à la bibliothèque, sert les races hors PHB) ; (2) le mot français pour « features » de race est APTITUDES ; (3) l'architecture de la base de données est arrêtée : SQLite dans les applications dédiées (MdM, joueur), PostgreSQL au portail central, schéma versionné au dépôt ; (4) le périmètre des races jouables couvre le PHB 3.5 ET tout le corpus É7 (PJ et PNJ), les monstres étant à part au bestiaire ; les bonus d'habiletés raciaux : l'assistant propose, l'auteur arbitre. Sources : section « Les races » des règles É7 (créatures standards et spéciales), table des créatures É7 (classeur — NH, NE, PP, RP, TC, Force, PST, PMV, EDT, MR, alignement par créature), PHB 3.5 (table 2-1 et traits raciaux, chapitre 2), Monster Manual 3.5 (ajustements des races hors PHB, relevé au chantier suivant).

## 1. Fondations — la race dans l'architecture des capacités

La race est une origine de capacités : les APTITUDES (sentence du 7 novembre au soir). Vocabulaire sentencé de l'É8 : l'APTITUDE appartient à la race, la CAPACITÉ au métier, le DON aux feats, la FEATURE demeure le registre générique du leader. La race paie la masse, jamais le niveau : PV individuel = 10 × TC³ (la masse est de race), PP et RP sont des données raciales, le NM plafonné par le sang (highman +2, sentence antérieure) ; le niveau paie au NH par h(NH), jamais au PV (garde-fou 2) — et la race ne paie jamais non plus de niveau ni de pourcentage de canal. L'HUMAIN EST L'ANCRE du pipeline : PP 1, TC 1, PV 10, toutes les formules se lisent sur lui.

Lecture de conception : la fiche des races n'est pas un livret de saveur, c'est une table de constantes du moteur — les PP raciaux attendus à l'inscription au pipeline (point ouvert du fichier de calibrage), les valeurs natives des immunisations par race, le facteur mort-vivant, la résistance magique et l'EDT indicatif y trouvent leur foyer. Elle est aussi la première entité de la base de données (section 6).

## 2. Les caractéristiques — sentence D&amp;D 3.5

SENTENCE : les ajustements de caractéristiques raciaux suivent les tables de D&amp;D 3.5. La conversion en modificateur demeure (score − 10) ÷ 2, déjà en place à la maquette du leader. Le BE (valeur d'épreuve) en tire les bonus des deux caractéristiques associées, cumulés — un ajustement racial déplace donc le BE de toutes les habiletés dont la paire touche la caractéristique ajustée.

### PHB 3.5, table 2-1 — les sept races (RELEVÉ VÉRIFIÉ)


| Race       | Ajustements 3.5                           | Classe favorite |
| ---------- | ----------------------------------------- | --------------- |
| Humain     | aucun                                     | Indifférente    |
| Nain       | +2 Constitution, −2 Charisme              | Guerrier        |
| Elfe       | +2 Dextérité, −2 Constitution             | Mage            |
| Gnome      | +2 Constitution, −2 Force                 | Barde           |
| Demi-elfe  | aucun                                     | Indifférente    |
| Demi-orque | +2 Force, −2 Int, −2 Cha (Int plancher 3) | Barbare         |
| Halfelin   | +2 Dextérité, −2 Force                    | Voleur          |


La notion 3.5 de classe favorite ne se transpose pas telle quelle (l'É8 n'a pas de pénalité d'expérience multiclassée) : elle est consignée comme repère de saveur et pourra nourrir la culture raciale à la curation.

### Races hors PHB — relevé Monster Manual 3.5 (À RELEVER, chantier suivant)

Indicatifs de la 3.5, à vérifier au Monster Manual 3.5 de la bibliothèque avant sentence : drow (+2 Dex, +2 Cha, −2 Con), nain gris (duergar, +2 Con, −2 Cha), kobold (+2 Dex, −4 Str, −2 Con), goblin (+2 Dex, −2 Str, −2 Cha), hobgobelin (+2 Dex, +2 Con), orc (+4 Str, −2 Int, −2 Sag, −2 Cha), gnoll (+2 Str, +2 Con), homme lézard (+2 Str, +2 Con, −2 Int), sahuagin (+2 Str, +2 Con), triton (+2 Str, +2 Con). Les races sans contrepartie 3.5 (highman) ou à ajustements de créature (ogre, centaure, drider, quickling) reçoivent des AJUSTEMENTS É8 NATURELS au calibrage, l'É7 demeurant le guide des valeurs.

## 3. Le registre des races jouables (PJ et PNJ ; monstres à part)

Classification proposée : T1, RACES DE PJ (jouables par les joueurs) ; T2, RACES PNJ (le MdM en fait des leaders, des spécialistes et des puissances, le joueur peut les obtenir par la diplomatie ou la conquête) ; MONTURES ET BÊTES (à part, chantier bestiaire) ; MONSTRES (à part, chantier bestiaire). La frontière T1/T2 est un arbitrage de campagne : la fiche couvre toutes les deux.

### T1 et T2 — constantes natives (RELEVÉ É7, table des créatures)


| Race           | Cat. | NH natif                                                                          | TC     | PP    | RP    | PST | PMV | EDT | MR          | Align. |
| -------------- | ---- | --------------------------------------------------------------------------------- | ------ | ----- | ----- | --- | --- | --- | ----------- | ------ |
| Humain         | T1   | 0                                                                                 | 1,0    | 1     | —     | 10  | 12  | 1,0 | —           | \*     |
| Nain           | T1   | 3,0                                                                               | 1,0    | 0,465 | 0,2   | 10  | 6   | 1,2 | 10          | \*     |
| Elfe           | T1   | 2,01                                                                              | 0,8435 | 1     | —     | 6   | 12  | 1,0 | —           | \*     |
| Gnome          | T1   | —                                                                                 | 0,585  | 1     | —     | 2   | 6   | 1,0 | 10          | NG     |
| Hobbit         | T1   | 0,5                                                                               | 0,737  | 1     | —     | 4   | 6   | 1,0 | 10          | LG     |
| Demi-elfe      | T1   | 0                                                                                 | 1,0    | 1     | —     | 10  | 12  | 1,0 | —           | \*     |
| Demi-orque     | T1   | à inscrire (aucune ligne native : création É8)                                    |        |       |       |     |     |     |             |        |
| Drow           | T1   | 6,03                                                                              | 0,8435 | 1     | —     | 6   | 12  | 0,8 | par qualité | CE     |
| Nain gris      | T1   | 3,0                                                                               | 1,0    | 0,465 | 0,2   | 10  | 6   | 1,2 | 10          | LE     |
| Elfe aquatique | T1   | à inscrire (règles É7 : infanterie légère, infravision ; pas de ligne à la table) |        |       |       |     |     |     |             |        |
| Hobgobelin     | T2   | à inscrire (règles É7 : raider ; pas de ligne à la table)                         |        |       |       |     |     |     |             |        |
| Orc            | T2   | 1,0                                                                               | 1,0    | 1     | —     | 10  | 12  | 1,1 | —           | LE     |
| Uruk           | T2   | 5,0                                                                               | 1,0915 | 0,5   | 0,365 | 13  | 12  | 1,1 | —           | LE     |
| Gnoll          | T2   | 2,02                                                                              | 1,1935 | 1     | —     | 17  | 9   | 0,8 | —           | CE     |
| Goblin         | T2   | 1,0                                                                               | 0,737  | 1     | —     | 4   | 12  | 1,1 | —           | LE     |
| Kobold         | T2   | 0,88                                                                              | 0,585  | 1     | —     | 2   | 6   | 1,1 | —           | LE     |
| Homme lézard   | T2   | 2,02                                                                              | 1,1935 | 1     | —     | 17  | 12  | 1,0 | —           | NN     |
| Sahuagin       | T2   | 2,02                                                                              | 1,1935 | 1     | —     | 17  | 24  | 1,1 | —           | LE     |
| Merman         | T2   | 0                                                                                 | 1,0    | 1     | —     | 10  | 18  | 1,0 | —           | NN     |
| Triton         | T2   | 0,04                                                                              | 1,0915 | 1     | —     | 13  | 15  | 1,0 | 90          | NG     |
| Quickling      | T2   | 0,85                                                                              | 0,464  | 1     | —     | 1   | 96  | 0,8 | 10          | CE     |
| Centaure       | T2   | 3,93                                                                              | 1,5874 | 1     | —     | 40  | 18  | 1,0 | —           | CG     |
| Ogre           | T2   | 5,0                                                                               | 1,9129 | 1,0   | 0,222 | 70  | 9   | 0,8 | —           | CE     |
| Highman        | T2   | 10,0                                                                              | 1,5183 | 1,23  | 1,0   | 35  | 12  | 1,0 | 50          | \*     |
| Drider         | T2   | 6,4                                                                               | 1,1935 | 1     | —     | 17  | 12  | 0,8 | 15          | CE     |


Montures et bêtes à part : cheval, pégase, griffon, loup, requin, aigle géant, lézard géant, éléphant de guerre, licorne, wyvern, nightmare. Monstres à part (bestiaire séparé, chantier futur) : trolls, géants, ents, dragons, golems, élémentaires, morts-vivants, démons et diables, mind-flayer, béhir, rakshasa, djinn, ki-rin, et le reste des créatures spéciales et exceptionnelles É7.

## 4. Le relevé des aptitudes raciales É7 (CONSERVÉ)

Relevé de la section « Les races » des règles É7, race par race. Les valeurs d'habiletés citées (dissimulation, tracking) sont les DONNÉES NATIVES RACIALES de l'É7 — lues en É8 comme des VALEURS ATTEINTES, base + bonus (convention de la section 5).

- DEMI-ELFE : infravision.
- ELFE : infravision ; en forêt, bonus de 1, dissimulation et tracking de 25, déplacement comme en plaine, CCSN ¼.
- ELFE AQUATIQUE : infravision ; en mer, bonus de 0,5, CCSN ¼, dissimulation et tracking de 20.
- NAIN : infravision, RPO ¾ ; en souterrain, bonus de 1 et CCSN ¼ ; en montagne, bonus de 0,5 et CCSN ½ ; déplacements comme en forêt claire.
- GNOME : infravision, résistance au poison (RPO ½) ; assimilé aux berserkers pour les pertes infligées contre les humanoïdes.
- HOBBIT : infravision, DISSIMULATION 10, RPO ¾.
- DROW : infravision active, vol mono hex, poison, RPO ½ ; TAM et MR par qualité (A +1/50 %, B +2/60 %, C +4/70 %, D +6/70 %, E +8/80 %) ; qualité B native au levé ; équipement léger comptant moyen ; NE additionnel d'environ 10 % des NH ; combat de jour ½ sauf terrains de bonus ; en souterrain, bonus 1, CCSN ¼, dissimulation et tracking 15, déplacement plaine ; en forêt épaisse, bonus 0,4, CCSN ½, dissimulation et tracking 10, déplacement forêt moyenne.
- NAIN GRIS (duergar) : ligne native à la table des créatures (IP Oui, alignement LE) ; aptitudes É7 À RELEVER (aucune entrée lue à la section des races — le précédent des classeurs É7 le cite aux matrices de métiers).
- GNOLL, GOBLIN, HOBGOBELIN : infravision, raiders ; en souterrain, bonus 0,5 et CCSN ½ ; en forêt épaisse, bonus 0,3 et CCSN ½ ; déplacements comme en forêt claire.
- ORC OU Uruk : infravision, raiders ; en souterrain, bonus 0,3 et CCSN ½ ; en forêt épaisse, bonus 0,1 et CCSN ½ ; déplacements comme en forêt claire.
- HOMME LÉZARD : en marais, bonus 1, CCSN 0,1, déplacement comme en forêt claire ; amphibie, PMV aquatique à la moitié du terrestre.
- SAHUAGIN : en mer, CCSN ½ et tracking 15 ; peut sortir de l'eau pour attaquer les hex côtiers ; ne remonte pas les cours d'eau non salés ; ne voit pas les NFV liés à l'eau ; pille pour 3 tours de taxation.
- MERMAN et TRITON : lignes natives à la table (merman CCSN 0,5, PMV 18 ; triton MR 90) ; aptitudes É7 à relever à la curation.
- QUICKLING : infravision, poison (+½), DISSIMULATION 15.
- CENTAURE : cavalerie légère archer ; en forêt, CCSN et coût PMV à ½, bonus 0,4.
- OGRE : raider ; CCSN ¼ en combat, alors considéré berserker.
- HIGHMAN : hybride humains-géants ; IGNORE LA PEUR ; n'utilise pas la magie (rumeur de chamans highmen) ; RÉSISTANCE À LA MAGIE 50 %, sur les sorts subis comme acceptés.
- DRIDER : infravision active, vol mono hex, poison (+½) et immunisé ; équipement des drows ; combat de jour ½ ; en souterrain, bonus 0,5, CCSN ¼, dissimulation 10, tracking 10, déplacement plaine ; en forêt épaisse, bonus 0,2, CCSN ½, dissimulation 5, tracking 5.

## 5. Les bonus aux habiletés — mécanisme sentencé et propositions (À ARBITRER)

MÉCANISME SENTENCÉ (7 novembre à la nuit) : LES BONUS RACIAUX S'AJOUTENT aux compétences, voire à la valeur de base — ILS NE REMPLACENT JAMAIS. Quatre vecteurs — le quatrième en proposition de l'auteur du 8 novembre —, tous ADDITIFS, jamais de niveau ni de pourcentage de canal :

1. MAJORATION DE LA BASE : le bonus racial élève la valeur native de l'habileté PAR ADDITION — le hobbit tente Dsv à 10 (base 5 + bonus 5), le nain tente Exm à 5 (base 0 + bonus 5, « le sang de la pierre »). La base majorée demeure un socle : elle ne remplace jamais un canal.
2. BONUS DE TERRAIN : le bonus s'ajoute à la valeur tentée dans le terrain de l'aptitude — l'elfe : +20 à Trc et Dse en forêt. Le relevé É7 en est tissé.
3. BONUS PLAT AU BE : +5 STANDARD (sentence du 8 novembre), cumulé aux bonus de caractéristiques — c'est la traduction É8 des bonus de compétences raciaux 3.5 : le +2 de la 3.5 vaut dix pour cent au dé de vingt, soit +5 sur l'échelle de centaine (l'elfe 3.5 « +2 Écoute, Fouille, Détection » ne devient pas des niveaux : il devient +5 au BE de Trc, à la lecture du MdM). Un APANAGE à +10 demeure en proposition pour la compétence signature d'une race extrême (précédent natif du quickling, +10 en discrétion).
4. VERSATILITÉ (QUATRIÈME VECTEUR — proposition de l'auteur du 8 novembre) : la race porte un PLANCHER sur toutes ses valeurs d'habiletés, Y COMPRIS LES PROFESSIONNELLES (base 0) — l'HUMAIN tente toute habileté à 2 MINIMUM (« versatilité 2 minimum de base partout »), le HIGHMAN à 5 MINIMUM (« versatilité entendue 5 minimum à tous »). Le plancher ne remplace jamais : la valeur la plus haute — canal ou base majorée — garde la main ; il rend seulement l'habileté tentable en dessous de tout canal. C'est la traduction É8 de la souplesse humaine de la 3.5 (les points de compétence supplémentaires deviennent un plancher universel). Ce vecteur conforte la proposition du PLANCHER de la base, déjà ouverte au calibrage.

CONVENTION DE LECTURE des valeurs natives É7 : une valeur native de la section 4 se lit comme une VALEUR ATTEINTE (base É8 + bonus racial) — le BONUS RACIAL en est la différence avec la base : elfe +20 en forêt (25 − 5) ; elfe aquatique +15 en mer (20 − 5) ; drow +10 en souterrain (15 − 5) et +5 en forêt épaisse (10 − 5) ; hobbit +5 sans condition (10 − 5) ; quickling +10 (15 − 5) ; sahuagin +10 en mer (15 − 5) ; drider +5 en souterrain (10 − 5) — la valeur 5 du drider en forêt épaisse EST la base : aucune aptitude d'habileté ne s'y attache.

PROPOSITION D'APPLICATION AU FORMÉ (arbitrage attendu) : le bonus racial s'ajoute à la valeur tentée, formée ou non — le hobbit voleur (Dsv 17 au canal) tente à 22 ; le bonus se lit comme un bonus de caractéristique permanent.

Garde-fous : la race ne donne JAMAIS de niveau, de pourcentage de canal ni de point d'habileté — la formation seule paie la progression ; un bonus racial se prend UNE SEULE FOIS, quelle que soit la voie qui le donne (règle de cumul déjà écrite) ; la majoration de base ne remplace pas le canal : le formé garde sa valeur pleine, le bonus s'y ajoute.

### Propositions par race (l'assistant propose, l'auteur arbitre)


| Race                                         | Bonus proposé                                                                                                                     | Statut            |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Humain                                       | VERSATILITÉ : 2 minimum de base partout, y compris les professionnelles (vecteur 4 — l'humain tente un peu de tout)               | VALIDER           |
| Elfe                                         | +20 à Trc/Dse en forêt (valeur native 25 conservée) ; aucun bonus permanent                                                       | VALIDER           |
| Elfe aquatique                               | +15 à Dsv/Trc en mer (valeur native 20 conservée)                                                                                 | VALIDER           |
| Nain                                         | Exm majorée à 5 natif (base 0 + 5, « le sang de la pierre ») ; +5 BE sur Exm et Frg                                               | VALIDER (maj appliquée) |
| Gnome                                        | +5 BE sur Frg ; +10 BE sur Alc — APANAGE : l'ALCHIMIE, habileté nouvelle proposée à la grille, canal propre de l'alchimiste (Al) | VALIDER (maj appliquée) |
| Hobbit                                       | Dsv majorée à 10 natif (base 5 + 5, conservé É7) ; +5 BE sur Vol                                                                  | VALIDER           |
| Demi-elfe                                    | infravision seule (conservée É7) ; +5 BE sur Trc, Dse et Dsv — les sens de l'entre-deux                                          | VALIDER (maj appliquée) |
| Demi-orque                                   | Itd majorée à 10 natif (base 5 + 5, la férocité)                                                                                  | VALIDER           |
| Drow                                         | +10 à Dsv/Trc en souterrain, +5 en forêt épaisse (natif É7 conservé) ; +5 BE sur Sed et Ass (l'aristocratie et politique cruelle) | VALIDER (maj appliquée) |
| Nain gris                                    | à la curation (relevé d'aptitudes d'abord)                                                                                        | À RELEVER         |
| Hobgobelin, uruk, gnoll                      | Itd majorée à 15 natif (base 5 + 10, l'APANAGE de la menace — la discipline du raider)                                            | VALIDER           |
| Orc, goblin, kobold                          | Itd majorée à 10 natif (base 5 + 5, la piétaille de la menace)                                                                   | VALIDER           |
| Homme lézard                                 | aucune (le terrain paie déjà : marais)                                                                                            | VALIDER           |
| Sahuagin                                     | +10 à Trc en mer (valeur native 15 conservée)                                                                                     | VALIDER           |
| Triton, merman                               | aucune en v0.2, à la curation                                                                                                     | À PROPOSER        |
| Quickling                                    | Dsv majorée à 15 natif (base 5 + 10, conservé É7)                                                                                 | VALIDER           |
| Centaure                                     | à la curation (le terrain paie : forêt)                                                                                           | VALIDER           |
| Ogre                                         | Itd majorée à 10 natif (base 5 + 5, la stature)                                                                                   | VALIDER           |
| Highman                                      | VERSATILITÉ étendue : 5 minimum à toutes les habiletés (vecteur 4) ; Itd majorée à 10 natif (base 5 + 5, la lignée des géants)   | VALIDER           |
| Drider                                       | +5 à Dsv/Trc en souterrain (natif É7 conservé) ; RIEN en forêt épaisse (la valeur 5 EST la base)                                  | VALIDER           |


La question de l'humain 3.5 (don au départ, points de compétence supplémentaires) reçoit la réponse de l'auteur (8 novembre) : LA VERSATILITÉ — 2 minimum de base partout, y compris les professionnelles ; c'est la traduction É8 de la souplesse humaine de la 3.5 (les points de compétence supplémentaires deviennent un plancher universel), qui supplante la proposition « aucune aptitude mécanique » de l'assistant. Le don au départ demeure non transposé. L'humain reste l'ancre du pipeline et devient l'ancre tentante : toutes les professions et cultures lui restent ouvertes — la race des empires de la carte — et désormais il tente un peu de tout. La colonne Statut porte la main de l'auteur : VALIDER (sentence attendue sur sa passe de validation) ; VALIDER (maj appliquée) (mise en forme intégrée ce jour) ; À RELEVER ; À PROPOSER.

## 6. La base de données — sentences et schéma v0.1

SENTENCE (7 novembre au soir) : SQLite dans les applications dédiées (MdM et joueur — hors ligne, un fichier par partie, léger, embarquable) ; PostgreSQL au portail central (multi-joueurs, synchronisation, historique des tours) ; le schéma est versionné au dépôt avec des migrations numérotées, à la manière des suites du journal. La fiche des races est la première entité peuplée : le banc d'essai vivant du modèle, avant les métiers, les habiletés, les unités et les sorts.

Schéma v0.1 proposé (PROPOSITION — dérivé de la présente fiche, à valider avant migration) :

- table RACES : id, nom, sigle, categorie (T1/T2), nh\_natif, tc, pp, rp, pst\_base, pmv\_base, edt\_indicatif, mr, alignement, ajust\_for, ajust\_dex, ajust\_con, ajust\_int, ajust\_sag, ajust\_cha (entiers 3.5), sources.
- table RACE\_APTITUDES : id, race\_id (clé), nom, vecteur (valeur\_native / valeur\_terrain / bonus\_be / regle), habileté (clé vers le référentiel des habiletés), valeur, terrain (nullable), effet (texte), statut (SENTENCE / PROPOSITION / CONSERVÉ).
- table HABILETES (référentiel, déjà arbitré à la grille) et table CARACTERISTIQUES (référentiel) : les clés de jointure.
- L'entité leader (maquette v16) pointera la race par clé ; Kaelen teste le chemin complet : humain (ancre) → ajustements nuls → BE inchangés.

## 7. Points d'arbitrage ouverts

1. Ajustements Monster Manual 3.5 des races hors PHB — relevé au MM de la bibliothèque (chantier suivant, indicatifs posés en section 2).
2. Demi-orque, elfe aquatique, hobgobelin : à inscrire à la table des créatures (aucune ligne native relevée).
3. Nain gris : aptitudes É7 à relever (les classeurs É7 le citent aux matrices de métiers — « le niveau paie au NH, précédents drow et duergar »).
4. L'humain 3.5 — RÉPONDU PAR LA PROPOSITION DE L'AUTEUR (8 novembre) : la VERSATILITÉ, plancher de 2 partout (traduction des points de compétence 3.5) ; le don au départ demeure non transposé ; sentence attendue sur la passe de validation.
5. Les propositions de bonus d'habiletés de la section 5 — arbitrage ligne par ligne ; la main de l'auteur du 8 novembre a déjà tranché en partie (colonne Statut).
6. Le PLANCHER de la base (déjà ouvert au fichier de calibrage) — tranche la majoration de base des canaux faibles (nain : base 0 + 5 sur Exm) ; la VERSATILITÉ (vecteur 4) conforte la proposition « la base est un minimum ».
7. Ajustements É8 naturels des races sans contrepartie 3.5 (highman) et des races de créature (ogre, centaure, drider, quickling).
8. Le bestiaire séparé (montures, bêtes, monstres) — chantier futur, hors périmètre de la présente fiche.
9. La classe favorite 3.5 — non transposée (aucune pénalité d'expérience multiclassée en É8) ; à lire comme repère de culture raciale à la curation.
10. ALCHIMIE (Alc) — septième habileté nouvelle proposée de la main de l'auteur (8 novembre ; +10 BE d'apanage du gnome) ; canal propre de l'alchimiste (Al) ; inscription à la grille des métiers en proposition, sentence attendue.
