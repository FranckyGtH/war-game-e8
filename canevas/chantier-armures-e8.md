---
name: "chantier-armures-e8"
title: "Chantier Armures et Armes (Édition 8), v0.6"
type: "text/markdown"
---

# Chantier Armures et Armes — absorption de marge, étage armement, revue de conformité (Édition 8), v0.6 (matrices revues : naturelles en équivalents, magie plate +1 à +5, le 26 octobre 2026)

## Principe directeur du projet (rappelé par Francky le 26 octobre 2026)

Les règles É7 sont un guide pour les valeurs, non un calque : leur résolution reposait sur un jet de dé unique et agrégé, alors que l'É8 résout par jets multiples par unité, pools de défense minorés et marges modulant les pertes. Toute règle transposée doit être reformulée dans le langage natif de la résolution É8 (jets, pools, marges) et non copiée dans sa forme agrégée. Le multiplicateur de PF défensifs de la v0.1 est abandonné au titre de ce principe.

## Mécanisme arbitré : absorption de marge

L'armure n'agit ni sur les jets, ni sur les PF, ni sur l'EDT : elle réduit la marge de chaque attaque subie. Après le duel de jets d'attaque et de défense, la marge de l'attaque est réduite d'un nombre de points d'absorption égal à la protection du défenseur ; la marge résiduelle est convertie en perte de PF selon la règle de résolution. Une marge réduite à zéro ou moins signifie que le coup ne pénètre pas.

Séparation des rôles (aucun registre ne double un autre) : la qualité donne les jets, l'entraînement donne l'EDT, l'armure donne l'encaissement.

Interactions natives :

1. Duel de jets inchangé : l'armure s'applique après le duel ; minoration cumulée des défenses et planchers inchangés.
2. Attaques non couvertes : l'absorption s'applique aussi aux pertes issues de la défense passive de formation — l'armure protège même la formation surprise.
3. Morts et blessés : la marge résiduelle alimente la ventilation des pertes en morts et blessés ; une armure lourde transforme mécaniquement des morts en blessés (bénéfice narratif constant).
4. Armes contre armures : à l'étage armement, des armes pénétrantes (features déclarées) réduiront ou ignorent l'absorption — l'interaction se traitera par capacités, jamais en dur.
5. Coques : l'extension aux coques (navires, engins de siège) transposera l'absorption aux PSTR sur le même schéma.

## Matrice type × qualité — points d'absorption de marge

Chaque armure déclarée porte l'un des trois types portés (léger, moyen, lourd) avec une qualité (A à F) ; l'armure naturelle est traitée comme l'équivalent d'un de ces trois types selon la créature ; le bonus magique est une échelle plate, indépendante de la qualité (révision de Francky du 26 octobre 2026 soir) :


| Absorption (points de marge) | A                                                                                                                        | B   | C   | D   | E   | F   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --- | --- | --- | --- | --- |
| Légère                       | 1                                                                                                                        | 2   | 3   | 4   | 6   | 8   |
| Moyenne                      | 2                                                                                                                        | 3   | 4   | 5   | 7   | 10  |
| Lourde                       | 3                                                                                                                        | 4   | 5   | 6   | 8   | 12  |
| Naturelle                    | équivalent d'un des trois types portés, selon l'espèce, avec une qualité par espèce (exemples : dragon = lourde qualité F (12), rhinocéros = moyenne qualité D (5), cheval = légère qualité C (3), humain = aucune) |     |     |     |     |     |

L'armure magique ne figure pas dans la matrice : elle porte un bonus plat de +1 à +5 selon son niveau d'enchantement (niveaux 1 à 5, en ligne avec les règles É7), indépendant de toute qualité — elle s'ajoute à l'armure portée et à l'armure naturelle.


## Règle d'empilement (arbitrée le 26 octobre 2026)

L'armure naturelle, l'armure magique et une seule des trois armures portées (légère, moyenne ou lourde) s'ajoutent : absorption totale = naturelle + magique + armure portée.

Exemples : un chevalier en lourde qualité C (5) avec une magique qualité B (6) absorbe 11 points de marge par attaque ; un dragon portant une naturelle de 10 au catalogue en absorbe 10 ; une levée de miliciens en légère qualité B absorbe 1.

## Règles d'accompagnement

