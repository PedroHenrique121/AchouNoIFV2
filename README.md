# AchouNoIF V2 — Backend + Frontend

Projeto separado em duas partes, seguindo a organização do PP3 finalizado:

- `backend/` → Node.js + Express + MySQL + Firebase Admin + Multer
- `frontend/` → React Native/Expo

## Upload de fotos

O fluxo agora é:

1. O app abre a galeria pelo `expo-image-picker`.
2. A imagem é enviada em `multipart/form-data` no campo `foto`.
3. O backend recebe com `multer`.
4. A imagem é salva fisicamente em `backend/uploads/`.
5. O banco grava o nome do arquivo em `objetos_perdidos.foto_principal`.
6. O Express disponibiliza os arquivos em `/uploads/<nome-do-arquivo>`.

As imagens aceitas são somente imagens e o limite é 5 MB.

## 1. Banco de dados

Use o `frontend/bancoPP3.sql` no MySQL (ou o seu banco existente).

A tabela `objetos_perdidos` já possui `foto_principal`.

## 2. Backend

Entre na pasta:

```bash
cd backend
npm install
```

Copie `.env.example` para `.env` e preencha:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=achouif
```

Para autenticação Firebase no backend, coloque a chave privada do Firebase como:

```text
backend/serviceAccountKey.json
```

Essa chave é obtida no Firebase Console em Configurações do projeto → Contas de serviço.

Depois:

```bash
npm start
```

Teste:

```text
http://localhost:3000/health
```

## 3. Frontend

Entre na pasta:

```bash
cd frontend
npm install
npx expo start
```

### Endereço da API

O arquivo:

```text
frontend/src/config/api.js
```

usa:

- Android Emulator → `http://10.0.2.2:3000`
- iOS Simulator/Web → `http://localhost:3000`

Se estiver usando um celular físico, troque `HOST` pelo IP do computador na rede local, por exemplo:

```js
const HOST = "192.168.0.10";
```

O celular e o computador precisam estar na mesma rede.

## 4. Onde a foto fica

Depois de cadastrar:

```text
backend/
└── uploads/
    └── uuid-da-imagem.jpg
```

No banco:

```text
objetos_perdidos.foto_principal
```

fica algo como:

```text
uuid-da-imagem.jpg
```

E a URL pública interna fica:

```text
http://localhost:3000/uploads/uuid-da-imagem.jpg
```

## Observação

O `serviceAccountKey.json` não é incluído no projeto por segurança. Gere a sua própria chave no Firebase.
