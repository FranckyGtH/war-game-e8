---
name: "chantier-siege-e8"
title: "Chantier Siège (Édition 8) — ouverture et cadre de travail"
type: "text/markdown"
---

# Chantier Siège (Édition 8) — ouverture, v0.1

## Objet du chantier

Le chantier Siège couvre la prise, la défense et la dégradation des places fortes : machines de siège et terrassement, seuils de brèche, effets du blocus, endommagement en cours de partie (états intact, endommagé, ruiné des constructions et des fortifications), dégâts intra-urbains, usage opérationnel des tours, et l'interface du tout avec le moteur Villes et le chapitre Combat. Il précède la finalisation des chapitres « Unités » et « Magie », conformément à la feuille de route.

## Arbitrages déjà enregistrés (relevé, non remis en cause)

- Terrassement : une semaine de travaux au minimum pour un terrassement efficace ; les autres valeurs restent à arbitrer (seuils de brèche, effets du blocus).
- Tour de bataille : une semaine pleine ; fixation en semaine N → premier tour au plus tôt en semaine N+1 ; fixation en semaine 4 → semaine 1 du mois suivant ; un commandant victorieux d'un jet d'opposition peut imposer la semaine 1 du mois suivant.
- Assauts : plafond fixé par le CDT de l'attaquant (CDT +3 = trois assauts ; CDT négatif = défense seule) ; contre-attaque défensive possible pour un défenseur détenteur de la Feinte-retraite avec CDT supérieur une fois les assauts épuisés ; la retraite de l'attaquant arrête le combat.
- Désengagement : fusion en règle unique confirmée (RAF et demi-RAF).
- Doctrines de combat : cinq doctrines validées en socle de la version 1 ; tactiques de général selon répertoire ; brouillard tactique et reconnaissance.
- Villes : fortification porteuse (la tour est un contenu de la fortification) ; guet seul aux sommets ; tours de tir sur côté fortifié ; tour sous-marine sur côté maritime ; états des constructions intact, endommagé, ruiné (traités à l'initialisation ; l'endommagement en cours de partie relève du présent chantier) ; réduit urbain et portes intérieures ; ports fortifiés sur les côtés terre-eau.

## Premier arbitrage — les tours fournissent des PF supplémentaires au défenseur

Principe arbitré par Francky à l'ouverture du chantier : une tour vient avec son personnel (archetiers, canonniers, mages de garnison, servants de baliste) ; elle fournit en conséquence des PF supplémentaires au défenseur, au-delà de la fortification porteuse.

### Complément arbitré — la tour est une unité composite : structure et garnison

Les tours sont considérées comme des qualités d'unité, sur le modèle des unités montées de l'É7 : une unité montée associe une monture et des cavaliers (deux races, nombre de cavaliers par monture) ; la tour associe une structure et une garnison.

