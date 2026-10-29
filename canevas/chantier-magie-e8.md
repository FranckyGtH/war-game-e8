---
name: "chantier-magie-e8"
title: "Le chantier magie — Édition 8, v0.1"
type: "text/markdown"
---

# Le chantier magie — Édition 8, v0.1 (27 octobre 2026, nuit)

Statut : architecture déposée pour arbitrage. Sources : chapitre 9 « La Magie » des règles É7 (sections 9.1 à 9.3 — royaumes, PMB, PMR, activités magiques, magie mineure, grande magie), tables de sorts relevées, registre des capacités v0.7 (effets natifs déjà arbitrés), fiches de la cuvée (bandes magiques des métiers). Liste blanche : Spell Compendium, Complete Mage, Complete Arcane, Complete Divine, DMG 3.5 (objets et borne au NM), Complete Psionic et Expanded Psionics Handbook (si le psionique entre), Secrets of Pact Magic et Tome of Magic (canal pacte), Magic of Incarnum (candidat canal incarnum), Book of Vile Darkness et Book of Exalted Deeds, Fiendish Codex I et II.

## 1. Le squelette É7 conservé (relevé du chapitre 9)

### 1.1 Les royaumes de magie

Trois royaumes, conservés d'É7 : la théurgie tire son énergie des dieux et des créatures qui en donnent ; l'essence utilise les forces magiques présentes à l'état naturel dans l'univers ; le mentalisme utilise les forces tirées de l'esprit.

Règles d'échange (conservées) : les unités fournissant les PMB doivent être stackées avec les unités lançant les sorts, et le rester jusqu'au lancement ; il n'est possible de recevoir que des PMB provenant d'un royaume que l'on maîtrise ; les hybrides peuvent donner tous leurs PMB à un lanceur de l'un des deux royaumes auxquels ils ont droit. Exemple consigné : magiciens et prêtres peuvent alimenter un leader nécromant (théurgie et essence), l'unité de mentalistes ne le peut pas.

### 1.2 Les grandeurs

| Grandeur | Règle É7 conservée |
| --- | --- |
| Points de magie de base (PMB) | PMB = n(n+1)/20, « n » étant le niveau d'énergie du lanceur dans la classe considérée ; reconstitution d'un tour sur l'autre ; les PMB non utilisés en fin de tour sont perdus |
| Répartition du leader | Un leader fournit personnellement la moitié des PMB, l'autre moitié venant des membres de son pion leader ; dans une unité lanceuse, le niveau indiqué est celui du plus haut lanceur |
| Points de magie réels (PMR) | Les tables donnent le nombre de PMB nécessaires pour obtenir 1 PMR ; minimum de 1 PMR pour qu'un sort ait effet ; les PMR se cumulent entre unités pour renforcer l'effet ou défier les dispels |
| Activités magiques (AM) | Nombre d'activités magiques disponibles par tour (coût en AM de chaque sort) |
| Niveau minimal (NM) | Niveau minimal requis pour lancer le sort considéré |
| Coût minimum de lancement (CML) | Coût plancher en PMB pour que le sort soit lancé |
| Durée et maintien (MNT) | Durée du sort ; maintien possible de tour en tour |
| Position géographique | PC (lanceur au centre de la zone), PI (lanceur dans la zone), PO (lanceur dans la zone ou un hex adjacent) |
| Aire d'effet | De base un hex — terre, mer, airs, sous terre, sous l'eau ; extensible (EXT) |
| Types de sorts | INS (instantané), CBT (combat), RIT (rituel), TPR (téléportation et grands effets positionnels — à confirmer à la passe de vérification) |
| PST réels | Les sorts fonction des effectifs prennent les PST réels (10 par cohorte, 3 par compagnie, 1 par section, 0,2 par groupe, 0,01 par homme) |

### 1.3 Les trois étages

Magie mineure (accessible à toute unité du niveau d'habileté suffisant, dépense de points et d'une activité magique), grande magie (sous conditions d'apprentissage, de lancement, de tours de récupération, de concentration et d'interruption ; contrôle des unités conjurées), et l'étage intermédiaire des tables relevées (Pluie de flammèches, Poursuite, Possession, Protections, Raz de marée...) — la structure exacte mineure/standard/grande fera l'objet de la passe de vérification page à page.

