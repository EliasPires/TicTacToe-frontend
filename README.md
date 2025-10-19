# 🎮 Jogo da Velha Multiplayer - Frontend (React + TypeScript)

Este é o **frontend** do projeto *Jogo da Velha Multiplayer*, desenvolvido em **React + TypeScript**.  
A aplicação se comunica em tempo real com o backend via **WebSocket (STOMP + SockJS)** e permite que dois jogadores disputem partidas online.

---

## 🚀 Tecnologias Utilizadas

- **React 18+**
- **TypeScript**
- **Vite** *(ou Create React App, conforme sua escolha)*
- **STOMP.js** + **SockJS** *(comunicação WebSocket)*
- **Axios** *(chamadas REST)*
- **React Hooks (useState, useEffect)**
- **CSS Modules / Tailwind / Styled Components** *(escolha de estilização livre)*

---

## 🧱 Estrutura do Projeto

src/
├── components/ # Componentes de UI (GameBoard, Cell, etc.)
├── pages/ # Páginas principais (Home, GameRoom, etc.)
├── services/ # Comunicação com backend (REST e WebSocket)
│ ├── api.ts # Configuração Axios
│ └── websocket.ts # Conexão WebSocket com STOMP
├── types/ # Interfaces e tipagens globais
└── App.tsx # Componente raiz


---

## ⚙️ Pré-requisitos

Antes de iniciar, instale:
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

---

## ▶️ Como executar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jogo-velha-frontend.git
cd jogo-velha-frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

A aplicação ficará disponível em:
http://localhost:3000

🔗 Comunicação com o Backend
🔹 REST API

O frontend consome as APIs expostas pelo backend:
| Método | Endpoint           | Descrição             |
| ------ | ------------------ | --------------------- |
| `POST` | `/games`           | Cria nova partida     |
| `POST` | `/games/{id}/join` | Jogador entra no jogo |
| `GET`  | `/games/{id}`      | Busca estado atual    |

A URL base pode ser configurada no arquivo src/services/api.ts:
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080', // altere para o endpoint online depois
});

🔹 WebSocket (tempo real)

A comunicação é feita com STOMP sobre SockJS:

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const socket = new SockJS('http://localhost:8080/ws-game');
const stompClient = over(socket);

stompClient.connect({}, () => {
  console.log('Conectado!');
  stompClient.subscribe('/topic/game/1', (message) => {
    console.log('Atualização recebida:', JSON.parse(message.body));
  });
});

🔸 O WebSocket envia e recebe objetos Game e Move em formato JSON.

🕹️ Funcionalidades

✅ Criar nova partida
✅ Entrar em uma partida existente
✅ Receber atualizações em tempo real via WebSocket
✅ Renderizar o tabuleiro e os turnos
🚧 (Em desenvolvimento) Validação de vitória e empate
🚧 (Em desenvolvimento) Interface visual aprimorada

🌍 Deploy

Frontend: Vercel / Netlify

Backend: Render / Railway / AWS

Após o deploy, atualize a URL base no api.ts e no websocket.ts para o domínio do backend online.

🔗 Backend do projeto

👉 Repositório Backend (Spring Boot)

📜 Licença

Este projeto está sob a licença MIT — sinta-se livre para usar e modificar.

✨ Autor

Seu Nome

Desenvolvedor Java | React | Spring Boot | TypeScript
  LinkedIn
 · GitHub
