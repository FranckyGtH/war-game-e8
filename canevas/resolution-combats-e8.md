---
name: "resolution-combats-e8"
title: "Résolution des combats — jets d'attaque et de défense (Édition 8), v0.6"
type: "text/markdown"
---

# Résolution des combats — jets dx27attaque et de défense, double devise PV et PF, reformulations en cascade (Édition 8), v0.6 (arbitrages des 26 octobre 2026)

## Constat et principe

L'Édition 7 résolvait un engagement entier par un jet unique — contrainte de l'époque, le calcul se faisant à la main. L'Édition 8 dispose du moteur applicatif : le calcul peut être multiplié sans coût pour le joueur. Proposition de Francky : chaque unité (entité de résolution — le lot homogène par défaut) résout ses propres jets d'attaque et ses propres jets de défense, au tour de bataille.

## Jet d'attaque et jet de défense

Nombre d'attaques et de défenses par qualité (table de base) :

| Qualité | Attaques | Défenses |
| --- | --- | --- |
| A (Bleu) | 1 | 1 |
| B (Expérimenté) | 1 | 1 |
| C (Vétéran) | 2 | 2 |
| D (Elite) | 2 | 2 |
| E (Super-élite) | 3 | 3 |
| F (Exception) | 5 | 5 |

La qualité, déjà au centre du chantier Unités (coefficients d'équipement, habileté), devient ainsi la clef de la fréquence des jets : une unité d'Exception ne frappe pas plus fort par jet, elle frappe plus souvent — et pare plus souvent.

## Minoration des défenses

Les défenses sont interchangeables et décroissantes : la deuxième défense est minorée de 10 pour cent, chaque défense supplémentaire encore de 10 pour cent (cumulatif : 100, 90, 80, 70, 60 pour cent de la valeur de défense), avec un plancher à 25 pour cent.

Compétence nouvelle « Dur à cuire » (capacité spéciale É8, à ajouter au relevé du 8.1.3) : l'unité double son nombre de défenses et son plancher de minoration passe à 50 pour cent. Une unité E avec Dur à cuire dispose de 6 défenses minorées selon la suite 100, 90, 80, 70, 60, 50 — elle ne descend jamais sous la moitié de sa valeur de défense. Destinée aux créatures massives, aux morts-vivants et aux unités à peau épaisse.

## Ce que la résolution gagne

Le combat devient une suite d'oppositions lisibles : chaque attaque adversaire s'oppose à une défense, la marge décide ; le joueur voit le récit de son unité (combien de ses attaques ont passé la défense adverse, combien de défenses ont tenu), le MdM conserve le détail exact. La compétence tactique du joueur se déplace de la stipulation exhaustive (abandonnée par ailleurs au profit des postures) vers l'affectation des défenses et le choix des cibles.

## Décisions arbitrées (26 octobre 2026)

1. Modèle de dégâts — arbitré : la marge de chaque opposition module la perte de PF du lot. Les PF demeurent la monnaie du combat ; les PV individuels ne sont retirés qu'en résolution individuelle (leaders, créatures singulières). Une marge haute retire davantage de PF ; l'unité dont les PF disponibles tombent à zéro est détruite ou disloquée.
2. Affectation des défenses — arbitré : les défenses forment un pool affecté aux attaques entrantes dans l'ordre d'arrivée. Le défenseur n'affecte pas jet par jet : le moteur consomme la meilleure défense disponible (100, puis 90, 80, 70, 60 pour cent), la compétence tactique se reportant sur la constitution des lots, les doctrines et les cibles.
3. Attaques non couvertes — arbitré (recommandation de l'assistant acceptée le 26 octobre) : l'attaque excédentaire s'oppose à une défense passive de formation, valorisée au plancher de minoration (25 pour cent, ou 50 pour cent pour une unité dotée de « Dur à cuire »). La marge module la perte de PF comme toute opposition. La touche automatique est écartée (binaire, elle dévalue la défense et paradoxe de calibrage sur la cinquième attaque d'une unité F).
4. Périmètre du jet et ordre de résolution — arbitré : la résolution se conduit au stack du joueur, par position sur le champ de bataille visée et selon la tactique adoptée. À l'intérieur de l'engagement, les lots se résolvent en partant de la qualité la plus faible vers la plus haute, sauf ordre spécial (capacité, doctrine ou tacticien qui inverse la priorité). Ainsi la masse engage d'abord et l'élite frappe en dernier — sur un ennemi déjà entamé — à moins qu'un ordre spécial ne fasse jouer l'élite en ouverture.

## Morts et blessés (modèle arbitré le 26 octobre 2026)

Principe directeur — arbitré : le moteur gère les morts et les blessés comme état des effectifs, même si les morts et les blessés ne procurent plus de PF au stack ni à l'unité. La perte de PF module la force résiduelle ; la ventilation morts/blessés décrit l'état humain du lot et alimente le ravitaillement, le moral et le récit.

Modèle arbitré :

1. Ventilation — toute perte de PF se ventile en deux postes : morts (définitifs) et blessés (hors combat mais récupérables). La proportion dépend de la qualité du défenseur rapportée à celle de l'attaquant (un écart favorable à l'attaquant accroît la part de morts, un écart favorable au défenseur la réduit), modulée ensuite par la nature de l'engagement (siège, poursuite, rencontre) et les capacités spéciales. Un mort-vivant ne produit pas de blessés. En standard, une créature dotée de régénération ne subit que des blessés : elle redevient active au combat après un assault passé à régénérer ; des actions peuvent être entreprises afin d'empêcher cette régénération, auquel cas les blessés sont définitivement détruits.
2. Sort des blessés — résolu au Cycle du Destin, hors du tour de bataille, sauf guérison immédiate par moyen magique ou potion (qui s'applique dès la fin de l'engagement). Guérison naturelle : une semaine au minimum pour guérir une proportion des blessés, proportion fonction des moyens de soins disponibles ; les blessés sans soin encourent la mort (jet de résolution simple chaque semaine, aggravation possible).
3. Seuls les effectifs valides (non morts, non blessés) portent les PF disponibles ; les blessés ne contribuent ni PF de référence ni PF disponibles, mais figurent à l'effectif administratif du lot et consomment le ravitaillement.
4. Récupération de la force — plafond arbitré : les PF disponibles remontent par la guérison des blessés réintégrés (recalcul du rapport PV/PV max du lot), le plafond de récupération étant toujours calculé sur les effectifs valides du moment, jamais sur l'effectif d'origine. La fatigue des effectifs valides demeure une question ouverte du contrat Unités.
5. Moral et cohésion — le lot consomme l'état morts/blessés : une unité décimée subit des modificateurs de moral même si ses PF résiduels demeurent élevés (proportion de la valeur d'origine).
6. Invalides — arbitrés comme gisement narratif et économique : vétérans instructeurs, guilde des anciens de guerre, main-d'œuvre civile ; relais explicite vers le chantier Villes (hôpitaux, guildes) ; soigner plutôt qu'abandonner devient rationnel pour le joueur.
7. Traçabilité : l'objet lot exporte effectifs valides, blessés, invalides, morts cumulés, régénération en cours ; le MdM et le joueur voient la pyramide des effectifs, le moteur ne consomme que les PF disponibles pour la résolution — la ventilation demeure une donnée d'état, pas une donnée de jet.

