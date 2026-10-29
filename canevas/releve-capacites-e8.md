---
name: "releve-capacites-e8"
title: "Relevé consolidé des capacités spéciales (Édition 8), v0.7"
type: "text/markdown"
---

# Relevé consolidé des capacités spéciales — Édition 8, v0.7 (triage des trois origines et attribution aux races de test, le 27 octobre 2026)

## Principe directeur (arbitré le 26 octobre 2026)

Les features d'une unité ou d'un leader sont la solution de référence pour gérer les cas particuliers et les problèmes délicats : toute exception devient une capacité déclarée, jamais un cas codé en dur dans la résolution (qui ne consomme que des valeurs dérivées). Chaque capacité porte des prérequis, qui peuvent inclure des races, des professions, des cultures, des alignements, des qualités, des constructions ou des guildes. Les packages regroupent des capacités cohérentes pour en faciliter l'attribution.

## Architecture des capacités (arbitrée le 27 octobre 2026)

Trois catégories d'origine, une seule règle d'attribution : chaque capacité a exactement une origine, un canal, un payeur.

| Origine | Ce qu'elle couvre | Payeur |
| --- | --- | --- |
| Capacité de race (le sang) | Ce que l'espèce porte de naissance : vision noire, stabilité naine, chance du hobbit, ténèbres du drow | PP racial arbitré à l'inscription et plafonds de nature — gratuite au PF, bornée par eux |
| Capacité de métier (la formation) | Ce que la profession apporte selon son niveau : drill, feats, postures, écoles de combat | NH (CR = niveau de personnage, précédents drow et duergar) et QE de l'unité |
| Capacité spéciale (les inclassables) | Ce qui n'est ni sang ni métier : pactes de vestige, dons divins, capacités d'unité accordées par doctrine, artefacts | Canal de coût déclaré sur la carte (NM, QE, entretien, trésor) — arbitrage MdM |

Le canal, attribut transversal : physique (extraordinaire), magique (sort ou surnaturel), psionique, pacte. La « capacité magique » n'est pas une catégorie — c'est un canal. Une capacité de race peut être de canal magique (les ténèbres du drow : origine raciale, facturation au NM) ; une capacité de métier peut l'être aussi (les sorts du prêtre). Le canal détermine la résolution (moteur physique contre PMB/PMR) et la facturation magique (NM, hors PF de base — précédents licorne, drow, duergar, djinn, ki-rin).

Garde-fous arbitrés :

1. Une capacité non facturée n'existe pas — chaque carte déclare son payeur.
2. Les niveaux de métier ne gonflent jamais le PV individuel : la masse est de race (PV = 10 × TC³) ; un vétéran pèse le poids d'un conscrit, le niveau paie en NH, capacités et QE. Tout double comptage avec TC² est proscrit.
3. Les capacités entrent au registre par liste blanche de chantier, avec source et page — le tamis, pas l'aspirateur (37 volumes en bibliothèque).
4. Les grilles de métier par niveau sont curées par le MdM (une dizaine de professions pour le wargame) ; gabarit recommandé : la classe raciale drow de Drow of the Underdark (quatrième ajout).

## Schéma d'une capacité (feature)

| Champ | Contenu |
| --- | --- |
| Nom / abréviation | Ex. : Mur de boucliers (MdB) |
| Portée | Unité, leader, lot, stack, créature, structure |
| Prérequis | Race, type d'humain ou culture, profession, alignement, qualité minimale, construction (caserne, académie), guilde, statut |
| Origine | Race (le sang), métier (la formation) ou spéciale (les inclassables) — exactement une |
| Canal | Physique, magique, psionique ou pacte — détermine la résolution (moteur physique contre PMB/PMR) et la facturation (NM pour tout canal non physique) |
| Effets | Champs d'effet : EDT, PF, PMV, moral, terrain, jets (attaques/défenses), résolutions (poison, peur, magie, fortification, régénération) |
| Entretien / coût | Coût d'entretien, points d'action, emplois de tacticien |
| Payeur | PP racial et plafonds de nature (race), NH et QE (métier), canal déclaré (spéciale) — une capacité non facturée n'existe pas |
| Incompatibilités | Capacités exclusives (ex. Berserker et formation en phalange) |
| Source | É7 (relevé 8.1.3 et PF effectifs), É8 (créée), ouverte |

## Relevé É7 (définitions d'origine)

