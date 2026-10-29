---
name: "specification-villes-e8"
title: "Spécification — Chantier Villes (Édition 8), v0.2"
type: "text/markdown"
---

# Chantier Villes — Spécification v0.2

## 1. Périmètre et principes

Ce chantier couvre le détail interne des villes du Wargame « Mondes Fantastiques » Édition 8 : quartiers, constructions, rues principales, entrées et fortifications. Il s'appuie sur les arbitrages suivants, tous consignés dans la connaissance du projet.

Principes directeurs :

1. Une ville comporte autant de quartiers que de régions de son emprise (1, 3, 4 ou 7 selon le niveau 0 à 12).
2. Le placement des constructions s'effectue sur une grille fine interne à chaque région.
3. Le catalogue des constructions dérive des édifices de l'Édition 7, avec renommage et mise en cohérence.
4. Le niveau de la ville demeure une donnée posée par le MdM dans ce premier incrément ; l'émergence du niveau depuis les quartiers sera étudiée avec le chantier économie.
5. Le module de calcul d'emprise, les quotas d'eau et les contrôles de cohérence sont un module unique du moteur applicatif, partagé entre l'éditeur de carte et l'interface du MdM.

## 2. Modèle de données

### 2.1 Ville

Chaque ville possède : identifiant, nom, niveau (0 à 12), liste des régions de l'emprise, indicateur sous-marin, et une structure interne par quartier.

```
Ville
├── id, nom, niveau, sousMarine
├── regions : [ (c, r), … ]              // emprise, 1 / 3 / 4 / 7
├── quartiers : { (c, r) → Quartier }
├── rues : [ Rue ]                        // polylignes sur la géométrie de la grille
├── entrees : [ Entrée ]                  // dérivées automatiquement des rues
└── fortifications : { côté de région → état }
```

### 2.2 Quartier

Chaque quartier correspond exactement à une région de l'emprise.

- Sol : dérivé automatiquement du terrain de base de la région. Un quartier issu d'une région d'eau devient un quartier lacustre ou portuaire ; le rendu final en tient compte ( pilotis, quais).
- Grille fine : subdivision interne de la région, carrée (7 × 7 dans la maquette, à figer lors du prototype de rendu) ; les cellules partiellement recouvertes par l'hexagone sont retenues et découpées au contour au rendu (demi-cases des bords), la grille épouse ainsi exactement la forme de la région.
- Constructions : liste d'objets `{ type, cellules de la grille fine occupées, orientation, état, propriétaire }` ; le propriétaire est distinct du contrôleur de la ville (comptoir étranger, ambassade, temple d'une autre religion, établissement de guilde).
- État : intact, endommagé, ruiné — disponibles dès ce modèle, posés à l'initialisation de la partie, modifiant l'apparence au rendu ; l'endommagement en cours de partie relève du chantier Siège.

### 2.3 Rue principale et entrées

