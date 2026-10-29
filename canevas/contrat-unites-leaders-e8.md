---
name: "contrat-unites-leaders-e8"
title: "Contrat d'interface Unités et Leaders — Résolution des combats (Édition 8)"
type: "text/markdown"
---

# Contrat d'interface Unités et Leaders — Résolution des combats (Édition 8), v0.1

## Objet et méthode

La résolution des combats (champ de bataille, assaut de place, combat intra-urbain) consomme un ensemble fermé de valeurs produites par les unités, les leaders et les structures. Ce contrat établit la liste de ces valeurs, leur format et leur source, avant toute rédaction de la résolution. Méthode retenue : le contrat d'abord, le modèle de données complet ensuite, la résolution en dernier ; les chantiers Unités et Magie seront finalisés sur cette base sans retoucher la mécanique. Sources : chapitre 08 « Les unités » (rédaction É8 du 10 octobre 2026, établie depuis le chapitre 8 de l'É7), table des qualités de l'É7, arbitrages des chantiers Combat et Siège.

## 1. Valeurs consommées par la résolution

### 1.1 Unité

Conformément au chapitre 08 É8 : une créature possède un profil propre ; l'unité se divise en lots homogènes (même espèce, entraînement, équipements, capacités) ; les cavaliers et leurs montures se suivent séparément, comme les vétérans et les recrues.

| Valeur | Rôle dans la résolution | Source |
| --- | --- | --- |
| PF de référence | Force du lot à plein effectif, profil et équipement actuels, avant EDT et circonstances | Chapitre 08 ; annexes de profils à venir |
| PV (points de vie) et PV max | PF disponibles = PF de référence × PV actuels / PV max ; à zéro opérationnel, zéro PF | Chapitre 08 (PF ≠ PV : les anciennes valeurs de PF É7 ne valent pas PV) |
| Qualité (A à F) | Coefficient de puissance, habileté (5 à 37), équipement (coefficients 2,0 à 8,0 à partir de D), baptême du feu dès C | Table qualité É7, consolidée |
| Race, type et milieu | UIT/UCA/UN/UZ, T/A/M/S ; races doubles et nombre de cavaliers par monture pour les unités montées | Chapitre 08 É7 |
| Capacités spéciales | Archer, vol, résistances, vulnérabilités, pouvoirs, unité spéciale ou secrète, caractéristiques imposées (berserker, rage, immortalité — doctrines contraintes) | Chapitre 08, relevé 8.1.3 |
| Effectif (opérationnels / N0) | Comptes d'effectifs sans duplication ; dislocation et regroupement transfèrent les moyens | Chapitre 08 É8 |
| Doctrine de combat | Cinq doctrines (à outrance, standard, prudente, défense ferme, retardement) + doctrines contraintes | Arbitrage Combat du 24 octobre |
| Consommation hebdomadaire | Quart de la consommation mensuelle ; chaîne de consommation fixée ; conditionne la disponibilité des PF | Arbitrages D1/D2 |

### 1.2 Leader

Le leader est une créature individualisée ; son pion regroupe leader, escorte et état-major ; ses caractéristiques personnelles restent distinctes de celles de ses accompagnateurs ; il conserve ses PV personnels et une résolution individuelle des blessures (les PV d'un leader ne se mélangent pas à ceux d'une cohorte).