| Capacité | Abrév. | Effet É7 | Prérequis à préciser en É8 |
| --- | --- | --- | --- |
| Archer | — | Le +x de la table terrain s'ajoute au multiplicateur de terrain | Équipement (arc), culture |
| Berserker | — | Immunisé à la peur, jamais de RAF, inflige et subit le double de pertes, toujours en première ligne | Culture (nordique), race (gnome contre humanoïdes), incompatible formation serrée |
| Bonus/malus de terrain | +x | S'ajoute au multiplicateur de terrain | Race, culture |
| Dissimulation | DIS | Sort de Dissimulation gratuit et permanent | Race (hobbit), équipement, profession (ranger) |
| Embarquement | — | 1 PST d'unité par vaisseau (×3 pour transport) | Unité navale, infrastructure portuaire |
| Immunité au poison | IP | Aucun effet du poison ; barycentre en stack composite | Race (démons, morts-vivants, driders) |
| Ignore fortification | IF | Niveaux de fortification ignorés, sauf conception spécifique | Nature (démons, licornes), vol |
| Infravision | INF | Pas de malus de nuit ni de souterrain ; archerie impossible en nuit profonde | Race |
| Infravision active | INFA | INF sans archerie ; moitié des malus dans les ténèbres | Race (drows), magie |
| Points de magie de base | PMB | Réserves de magie de l'unité (cf. magie) | Profession de lanceur de sorts, niveau |
| Peur | — | Retravaillée : voir règle Peur É8 (v0.2) ci-dessous | Nature de la créature (dragon, mort-vivant) |
| Poison | x | É7 : force ×(1+x) contre unités vulnérables ; É8 : retravaillé en grades (v0.2 ci-dessous) | Race, équipement ; le poison porte un grade A-F |
| Résistance magique | MR | Pourcentage des PMR offensifs neutralisés | Race (drows 60-70 %) |
| Raider | — | Se déplace avec un leader hors CDS/CDD, en échange du pillage | Culture (goblinïdes, orcs) |
| Ravitaillement | — | Capacité PSTN des convois (CRB bœufs 0,1 PSTR/chariot, CRM mules 0,3 PSTN) | Infrastructure, animaux |
| Régénération | — | É7 : intacte si camp vainqueur (le feu des vaincus) ; É8 : voir version retravaillée ci-dessous | Race (trolls, trolls des bois) |
| Résistance à la peur | RPE | É7 : coefficient sur la PMP ; É8 : devient feature donnant l'avantage au jet de résistance (v0.2) | Race, équipement, formation |
| Résistance au poison | RPO | Coefficient réducteur sur les dégâts du poison | Race (hobbit ¾, gnome ½) |
| Résistance au tournage | RAT | Fournie par race | Race |
| Résistance aux armes magiques | RAM | Réduction adverse 2^(RAM+TAM) si TAM insuffisante | Nature (créatures incorporelles) |
| Souffle | — | Souffle de Destruction gratuit à raison de x PMR par PF ou PST (dragons) ; le béahir porte un souffle d'électricité de 1 PMR pour 10 PF, provoque la peur pour 20 % de ses PF, immunisé à l'électricité et au poison | Nature (dragons, béahir) |
| Tape avec armes magiques | TAM | Armes magiques de l'unité ; toute créature a une TAM au moins égale à sa RAM ; augmente les PF et évite les malus contre les créatures exigeant des armes magiques ; É8 : transposition en grades à la matrice graduée | Équipement, nature (démons) |
| Tourner les morts-vivants | — | Force de tournage = PMB/20 (théurgistes), /10 (prêtres), /8 (nécromants ; démonistes assimilés pour les extraplanaires) ; affecte les PF de morts-vivants ; NH supérieur de 5+ à la RAT = contrôle ou destruction (au choix) ; sinon neutralisation pour le combat ; nécromants +4 | Prêtres, nécromants, démonistes |
| Immortels | Imm | L'unité détruite réapparaît automatiquement au tour suivant en un lieu prédéfini (phylactère de liche, palais du roi de Perse, pied du mont Olympe, commanderie la plus proche) ; l'occupation ennemie du lieu diffère la réapparition ; l'équipement n'est souvent pas récupérable et les corps disparaissent | Mode de destruction définitif difficile (liche), pouvoir divin (héros), organisation à grosses réserves (immortels perses, garde prétorienne) |
| Unité spéciale ou secrète | US | Unités d'appoint urbaines (assassins, voleurs, courtisanes, sicaires, commandos) ; embuscades ×2 à ×5 selon qualité ; table de PF par taille et qualité (groupe 1-5, section 5-33) ; EDT 2,0 de la table des unités ; séparation et regroupement dissimulés une fois par tour | Recrutement spécial, guilde, qualité B à E |
| Vision dans les ténèbres | — | Aucun malus d'obscurité quelle qu'elle soit (nuit, souterrain, ténèbres) ; tous les morts-vivants, démons et diables en bénéficient | Nature (morts-vivants, extraplanaires) |
| Vol mono hex | — | Vol de personnel gratuit (1 PMR) restreint à un hex lors de la phase de combat : unité volante pour le tour, sans dépenser le double de PMB | Magie, équipement |
| Vol | — | Bonus terrain vol (table +x), combat aérien | Nature (aigles, wyverns), monture volante |
| Amphibie / sous-marin | — | Combat s/s marin, PMV réduits en milieu hostile pour les non-amphibies | Race (hommes lézards, tritons) |

Remarques du relevé : le rejet du barycentre (arbitrage du 26 octobre 2026) — la règle du barycentre É7 servait à ramener un stack composite à une valeur moyenne pour un jet de combat unique ; la résolution É8 par jets multiples par lot (attaques et défenses par qualité, oppositions une à une) rend chaque lot autonome dans la résolution, et le barycentre devient inutile. Les capacités qui y recouraient (poison, immunité au poison, peur, résistance aux armes magiques) s'appliquent désormais lot par lot : un attaquant empoisonné applique son ×(1+x) aux seuls lots vulnérables qu'il engage, une peur infligée s'applique au moral de chaque lot adverse selon sa qualité et ses résistances propres. L'interaction qualité/peur demeure (unités C ÷2, D ÷4, E/F et leaders immunisés).

