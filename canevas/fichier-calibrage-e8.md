---
name: "fichier-calibrage-e8"
title: "Le fichier de calibrage — Édition 8, v0.2"
type: "text/markdown"
---

# Le fichier de calibrage — Édition 8, v0.2 (28 octobre 2026, soir)

Statut : v0.2 — section 9 « Le moteur de combat » ajoutée le 28 octobre au soir, relevé du chantier combat (valeurs natives E5/É7 consignées, formule du NDB en proposition). Version initiale v0.1, chantier ouvert par sentence de Francky du 28 octobre au soir. CHARTE : toute valeur du livret É8 passe par le pipeline ; toute constante vit dans CE fichier — les chantiers citent, le fichier recueille ; l'É7 demeure le guide des valeurs (les tables natives conservées ne se recalibrent pas sans sentence) ; l'équilibrage ABSOLU demeure différé aux exemples chiffrés de Francky — le fichier rassemble et statue, il ne fige pas les équilibres. Statuts : ARBITRÉ (avec date), PROPOSITION (attend le mot), CHÂSSIS (règle E5 consignée comme gabarit), À PROPOSER (cité sans valeur), CONSERVÉ (É7 tel quel).

## 1. Le pipeline — la création de toute valeur

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| PF (formule complète) | PF = 1,667 × PP × TC² × h(NH) × QE × m(NM) | ARBITRÉ (26-27 octobre, modèle testé sur les ancres) | Création de toute unité, lot et créature |
| Constante d'échelle | 1,667 (l'ancre humaine) | ARBITRÉ | Portée par l'humain nu : NH 0, TC 1,0, PP 1, PST 10, PMV 12 |
| h(NH) | h(NH) = 1 + NH/5 | VALIDÉE à écart nul sur sept créatures É7 (cheval, elf, kobold, lézard géant, homme lézard, centaure, aigle géant) | Le niveau paie au NH, jamais au PV |
| Plafond de h(NH) | mention de plafonnement portée au bureau ; AUCUNE valeur consignée au journal | À PROPOSER | Garder la courbe bornée sur les très hauts niveaux |
| g(TC) | TC² (exposant calibré à 2,048 sur les ancres humain-cheval, TC² retenu) | ARBITRÉ | La masse porte le PF ; écart résiduel du cheval (2,5 %) absorbé par h(0,13) |
| m(NM) | m(NM) = 1 + 0,8 × NM | ARBITRÉ | Le NM paie les capacités magiques hors PF de base ; le régiment de mages humains garde m(NM) = 1 |
| PV individuels | PV = 10 × TC³, herbivores ×2 | CALÉ à écart nul sur 24 lignes É7 | La masse est de race, jamais gonflée par le niveau |
| PV du lot | effectif × PV individuel × facteur de qualité des PV × JD (jauge de dégâts ; zéro = détruit ou disloqué) | CONSERVÉ (formule) ; RENOMMÉ : S → JD (sentence du 29 octobre, charte adoptée) ; le facteur de qualité des PV au chantier combat | Résolution |
| PP | normalisés (humain = 1) ; types d'humains : enveloppe identique TC 1, PP 1, la nuance passant par les registres dérivés | ARBITRÉ (21-22 octobre) ; RENOMMAGE EN ATTENTE : le PP nu est INTERDIT (sentence du 30 octobre au soir) — proposition PPC, la vague suivante renommera la formule | Races ; la variation minime de PP (±10 %) est écartée |
| Bandes de qualité | A 1-2, B 3-7, C 8-11, D 12-15, E 16-19, F 20+ | ARBITRÉ (mapping É8, 27 octobre) | Toute l'échelle du jeu |
| Repère É7 qualité/NH | A 5, B 10, C 15 (baptême du feu), D 20 (QE 2,0), E 25 (QE 6,0), F 37 (QE 8,0, NM 10) | CONSERVÉ comme repère ; les QE par bande au livret É8 à chiffrer | La table É7 est consignée, la correspondance par bandes retenue |
| Multiplicateurs de combat | AUCUN plafonnement ; l'application affiche l'agrégat et sa décomposition, le détail au MdM | ARBITRÉ (21 octobre) | Résolution |

## 2. Le temps

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| Le mois | 28 jours | ARBITRÉ (21 octobre) | Tout le moteur temporel ; recalcul des durées É7 en base 28 |
| Cadence des paliers de capacité | niveaux 1, 4, 8, 12, 16, 20, puis tous les cinq | À VALIDER à la première fiche portée au jeu | Grilles de métier |
| Récupération des PMB | tour sur tour ; les PMB non utilisés en fin de tour sont perdus | CONSERVÉ | L'économie de la magie — le goulot est le tempo |
| Cadence de la grande magie | un sort tous les trois tours (deux tours de récupération) | CHÂSSIS E5 | Grande magie |

