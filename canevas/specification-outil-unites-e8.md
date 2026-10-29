---
name: "specification-outil-unites-e8"
title: "Spécification de l'outil de création d'unités (Édition 8), v0.4"
type: "text/markdown"
---

# Spécification de l'outil de création d'unités — Édition 8, v0.4 (recalcul global et rapport du0027impact, le 26 octobre 2026)

## Objet et positionnement

L'outil de création d'unités assemble les profils d'unités à partir de composants déclarés, applique le pipeline de calibrage à quatre étages, attache les capacités spéciales (features) avec leurs prérequis et packages, et produit la fiche d'unité consommable par le moteur de résolution. Il est réservé au MdM (création et arbitrage assistés par IA) ; les unités ne sont créées que par le MdM, les joueurs proposent des actions et toute proposition passe par le MdM. Toute valeur numérique du calibrage est une constante globale de l'application : les ajustements d'équilibrage se font globalement, sans retoucher le code ni les fiches individuelles.

## Entrées : les composants

Une unité est un assemblage de composants, chacun déclarant ses paramètres bruts :

| Composant | Paramètres déclarés | Exemples |
| --- | --- | --- |
| Garnison (personnel) | Race, culture, profession, NH, effectifs | Légionnaires hellènes, archers méridiens |
| Monture | Race, TC, PP, effectifs, équitation | Cheval, centaure (race unique) |
| Coque (engin) | Masse, TC équivalent, PP, portage | Navire, char, bélier |
| Tour / construction embarquée | Type, PF, servi par X personnes | Donjon de siège, tour de navire |

