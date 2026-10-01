const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const caminhoChave = path.join(__dirname, "serviceAccountKey.json");

let appFirebase = null;

if (fs.existsSync(caminhoChave)) {
  const serviceAccount = require(caminhoChave);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  appFirebase = admin;
} else {
  console.warn(
    "AVISO: backend/serviceAccountKey.json não encontrado. " +
    "As rotas protegidas por Firebase exigirão essa chave."
  );
}

module.exports = appFirebase;
