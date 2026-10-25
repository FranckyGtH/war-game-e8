
# La Cité de Corvire — roman de test urbain (Édition 8, v0.1)

## Objet de ce document

Un roman de test est une pièce de jeu narrative dont chaque séquence met en scène, devant le MdM, une règle du chantier Villes et un appel du module moteur `moteur-villes.js` (v0.1). L'histoire sert de scénario de playtest : si le moteur refuse ce que le récit autorise, ou autorise ce que le récit interdit, la règle ou le moteur est en défaut. Chaque chapitre se conclut par un encadré technique indiquant la règle testée, l'appel du moteur et le résultat attendu.

Cadre de jeu : mois de 28 jours (quatre semaines), Mois des Héros pour les actions datées, Cycle du Destin pour les flux. La ville de démonstration est remplacée par la ville scénario Corvire, qui deviendra la fixture de test du dépôt.

## Personnages et cadre

La cité de Corvire, niveau 7 (Ville, emprise de 4 régions), s'élève sur les deux rives du fleuve Argent. Quartiers : la Rive Haute (3,2), la Rive Basse (3,3), le Gué (4,2) et le Chenal (4,1), région d'eau du fleuve traversant la ville. Acteurs : la Mauresse Alwine, contrôleur de la ville ; le banquier Sethar, propriétaire du comptoir ; le prêtre Ostwald, dévoué à la cathédrale ; Half-Œil, maître des bateliers ; le capitaine Deor, commandant de la garde. Le MdM narre ; le moteur arbitre ; le roman triche parfois exprès, pour vérifier que le moteur dit non.


## Chapitre I — La fondation (Mois 1, semaine 1)

Alwine choisit le site : quatre régions d'un seul tenant, dont une baignée par le fleuve. Les arpenteurs tracent l'emprise ; la pose est guidée : clic sur la Rive Haute, puis les candidates se restreignent à mesure, la ville est posée quand le compte est atteint. Le Chenal retient les eaux du fleuve, une seule région d'eau pour quatre : le quota d'une ville terrestre de 4 régions est respecté. Un seigneur rival tente plus tard une fondation disjointe, une région isolée au-delà des collines ; les arpenteurs refusent : l'emprise doit être connexe.

Encadré technique — Règle : emprise selon le niveau, connexité, quota d'eau.
Appels : `validerEmprise({ niveau: 7, sousMarine: false, regions: ["3,2","3,3","4,2","4,1"], regionsEau: ["4,1"] })` ; puis la variante non connexe `regions: ["3,2","6,6","3,3","4,2"]`, refusée.
Attendu : `ok = true` pour Corvire ; `ok = false` pour l'emprise disjointe et pour 2 régions d'eau sur 4 (quota 1).

## Chapitre II — Les rues et les portes (Mois 1, semaine 2)

Le MdM trace les rues principales : du pont de la Rive Haute vers le marché du Gué, de la porte nord au bord du fleuve. Les entrées de la ville se dérivent seules des côtés traversés ; les garde-fous des carrefois se posent sur la porte nord, ouverte le jour, fermée la nuit. Ostwald veut dresser son temple sur le chemin du marché ; les maçons refusent : nul édifice ne s'élève sur la bande de la rue, large d'une case et demi. Seuls le marché et la place y ont droit. Alwine déplace le temple d'une case ; cette fois la pose est admise.

Encadré technique — Règle : rues principales, entrées dérivées, bande inconstructible.
Appels : `deriverRues(ville)` renvoie entrées et portes intérieures ; `controlesPose(ville, "3,2", "temple", [cellule de la bande])` refusé ; `controlesPose(ville, "3,2", "temple", [cellule libre voisine])` admis ; `controlesPose(ville, "4,2", "marche", [cellule de la bande])` admis (compatibilité marché/rue).
Attendu : entrées dérivées des côtés traversés ; refus sur la bande sauf marché et place.

## Chapitre III — Le marché et la maison des changeurs (Mois 2)