## Capacités créées par les chantiers É8

| Capacité | Portée | Effet | Prérequis | Source |
| --- | --- | --- | --- | --- |
| Dur à cuire | Unité | Double les défenses ; plancher de minoration 50 % | Races massives, morts-vivants, peau épaisse | Résolution des combats |
| Unité non entraînée | Unité | EDT −0,2 ; disparaît après 2 mois de service ou casernement | Levée sans caserne | Chantier Expérience |
| Garde prétorienne | Unité | EDT +0,5 | Tradition, qualité D+, recrutement sélectif | Règle EDT |
| Unité spéciale | Unité | EDT +1,0 ; CCT ×2 | Statut, mission, guilde | Règle EDT |
| Académie | Unité | EDT +0,1 (officiers formés) | Construction académie | Règle EDT |
| Discipline de fer | Unité | EDT +0,1 (commandement) ; moral favorable | Culture insulaire, drill | Chantier Expérience |
| Endurance du froid | Créature/unité | Aucun malus hiver, EDT favorable neige/glace | Type Nordique, races boréales | Types d'humains |
| Endurance de la chaleur et de la soif | Créature/unité | EDT favorable désert, besoin d'eau réduit | Type Méridien | Types d'humains |
| Mur de boucliers | Unité | Formation défensive (doctrinale) | Type Nordique, équipement bouclier | Types d'humains |
| Bâtisseurs | Unité | Bonus travaux et terrassements | Type Méridien, guildes de bâtisseurs | Types d'humains |
| Phalange | Unité | Formation (doctrine) ; EDT +0,1 en ordre serré | Type Hellène, équipement pique | Types d'humains, règle EDT |
| Rameurs | Unité | PMV naval favorable | Type Hellène, littoral | Types d'humains |
| Arc de guerre | Unité | Tir favorable en lot | Type Insulaire | Types d'humains |
| Instructeur | Leader ou invalide | Accélère l'entraînement des lots ; relève le plafond B → C | Vétéran ou invalide | Morts et blessés, Expérience |
| Régénération (É8) | Créature | Blessés standard ; redevient active après 1 assault passé à régénérer ; blessés détruits si régénération bloquée | Race (trolls, etc.) | Morts et blessés |
| Blocage de régénération | Action | Empêche la régénération adverse ; coûte CDT ou emploi de tacticien | Feu, acide, magie ; reconnaissance | Morts et blessés |
| Énergie (NE) | Créature | Capacité exceptionnelle (extraplanaires, lich) | Nature extraplanaire | Calibrage |
| Mort-vivant | Créature | Facteur structurel 1,8 ; pas de blessés ; alignement seul pour l'EDT ; immunisé peur/poison ; CCSN 0 | Statut mort-vivant | Calibrage, relevé É7 |
| Immunisé à la peur | Créature/unité | Ne fait aucun jet de résistance contre la peur ; reste sensible à la galvanisation adverse selon alignement | Berserker, morts-vivants, qualité E/F, GA, fanatiques | Règle Peur É8 (v0.2) |
| Résistance à la peur | Créature/unité | Avantage au jet de résistance contre la peur (deux dés, garder le meilleur) | Race, équipement, formation, entraînement | Règle Peur É8 (v0.2) — remplace la caractéristique RPE É7 |
| Aura de protection | Leader/unité | Bonus de résistance (avantage, ou bonus chiffré au jet) à toutes les unités stackées avec le porteur | Paladin (BC), étendards, musiciens, prêtres | Règle Peur É8 (v0.2) |
| Galvanisé | Créature/unité | Une unité d'alignement Mal qui réussit son jet contre une peur qui l'entoure gagne +0,1 EDT temporaire pour l'engagement (plafonné à +0,2) | Alignement Mal ; incompatible Immunisé à la peur (l'immunisé ne teste pas, ne gagne rien) | Règle Peur É8 (v0.2) |
| Prédisposition magique du sang (highman) | Créature/unité | Prédisposition raciale à la magie des highmen, chiffrée au chantier magie : plafond de NM de l'unité relevé de +2 ; origine race, canal magique, payeur NM (hors PF, précédents elfe grise et drow) | Race : highman | Arbitrage Francky, 27 octobre 2026 (chiffrage : nuit du 27 octobre) |

## Règle Peur É8 — proposition v0.2 (26 octobre 2026)

Principe (arbitrage de Francky) : la peur est un effet de zone positionnel. Toute unité génératrice de peur projette une aura ; chaque lot ennemi ou allié dans l'aura effectue un jet de résistance, la position des unités sur le champ de bataille déterminant qui est exposé. Les alliages de la Loi ne suffisent pas : l'axe Bien/Mal gouverne l'effet sur les propres unités du camp.

Séquence proposée :

