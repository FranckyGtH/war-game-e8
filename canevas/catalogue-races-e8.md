---
name: "catalogue-races-e8"
title: "Catalogue des races et créatures (Édition 8), v0.4"
type: "text/markdown"
---

# Catalogue des races et créatures — Édition 8, v0.4 (référentiel D&D 3.5, 27 octobre 2026)

Chantier ouvert le 27 octobre 2026 sur arbitrage de Francky. Mission : donner à chaque espèce une entrée complète, respectant la hiérarchie de puissance du monde (un dragon domine un humain, un loup sanguinaire domine un loup) — l'équilibre relatif, non l'aplatissement. Valeurs de référence : classeur É7 « Calcul des PF des unités » et calibrage humain-cheval (écarts nuls).

## Schéma d'une entrée de race

| Champ | Contenu | Source ou règle |
| --- | --- | --- |
| Identité | nom, catégorie (standard, monture, conjurable, majeure), alignement (gouverne D(nature) de l'EDT) | relevé des capacités |
| Biologie | PP, TC, NH de l'espèce, herbivore (PV ×2), mort-vivant (facteur 1,8) | pipeline calé |
| PV individuel | 10 × TC³ | calage v0.5, écarts nuls |
| PF individuel | 1,667 × PP × TC² × (1 + NH/5) — la qualité du lot (QE) s'applique au lot, pas à l'individu | pipeline |
| Armure naturelle | équivalent d'un type porté (légère, moyenne, lourde) avec une qualité par espèce | chantier armes-armures v0.6 |
| Armes naturelles | équivalents de classes de poids (légère, moyenne, lourde) avec une qualité par espèce ; le souffle des majeures = siège naturelle | chantier armes-armures v0.6 |
| Résistances | grade de poison, valeurs d'immunité totale (base), MR, grade de tournement | matrices graduées |
| Capacités raciales | features du relevé (vision dans les ténèbres, dissimulation, vol, régénération...) | relevé 8.1.3 |
| Magie | NM (m(NM) = 1 + 0,8 NM), NE (feature si supérieure à 1) | table magie calée |
| Mort-vivant | pas de blessés, PV dérivés, vulnérabilité au tournement | modèle morts/blessés |
| Mouvement | PMV, milieux naturels (CCSN) | relais chantier mouvement |
| Économie | coût d'entretien, remontage si monture | relais chantier économie |

## Table des créatures — valeurs calées

| Créature | TC | NH | PP | PV | PF | Observations |
| --- | --- | --- | --- | --- | --- | --- |
| Humain | 1,0 | 0 | 1,00 | 10 | 1,667 | ancre du pipeline ; aucune armure naturelle |
| Haut-elfe | 0,8435 | 0,5 | 1,35 | 6 | 1,763 | supériorité raciale arbitrée (Francky : les elfes sont supérieurs aux humains au niveau race) — mécanisme : PP racial elfique 1,35, le NH = CR restant strict ; infravision |
| Elfe sylvain (des bois) | 0,8435 | 0,5 | 1,45 | 6 | 1,893 | +2 Force (fiche : plus musclée) → PP 1,45 ; rôdeuse des forêts primaires |
| Elfe sauvage | 0,8435 | 0,5 | 1,45 | 6 | 1,893 | forestière farouche, +2 Force (fiche) |
| Elfe grise | 0,8435 | 0,5 | 1,35 | 6 | 1,763 | la plus noble (fiche) ; sa marge arcane relève du NM — relais chantier magie |
| Drow | 0,8435 | 1 | 1,35 | 6 | 1,924 | CR 1 (règle de fiche : CR = niveau de personnage) → NH 1 ; arsenal : vision dans le noir, venin, résistance à la magie, sorts innés — capacités, non PF |
| Demi-elfe | 1,0 | 0,5 | 0,95 | 10 | 1,742 | masse humaine (PV 10), sang elfique dilué → PP 0,95 (grâce atténuée) ; arbitrage Francky : PF calé entre l'humain (1,667) et la moyenne des elfes hors drow (1,828) |
| Nain (de la montagne) | 1,0 | 0,5 | 1,10 | 10 | 2,017 | Peuple ancien ; masse humaine PV 10 (É7 et fiche concordent : le nain pèse un humain adulte) ; NH = CR 1/2 (l'exception É7 « NH 3 » s'efface, comme pour l'elfe) ; PP racial 1,10 « robustesse légendaire » (arbitrage Francky, option 2) — au-dessus de toutes les sous-races elfiques ; traits raciaux (vision noire 60 pi, stabilité, +2 poison et sorts, +1 orques/gobelinoides, esquive +4 contre les géants, sens de la pierre) → capacités et NM, relais relevé ; PMV réduit (vitesse 20 pi ; É7 : PMV 6 contre 12 à l'humain) — relais chantier mouvement |
| Nain gris (duergar) | 1,0 | 1 | 1,10 | 10 | 2,200 | CR = niveau de personnage (règle de fiche, celle du drow) → NH 1 ; masse naine PV 10 (É7 : nain gris masse 10) ; PP 1,10 du sang nain ; arsenal (invisibilité et grandir 1/jour, immunités paralysie/phantasmes/poison, vision noire 120 pi) → capacités et NM, traitement drow ; sensibilité à la lumière |
| Hobbit (pieds légers) | 0,7368 | 0,5 | 1,00 | 4 | 0,995 | PV = masse É7 4 (la fiche du guerrier 3.5 donne 5 PV, non retenue — convention des races civilisées, précédent nain) ; PP 1,00 : l'É8 reproduit la Force É7 au millième près (0,9958) ; traits (chanceux : +1 à tous les jets, +2 contre la peur, agilité, petite taille) → capacités ; créature paisible : D(nature) plafonné à 0 (arbitré) |
| Gnome (des rochers) | 0,5848 | 0,5 | 1,00 | 2 | 0,628 | PV = masse É7 2 (fiche du guerrier : 6 PV, non retenue — convention des races) ; PP 1,00 (reproduit l'É7 à 0,05 % près : Force 0,5704 à NH 0) ; sa force vit dans l'illusion et l'ingénierie → NM/capacités ; résistance aux illusions (+2), vision nocturne, +1 contre kobolds/gobelinoides/orques/reptiloïdes (gnome des forêts) → capacités ; consigné : PF sous le kobold (0,719), comme en É7 — le gnome paisible contre le kobold guerrier-né |
| Kobold | 0,585 | 0,25 | 1,20 | 2 | 0,719 | NH = CR 1/4 (aligné, arbitré) |
| Gobelin | 0,7368 | 0,33 | 1,20 | 4 | 1,158 | PV = masse É7 4 (fiche du guerrier : 5 PV, non retenue — convention des races) ; calé sur le hobbit à gabarit égal (Str 11, Dex 13 à la fiche) ; PP 1,20 ré-arbitré (27 au soir) : la ligne É7 retrouvée (Goblin NH 1,0, Force 1,304) porte un PP 1,2 de guerrier-né, repris par l'É8 — le gobelin repasse au-dessus du hobbit, ordre É7 restauré ; vision noire 60 pi → capacité ; troupe A/E (table des natures) |
| Hobgobelin | 1,0000 | 0,5 | 1,00 | 10 | 1,834 | PV = 10 (pas de ligne É7 — calé sur l'humain à gabarit égal, précédent gobelin/hobbit ; fiche du guerrier 1d8+2 = 6 PV, non retenue) ; NH 0,5 (CR 1/2) ; PP 1,00 (famille humanoïde, arbitrage Francky : le don racial net +2 Dex/+2 Con — supérieur au don nain — et la discipline passent en capacités) ; vision noire 60 pi, +4 discrétion → capacités ; haine des elfes, discipline militaire → postures/doctrines (relais Complete Warrior) ; au-dessus de l'humain par le seul NH — le soldat-né contre le civil |
| Loup | 1,0914 | 1 | 1,20 | 13 | 2,86 | PV recalés sur la fiche 3.5 (arbitrage final ; É7 donnait 7) ; CR 1 → niveau 6, qualité A ; armure naturelle légère B (fiche +2) ; croc = arme légère B ; trip |
| Worg | 1,4422 | 2 | 1,20 | 30 | 5,83 | adopté (arbitrage) avec ses variantes ; CR 2 → niveau 7, qualité B ; Int 6 ; monture des gobelins (fiche) ; armure légère B (fiche +2) |
| Worg noir | 1,4422 | 2 | 1,20 | 30 | 5,83 | variante (arbitrage) : dissimulation accrue (roublardise plutôt que force) — capacité raciale à préciser au relevé |
| Worg de guerre | 1,4422 | 3 | 1,20 | 30 | 7,28 | variante (arbitrage) : entraîné à la bataille, porte l'armure et le harnais de cavalerie gobeline ; NH 3 (exception dressage +1, arbitrée) |
| Loup sanguinaire (loup d'hiver) | 1,7213 | 5 | 1,20 | 51 | 11,85 | CR 5 → niveau 10, qualité B ; Large, 450 livres ; armure naturelle moyenne D (fiche +5) ; croc = arme moyenne C + froid (1d6) ; souffle de froid 15 pieds (cône) ; immunité au froid, vulnérabilité au feu |
| Lézard géant | 1,4423 | 2 | 1,20 | 30 | 5,826 | NH 2 par analogie au varan (dossier MdM, arbitré : aucun gabarit exact au bestiaire) |
| Homme lézard | 1,1935 | 1 | 1,20 | 17 | 3,42 | NH = CR 1 (aligné, arbitré) |
| Centaure | 1,5874 | 3 | 1,20 | 40 | 8,07 | NH = CR 3 (aligné, arbitré) ; race cavalière (pas de composant monture) |
| Aigle géant | 1,5183 | 3 | 1,20 | 35 | 7,38 | NH = CR 3 (aligné, arbitré) ; cavalerie légère aérienne |
| Cheval | 1,71 | 0,13 | 1,00 | 50 | 5,0 | monture ; armure naturelle : légère C (proposition) |
| Cheval squelette | 1,71 | 0,13 | ×1,8 | 40 | — | mort-vivant : PV sans les droits herbivores |
| Griffon | 1,8070 | 4 | 1,20 | 59 | 11,76 | PV recalés sur la fiche 3.5 (arbitrage final ; É7 donnait TC 2,0/PV 80/PF 14,40) ; NH 4 = CR 4, règle confirmée ; CR 4 → niveau 9, qualité B ; part monture 87,6 % (à propager aux profils de référence) ; armure naturelle légère E (fiche +6) ; crocs = arme moyenne C ; pounce/rake ; préfère la chair de cheval (fiche) |
| Licorne | 1,6134 | 3 | 1,00 | 42 | 6,94 | CR 3 → niveau 8, qualité B ; armure naturelle légère E (fiche +6) ; corne = arme moyenne C + magie +3 (corne +3 en 3.5) ; immunité poison/charme/compulsion ; soins par la corne (chantier magie) ; refus de la monte, hors maiden |
| Eléphant | 2,15 | 7 | 1,644 | 100 | 30,4 | NH = CR 7 (aligné, arbitré) ; PF recalculé au pipeline (40,5 en NH É7) ; la table É7 portait 75 — écart consigné, équilibrage absolu différé |
| Ent (treant standard) | 1,8758 | 8 | 1,30 | 66 | 19,8 | PV fiche (7d8+35) ; dossier résolu par arbitrage : le treant standard et l'ent vénérable É7 (270 PV) sont deux spécimens — grille d'âge MdM par progression 8-21 DV (Savage Species) ; PP 1,30 « muscle ligneux » (familles É8, arbitré) ; anime les arbres, RD 10/tranchant, vulnérabilité au feu, piétinement → capacités |
| Géant de pierre | 2,2831 | 8 | 1,20 | 119 | 27,1 | PV fiche (14d8+56) ; PP 1,20 (famille supra-humanoïde, arbitré) ; PF É7 75 consigné ; armure naturelle fiche +11 (relais chantier armes-armures) ; lance des rochers, attrape-rochers → capacités |
| Géant des tempêtes | 2,7099 | 13 | 1,20 | 199 | 48,5 | PV fiche (19d8+114) ; PP 1,20 ; h(NH) 3,3 (plafond au-delà de 10) ; armure naturelle fiche +12 (relais chantier armes-armures) ; SLA et immunité à l'électricité → NM/capacités ; PF É7 170 consigné |
| Géant du feu | 2,4216 | 10 | 1,20 | 142 | 35,2 | CORRECTION : fiche CR 10 — l'entrée « 13 » de l'audit matinale provenait d'une erreur de lecture de la table classée ; l'écart É7 avec les tempêtes (16 contre 19) survit par la fiche (10 contre 13) ; PV fiche (15d8+75) ; PP 1,20 ; EDT 1,2 (LM matériel) conservé ; immunité au feu, vulnérabilité au froid → capacités ; PF É7 120 consigné |
| Béahir | 2,1105 | 8 | 1,20 | 94 | 23,2 | PV fiche (9d10+45) ; PP 1,20 (prédateur) ; le PF É7 de 1 000 est retiré comme artefact de table (écart consigné) ; souffle électricité 1 PMR/10 PF, peur 20 %, constriction, avalement, immunité à l'électricité → capacités |
| Elémentaire de terre (grand) | 1,9661 | 5 | 1,20 | 76 | 15,5 | PV fiche (76 ≈ 80 du gabarit É7) ; PP 1,20 ; NM 4 conservé mais reporté à l'étage unité et au chantier magie (précédent licorne/drow — hors PF de base) ; PF É7 340 consigné (il embarquait QE 2,0) |
| Djinn | 1,6510 | 5 | 1,00 | 45 | 9,1 | PV fiche (7d8+14) ; forme humanoïde → PP 1,00 (familles É8) ; NM 2 à l'étage unité ; tourbillon, maîtrise de l'air, plane shift, immunité à l'acide → capacités ; PF É7 95,09 consigné |
| Ki-rin | 2,327 | 18 | 1,20 | 126 | 41,2 | Fiche Oriental Adventures (3.0, troisième ajout du 27 au soir) : bête magique Enorme, 12d10+60 = 126 PV, CR 18 — fiche acceptée par arbitrage (NH 18 = CR strict) ; PV fiche (l'É7 portait 80) ; PP 1,20 pré-inscrit confirmé (familles É8 — l'É7 avait 1,083) ; ensorcellement niveau 18, sorts, télépathie, détection des pensées, RM 28 → NM/capacités (hors PF, précédents licorne et djinn) ; PF 41,2 — entre tempêtes (48,5) et golem fer (36,7) ; point mou consigné : le CR 18 est magique, la masse (126 PV) est sous-pondérée pour son band — cas extrême du précédent djinn ; LB, EDT 1,5 (É7) |
| Golem de chair | 1,9916 | 0 | 4 | 79 | 26,4 | CR 7 ; PV fiche (9d10+30) ; PP 4 maintenu (construct, exception NH 0) ; berserk, RD 5/adamantine, immunité à la magie → capacités ; qualité du créateur, aucune évolution (règle adoptée) |
| Golem d'argile | 2,0801 | 0 | 4 | 90 | 28,9 | CR 10 (ajouté à la triade de l'audit : la fiche complète la famille) ; PV fiche (11d10+30) ; berserk, plaie maudite, hâte 1 jour/mois → capacités |
| Golem de pierre | 2,2036 | 0 | 4 | 107 | 32,4 | CR 11 ; PV fiche (14d10+30) ; lenteur 1 jour/4 tours → capacité ; greater stone golem repéré (CR 16, 271 PV) — futur dossier MdM |
| Golem de fer | 2,3453 | 0 | 4 | 129 | 36,7 | CR 13 ; PV fiche (18d10+30) ; souffle poison (relais chantier souffle), RD 15/adamantine → capacités ; le PF É7 unique de 800 est réparti par type, écart consigné |
| Squelette | 0,8434 | 1 | ×1,8 | 6 | 2,56 | mort-vivant ; PV recalés sur la fiche 3.5 (guerrier humain 1d12 = 6 PV ; arbitrage final, la dérivation 0,8 est abandonnée) ; CR 1/3 → niveau 5,3, qualité A ; armure légère B (fiche +2 naturelle) ; propagation conjurations : 100 PMB qualité C ≈ 5 200 squelettes (au lieu de 3 704) |
| Highman | 1,0 | 0 | 1,045 | 10 | 1,742 | Humain supérieur (arbitrage Francky, création MdM sans fiche) : PV = masse humaine 10 ; PF calé sur le demi-elfe (1,742), mais l'anatomie diffère — la marge vit dans le sang (PP racial 1,045), le NH reste à l'ancre humaine 0 : le highman de base est un civil, son expérience vit dans le QE du lot comme l'humain ; sans les capacités du sang elfique ; prédisposition à la magie par le sang (arbitrage Francky) → capacité de race de canal magique, payeur NM (hors PF, précédents elfe grise et drow), effet à chiffrer au chantier magie ; autres capacités propres à définir (dossier MdM, à trouver) ; É7 consigné (NH 10, TC 1,5183, PV 35, Force 20) — recalage complet au pipeline |
| Dragon (rouge adulte) | 2,9357 | 14 | 1,50 | 253 | 73,3 | PV recalé sur la fiche (22d12+110 — l'ancien 241 provenait du TC 2,89 de l'É7) ; PP 1,50 « la marge du roi » (arbitrage) ; première application du plafond h(NH) au-delà de 10 : h = 3,4 ; CR 14 → niveau 19, qualité D ; armure naturelle lourde F confirmée (fiche : +21 naturelle à l'âge adulte, au-delà du plafond 12 — l'écart passe par la magie draconique, chantier armes-armures) ; souffle : cône de feu natif (très vieux : 18d10 — le bonus de siège naturelle se cale par catégorie d'âge, relais chantier souffle) ; grille d'âges complète : CA naturelle +6 (nouveau-né) à +39 (grand wyrm) |

## Hiérarchie de puissance — contrôles de cohérence à maintenir

1. Dragon > géant > béahir > griffon > cheval > humain > kobold : le pipeline doit ordonner chaque couple dans le bon sens (la mission d'équilibre relatif de Francky).
2. Loup sanguinaire > loup : les variantes « améliorées » d'une même espèce se calent par le NH et les armes naturelles, non par un gonflement du TC.
3. Masse et puissance indépendantes : la masse (TC³) protège (PV), la puissance (PP, NH) tue ; un éléphant massif mais peu habile doit survivre longtemps en tuant médiocrement.
4. Montures : part monture d'un lot = rapport de puissance (PF monture / PF cavalier) ; contrôle du seuil de dégradation couple par couple.

## Points ouverts du catalogue

1. Calages du jour : arbitrés (voir « Arbitrages rendus ») — PV É7 conservés, NH = CR, armures adoptées, worg et variantes admis. Audit du soir : alignement strict, exceptions et table départ/plafond adoptés.
2. Réalisé : audit NH = CR sur l'ensemble des espèces (voir la section dédiée). Catalogue clos le 27 octobre au soir : lézard géant arbitré (NH 2 par analogie au varan), ki-rin inscrit sur la fiche Oriental Adventures, highman inscrit par création MdM — restent en enrichissement : capacités propres du highman, greater stone golem (CR 16, 271 PV), goliath, races orientales, grilles d'âge de l'ent et du dragon.
3. Armures et armes naturelles restantes : rhinocéros (écart de fiche +7 contre moyenne D), grades de poison par espèce (araignée, scorpions, serpents — relais relevé des capacités).
4. Valeurs de base d'immunité totale par espèce et effet.
5. Capacités raciales à attacher : vision dans les ténèbres (elfe, gobelin, demi-elfe, drow, duergar, hobgobelin), vision noire et stabilité (nain, duergar), +4 discrétion et discipline militaire du hobgobelin (→ postures/doctrines), chance du hobbit (+1 à tous les jets, +2 contre la peur), illusions du gnome, dissimulation (worg noir), vol (aigle géant), régénération (troll à créer), prédisposition magique du highman (le sang, canal magique — payeur NM, effet au chantier magie ; autres capacités propres du highman à trouver), etc.
6. Liste des espèces invocables (gabarits de conjuration) et des espèces montures (composant monture — le worg de guerre y entre).
7. PP de la haute gamme arbitrés le 27 au soir (familles É8 : dragon 1,50, prédateurs et gabarits supra-humanoïdes 1,20, ent 1,30, djinn 1,00, golems 4) ; restent : capacités magiques de la licorne (soins par la corne, téléportation) au chantier magie.

## Arbitrages rendus par Francky le 27 octobre 2026 (fin de session, révisé après relecture)

1. PV (arbitrage révisé après relecture) : recalage complet sur les fiches 3.5 — griffon PV 59 (TC 1,807, PF 11,76, part monture 87,6 %), loup PV 13 (TC 1,091, PF 2,86), squelette PV 6 (TC 0,843, PF 2,56 ; conjurations 100 PMB ≈ 5 200 squelettes). Les valeurs É7 (80/7/8) restent consignées comme écarts de contrôle. Motif retenu : la méthode « PV = points de vie de la fiche » est déjà celle du dragon et du loup sinistre ; conserver les valeurs É7 pour le loup mais pas pour le loup sanguinaire aurait fait vivre la même famille sur deux échelles. Propagations à mener : profils de référence (compagnie de griffons) et spécification de l'outil (décompte de conjuration).
2. Règle générale adoptée : NH d'une espèce = CR de sa fiche 3.5, sans marge systématique. Le griffon (4 = 4) en est la validation directe. Application immédiate : loup 1, worg 2, licorne 3, loup sanguinaire 5. Audit à mener : les NH recalculés É7 des espèces déjà cataloguées (éléphant 11 contre CR 7, béahir 12 contre CR 8, géant des tempêtes 19 contre CR 13, géant de pierre 10 contre CR 8, élémentaire de terre) devront être passés sous la règle ou recevoir une exception motivée — chantier suivant.
3. Armures et armes naturelles : adoptées telles quelles — loup/worg/squelette légère B, loup sanguinaire moyenne D, griffon/licorne légère E, dragon lourde F ; corne de licorne moyenne C + magie +3 (la fiche elle-même la décrit comme arme magique +3). Le rhinocéros reste moyenne D pour l'instant, l'écart de fiche (+7) restant consigné.
4. Worg : adopté au catalogue, avec variantes — worg noir (dissimulation) et worg de guerre (monture de cavalerie gobeline dressée, porte armure et harnais ; NH 3 proposé).

## Calages du 27 octobre 2026 — fiches 3.5 passées au pipeline

Méthode (arbitrée) : PV É8 = points de vie de la fiche 3.5 ; TC = racine cubique de PV/10 ; CR → niveau É8 = CR + 5 et qualité par la table A-F ; le bonus d'armure naturelle de la fiche se projette sur la table d'absorption du chantier armes-armures (valeur la plus proche).

| Espèce | Fiche 3.5 | PV 3.5 | TC É8 | CR → niveau, qualité | Armure naturelle fiche → É8 | NH proposé (= CR) | PF individuel |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Loup | wolf | 13 | 1,0914 | 1 → 6, A | +2 → légère B | 1 | 2,86 |
| Worg | worg | 30 | 1,4422 | 2 → 7, B | +2 → légère B | 2 | 5,83 |
| Loup sanguinaire | winter wolf | 51 | 1,7213 | 5 → 10, B | +5 → moyenne D | 5 | 11,85 |
| Licorne | unicorn | 42 | 1,6134 | 3 → 8, B | +6 → légère E | 3 | 6,94 |
| Griffon | griffon | 59 | 1,8070 | 4 → 9, B | +6 → légère E | 4 (hyp. É7 confirmée) | 11,76 |
| Squelette | human warrior skeleton | 6 | 0,8434 | 1/3 → 5,3, A | +2 → légère B | 1 (É7) | 2,56 |
| Dragon rouge adulte | adult red | 253 | 2,9357 | 14 → 19, D | +21 → lourde F (plafond 12) | 14 | 73,3 (PP 1,50 arbitré, h plafonné 3,4) |

Contrôles de hiérarchie (tous vérifiés) : griffon (11,76) > cheval (5,0) > humain (1,667) ; loup sanguinaire (11,85) > worg (5,83) > loup (2,86) ; loup sinistre (45 PV) = 3,5 loups (13 PV), conforme au ratio 3.5 ; masse licorne (1,61) < cheval (1,71), conforme (1 200 contre 2 000 livres) ; races de peau : nain gris (2,200) > nain (2,017) > drow (1,924) > sylvain/sauvage (1,893) > hobgobelin (1,834) > haut-elfe/grise (1,763) > demi-elfe = highman (1,742) > humain (1,667) ; petits peuples : humain (1,667) > gobelin (1,158) > hobbit (0,995) > kobold (0,719) > gnome (0,628) ; haute gamme : dragon (73,3) > tempêtes (48,5) > ki-rin (41,2) > golem fer (36,7) > géant feu (35,2) > golem pierre (32,4) > géant pierre (27,1) > béahir (23,2) > ent (19,8) > griffon (11,76).

Observations de calibrage : la règle NH proposé = CR croise l'hypothèse É7 du griffon (4 = 4) et confirme les NH recalculés É7 en ordre de grandeur (écarts constatés de moins deux à plus six : ent 9 = CR 9 exact, béahir 12 contre CR 8, géant des tempêtes 19 contre CR 13) — la corrélation valide l'échelle, le MdM garde une marge d'ajustement de plus ou moins deux par espèce selon la ruse (Int de la fiche) et l'entraînement. La part monture du griffon passe de 89,6 à 87,6 pour cent avec le recalage PV ; le décompte de conjuration des squelettes (100 PMB qualité C) passe de 3 704 à environ 5 200 individus. Le souffle du loup d'hiver (cône de froid 4d6) et le croc glacé (+1d6) se calent au chantier souffle et aux armes élémentaires ; le dragon adulte confirme la proposition lourde F, son bonus de fiche (+21) dépassant le plafond d'absorption (12) — l'écart relève de la magie draconique, en écho à la règle d'annulation niveau pour niveau du chantier armes-armures.
## Référentiel D&D 3.5 — arbitré le 27 octobre 2026

Bibliothèque de référence (documents fournis par Francky) : Monster Manual 3.5 (bestiaire de base, classement par CR) ; Monster Manual II ; Monsters of Faerûn ; Draconomicon (dragons, montures et capacité de portage) ; Libris Mortis (morts-vivants) ; Deities and Demigods (rangs divins) ; Elder Evils (menaces majeures) ; Races of Eberron.

### Correspondance qualité ↔ challenge rating

Règle proposée : niveau É8 d'une créature = CR 3.5 + 5.

| Qualité | Niveau É8 (NH) | CR 3.5 | Ancres du bestiaire |
| --- | --- | --- | --- |
| A | 5 | 1/2 à 1 | goblin, orc, loup |
| B | 10 | 2 à 5 | ogre, loup sinistre (3), loup d'hiver (5) |
| C | 15 | 6 à 10 | troll (7), géant de pierre (8), jeune dragon |
| D | 20 | 11 à 16 | géant du feu (13), dragon adulte |
| E | 25 | 17 à 21 | diable de la fosse (20), balor (20), très vieux dragon |
| F | 30 | 22 à 26+ | tarrasque (25), dragon rouge suprême (26) |

### Correspondance de l'échelle divine (Deities and Demigods)

Échelle divine É8 (Francky) : niveau supérieur à 50 = demi-dieu ; 100 = dieu majeur d'un panthéon. Référentiel D&D : rangs divins de 0 à 20 (demi-dieu rang 1 à 4, intermédiaire 11 à 15, suprême 19 à 20). Règle proposée : niveau divin É8 = 50 + 2,5 × rang divin — rang 1 (demi-dieu) à 52,5, rang 20 (dieu suprême) à 100. Les niveaux 31 à 49 couvrent l'épique mortel (Epic Level Handbook), hors bestiaire.

### Ancrage des PV sur les points de vie du bestiaire

Validation : le loup sinistre 3.5 (800 livres, 45 PV) et notre formule PV = 10 × TC³ au rapport de masse donnent 44 — écart de 2 pour cent. Méthode retenue : les PV de la fiche 3.5 fournissent la masse relative, donc le TC (TC = racine cubique de PV/10), donc le PV É8 et ses registres dérivés. Exemples : dragon rouge adulte (241 PV) → TC 2,89 → PV 241 É8 ; le dragon est calé. Attention : le bestiaire sert de référence de masse et de niveau, non de calque — les capacités É8 demeurent les nôtres.

### Usages spécialisés

- Libris Mortis : référence pour les morts-vivants (PV du squelette à confirmer, capacités, variantes — soldat squelette).
- Draconomicon : référentiel complet des dragons par catégorie d'âge, montures draconiques, capacité de portage (relais composant monture).
- Monsters of Faerûn et Monster Manual II : extension du catalogue aux créatures additionnelles des mondes de jeu.
- Elder Evils : référentiel des menaces divines majeures (niveaux 50+).
### Heroes of Battle (ajouté à la bibliothèque le 27 octobre 2026)

Le supplément de guerre D&D 3.5 fournit quatre récoltes : ses conditions de moral (normal, secoué, effrayé, paniqué — et enragé sur un 1 naturel au test de panique) valident indépendamment nos états de moral É8 (Tenace à En déroute) et précisent un seuil de test à 50 pour cent de pertes pour les groupes ; son test de ralliement (D20 + Charisme + rating de commandement) suggère la règle de remontée d'un état de moral par le leader — écho direct de notre D(commandement) et des features de leader ; ses auras de commandement (prérequis de rang et d'alignement) sont l'exacte architecture de nos features de leader en packages ; ses points de victoire et points de manœuvre fournissent un référentiel de scored'issue de bataille (relais portail MdM et expérience de mission). Ses appendices offrent les gabarits de soldats par niveau (Appendice II — calibrage des qualités A-F des troupes) et six montures de guerre exotiques (Appendice III — calibrage du composant monture : destrier, warg, griffon). Son chapitre Magie de la guerre (animate legion, sorts de siège et d'artillerie) relève du chantier magie.
## Audit NH = CR de l'ensemble des espèces (27 octobre 2026 — arbitré : alignement strict adopté)

Arbitrage rendu par Francky le 27 octobre au soir : alignement strict des NH sur le CR de la fiche (elfe 0,5, kobold 0,25, homme lézard 1, centaure 3, aigle géant 3, lézard géant 2, ent 8, éléphant 7, béahir 8, géants de pierre 8 et des tempêtes 13, élémentaire de terre 5) ; les cinq exceptions motivées adoptées (humain 0, cheval 0,13, squelette 1 = NH de la créature de base, golem 0, worg de guerre +1) ; les inscriptions tranchées (hobbit 0,5, gnome 0,5, gobelin 0,33, géant du feu 13, djinn 5). La table départ/plafond par nature est adoptée. Conséquence à noter : l'elfe passe sous l'humain en PF individuel (1,305 contre 1,667, sa masse PV 6 y pourvoyant) — la parité É7 ne tient plus que par exception motivée si Francky la souhaite.

Rappel de la règle adoptée : NH d'une espèce = CR de sa fiche 3.5. L'audit passe toutes les entrées du catalogue sous cette règle. Trois statuts : conforme (la règle confirme la valeur É8/É7), aligné (la valeur É7 dévie et la règle propose un recalage, écart consigné), exception motivée (la règle s'efface devant une raison d'architecture ou de nature). Convention : pour les morts-vivants, le NH proposé est celui de la créature de base (le squelette garde le NH du guerrier humain de base ; le cheval squelette celui du cheval).

| Espèce | NH É7/É8 actuel | CR fiche | NH règle | Statut | PF pipeline (NH actuel → NH règle) |
| --- | --- | --- | --- | --- | --- |
| Humain | 0 | 1/3 | 0 | exception fondatrice : ancre du pipeline, l'expérience humaine vit dans le QE du lot | 1,667 (inchangé) |
| Elfe | 2,01 | 1/2 | 0,5 | aligné (écart −1,51) | 1,663 → 1,305 |
| Nain | 3,0 | 1/2 | 0,5 | aligné (écart −2,5) | 3,998 → 2,017 (PP racial 1,10 arbitré ; masse 10 conservée) |
| Nain gris (duergar) | 3,0 | 1 (règle de fiche : CR = niveau de personnage) | 1 | aligné (écart −2,0) | 3,998 → 2,200 |
| Hobbit | 0,5 | 1/2 | 0,5 | conforme (le NH É7 égale le CR exact — le seul cas du catalogue) | PP 1,00 : l'É8 reproduit la Force É7 au millième — PF 0,995 |
| Gnome | 0 (pas de NH É7) | 1/2 | 0,5 | aligné (la CR fixe 0,5) | PP 1,00 (É7-exact) ; PF 0,628 ; consigné : sous le kobold comme en É7 |
| Gobelin | 1,0 (Force É7 1,304 — PP implicite 1,2 : le guerrier-né) | 1/3 | 0,33 | aligné (règle NH = CR strict — l'É7 le surclassait de trois CR) | PP 1,20 ré-arbitré (reprise du mark É7) ; PF 1,158 ; ordre É7 restauré : gobelin (1,158) au-dessus du hobbit (0,995) |
| Hobgobelin | — (pas de ligne É7) | 1/2 | 0,5 | inscrit (calé sur l'humain à gabarit égal, arbitré) | PP 1,00 (famille humanoïde — dons raciaux et discipline en capacités) ; PF 1,834 |
| Kobold | 0,88 | 1/4 | 0,25 | aligné (écart −0,63) | 0,805 → 0,719 |
| Loup | 1 | 1 | 1 | conforme (adopté) | 2,86 |
| Worg | 2 | 2 | 2 | conforme (adopté) | 5,83 |
| Worg de guerre | 3 | 2 | 2 | exception motivée à valider : dressage de guerre (+1) | 7,28 → 5,83 si aligné |
| Loup sanguinaire | 5 | 5 | 5 | conforme (adopté) | 11,85 |
| Lézard géant | 0 | dossier MdM : aucun gabarit exact au bestiaire — le varan (22 PV, CR 2, fiche relevée) ne reproduit pas le gabarit É7 (PV 30) ; entre le varan (CR 2) et le crocodile géant (CR 4) | 2 (proposition par analogie au varan) | dossier MdM | 4,161 → 5,826 si NH 2 |
| Homme lézard | 2,02 | 1 | 1 | aligné (écart −1,02) | 4,001 → 3,419 |
| Centaure | 3,93 | 3 | 3 | aligné (écart −0,93) | 9,003 → 8,065 |
| Aigle géant | 3,68 | 3 | 3 | aligné (écart −0,68) | 8,005 → 7,378 |
| Cheval | 0,13 | 1 | 0,13 | exception motivée : herbivore docile — son CR reflète la masse et les ruades, non la belligérance | 5,001 conservé |
| Cheval squelette | 0,13 | — | 0,13 | exception mort-vivant : NH de la créature de base | — |
| Griffon | 4 | 4 | 4 | conforme (adopté ; validation directe de la règle) | 11,76 |
| Licorne | 3 | 3 | 3 | conforme (adopté) | 6,94 |
| Éléphant | 11 | 7 | 7 | aligné (écart −4) ; note : le PF 75 du catalogue est une valeur de table É7, le pipeline donne 40,5 (NH 11) → 30,4 (NH 7) — équilibrage absolu différé | 40,5 → 30,4 (table É7 : 75, écart consigné) |
| Ent | 9 | 8 (fiche relevée : 7d8+35, 66 PV, CA +13 naturelle, anima des arbres ; CR 8 confirmé) | 8 | aligné (écart +1) — l'estimation antérieure de CR 9 était erronée | PP 1,30 arbitré ; dossier résolu : treant standard 66 PV (PF 19,8), l'ent vénérable É7 (270) = spécimen âgé selon la progression 8-21 DV — grille d'âge MdM |
| Géant de pierre | 10 | 8 (aîné CR 9 à la table) | 8 | aligné (écart −2) | PP 1,20 (familles É8) ; PF 27,1 (PV fiche 119) |
| Géant des tempêtes | 19 | 13 (fiche relevée : CA 27, +12 naturelle, Str 39, immunité à l'électricité, grand plat de guerre ; CR 13 standard 3.5) | 13 | aligné (écart −6, le plus grand de l'audit) | PP 1,20 ; PF 48,5 (PV fiche 199 ; h plafonné à 3,3) |
| Géant du feu | 16 | 10 (fiche relevée le 27 au soir : 15d8+75, 142 PV, Str 31, immunité au feu — l'entrée « 13 » du matin provenait d'une erreur de lecture de la table classée) | 10 | aligné (écart −6) | PP 1,20 ; PF 35,2 |
| Béahir | 12 | 8 (table classée ; fiche relevée : 9d10+45, 94 PV) | 8 | aligné (écart −4) | PP 1,20 ; PF 23,2 ; le PF É7 de 1 000 retiré comme artefact de table |
| Élémentaire (terre) | 13 | 5 (grand, CR 5 ; PV fiche 76 ≈ 80 du catalogue) | 5 | aligné (écart −8) ; le PV 80 confirme le gabarit Grand | PP 1,20 ; PF 15,5 (PV fiche 76) ; NM 4 à l'étage unité (hors PF de base, précédent licorne) |
| Djinn | 10 | 5 (fiche relevée : 7d8+14, 45 PV, Str 18, tourbillon) | 5 | aligné (écart −5) | PP 1,00 ; PF 9,1 ; NM 2 à l'étage unité |
| Ki-rin | 17,0 (PP É7 1,083, TC 2, PV 80, Force 200) | 18 | 18 | inscrit (fiche OA 3.0 acceptée par arbitrage — écart NH +1) | PV 126 (fiche) ; PP 1,20 (familles É8) ; PF 41,2 (É7 : 200) ; CR 18 magique — point mou consigné |
| Golem | 20 | par type (chair 7, argile 10, pierre 11, fer 13 — fiches relevées) | 0 | exception fondatrice : construct sans esprit (Int —), aucun NH ; son CR reflète masse et immunités | PP 4 maintenu ; quatre golems inscrits : PF 26,4 / 28,9 / 32,4 / 36,7 |
| Squelette | 1 | 1/3 | 1 | exception mort-vivant : NH de la créature de base (guerrier humain) — la règle du NH de base l'emporte sur le CR de la carcasse | 2,56 conservé |
| Highman | 10 (TC 1,5183, PV 35, Force 20) | création de Francky — pas de fiche | 0 (ancre humaine conservée) | exception motivée : création MdM, pas de CR — la supériorité raciale passe au PP, non au NH | PV 10, PP 1,045 → PF 1,742, l'équivalent du demi-elfe sans le sang elfique ; capacités propres à trouver |
| Dragon (rouge adulte) | 14 | 14 | 14 | conforme (adopté) | PP 1,50 arbitré (la marge du roi) ; PV recalé 253 (fiche) ; PF 73,3 — première application du plafond : h = 3,4 |

Lecture de l'audit : treize espèces conforment ou adoptées d'office ; treize alignements (elfe, nain, nain gris, kobold, lézard géant, homme lézard, centaure, aigle géant, éléphant, ent, géants de pierre, du feu et des tempêtes, béahir, élémentaire de terre, djinn — les plus grands écarts : tempête et feu à moins six, élémentaire à moins huit) ; cinq exceptions motivées adoptées (humain ancre, cheval docile, squelette NH de base, golem construct, worg de guerre dressé) ; le hobgobelin inscrit (calé sur l'humain à gabarit égal) ; le gobelin ré-arbitré sur sa ligne É7 retrouvée (PP 1,20) ; le ki-rin débloqué par la fiche Oriental Adventures du troisième ajout et inscrit ; le highman inscrit par création MdM (supériorité raciale pure : PV 10, NH 0, PP 1,045 → PF 1,742, l'équivalent du demi-elfe sans le sang elfique) — le catalogue des espèces est clos. Échelle des géants relevée : colline 7, pierre 8, givre 9, feu 10, nuage 11, tempête 13 — correction du soir : la fiche du géant du feu donne CR 10 (l'entrée « 13 » du matin était une erreur de lecture de la table classée) ; l'écart É7 entre feu et tempêtes survit par les fiches elles-mêmes (10 contre 13), la « drill militaire » n'y est plus pour rien.

## Qualité des unités monstres — départ et plafond par nature (remarque de Francky ; adoptée le 27 octobre au soir, appuyée sur Savage Species)

Remarque fondatrice de Francky : la qualité d'une unité de monstres au départ n'est pas nécessairement A, et les monstres peuvent évoluer dans des limites fixées par leur nature. L'architecture le permet déjà : le NH intrinsèque d'espèce (vivant dans le PF individuel) et la qualité du lot (QE, appliquée au lot) sont deux axes indépendants — la compagnie de griffons qualité D (fiche 2) contre une fierté sauvage en est la démonstration. Manquait la règle de départ et de plafond, la voici proposée.

| Nature | Qualité de départ | Plafond | Motif |
| --- | --- | --- | --- |
| Meutes prédatrices (loup, worg, loup sanguinaire, hyène) | B | C | l'instinct de chasse vaut une drill de vétéran ; sans état-major, la meute n'apprend plus au-delà |
| Bêtes solitaires (ours, lézards, crocodile) | A | B | pas de cohésion à organiser ; dressage individuel seulement |
| Troupes humanoïdes (gobelin, kobold, orque, hobgobelin) | A | E | hiérarchie tribale de départ ; les légions orques et hobgobelines atteignent D-E par la drill |
| Peuples anciens (elfes, nains) | B | E | ajouté par arbitrage : culture martiale millénaire — mille ans de vie, chacun est soldat ; rend native la supériorité des unités elfiques et naines au lot (le nain et le nain gris sont inscrits, cf. section dédiée) |
| Cavaliers naturels (centaure) | B | E | culture martiale complète |
| Prédateurs majestueux dressables (griffon, aigle géant) | B | E | la compagnie qualité D de la fiche 2 en est la preuve vécue |
| Montures de bataille (cheval, destrier, worg de guerre) | A | D | dressage hippique ; le destrier de guerre part à B-C |
| Morts-vivants sans esprit (squelette, zombie) | A | C | exécutent les formations, n'improvisent jamais ; la qualité est acquise par le dressage du maître, jamais par l'expérience |
| Morts-vivants pensants (ghoule, spectre) | B | D | ruse et haine organisées |
| Créatures fières (licorne) | B | D | refusent la discipline de parade au-delà |
| Géants | B | D | clans et bandes, pas de légion |
| Golems et conjurations | qualité du créateur ou du conjurateur (arbitré) | aucun | consommables ; règle de conjuration déjà arbitrée |
| Majeures solitaires (dragons, béahir, ent) | hors lot standard | hors lot standard | lots de taille 1 : la « qualité » se gère par l'âge, les capacités et la magie, non par la drill |

Évolution proposée (deux axes, relais chantier expérience) : axe collectif — les unités monstres gagnent des PE selon la règle d'expérience et montent en qualité jusqu'au plafond de leur nature, jamais au-delà ; axe individuel — au-delà du plafond, les PE surnuméraires se convertissent en évolution de spécimens : l'alpha d'une meute de loups vétérans plafonnée C devient loup sanguinaire (changement d'espèce, conforme à la règle des variantes : NH et armes naturelles, jamais de gonflement de TC). Les mort-vivants sans esprit ne gagnent pas de PE ; leur qualité ne vient que du dressage du maître. Les conjurations conservent la qualité de leur conjurateur.
## Vérifications après ajout des manuels (27 octobre 2026, soir)

Second ajout du soir — huit nouvelles sources indexées et vérifiées : Complete Warrior, Complete Divine, Complete Mage, Complete Arcane, Complete Scoundrel, Complete Champion, Complete Vampire (dédié aux dragons vampiriques — relais Libris Mortis et Draconomicon), Dungeon Master's Guide 3.5. Carte des déblocages : le chantier magie est désormais armé de bout en bout (Spell Compendium, Complete Mage, Complete Arcane, Complete Divine, DMG pour les objets et leur borne au NM) ; le chantier postures/doctrines reçoit Complete Warrior (feats tactiques, charges de cavalerie) en appui de Heroes of Battle ; le chantier siège reçoit les engines du DMG (baliste, catapulte, murs) ; le dossier morts-vivants pensants (ghoule, spectre, vampire) reçoit Complete Vampire et Libris Mortis. Toujours manquant : Oriental Adventures pour le ki-rin (PP 1,20 pré-inscrit).

Troisième ajout du soir — trois nouvelles sources indexées et vérifiées : Oriental Adventures (le ki-rin débloqué et inscrit ; les races orientales — hengeyokai, korobokuru, spirit folk, nezumi, vanara — et les oni, lungs et esprits restent à la disposition du MdM), Frostburn (fronts d'hiver : néandertalien, uldra, yéti, périls du grand froid — appui aux chantiers mouvement et siège d'hiver), Complete Psionic (l'axe psionique — décision à prendre au chantier magie : le psionique entre au PMB/PMR comme une source parmi d'autres, ou demeure hors champ de l'É8). Bibliothèque : 27 documents.

Quatrième ajout (27 octobre, fin de soirée) — dix nouvelles sources indexées et vérifiées : Races of Stone (peuples de la pierre : goliath, nains et gnomes élargis — chaîne raciale), Template races (gabarits raciaux pour races dérivées — chaîne raciale), Drow of the Underdark (le dossier drow complet : classe raciale drow par niveaux, arsenal magique, société — relais direct du chantier capacités et de l'arsenal drow), Unearthed Arcana (variantes de classes et construction de classes — chaîne professionnelle), Iron Heroes (classes de combat basse magie — la preuve qu'une profession vit sans canal magique), Secrets of Pact Magic (les pactes et vestiges — candidat au canal magique aux côtés du psionique ; les cérémonies collectives ouvrent des pactes d'unité), Book of Vile Darkness et Book of Exalted Deeds (capacités infâmes et exaltées — les extrêmes d'alignement, relais doctrines), Ghostwalk (la mort et les esprits — relais morts-vivants pensants), Sandstorm (les déserts — il ne manque que Stormwrack pour boucler la trilogie des environnements). Toujours manquant : le Player's Handbook 3.5 (le châssis des classes de base pour la chaîne professionnelle). Bibliothèque : 37 documents.

Cinquième ajout (la cave, 27 octobre, nuit) — dix-neuf nouvelles sources indexées et vérifiées : Kingdoms of Kalamar Atlas (le monde de Tellene : cartes, routes, ressources, populations — la référence géographique et économique pour l'éditeur de carte et la couche empire), Arms and Equipment Guide (équipement, véhicules et biens de négoce — relais chantier armures et commerce), Exemplars of Evil (les grands adversaires et leurs complots — relais leaders adverses et cultes), Dragon Compendium Volume I (races et classes de la revue Dragon — Diabolus, Diopsid, Dvati, Lupin, Tibbit à la disposition du MdM), The Assassin's Handbook (classe d'assassin, coups fatals, poisons, organisations — Vultur et Sirat — relais direct des fiches voleur et assassin, des unités spéciales et des grades de poison), Tome of Magic (pactes, magie de l'ombre, vrai nom — le second pilier du canal pacte aux côtés de Secrets of Pact Magic), Races of the Dragon (le sang draconique — relais des grilles d'âge du dragon et de la chaîne raciale kobold), Races of Destiny (les humains et leurs lignées hybrides — demi-elfes, demi-orques, illumians, aasimar, tieflings — relais direct du dossier highman), Tome of Battle (la Voie Sublime : neuf disciplines, postures et manœuvres — le système de référence du chantier postures et doctrines), Monster Manual IV (le bestiaire s'étend — avatars du mal élémentaire, progéniture de Tiamat), Fiendish Codex I : Hordes of the Abyss (les démons, leurs seigneurs et la possession — le fond du canal pacte et des fiches démoniste et maléficant), Player's Handbook II (Beguiler, Dragon Shaman, Duskblade, Knight — candidats de la chaîne professionnelle ; les affiliations et bénéfices d'équipe servent les guildes), Weapons of Legacy (les armes héritage qui montent en puissance avec leur porteur — le gabarit des artefacts de la catégorie spéciale), Lords of Madness : the Book of Aberrations (aboleths, beholders, mind flayers — le dossier des aberrations et un appui au mentaliste), Heroes of Horror (le miasme, la peur et la corruption — relais direct de la règle Peur v0.2 et d'un futur chantier corruption ; le Dread Necromancer appuie la fiche nécromant), Expanded Psionics Handbook (le psion, le guerrier psychique, le soulknife — le dossier complet pour l'arbitrage psionique du chantier magie et la fiche du mentaliste), Defenders of the Faith (prêtres, paladins et églises — appui des fiches prêtre et paladin et du chantier cultes), Masters of the Wild (barbares, druides et rôdeurs — appui des fiches berserker, druide et ranger), Enemies and Allies (collections de PNJ : crime, religion, magie, loi — relais guildes, unités spéciales et leaders). Bibliothèque : 56 documents. Toujours manquants : le Player's Handbook 3.5 (le châssis des classes de base — le PHB II ne le remplace pas) et Stormwrack (la trilogie des environnements reste incomplète).

Sixième ajout (le fugitif, 27 octobre au petit matin) — la bibliothèque du projet est vidée, nettoyée et rechargée par Francky : cinquante-sept documents, dont l'arrivant qui manquait depuis la veille : le Players Handbook [OEF] (le châssis des classes de base — c'était lui, le 57e fichier resté au fond du panier lors de la copie manquée). Indexation vérifiée par sondage sémantique (chapitre des classes et tables de sorts par jour retrouvés). La chaîne professionnelle est armée de bout en bout. Il ne manque plus que Stormwrack pour boucler la trilogie des environnements. Bibliothèque : 57 documents.

Septième ajout (le trésor des profondeurs, 27 octobre, nuit finissante) — cinq volumes déposés par Francky en fichiers joints de la conversation (lisibles au fil, non encore dans la bibliothèque du projet) : Stormwrack (LA trilogie des environnements est bouclée — la mer arme le métier marin de la cuvée, les unités navales, l'habileté Navigation, l'embarquement et les équipements ; OCR vérifié, 226 pages), Fiendish Codex II : Tyrants of the Nine Hells (les diables et leurs contrats — le droit diabolique du canal pacte, fait pendant au Codex I ; appui des fiches démoniste et maléficant et des pactes d'unité), Tome and Blood (mages et ensorceleurs — appui des grilles de métier, familers et fabrication d'objets), Sword and Fist (moines et guerriers — appui des grilles de métier de l'artiste martial et du guerrier), Magic of Incarnum (le troisième système de magie : les âmefusions — candidat canal au chantier magie aux côtés du psionique et du pacte, décision à l'arbitrage). À ajouter à la bibliothèque du projet (57 vers 62 documents) pour l'indexation sémantique.

Nouvelles sources ajoutées par Francky : Spell Compendium, Monster Manual III, Monster Manual V, Complete Adventurer, Ultimate Feats, Rules Compendium, Savage Species, Fiend Folio, Planar Handbook. Vérifications menées :

1. Ent : fiche relevée dans le Monster Manual — Huge plante, 7d8+35 (66 PV), CA 20 (+13 naturelle), coup 2d6+9, anime les arbres, RD 10/tranchant, vulnérabilité au feu, CR 8 (confirmé par sources externes concordantes). L'estimation antérieure (CR 9) était erronée : l'ent passe de conforme à aligné (écart +1, NH 9 → 8). Note de calibrage : la fiche donne 66 PV (TC 1,87) contre 270 au catalogue É7 — écart consigné, la valeur É7 de masse de l'ent relève d'un dossier MdM (les ents du bestiaire progressent par classes de HD de 8 à 21, cf. Savage Species).
2. Géant des tempêtes : fiche relevée (CA 27, +12 naturelle, Str 39, immunité à l'électricité, grand plat de guerre) — CR 13 standard confirmé. Correction d'attribution : le bloc de fiche lu le 27 au matin était celui du géant des tempêtes, non du géant du feu.
3. Géant du feu : fiche relevée le 27 au soir — CR 10 (l'entrée « 13 » du matin provenait d'une erreur de lecture de la table classée) ; 15d8+75 (142 PV), Str 31, immunité au feu, vulnérabilité au froid.
4. Varan : fiche relevée (22 PV, CR 2) — il ne reproduit pas le gabarit É7 du lézard géant (PV 30) ; dossier MdM, proposition NH 2 par analogie.
5. Ki-rin : débloqué par le troisième ajout (Oriental Adventures) et inscrit (PV 126, NH 18, PP 1,20 → PF 41,2). Highman : inscrit par arbitrage (PV 10, NH 0, PP 1,045 → PF 1,742) ; ses capacités propres restent à trouver (dossier MdM).
6. Savage Species rejoint les références de la règle d'évolution à deux axes : ses classes de monstres progressent par paliers fixés par l'espèce (un medusa ne progresse qu'en medusa) — la traduction littérale de « évoluer dans des limites fixées par la nature » ; son ECL (niveau effectif) recoupe notre niveau É8 = CR + 5. Relais : chantier expérience et table départ/plafond.
7. Spell Compendium rejoint les références du chantier magie ; Monster Manual III et V, Fiend Folio et Planar Handbook étendent le bestiaire disponible pour les futures entrées du catalogue.
## Correction elfique — supériorité raciale (arbitrée par Francky, 27 octobre au soir)

Anomalie soulevée par Francky : la ligne « Elfe » unique masquait les sous-races (haut-elfe, drow) et, sous l'alignement strict NH = CR, l'elfe passait sous l'humain en PF individuel (1,305 contre 1,667 — sa masse PV 6 l'y condamnait). Arbitrage rendu : « les elfes sont supérieurs aux humains au niveau race. »

Mécanisme retenu : la supériorité vit dans le PP racial (Puissance de la race), pas dans le NH — la règle NH = CR adoptée ce jour demeure strictement en vigueur. Le PP racial elfique s'établit à 1,35 de base, 1,45 pour les sous-races musclées (+2 Force à la fiche : sylvain, sauvage). L'elfe frappe moins lourd (masse), mais mieux (grâce, sens, longévité) — application du principe « la masse protège, la puissance tue ».

PF individuels résultants (tous supérieurs à l'humain 1,667) : haut-elfe 1,763 ; sylvain 1,893 ; sauvage 1,893 ; grise 1,763 ; drow 1,924 (NH = CR 1 selon la règle de sa fiche, arsenal du drow — venin, vision noire, résistance à la magie, sorts innés — traité en capacités et NM, non en PF). La demi-elfe (masse humaine, PV 10) s'établit à 1,834 : supérieure en PF brut à l'elfe pure, sans ses sens — la masse décide du choc, la race de la grâce.

Au niveau du lot, la ligne « Peuples anciens » de la table départ/plafond complète l'édifice : unités elfiques à départ B contre levées humaines A — soit, par tête, 1,763 × 1,50 = 2,64 contre 1,667. Supériorité raciale et culturelle, hiérarchie narrative respectée : l'elfe domine la levée, s'incline devant les vétérans humains à qualité égale.

Ajustement demi-elfe (arbitré le 27 octobre au soir) : PF initial 1,834 jugé trop fort par Francky — la cible est entre l'humain (1,667) et la moyenne des elfes hors drow (1,828). Réglage : PP 0,95 (sang dilué, grâce atténuée) → PF 1,742. La masse humaine (PV 10) demeure ; la demi-elfe frappe plus lourd que l'elfe pure n'est pas requis — le principe « masse protège, puissance tue » s'exprime ici par sa résistance (PV 10 contre 6), non par sa puissance.

Mécanisme alternatif documenté (non retenu) : exception motivée « longévité martiale » portant le NH elfique à 3 (PF haut-elfe 1,897) — disponible si le calibrage global à venir le demande.

## Peuples anciens — le nain et le nain gris (arbitrés le 27 octobre au soir)

Inscription du nain sur sa fiche 3.5 (guerrier niveau 1, CR 1/2, 1d8+2, Force 13, Constitution 14, vitesse 20 pieds) et son classeur É7 (NH 3, masse 10, PMV 6, PF 3,998). Calage : masse humaine PV 10 — l'É7 et la fiche concordent, le nain pèse un humain adulte ; NH = CR 0,5 (l'exception É7 « NH 3 » s'efface comme pour l'elfe) ; le PP racial restait à arbitrer. Trois options présentées : PP 1,00 → PF 1,834 ; PP 1,10 → PF 2,017 ; PP 0,95 → PF 1,742. Arbitrage de Francky : option 2, la robustesse légendaire — PP racial 1,10, PF 2,017, au-dessus de toutes les sous-races elfiques. L'É7 disait déjà le nain au-dessus de l'elfe (3,998 contre 2,01) ; l'É8 l'honore : le nain ne doit rien à la grâce, il doit tout à sa masse et à sa robustesse. Ses traits raciaux (vision noire, stabilité, résistances au poison et aux sorts, haine ancestrale contre orques, gobelinoides et géants, sens de la pierre) rejoignent le registre des capacités et le NM, comme l'arsenal du drow. Son PMV demeure réduit (É7 : 6 contre 12 à l'humain) — relais chantier mouvement.

Le nain gris (duergar) est inscrit dans la foulée (arbitrage) : CR = niveau de personnage (règle de sa fiche, celle du drow) → NH 1 ; masse naine PV 10 (É7) ; PP racial 1,10 du sang nain → PF 2,200. Son arsenal (invisibilité et grandir 1/jour, immunités à la paralysie, aux phantasmes et au poison, vision noire 120 pieds) relève des capacités et du NM, traitement drow ; sa sensibilité à la lumière également. Conséquence consignée : le duergar dépasse le drow en PF brut (2,200 contre 1,924) — masse et sang y pourvoient, l'arsenal des deux races étant hors PF ; son déficit de commandement (Charisme 4 à la fiche) relève des leaders et du NM.

Hiérarchie des races de peau (contrôle vérifié) : nain gris (2,200) > nain (2,017) > drow (1,924) > sylvain et sauvage (1,893) > haut-elfe et grise (1,763) > demi-elfe (1,742) > humain (1,667). Au lot, l'infanterie naine à départ B (Peuple ancien) affiche 3,03 par tête (2,017 × 1,50), dominant les compagnies elfiques (2,64) et la levée humaine (1,667).

## PP de la haute gamme — familles É8 (arbitrées le 27 octobre au soir)

Principe arbitré : les PP du classeur É7 grossissent avec la taille (pierre 1,4825, feu 2,196, tempêtes 2,75, ent 2,222, élémentaire 2,8055, djinn 1,5) — sous le pipeline É8, la taille vit déjà dans TC², les reprendre eût pesé deux fois la masse. Les familles É8 prévalent : prédateurs et gabarits supra-humanoïdes 1,20, formes humanoïdes 1,00, ent 1,30 (muscle ligneux), golems 4 maintenus, dragon 1,50 « la marge du roi ». La hiérarchie s'exprime par NH = CR et TC ; l'option « PP É7 conservés » a été écartée car elle inversait l'élémentaire de terre (CR 5) au-dessus du band CR 8 et le golem de fer (CR 13) sous le géant du feu (CR 10).

Valeurs inscrites (PV recalés sur les fiches, PF recalculés au pipeline) : dragon rouge adulte 253 PV → 73,3 (première application du plafond h(NH) : h = 3,4) ; géant des tempêtes 199 → 48,5 (h = 3,3) ; golem de fer 129 → 36,7 ; géant du feu 142 → 35,2 (CR corrigé : 10, pas 13) ; golem de pierre 107 → 32,4 ; golem d'argile 90 → 28,9 ; géant de pierre 119 → 27,1 ; golem de chair 79 → 26,4 ; béahir 94 → 23,2 ; ent 66 → 19,8 ; élémentaire de terre 76 → 15,5 ; djinn 45 → 9,1.