- Une rue principale est une polyligne sur les nœuds de la géométrie hexagonale déjà arbitrée (centres, milieux d'arête, sommets), contrainte à rester à l'intérieur de l'emprise de la ville.
- Chaque côté d'une région de l'emprise traversé par une rue principale devient une entrée, nommée et typée (porte charretière, poterne, porte de marché).
- Les entrées sont dérivées, jamais saisies : toute modification de rue recalcule la liste des entrées.
- Une ville sans fortification admet plusieurs rues ; une ville fortifiée concentre en principe ses entrées sur ses portes.

### 2.4 Fortifications

État par côté des régions périphériques de l'emprise :

| État | Effet de traversée du côté |
| --- | --- |
| Aucun rempart | Traversée libre |
| Mur simple | Traversée impossible, sauf action spéciale |
| Mur et tours | Traversée impossible, sauf action spéciale ; défense améliorée |
| Citadelle | Traversée impossible, sauf action spéciale ; défense maximale |

Un côté portant une entrée fortifiée est une porte : franchissable mais contrôlable (ouverte, fermée, barricadée). Les états de porte sont des données de partie, modifiées en cours de jeu par le MdM ou les joueurs selon les règles du chantier Siège.

Tours de défense : les tours ne sont pas dérivées automatiquement du périmètre ; elles se posent une à une par le MdM, aux sommets du périmètre ou le long d'un côté, depuis la carte « Tour de défense » du catalogue. Le type de tour détermine le moyen de défense apporté au côté concerné : tour de guet (détection et signal), tour d'archers (défense terrestre, contribue au NFR du côté), tour d'artillerie (engins, contribue à la DI de la ville), tour de mage (défense aérienne, NFA), tour sous-marine (NFS). L'état « mur et tours » d'un côté devient donc la somme du rempart posé et des tours choisies par le MdM.

Fortifications intérieures (arbitrage du 25 octobre 2026) : les côtés partagés par deux quartiers de la ville se fortifient comme les côtés du périmètre (aucun, mur simple, citadelle) ; l'état par défaut est « aucun ». Une rue principale traversant un côté intérieur fortifié y passe par une porte intérieure, dérivée automatiquement du tracé comme les entrées extérieures, avec les mêmes états (ouverte, fermée, barricadée). Une porte intérieure fermée ou barricadée coupe la circulation inter-quartiers. Cela permet au MdM de tracer des lignes de défense internes, d'isoler un quartier (réduit urbain, citadelle intérieure, ghetto) et de créer des villes à plusieurs cercles de murs.

### 2.5 Quartiers lacustres et installations portuaires

Une région d'eau de l'emprise forme un quartier lacustre (ou sous-marin pour une ville sous-marine). La chaîne portuaire est régie par la règle du quai :

1. Sans quai, on ne construit que sur les régions de terre de la ville.
2. Le quai se pose sur la grille fine du quartier lacustre, sur une cellule de rive — proche d'un côté de la région d'eau non adjacent à une autre région d'eau de l'emprise (berges internes et littoral extérieur ; seul un côté vers une autre région d'eau, cas d'un fleuve traversant la ville, n'est pas une rive). Le ruban des rives fait le tour complet de la région : le quai ne peut être en impasse.
3. L'extension du quai se fait sur toute cellule libre orthogonalement adjacente au quai existant (pontons et appontements s'avancent sur l'eau). Son niveau maximum est le double du niveau de la ville ; chaque niveau ajoute une cellule contiguë.
4. La somme des niveaux des constructions aquatiques du quartier (chantier naval, entrepôt sur pilotis) ne peut dépasser le niveau du quai.
5. Les côtés partagés entre le quartier lacustre et un quartier terrestre portent les ouvrages de contact — cycle aucun → port n1 → port n2 → port n3 → port fortifié (fortification portuaire, NFPM) — le premier aménagement exige un quai ; ces côtés n'ont pas le cycle rempart standard et les portes dérivées des rues ne s'y appliquent pas. Les niveaux du port reprennent ceux de l'Édition 7, qui demeure la référence pour cette partie ; le réajustement des bornes interviendra à l'affinement.
6. La tour sous-marine (NFS) se pose aux sommets comme les autres types de tours.

## 3. Interface de saisie (outil Quartiers)

L'interface s'ouvre depuis l'éditeur de carte (double-clic sur une ville) et, à terme, depuis l'application du MdM en cours de partie. Les deux consomment le même module du moteur.

### 3.1 Écrans

1. Vue ville : l'emprise vue de dessus, un quartier sélectionné à la fois ; panneau latéral des propriétés (nom, niveau, sous-marin, sol de chaque quartier).
2. Vue quartier : la grille fine affichée en surimpression de la région ; palette des constructions ; pose par clic et glissement, rotation par touche, effacement par gomme.
3. Vue rues : tracé des rues principales par les nœuds de la géométrie, mêmes interactions que les éléments linéaires de l'éditeur de carte ; les entrées détectées s'affichent en direct.
4. Vue fortifications : clic sur chaque côté d'une région périphérique pour en changer l'état ; les côtés d'entrée proposent le type de porte.

### 3.2 Contrôles de cohérence à la pose

- Une construction ne peut recouvrir que des cellules libres de la grille fine, dans une seule région.
- Un édifice de niveau n occupe n cellules contiguës de la grille fine : la pose initiale place la première cellule, chaque montée de niveau se fait en cliquant une cellule libre orthogonalement adjacente (candidates surlignées). L'emprise au sol est indépendante des bornes de niveaux des classes d'emprise (Institution, Courant, Monument) et des bornes croisées des règles.
- Classes d'emprise : Institution — une instance par quartier maximum, niveaux bornés par le nombre de quartiers, la somme des niveaux d'un même type dans la ville étant également plafonnée au nombre de quartiers ; Courant — une instance par quartier, niveaux libres (cartes de stockage bornées au double du niveau de la ville) ; Monument — un seul par ville. Bornes croisées de l'Édition 7 conservées (banque et comptoir plafonnés à la moitié du marché).
- Les cellules traversées par une rue principale sont inconstructibles (bande d'environ une cellule et demi, dérivée du tracé) — le MdM peut néanmoins y poser une construction de type place ou marché, qui reste compatible avec la rue.
- Les constructions d'un quartier lacustre proviennent du sous-catalogue aquatique (chantier naval, entrepôt sur pilotis), conditionnées par le quai et plafonnées par son niveau ; les constructions terrestres y sont refusées, les constructions aquatiques sont refusées en quartier terrestre.
- Le nombre total de constructions n'est pas plafonné dans ce premier incrément ; un plafond par quartier relié à la population et au chantier économie sera étudié ensuite.
- Avertissement informatif (non bloquant) : une ville dont aucune rue ne traverse un côté de son emprise n'a aucune entrée, donc aucun accès terrestre régulier.

### 3.3 Décomposition du travail

Incrément V1 (objet de la maquette jointe) : quatre quartiers, grille fine, constructions schématiques, une rue principale à deux entrées, remparts sur les côtés fortifiés avec tours, rendu isométrique été.

Incréments suivants : catalogue complet dérivé de l'Édition 7 (réalisé — voir le catalogue joint), sous-catalogue lacustre et sous-marin (réalisé dans la maquette de l'outil Quartiers : règle du quai, chantier naval, entrepôt sur pilotis, ports et fortification portuaire sur les côtés terre-eau, tours sous-marines), états endommagé et ruiné (réalisés au niveau du modèle et de la maquette), portes à états, saisonnier du rendu, intégration éditeur de carte.

## 3.4 Lieux remarquables hors des villes

Les lieux multiples hors des villes (arbitrage du 25 octobre 2026) relèvent de l'éditeur de carte mais complètent le dispositif urbain : une région qui n'appartient pas à une ville accueille jusqu'à sept lieux — un au centre, six sur les côtés — l'emplacement (centre ou côté) se choisissant librement, ce qui permet par exemple de placer un dépôt relais du côté de sa route. Le dépôt relais et le dépôt relais entrepôt (niveau 2, famille Logistique) exigent une voie carrossable (route ou chemin) traversant ou longeant la région ; une ville exige des régions entièrement libres et une région urbaine n'accueille pas d'autre lieu.

## 4. Catalogue des constructions (dérivation de l'Édition 7)

Méthode : relever les édifices constructibles de l'Édition 7 (systèmes de construction et de commerce), renommer et regrouper par famille, puis geler après validation. Le relevé complet est réalisé dans le canevas « Catalogue des constructions — relevé Édition 7 vers Édition 8 » : dix familles, environ trente cartes, silhouettes de rendu et points ouverts. Les familles initialement pressenties sont conservées à l'exception de l'habitat, qui demeure décoratif et dérivé du niveau de la ville.

| Famille | Exemples d'édifices | Rôle mécanique pressenti |
| --- | --- | --- |
| Habitat | maisons, immeubles, résidences | population, garnison |
| Nourriture | marché, grenier, moulin | ravitaillement |
| Artisanat et commerce | atelier, entrepôt, comptoir, échoppe | production, échanges |
| Culte | temple, sanctuaire urbain | magie, faveurs |
| Guerre | caserne, arsenal, donjon, tour de guet | levée, défense |
| Fortification | mur, tour, porte, citadelle | contrôle des côtés |
| Connaissance | bibliothèque, académie, tour de mage | magie, hautes magies |
| Eau et port | puits, citerne, quai, chantier naval | accès aquatique |

Le relevé exact depuis les Règles Édition 7 est fait (voir le catalogue joint) ; les fiches détaillées (coûts, capacités, prérequis) relèvent du chantier économie.

## 5. Rendu final

- Chaque construction de la grille fine produit une silhouette dans le rendu isométrique 3D : la maquette jointe démontre le principe sur un schéma simple.
- Le remplissage des cellules libres par l'habitat et les structures neutres (commerces, boutiques, tavernes, ateliers) est déterministe : même ville, même rendu à chaque génération, au moyen d'une graine enregistrée avec la ville. Le MdM ne détermine que ce qui est remarquable.
- L'état de chaque construction (intact, endommagé, ruiné) module sa silhouette.
- Le sol de chaque quartier module le rendu (quartier lacustre : pilotis et quais).
- Les remparts suivent les côtés fortifiés des régions périphériques, avec tours aux sommets partagés par deux côtés fortifiés.
- Les entrées se matérialisent par une interruption du rempart et un édifice de porte.
- Les quatre saisons s'appliquent comme au reste de la carte.

## 6. Points ouverts

- Nombre maximal de rues principales par ville, s'il doit être plafonné ; statut des rues dans un quartier lacustre.
- Lien précis entre niveau de la ville et nombre de constructions admissibles (chantier économie) ; réajustement des bornes portuaires après affinement (les règles Édition 7 demeurent la référence en attendant).
- Emprise des franchissements (pont, gué) dans les quartiers lacustres et sous-marins.
- Combat intra-urbain au siège, connaissant les portes intérieures et la géométrie des quartiers (chantier Siège).
