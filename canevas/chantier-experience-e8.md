---
name: "chantier-experience-e8"
title: "EDT-Alignement et gestion de l'expérience (Édition 8), v0.3"
type: "text/markdown"
---

# Chantier Expérience — EDT-Alignement et progression des unités (Édition 8), v0.3 (règle EDT mise à l'épreuve le 26 octobre 2026)

## Mise à l'épreuve de la règle EDT — dix cas concrets (26 octobre 2026)

| Cas | Description | EDT calculé | Référence É7 |
| --- | --- | --- | --- |
| Légion hellène (phalange) | Hellène, qualité D, académie, leader tacticien, BF, capacité Phalange +0,1 | 1,5 | légion 1,5 |
| Horde de squelettes non contrôlée | MV neutres, contrôle rompu | 0,7 | MV non contrôlés 0,7 |
| Horde de squelettes contrôlée | Nécromant en commandement | 1,0 | conjurés contrôlés 1,0 |
| Levée nordique sans caserne, mois 1 | Qualité A, hors caserne | 0,8 | règle caserne 0,8 |
| Levée nordique sans caserne, mois 3 | Idem, plus 0,1 par mois | 1,1 | convergence à 1,0 |
| Compagnie mercenaire de drows | CE, qualité C formée, BF | 1,0 | créatures chaotiques 0,8 |
| Diables mineurs en légion infernale | LE extraplanaire, organisation innée (anti-double-comptage) | 1,3 | diables 1,3 |
| Unité spéciale de rangers insulaires | Capacité Unité spéciale +1,0, qualité C, BF, Discipline de fer | 2,0 | borne haute 2,0 |
| Horde démoniaque non contrôlée | CE extraplanaire, contrôle rompu | 0,4 | horde 0,4 |
| Paladins de Hel (LE), ordre sacré | LE matériel, qualité D, académie, BF | 1,5 | paladins 1,4 |

Trois enseignements de la mise à l'épreuve :

1. Le plafonnement de la règle caserne doit s'appliquer au bonus de rattrapage seul : le plus 0,1 par mois s'arrête à D(formation) = 0 ; au-delà, la formation continue relève du chantier expérience (progression de qualité), non du rattrapage — sans quoi une levée dépasserait l'unité formée au bout de trois mois (cas 5 : 1,1 si non plafonné).
2. La formation compense la nature (cas 6 : drows formés à 1,0), ce qui est le comportement voulu — une compagnie de drows vétérans vaut mieux qu'une bande ; l'EDT minimum de référence É7 (0,8 pour créatures chaotiques) décrit la créature non formée.
3. L'ordre de paladins loyaux mauvais de Hel (1,5 avec BF) dépasse d'un dixième la référence É7 (paladins LG à 1,4) : l'écart vient du BF, non d'une anomalie — accepté comme nuance d'héroïque fantasy (un ordre sacré endurci au combat), à confirmer.

Anti-double-comptage confirmé : l'organisation innée d'une créature se compte en D(nature) et non en D(formation) (cas 7) ; une créature ne reçoit pas deux fois le même trait sous deux noms, conformément au document É8 des unités.

## Packages de capacités (orientation arbitrée le 26 octobre 2026)

Francky confirme la voie : création de features supplémentaires applicables aux unités ou aux leaders, avec des packages de features pour en faciliter l'attribution. Architecture proposée :