Corvire compte quatre quartiers : la somme des niveaux de toutes les Institutions d'un même type ne saurait dépasser quatre. Alwine dresse le marché du Gué, niveau 2, puis l'étend à 4 : le double du marché fixe la borne des changeurs. Sethar veut une banque de niveau 2 puis un comptoir de niveau 1 ; la corporation des changeurs plaide que la moitié du marché est déjà prise. Le moteur refuse le second édifice ; Sethar finance la montée du marché à 4, rouvrant la place, puis pose sa banque. En contrepartie, un grenier de niveau 12 s'élève sur la Rive Haute : la moitié de la borne du stockage, fixée au double du niveau de la ville.

Encadré technique — Règle : borne collective des Institutions (somme des niveaux ≤ nombre de quartiers), bornes croisées É7 (banque et comptoir ≤ ½ marché), stockage borné à 2 × niveau de la ville.
Appels : `controlesPose(ville, "4,2", "banque", [cellule])` refusé quand comptoir = ½ marché ; admis après montée du marché à 4 ; `controlesPose(ville, "3,2", "grenier", [17 cellules])` refusé au-delà de 14 (2 × 7) ; grenier de niveau 12 admis.
Attendu : refus à la pose et à la montée de niveau, contrôle de cohérence en appui, décompte des niveaux disponibles affiché au MdM.

## Chapitre IV — Le quai des bateliers (Mois 3)

Sans quai, on ne bâtit que sur la terre. Half-Œil fait poser le premier appontement sur une rive du Chenal : toute cellule du ruban non adjacente à une autre région d'eau est éligible, berges internes comme littoral. Puis les pontons s'avancent librement sur le fleuve : l'extension ne reprend la contrainte de rive pour rien, une cellule libre orthogonalement adjacente suffit. Le quai croît niveau après niveau, sans jamais dépasser le double du niveau de la ville. Entre-temps, Sethar tente un entrepôt sur pilotis avant tout quai ; les ouvriers n'ont pas où accoster, la pose est refusée.

