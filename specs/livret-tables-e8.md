---
name: "livret-tables-e8"
title: "Le livret des tables — Édition 8, v0.1"
type: "text/markdown"
---

# Le livret des tables — Édition 8, v0.1 (28 octobre 2026, fin de soirée)

Statut : v0.1 — recueil créé par sentence de Francky du 28 octobre au soir : « la matrice terrain au livret des tables, je peux la transcrire seul ce soir ». CHARTE DU LIVRET : les CONSTANTES vivent au fichier de calibrage, les TABLES complètes vivent ICI — une table par section, avec sa source, son statut (CONSERVÉ natif, ARBITRÉ, PROPOSITION) et son point d'usage ; aucune valeur retouchée sans sentence (l'É7/E5 demeure le guide des valeurs). Première table coulée ce soir : LA MATRICE TERRAIN, transcrite intégralement du gestionnaire de combat, feuille Data.

## 1. La matrice terrain — vingt et une situations × onze colonnes

Source : le gestionnaire de combat V2, feuille Data. Statut : CONSERVÉ (transcription intégrale, vérifiée ligne à ligne le 28 octobre au soir). Usage : les PF effectifs du moteur de combat (proposition P3 arbitrée — PF du pipeline × EDT × terrain × situation, sans plafonnement, décomposition affichée).

| Situation | Flotte | Infanterie normale | Infanterie terrassée | Cavalerie légère | Cavalerie moyenne | Cavalerie lourde | Cavalerie très lourde | Cavalerie ultra lourde | Vol | Archer | Sous-marin |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Attaque de fortification | 0,5 | 1 | 0 | 0,8 | 0,8 | 0,9 | 0,9 | 1 | 0,3 | 0,2 | 0 |
| Attaque en ville | 0,3 | 1 | 0 | 1 | 0,9 | 0,8 | 0,7 | 0,6 | 0,1 | 0,2 | 0 |
| Colline | 0,8 | 1 | 1,7 | 2 | 2 | 2 | 2 | 2 | 0,3 | 0,5 | 0 |
| Combat aérien | 1 | 1 | — | 1,7 | 1,6 | 1,5 | 1,4 | 1,3 | 0 | 0,5 | 0 |
| Combat naval | 3 | 0,7 | 0 | 0,7 | 0,6 | 0,5 | 0,4 | 0,3 | 0,4 | 0,4 | 5 |
| Combat sous-marin | 1 | 0,5 | 0 | 1,7 | 1,6 | 1,5 | 1,5 | 1,4 | 0 | 0,1 | 0 |
| Défense de fortification | 0,3 | 1 | 0 | 0,3 | 0,3 | 0,3 | 0,3 | 0,3 | 0,5 | 0,6 | 0 |
| Défense en ville | 0,5 | 1,5 | 2 | 1 | 1 | 1 | 1 | 1 | 0 | 0,5 | 0 |
| Désert de sable | 1,5 | 1 | 1,3 | 0,9 | 0,8 | 0,7 | 0,6 | 0,5 | 0,4 | 0,3 | 0 |
| En souterrain | 0 | 1 | 2,5 | 0,5 | 0,4 | 0,3 | 0,2 | 0,1 | 0 | 0,2 | 0 |
| Éthéré ou Astral | 0 | 1 | 0 | 0,5 | 0,4 | 0,4 | 0,3 | 0,3 | 0 | 0 | 0 |
| Forêt claire | 0,6 | 1 | 1,6 | 0,8 | 0,8 | 0,8 | 0,8 | 0,8 | 0,2 | 0,3 | 0 |
| Forêt épaisse | 0,2 | 0,8 | 1,6 | 0,4 | 0,4 | 0,4 | 0,4 | 0,4 | 0 | 0 | 0 |
| Forêt moyenne | 0,4 | 0,9 | 1,8 | 0,6 | 0,6 | 0,6 | 0,6 | 0,6 | 0,1 | 0,2 | 0 |
| Haute montagne | 0 | 0,7 | 1,4 | 0,3 | 0,2 | 0,1 | 0 | 0 | 0,3 | 0,5 | 0 |
| Jungle | 0,1 | 0,7 | 1,4 | 0,3 | 0,3 | 0,3 | 0,3 | 0,3 | 0 | 0 | 0 |
| Marais | 1,5 | 0,5 | 1 | 0,3 | 0,2 | 0,1 | 0 | 0 | 0 | 0 | 0,2 |
| Montagne | 0 | 0,9 | 1,8 | 0,4 | 0,3 | 0,2 | 0,1 | 0 | 0,3 | 0,5 | 0 |
| Prairie ou Plaine | 1 | 1 | 1,5 | 2 | 2,5 | 3 | 3 | 3,5 | 0,4 | 0,4 | 0 |
| Sur un fleuve | 2 | 0,7 | 0 | 0,7 | 0,6 | 0,5 | 0,4 | 0,3 | 0 | 0 | 0 |
| Très haute montagne | 0 | 0,5 | 1 | 0,2 | 0,1 | 0 | 0 | 0 | 0,3 | 0,5 | 0 |

