// Exécuteur des jeux d'essais du moteur Villes (Édition 8).
// Sortie : liste des contrôles ; code de sortie 1 si au moins un échec.
const { MOTEUR_VILLES, runTests } = require("./moteur-villes.js");
const { runFixtureTests } = require("./fixture-corvire.js");

let echecs = 0, total = 0;
function rapport(label, res) {
  const ko = res.filter((r) => !r.ok);
  total += res.length; echecs += ko.length;
  console.log(`== ${label} : ${res.length - ko.length}/${res.length} au vert ==`);
  for (const r of ko) console.log(`  ECHEC : ${r.nom}`);
}
rapport("MOTEUR_VILLES.runTests()", runTests());
rapport("Fixture Corvire (roman de test urbain)", runFixtureTests());
console.log(`Total : ${total - echecs}/${total} au vert`);
process.exit(echecs ? 1 : 0);
