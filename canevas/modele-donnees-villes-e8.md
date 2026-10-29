---
name: "modele-donnees-villes-e8"
title: "Modèle de données — Villes (Édition 8), v0.1"
type: "text/markdown"
---

# Modèle de données — Chantier Villes (Édition 8), v0.1

Consolidation du modèle de données des villes pour le moteur applicatif. Il agrège les arbitrages de la spécification v0.2 et aligne les formats sur les exports réels des maquettes (outil Quartiers, éditeur de carte). C'est la référence d'implémentation du module « Villes » du moteur, consommé par l'éditeur de carte, l'application MdM et l'application joueur.

## 1. Conventions géométriques partagées

- Hexagones pointy-top, odd-r ; voisinage par tables paires/impaires (E, NE, NO, O, SO, SE).
- Convention d'angles dans le repère SVG (y vers le bas) : E 0°, SE 60°, SO 120°, O 180°, NO 240°, NE 300°. Référence corrigée du 25 octobre 2026 — tout le projet s'y conforme.
- Nœuds de la géométrie : centre d'hexagone (C), milieu d'arête (A), sommet (S). Clés canoniques : `C{c},{r}` ; `A{c},{r}{côté}` ; sommets par `{c},{r},{angle}`.
- Clés de côté : périmètre `{c},{r},{côté}` ; intérieur `{qkA}|{qkB}` avec les deux quartiers triés — clé canonique, ordre indifférent à la lecture.

## 2. Entités

### 2.1 Ville

| Champ | Type | Description |
| --- | --- | --- |
| id | string | identifiant stable |
| nom | string |  |
| niveau | 0–12 | posé par le MdM (émergence reportée au chantier économie) |
| regions | [(c, r)] | emprise : 1 / 3 / 4 / 7, validée par le module d'emprise |
| sousMarine | bool | toutes les régions en mer |
| quartiers | map (c,r) → Quartier | un par région |
| rues | [Rue] | polylignes saisies |
| fortifications | map cléDeCôté → état | voir 2.5 |
| ports | map cléDeCôté → état | côtés terre-eau uniquement |
| tours | [Tour] | posées une à une |
| graineRemplissage | int | déterminisme du remplissage décoratif |

Données dérivées (jamais saisies, recalculées) : entrées, portes intérieures, bande de rue par quartier, rives des quartiers lacustres, cellules libres.

### 2.2 Quartier

| Champ | Type | Description |
| --- | --- | --- |
| region | (c, r) | la région de l'emprise |
| typeSol | terre \| eau | dérivé du terrain ; eau → quartier lacustre ou sous-marin |
| grille | GrilleFine | voir 2.3 |
| constructions | [Construction] |  |

### 2.3 Grille fine

