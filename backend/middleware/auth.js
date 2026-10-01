const admin = require("../firebase");

module.exports = async (req, res, next) => {
  try {
    if (!admin) {
      return res.status(503).json({
        erro:
          "Autenticação do servidor não configurada. " +
          "Adicione backend/serviceAccountKey.json.",
      });
    }

    const authorization = req.headers.authorization || "";
    const token = authorization.startsWith("Bearer ")
      ? authorization.substring(7)
      : null;

    if (!token) {
      return res.status(401).json({ erro: "Token não enviado." });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.usuario = decoded;

    next();
  } catch (erro) {
    console.error("Erro ao validar token Firebase:", erro.message);
    return res.status(401).json({ erro: "Token inválido." });
  }
};