Points restant à calibrer (après le calibrage humain-cheval) : table de ventilation par écart de qualité (arbitré : modulation simple par cran, proposition plus ou moins cinq points de pourcentage de part de morts par cran, bornée entre dix et soixante pour cent — pas de table croisée complète), proportion guérie par semaine selon les moyens de soins, seuil et progression de la mortalité sans soin, traitement des créatures non humanoïdes, coûts des actions bloquant la régénération (arbitré : poste dédié du relevé des capacités spéciales, coût en CDT ou en emplois de tacticien — le blocage est possible mais jamais gratuit).

## Questions restant ouvertes

1. Échelle : la fréquence des jets suit la qualité, la taille du lot portant les PF (préconisation maintenue) ; à arbitrer après le calibrage humain-cheval.
2. Interaction avec les doctrines et les facteurs EDT, terrain, moral : multiplicateurs de la valeur de jet, ou entrée dans la probabilité ? À arbitrer lors de la rédaction du moteur de résolution.
3. Effet exact de l'ordre spécial inversant la priorité de résolution : coût, conditions, contrepartie (risque de laisser la masse subir l'engagement sans appui de l'élite).

## Questions arbitrées (historique de la v0.1, conservé pour mémoire)

1. Modèle de dégâts : la marge de chaque opposition module-t-elle la perte de PF du lot (les PF demeurent la monnaie du combat), ou chaque attaque couronnée de succès retire-t-elle des PV directement ? Préconisation de l'assistant : la marge module la perte de PF, les PF disponibles demeurant la mesure de la force résiduelle (continuité avec PF de référence, PF disponibles et résolution individuelle des leaders). — Arbitré : marge module la perte de PF.
2. Affectation des défenses : les défenses s'opposent-elles aux attaques entrantes dans l'ordre, le défenseur choisissant ses affectations, ou sont-elles un pool global ? Excédent d'attaques non couvertes : touches automatiques, ou jet de défense improvisé avec malus ? — Arbitré : pool dans l'ordre d'arrivée ; excédent selon recommandation en cours d'arbitrage.
3. Périmètre du jet : par lot homogène (préconisé), par unité de compte, ou par stack ? Interaction avec les doctrines (une doctrine prudente ajoute-t-elle une défense ?) et avec les facteurs EDT, terrain, moral (les facteurs demeurent-ils multiplicateurs de la valeur de jet, ou entrent-ils dans la probabilité ?). — Arbitré : résolution au stack par position et tactique ; facteurs en question ouverte.
4. Échelle : le nombre de jets dépend-il de la taille du lot (une unité de 1000 individus lance-t-elle les mêmes jets qu'une unité de 10) ? Préconisation : la fréquence des jets suit la qualité, la taille du lot portant les PF — ainsi une petite unité d'élite frappe souvent mais meurt vite, une masse de bleus frappe rarement mais absorbe. — Reste ouvert.
## Double devise PV et PF — arbitrée le 26 octobre 2026 (soir, v0.5)

Principe (remarque de Francky) : l'É7 confondait dans les PF la puissance et les points de vie ; l'É8 introduit les PV à côté des PF. Le profil de création se calcule hors qualité (espèce, masse, NH de l'espèce) ; la qualité s'applique ensuite par des multiplicateurs distincts sur chaque devise.

1. PV du lot — la jauge de dégâts : PV du lot = effectif × PV individuel de l'espèce (10 × TC³, herbivores ×2) × facteur de qualité des PV × S. Une unité dont les PV tombent à zéro est détruite ou disloquée.
2. Facteur de qualité des PV (arbitré, courbe d'habileté) : A 1,50 / B 2,00 / C 2,50 / D 3,00 / E 3,50 / F 4,00. La qualité rend durable de manière beaucoup plus douce qu'elle rend léthal (QE 1,00 à 119,88).
3. PF du lot — la puissance : calculés sur les seuls effectifs valides, recalculés après chaque engagement (le PF n'est plus une jauge).
4. Chaîne de résolution à six temps : duel de jets ; marge nette (armes, magie, embuscade, absorption) ; dégâts ; ventilation morts/blessés ; décrément des PV du lot ; recalcul des PF disponibles.
5. Dégâts — couplage 3a (rapport de puissance) : masse détruite = marge nette × (PF offensifs de l'attaquant / PF du défenseur) / TC³, exprimée en individus de masse humaine. À qualité égale, le rapport vaut un : un point de marge détruit un humain ; la masse protège (TC³), la puissance tue.
6. Érosion de fatigue — couplage 3b : chaque engagement réduit les PF disponibles de 10 pour cent de la masse détruite, exprimée en PF ; récupérable à la fin de l'assaut ; cumulée, elle peut briser le lot avant anéantissement — porte d'entrée du moral et de la déroute.

Conséquences sur les arbitrages antérieurs : la décision v0.4 « la marge module la perte de PF » est remplacée par « la marge nette détermine les dégâts en PV » ; les PV individuels des leaders et créatures singulières demeurent (la règle généralise aux lots le système existant) ; le plafond de récupération sur les effectifs valides devient la définition même des PF ; la conversion marge-individus (un point = un humain, modulée par le rapport de puissance et TC³) devient la constante centrale du calibrage.

À reformuler en conséquence : la ventilation morts/blessés s'exprime désormais en individus issus de la masse détruite ; le souffle et les doctrines recevront leurs équivalents en marges ; l'échelle d'embuscade (+2 à +5) se contrôle désormais directement en individus détruits (une marge d'embuscade de +3 sur des Bleus ≈ trois individus supplémentaires par opposition).
## Reformulations en cascade dans la double devise (v0.6, 26 octobre 2026 soir)

### 1. Ventilation des morts et blessés — exprimée en individus

La masse détruite (individus issus de la formule 3a) se ventile directement : part de morts et part de blessés selon la modulation par cran d'écart de qualité (plus ou moins cinq points de pourcentage par cran, bornée dix à soixante pour cent), modulée par la nature de l'engagement et les capacités. Règles inchangées de principe : un mort-vivant ne produit que des morts ; une créature à régénération ne produit que des blessés (actifs après un assault de régénération, sauf blocage) ; les blessés relèvent du Cycle du Destin. Nouveau langage : la ventilation ne manipule plus des PF mais des individus ; le PV du lot se recalcule sur les effectifs valides (valides × PV individuel × facteur de qualité des PV × S), l'anéantissement survenant à zéro valide. Cohérence de la jauge : les dégâts PV (masse × PV individuel × S) divisés par le PV individuel rendent exactement la masse détruite.

### 2. Moral — états et modificateurs de jets

La table É7 (multiplicateurs 0,1 à 2,5) est transposée en états de moral du lot, testés par jet de moral (D20) aux seuils suivants : proportion d'effectifs détruits par rapport à l'origine ; fatigue cumulée (l'érosion 3b) ; peur ; mort du leader ; pertes d'un allié stacké. États proposés (du meilleur au pire) : Tenace, Ferme, Ébranlé, En repli, En déroute. Effets natifs : Ébranlé — moins un aux jets d'attaque et de défense ; En repli — l'unité se désengage (postures) et n'attaque plus ; En déroute — sortie du combat, dissolution du stack, vulnérabilité à la poursuite ; Tenace — les jets de moral ultérieurs bénéficient de l'avantage. Les multiplicateurs É7 (0,1 à 2,5) servent d'ordres de grandeur pour l'amplitude des états ; la table morale É7 (colonnes de circonstances) alimente la liste des seuils déclencheurs. La fatigue (3b) devient le premier des seuils : un lot érodé teste le moral avant d'être anéanti — la déroute succède à l'épuisement.

### 3. Souffle des créatures majeures — une attaque native

Le souffle est une attaque à part entière du duel : il consomme un des jets d'attaque du lot, une fois par assaut, à coût de PMR de Destruction déclaré. Le souffle porte le bonus de marge de l'échelle de siège de l'espèce (le souffle de dragon vaut une arme de siège naturelle, bonus calibré au catalogue des créatures majeures), s'oppose à l'absorption de la cible, et ses dégâts suivent la formule 3a, multipliés par un facteur de Destruction dépend des PMR investies (proposition : +50 pour cent de masse détruite par PMR — calibrage). L'effet de peur associé (cas du béahir) demeure un jet de peur séparé en tête de tour, selon la règle peur. La conversion É7 (x PMR par PF/PST) devient un ordre de grandeur pour le facteur de Destruction.

### 4. Unité spéciale et embuscade — valeurs transposées

La table des PF de l'unité spéciale par taille et qualité É7 est abandonnée : les unités spéciales se créent par le pipeline standard (gabarits de petite taille : escouade à section), la taille du lot portant les PV, la qualité portant jets et devises. L'embuscade demeure : jet de surprise ; en cas de réussite, avantage au jet d'attaque et bonus de marge de plus deux à plus cinq selon la qualité de l'embusquée — contrôlé désormais directement en individus détruits par opposition (le bonus s'ajoute à la marge avant la formule 3a). Les multiplicateurs É7 ×2 à ×5 restent les bornes de contrôle : le couple bonus de marge × rapport de puissance doit les reproduire en ordre de grandeur. Les habiletés Dse, Dsv, Esp et Trc demeurent un point ouvert (relais chantier Villes) ; la séparation et le regroupement dissimulé une fois par tour demeurent.
## Enrichissements du moral — ralliement, enragé, récupération (v0.7, 27 octobre 2026, croisement Heroes of Battle)

Arbitré par Francky le 27 octobre 2026 :

1. Test de ralliement : un leader peut tenter, une fois par tour de bataille, de remonter d'un état un lot démoralisé de son stack — jet D20 + rating de commandement + modificateur de Charisme du leader ; le lot doit être en vue et à portée d'ouïe ; succès : l'état remonte d'un cran (En déroute ne se rallie pas : il faut reformer le lot hors combat). Les features de leader (Tacticien, auras) modifient ce jet selon le relevé.
2. État Enragé : un un naturel au jet de moral qui devrait faire basculer le lot en En déroute déclenche l'Enragé — le lot attaque la cible la plus proche, camps confondus, sans discernement ; il ignore les états de repli et ne teste plus le moral de la bataille.
3. Chronologie de récupération : chaque palier du Cycle du Destin remonte l'état de moral d'un cran, sauf événement contraire ; En déroute persiste jusqu'à ralliement impossible puis reforme hors combat.
