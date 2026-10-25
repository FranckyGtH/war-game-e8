# War Game Édition 8 — dépôt de développement

Dépôt de développement du Wargame « Mondes Fantastiques » Édition 8. Les canevas de conception demeurent la source de vérité ; ce dépôt reçoit les exports reconstruits (moteur, maquettes, spécifications).

## Contenu

- `moteur/moteur-villes.js` — module moteur Villes v0.1 (JavaScript pur, sans dépendance) : emprises, quartiers, grille fine, classes d'emprise, quais, ports, fortifications, remplissage décoratif déterministe, export/import « villes-e8 ».
- `moteur/run-tests.js` — exécuteur des jeux d'essais (Node, exit 1 en cas d'échec).
- `moteur/fixture-corvire.js` — fixture « La Cité de Corvire » (roman de test urbain) : ville scénario exécutable et variante megapole à deux régions d'eau.
- `maquettes/` — maquettes de l'outil Quartiers et de l'éditeur de carte.
- `specs/` — modèle de données Villes, journal des décisions, roman de test urbain.

## Tests

```bash
node moteur/run-tests.js
```

La CI GitHub Actions exécute cette commande à chaque poussée.