- Structure (la maçonnerie) : construite en matériaux de natures distinctes — Bois, Pierre, Métal — et de qualités graduées A à F, l'échelon F couvrant les matériaux mystiques (alliages enchantés, pierre vivante, matters du fil des Dieux). La nature et la qualité de la structure gouvernent son endurance face aux machines de siège (seuils de brèche, vitesse de dégradation intact → endommagé → ruiné), son coût et son délai de construction, et sa contribution structurelle aux PF du côté (l'appui, l'avantage de hauteur).
- Garnison (le personnel) : créée avec la tour au niveau voulu par le MdM, dotée d'une qualité A à F de l'échelle des unités (Bleu à Exception, niveaux d'habileté 5 à 37). Sa qualité gouverne les PF de tir de la tour (le guet demeurant hors PF de tir) et ses capacités opérationnelles (détection, NFR, DI, NFA, NFS).
- Les deux composantes sont remplaçables séparément : une garnison peut être relevée (nouvelle qualité) sans toucher à la maçonnerie ; une structure endommagée peut être réparée (matériaux, main-d'œuvre) sans changer le personnel. Une tour privée de personnel fournit sa structure mais zéro PF de tir ; une structure ruinée ne fournit plus rien.
- Représentation des données : une tour porte `structure { nature, qualité }` et `garnison { qualité, effectif }` ; l'état (intact, endommagé, ruiné) demeure porté par la construction, la structure étant seule concernée par l'endommagement.

PF disponibles de la tour = PF de tir du type × coefficient de qualité de la garnison (échelle A–F) + PF structurels de la nature et qualité de la structure, le tout module par l'état, intégré aux PF effectifs du camp défenseur comme les milices et défenses intrinsèques des villes en É7 ; la chaîne complète (EDT, terrain, moral, fortifications, circonstances) s'applique à la résolution, pas à la dérivation.

### Arbitrages complémentaires (qualités indépendantes, modèle homogène, matériaux mystiques)

- Qualités indépendantes : la qualité de la structure ne plafonne pas celle de la garnison, ni l'inverse. Une maçonnerie médiocre peut héberger une garnison d'Exception — le MdM en assume le récit — et une structure de qualité F peut être servie par des bleus ; le moteur enregistre les deux qualités sans contrainte croisée.
- Modèle homogène : la règle matériau × qualité s'applique dès maintenant aux fortifications porteuses (murs, citadelles), pas seulement aux tours. Chaque côté fortifié porte une structure { nature, qualité } en sus de son état (aucun, mur, citadelle) ; la contribution structurelle aux PF du côté en dérive, et l'endurance du côté face aux machines suit la même table nature × qualité. Les côtés terre-eau demeurent hors du cycle rempart (cycle portuaire) : leurs valeurs relèvent du port fortifié, à arbitrer avec le blocus par eau.
- Matériaux mystiques : l'échelle des matériaux rejoint celle des unités, A à F ; l'échelon F couvre les matériaux mystiques, rares et coûteux, réservés aux constructions magiques et aux grandes cités (clef de voûte du rendu final : un rempart F ne se peint pas comme un rempart A).
- Conséquence de données : la ville expose, par côté fortifié et par tour, nature et qualité de structure ; `deriverPF(ville)` dérive les PF structurels et de tir sans les stocker (le moteur calcule, la ville décrit).

Conséquences immédiates :

- Les PF d'un côté défendu s'additionnent : PF de la fortification (aucun, mur, citadelle) + PF de chaque tour posée sur ce côté. La fortification porteuse devient le principe de localisation : les PF d'une tour profitent au côté qu'elle couronne, non à l'ensemble du périmètre.
- Le guet, organe de détection et de signal, ne fournit pas de PF de tir : sa contribution opérationnelle relève du brouillard tactique (bonus de reconnaissance au défenseur, détection des mouvements de l'assaillant, alerte de la garnison).
- L'état module la contribution : une tour endommagée fournit une fraction de ses PF, une tour ruinée n'en fournit plus ; la règle d'endommagement en cours de partie décidera de la transition (point ouvert ci-dessous).
- Le personnel est décompté : la garnison d'une tour consomme du ravitaillement comme une unité ; la tour privée de personnel (ravitaillement en échec, garnison détachée) fournit ses constructions mais pas ses PF supplémentaires.

## Propositions de l'assistant à arbitrer

- PF par type de tour (valeurs indicatives à calibrer contre le relevé Édition 7) : archers modérés (tir de harcèlement, NFR) ; artillerie élevés (DI brisant les machines avant la brèche) ; mage élevés (NFA, zone d'effet) ; sous-marine : PF spécifiques contre l'approche amphibie et le blocus par eau (NFS) ; baliste orientés anti-machines (bonus contre les tours de siège et béliers plutôt que PF bruts).
- Rendement décroissant ou cumul plafonné par côté : trois tours sur un même côté ne devraient pas rendre celui-ci imprenable ; le moteur affichera l'agrégat et sa décomposition (principe des multiplicateurs : pas de plafonnement caché, mais la table de résolution peut être non linéaire).
- Le PF bénéficie au contrôleur de la ville, non au propriétaire de la tour (une tour posée par une puissance alliée défend la place ; la question se repose en cas de trahison — la tour change de camp ou devient inerte).
- Les tours du périmètre et des côtés intérieurs participent toutes : un assaillant établi dans un quartier affronte les tours du réduit urbain.

## Endommagement en cours de partie (point n° 1 — arbitré le 25 octobre 2026)

La règle proposée réutilise les fondations déjà posées : la table unique nature × qualité, le tour de bataille d'une semaine, le terrassement d'une semaine, la fortification porteuse, l'ancrage É7 des points de structure (PST des créatures, PSTR des vaisseaux).

Points de structure du côté. Chaque côté fortifié (périmètre ou intérieur) et chaque tour portent des points de structure (PS) dérivés de la table nature × qualité : état + nature + qualité → PS. Le moteur dérive les PS, ne les stocke pas ; la ville décrit (nature, qualité, état), le moteur calcule.

Dégâts. Les machines de siège de l'assaillant infligent des dégâts au cours du tour de bataille hebdomadaire, datés sur le calendrier (couche actions) et résolus avec la bataille : le terrassement (une semaine déjà arbitrée) précède le tir des machines ; les trébuchets et catapultes frappent la structure du côté et les constructions intra-urbaines ; le bélier exige le contact du rempart (protégé par le fossé du terrassement) ; la sape mine le mur par en dessous (niveau -1, couches de carte) et double ses dégâts contre le bois (pourri) ; les tours de siège déposent l'assaut sur le chemin de ronde sans brèche préalable ; les échelles donnent l'assaut avec malus. La baliste défensive (tour de balistes) tire contre les machines avant la brèche.

Transitions (arbitrées). Les dégâts se décomptent des PS du côté : à la moitié des PS, le côté passe à endommagé (fraction des PF structurels, seuil à calibrer) ; à zéro PS, le côté est ruiné et une brèche est ouverte — la brèche n'apparaît qu'à la ruine du côté, jamais avant : un côté endommagé se défend toujours, l'assaut ne passe que par les portes, les tours de siège et les échelles. L'état ruiné est durable : il ne se répare pas, il se reconstruit (matériaux, délai, main-d'œuvre — les valeurs au chantier économie).

Tours visées (arbitrées). L'assaillant choisit les tours qu'il vise, à condition que sa reconnaissance ait levé le brouillard tactique sur le côté assaûté (en cohérence avec le brouillard validé au chapitre Combat) ; sans reconnaissance, la répartition des dégâts est automatique à la résolution. Une tour endommagée voit ses PF réduits, une tour ruinée perd garnison et tir : le personnel reflue vers le réduit ou est perdu (pertes, à la résolution de l'assaut).

Réparations (arbitrées). Hors siège comme en cours de siège, les réparations sont libres : une semaine de travaux et des matériaux de même nature (qualité égale ou moindre) rendent l'état intact, les PS reviennent au maximum dérivé. Garde-fou de calibrage à inscrire au relevé : le débit de dégâts des machines doit excéder le débit de réparation d'un côté moyen, et les réparations consomment des matériaux décomptés des stocks de la ville (grenier, entrepôt) — un défenseur ne peut réparer indéfiniment sans ravitaillement, ce qui relie la règle au blocus (point n° 3).

Magie et matériaux mystiques (renvoyés au calibrage). Les sorts de grande magie et les NFA infligent leurs propres dégâts, datés au lancement ; l'échelon F des matériaux (mystique) sera tranché lors du calibrage des valeurs — insensibilité aux machines ou endurance très élevée dans la table PS.

## Questions ouvertes du chantier (ordre de traitement proposé)

1. Endommagement en cours de partie : machines de siège contre fortifications, seuils de brèche par côté, transition intact → endommagé → ruiné, réparations (durée, coût, main-d'œuvre).
2. Machines de siège et terrassement : catalogue (tour de siège, bélier, trébuchet, sape, échelle), interaction avec les PF des tours (la baliste anti-machines), calendrier des travaux en semaines.
3. Blocus et ravitaillement intra-urbain : effets sur la ville et la garnison, rôle du grenier et du réduit urbain, alerte de pénurie en semaine 1, sort du ravitaillement aquatique (quai, pilotis, tour sous-marine contre le blocus par eau).
4. Assaut et résolution : PF du côté assaûté dans la table de résolution de l'assaut, interaction avec les doctrines, contribution des DI/NFA/NFR/NFS en tour de bataille.
5. Combat intra-urbain : prise de quartier en quartier, portes intérieures barricadées, tours des côtés intérieurs, rendu des pertes.
6. Interface moteur Villes : dérivation des PF par côté depuis la ville (fortification + tours, modules d'état et de personnel), expose dans l'export « villes-e8 », jeux d'essais de la fixture Corvire.
7. Calibrage : relevé exhaustif des valeurs de siège de l'Édition 7, recalcul sur la base 28 jours, tests sur la fixture Corvire (le siège du chapitre VII devient le premier scénario complet).

## Interface prévue avec le moteur Villes

