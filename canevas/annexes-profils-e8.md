---
name: "annexes-profils-e8"
title: "Annexes de profils — conversion des caractéristiques (Édition 8), v0.1"
type: "text/markdown"
---

# Annexes de profils — conversion des caractéristiques vers PF, PV et jets D20 (Édition 8), v0.1

## Objet

Le chapitre 08 « Les unités » (É8) renvoie aux annexes de profils la conversion chiffrée des caractéristiques naturelles vers les PF, les protections et les jets D20. La présente annexe établit cette conversion en relevé de l'outil de calcul É7 (classeur « calcul des PF des unités ») et en propositions É8. Elle alimente le contrat d'interface Unités et Leaders ; conformément à l'arbitrage du 25 octobre, la résolution ne consomme que les valeurs dérivées produites ici, jamais les niveaux ou caractéristiques bruts.

## Relevé É7 — paramètres de la conversion (classeur de calcul)

Paramètres relevés dans le classeur É7 :

- NH : niveau d'habileté en combat de base, 0 au minimum (certaines créatures ont un niveau minimum imposé par leur nature).
- PP : puissance physique comparativement à la taille (un génie musculeux vaut 2).
- TC : taille, calculée comme la racine cubique de la masse — ce qui permet d'estimer les créatures ailées.
- QE : qualité de l'équipement, indicative (équipement habituel de la créature) ; multiplicateurs par qualité de l'échelle A à F.
- NM : niveau de magie sans équipement, augmenté par les armes et armures magiques.
- BF : baptême du feu (participation certaine à un combat où la vie était en jeu).
- Herbivore : PST multiplié par deux.
- Base de calcul : force et PST estimés pour 1000 individus ; nombre de créatures par unité selon le nom d'unité (table 2 du classeur).
- Multiplicateurs de base distincts pour une créature en unité et une créature seule ; multiplicateur d'équipage par rapport à l'infanterie légère ; armures : QE minimum et multiplicateur aux PMV, pour le cavalier et la monture séparément (tables 1 et 3).
- EDT : coefficient d'efficacité des troupes, indicatif, n'entre dans aucune formule du classeur — en É8 il demeure un facteur de résolution, jamais une caractéristique (cohérent avec le contrat).

## Architecture de la conversion É8 (proposition)

La conversion est un pipeline à quatre étages ; chaque étage expose son produit (principe : agrégat et décomposition affichés, aucun plafonnement).

### Étage 1 — Nature (le profil)

PF de base par individu = PP × g(TC), g étant calibrée pour qu'un humain adulte vaille la référence 1 ; la racine cubique de la masse donne la taille des créatures ailées et colossales sans les surpayer. PV de l'individu = h(masse, PP), les herbivores doublant leur PV (relais É7 du PST ×2). Les caractéristiques mentales (Intelligence, Sagesse, Charisme) n'entrent pas dans les PF : elles nourrissent les habiletés, le commandement et la magie (fiches de profession).

### Étage 2 — Expérience (le lot)

NH du lot, issu de l'entraînement ou imposé par la nature, se projette sur l'échelle des qualités A à F (Bleu à Exception, habiletés 5 à 37) : coefficient de qualité multiplicateur des PF. Le baptême du feu (dès le vétéran) demeure une donnée binaire du lot, à intégrer dans la table qualité.

### Étage 3 — Équipement (le matériel)

Multiplicateur de qualité d'équipement (nul jusqu'au vétéran, 2,0 en Elite, 6,0 en Super-élite, 8,0 en Exception — table É7 à consolider) ; armes et armures magiques ajoutant du NM, avec la règle É7 d'armement magique minimum par qualité (table 1 du classeur). Distinction maintenue entre nature, expérience et matériel : aucun avantage compté deux fois.

### Étage 4 — Unité (l'agrégat)

PF de référence du lot = PF de base × effectif × coefficient d'expérience × coefficient d'équipement, la base 1000 individus servant d'unité de mesure (relais É7). Le PST du lot (points de structure, vaisseaux et convois) suit la même agrégation ; les PV du lot = PV de l'individu × opérationnels. PF disponibles = PF de référence × PV actuels / PV maximum.

### Jets D20 (actions individuelles)

Les caractéristiques F/D/C/I/S/Cha, sur l'échelle des profils, se convertissent en modificateurs D20 pour les actions individuelles : leaders (résolution individuelle des blessures, habiletés), unités spéciales et capacités hors combat de masse. La résolution de masse ne les consomme jamais ; elle ne lit que les PF, PST, PV et coefficients dérivés ci-dessus.

## Interface machine

Fonctions de dérivation du futur module moteur-unites : `deriverPFBase(profil)` (étage 1), `deriverLot(profil, lot)` (étages 2 à 4, PF de référence, PV, PST), la résolution consommant uniquement ces sorties. Le classeur É7 demeure la référence de calibrage : toute valeur É8 devra reproduire les ordres de grandeur du classeur pour les unités terrestres et navales standards avant d'être arbitrée.

## Calibrages et questions ouvertes

1. Fonction g(TC) : la racine cubique de la masse É7 est le point de départ ; il faut trancher la pente exacte (linéaire en TC, en TC², autre) en calibrant sur l'humain et le cheval (lignes de référence du classeur).
2. Table qualité consolidée : intégrer BF (binaire) et QE (multiplicateurs) dans une table unique A à F, à consolider depuis la table 1 du classeur.
3. Multiplicateur créature en unité / créature seule : relevé des valeurs É7, devenir É8 à trancher.
4. Armures : multiplicateurs aux PMV par type et qualité minimum par catégorie — à transposer en une table unique (principe de la table unique d'effets).
5. NM et armement magique : borne de l'apport des objets magiques au NM, lien avec le chapitre Magie.