| Valeur | Rôle dans la résolution | Source |
| --- | --- | --- |
| Habileté de combat (0 à 50) | Base du Bonus de commandement militaire (table 8.4.1.2 É7) | Chapitre 8 É7, à consolider |
| BCM, réparti en CDT + CDM + CDA | Plafond des assauts (CDT +3 = trois assauts), commandement en manœuvre et en action ; répartition standard ajustable par le MdM à la création | Arbitrage Combat du 24 octobre |
| Tactiques de général | Répertoire selon niveau et caractéristiques (analogue aux sorts d'un magicien), un à deux emplois par engagement | Arbitrage Combat du 24 octobre |
| Bonus de charisme (BC), réputation (BR), popularité (POP) | Facteurs de moral, d'adhésion, d'incidents diplomatiques | Relevé 8.4.1 É7 |
| CDS et CDD | Déplacement de stacks accompagnés, horodatage au jour | Relevé 8.4.1 É7 ; arbitrages temporels |
| Évaluation des forces | Contremesure du brouillard tactique (estimation des forces adverses) | Relevé 8.4.1.7 É7 |
| Valeur morale (VM), énergie (NE), faveur divine (PFD) | Facteurs de résolution (moral, sortilèges) | Relevé 8.4.1 É7 |

Semi-leaders et spécialistes (8.4.2 É7) : à relever — commandement partiel au sein d'un stack.

### 1.3 Stack

Le stack conserve les identités et caractéristiques des unités ; il ajoute un dispositif, des ordres communs et une organisation de commandement, sans créer d'effectifs ni de ressources. Valeurs consommées : leader de stack et chaîne de commandement, dispositif (formation), ravitaillement porté (chaîne de consommation fixée), posture et ordres communs avec cosignatures (contributions modifiables en secret jusqu'à l'échéance).

### 1.4 Structures de villes et de sièges

Depuis le chantier Siège : PF structurels et PF de tir des tours par côté (nature × qualité × état, garnison A à F), points de structure des côtés et des tours (dérivés, non stockés), machines de siège de l'assaillant (dégâts hebdomadaires datés), terrassement, brèche à PS = 0. La résolution de l'assaut consomme ces valeurs au même titre que les PF des unités (les milices et défenses intrinsèques de la ville É7 sont couvertes par la formule du chantier Siège).

### 1.5 Terrain et circonstances

Table unique d'effets de terrain (indexée par la forme appliquée, colonnes saisonnières), forme de l'engagement dérivée de la position de la fixation, EDT, moral, brouillard tactique et reconnaissance, vision (nuit, souterrain, sous-marine), magie (NFA, NFR, DI, NFS, grande magie datée). Ces valeurs sont des facteurs de la résolution, jamais des caractéristiques d'entité.

## 2. Format d'échange proposé

La résolution ne lit que des objets dérivés, jamais les sources : `pfEffectifs(camp) = Σ(PF disponibles des lots × qualité × doctrines × structures × terrain × moral × circonstances)`, chaque facteur exposant son agrégat et sa décomposition (principe des multiplicateurs : aucun plafonnement, l'application affiche la décomposition au joueur, le détail exact demeure au MdM). Les entités (unité, leader, stack, ville) produisent leurs valeurs par des fonctions de dérivation du moteur, dans l'esprit de `deriverPF(ville)` : le moteur calcule, les entités décrivent.

## 3. Points à compléter avant la résolution (ordre proposé)

1. Annexes de profils : conversion chiffrée des caractéristiques naturelles (Force, Dextérité, Constitution, Intelligence, Sagesse, Charisme) vers PF, protections et jets D20 — annoncées par le chapitre 08 É8, à rédiger.
2. PV : passer des PF É7 aux PV É8 (le chapitre 08 É8 exclut l'assimilation automatique) ; points de vie des lots (PV de référence × O/N0) et résolution individuelle des leaders.
3. Table des qualités consolidée (A à F) : coefficients, habiletés, équipement, baptême du feu ; recalcul des tables sur la base 28 jours.
4. Leaders : table BCM complète, répartition standard CDT/CDM/CDA, répertoire des tactiques de général (catalogue à composer), semi-leaders.
5. Stack : dispositifs et chaînes de commandement ; lien avec l'horodatage au jour des stacks accompagnés d'un leader.
6. Capacités spéciales : relevé exhaustif 8.1.3 É7 (27 capacités repérées) avec devenir É8.

## 4. Questions ouvertes

- La distinction lot/unité du chapitre 08 É8 (les lots ne créent pas d'unités pour les ordres) doit être reflétée dans la résolution : les pertes se répartissent-elles par lot ou par unité ?
- Les besoins (nourriture, eau, repos, entretien) étant définis indépendamment de la puissance de combat, la fatigue et le repos doivent-ils entrer comme facteurs de résolution, ou rester au seul ravitaillement ?