Chaque composant référence une entrée du catalogue de races et de constructions (types d'humains arbitrés : commun, Nordique, Méridien, Hellène, Insulaire — enveloppe biologique identique, différences uniquement par registres dérivés).

## Pipeline à quatre étages (constantes globales)

1. Étage 1 — PP : Puissance de la race ou du composant (humains et elfes 1,00 ; kobolds, lézards, centaures, aigles 1,20 ; griffon 1,2 ; licorne 1,0).
2. Étage 2 — TC et NH : taille de combat (module la puissance) et niveau de l'unité ; g(TC) = TC², h(NH) dérivée de la table qualité.
3. Étage 3 — PF : PF = 1,667 × PP × TC² × (1 + NH/5) × QE × m(NM), avec m(NM) = 1 + 0,8×NM ; facteur mort-vivant 1,8. Les PF du lot sont la somme des PF de ses composants.
4. Étage 4 — Registres dérivés : PV individuels et PST = 10 × TC³ (herbivores ×2), EDT, moral, jets (A=1 à F=5), PMV/PMP, immunités et résistances en grades, valeurs dérivées du leader.

Table qualité (constante) : A Bleu NH5 ×1,00 ; B Expérimenté NH10 ×1,50 ; C Vétéran NH15 ×2,40 ; D Élite NH20 ×7,80 ; E Super-élite NH25 ×20,88 ; F Exception NH30 ×119,88.

## Étage des capacités

- Schéma de feature : nom, portée, prérequis (races, professions, cultures, alignements, qualités, constructions, guildes), effets par champ (EDT, PF, PMV, moral, terrain, jets, résolutions), entretien, incompatibilités, source.
- Les packages regroupent des capacités cohérentes : culturels (Nordique, Méridien, Hellène, Insulaire), statuts (Légion/Garde, Conjurés, Mercenaire), guerre (Siège).
- Toute exception devient une feature déclarée, jamais codée en dur dans la résolution.
- Attributs précalculés : TAM/RAM comparés une fois par paire de profils et mis en cache ; l'immunité totale et les grades de résistance (poison, peur, tournement) sont résolus en phase pré-engagement.

## Parcours utilisateur (assistant en cinq étapes)

1. Identification : nom, camp, historique narratif, statut (levée, mercenaire, légion, conjurés).
2. Composants : sélection des composants dans les catalogues, saisie des effectifs ; l'outil affiche en continu le profil recalculé.
3. Qualité et entraînement : qualité (A-F), état d'entraînement (feature Unité non entraînée, casernement, académie), EDT calculé et détaillé par termes D(nature) + D(formation) + D(commandement), borné [0,4 ; 2,0].
4. Capacités : sélection de features et de packages filtrée par les prérequis remplis ; l'outil refuse les incompatibilités et signale les conflits de champ d'effet.
5. Validation : fiche complète prévisualisée ; le MdM valide et arbitre seul (les unités sont créées par le MdM uniquement) ; l'IA assiste en signalant les profils hors normes (suggestion : comparaison aux profils de référence du calibrage).

## Fiche d'unité produite (contrat de sortie)

- Identité : nom, camp, statut, historique.
- Composition : composants et effectifs valides.
- Profil de lot : PF, jets par qualité, PMV/PMP, moral, EDT détaillé, PV et PST des créatures singulières.
- Capacités : liste de features avec prérequis vérifiés et entretiens.
- Registres économiques : coût d'entretien (or, vivres, CDT), temps de recrutement et d'entraînement.
- Format : document structuré (JSON sérialisable) consommé par le moteur de résolution et le portail ; la fiche affichable est générée depuis cette source unique.

## Constantes d'équilibrage globales (fichier de calibrage unique)

| Bloc | Contenu |
| --- | --- |
| Races | PP, TC, PV, grades de résistance, immunités totales |
| Qualité | Table A-F (NH, QE, jets, part de morts par cran) |
| Formules | 1,667 ; TC² ; TC³ ; m(NM) ; 1,8 mort-vivant ; majorations herbivores |
| Résistances | Matrices graduées (poison, tournement, TAM/RAM), pourcentages du tournement |
| Capacités | Valeurs d'effet des features (EDT, moral, jets, entretiens) |

Principe : tout réglage d'équilibrage modifie ce fichier, puis déclenche un recalcul global des fiches ; aucune fiche individuelle n'est retouchée à la main. Le recalcul produit un rapport d'impact (profils modifiés, amplitude des variations) soumis au MdM avant application.

## Rôles et intégration

- MdM : création directe, arbitrage des propositions, accès au recalcul global et à son rapport d'impact.
- Joueur : consultation en lecture seule des fiches d'unités de son camp ; proposition d'actions (ordres, mouvements, engagements) transmise au MdM, qui arbitre toute chose ; aucun accès à la création d'unités.
- IA d'assistance : contrôle des prérequis, détection des valeurs hors normes, suggestion de packages cohérents avec la culture et la tradition militaire déclarées.
- Portail : point d'entrée unique ; la fiche d'unité est partagée avec l'app MdM, l'app joueur et le moteur de résolution.

## Points ouverts

1. Conjurations : arbitrées (v0.3, gabarits précalculés) ; restent le calibrage de la constante k et le catalogue des espèces invocables (relais chantier magie).
2. Workflow de réception des propositions d'actions des joueurs par le MdM (canevas du moteur de jeu et de l'app joueur — relais).
3. Rapport d'impact du recalcul global : seuils d'alerte et historique des versions de calibrage.
4. Monture : sous-arbitrages clos (v0.2) ; restent à calibrer les coûts unitaires et délais de livraison des espèces de montures au registre économique (relais chantier commerce/économie).
## Assemblage monture et cavalier (arbitré le 26 octobre 2026)

Trois situations distinctes :