- Carrée, 7 × 7 dans la maquette (ordre à figer au prototype de rendu).
- Cellules indexées (i, j), centre en coordonnées locales ; les cellules partiellement recouvertes par l'hexagone sont retenues (demi-cases), découpées au contour au rendu.
- Occupation : cellule libre, occupée par une construction, ou cellule de rue (bande d'environ une cellule et demi autour du tracé).

### 2.4 Construction

| Champ | Type | Description |
| --- | --- | --- |
| id | string | unique, jamais réutilisé (compteur global) |
| type | string | carte du catalogue |
| classe | Institution \| Courant \| Monument \| Ouvrage de contact | dérivée du catalogue |
| cellules | [(i, j)] | n cellules contiguës pour un niveau n ; orthogonalité pour l'extension |
| niveau | int |  |
| etat | intact \| endommagé \| ruine | posé à l'initialisation de partie ; modifie l'apparence |
| proprietaire | string | distinct du contrôleur de la ville (puissance, culte, guilde) |

### 2.5 Fortifications, portes, ports, tours

| Objet | Clé | États |
| --- | --- | --- |
| Côté (périmètre ou intérieur) | `{c},{r},{côté}` ou `{qkA}\|{qkB}` | aucun, mur, citadelle (défauts : périmètre mur, intérieur aucun) |
| Porte (entrée extérieure ou porte intérieure) | clé du côté traversé | ouverte, fermée, barricadée |
| Côté terre-eau | `{qkA}\|{qkB}` avec une région d'eau | aucun, port n1, port n2, port n3, port fortifié (NFPM) |
| Tour | `{c},{r},{angle}` (sommet) | type : guet, archers, artillerie, mage, sous-marine |

Règles : une porte est dérivée d'une rue traversant un côté fortifié ; les côtés terre-eau n'ont pas le cycle rempart et pas de porte dérivée ; les tours se posent une à une.

### 2.6 Quai (ouvrage de contact du quartier lacustre)

- Une instance unique par région d'eau ; c'est une Construction (classe Ouvrage de contact) posée sur la grille fine.
- Pose initiale : cellule de rive (bande le long des côtés non adjacents à une autre région d'eau).
- Extension : toute cellule libre orthogonalement adjacente au quai existant (pontons).
- Niveau maximum : double du niveau de la ville ; la somme des niveaux des constructions aquatiques du quartier (classe ≠ Ouvrage de contact) ne peut excéder le niveau du quai.
- Le premier aménagement d'un port exige un quai.

### 2.7 Rue

| Champ | Type | Description |
| --- | --- | --- |
| id | string |  |
| noeuds | [clé de nœud] | centres et milieux d'arête ; tronçon direct centre-centre admis entre quartiers voisins (porte intérieure implicite) |

Dérivations : entrées (côtés du périmètre traversés), portes intérieures (côtés intérieurs fortifiés traversés), bande de rue par quartier.

### 2.8 Lieux remarquables hors des villes (éditeur de carte)

| Champ | Type | Description |
| --- | --- | --- |
| region | (c, r) | une région hors ville, terrestre |
| emplacement | C \| E \| NE \| NO \| O \| SO \| SE | centre ou côté ; sept emplacements par région |
| type | string | château, tour, ruine, mine, sanctuaire, dépôt relais, dépôt relais entrepôt… |
| niveau | int | 2 pour les dépôts relais ; à généraliser par sélecteur |

Contraintes : une région urbaine n'accueille pas d'autre lieu ; une ville exige des régions entièrement libres ; les dépôts relais exigent une voie carrossable (route ou chemin) traversant ou longeant la région.

## 3. Invariants (contrôles de cohérence du module)

1. Emprise valide (1/3/4/7, orientations symétriques, pose guidée ou automatique) ; quota d'eau : 1 région de mer (3–4 régions), 3 (7 régions) ; ville sous-marine : tout en mer.
2. Un édifice de niveau n occupe exactement n cellules contiguës et libres, dans une seule région ; extension orthogonale.
3. Classes d'emprise : Institution — une instance par quartier, niveaux bornés par le nombre de quartiers, somme des niveaux d'un même type dans la ville ≤ nombre de quartiers ; Courant — une instance par quartier, cartes de stockage bornées au double du niveau de la ville ; Monument — un seul par ville ; bornes croisées É7 (banque et comptoir ≤ moitié du marché).
4. Bande de rue inconstructible, sauf marché et place.
5. Quartier lacustre : sans quai, aucune construction ; sous-catalogue aquatique uniquement ; somme des niveaux aquatiques ≤ niveau du quai.
6. Constructions terrestres interdites en quartier lacustre, constructions aquatiques interdites en quartier terrestre.
7. Ports uniquement sur les côtés terre-eau ; premier aménagement conditionné au quai de la région d'eau.
8. Entrées et portes intérieures toujours dérivées des rues ; une ville sans entrée reçoit un avertissement non bloquant.
9. Identifiants uniques et non réutilisés (constructions, rues, tours).
10. États de construction ∈ {intact, endommagé, ruiné} ; états de porte ∈ {ouverte, fermée, barricadée}.

## 4. Interface du module moteur

Module unique, consommé par l'éditeur de carte (création) et l'application MdM (cours de partie) — contraintes identiques des deux côtés.

- `validerEmprise(depart, niveau, sousMarine)` → orientations possibles, contrôle des quotas d'eau.
- `deriverRues(ville)` → entrées, portes intérieures, bandes de rue par quartier.
- `deriverRives(quartierLacustre)` → bande de cellules de rive.
- `controlesPose(ville, quartier, construction, cellule)` → refus motivé ou acceptation.
- `controlesCoherence(ville)` → liste d'invariants vérifiés (affichée par les interfaces).
- `remplissageDecoratif(ville, graine)` → cellules libres → silhouettes neutres (habitat, commerces, tavernes), déterministe par graine enregistrée.
- `exporter(ville)` / `importer(json)` → sérialisation de référence.

## 5. Sérialisation de référence

Alignée sur l'export de l'outil Quartiers (sections : ville avec id, sousMarine, regions, regionsEau, quais et graineRemplissage ; constructions avec id, cellules, niveau, etat, proprietaire ; rues ; entrees ; portesInterieures ; fortifications ; ports ; tours) et celui de l'éditeur de carte (hexes avec lieux par emplacement, villes avec id et graineRemplissage, lineaires classifiés, provinces, royaumes, empires). Les exports des maquettes ont été harmonisés sur le présent document le 25 octobre 2026.

## 6. Évolution prévue

- Chantier Siège : endommagement en cours de partie, états de fortifications, franchissement des portes.
- Chantier économie : coûts, capacités, calibrage des bornes (dont les niveaux du port, les règles Édition 7 demeurant la référence en attendant).
- Chantier rendu : ordre définitif de la grille fine, largeur de bande de rue liée à l'importance de la rue, silhouettes par état.