- Feature (capacité spéciale) : nom, prérequis, effets chiffrés par champ (EDT, PF, PMV, moral, jets, résolutions), coût d'entretien éventuel ; s'applique à une unité ou à un leader ; déclarée au relevé consolidé (ex-8.1.3 É7).
- Package : ensemble cohérent de features prêt à appliquer — package de tradition militaire (Légion infernale, Ordre sacré, Garde prétorienne, Mur de boucliers nordique), package de statut (Unité spéciale, Mercenaire, Conjurés contrôlés), package de guilde, package culturel (types d'humains). Le MdM assisté assemble une unité en sélectionnant des packages, le moteur compose les effets et refuse les incompatibilités déclarées.
- Interface moteur : liste de features sur l'objet lot et leader ; l'outil de création d'unités (spécification à venir) les manipule directement ; aucune feature codée en dur dans la résolution, qui ne consomme que les valeurs dérivées.



## Source complémentaire : la table EDT des unités (document PF effectifs É7)

Le document des PF effectifs É7 porte une seconde table EDT, au niveau des unités : unités spéciales 2,0 ; garde prétorienne, légion romaine, mamelouk 1,5 ; paladins 1,4 ; super-élite et créatures organisées par nature (diables) 1,3 ; élite et créatures très bien organisées (géants du feu) 1,2 ; vétérans et créatures bien organisées (orcs) 1,1 ; unité standard 1,0 ; unité partiellement formée 0,9 ; unité non formée, créatures chaotiques (trolls, drows) 0,8 ; foule et morts-vivants non contrôlés 0,7 ; horde démoniaque contrôlée 0,6 ; partiellement contrôlée 0,5 ; non contrôlée 0,4. S'y ajoutent deux règles dynamiques : la caserne (une unité « A » levée sans caserne démarre à 0,8 et gagne 0,1 par mois jusqu'à 1,0) et la séparation d'unité (une cohorte à 1,2 peut donner des sections à 1,1 — la dislocation dégrade la cohésion).

Le document précise le périmètre : l'EDT multiplie les PF dans un combat physique, correspond à la discipline des soldats et à la capacité de leurs officiers à les commander, ne s'applique qu'à partir d'une section ou d'une escouade ; le moral est un coefficient multiplicateur distinct (table moral Cf, de 0,1 à 2,5), sans double comptage.

## Règle EDT É8 proposée : composition additive à trois composantes

EDT = 1,0 + D(nature) + D(formation) + D(commandement), borné entre 0,4 et 2,0. La somme en dixièmes reproduit l'intégralité des deux tables É7 (quinze contrôles sur quinze).

D(nature) — discipline innée, portée par l'alignement et l'origine :

| Situation | D(nature) |
| --- | --- |
| Loyal, créature matérielle | +0,2 |
| Loyal, extraplanaire | +0,3 |
| Neutre, bienveillant, mort-vivant neutre | 0 |
| Chaotique mal, créature matérielle | −0,2 |
| Chaotique mal, extraplanaire | −0,3 |

Précisions : le chaos bienveillant demeure à 0 (créatures bonnes en harmonie) ; le mort-vivant est gouverné par son alignement seul (spectre et fantôme loyaux à +0,2) ; les créatures paisibles sans tradition martiale plafonnent D(nature) à 0 (cas du hobbit) ; les types d'humains (Nordique, Méridien, Hellène, Insulaire, commun) sont tous neutres par nature — leur nuance passe par les doctrines et l'équipement, conformément à l'arbitrage des registres dérivés.

D(formation) — discipline acquise, relais direct du chantier expérience :