1. Aura : rayon fonction de la masse de la créature génératrice (référence É7 : formule de rapport de PST, reprise comme base de calibrage de la difficulté, non comme moyenne — le barycentre reste proscrit). L'aura traverse les fronts ; seule la position compte.
2. Jet de résistance par lot exposé : D20 contre une difficulté dérivée de la force de peur de la source (calibrage : la formule de masse É7 fournit l'ordre de grandeur). Modificateurs : qualité du lot (E/F : immunisés, D : avantage, C : +2), présence d'un leader (+ [BCM+BC+BR] divisé, calibrage ouvert), features (Résistance à la peur : avantage ; Aura de protection : les unités stackées avec le porteur bénéficient de l'avantage ou d'un bonus).
3. Effets selon le camp et l'alignement :
   - Lot ennemi, échec : perte de moral ponctuelle (PMP) selon la marge d'échec, la pyramide des effectifs du lot et sa qualité ; un échec catastrophique peut entraîner fuite ou désorganisation (relais vers le moral et la cohésion).
   - Lot allié d'alignement Bien ou Neutre : il teste également (une unité bonne peut avoir peur de son propre dragon voisin, sauf protection par Aura), échec : PMP.
   - Lot allié d'alignement Mal : réussite = galvanisation (+0,1 EDT temporaire pour l'engagement, plafonné à +0,2 cumulé) ; échec = PMP comme quiconque — le Mal n'est pas immunisé à la peur, il la digère mieux.
   - Immunisé à la peur : aucun jet, aucun effet, aucune galvanisation.