Encadré technique — Règle : quai posé sur cellule de rive, extension libre, plafond 2 × niveau de la ville, constructions aquatiques conditionnées au quai (somme des niveaux aquatiques ≤ niveau du quai).
Appels : `deriverRives(ville, "4,1")` donne le ruban éligible ; `controlesPose(ville, "4,1", "quai", [cellule de rive])` admis ; extension sur cellule d'eau adjacente admise ; `controlesPose(ville, "4,1", "entrepotPilotis", [cellule])` refusé sans quai, admis quand la somme aquatique reste ≤ niveau du quai.
Attendu : rives dérivées (berges internes et littoral, sauf côté vers une autre région d'eau), refus explicites, palette filtrée en quartier lacustre.

## Chapitre V — Le port fortifié (Mois 4)

Le côté partagé entre le Chenal et la Rive Basse reçoit son aménagement portuaire : port de niveau 1, puis 2, puis 3, enfin port fortifié avec sa fortification portuaire. Nul rempart standard sur ces côtés terre-eau : le port fortifié en tient lieu, et les portes dérivées des rues ne s'y appliquent pas. La tour de guet du sommet nord veille, la tour d'archers couronne le rempart est. Une tour de mage complète le dispositif, posée une à une, plus jamais par lot automatique.

Encadré technique — Règle : installations portuaires sur côtés terre-eau (cycle aucun → port n1 → n2 → n3 → port fortifié), conditionnées au quai, exclus du cycle rempart et des portes.
Appels : pose du port sur le côté terre-eau, refusée sans quai (`controlesCoherence` signale l'incohérence) puis admise ; `controlesCoherence(ville)` tout au vert après aménagement ; la tour d'archers posée sur le rempart est sommée dans l'état « mur et tours ».
Attendu : marqueurs d'ancre en vue Fortifications, section « ports » de l'export, cohérence intégrale.

## Chapitre VI — La muraille intérieure (Mois 5)

La guerre approche. Deor fait murer les côtés du périmètre, barricader la porte sud, et — c'est la nouveauté — fortifier le côté intérieur entre le Gué et la Rive Basse : une porte intérieure y est dérivée du tracé de la rue, ouverte en temps de paix, fermée à la première alarme. Le Gué devient un réduit urbain : greniers, puits et citerne y suffisent à un siège d'un mois. Les rues traversant un côté intérieur fortifié y passent par une porte intérieure ; une porte barricadée coupe la circulation inter-quartiers. Aux créneaux, l'arbitrage du jour : la tour de guet veille seule, au sommet nord, sans autre porteur qu'elle-même ; les tours de tir, elles, ne s'élèvent plus que sur une fortification porteuse — la tour d'archers couronne le mur sud, la baliste garnit le mur intérieur du réduit, et la tour sous-marine garde le littoral fortifié du Chenal. Une tour de tir sans rempart porteur est orpheline, et le moteur la signale comme une porte sans rue.

Encadré technique — Règle : fortifications côté par côté du périmètre et des côtés intérieurs, entrées fortifiées (ouverte, fermée, barricadée), portes intérieures dérivées, réduit urbain ; tours sous fortification porteuse (guet seul admis aux sommets, tours de tir — archers, artillerie, mage, sous-marine, baliste — exigeant un côté fortifié porteur, la tour sous-marine un côté maritime).
Appels : fortification des côtés périphériques et intérieurs ; `deriverRues(ville)` expose portes intérieures ; état de porte barricadée refuse la traversée ; `controlesCoherence(ville)` vérifie l'ensemble, y compris le registre des types de tours, les positions, la fortification porteuse et les états du registre aucun, mur, citadelle.
Attendu : lignes de défense internes possibles, isolement d'un quartier, tours cohérentes avec leur porteur, cohérence au vert.

## Chapitre VII — Le siège (Mois 6–7)

L'armée du seigneur rival descend sur Corvire. Le terrassement exige au moins une semaine de travaux ; l'assaut ne viendra pas avant la semaine suivante. Les brèches sont pour l'heure une affaire de MdM, faute d'arbitrage sur les seuils de brèche et l'endommagement en cours de partie : le roman fixe donc les états à l'initialisation du siège. Le rempart sud est endommagé ; le grenier de la Rive Haute a été frappé, il est endommagé mais tient encore ; la cathédrale, refuge des habitants, demeure intacte. Un greffeur distrait inscrit « détruit » au registre : le moteur repousse l'état inconnu — seuls intact, endommagé et ruiné existent. La ruine elle-même est admise par le moteur : c'est au chantier Siège qu'incombera la règle d'endommagement en cours de partie, pas au registre des états.

Encadré technique — Règle : états intact, endommagé, ruiné ; champ laissé ouvert au chantier Siège.
Appels : `controlesCoherence(ville)` tout au vert avec le grenier endommagé ; avec un état inconnu (« detruit »), un contrôle signale l'état invalide ; avec la cathédrale ruiné, la cohérence demeure (l'état ruiné est légal, l'endommagement en cours de partie restant à arbitrer).
Attendu : export exposant l'état de chaque construction, hachures au rendu, refus des états hors du registre. Question ouverte à arbitrer : règle d'endommagement en cours de partie (chantier Siège), machines de siège et dégâts intra-urbains.

## Chapitre VIII — La reconstruction (Mois 8)

La paix revient. Le MdM relève la ville à l'identique d'une session à l'autre : la graine de remplissage enregistrée fait que les maisons, boutiques et tavernes comblant les cellules libres reprennent leur place exacte. On reconstruit la tour est, la porte sud rouvre, la banque de Sethar est à nouveau solvable. À la fin de la saison, l'export de la ville traverse le portail : format « villes-e8 », identifiants stables jamais réutilisés, la même Corvire revient à l'import, à la cellule près.

Encadré technique — Règle : remplissage décoratif déterministe par graine, export/import, identifiants uniques.
Appels : `remplissageDecoratif(ville, graine)` — deux appels avec la même graine donnent le même rendu, une graine différente en donne un autre ; `importer(exporter(ville))` restitue la ville à l'identique ; `importer('{"format":"autre"}')` lève une erreur.
Attendu : reproductibilité visuelle, sérialisation de référence, refus des formats inconnus.

## Chapitre IX — Melgar-sur-Argent, la mégapole du large (Mois 9)

Corvire apaisée, le roman change de décor : Melgar-sur-Argent, mégapole de niveau 9, sept régions dont trois en eau — le fleuve s'y élargit en un chapelet. Les trois régions d'eau se touchent : 2,3, 3,3 et 4,2 forment une chaîne. Conséquence immédiate de la règle des rives : le côté partagé par deux régions d'eau n'est pas une rive. Le ruban du quai de 4,2 s'interrompt donc au contact de 3,3 — les bateliers ne peuvent pas y accrocher leur premier appontement, ils doivent descendre vers le littoral extérieur, côté est. Une fois le quai posé sur ce littoral, les pontons s'avancent librement, comme à Corvire. La pose initiale sur le côté intérieur est refusée : le moteur marque la frontière des eaux.

Encadré technique — Règle : rive = tout côté de la région d'eau non adjacent à une autre région d'eau de l'emprise ; quota d'eau des emprises de 7 régions (3 régions de mer au plus).
Appels : `validerEmprise({ niveau: 9, regions: [7 régions], regionsEau: ["4,2","3,3","2,3"] })` admis ; 4 régions d'eau refusées ; `deriverRives(ville, "4,2")` exclut la bande du côté vers 3,3 ; `controlesPose(ville, "4,2", "quai", [cellule de cette bande])` refusé ; pose sur le littoral est admise.
Attendu : ruban de rive interrompu à la frontière des eaux, refus motivé à la pose, cohérence de la mégapole au vert.


## Fixture exécutable

Le roman est implémenté dans le dépôt sous `moteur/fixture-corvire.js` : la fonction `corvire()` construit la ville chapitre par chapitre (chaque pose passe par `controlesPose`, la fixture ne peut pas décrire une ville illégale), `melgar()` construit la variante du chapitre IX, et `runFixtureTests()` exécute les 43 contrôles numérotés par chapitre (préfixes I à IX, synthèse X). L'exécuteur `moteur/run-tests.js` enchaîne les 53 jeux d'essais du moteur et la fixture : 96 contrôles au total, code de sortie 1 en cas d'échec, exécutés par la CI à chaque poussée.

## Synthèse — ce que le roman fait subir au moteur

| Chapitre | Règle mise en scène | Fonction(s) du module |
| --- | --- | --- |
| I | Emprise, connexité, quota d'eau | `validerEmprise` |
| II | Rues, entrées, bande inconstructible | `deriverRues`, `controlesPose` |
| III | Borne collective des Institutions, bornes croisées, stockage | `controlesPose`, `controlesCoherence` |
| IV | Quai, rives, pontons, plafonds aquatiques | `deriverRives`, `controlesPose` |
| V | Ports et fortification portuaire | `controlesPose`, `controlesCoherence` |
| VI | Fortifications intérieures, portes, réduit urbain | `deriverRues`, `controlesCoherence` |
| VII | États endommagé et ruiné | `controlesCoherence`, export |
| VIII | Remplissage déterministe, sérialisation | `remplissageDecoratif`, `exporter`, `importer` |
| IX | Fleuve à régions d'eau voisines : frontière des eaux non rive, quota mégapole | `deriverRives`, `validerEmprise`, `controlesPose` |

## Jeux d'essais complémentaires (état)

1. Réalisé : Corvire est la fixture officielle du dépôt (`moteur/fixture-corvire.js`, chargée par `moteur/run-tests.js`, exécutée par la CI).
2. Réalisé : variante fleuve à régions d'eau voisines (Melgar-sur-Argent, chapitre IX) — le côté entre deux régions d'eau n'est pas une rive, le ruban du quai s'interrompt.
3. Reste à couvrir : variante sous-marine (toutes les régions en mer, tour sous-marine NFS aux sommets) — l'acceptation de l'emprise est déjà testée par le moteur, le parcours complet reste à narrer.
4. Réalisés comme tests : temple sur la bande de rue, banque au-delà de la moitié du marché, ponton sans quai, état inconnu au registre, import d'un format inconnu ; le monument ruiné s'est révélé légal (correction du chapitre VII).

## Questions que le roman pose aux arbitrages en attente

- L'échelle physique de l'hexagone reste à redéfinir (vitesse, ravitaillement, diffusion D3) : la chronologie du siège de Corvire devra être recalculée une fois l'échelle arbitrée.
- L'endommagement en cours de partie n'est pas encore régi : le chapitre VII fixe les états à l'initialisation et ne préjuge pas du chantier Siège.
- Le lien entre niveau de la ville et économie (émergence du niveau depuis les quartiers) reste ouvert : la montée du marché de Sethar au chapitre III est un exemple destiné à alimenter le chantier économie.
