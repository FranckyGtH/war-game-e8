---
name: "calibrage-humain-cheval-e8"
title: "Calibrage humain-cheval et types d'humains (Édition 8), v0.5"
type: "text/markdown"
---

# Calibrage humain-cheval — validation du pipeline des annexes de profils (Édition 8), v0.5 (PV/PST calés le 26 octobre 2026)

## Arbitrages de Francky du 26 octobre 2026 sur les décisions de conception

1. BF — arbitré : le baptême du feu ne modifie pas les PF au niveau créature ; il augmente l'efficacité au combat par le biais de l'EDT (coefficient d'efficacité des troupes). Le BF alimente donc l'EDT, qui reste un facteur de résolution indicatif, conformément à la feuille Explications du classeur (« l'EDT n'apparaît nulle part dans les formules ») — l'É8 formalise le lien BF → EDT.
2. Table magie — arbitré : m(NM) = 1 + 0,8 NM retenue, avec latitude de réajuster en cas d'incohérence découverte ultérieurement.
3. Plafond progressif de h(NH) — arbitré : la finalité du calibrage est le rééquilibrage au regard de la connaissance des mondes d'héroïque fantasy, non la reproduction aveugle du classeur ; le plafond au-delà de NH 10 (pente réduite de moitié) est adopté.
4. Lignes recalculées et NE — arbitré : griffon, licorne, golem et démon mineur seront recalculées pour rééquilibrage (propositions de PP : griffon 1,2 ; licorne 1,0) ; NE traité comme capacité spéciale (exception extraplanaires et lich).

## Calage des PV individuels et des PST — résultat du 26 octobre 2026

Formule validée à écart nul sur vingt-quatre lignes de la table É7 : PV (et PST du lot de 1000) = 10 × TC³, soit dix PV par unité de masse humaine (la masse relative étant TC³, TC étant la racine cubique de la masse). Les herbivores doublent leurs PST (feuille Explications du classeur : « Herb est pour Herbivore ; les herbivores ont un PST multiplié par deux »).

Contrôles à écart nul : humain 10, elf 6, kobold 2, hobbit 4, gnome 2, gobelin 4, loup 7, cheval 50, centaure 40, aigle géant 35, lézard géant 30, homme lézard 17, éléphant 100, ent 270, géant de pierre 200, géant des tempêtes 350, géant du feu 250, griffon 80, élémentaires 80, ki-rin 80, djinn 60, highman 35, cheval squelette 40, demi-elfe 10.

Conséquences de conception :

1. Correction de la proposition d'annexes de profils : les PV individuels ne dépendent pas de PP (h(masse, PP) devient h(masse)) — le cheval (PP 1) et l'éléphant (PP 1,644) portent tous deux exactement dix PV par masse relative. La puissance musculaire (PP) et la résistance (PV) sont deux axes indépendants.
2. Le paramètre RP (résistance physique relative à la taille, exemple du rhinocéros à peau épaisse) n'entre pas dans les PST du classeur — c'est une donnée de résolution (déjà identifiée : le facteur 1,8 des squelettes est à rapprocher de RP 1) ; à caler à l'étage résolution, non au pipeline.
3. Le squelette cheval conserve les PV de la masse (40) sans les droits de l'herbivore — le statut mort-vivant absorbe le doublement herbivore ; à confirmer au relevé des capacités spéciales.



## Ancres de référence (classeur É7 « Calcul des PF des unités »)

| Créature | NH | TC | PF | PST | PMV |
| --- | --- | --- | --- | --- | --- |
| Humain | 0 | 1,0 | 1,667 | 10 | 12 |
| Cheval | 0,13 | 1,71 | 5,0 | 50 | 24 |

Ratio Cheval/Humain = 3,000. Exposant implicite : k = ln(3) / ln(1,71) = 2,048.

## Résultat du calibrage : g(TC) = TC au carré

Le pipeline de l'annexe de profils pose PF de base = PP × g(TC), avec g(TC) = TC élevé à la puissance k. Les deux ancres (Humain TC=1, Cheval TC=1,71, ratio 3) donnent k = 2,048 : la fonction g(TC) = TC² reproduit le cheval à 2,5 pour cent près (4,87 contre 5,0).

Décision proposée : retenir g(TC) = TC² et PP normalisés (PP humain = 1, PP cheval = 1), la constante d'échelle étant portée par l'ancre humaine (PF humain de base = 1,667, conformément au classeur). Écart résiduel de 2,5 pour cent sur le cheval absorbé par le niveau d'habileté minimal du cheval (NH = 0,13) : h(0,13) ≈ 1,026, cohérent avec une contribution d'habileté douce aux faibles niveaux.

Contrôles de cohérence sur la table des créatures É7 (PP implicites sous g(TC) = TC², avant correction d'habileté) : lézard géant (NH 0) PP ≈ 1,20 ; homme lézard (NH 2,02) PP effectif 1,68 incluant l'habileté ; squelette (NH 1) PP effectif 2,16 ; kobold (NH 0,88, CCSN 0,5) 1,41 ; elf (NH 2,01) 1,40. Les valeurs d'habileté non nulles appellent la fonction h(NH) — voir ci-dessous.

## Calage de h(NH) — résultat du 26 octobre 2026

Formule validée : PF de base = 1,667 × PP × TC² × (1 + NH/5), avec h(NH) = 1 + NH/5.

Contrôle sur la table des créatures É7, écarts nuls (moins de 0,1 pour cent) :

| Créature | TC | NH | PF É7 | PP implicite | Écart du modèle |
| --- | --- | --- | --- | --- | --- |
| Cheval | 1,71 | 0,13 | 5,0002 | 1,00 | nul (prédiction 5,0002) |
| Elfe | 0,8435 | 2,01 | 1,6625 | 1,00 | nul |
| Kobold | 0,585 | 0,88 | 0,8049 | 1,20 | nul |
| Lézard géant | 1,4423 | 0 | 4,1605 | 1,20 | nul |
| Homme lézard | 1,1935 | 2,02 | 3,9998 | 1,20 | nul |
| Centaure | 1,5874 | 3,93 | 9,0009 | 1,20 | nul |
| Aigle géant | 1,5183 | 3,68 | 8,0038 | 1,20 | nul |

Deux familles de PP se dégagent nettement : PP 1,00 (humains, elfes, chevaux) et PP 1,20 (petites créatures reptiliennes et volantes : kobold, lézards, hommes lézards, centaures, aigles géants). Le facteur squelette est de 1,80 (squelette et squelette cheval, tous deux exactement ×1,8 sur la prédiction PP 1) — interprété comme facteur structurel des morts-vivants simples, à rapprocher du paramètre RP (1) et des immunités ; à calibrer à l'étage suivant.

Limite de validité : h(NH) = 1 + NH/5 est validée pour NH jusqu'à 4 environ (créatures). Les créatures à NH élevé (béhir NH 12, éléphant NH 11, ent NH 9, élémentaire de terre NH 13) laissent un résidu de 9 à 190 pour cent, imputable aux étages non encore calés : QE, BF, NM (l'élémentaire de terre porte NM 4). Le calage de ces étages constitue la suite du calibrage.

## Calage des étages BF et NM — résultat du 26 octobre 2026

Modèle complet testé : PF = 1,667 × PP × TC² × (1 + NH/5) × QE × m(NM), avec m(NM) = 1 + 0,8 × NM.

Résultats par famille :

1. Créatures banales à NH élevé (NH 9 à 19 : géants, ent, béahir, éléphant, highman) : résidu compris entre 0,72 et 1,57, moyenne 1,18 — le modèle reproduit les ordres de grandeur É7 sans facteur BF supplémentaire. Constat : les valeurs É7 hautes sont visiblement ajustées à la main (chiffres ronds : ent 200, ki-rin 200, golem 800, béahir 1000, éléments 300 à 340) ; un ajustement exact n'est ni possible ni souhaitable.
2. Créatures magiques (élémentaires NM 4, djinn NM 2, ki-rin NM 6, démons et diables NM 2 à 6) : résidu compris entre 0,60 et 1,83, moyenne 1,03, avec le djinn exact (moins 1,5 pour cent), les éléments de l'air et du feu proches (plus 5 et moins 13 pour cent), le ki-rin à plus 8,5 pour cent. La forme m(NM) = 1 + 0,8 NM est le meilleur ajustement simple ; elle donne NM 2 = 2,6, NM 3 = 3,4, NM 4 = 4,2, NM 5 = 5,0, NM 6 = 5,8.
3. Lignes suspectes, écartées de l'ajustement : griffon et licorne portent des PP de 0,17 et 0,10 — des créatures dont la force est magique, non musculaire ; le PP saisi au classeur ne représente pas leur puissance réelle. Le golem (résidu 0,34) et le démon mineur (1,83) s'écartent du modèle ; ces quatre lignes seront recalculées en É8 plutôt que calibrées dessus. La lich (NE 6,4) relève du traitement des leaders, non des créatures de masse.

Décisions de conception proposées (à arbitrer) :

1. BF (baptême du feu) ne porte aucun multiplicateur au niveau créature : le loup et l'aigle géant sont exacts à PP 1,2 sans facteur BF, tandis que l'éléphant exige un résidu de 1,23 s'il en avait un. Le BF demeure une donnée de l'étage expérience des unités (il conditionne l'accès aux qualités C et supérieures), pas des profils individuels.
2. m(NM) = 1 + 0,8 × NM retenu comme table magie É8, en remplacement des valeurs É7 irrégulières — le classeur sert d'ordre de grandeur, non de calque, pour l'étage magie.
3. Plafond progressif de h(NH) au-delà de NH 10 : pente réduite de moitié (h = 3 + (NH − 10)/10), pour borner la croissance des créatures à très haute habileté (géant des tempêtes NH 19 : résidu 0,72 dénotant une surestimation linéaire). À arbitrer.
4. Les quatre lignes suspectes (griffon, licorne, golem, démon mineur) reçoivent en É8 des PP cohérents avec leur nature (correction de saisie, pas de calibrage) — proposition : griffon PP 1,2, licorne PP 1,0, golem PP 4 maintenu avec NM requalifié, démon mineur PP 1,35 vérifié.
5. NE (niveau d'énergie) demeure une exception enregistrée : 1 pour toutes les créatures intelligentes ordinaires, supérieur uniquement chez les extraplanaires (démons 4 à 5,8, lich 6,4) — à traiter comme capacité spéciale, non comme paramètre de pipeline.

Synthèse de fidélité au classeur É7 : ancres et créatures courantes (cheval, humain, elfe, loup, kobold, lézards, centaure, aigle, homme lézard) — écart nul ; créatures banales de haute habileté — plus ou moins 40 pour cent (valeurs É7 ajustées à la main) ; créatures magiques — plus ou moins 40 pour cent avec m(NM), moyenne à 3 pour cent. Principe confirmé : reproduire d'abord (ancres), retoucher ensuite (étages).

## Table qualité consolidée (étage unité) — proposition

L'échelle d'expérience du classeur (NH 5 à 30) porte des lignes qui conflate habileté, baptême du feu et équipement (la ligne Élite porte QE 2, BF Oui). Conformément à l'arbitrage des valeurs dérivées, l'É8 sépare les étages ; la table consolidée suivante reproduit néanmoins les PF É7 des unités standards tels quels (par construction, les multiplicateurs sont relatifs au Bleu) :

| Qualité É8 | Expérience É7 | NH | Multiplicateur | Jets (résolution) |
| --- | --- | --- | --- | --- |
| A | Bleu | 5 | 1,00 | 1 |
| B | Expérimenté | 10 | 1,50 | 1 |
| C | Vétéran | 15 | 2,40 | 2 |
| D | Élite | 20 | 7,80 | 2 |
| E | Super-élite | 25 | 20,88 | 3 |
| F | Exception | 30 | 119,88 | 5 |

Le rang « Aucune » (NH inférieur à 5) n'est pas une qualité d'unité : c'est l'état de créature sans entraînement (h(NH) inférieure à 2) — une levée de civils est une unité de qualité A composée d'individus à NH bas, non un rang inférieur. Question ouverte : existence d'un sous-rang A0 pour levées non entraînées (multiplicateur 0,5, zéro BF).

À noter : les sauts D (×3,25 par rapport à C) et E (×2,68) sont irréguliers car les lignes É7 conflate BF et QE ; le pipeline É8 recalculera ces paliers par étages une fois BF et QE calés. La table ci-dessus est le calque É7, fidèle au classeur ; la refonte des paliers est différée volontairement (principe : reproduire d'abord, retoucher ensuite).

## Types d'humains — proposition v0.1 (soumise)

Principe de calibrage — arbitré (26 octobre 2026) : tous les types d'humains partagent la même enveloppe biologique — masse, TC = 1, PP = 1, PF de base 1,667, PV individuels identiques. La nuance passe exclusivement par les trois registres dérivés :

1. Affinités climatiques : chaque type bénéficie d'un traitement favorable de l'EDT dans son climat d'origine et défavorable hors de celui-ci (facteurs de terrain-circonstances, jamais modification du profil).
2. Capacités spéciales culturelles : une ou deux capacités du relevé 8.1.3 par type, traduisant la mythologie porteuse.
3. Traditions militaires : doctrines et QE indicatives par défaut (l'équipement réel demeure libre), relayées par l'outil de création d'unités.

Motif : modifier les PF de base par type créerait une hiérarchie (un type deviendrait objectivement supérieur) et romprait l'ancre de calibrage du pipeline ; les trois registres ci-dessus produisent la nuance sans briser l'équilibre — chaque type excelle dans son environnement et paie ailleurs.

## Les cinq types (quatre mythologiques et le type commun) — périmètre arbitré le 26 octobre 2026

| Type | Mythologie porteuse | Climat d'origine | Capacités proposées | Traditions militaires proposées |
| --- | --- | --- | --- | --- |
| Type commun | aucune (référence du classeur) | tempéré standard | aucune (profil de référence) | infanterie standard, toutes armes |
| Nordique | Nordique | froid, boréal, maritime froid | Endurance du froid (pas de malus hiver, EDT favorable en neige/glace), Mur de boucliers (formation défensive, doctrine) | hache et bouclier, formation serrée, navires de peau |
| Méridien | Égyptienne | désert, fleuve, chaleur | Endurance de la chaleur et de la soif (EDT favorable en désert), Bâtisseurs (bonus travaux et terrassements — relais vers le chantier Siège) | infanterie à la pique et arc composite, chariot de guerre, navigation fluviale |
| Hellène | Grecque | méditerranéen, collines, mer | Phalange (formation, doctrine) ; Rameurs (PMV naval favorable) | hoplite, marine, tir délibéré |
| Insulaire | Japonaise | tempéré insulaire, montagne | Arc de guerre (tir favorable en lot) ; Discipline de fer (moral favorable, tenace — voisine de « Dur à cuire » sur le seul plan du moral) | arc à cheval et formation yari, terrain montagneux, escarmouche |

Chaque type peut être recruté hors de sa région d'origine ; les affinités climatiques suivent l'origine du type, non le lieu de recrutement, ce qui valorise le mélange dans un empire multiethnique (projet avoué : croiser les mythologies dans un même monde).

## Points ouverts

1. Type commun — périmètre arbitré : le type commun de référence demeure ; la variation minime de PP (plus ou moins 10 pour cent) est écartée.
2. Table des capacités spéciales : compléter le relevé 8.1.3 avec les nouvelles capacités citées (Endurance du froid, Endurance de la chaleur, Mur de boucliers, Bâtisseurs, Phalange, Rameurs, Arc de guerre, Discipline de fer) — chacune doit exister dans le relevé avant implémentation.
3. Fonction h(NH) — calée (voir section dédiée) ; restent à caler les étages QE, BF, NM sur les créatures à NH élevé (béhir, éléphant, ent, élémentaire de terre) et le facteur mort-vivant 1,8.
4. PV individuels : calibrage de h(masse, PP) reporté — humains identiques par type, cheval à poser (PST 50 É7 suggère PV du lot, non de l'individu).
