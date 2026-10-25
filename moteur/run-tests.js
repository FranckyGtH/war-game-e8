// Exécution des jeux d'essais du module Villes (Node) : node moteur/run-tests.js
// Code de sortie non nul si un contrôle échoue (utilisé par la CI GitHub Actions).
const { runTests } = require("./moteur-villes.js");
const res = runTests();
let ok = 0;
for (const r of res) {
  console.log(`${r.ok ? "OK  " : "ÉCHEC"}  ${r.nom}`);
  if (r.ok) ok++;
}
console.log(`\n${ok}/${res.length} jeux d'essais au vert.`);
process.exit(ok === res.length ? 0 : 1);