1. Contreparties : l'armure lourde pénalise la mobilité et le PMV (charges, terrains difficiles, chaleur) — valeurs à caler au chantier mouvement.
2. L'armure magique suit la table magie (niveau d'enchantement, coût, entretien) — relais chantier magie.
3. L'armure naturelle est une donnée d'espèce, calée au catalogue des races, cumulable aux équipements portés.
4. La qualité d'armure évolue avec l'usure, l'entretien et les acquisitions (registre économique) ; features de culture ou de guilde peuvent en élever la qualité d'accès.

## Points ouverts

1. Calibrage des valeurs de la matrice (relatif : les ordres de grandeur entre types et qualités) et pas de conversion marge-PF associé.
2. Valeurs d'armure naturelle par espèce au catalogue des races.
3. Contreparties chiffrées de l'armure lourde (mobilité, PMV, terrains).
4. Étage armement en miroir : armes pénétrantes contre absorption, multiplicateurs offensifs — en features déclarées.
5. Extension aux coques (PSTR) et aux tours et constructions.

## Étage armement — le pendant des armes (v0.3, 26 octobre 2026)

Même philosophie que l'armure : l'arme n'ajoute ni jets ni PF ; elle agit sur la marge. Symétriquement à l'absorption, chaque arme déclare une catégorie et une qualité (A à F, indépendante de la qualité de l'unité), auxquelles s'ajoutent les propriétés magiques.

Règle de marge nette (le cœur natif de l'étage) :

Marge nette = marge du duel de jets + bonus de marge de l'arme − absorption d'armure de la cible. La marge nette module la perte de PF ; marge nette nulle ou négative : le coup ne pénètre pas.

Catégories (orientation Francky, classiques des jeux de rôle) :

1. Naturelle : griffes, crocs, queues — donnée d'espèce au catalogue des races, cumulable avec une arme portée (une créature armée combat aussi avec ses armes naturelles : les bonus s'ajoutent).
2. Arme de mêlée : tranchants, contondants, piques.
3. Arme de jet ou missile : arcs, arbalètes, frondes ; interactions avec la portée, le terrain et les postures (tir délibéré, volée) — relais postures et terrain.
4. Arme de siège : balistes, catapultes, béliers ; bonus de marge majeurs, opposés aux coques (PSTR) et aux fortifications plus qu'aux troupes (l'absorption des cibles structurelles suit l'extension coques du chantier).

Matrice indicative (bonus de marge, valeurs relatives à caler) :


| Bonus de marge | A                                                                                   | B   | C   | D   | E   | F   |
| -------------- | ----------------------------------------------------------------------------------- | --- | --- | --- | --- | --- |
| Mêlée          | +1                                                                                  | +1  | +2  | +2  | +3  | +4  |
| Jet / missile  | +1                                                                                  | +2  | +2  | +3  | +3  | +4  |
| Siège          | +5                                                                                  | +6  | +8  | +10 | +12 | +15 |
| Naturelle      | par espèce au catalogue (relais du classeur : dagues du kobold, griffes du griffon) |     |     |     |     |     |


Propriétés magiques (révision de Francky) : identique aux armures — le bonus magique est une échelle plate de +1 à +5 selon le niveau d'enchantement (niveaux 1 à 5), indépendant de la qualité ; il s'ajoute au bonus de l'arme portée et aux armes naturelles. Les propriétés déclarées (Pénétrante, Perforante) demeurent des features du relevé, jamais codées en dur. Les armes naturelles sont traitées comme les équivalents des classes de poids selon l'espèce (croc de loup = arme légère, griffes de griffon = arme moyenne, souffle de dragon = siège ou arme lourde selon le chantier créatures majeures).

Empilement des armes : naturelle + une arme portée (mêlée ou missile) + enchantement s'ajoutent ; deux armes portées ne s'ajoutent pas (l'unité déclare son arme principale ; les configurations à deux armes relèvent de features).

Séparation des rôles complétée : la qualité donne les jets, l'entraînement l'EDT, l'arme la percussion, l'armure l'encaissement. Le duel de jets demeure la compétence pure ; l'équipement se joue dans la marge.

## Passage de revue de conformité au principe natif (v0.3)

Revues effectuées le 26 octobre 2026 sur l'ensemble des chantiers :

Conformes (conçus natifs en jets, pools et marges) : résolution des combats (jets multiples, minoration, défense passive de formation) ; morts et blessés (état des effectifs, ventilation alimentée par la marge) ; peur, poison, tournement, immunités (jets D20 et matrices graduées) ; montures (ventilation des parts d'un pool unique) ; conjurations (PMB converties en PF de lot, jets du conjurateur).

À reformuler (héritage agrégé É7) :

1. PF effectifs : le produit PF × EDT × terrain × moral (multiplicateurs agrégés du classeur) doit être redéfini en termes de jets — recommandation : les facteurs (EDT, terrain, moral, doctrines) entrent comme modificateurs de la valeur des jets, la marge restant la seule monnaie de dégâts ; la question ouverte 2 du chantier résolution se tranche dans ce sens.
2. Embuscades de l'unité spéciale : les multiplicateurs ×2 à ×5 de l'É7 sont une pensée agrégée ; en É8, l'embuscade devient un bonus de marge (ou un avantage au jet d'attaque) selon la qualité de l'unité embusquée — à reformuler au relevé, les valeurs É7 servant d'ordres de grandeur.
3. Table de moral É7 (0,1 à 2,5 multiplicatif) : à transposer en modificateurs de jets ou en résolution de moral propre en jets (panique, tenacité) — chantier moral à ouvrir.
4. Souffle des créatures majeures : les PMR de Destruction par PF/PST sont une conversion de pool ; native dans son principe, elle devra préciser son interaction avec la marge (le souffle est-il une attaque à part entière du duel, ou une perte de PF directe hors duel ?) — à arbitrer au chantier créatures majeures.
5. Charge de cavalerie et autres doctrines É7 (multiplicateurs) : à reformuler en modificateurs de jets ou de marge au chantier doctrines.

## Arbitrages du 26 octobre 2026 (soir) : embuscade et interaction magie arme-armure (v0.4)

### Embuscade (unité spéciale) — réformulée nativement

L'embuscade joue sur les deux registres de la résolution, arbitrés tous deux (orientation Francky) :

1. Jet de surprise (jet de résolution : l'embuscade réussit-elle ?) — si l'embuscade est détectée, elle se résout en engagement normal.
2. Si le jet de surprise réussit : bonus à l'attaque (avantage au jet d'attaque de l'unité embusquée) ET augmentation des dégâts (bonus de marge supplémentaire). L'un joue sur le jet de résolution (réussir), l'autre sur le jet de conséquence (la portée de la réussite).

Les multiplicateurs É7 (×2 à ×5 selon la qualité) deviennent des bornes d'ordre de grandeur : le bonus de marge d'embuscade croît avec la qualité de l'unité embusquée ; calibrage relatif au fichier global (les valeurs É7 servent de référence).

### Interaction arme magique contre armure (règle de la magie dominante)

Arbitré (Francky) :

1. Une arme magique qui touche fait davantage de dégâts, à moins que l'armure de la cible ne soit de qualité ou de magie suffisante pour réduire ses effets.
2. Principe de parité : à qualité égale et niveau magique égal entre l'arme et l'armure, le dégât ne change pas par rapport à un duel sans armure et sans arme magique — la parité s'annule, les échelles de bonus et d'absorption sont construites en miroir.
3. Avantage à la magie : le rapport d'échange entre la qualité et la magie favorise la magie. Forme proposée : les niveaux d'enchantement d'arme et d'armure s'annulent niveau pour niveau ; l'enchantement résiduel de l'arme ignore l'absorption de l'armure non magique à un taux supérieur à la valeur d'un cran de qualité (proposition : un niveau d'enchantement vaut l'absorption de deux crans de qualité — taux de change 1:2 en faveur de la magie ; réciproquement pour l'armure enchantée contre une arme de haute qualité) ; le taux exact est une constante du fichier de calibrage.

Formalisation de la marge nette (v0.4) :

Marge nette = marge du duel + bonus qualité d'arme + bonus magie d'arme + bonus d'embuscade éventuel − \[absorption qualité d'armure + absorption magie d'armure, après annulation niveau pour niveau des enchantements et application du taux de change magie/qualité\].

Exemple illustratif (taux 1:2) : une arme magique de niveau 2 contre une armure lourde non magique de qualité E (absorption 8) : l'enchantement annule l'équivalent de 4 points de qualité ; l'absorption résiduelle est de 4 — la magie perce la moitié de la qualité. À parité (arme et armure toutes deux magiques de niveau 2, qualités égales), le duel redevient celui de deux combattants sans équipement magique : la compétence seule décide.

## Calibrage des trois valeurs (26 octobre 2026, soir — calé maintenant, challenge d'équilibrage différé)

### 1. Les échelles de qualité (valeurs revues par Francky le 26 octobre 2026 soir)

Les crans de qualité ne valent plus un point uniforme : les matrices revues croissent de un point par cran jusqu'au rang D, puis de deux points aux rangs E et F (l'exception et la super-élite paient l'équipement de pointe). Matrices calées :


| Absorption (armures) | A                                                                                                    | B   | C   | D   | E   | F   |
| -------------------- | ---------------------------------------------------------------------------------------------------- | --- | --- | --- | --- | --- |
| Légère               | 1                                                                                                    | 2   | 3   | 4   | 6   | 8   |
| Moyenne              | 2                                                                                                    | 3   | 4   | 5   | 7   | 10  |
| Lourde               | 3                                                                                                    | 4   | 5   | 6   | 8   | 12  |
| Naturelle            | équivalent d'un des trois types selon l'espèce, avec une qualité par espèce (voir la matrice ci-dessus) |     |     |     |     |     |


Les armes suivent les mêmes échelles que les armures, par classe de poids en miroir — le principe de parité est ainsi vérifié par construction : à qualité égale et même classe, arme et armure s'annulent :


| Bonus de marge (armes) | A                                                                                                     | B   | C   | D   | E   | F   |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | --- | --- | --- | --- | --- |
| Mêlée / missile légère | +1                                                                                                    | +2  | +3  | +4  | +6  | +8 |
| Mêlée / missile moyenne | +2                                                                                                   | +3  | +4  | +5  | +7  | +10 |
| Mêlée / missile lourde | +3                                                                                                    | +4  | +5  | +6  | +8  | +12 |
| Siège                 | +5                                                                                                    | +6  | +8  | +10 | +12 | +15 |
| Naturelle             | équivalent d'une classe de poids selon l'espèce, avec une qualité par espèce |     |     |     |     |     |

L'arme de siège suit l'échelle indicative de la section armement (majorations contre coques et fortifications, à l'extension PSTR).

### 2. Le bonus magique : échelle plate de +1 à +5, indépendante de la qualité

L'enchantement ne dépend plus de la qualité d'équipement (révision de Francky, en ligne avec les règles É7) : un niveau d'enchantement (1 à 5) confère un bonus plat, +1 au niveau 1 jusqu'à +5 au niveau 5, côté arme (bonus de marge) comme côté armure (absorption) — l'annulation niveau pour niveau est exacte en valeurs. Taux de change contre la qualité : chaque point de bonus magique résiduel neutralise deux points de qualité (taux 1:2 conforme à l'arbitrage, en faveur de la magie) ; réciproquement pour l'armure enchantée contre une arme de haute qualité.

Exemples : une épée magique de niveau 2 (+2) contre une armure lourde de qualité E (8) sans magie : l'enchantement neutralise 4 points de qualité, absorption résiduelle 4, puis le bonus magique +2 s'applique — la magie domine nettement la qualité. La même épée contre une armure lourde qualité E et magique de niveau 2 : les enchantements s'annulent (+2 contre +2), il reste l'absorption 8 contre le bonus de qualité de l'arme — duel de qualité pure, dégât inchangé par rapport à un duel sans équipement magique, conformément au principe de parité.

### 3. L'échelle d'embuscade : bonus de marge par qualité de l'unité embusquée


| Qualité de l'embusquée     | A   | B    | C   | D    | E   | F   |
| -------------------------- | --- | ---- | --- | ---- | --- | --- |
| Bonus de marge d'embuscade | +2  | +2,5 | +3  | +3,5 | +4  | +5  |


En sus : avantage au jet d'attaque (l'échelle ×2 à ×5 de l'É7 sert de borne d'ordre de grandeur à ce bonus de marge ; la conversion marge-PF du chantier résolution permettra le contrôle à terme).

Statut : valeurs calées à titre de référence initiale au fichier de calibrage global ; l'équilibrage sera challengé plus tard sur la base des exemples fournis par Francky.
## Relais de la double devise (26 octobre 2026 soir)