### La lecture de la matrice

Les quatre situations d'assaut (attaque et défense de fortification, attaque et défense en ville) punissent le large et récompensent l'infanterie : l'attaque de fortification divise la flotte par deux et l'archer par cinq, la défense en ville double l'infanterie terrassée et annule le vol. La plaine est le paradis de la cavalerie — légère ×2, ultra lourde ×3,5 — pendant que la jungle l'écrase à 0,3. Les milieux punitifs : le souterrain (cavalerie ultra lourde 0,1, vol 0), la très haute montagne (cavalerie lourde et au-delà : 0), l'éthéré (flotte et vol : 0). Les combats d'environnement : naval (flotte ×3, sous-marin ×5, la cavalerie débandée à 0,3-0,7), aérien (les cavalerie-like de l'air à 1,3-1,7), sous-marin (0,5-1,7). L'infanterie terrassée règne en souterrain (2,5) et en défense de ville (2) — le génie a ses tables.

### Les codes de l'outil (consignés pour l'application)

Type Infanterie : Cav 0, Flt 2, Norm 3, Ter 4. Type Cavalerie : Dmnt 0, Lg 5, Moy 6, Ld 7, TLd 8, ULd 9. Indicateur Rep : Y/N. Ce sont les index de la feuille Data — l'application É8 les reprend tels quels pour sa table de correspondance.

## 2. Notes de transcription

1. Valeurs telles quelles, aucune retouche — le guide des valeurs s'applique à la table entière ; toute modification passera par sentence ET par le pipeline.
2. La cellule « infanterie terrassée » du combat aérien est vide dans l'outil (marquée « — ») : l'outil n'y attend aucune valeur, transcription fidèle.
3. La lecture des colonnes Vol et Archer : en première lecture ce sont des multiplicateurs d'efficacité propres à l'avantage (attaque de fortification : vol 0,3, archer 0,2 ; défense : 0,5 et 0,6 ; plaine : 0,4 et 0,4) ; le combat aérien porte vol 0 et archer 0,5 — l'avantage de vol y semblerait annulé et l'archer réduit de moitié. L'AUTEUR de l'outil est Francky : la confirmation de cette lecture est demandée au prochain passage — aucune valeur ne bouge en attendant.
4. La matrice est le pendant opérationnel de la section des règles « Effets des terrains sur les combats » (point 3.1.2.13 du manuel) : la passe de réconciliation texte/table reste à faire.
5. La matrice alimente les PF effectifs du moteur de combat (P3 arbitrée le 28 octobre au soir) et sera lue telle quelle par le moteur de résolution du portail — le gestionnaire la pratique déjà.

## 3. Passes suivantes

1. La confirmation de la lecture des colonnes Vol et Archer par Francky (l'auteur de l'outil).
2. La réconciliation avec la section « Effets des terrains sur les combats » du manuel (texte contre table).
3. Les autres tables à couler au livret, chacune avec sa source et son statut : la table des NDB du rapport de force (24 paliers — constante et formule au fichier de calibrage, la table complète ici), la table des NDB de rencontre (PST +16 à −50), les CAP/RAP du piétinement, la QSME, les modificateurs de mort de leader, les tables de dissolution (unités, guildes, villes), les tables d'événements aléatoires E5, les bases de jets des guildes (relevées au chantier Bas-fonds).