Sorts de grande magie relevés (extraits de table) : Annulation (CBT, CML 100, 1 PMB par PMR), Armée de morts-vivants (RIT, PI, CML 100), Bénédiction (INS, PO, MNT, CML 50, 10 PMB par PMR), Brouillard, Cataclysme maritime (CML 750, 100 PMB par PMR), Champ d'anti-magie (CML 200, 50), Colère des vents, Conjuration de démons majeurs, Destruction, Dispel (1 PMR de sort éliminé pour 2 PMR de Dispel ; 1 pour 1 si le sort est désigné), Dissimulation (1 PMR par PST pour abaisser de 1 le risque de repérage ; coût ÷4 pour un druide en son milieu ; inefficace en ville), Divination hex, Pluie de feu, Possession, Protections contre conjuration, divination et téléportation, Résurrection (1 PMR par être ramené ; 10 PMR pour un leader et son pion ; coût doublé au fil des mois, NM ajusté), Vol de personnel (transforme une unité en unité aérienne pour le tour ; example consigné : 10 PMR pour voler une unité de 10 PST, fournis par 80 PMB de prêtres [80/(8×2)] et 20 PMB d'alchimistes [20/(2×2)]).

## 2. L'architecture É8 (proposition)

### 2.1 Royaumes × canaux

Les royaumes demeurent l'économie de la magie (qui paie, qui échange) ; les canaux demeurent la résolution et la facturation (comment l'effet se résout, qui paye le NM). Table de passage :

