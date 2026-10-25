# War Game Project — Édition 8 « Mondes Fantastiques »

Wargame au tour par tour alliant diplomatie, gestion d'empire, d'armées, de villes, de guildes et de commerce dans des mondes médiévaux fantastiques. Ce dépôt constitue la source de vérité technique du projet : moteur de règles, maquettes interactives et spécifications.

## Arborescence

- `moteur/` : module moteur pur (JavaScript, aucune dépendance).
  - `moteur-villes.js` : chantier Villes — emprises, grille fine, pose, classes d'emprise, quai et chaîne portuaire, fortifications, dérivation des rues, remplissage décoratif déterministe, export/import « villes-e8 ». Quarante-cinq jeux d'essais via `runTests()`.
  - `run-tests.js` : exécution Node des jeux d'essais (sortie non nulle en cas d'échec).
- `maquettes/` : maquettes interactives (React) de conception et de démonstration.
- `specs/` : spécifications et journal des décisions de conception.
  - `modele-donnees-villes.md` : modèle de données de référence du chantier Villes.
  - `decisions.md` : journal des arbitrages de la refonte Édition 8.

## Tests

```bash
npm test        # ou : node moteur/run-tests.js
```

Les tests sont exécutés automatiquement à chaque déploiement (GitHub Actions, voir `.github/workflows/tests.yml`).

## Conventions géométriques (référence du 25 octobre 2026)

- Hexagones pointy-top, odd-r ; voisinage par tables paires/impaires.
- Repère SVG (y vers le bas) : E 0°, SE 60°, SO 120°, O 180°, NO 240°, NE 300°.
- Nœuds : `C{c},{r}` (centre), `A{c},{r}{côté}` (milieu d'arête) ; clés de côté : périmètre `c,r,côté`, intérieur `qkA|qkB` triées.

## Sens de circulation canevas → dépôt

Les canevas de conception restent l'espace de démonstration ; tout canevas validé est consolidé ici par le moteur ou la maquette correspondante. Le journal des décisions (`specs/decisions.md`) fait foi pour les arbitrages.