| Situation | D(formation) |
| --- | --- |
| Unité spéciale | +1,0 |
| Garde prétorienne, légion, mamelouk | +0,5 |
| Académie militaire (formation d'officiers) | +0,1 |
| Qualité D (élite) et plus | +0,2 |
| Qualité C (vétéran) | +0,1 |
| Qualité A ou B formée (caserne) | 0 |
| Séparation d'unité | −0,1 temporaire |

Le malus des levées n'est pas dans D(formation) : il est porté par la feature « Unité non entraînée » (arbitrage de Francky du 26 octobre 2026) — EDT −0,2, disparition automatique après deux mois de service, ou plus tôt si l'unité est casernée ; la caserne restaure l'unité à son EDT de référence, sans bonus. L'entraînement de caserne qui fait passer une unité A en B (trois mois) est la progression de qualité du chantier expérience, distincte du retrait de la feature — et la qualité B ne porte aucun bonus d'EDT (palier C et au-delà : +0,1).

Contexte de cadence (remarque de Francky) : le tour par correspondance (un mois de jeu, quinze jours de mastering) se réduit avec l'application, améliorant la fréquence des tours ; les durées calées sur l'ancienne lenteur (rattrapage deux mois, entraînement trois mois) ne pénalisent plus la jouabilité, et des granularités plus fines restent envisageables là où le récit le demande.

D(commandement) — contrôle et cohésion du stack :

| Situation | D(commandement) |
| --- | --- |
| Leader tacticien en poste, ou capacité « Discipline de fer » | +0,1 |
| Créatures conjurées contrôlées (necromancien, démoniste) | 0 |
| Créatures conjurées partiellement contrôlées | −0,1 |
| Créatures conjurées non contrôlées, foule | −0,3 |

Le baptême du feu s'ajoute une fois : +0,1 après le premier engagement vécu (formalisation du lien BF → EDT).

Propriétés de la règle : le moral demeure un coefficient distinct (aucun double comptage, conformément au document É8 des unités) ; l'EDT reste un facteur de résolution qui multiplie les PF disponibles, sans toucher aux effectifs ni aux PV ; la décomposition rend l'EDT calculable par le moteur et lisible pour le joueur (il voit pourquoi son unité vaut 0,8 : levée sans caserne et sans caserne de correction).

Arbitrage du 26 octobre 2026 : les statuts de D(formation) — garde prétorienne (+0,5), unité spéciale (+1,0), académie (+0,1) — sont gérés comme capacités spéciales de l'unité (du type « Garde prétorienne : EDT +0,5 »), inscrites au relevé 8.1.3 avec leurs conditions d'accès. La composante D(formation) de base ne conserve que les états universels (qualité, caserne, séparation) ; tout bonus additionnel provient d'une capacité spéciale déclarée, ce que le moteur applique par composition. Corollaire : la table des capacités spéciales gagne un champ d'effet EDT, à côté des champs PF, PMV, moral et jets.



## Constat

Deux lacunes de l'Édition 7 : l'EDT (coefficient d'efficacité des troupes) restait une donnée indicative par créature, jamais systématisée ; et l'expérience des unités n'était pas gérée — le MdM ne pouvait pas le faire à la main. Le moteur applicatif de l'É8 lève les deux contraintes : le suivi est automatisé, le MdM arbitre au Cycle du Destin.

## EDT et alignement — validation sur le classeur É7

La table des créatures É7 porte l'alignement (colonne AL) et l'EDT par créature. La corrélation observée sur trente lignes est nette :

| Catégorie | EDT É7 observé | Lignes |
| --- | --- | --- |
| Loyal Mal, créature matérielle | 1,1 à 1,2 | géant du feu 1,2, kobold 1,1, sahuagin 1,1 |
| Loyal Mal, extraplanaire | 1,3 à 1,5 | diable majeur 1,5, diable mineur 1,3 |
| Chaotique Mal, créature matérielle | 0,8 | drow, gnoll, goule, drider, géant des collines |
| Chaotique Mal, extraplanaire | 0,4 à 0,5 | démon majeur 0,4, démon mineur 0,5 |
| Loyal Bon, extraplanaire | 1,5 | ki-rin |
| Chaotique Bon (matériel ou extraplanaire) | 1,0 | ent, centaure, licorne, djinn, géant des tempêtes |
| Neutres et loyaux bons matériels | 1,0 | humain, elf, gnome, triton, hobbit |
| Neutres extraplanaires | 1,0 | élémentaires, golem |
| Morts-vivants loyaux | 1,2 | spectre, fantôme |

Lecture de conception : l'EDT mesure la discipline et la cohésion. La Loi discipline (EDT supérieur), le Mal chaotique dissout (EDT inférieur) ; l'extraplanarité amplifie le trait dans les deux sens (plus 0,3 en loyal, moins 0,3 en chaotique mal). Le Chaos bienveillant n'est pas pénalisé (CG à 1,0) : les créatures bonnes vivent en harmonie sans discipline autoritaire. Le hobbit loyal bon reste à 1,0 (créature paisible, la loyauté n'ajoute pas de discipline martiale).

Règle proposée pour l'É8 : EDT de base 1,0 ; alignement Loyal : plus 0,2 (plus 0,3 si extraplanaire) ; alignement Chaotique : moins 0,2 si Mal (moins 0,3 si extraplanaire) ; le Chaos bienveillant et le Bien neutre demeurent à 1,0 ; mort-vivant : l'alignement seul gouverne (spectre et fantôme loyaux à 1,2). Le BF (baptême du feu) s'ajoute comme bonification mineure, plafonnée : plus 0,1 après le premier engagement vécu.

Question ouverte : le hobbit suggère une règle de plafonnement pour les créatures paisibles (EDT loyal plafonné à 1,0 si la créature n'a pas de tradition martiale) — à arbitrer.

## Gestion de l'expérience — proposition v0.1

### Principe

Chaque lot accumule des points d'expérience (PE). Le moteur tient le registre, applique les transitions de qualité au Cycle du Destin (résolution hebdomadaire, comme le sort des blessés), et présente la validation au MdM ; l'agent IA propose, le MdM arbitre. La progression suit l'échelle NH consolidée : A (NH 5), B (10), C (15), D (20), E (25), F (30) — le rang A0 couvre les levées non entraînées.

### Sources d'expérience (le combat n'est pas la seule)

1. Engagement de combat : gain proportionnel aux PF adverses détruits, majoré si l'adversaire était de qualité supérieure (l'expérience s'apprend contre plus fort), minoré contre plus faible ; la survie au combat vaut gain même en cas de repli ; les pertes subies n'annulent pas le gain (les survivants apprennent).
2. Unités spéciales (rangers, sapeurs, éclaireurs, ingénieurs) : la mission est source d'apprentissage. Succès : gain complet. Échec partiel : gain réduit (la moitié). Échec total : gain d'apprentissage non nul (le quart) — on apprend de ses erreurs — sauf anéantissement, où seuls comptent les survivants réintégrés ailleurs.
3. Entraînement en garnison : gain lent, plafonné à la qualité B ; les instructeurs (vétérans et invalides — relais direct vers le modèle morts et blessés) accélèrent le gain et peuvent élever le plafond à C pour les unités encadrées.
4. Assimilation : les renforts sont des individus de qualité inférieure au vétéran du lot ; la qualité du lot est recalculée par pondération des effectifs (la pyramide morts, blessés, invalides, valides déjà arbitrée fournit les effectifs). Une unité décimée et recomplétée redescend — l'expérience vit dans les hommes, pas dans l'étendard.

### Effets de la progression

- Qualité A à F : multiplicateurs et jets consolidés (table calque É7, refonte différée).
- BF : premier engagement vécu, effet sur l'EDT (plus 0,1, plafonné).
- Régression possible : moral effondré ou pertes massives sans recomplètement abaissent la qualité pondérée.
- Traitement du leader : le leader progresse par professions et niveaux (donnée de progression, hors résolution — arbitrage des valeurs dérivées respecté) ; l'expérience du lot et celle du leader sont deux registres distincts, l'instruction du leader (CDS) pouvant accélérer celle du lot.

### Calibrage ouvert

Coûts de passage en PE entre qualités : à caler après la refonte des paliers (conflation BF/QE de l'échelle É7) et avec l'outil de création d'unités ; proposition de principe : coût croissant selon la même géométrie que les multiplicateurs de qualité, exprimé pour 1000 individus.

## Points ouverts

1. Arbitrage du plafonnement EDT des créatures paisibles (hobbit).
2. Coûts PE par palier et formule de gain par engagement (calibrage différé).
3. Interaction qualités de lot et doctrines (une doctrine apprise verrouille-t-elle un plancher de qualité ?).