## 3. La magie

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| k (PMB) | PMB = n(n+1)/k, k = 20 | ARBITRÉ (27 octobre — la constante porte toutes les tables É7 : les CML de 50 à 750 sont calibrés contre elle) | Réserve de tout lanceur |
| Répartition du leader | la moitié des PMB du leader, l'autre moitié du pion leader ; dans une unité, le niveau est celui du plus haut lanceur | CONSERVÉ | Leaders lanceurs |
| PMR | les tables donnent les PMB pour 1 PMR ; minimum 1 PMR pour un effet ; les PMR se cumulent entre unités | CONSERVÉ | Résolution des sorts (matrice des coûts) |
| Apprentissage GM | PA 5/10/15/20/25 pour NHm 30/35/40/45/50 ; un tour d'étude pour un sort de son NHm | CHÂSSIS E5 | Grande magie |
| Maîtrise imparfaite | 5 × n × (n+1) %, n = écart NHm − NH ; résultat SECRET du MdM | CHÂSSIS E5 | Grande magie sous le NHm |
| Pour cent de maîtrise | 100 − 5 × n × (n+1), borné | PROPOSITION | La borne et la formule attendent le banc d'essai |
| Lancement GM | 3 AM ; l'intégralité des PMB dépensée dès le début ; PA additionnels possibles | CHÂSSIS E5 | Grande magie |
| Backfire | Destruction des PMB investis, ou perte de capacité magique partielle ou totale, temporaire ou définitive | CHÂSSIS E5 (= l'éclatement à la figure, sentence du 27 octobre) | Grande magie |
| Surcharge | seuil GM = NIVEAU 20 ; sous 20 impossible ; de 20 à NHm − 1, à risque | ARBITRÉ puis AMENDÉ (27 octobre, sentence de Francky) | Leaders avec pions leaders |
| Fatigue GM | NE requis = NHm ; le NE du sort est perdu pour la GM, récupéré de moitié par tour ; NE insuffisant : n(n+1)/2 tours de retour, malus [5 + n(n+1)/2], plus AUCUNE magie ni PMB jusqu'au retour à zéro | CHÂSSIS E5 | Grande magie |
| Concentration RIT/TPR | aucun PMV ; l'interruption peut dévaster | CHÂSSIS E5 | Grands effets positionnels |
| Tournement — prérequis | PMB/20 théurgistes, /10 prêtres, /8 nécromants (démonistes assimilés pour les extraplanaires) ; nécromants +4 | CONSERVÉ É7 | Tourner les morts-vivants |
| Tournement gradué | parts A 10 %, B 20 %, C 35 %, D 50 %, E 70 %, F 90 % ; ±10 points par cran d'écart (plancher 0, plafond 100) ; réussite = part réduite de moitié ; écart de 3 crans = destruction ou contrôle sans jet | PROPOSITION v0.1 (orientation Francky du 26 octobre ; à valider sur les pourcentages) | Tourner les morts-vivants |
| Magie intermédiaire — discriminateurs | NH 12+ (bandes D à F) ; CML 10-50 PMB ; ratios 2-10 PMB par PMR ; 1 AM par sort ; durée le combat ou le tour ; position PI obligatoire ; un sort d'assaut par lanceur et par combat, un second pour 1 PA | ARBITRÉ (27 octobre) | La magie d'assaut (cuvée dédiée) |
| Canal pacte | plafonné à la magie intermédiaire, JAMAIS la GM ; magie standard au tarif du sorcier (Sc) | ARBITRÉ (28 octobre au soir, sentences du warlock) | Warlock |
| Éclat occulte | à volonté, sans PMB, puissance plafonnée ; le plafond suit le pipeline, la cadence relève du canal | À PROPOSER (le chiffrage du plafond attend ici) | Warlock |
| Barde | le meilleur des tarifs Mg et Dr | ARBITRÉ (28 octobre au soir, sentence de Francky) | Matrice des coûts |
| Semi-lanceurs | niveau effectif = niveau − 5 à − 10 (l'écart exact au jugement du MdM, histoire du personnage) ; l'accès se juge au NIVEAU EFFECTIF, le tarif est celui de la classe de référence | ARBITRÉ (fourchette E7 conservée ; sentence du 28 octobre sur l'accès) | Paladin, ranger, sicaire, warmage, courtisane, templier, barde |
| Highman | prédisposition du sang : plafond de NM de l'unité relevé de +2 | ARBITRÉ (27 octobre) | Le sang donne la profondeur, non la réserve |
| Résistance magique | en pour cent des PMR offensifs neutralisés (drow 60-70 %) | CONSERVÉ | Races |
| Dispel | 2 PMR contre 1 PMR, 1 pour 1 en désignant le sort | CONSERVÉ | Contre-magie |

## 4. Les lieux de puissance (la quatrième source)

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| Rang — recharge | rang 1 : 1 mois ; rang 2 : 1 saison ; rang 3 : 2 saisons ; rang 4 : 1 année | ARBITRÉ (arbitrage créatif de Francky, 28 octobre) | Nœuds, puits, cercles |
| Stock | 100 × rang² PMB (100 / 400 / 900 / 1600) | ARBITRÉ | Le nœud paie le terrain, jamais le talent |
| Restitution | LINÉAIRE sur la période (rythme stock ÷ durée) | ARBITRÉ | Flux du nœud |
| Étages servis | rangs 1-2 : mineure et intermédiaire (le rang 2 sert la moitié du CML d'une GM) ; rang 3 : GM au CML complet ; rang 4 : GM complète | ARBITRÉ | Opérateurs (régiment de mages D, leaders) |
| Faveur de maîtrise | +5 × rang (passive, aux alliés du consacrant) ; verrouillage : −5 × rang pour l'ennemi | ARBITRÉ | Surcharge des leaders à la source |
| Convalescence | +2 / +3 / +4 NE par tour aux rangs 2 / 3 / 4 | ARBITRÉ | Récupération de fatigue GM |
| Extension naturelle | 3-4 hex aux rangs 3-4 | ARBITRÉ | Aire du nœud |
| Le phare | repérage GM bonus 10 × rang | ARBITRÉ | L'inconvénient lumineux |
| Backfire dévoré | échec à la source = dévastation de l'hex, épuisement ou corruption du nœud | ARBITRÉ | L'inconvénient terrible |
| Surexploitation | famine magique régionale | ARBITRÉ | L'inconvénient économique |
| PA d'activation | 5 × rang ; DOUBLÉS à l'activation renforcée (l'Éveil) | PROPOSITION | Sort de magie intermédiaire + PA |
| L'Éveil du nœud | NH 12 (bandes D-F), 1 AM, CML 10 (l'amorce), position PI sur le nœud, consécration requise ; l'Éveil : une fois par cycle annuel, leader conducteur obligatoire | ARBITRÉ (NH, AM, CML consignés à la cuvée) | Famille XI des lieux |
| Principe du lieu | JAMAIS d'AM, JAMAIS de NHm, JAMAIS de NM : la lampe du lieu paie le terrain, jamais le talent | ARBITRÉ | Le goulot est le tempo |

## 5. Les guildes et les actions secrètes

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| Coefficients de partage | voleurs 2, courtisanes 1,5, assassins 1, espions 0,5 — sur 45 % des VTB | ARBITRÉ (27 octobre, l'échelle complète) | Revenus des guildes |
| Conversion PS | 1 PA = (niveau/5) PS pour voleurs, sicaires, assassins, courtisanes ; voleurs et courtisanes : aussi (niveau/5) PC ; marchand : (niveau/3) PC | CONSERVÉ É7 | Économie souterraine |
| Niveau de guilde | n = habileté générale ÷ 3 | CONSERVÉ É7 | La table des guildes |
| Table des guildes | chaque colonne totalise 15n (Ass, Vol, Cou, Esp) | ARBITRÉ (amendement de Francky, 27 octobre fin de nuit) | Efficacité des unités secrètes |
| Contre-espionnage | jet opposé simple Dse contre Dsv, sans modificateur de familiarité | ARBITRÉ (27 octobre) | Guerre des renseignements |
| Renseignement continu | flux mensuel gradué partiel / précis / complet au prorata des PS investis | ARBITRÉ (27 octobre) ; les seuils du prorata À PROPOSER ici | Guilde des Espions installée |
| Bases de jets (relevé É7 conservé) | prise de guilde 8 PS (dilution de la préparation : un tiers par tour au-delà du premier) ; élimination : prise +4 ; assassinat 5 PS ; vol de fonds 5 PS [jet 20 − niveau de voleur] ; vol de biens 5 PS [jet 15 + niveels des voleurs] ; enlèvement : deux jets enchaînés, malus 4 puis 12 ; embuscade 5 PS ; espionnage 1 PS ; reconstruction : 5 % des PS par point de marge, 20 % automatique par tour ; police de grande envergure : 2 PA/PS par PS de guilde | CONSERVÉ É7 (relevé page à page du chantier Bas-fonds) | Actions secrètes |
| Modificateurs d'assassinat | souverain +10, cible chez elle +20, tentative publique +10, créatures non attendues +10 par pouvoir (jusqu'à +50 par race exotique) | CONSERVÉ É7 | L'élimination |
| Groupes d'aventuriers | 30 PMV, CCSN 0, moral 200, 2 PA de protection automatiques ; recrutement 10 PA | CONSERVÉ É7 | La troisième force |

## 6. L'EDT, la peur et les matrices graduées

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| EDT | EDT = 1,0 + D(nature) + D(formation) + D(commandement), borné [0,4 ; 2,0] | PROPOSITION formalisée (26 octobre) | Efficacité des troupes |
| D(nature) | loyal matériel +0,2 ; loyal extraplanaire +0,3 ; neutre et bienveillant 0 ; chaotique mal matériel −0,2, extraplanaire −0,3 ; mort-vivant : l'alignement seul ; créatures paisibles plafonnées à 0 | PROPOSITION | EDT |
| D(formation) | unité spéciale +1,0 ; garde prétorienne, légion, mamelouk +0,5 ; académie +0,1 ; qualité D+ +0,2 ; qualité C +0,1 ; formée 0 ; levée sans caserne −0,2 puis +0,1 par mois ; séparation −0,1 temporaire | PROPOSITION | EDT |
| D(commandement) | leader tacticien ou Discipline de fer +0,1 ; conjurées contrôlées 0, partielles −0,1, non contrôlées et foule −0,3 | PROPOSITION | EDT |
| Baptême du feu | +0,1 unique après le premier engagement, plafonné | PROPOSITION | EDT |
| Galvanisation | réussite contre la peur pour une unité d'alignement Mal : +0,1 EDT temporaire pour l'engagement, plafond +0,2 cumulé ; incompatible avec l'immunité (l'immunisé ne teste pas, ne gagne rien) | ARBITRÉ (peur v0.2) | Règle Peur |
| Immunisation totale | valeur de base en pour cent propre à la race, croissant avec la qualité : facteurs A 1,0, B 1,5, C 2,0, D 2,5, E 3,0, F 3,5 ; au-delà de 100 % : immunisation absolue | ARBITRÉ (26 octobre, option 1 retenue) ; les valeurs de base par race et effet À PROPOSER | Poison, peur, magie |
| Matrice graduée universelle | immunisé si r ≥ p+2 ; avantage si r = p+1 ; normal si r ≤ p ; le malus ne s'applique que si le jet est manqué | ARBITRÉ (26 octobre, le poison en grades ; généralisée à toute paire immunisation/résistance) | Poison, peur, magie (MR — effets magiques), tournement ; le couple TAM/RAM est retiré du moteur É8 (la matrice demeure son foyer d'accueil si l'immunité aux armes non magiques renaît comme capacité) |
| Qualité contre la peur | E/F et leaders immunisés ; D : avantage ; C : +2 | PROPOSITION (peur v0.2) | Règle Peur |
| Facteur mort-vivant | structurel 1,8 ; pas de blessés ; CCSN 0 ; immunisé peur et poison | CONSERVÉ É7 | Morts-vivants |
| La formule E5 de la peur | [10 × (PST assaillant + PMP) ÷ (PST défenseur + 10 × PMP)] ; la peur générée de part et d'autre s'annule au prorata de leurs effets respectifs ; la perte réduite de moitié dans les cas précisés par le texte E5 | CONSERVÉ E5 COMME RELEVÉ ; ratio de stacks ENTIERS — à retravailler sous lots homogènes : question ouverte (par engagement ou au moral agrégé), P14 du chantier combat | La peur au champ de bataille |

## 7. Les conversions et les échelles

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| Niveau d'habileté | pourcentage du niveau dans la profession (parmi 25, 50, 75, 100), arrondi au niveau supérieur ; l'histoire du personnage ajuste (MdM) | CONSERVÉ (chapitre 8 v01) | Matrice V7 |
| Cumul entre professions | le meilleur calcul parmi les professions exercées, jamais la somme ; une ressource accordée deux fois ne se prend qu'une fois | PROPOSITION (point ouvert du chapitre 8) | Multi-classés |
| Conversion en bonus D20 | bonus = (niveau − 20) ÷ 2, arrondi vers le bas (apprenti 10 : −5 ; professionnel 20 : 0 ; maître 40 : +10) | PROPOSITION | Jets civils |
| Échelle non militaire | de −6 (aucune) à 40 (maître de renommée mondiale) ; apprenti 10, professionnel 20 et plus | CONSERVÉ | Habiletés |
| Échelle militaire | de −10 à +10, 0 = professionnel ; conversion de référence [(niveau + 10) × 2] | CONSERVÉ | CMT, CMA, CMM, LDS |
| PA du leader | PA = plus grand NH ÷ 10, arrondi au plus proche | CONSERVÉ É7 | Actions |
| LDS par Cbt | 3-6 : −2 ; 7-10 : 0 ; 11-14 : +1 ; 15-18 : +2 ; 19-22 : +3 ; 23-26 : +4 ; 27-30 : +5 ; 31-34 : +6 ; 35-38 : +7 ; 39-42 : +8 ; 43-46 : +9 | CONSERVÉ É7 | Commandement |
| Commandement du général | le meilleur domaine à plein, les autres à −3 et −6 (ex. Cbt 30 : +5/+2/−1 en T/A/M) | CONSERVÉ É7 | Leaders |
| Leader secret | Lds réduit de moitié hors de ses domaines — Ls(x) | CONSERVÉ É7 | Opérations mixtes des guildes |
| Jets É8 | fermé : [11 + difficulté] sur D20 ; ouvert : le 20 relance et cumule, le 1 enchaîne | CONSERVÉ É7 | Toute résolution |

## 8. Les unités — valeurs structurelles conservées

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| PST réels | 10 par cohorte, 3 par compagnie, 1 par section, 0,2 par groupe, 0,01 par homme | CONSERVÉ É7 | Sorts fonction des effectifs |
| CCT (entretien annuel) | 1 troupes régulières ; 2 unités spéciales ; 2,5 mercenaires ; 5 dragons | CONSERVÉ É7 | Phase de taxation |
| CCSN | 1 omnivores et carnivores ; 2 herbivores ; 0 sans nourriture (démons, morts-vivants, golems) | CONSERVÉ É7 | Ravitaillement |
| Embuscade | multiplicateurs ×2 à ×5 selon qualité (bornes de contrôle en individus détruits) ; réussite = avantage au jet ET bonus de marge +2 à +5 ; une seule par tour et par unité, comptée pour un assaut ; AUCUNE magie hors action spéciale | CONSERVÉ É7 (reformulé 26 octobre) | Unités secrètes |
| Séparation et regroupement | une manœuvre gratuite par tour (B à D), deux (E) | CONSERVÉ É7 | Unités secrètes en campagne |
| Évasion | personnage seul NDB 0 ; leader avec pion ou GA 4 ; unité secrète 5 + PST × 5 ; en ville −(niveau ÷ 2) ; téléportation ou changement de plan −10 (réserve d'évasion : AM et PMB gardés) ; fin de combat 2 PA (4 pour spécialiste ou semi leader), la marge adverse s'ajoute ; en cours de combat 4 PA, bonus de 10 ; l'évasion se joue toujours avant le jet de survie et le rend caduc en cas de réussite | CONSERVÉ É7 | Le leader ne meurt pas bêtement |

## 9. Le moteur de combat — valeurs natives (relevé E5/É7, chantier combat ouvert le 28 octobre au soir)

| Constante | Valeur | Statut | Usage |
| --- | --- | --- | --- |
| Jet de combat | Cf = PF assaillant ÷ PF défenseur, arrondi en dessous ; sous 1 : inversé et signé changé ; au-delà de 6 : NDB ±1 ; jet OUVERT de difficulté [11 + NDB + bonus des leaders (CMT, BR, BC)] — à forces égales sans bonus, l'assaillant gagne sur 11+ | CONSERVÉ E5 (confirmé É7) | La résolution de tout assaut |
| Table des NDB | 24 paliers : Cf 1,0 = 0 ; 1,1 = −1 ; 1,2 = −2 ; 1,3 = −3 ; 1,4 = −4 ; 1,5 = −5 ; 1,6 = −6 ; 1,7 = −7 ; 1,8 = −8 ; 1,9 = −9 ; 2,0 = −10 ; 2,2 = −11 ; 2,4 = −12 ; 2,6 = −13 ; 2,8 = −14 ; 3,0 = −15 ; 3,3 = −16 ; 3,6 = −17 ; 3,9 = −18 ; 4,2 = −19 ; 4,6 = −20 ; 5,0 = −21 ; 5,5 = −22 ; 6,0 = −23 | CONSERVÉ E5 | La difficulté de base |
| Formule du NDB | NDB = −13,3 × ln(Cf) — reproduit les 24 paliers à l'arrondi près (la pente exacte est entre 13,3 et 14,4 ; 2,0 rend −9,2 contre −10 en table) | ARBITRÉ (28 octobre au soir, « ton conseil » de Francky suivi) | L'application calcule en formule, la table demeure au livret |
| Pertes d'assaut | % de pertes = 2,5 × (1D20 ± marge de réussite) — marge en négatif pour le vainqueur, positif pour le vaincu ; appliqué aux PF BRUTS du stack le moins fort ; +25 % si le vaincu ne peut retraiter ; retrait des PF selon l'ordre établi des unités | CONSERVÉ E5 ; portée E5 : le stack ENTIER — sous É8 la formule vit PAR ENGAGEMENT (« la mêlée par engagements », section 9) ; relevé par la chasse aux moyennes du 30 octobre au soir | Le second jet, piloté par la marge unique |
| Coût de l'assaut | 1 PMV par assaut aux DEUX camps ; nouvel assaut si ≥ 1 PMV ou 1 PA en substitution ; contre-attaque du défenseur vainqueur sur spécification | CONSERVÉ E5 | Le rythme des batailles |
| Moral de combat | 100 points par camp sur les PF ajustés à la qualité (×1 A, ×2 B, ×3 C, ×4 D, ×5 E, ×10 F) ; le % de pertes s'y déduit ; vaincu +50 %, vainqueur −50 % ; perte d'un leader : sa VM en malus pour les siens, en bonus pour l'adversaire ; le combat rapporte 1 à 10 PMo partagés au prorata entre alliés | CONSERVÉ E5 ; RENOMMÉ : PM → PMo (sentence du 29 octobre, charte adoptée) | L'usure des armées, assaut après assaut |
| Multiplicateurs de situation | hors du milieu naturel ×0,9 ; nuit (rang 1) : 90 % d'efficacité, sans avantage d'archer ni de vol ; souterrain (rang 3) : 70 % | CONSERVÉ E5, ARBITRÉ au pipeline (28 octobre au soir : valeurs natives conservées, statut calibré — conseil suivi) | PF effectifs |
| Victoire en phase magique | moral négatif = assaut perdu ; les deux négatifs = match nul | CONSERVÉ E5 | La sous-phase 3 |
| Arrimage de la sous-phase 3 | la magie d'assaut intermédiaire (les discriminateurs de la section 3), la GM en surcharge des leaders (seuil 20) et la faveur (+5 × rang) / le verrouillage (−5 × rang) des lieux de puissance s'appliquent au combat magique | ARBITRÉ (28 octobre au soir) | Le point d'accroche de la cuvée |
| La mêlée par engagements | amendement de philosophie (« plusieurs jets entre les unités », 28 octobre nuit) : appariements par LOT HOMOGÈNE selon l'ordre établi (A d'abord, infanterie avant cavalerie) ; par appariement : jet d'attaque [11 + NDB local], Cf local = PF effectifs attaquant ÷ PF effectifs de l'adversaire direct ; pertes de l'engagement au jet de pertes sur le plus faible, la marge locale en pilotage | ARBITRÉ (granularité par lot, 28 octobre nuit) | Le cœur de la refonte — la formule du NDB calculée par engagement |
| La riposte | pas de riposte à marge d'attaque ≥ 5 ; sinon le défenseur riposte et son jet réduit les pertes de l'attaquant | ARBITRÉ (28 octobre nuit, proposition acceptée) | Le couple attaque/riposte |
| Le cumul dégressif des commandants | plusieurs commandants au stack : le PREMIER compte à plein, le SECOND à demi, les AUTRES à quart (au-delà de deux) — les bonus de leader ne se cumulent pas linéairement | SENTENCE DE FRANCKY (30 octobre au soir) ; à FORMALISER au chantier leaders — le traitement des bonus BC/BCM par engagement est SUSPENDU (les moyennes d'unités changent, les leaders ATTENDENT) ; l'É5 natif « un seul commandant par assaut » cède la place | La hiérarchie du commandement |
| Le verdict de l'assaut | le moral agrégé à 100 points (section ci-dessus) demeure le SEUL verdict : les engagements distribuent les pertes et le récit, l'agrégat tranche la bataille | ARBITRÉ (28 octobre nuit, « ton conseil » suivi) | La bataille demeure une masse |
| Le champ de bataille en zones | trois zones par milieu (ordre E5 air > sous-mer > mer > terre conservé) : CONTACT (capacité = QSME), APPUI (renfort en cours d'assaut : 1 PA, ou PROPOSITION un renfort gratuit par tranche de +1 CMT), TIR (LA VOLÉE : avant chaque mêlée, PF de tir = PF × colonne Archer × situation, cible désignée par les ordres — contre-batterie, unité nommée 1 PA — pertes plafonnées, PROPOSITION la moitié de la mêlée, chiffrage au banc AJOURNÉ) ; LA LIGNE ENFONCÉE : engagement de contact perdu à marge ≥ 5 = la zone derrière est ouverte (malus 2, poursuite possible de la cavalerie légère) ; trois temps : magie → volée → mêlée | PROPOSITION (structure consignée au chantier combat v0.3-v0.4 ; les seuils CMT et le plafond de volée attendent le banc d'essai, ajourné) | Les archers de Francky |
| Les colonnes TA/RA du gestionnaire | ÉLUCIDÉ (30 octobre au soir, paragraphe 12 É7) : TA = TOTALE ALLÉGEANCE, diplomatie (grades 8-10 : loyauté, défection, dissolution) ; RA = résistance au Tournage, RAT (drows vampires 2, golem 4) ; MR = Résistance Magique, sigle natif (l'attribution « TAM = résistance à la magie » du 28 est CORRIGÉE) ; le couple TAM/RAM (armes magiques, moyennes de stack) RETIRÉ du moteur É8 par sentence | ÉLUCIDÉ ; MR CONSERVÉ (30 octobre au soir) : résistance aux EFFETS magiques — aux sorts — non aux armes enchantées (nuance de l'auteur) ; renommage TAM abandonné, sigle TAM vacant | Le gestionnaire, source de vérité |
| Attaque magique d'un leader | action spéciale : 3 PA s'il est en tête (efficacité ÷2), 5 PA sinon (÷10) ; ses PMB passent automatiquement en protection de personnel | CONSERVÉ E5 | Décimer les états-majors |
| RAF | blocage si la somme des PF de blocage atteint 20 % des PF du retraitant (mouvements égaux sur jet [2 × (CDT att − CDT déf)], aériens et sous-marins à PF doublés, déjà-retraitant à moitié) ; RAF ratée : malus 2 ; ½ RAF bloquée : forces de l'attaquant à moitié ; ½ RAF ratée : malus 1 | CONSERVÉ E5 | Éviter le combat |
| Rencontre | jet fermé [2 × (coût PMV de l'hex + PMV de sortie) − Trc + Dse + NDB] ; table de NDB de PST : +16 (0,02) à −50 (1500) ; aériens : PST ×3 sans couverture, ×2 en forêt claire ; sous-marins +15 ; en ville : [niveau × 2 − 10], Dsv et Esp ; zones d'hex différentes : +10 ; discrétion et fouille : ±4 par PA, au PMV près | CONSERVÉ E5 | Se voir sans être vu |
| Interception | rayon = le tiers des PMV de l'unité la plus lente (arrondi) ; leader requis ou 3 PA ; jet de difficulté [PMV de l'hex candidat − CDT − 2 si aériens − (différentiel de PMV)/4] ; puis rencontre à malus 5 | CONSERVÉ E5 | La chasse en mouvement |
| Piétinement | jet par stack modifié [2 × CDT] ; CAP = fraction des PF (cavalerie ultra lourde 1/4, très lourde 1/6, lourde 1/7, moyenne 1/15, légère 1/20, infanterie 1/40 ; vaisseaux PSTR 1/4 ; hors milieu dégradé) contre RAP (5 à 10 selon le type) ; interdit sous 2+ niveaux de fortification, en ville, en embuscade | CONSERVÉ E5 | Le refus du combat écrasé |
| Embuscade (difficulté) | base 5 PS ; +4 par PS manquant, −2 par PS supplémentaire ; ±1 par PMR d'aide aux opérations secrètes ; absence de leader secret : −2 défenseur, +6 attaquant ; +2/−4 par Ls(x) ; +1 par CDT défenseur ; coût de l'hex et positionnement variables ; surprise après embuscade : jet [− marge] | CONSERVÉ E5 (les multiplicateurs ×2-×5 en section 8) | Le grand soir des guildes |
| Machines de siège | +0,1 par PPB (force × [1 + PPB/10]) ; compétence Cbt/3 ; 1000 hommes pendant 3 jours ; bois des hex requis | CONSERVÉ E5 ; PPB RÉTABLI (sentence du 30 octobre au soir — le renommage PBo est révoqué, sigle natif restauré) | Prendre les murs |
| QSME | port de niveau n : 2n+1 flottes ; souterrain 30 ; petit château fort 60 ; grand château fort 100 ; seuls les PST sous le QSME combattent, le reste en réserve, entrée en ligne au prorata des pertes | CONSERVÉ E5 | Le front est étroit |
| Mort d'un leader | jet de survie : intact −10 ; blessé −5 ; détruit 0 ; n'a pas chargé −10 ; RAM supérieure à la TAM adverse −10 ; en vol contre des non-volants −10 ; PMR de discrétion −1 ; niveau de discrétion −½ ; écart de Mvt −¼ ; niveau de Cbt −¼ ; unités restantes −2 ; marge ±1 ; jet raté de moins de 5 = capture | CONSERVÉ E5 ; le terme « RAM supérieure à la TAM adverse » est natif mais son couple est RETIRÉ du moteur É8 (sentence du 30 au soir) — le jet de survie du leader à RÉÉCRIRE au chantier combat | Les leaders ne meurent pas bêtement — ils risquent |
| Reddition et rage | reddition sur jet ouvert du moral (par unité ; avec un leader, moral négatif requis) ; le vaincu sans retraite ni clémence combat en berserkers | CONSERVÉ E5 | La fin des armées coincées |
| Dissolution | mort du leader principal : jet [(VM' − VM) + (Pop' − Pop) + k], k de −10 (successeur naturel civilisé) à 0, barbares et guildes 0 à −10 (BCM/LDS, BR et BC comptés) ; sans second : +10 ; popularité négative : jet [− Pop] ; moral très faible : jet [− Moral + Pop] ; sécessions : unités (régulière −2, mercenaire barbare +6, débandée +6 ; qualité A +2 à F −10 ; tranches de 5 PMo ±1 ; moitié de la Pop du leader stacké), guildes (assassins −2, voleurs/marchands 0, courtisanes +2, PA de guilde −1), villes (n(n+1)/10 points, PA de ville −1) ; après dissolution, le moral revient à sa valeur de départ | CONSERVÉ E5 | La mort des empires |
| Pillage | 1 PST d'infanterie par 10 000 habitants avec 1 PMV ; butin = 3 × VTB + trésor ; zone de production : la moitié du stock ; barbares et créatures : la moitié du butin ; valeur morale : moitié gagnée par le pillard, moitié perdue (pleine si le contrôle est perdu) ; piller chez soi : le double, remise par action spéciale | CONSERVÉ E5 | La guerre paie — mal |
| Ravitaillement de campagne | déficit : jet ouvert [1 par tranche de 5 % − 10], débandade = destruction ; rationnement jusqu'au quart du PSTN (PF proportionnels, malus moral cumulatif [25 × % de rationnement]) ; extrême : jusqu'à 5 % des PF, malus 25 par tour, mort de faim [% de rationnement ÷ 2] par tour ; Nourriture en réflexe de survie au double coût ; montures sacrifiées par qualité décroissante | CONSERVÉ E5 | Les armées mangent |
| Marche forcée | gain maximum [1 + (CDT + BC + BR)/4] au prorata du temps passé avec le stack ; PF de combat × [(PMV base + PMV MF)/PMV base] | CONSERVÉ E5 | La vitesse se paie en sang |
| Récupération du champ de bataille | jet ouvert, NDB issu du rapport [PST fouilleurs ÷ PST cadavres], réussite partielle possible ; leaders morts : automatique pour les siens, jet pour les autres | CONSERVÉ E5 | Dépouiller les morts |
| Conflits d'actions | le plus grand nombre de PA (ou le meilleur bonus) agit le premier ; les PA de précipitation ne comptent JAMAIS dans le jet de l'action ; enchaînement : on retient l'action au moins grand PA | CONSERVÉ E5 | Tout le tour de jeu |

## 10. La file d'attente — propositions en instance

1. Le plafond de h(NH) (mention portée, valeur non consignée).
2. Le pour cent de maîtrise GM : 100 − 5 × n × (n+1), borné — formule et borne.
3. Le chiffrage du plafond de l'éclat occulte (warlock).
4. Les seuils du prorata du renseignement continu (partiel/précis/complet).
5. L'extension éventuelle de la surcharge (tentative à risque sous le NM) aux étages inférieurs — non arbitrée.
6. Les QE par bande au livret (repère É7 consigné en section 1).
7. Les valeurs de base d'immunité totale par race et par effet (araignée 3 %, dragon 10 %, démon 20 %, mort-vivant 25 % — illustratives, à définir).
8. Les valeurs de la peur : rayon de l'aura et difficulté (la formule de masse É7 comme référence d'ordre de grandeur).
9. Les coûts PE par palier (chantier expérience) et le plafonnement EDT des créatures paisibles.
10. La transposition TAM/RAM en grades — DEVENU MOOT : le couple est retiré du moteur É8 (sentence du 30 octobre au soir) ; la matrice graduée r/p demeure disponible si une immunité aux armes non magiques doit s'y reloger.
11. La borne des objets (un objet ne dépasse pas le NM de son porteur) et les artefacts — chantier des objets AJOURNÉ par sentence.
12. L'alignement des races de l'échantillon sur l'ancre : l'elfe arbitré supérieur à l'humain au niveau race (sentence antérieure) — les PP raciaux à l'inscription.

## 11. Le protocole d'équilibrage absolu

PRÉREQUIS (sentence constante du projet) : l'équilibrage absolu attend les EXEMPLES CHIFFRÉS de Francky. Le banc d'essai est armé et l'attend : la légion hellène, la horde de squelettes, la conjonction des mages, le nœud de rang 2 ouvert et l'Éveil du cœur backfiré, la domination Co/Ho sur un leader de bande D, le templier sous le siège, le tir d'éclat du warlock face à une cohorte, le contre-espionnage de l'espion de bande D contre un leader de bande E, l'exfiltration du sicaire par téléportation.

AJOURNÉ PAR SENTENCE de Francky du 28 octobre au soir : les exemples chiffrés sont À RETROUVER dans d'autres archives (« il faut que je creuse d'autres caves pour retrouver les exemples ; pas le temps en l'état »). Le prérequis demeure, la passe est EN ATTENTE — le banc reste armé, aucun exemple chiffré ne circule en l'état. Conséquence : l'équilibrage absolu reste gelé ; les chantiers et le fichier avancent sans lui, aucune proposition à statuer ne se bloque sur son absence.

