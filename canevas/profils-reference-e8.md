---
name: "profils-reference-e8"
title: "Profils de référence de l'outil de création d'unités (Édition 8), v0.3"
type: "text/markdown"
---

# Profils de référence — passage du pipeline (Édition 8), v0.3 (règle de conjuration alignée sur les PMB, le 26 octobre 2026)

Trois fiches produites par le pipeline, éprouvant les règles arbitrées. Convention des PF de lot (corrigée) : PF du lot = Σ PF individuels (humains à NH 0, créatures avec leur h(NH)) × QE du lot × S, avec S = 0,0075 (constante d'échelle du classeur É7, reproduite à la décimale près : cohorte légère Bleu 12,5, Expérimenté 18,75, Vétéran 30, Élite 97,5, Super-élite 261, Exception 1 498,5). La table qualité consolidée (×1,00 à ×119,88) embarque déjà la progression d'habileté : h(NH) ne se réapplique pas sur l'humain du lot.

## Fiche 1 — Légion hellène (phalange)

| Champ | Valeur |
| --- | --- |
| Composition | 1 000 hoplites hellènes, qualité D (QE 7,80) |
| PF du lot | 1 000 × 1,667 × 7,80 × 0,0075 = 97,5 |
| Jets | 2 (qualité D) |
| EDT | 1,5 — détail : 1,0 + qualité D (+0,2) + Phalange (+0,1) + leader tacticien (+0,1) + BF (+0,1) ; académie non cumulée au bonus de qualité D (anti-double-comptage) |
| PF effectifs (EDT appliqué) | 146,25 |
| PV individuels / PST | 10 / 10 000 (lot de mille) |
| Équipement | hoplite lourd : étage EQT à calibrer (le classeur porte l'élite lourde à 240 PF contre 97,5 en léger — multiplicateurs non constants selon la qualité) |
| Capacités | Phalange, Rameurs (package culturel Hellène) |

Contrôles : conforme à la table É7 des unités terrestres (cohorte d'élite légère 97,5) ; EDT 1,5 conforme au cas validé.

## Fiche 2 — Compagnie aérienne montée sur griffons

| Champ | Valeur |
| --- | --- |
| Composition | 100 chevaliers qualité D sur 100 griffons ; features Guerrier monté et Vol |
| Griffon (gabarit recalé fiche 3.5, arbitré le 27 octobre) | PP 1,2 ; TC 1,807 (dérivé des PV : 10 × TC³ = 59) ; NH 4 validé (règle NH = CR) ; PF individuel 11,76 (h(NH) comprise) ; PV 59 |
| PF cavaliers | 100 × 1,667 × 7,80 × 0,0075 = 9,75 |
| PF griffons | 100 × 11,76 × 7,80 × 0,0075 = 68,8 |
| PF du lot | 78,6 — part cavaliers 12,4 pour cent, part montures 87,6 pour cent |
| Seuil de dégradation | part montures au quart restant : 17,2 PF (environ 25 griffons détruits sur 100) |
| Jets | 2 (qualité D) |
| EDT | 1,3 — détail : 1,0 + qualité D (+0,2) + BF (+0,1) |
| Capacités | Guerrier monté, Vol, Vol mono hex (engagement au sol limité à un hex) |

Enseignement du point de contrôle 2 : sous l'échelle correcte, la monture domine largement le lot (87,6 pour cent) — le cavalier est pris à NH 0 (son expérience vit dans le QE du lot) tandis que le griffon porte son h(NH) propre. La dégradation du lot suit donc principalement les pertes de griffons : le seuil du quart s'active à environ 25 bêtes détruites. Ce comportement est cohérent avec le récit (la puissance du lot réside dans les bêtes) ; il devra être vérifié sur d'autres couples cavalier et monture (cheval de guerre, notamment, où la part monture sera faible).

## Fiche 3 — Horde de squelettes conjurés

| Champ | Valeur |
| --- | --- |
| Conjurateur | 1 lot de nécromants, qualité C (facteur normalisé 2,0), PMB disponible 100 |
| Constante k (hypothèse) | supprimée par la révision ci-dessous : le PF du lot s'aligne sur les PMB (voir la section Révision de la règle de conjuration) |
| Effectif instancié | 781 squelettes (PF individuelle 2,56 : facteur mort-vivant 1,8 × h(NH 1) = 1,2 ; PV 6 calés sur la fiche 3.5 — arbitré le 27 octobre) |
| PF du lot | 781 × 2,56 × 2,40 × 0,0075 = 36,0 (soit l'équivalent de trois cohorts de Bleus — ordre de grandeur plausible pour 100 PMB) |
| Jets | 2 (qualité C du conjurateur) |
| EDT | 1,0 contrôlé (nature MV neutre 0, formation 0, commandement conjurés contrôlés 0) ; contrôle rompu : 0,7 |
| Durée déclarée | fin de l'assaut (standard) ; dissolution immédiate à la mort du conjurateur |
| Pertes | purs consommables : aucun blessé, aucune ventilation, aucun coût économique |
| Capacités | Mort-vivant, Immunité totale (poison, peur — valeurs à calibrer), Vulnérable au tournement (grade de résistance = qualité) |
| PV squelette | 6 (calés sur la fiche 3.5 : guerrier humain 1d12 — arbitré le 27 octobre ; la dérivation 0,8 est abandonnée) |

Contrôles : EDT conforme aux cas validés (conjurés contrôlés 1,0, non contrôlés 0,7) ; le facteur mort-vivant 1,8 reproduit le squelette exactement.

## Enseignements du passage corrigé

1. La convention d'échelle S = 0,0075 reproduit l'intégralité de la table É7 à la décimale près : les fiches É8 sont directement comparables aux tables, PSTR navals, villes et sièges du jeu É7.
2. Anti-double-comptage généralisé : l'expérience humaine vit dans le QE du lot (h(NH) non réappliquée) ; l'académie ne se cumule pas au bonus de qualité D ; la conflation BF/QE de la table É7 est assumée jusqu'à la refonte différée des paliers.
3. Sous la bonne échelle, les créatures montures dominent leurs lots (griffon : 87,6 pour cent) : le point de contrôle 2 est actif et devra être vérifié couple par couple.
4. Dernier étage manquant du pipeline : l'équipement (EQT, léger à ultra lourd), dont les multiplicateurs É7 ne sont pas constants selon la qualité — chantier à ouvrir.
5. Valeurs calées le 27 octobre : NH du griffon (4 = CR, règle NH = CR), PV du squelette (6, fiche 3.5), PV du griffon (59, fiche 3.5). Restent à caler : les immunités totales des morts-vivants et la disponibilité en PMB (relais chantier magie).
## Vue par qualité — évolution des trois exemples (26 octobre 2026, gabarit antérieur)

Note du 27 octobre : cette vue conserve le gabarit antérieur au recalage (griffon PV 80, PF 14,4 ; squelette PV 8, PF 3,6) et la règle de conjuration antérieure à la révision — elle est conservée à titre historique, car c'est elle qui a révélé l'emballement du double comptage. Valeurs courantes : fiche 2 ci-dessus et table de la révision de la conjuration ci-dessous.

Convention : QE du lot ; individus humains à NH 0 ; S = 0,0075. Jets : A 1, B 1, C 2, D 2, E 3, F 5.

| Qualité | QE | Légion (1 000 hoplites) | Griffons : cavaliers | Griffons : montures | Griffons : total | Seuil quart montures | Squelettes conjurés (100 PMB) : effectif | PF du lot conjuré |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | 1,00 | 12,5 | 1,25 | 10,8 | 12,1 | 2,7 | 277 | 7,5 |
| B | 1,50 | 18,8 | 1,88 | 16,2 | 18,1 | 4,0 | 416 | 16,9 |
| C | 2,40 | 30,0 | 3,00 | 25,9 | 28,9 | 6,5 | 555 | 36,0 |
| D | 7,80 | 97,5 | 9,75 | 84,2 | 94,0 | 21,1 | 694 | 146,3 |
| E | 20,88 | 261,1 | 26,1 | 225,5 | 251,6 | 56,4 | 833 | 469,8 |
| F | 119,88 | 1 498,8 | 149,9 | 1 294,7 | 1 444,6 | 323,7 | 972 | 3 146,8 |

Lecture :

1. La part monture (89,6 pour cent) est constante sur toute l'échelle : la qualité multiplie cavalier et monture à parts égales (propriété déjà constatée).
2. Alertes sur les conjurations : la qualité du conjurateur entre deux fois dans le calcul ci-dessus (facteur de taille ET QE du lot conjuré) — au rang F, cent PMB produiraient 3 146,8 PF, soit deux légions d'exception : manifestement excessif. Arbitrage requis : soit la qualité module la taille seulement (le lot porte alors le QE simple, sans facteur), soit elle module le lot seulement (taille fixe par PMB). La colonne « PF du lot conjuré » ci-dessus suppose le double effet et constitue la borne haute.
3. Équipement É7 (ratios par rapport au léger, cohortes) : A, B et C portent les mêmes ratios 1 / 1,2 / 1,6 / 2 / 2,8 (léger à ultra lourd) ; D 1 / 1,08 / 1,23 / 1,38 / 1,69 ; E 1 / 1,03 / 1,10 / 1,17 / 1,31 ; F 1 / 1,03 / 1,08 / 1,14 / 1,24. Lecture : les multiplicateurs d'équipement sont constants jusqu'au Vétéran puis se compriment — signature de la conflation BF et équipement aux paliers D et E : les unités d'élite sont déjà équipées, l'équipement ajoute moins. Piste pour l'étage EQT : multiplicateurs universels 1 / 1,2 / 1,6 / 2 / 2,8 avec un plafonnement du gain pour les qualités D et plus (anti-double-comptage), plutôt que la table brute É7.
## Révision de la règle de conjuration (arbitrée le 26 octobre 2026, orientation Francky)

- PF du lot conjuré = PMB dépensées × coefficient du conjurateur ; égalité de base 1 PMB = 1 PF.
- Coefficients de pente douce (constantes de calibrage) : A 0,5 / B 0,75 / C 1,0 / D 1,5 / E 2,0 / F 2,5.
- Le QE du lot ne s'applique pas aux conjurés (anti-double-comptage : la puissance est fixée par la dépense et le coefficient) ; la qualité du conjurateur gouverne les jets, l'EDT et la maîtrise du contrôle.
- Effectif dérivé du gabarit : n = PMB × coefficient / (PF individuelle × S) ; squelette (PF 2,56, PV 6 calés le 27 octobre) : 100 PMB × 1,0 / (2,56 × 0,0075) = 5 208 squelettes pour un conjurateur de qualité C (100 PF de lot).

Vue par qualité corrigée (100 PMB, gabarit squelette calé le 27 octobre) :

| Qualité du conjurateur | Coefficient | PF du lot conjuré | Effectif (squelettes) | Jets |
| --- | --- | --- | --- | --- |
| A | 0,5 | 50 | 2 604 | 1 |
| B | 0,75 | 75 | 3 906 | 1 |
| C | 1,0 | 100 | 5 208 | 2 |
| D | 1,5 | 150 | 7 813 | 2 |
| E | 2,0 | 200 | 10 417 | 3 |
| F | 2,5 | 250 | 13 021 | 5 |