| Canal | Résolution | Royaumes É7 naturels | Sources |
| --- | --- | --- | --- |
| Magique | Moteur PMB/PMR | Essence (arcane) et théurgie (divine) | Spell Compendium, Complete Mage/Arcane/Divine |
| Psionique | Moteur PMB/PMR (à l'arbitrage) | Mentalisme | Expanded Psionics Handbook, Complete Psionic |
| Pacte | Moteur PMB/PMR du lié (le vestige paie) | Transversal — un pacte peut relever de n'importe quel royaume | Secrets of Pact Magic, Tome of Magic, Fiendish Codex I et II (les contrats diaboliques) |
| Incarnum (canal retenu par arbitrage du 27 octobre au soir) | Moteur à définir en passe dédiée (âmefusions, points d'incarnum) | Transversal | Magic of Incarnum |
| Physique | Moteur physique (aucune facturation magique) | — | — |

### 2.2 Le NM dédoublé (ARBITRÉ — 27 octobre, fin de nuit)

L'É7 emploie « NM » en deux sens : le niveau minimal d'un sort (9.1.1.6) et le niveau de magie d'une créature (colonne du classeur, pipeline É8). Dédoublage arbitré par Francky :

- Le NM-sort devient le NHm — NIVEAU DE MÉTIER MINIMUM requis pour lancer le sort SANS RISQUE (NH = niveau, règle CR = niveau) : Bénédiction exige un prêtre de NHm 30, un Cataclysme maritime un lanceur de NHm 50. La colonne des tables de sorts se rebaptise NHm au livret (sentence de Francky : « le niveau minimum doit être noté NHm »).
- Le NM-pipeline (m(NM) = 1 + 0,8 × NM) demeure le niveau de magie intrinsèque de la créature ou de l'unité, payeur hors PF de base (précédents licorne, drow, duergar, djinn, ki-rin, elfe grise, highman).

Convention d'unité : le niveau effectif d'une unité lanceuse pour satisfaire un NHm est le plus haut niveau de lanceur qu'elle contient (règle É7 conservée, relue comme donnée NH — le régiment de mages humains garde m(NM) = 1, un niveau de métier ne donne jamais de NM intrinsèque) ; le PMB total se calcule sur la population des lanceurs réels.

LA SURCHARGE (arbitrée le 27 octobre, fin de nuit — AMENDÉE dans la foulée) : les LEADERS avec leurs pions leaders ont accès à TOUS LES NIVEAUX DE MAGIE. Le seuil de la grande magie est le niveau 20 (amendement de Francky : « ce n'est pas 25 mais 20 le niveau où on peut essayer de lancer de la GM ») ; sous le niveau 20, pas de lancement de grande magie ; du niveau 20 jusqu'à NHm − 1, le lancement est possible mais À RISQUE — le sort peut éclater à la figure du lanceur ; à NHm et au-delà, lancement sans risque. Exemple consigné : un sort de NHm 30 se lance sans risque par un magicien de niveau 30, et se tente à ses risques et périls dès le niveau 20 — l'écart de la tentation est de dix niveaux. La surcharge est une règle de la grande magie (l'étage des leaders) ; son extension aux étages inférieurs n'est pas arbitrée.

LE CHÂSSIS MÉCANIQUE : LES RÈGLES D'APPRENTISSAGE ET DE LANCEMENT RETROUVÉES EN E5 (relevé du 27 octobre). Les règles complètes, disparues de l'É7 (qui n'en a conservé que les coûts — apprentissage 5 à 25 PA, lancement 3 AM — et une récupération formalisée Y-X+2), sont relevées dans la version E5 des règles (Regles_de_la_partie_Edition_V, chapitre Grande magie) :

- APPRENTISSAGE (E5) : apprendre un sort de grande magie coûte des PA par palier de NHm — 5, 10, 15, 20 ou 25 PA pour respectivement NHm 30, 35, 40, 45 ou 50 — plus une durée d'étude d'un tour pour un sort de son propre NHm. Sous le NHm, l'apprentissage reste POSSIBLE : risque de maîtrise imparfaite de 5 × n × (n+1) %, n étant l'écart entre le NH du lanceur et le NHm ; le résultat est tenu SECRET par le MdM. Le NHm est indicatif et varie selon l'utilisateur (classe, race) et les conditions extérieures ; les supports (grimoires) sont nécessaires au lancement et peuvent procurer des bonus — les créatures extraplanaires s'en passent.
- LANCEMENT (E5) : 3 AM du lanceur dans le royaume concerné, l'intégralité des PMB dépensée dès le début du lancement, plus des PA additionnels (composants, rituels — certains sorts exigent l'insimulable, ex. relique). Si la maîtrise est imparfaite, le MdM tire un pour cent : au-delà du pour cent de maîtrise, le sort ÉCHOUE ; en cas d'échec, un second tirage déclenche le BACKFIRE — libération en Destruction des PMB investis, ou perte de capacité magique partielle ou totale, temporaire ou définitive.
- LA FATIGUE (E5 — NE) : le NE requis d'un sort de grande magie égale son NHm ; le lanceur perd, pour la seule grande magie, le NE du sort, récupéré de moitié par tour ; si son NE est inférieur au NE requis, n×(n+1)/2 tours pour revenir à zéro, effets secondaires sur jet sans limite au malus [5 + n×(n+1)/2], et plus AUCUNE magie (même mineure, plus de PMB) tant qu'il n'est pas revenu à zéro. Les tours de récupération entre deux grandes magies sont généralement de deux (un sort tous les trois tours) ; la concentration RIT/TPR exclut tout PMV et toute interruption — l'interruption brute peut dévaster la zone.

Lecture de réconciliation : la fenêtre de surcharge de Francky (tentative dès le niveau 20) s'adosse au mécanisme E5 — plus l'écart est grand, plus la maîtrise est incertaine et le backfire probable ; le pour cent de maîtrise précis (proposition : 100 − 5 × n × (n+1), borné) et la formule de fatigue sont des constantes candidates au fichier de calibrage ; l'échec E5 (pour cent de maîtrise puis backfire) EST l'éclatement à la figure arbitré par Francky — la proposition antérieure d'un jet de surcharge indépendant est retirée au profit du châssis E5.

### 2.3 La facturation

Trois payeurs, jamais le PF : le niveau de métier paie l'accès aux sorts (NH) ; les PMB de l'unité paient le lancement (PMB → PMR par sort, CML plancher) ; le NM paie les capacités magiques permanentes de la carte (souffle, aura, arsenal racial). Le PF individuel ne bouge jamais par la magie autrement que par m(NM) — la magie de bataille se joue en ressources de tour, non en masse.

Le cumul des sources (arbitrage de Francky, 27 octobre) : deux sources procurent de la magie et se cumulent — le sang (race : NM intrinsèque, plafonds de nature, arsenaux raciaux) et la formation (métier : NH d'accès, PMB de réserve). L'artifice (objets) s'ajoute en troisième couche, annoncée par Francky : il augmentera la magie du porteur.

Règle des trois lampes (formalisation déposée) : la lampe du sang paie la profondeur (plafond de NM, arsenaux du sang), jamais la réserve du métier ; la lampe de la formation paie la réserve et l'accès (PMB, NH), jamais le plafond ; la lampe de l'artifice est un miroir, non une flamme — PMB ajoutés, ratio PMB/PMR amélioré, CML réduit, sorts stockés, aire étendue, le tout sans jamais dépasser le NM du porteur (borne en attente de validation). Garde-fous (revus par l'arbitrage de Francky du 27 octobre) : l'inflation des PMB n'est PAS un souci — les mondes visés sont des mondes de haute magie exigeant d'immenses réserves, et l'économie est généreuse par design ; le goulot d'étranglement se déplace de la réserve vers le tempo (PMB régénérés par tour et perdus si inutilisés, ratios PMB/PMR, CML, stack, position), non vers le carburant. Les plafonds de nature demeurent des plafonds ; la compatibilité des royaumes s'applique aux PMB raciaux ; tout bonus d'objet passe par le pipeline, constantes au fichier de calibrage — mais le calibrage visera l'abondance, non la restriction. Exception proposée : les artefacts (gabarit Weapons of Legacy) peuvent dépasser la borne, mais deviennent alors des cartes à part entière au canal déclaré, arbitrage du MdM. Idée déposée pour le « au moins » de Francky : les lieux de puissance (nexus, menhirs, cercles de pierres) comme quatrième source — DEVENU CHANTIER le 27 octobre (canevas « Le chantier des lieux de puissance », v0.1 : la lampe du lieu paie le terrain, jamais le talent — flux de PMB, faveur de maîtrise pour la surcharge, convalescence, phare et backfire dévoré ; points d'arbitrage soumis).

### 2.4 La résolution

Les sorts sont des actions spéciales du Cycle du Destin (relais Phases du tour) : lancement en phase d'actions, effets maintenus tant que le MNT tient, interruptions par perte de concentration. Les jets de résistance suivent la convention D20 du chapitre en rédaction ; les oppositions magiques suivent la matrice graduée universelle (immunisation/résistance par crans, déjà arbitrée pour le poison et la peur) ; la résistance magique demeure en pour cent (MR native de cette forme — drow 60-70 %). Le Dispel conserve sa règle (2 PMR contre 1 PMR, 1 pour 1 en désignant le sort).

### 2.5 La transposition D&D

Le Spell Compendium est le réservoir ; les tables É7 sont le gabarit. Tout sort D&D admis entre par liste blanche du chantier, transposé au gabarit É8 à dix champs : royaume, NM (niveau requis), type, position, aire et extension, durée et maintien, AM, CML, PMB par PMR, effet chiffré (PF, PV, PST, moral, terrain, capacité). Les sorts É7 existants conservent nom et effet ; les noms D&D servent de référence de page (source et page citées, règle du tamis).

### 2.6 Les effets natifs du registre (déjà arbitrés — non rouverts)

Souffle (v0.2 — PMR de Destruction, formule 3a, peur séparée), Tourner les morts-vivants (v0.1 — PMB/10 prêtres, /20 théurgistes, /8 nécromants, matrice graduée), Peur (v0.2 — auras positionnelles, galvanisation du Mal), Poison (v0.2 — grades), Dissimulation (attach hobbit et rôdeur, coût PMR du sort), Vol mono hex (1 PMR gratuit de vol de personnel en phase de combat), Conjurés (conduite contrôlée par le PMB du maître), Vol de personnel (l'exemple des 10 PMR consigné ci-dessus), régénération et blocage. La magie de bataille É8 se compose de ces effets natifs plus les sorts transposés des tables.

### 2.7 Les exceptions raciales (la magie du sang)

| Race | Trait magique | Facturation |
| --- | --- | --- |
| Drow | ténèbres, lumières dansantes, feu des fées (1/jour) ; MR 60-70 % | Origine race, canal magique, payeur NM (hors PF) |
| Elfe grise | marge arcane | Origine race, canal magique, payeur NM |
| Highman | prédisposition magique du sang — chiffrée : plafond de NM de l'unité relevé de +2 (arbitrage du 27 octobre au soir) | Origine race, canal magique, payeur NM |
| Duergar | invisibilité, grandir, immunités | Origine race, canal magique, payeur NM |
| Licorne, djinn, ki-rin, élémentaire | dons magiques ; ki-rin ensorceleur 18 | Origine race, canal magique, payeur NM |
| Gnome | dons magiques (lumières dansantes, son fantôme, prestidigitation) ; maîtrise illusoire | Origine race, canal magique, payeur NM |

### 2.8 La borne des objets (proposition)

Les objets magiques sont de la catégorie spéciale : payeur trésor et entretien, jamais PF. La borne du DMG devient : un objet ne dépasse pas le NM de son porteur (l'unité ne porte pas ce qu'elle ne sait pas alimenter) ; la TAM de l'unité borne son effet offensif (grades croisés avec la RAM) ; les armes héritage de Weapons of Legacy montent en grade avec le porteur, gabarit des artefacts.

### 2.9 L'étage intermédiaire (proposition — la magie d'assaut)

Constat de la transcription : les mineurs plafonnent à NM 14 (bande D), la grande magie commence à CE 30 (héros de rang 3, NH 25-30). Le vide NH 15-29 — les bandes E et F, c'est-à-dire les lanceurs que TOUTE armée de haute magie aligne en nombre — n'a aucun sort au-dessus du niveau du tour. L'étage intermédiaire est la magie de ce vide, et son identité est la MAGIE D'ASSAUT : résolue dans la phase de combat, non dans les actions spéciales.

Discriminateurs (arbitrés par Francky le 27 octobre, la proposition initiale est close) : NH requis 12 et au-delà — bandes D, E et F, héros jusqu'à 29 (les unités D lancent aussi la magie intermédiaire : l'étage est la magie de masse des armées de haute magie, le régiment de mages D en est le fer de lance) ; CML 10-50 PMB ; ratios 2-10 PMB par PMR ; coût de 1 AM par sort ; durée le combat ou le tour — jamais de TPR multi-tours ni de rituel de mois (ce sont les marques de la grande magie) ; position PI obligatoire : le lanceur participe à l'assaut et en court les risques, là où le grand mage opère à PC/PO depuis l'arrière ; un seul sort d'assaut par lanceur et par combat, un second pour 1 PA (le goulot d'étranglement est le tempo, arbitrage du 27 octobre). Contrepartie symétrique arbitrée le même jour : SEULS LES LEADERS lancent la grande magie — l'étage supérieur est une affaire de personnages ; la chasse aux grands mages adverses (assassinat, interruption de rituel) devient une action stratégique, et la conjonction de prêtres ne remplace jamais le leader qui la conduit.

Les cinq familles de la première cuvée (population par liste blanche au gabarit à dix champs, sources et pages citées, chiffrage différé au calibrage) :
1. La frappe — pertes en cours d'assalt sur le stack adverse, EDT exclu : Pluie de grêle, Trait de foudre, Colonnes de feu (Spell Compendium).
2. Le terrain d'assaut — la zone de combat remodelée pour l'engagement : Mur de flammes (côté d'hex), Brume épaisse (EDT et mouvement divisés), Verger de ronces (immobilisation partielle), Gel du champ.
3. Le moral d'assaut — chant de guerre galvanisant (+ moral pour l'engagement), Effroi de bataille (test de moral ou refus d'engager des unités C-D) ; relais de l'effet natif peur (v0.2, auras positionnelles).
4. La protection d'assaut — extension de Protection de personnel en phase de combat (absorbe les PMR de destruction adverse durant l'assaut), Voile de la légion.
5. La contre-magie d'assaut — Silence de zone (les AM adverses inutilisables dans l'assaut), Dissipation d'assaut (retire les effets d'assaut adverses avant le jet de combat).
6. Deux annexes : les soins d'assaut (Main du guérisseur : 1 PF par PMR pendant l'assaut, là où le sort mineur Soins n'opère qu'après le combat) et la chasse aux leaders (Défi de bataille : jet de sauvegarde ou le leader adverse perd sa capacité de commandement pour l'engagement).

Voie de peuplement complémentaire : la promotion des mineurs améliorés (notation *****) — la version doublée d'un mineur dont l'effet franchit l'échelle du stack devient une entrée intermédiaire à part entière (Vol de personnel amélioré en escadrille, Contact amélioré en réseau de liaison de bataille). Effet natif précédent : le souffle des créatures en assaut (registre v0.2) est déjà de la magie d'assaut par nature — l'étage intermédiaire donne aux lanceurs ce que les dragons ont toujours eu.

Première cuvée INSCRITE (v0.1, canevas cuvee-assaut-e8) : quatorze sorts en six familles au gabarit dix champs — la frappe (Trait de foudre, Pluie de grêle, Colonnes de feu), le terrain d'assaut (Mur de flammes, Brume épaisse, Verger de ronces, Gel du champ), le moral d'assaut (Chant de guerre galvanisant, Effroi de bataille), la protection d'assaut (Égide de la légion, natif É7), la contre-magie d'assaut (Silence de zone, Dissipation d'assaut), les annexes (Main du guérisseur, Défi de bataille). Chiffrage indicatif, différé au calibrage ; ordre de résolution dans l'engagement consigné ; banc d'essai de la cuvée programmé.



## 3. Le banc d'essai

Trois profils de référence passent ici leur seconde épreuve : la horde de squelettes (le PMB du nécromant anime et conduit — fiche de la cuvée, bandes B à D) ; la conjonction (le mage — écoles à B, objets à D, téléportation stratégique à E) ; la légion hellène (l'humain nu — la phalange ne touche jamais au PMB, contrôle de bascule du moteur). Le dragon rouge adulte porte le troisième étage : souffle en PMR, peur en aura, MR draconique — la créature dont toute la puissance vit hors du PF.

## 4. Passe de vérification à venir

1. Relevé complet des tables de sorts É7 : FAIT (v0.1, canevas releve-sorts-e8) — transcription intégrale : table de la magie standard (35 sorts × 17 classes de lanceur), table des 43 sorts de grande magie (9 colonnes), synthèses chiffrées des 78 descriptions, règles propres à la grande magie (rang, maintien, extensions, récupération), magie spéciale (rang R, (2+R) PA et 10×R PMB). Constat de la passe : l'É7 ne connaît PAS de table « intermédiaire » — ses trois types sont mineure (standard), grande magie et magie spéciale ; l'étage intermédiaire de l'architecture É8 est donc une création É8, à peupler par liste blanche ou par promotion de sorts mineurs améliorés (notation *****).
2. Vérification des règles de durée, continuité et cumul des sorts mineurs ; calcul en fonction des PST ; coût en activités magiques.
3. Correspondance des types (INS, CBT, RIT, TPR) avec les phases du tour.
4. Le chiffrage fin (équilibre absolu) demeure différé jusqu'aux exemples de Francky — les constantes au fichier de calibrage.
5. La matrice des coûts par classe de lanceur : FAITE (28 octobre au soir, canevas matrice-couts-lanceurs-e8 v0.1) — la table Magie standard intégrale (35 sorts, 17 colonnes conservées telles quelles) et la table des Trente-SIX métiers raccordés : les semi-lanceurs au tarif de leur classe de référence (accès au niveau effectif, sentence du 28 octobre), le warlock au tarif du sorcier et plafonné à l'intermédiaire (sentences du 28 octobre au soir), le barde au meilleur des tarifs Mg/Dr (proposition), les non-lanceurs sans accès ; la colonne NM se lit comme NHm au livret.

## 5. Points d'arbitrage soumis à Francky

Arbitrages rendus le 27 octobre au soir :

1. Psionique : ADOPTÉ — il entre au royaume du mentalisme comme une source parmi d'autres, même économie PMB/PMR, canal psionique de résolution (Expanded Psionics Handbook et Complete Psionic à la liste blanche ; la fiche du mentaliste de la cuvée est validée et sort de son sursis).
2. Incarnum : CANAL RETENU — Magic of Incarnum entre au registre des canaux ; le moteur des âmefusions (points d'incarnum) sera défini dans une passe de conception dédiée.
3. Highman : la prédisposition magique du sang est chiffrée en PLAFOND DE NM RELEVÉ DE +2 sur le NM maximum de l'unité — le sang donne la profondeur, non la réserve.
4. Grande magie : RÉSERVÉE AUX LEADERS (arbitrage du 27 octobre) — aucune unité non leader ne peut lancer de grande magie ; les PMB des unités peuvent alimenter le leader lanceur, mais le sort n'existe que par lui.
5. Magie intermédiaire : ACCESSIBLE AUX UNITÉS DE BANDE D (arbitrage du 27 octobre) — l'étage s'ouvre à NH 12, bandes D à F et héros ; le régiment de mages D devient l'artillerie magique de l'armée.

Arbitrage rendu par Francky sur la formule PMB — VALIDÉE : la forme quadratique n(n+1)/k est conservée, la constante k = 20 passe au fichier de calibrage (elle porte toutes les tables É7 : les CML de 50 à 750 sont calibrés contre elle) ; l'ajustement est différé à l'équilibrage absolu, avec les exemples de Francky.

Arbitrage rendu le 27 octobre, fin de nuit — le dédoublage du NM est ADOPTÉ avec deux sentences de Francky : (1) la colonne des tables se rebaptise NHm, niveau de métier minimum requis pour lancer SANS RISQUE ; (2) LA SURCHARGE — les leaders avec leurs pions leaders ont accès à tous les niveaux de magie, la grande magie se tente à partir du niveau 20, avec risque d'éclatement à la figure entre 20 et NHm − 1 (le régiment de mages humains garde m(NM) = 1 ; la surcharge est une règle de la grande magie, extension non arbitrée).

