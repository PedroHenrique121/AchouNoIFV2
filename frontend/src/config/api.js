import { Platform } from "react-native";

// Altere esta URL se o backend estiver em outro computador.
// Android Emulator: 10.0.2.2 aponta para o localhost do computador.
// iOS Simulator/Web: localhost funciona.
// Celular físico: use o IP da máquina na rede, por exemplo http://192.168.0.10:3000.
const HOST =
  Platform.OS === "android"
    ? "10.0.2.2"
    : "localhost";

export const API_URL = `http://${HOST}:3000`;
export const UPLOADS_URL = `${API_URL}/uploads`;

export function getFotoUrl(nomeArquivo) {
  if (!nomeArquivo) return null;
  if (nomeArquivo.startsWith("http://") || nomeArquivo.startsWith("https://")) {
    return nomeArquivo;
  }
  return `${UPLOADS_URL}/${encodeURIComponent(nomeArquivo)}`;
}