1. Monture de transport (porte) : aucun PF ajouté au lot ; effets limités à la mobilité, au ravitaillement et aux vivres.
2. Monture de combat (combattante) : pool unique du lot avec ventilation distincte des montures (arbitrage final de Francky, option 2, le 26 octobre 2026 — l'option 3 du sous-pool détaillé fut retenue puis révisée) — les PF des montures s'ajoutent au pool du lot ; la ventilation des pertes répartit celles-ci au prorata des deux parts déclarées de la fiche (part cavaliers, part montures) ; les exceptions tactiques (viser les chevaux) relèvent de features, non de la structure.
3. Créature cavalière (centaure, cavalier sur pégase) : race simple du catalogue des races, sans composant monture ; la composition ne s'applique qu'aux assemblages de deux entités distinctes.

Capacité de combat monté :

- La feature Guerrier monté est obligatoire pour qu'un lot combatte à cheval ; elle est attribuée librement par le MdM (sans prérequis formel de tradition) et porte les effets de combat à cheval : charge, avantage en terrain ouvert, désavantage en terrain restreint ou en siège, jets adaptés.
- Destruction de la monture : jet de moral du lot, puis dégradation — le lot reste valide, perd ses effets Guerrier monté et sa mobilité jusqu'à remontage (boucle avec le modèle morts et blessés).

Conséquences de la ventilation distincte sur la résolution (à intégrer au moteur de résolution) :

- Le lot de cavalerie reste une cible unique dans le stack : pas de doublement des positions visables ; la résolution est identique à celle d'un lot d'infanterie, seule la ventilation diffère.
- La ventilation des pertes s'effectue au prorata des parts déclarées (part cavaliers, part montures) ; les proportions sont des constantes du fichier de calibrage, ajustables globalement.
- Quand la part montures descend au quart restant (25 pour cent, constante de calibrage) : jet de moral du lot, puis dégradation — perte des effets Guerrier monté et de la mobilité jusqu'à remontage (boucle avec le modèle morts et blessés et le Cycle du Destin).
- La capacité Viser les montures (feature d'attaquant, par exemple piquiers) ordonne que les pertes soient affectées en priorité à la part montures, au-delà du prorata standard ; coût d'opportunité en résolution à définir (par exemple, la part monture défend avec avantage contre un attaquant dépourvu de la capacité).
- Remontage : les montures détruites sont remplacées par achat au registre économique (coût unitaire par espèce, issu du catalogue des races) ; délai de livraison selon les circuits commerciaux du monde ; les effets Guerrier monté sont restaurés dès la livraison complète du remontage. Le lot dégradé reste utilisable comme infanterie pendant l'intervalle.
- Proportions des parts : la part cavaliers et la part montures ne sont pas des constantes manuelles ; elles découlent du rapport de puissance PF montures sur PF cavaliers calculé par le pipeline à la création du lot (arbitrage Francky : la proportion dépend du rapport de puissance entre la monture et son cavalier). Destrier, warg et griffon produisent donc des parts différentes automatiquement ; la ventilation reflète ce rapport en toute transparence, et un recalcul global ajuste toutes les fiches si le calibrage des races évolue.
- Sous-arbitrages clos le 26 octobre 2026 : seuil de dégradation (un quart restant, constante de calibrage), remontage (remplacement des montures via le registre économique), proportions des parts (dérivées du rapport de puissance, calculées par le pipeline).
## Gestion des conjurations (arbitrée le 26 octobre 2026)

Architecture : gabarits précalculés. Chaque espèce invocable porte une entrée de catalogue au profil entièrement calculé par le pipeline standard ; la conjuration se réduit à instancier le gabarit avec un effectif. Le pipeline n'est jamais exécuté en temps réel — pas de latence, pas d'incohérence.

Règles arbitrées :

1. Taille du lot conjuré (révisé le 26 octobre 2026, orientation Francky) : PF du lot conjuré = PMB dépensées × coefficient du conjurateur, lx27égalité de base étant 1 PMB = 1 PF ; coefficients de pente douce : A 0,5 / B 0,75 / C 1,0 / D 1,5 / E 2,0 / F 2,5 (constantes du fichier de calibrage). Le QE du lot ne sx27applique pas : la puissance est fixée par la dépense, le coefficient selon le niveau ; la qualité du conjurateur gouverne les jets, lx27EDT et le contrôle. Effectif dérivé du gabarit : n = PMB × coefficient / (PF individuelle × S).
2. Durée de vie : selon la situation — jusqu'à la fin de l'assaut ou jusqu'à la fin du combat, la conjuration déclarant sa durée à l'invocation (standard : assaut ; sorts ou qualités supérieures : combat). La mort du conjurateur dissout immédiatement le lot conjuré : les créatures ne survivent pas à leur créateur (arbitrage Francky).
3. Perte des conjurés : purs consommables (arbitrage Francky) — un conjuré détruit retourne d'où il vient : aucune ventilation morts/blessés, aucun blessé, aucun coût au registre économique ; l'équilibre passe par le coût en points de magie. Les conjurés n'accumulent aucune expérience ; seule l'unité de conjurateurs (le lot de lanceurs) progresse, au titre des règles d'expérience existantes.
4. EDT des conjurés : déjà arbitré — contrôlés +0, partiellement contrôlés −0,1, foule −0,3 (champ D(commandement)).
5. Fiche produite : le lot conjuré est une fiche d'unité standard instanciée depuis le gabarit, avec le statut « conjuré », la référence au conjurateur, la durée déclarée et la règle de dissolution (mort du conjurateur ou terme).

Points ouverts : valeur de la constante k (calibrage), catalogue des espèces invocables et de leurs gabarits, sorts de conjuration et leurs durées standard (relais chantier magie).
## Recalcul global et rapport d'impact (spécifié le 26 octobre 2026)

Principe : le fichier de calibrage est la source unique des valeurs numériques ; il est versionné, et chaque modification déclenche un recalcul de l'ensemble des fiches. Le recalcul n'est jamais silencieux : il produit un rapport d'impact que le MdM examine avant application.

Cycle du recalcul :

1. Modification du fichier de calibrage (bloc races, qualité, formules, résistances ou capacités) ; la version est incrémentée et l'historique conserve la version précédente complète, avec date, auteur et motif.
2. Exécution en prévisualisation (dry run) : le moteur recalcule toutes les fiches sans rien appliquer.
3. Production du rapport d'impact, soumis au MdM.
4. Application atomique sur validation du MdM : soit toutes les fiches sont mises à jour, soit aucune ; un retour à la version antérieure du calibrage restaure les valeurs précédentes.

Contenu du rapport d'impact :

| Rubrique | Contenu |
| --- | --- |
| Synthèse | Nombre de fiches recalculées, inchangées, impactées ; bloc de calibrage modifié |
| Détail par fiche | Anciennes et nouvelles valeurs des registres affectés (PF, jets, EDT, PV, moral, grades) avec écart relatif |
| Répartition par camp | Somme des variations de PF et d'EDT par camp, afin de repérer un déséquilibre introduit par la modification |
| Alertes | Fiches franchissant un seuil d'alerte ; unités dont une capacité devient invalide (prérequis ou incompatibilité) ou dont la qualité change de cran |
| Historique | Version du calibrage, date, motif, comparaison aux versions antérieures |

Seuils d'alerte (constantes de l'application, ajustables globalement) :

- Écart relatif supérieur à 5 pour cent sur un registre (PF, EDT, moral) : alerte mineure, liste signalée.
- Écart supérieur à 10 pour cent : alerte majeure, l'attention du MdM est requise fiche par fiche.
- Changement de cran de qualité, invalidation d'une capacité ou basculement d'un seuil de dégradation (montures, tournement) : alerte structurelle, toujours signalée.

Cas des unités en cours de campagne (arbitré le 26 octobre 2026) : le régime est au choix du MdM par campagne — (a) le recalcul sx27applique aussi aux unités en jeu ; (b) les unités déjà levées sont figées à leur profil de création. Le rapport dx27impact présente systématiquement les deux hypothèses côte à côte, afin que le MdM mesure la conséquence de chaque régime avant de trancher pour sa campagne.