4. Résolution temporelle : les jets de peur sont résolus en tête du tour de bataille (avant la séquence d'oppositions) ; les modifications d'EDT s'appliquent à toute la séquence.

Points ouverts de calibrage : rayon de l'aura et difficulté (reprendre la formule de masse É7 comme référence), plafond de galvanisation (+0,2 proposé), interaction avec le moral (la PMP et le moral sont-ils le même compteur ou deux échelles), sort des unités en fuite dans la séquence d'oppositions.



## Capacités à créer (liste ouverte, à arbitrer)

- Guerrier monté (cheval, wyvern) : composition monture-cavalier déjà traitée par l'outil, à trancher en capacité ou en assemblage.
- Ingénieur de siège : bonus machines et terrassements — chantier Siège.
- Éclaireur : bonus reconnaissance — brouillard tactique.
- Hospitaliers : soins accélérés des blessés — relais Cycle du Destin.
- Stratège : répertoire de tactiques étendu — leaders.
- Fanatique : moral insensible aux pertes, contrepartie de commandement — cultes.

## Packages de capacités

| Package | Contenu proposé | Prérequis d'entrée |
| --- | --- | --- |
| Culturel — Nordique | Endurance du froid, Mur de boucliers, Berserker (option) | Type Nordique |
| Culturel — Méridien | Endurance de la chaleur et de la soif, Bâtisseurs | Type Méridien |
| Culturel — Hellène | Phalange, Rameurs | Type Hellène |
| Culturel — Insulaire | Arc de guerre, Discipline de fer | Type Insulaire |
| Statut — Légion / Garde | Garde prétorienne, Académie | Qualité D+, tradition |
| Statut — Conjurés | Conduite contrôlée / partielle / nulle (commandement) | Nécromant ou démoniste en tête de stack |
| Statut — Mercenaire | É8 à définir (CCT ×2,5 en É7) | Guilde |
| Guerre — Siège | Ingénieur de siège, Bâtisseurs, machines | Chantier Siège |

## Facteurs gradés et phase pré-engagement — proposition v0.2 (26 octobre 2026)

Principe général (arbitrage de Francky) : les facteurs spécifiques que l'É7 traitait par la règle du barycentre deviennent des effets individuels, appliqués à chaque lot avant la résolution des attaques et défenses. Phase pré-engagement : la peur (v0.2 ci-dessus), le poison, et par extension les effets de zone et de contact, se résolvent lot par lot en tête du tour de bataille ; les malus ne s'appliquent que si le jet est manqué ; la séquence d'oppositions ne voit ensuite que les valeurs dérivées modifiées.

### Le poison en grades

Le poison porte une puissance graduée sur l'échelle A à F (celle des qualités) ; la vulnérabilité d'un lot se mesure par l'écart entre le grade du poison et la qualité du lot, selon la feature qu'il porte.

Soit q le rang de la qualité du lot et p le rang du poison (A = 1 à F = 6) :

| Feature du lot | p < q | p = q | p = q+1 | p ≥ q+2 |
| --- | --- | --- | --- | --- |
| Immunité au poison (IP) | immunisé | immunisé | avantage au jet | jet normal |
| Résistance au poison (RPO) | immunisé | avantage au jet | jet normal | jet normal |
| Aucune | jet normal | jet normal | jet normal | jet normal |

Exemples (repris de l'arbitrage) : un lot C avec IP est immunisé aux poisons A, B et C, a l'avantage contre un poison D, et tire normalement contre un E. Un lot C avec RPO est immunisé aux poisons A et B, a l'avantage contre un poison C, et tire normalement contre D et E. Le malus de poison ne s'applique que si le jet est manqué.

Lecture de conception : l'immunité protège jusqu'à son rang inclus et donne un cran d'avantage au-delà ; la résistance protège en dessous de son rang et donne l'avantage à son rang. Un poison de grade supérieur traverse les protections des unités modestes — une mécanique de super-élite pour les créatures venimeuses majeures.

Généralisation : toute paire immunisation/résistance suivra cette matrice (peur — l'immunisation complète reste absolue, la résistance donnant l'avantage ; magie ; armes magiques — la TAM et la RAM se réexprimeront en grades sur la même matrice, en remplacement du coefficient 2^(RAM+TAM)).

Points ouverts : grades des poisons par race (l'araignée géante porte-t-elle un poison C, le dragon un E ?) ; le grade d'immunité d'une race à IP totale (démon, mort-vivant) — immunisation absolue ou plafonnée ; interaction équipement empoisonné (grade de l'arme) ; transposition de RAM/TAM en grades.

### Immunité totale (feature, arbitrée le 26 octobre 2026 — option 1 retenue)

Définition (arbitrage de Francky) : une race dotée d'« Immunité totale » porte une valeur de base en pour cent, propre à la race, qui représente son immunité innée à un effet. La valeur du poison (et de tout effet gradué) étant l'impact sur les PF par une résistance, l'immunité croît comme l'expérience : la qualité de l'unité applique le facteur de la courbe h(NH) normalisée sur le rang A ; au-delà de cent pour cent, l'immunisation devient absolue (aucun jet, aucun effet).

Facteurs arbitrés :

| Qualité | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| Facteur | 1,0 | 1,5 | 2,0 | 2,5 | 3,0 | 3,5 |

Exemples d'application (valeurs de base illustratives, à définir) : araignée géante 3 % (C : 6 %, F : 10,5 %), dragon 10 % (C : 20 %, F : 35 %), démon 20 % (F : 70 %), mort-vivant 25 % (F : 87,5 %). L'immunisation absolue n'est atteinte que par des valeurs de base très élevées — elle demeurera rare, l'effet narratif « créature insensible » relevant des capacités spéciales dédiées, non du sommet de la courbe.

Interaction avec la matrice graduée : l'immunité totale se substitue à l'immunisation par grade pour la race concernée — la race ne tire plus de jets par grade ; le pour cent devient sa protection universelle contre l'effet concerné ; si le jet d'immunité totale échoue, le jet de résistance gradué s'applique normalement. Une race peut porter les deux features (immunité totale contre le poison, résistance graduée contre la peur).

Points ouverts : valeur de base par race et par effet (poison, peur, magie) ; plafonnement éventuel des valeurs de base lors de la création de races ; application de la même architecture à la résistance magique (MR en pour cent, déjà native de cette forme) et à la peur des races immunisées par le lore.


## Listes blanches par chantier (le tamis, arbitrées le 27 octobre 2026)

Les capacités n'entrent au registre que par liste blanche de chantier, avec source et page citées.

| Chantier | Sources admises |
| --- | --- |
| Magie (PMB/PMR, NM) | Spell Compendium, Complete Mage, Complete Arcane, Complete Divine, DMG 3.5 (objets et borne au NM), Complete Psionic et Expanded Psionics Handbook (si le psionique entre au canal), Secrets of Pact Magic et Tome of Magic (canal pacte), Magic of Incarnum (candidat canal incarnum — à l'arbitrage du chantier magie), Book of Vile Darkness et Book of Exalted Deeds (variantes infâmes et exaltées) |
| Postures et doctrines | Complete Warrior, Heroes of Battle, Tome of Battle (la Voie Sublime — postures et manœuvres), Book of Vile Darkness et Book of Exalted Deeds (doctrines extrêmes) |
| Races | Races of Stone, Template races (gabarits raciaux), Drow of the Underdark, Oriental Adventures, Frostburn, Sandstorm, Stormwrack (dépôt du 27 octobre), Savage Species (grilles de monstres), Races of the Dragon, Races of Destiny, Dragon Compendium (volume I) |
| Morts-vivants pensants et extraplanaires | Ghostwalk, Libris Mortis, Complete Vampire, Elder Evils, Heroes of Horror (le miasme et le Dread Necromancer), Fiendish Codex I (possession et extraplanaires), Fiendish Codex II (les diables et leurs contrats) |
| Grilles de métier | Unearthed Arcana, Iron Heroes, DMG 3.5 (classes de PNJ), Player's Handbook (châssis des classes de base — arrivé au sixième ajout, 27 octobre au petit matin), Player's Handbook II, Defenders of the Faith, Masters of the Wild, The Assassin's Handbook, Tome and Blood (mages et ensorceleurs — dépôt du 27 octobre), Sword and Fist (moines et guerriers — dépôt du 27 octobre) |
| Guildes et unités spéciales (ajout de la nuit) | Enemies and Allies (quartiers de guilde, PNJ du crime et de la loi), The Assassin's Handbook (organisations Vultur et Sirat), Player's Handbook II (affiliations et bénéfices d'équipe), Arms and Equipment Guide (biens et véhicules) |
| Artefacts (ajout de la nuit) | Weapons of Legacy (gabarit des objets héritage), Exemplars of Evil (repaires et complots), Deities and Demigods (dons divins) |
| Environnements (froid, désert, mer — dépôt du 27 octobre) | Frostburn, Sandstorm, Stormwrack (la trilogie est bouclée — marin, unités navales, Navigation, embarquement) |

## Triage du registre selon les trois origines (arbitré le 27 octobre 2026, fin de soirée)

Règles de triage adoptées :

1. Culture → métier : la culture s'apprend, c'est une formation (arbitrage Francky) — les capacités des types d'humains sont des doctrines de la chaîne métier.
2. Statuts d'institution (garde prétorienne, unité spéciale, mercenaire) → catégorie spéciale : des institutions payées en entretien, non des savoirs de niveau (arbitrage Francky).
3. Le canal magique, psionique ou pacte facture au NM pour les capacités de race et de métier ; la catégorie spéciale déclare son canal de coût (trésor, entretien, NM).
4. Les cartes multicartes se dédoublent par attachement (dissimulation : sang du hobbit contre métier du rôdeur ; résistance à la peur : race contre formation contre équipement ; immunisé à la peur : nature morte-vivante contre doctrine berserker contre état de qualité) — la règle de l'origine unique l'exige.
5. Les malus (unité non entraînée, PMV réduit du nain, sensibilité à la lumière du duergar, plafond D(nature) du hobbit) sont des états : pas de payeur, l'état est le prix.

### Race — canal physique (payeur : PP racial et plafonds de nature)

| Capacité | Note de triage |
| --- | --- |
| Infravision | créatures souterraines ; pas de malus de nuit ni de souterrain |
| Vision dans les ténèbres | morts-vivants, extraplanaires ; aucune obscurité ne les gêne |
| Immunité au poison (IP) | immunisation par la matrice graduée (p contre q) |
| Résistance au poison (RPO) | grades ; hobbit ¾, gnome ½ |
| Résistance au tournage (RAT) | grade de résistance du lot face au tournement |
| Résistance à la peur (attach race) | avantage au jet de résistance |
| Immunisé à la peur (attach nature morte-vivante) | aucun jet, aucune galvanisation |
| Ignore fortification | démons, licornes ; vol |
| Peur (aura naturelle) | dragon, mort-vivant ; jet de zone positionnel (règle Peur É8) |
| Poison (nature, grades A-F) | venins ; matrice graduée |
| Régénération (É7/É8) | trolls ; blessés standard, blocage par feu, acide, magie |
| Vol (nature) | aigles, wyverns ; bonus terrain vol |
| Amphibie / sous-marin | hommes lézards, tritons |
| Bonus/malus de terrain (nature) | races liées au milieu |
| Dur à cuire | races massives, morts-vivants, peau épaisse |
| Mort-vivant (nature) | facteur structurel 1,8, pas de blessés, CCSN 0 |
| Immunité totale | valeurs de base par race (poison, peur, magie) |
| Dissimulation (attach hobbit) | DIS gratuit et permanent |

### Race — canal magique (payeur : NM)

| Capacité | Note de triage |
| --- | --- |
| Infravision active | drow : INF sans archerie, moitié des malus dans les ténèbres |
| Résistance magique (MR) | drow 60-70 % des PMR offensifs neutralisés |
| Résistance aux armes magiques (RAM) | incorporels ; grades croisés avec la TAM |
| Souffle | dragons, béahir ; PMR de Destruction, effet de peur séparé |
| Énergie (NE) | extraplanaires, lich |
| Prédisposition magique du sang | highman ; effet à chiffrer au chantier magie |

### Métier — canal physique (payeur : NH et QE)

| Capacité | Note de triage |
| --- | --- |
| Archer | formation au tir ; l'arc est l'outil du métier (entretien) |
| Berserker | doctrine culturelle nordique → métier (arbitrage culture) ; immunisé à la peur par doctrine |
| Mur de boucliers | doctrine nordique ; formation défensive |
| Phalange | doctrine hellène ; EDT +0,1 en ordre serré |
| Arc de guerre | doctrine insulaire ; tir favorable en lot |
| Rameurs | doctrine hellène ; PMV naval favorable |
| Discipline de fer | doctrine insulaire ; EDT +0,1 de commandement |
| Raider | doctrine gobeloïde et orque ; le pillage paie le déplacement |
| Endurance du froid | culture boréale → métier (arbitrage culture) |
| Endurance de la chaleur et de la soif | culture méridienne → métier (arbitrage culture) |
| Bâtisseurs | guilde et métier du bâtiment ; bonus travaux |
| Unité non entraînée | malus de formation absente — l'état est le prix |
| Instructeur | leader ou invalide ; relève le plafond B → C |
| Dissimulation (attach rôdeur) | formation du rôdeur |
| Résistance à la peur (attach formation) | entraînement |
| Blocage de régénération | tactique ; CDT ou emploi de tacticien |

### Métier — canal magique (payeur : NM)

| Capacité | Note de triage |
| --- | --- |
| PMB | profession de lanceur de sorts ; réserves de l'unité |
| Tourner les morts-vivants | prêtres (PMB/10), théurgistes (/20), nécromants (/8) ; tournement gradué |
| Aura de protection (attach paladin) | BC ; avantage aux unités stackées avec le porteur |

### Spéciale — payeur déclaré

| Capacité | Note de triage |
| --- | --- |
| Embarquement | infrastructure navale ; entretien |
| Ravitaillement | convois et bêtes de somme ; entretien (PSTN) |
| Académie | construction ; entretien ; EDT +0,1 |
| Garde prétorienne | statut d'institution → spéciale (arbitrage) ; entretien ; EDT +0,5 |
| Unité spéciale ou secrète | statut et guilde → spéciale (arbitrage) ; entretien ; EDT +1,0, CCT ×2 |
| Mercenaire | guilde → spéciale (arbitrage) ; entretien |
| Immortels | artefact, pouvoir divin, organisation ; trésor + NM ; canal magique |
| TAM | équipement magique ; trésor et entretien ; grades croisés avec la RAM |
| Galvanisé | effet d'alignement (Mal) ; état plafonné à +0,2 |
| Vol mono hex | magie ou équipement ; 1 PMR (NM) |
| Embuscade | dérivée (Unité spéciale ou Dissimulation) ; payeur via la capacité d'entrée |
| Conjurés (conduite) | statut d'unité animée ; payeur : PMB du contrôleur (NM) |

## Attribution aux races de test — l'échantillon (le 27 octobre 2026, fin de soirée)

L'échantillon couvre chaque famille du catalogue et chaque combinaison origine × canal du registre : quinze races, plus les trois profils de référence en banc d'essai (légion hellène — chaîne métier pure sur l'humain nu ; compagnie aérienne montée sur griffons — composition monture-cavalier ; horde de squelettes conjurés — canal magique du nécromant). Les quarante-trois entrées du catalogue — et les futures arrivées de D&D 3.5, dont le potentiel dépasse les cinquante-quatre lignes d'É7 et les soixante-trois du fichier de création d'unités, nuances comprises — suivront le même patron, carte par carte.

| Race de test | Famille | Race — canal physique (PP/nature) | Race — canal magique (NM) | Métier / spéciale du scénario |
| --- | --- | --- | --- | --- |
| Humain | Races de peau | aucune — l'ancre nue | — | phalange et archer (doctrines), PMB du mage (métier/magique) |
| Nain | Races de peau | vision noire, stabilité, +2 poison et sorts, esquive +4 contre les géants, haine ancestrale, sens de la pierre, PMV réduit | — | guerrier de la montagne ; académies (spéciale) |
| Drow | Races de peau | vision dans les ténèbres 120 pi, immunité au sommeil, sensibilité à la lumière | ténèbres, lumières dansantes, feu des fées (1/jour) ; MR | prêtres et ensorceleuses ; conjurés |
| Hobgobelin | Races de peau | vision noire 60 pi, +4 discrétion | — | drill A/E → D/E (doctrine), raiders ; légion de test |
| Hobbit | Petits peuples | chance (+1 à tous les jets, +2 contre la peur), agilité, petite taille, dissimulation du sang, RPO ¾ ; plafond D(nature) 0 | — | rôdeurs (dissimulation du métier) |
| Gobelin | Petits peuples | vision noire 60 pi | — | raider (doctrine) ; worg de guerre (composition) |
| Gnome | Petits peuples | vision nocturne, +2 contre les illusions, +1 contre kobolds et gobelinoides, RPO ½ | dons magiques (lumières dansantes, son fantôme, prestidigitation) ; maîtrise illusoire (DC +1) | illusionniste, ingénieur |
| Highman | Races de peau | sang supérieur (PP 1,045) | prédisposition magique du sang | mages — départ de PMB favorable (à chiffrer au chantier magie) |
| Cheval | Monture | docile (exception motivée NH 0,13), armure naturelle légère C | — | composant monture (assemblage) |
| Worg | Bêtes et prédateurs | croc (arme B), trip ; variante noire : dissimulation accrue | — | monture gobeline ; dressage (exception +1 NH) |
| Griffon | Monture | vol, pounce/rake, part monture 87,6 % | — | cavalerie aérienne — profil de référence |
| Géant du feu | Haute gamme | immunité au feu, vulnérabilité au froid, EDT 1,2 (LM) | — | bâtisseurs forgerons (doctrine et guilde) |
| Dragon rouge adulte | Haute gamme | peur, vol, armure naturelle F, immunité au feu, vulnérabilité au froid | souffle de feu (PMR de Destruction), RM draconique | aucun métier — la marge du roi (PP 1,50) |
| Golem de fer | Golems | RD 15/adamantine, nature constructe (PP 4, NH 0) | immunité à la magie, souffle poison | conduite nulle — constructe sans esprit |
| Squelette | Morts-vivants | nature morte-vivante (×1,8), vision dans les ténèbres, immunités au poison et à la peur, pas de blessés, CCSN 0 | — | conjurés — conduite contrôlée par le PMB du nécromant |

## Points ouverts

1. Relevé É7 complet : les vingt-sept capacités de la section 8.1.3 sont toutes relevées (v0.4). Restent à préciser : grades des poisons par race, valeurs de base d'immunité totale par race et effet, transposition TAM/RAM en grades. Le tableau des habiletés de l'unité spéciale (Dse, Dsv, Esp, Trc par qualité) est résolu le 27 octobre au soir : table relevée et déposée à la grille des métiers (v0.1, section 5) — PF indicatifs retirés comme artefacts, habiletés retenues par qualité avec coefficient de guilde.
2. Application lot par lot des capacités à effet fractionnaire (poison, peur, RAM) en phase pré-engagement — ordre d'application des champs d'effet.
3. Coûts d'accès des packages (tradition, guilde) et incompatibilités.
4. Interaction capacities × doctrines × postures dans la résolution (ordre d'application des champs d'effet).
5. Triage du registre existant : réalisé le 27 octobre au soir (section dédiée, cinquante-cinq cartes triées) — restent à trier les cartes créées par les chantiers en cours (grilles de métier, chantier magie, postures et doctrines).
6. Grilles de métier par niveau — ouvertes le 27 octobre au soir : registre des trente métiers, matrice V7 transcrite, gabarit de fiche (patron de la classe raciale drow), grille exemple du guerrier et propositions d'ajouts déposés à la grille des métiers (v0.1) ; PV de race jamais gonflé par le niveau ; arbitrages en attente (statut de Templier et Warlock, cumul, conversion D20, cadence des paliers).
## Tournement gradué — proposition v0.1 (26 octobre 2026, orientation Francky)

Architecture identique au poison : un grade offensif, un grade de résistance de la cible, une part en pour cent modulée par l'écart de grades, puis un jet de résistance.

1. Grade de tournement p : égal à la qualité du lot de tournement (A à F). Prérequis de la capacité : théurgistes (PMB/20), prêtres (PMB/10), nécromants (PMB/8 ; démonistes assimilés pour les extraplanaires, grade effectif +1 cran ou +4 sur le jet offensif — à arbitrer).
2. Part de PF affectée avant résistance : A 10 %, B 20 %, C 35 %, D 50 %, E 70 %, F 90 % ; ±10 points par cran d'écart avec la qualité q de la cible (cible de grade supérieur réduit, inférieur augmente), plancher 0, plafond 100 %.
3. Jet de résistance D20 par lot cible : r = grade de résistance au tournement de la cible (par défaut sa qualité ; la feature Résistance au tournement peut l'élever). Matrice graduée universelle : immunisé si r ≥ p+2, avantage si r = p+1, normal si r ≤ p. Réussite : part affectée réduite de moitié. Échec : part complète.
4. Effet : PF neutralisés pour l'assaut (reproduction É7). Si l'écart p − r atteint 3 crans ou plus (transposition du seuil NH > RAT+5), le résultat devient destruction ou contrôle au choix du tournant, sans jet de résistance supplémentaire.
5. Portée : le lot de tournement affecte des PF à hauteur de sa force de tournement (PMB/diviseur), dans un stack adverse désigné.

Exemple : prêtres qualité C (35 %) contre des squelettes qualité B (écart +1 cran, 45 %) ; squelettes r = B ≤ p = C, jet normal ; réussite : 22 % des PF neutralisés, échec : 45 %.

## Décisions du 26 octobre 2026 (soir)

- Tournement : traité comme le poison, à la matrice graduée ci-dessus (proposition à valider sur les pourcentages de base).
- Embuscades : règles É7 conservées sans modification (multiplicateurs ×2 à ×5 par qualité, table de PF par taille). L'embuscade devient une feature déclarée (prérequis : Unité spéciale ou Dissimulation), sans redesign.
- TAM/RAM en grades : validé en principe. Objection du calcul par attaque/défense levée par précalcul : TAM et RAM sont des attributs statiques du profil, comparés une fois par paire d'unités engagées et mis en cache par le moteur (recalcul seulement à création ou modification du profil) ; la majoration des PF par TAM est déjà intégrée au profil, le per-attaque se réduit à un booléen de malus contre les créatures exigeant des armes magiques.
- Tableau complet de l'unité spéciale (Dse, Dsv, Esp, Trc par qualité) : confirmé comme point restant.
## Reformulations issues de la double devise (26 octobre 2026 soir)

- Embuscade (unité spéciale) : jet de surprise ; réussite = avantage au jet d'attaque ET bonus de marge +2 à +5 selon la qualité de l'embusquée ; les multiplicateurs É7 ×2-×5 deviennent des bornes de contrôle en individus détruits.
- Souffle : attaque native du duel (consomme un jet d'attaque, une fois par assaut, coût en PMR de Destruction) ; porte le bonus de marge de siège de l'espèce ; dégâts selon la formule 3a × facteur de Destruction des PMR investies ; l'effet de peur associé demeure un jet de peur séparé.
- Unité spéciale ou secrète : la table de PF par taille et qualité É7 est abandonnée — création par le pipeline standard, la taille portant les PV ; habiletés Dse, Dsv, Esp, Trc en point ouvert (relais chantier Villes).
