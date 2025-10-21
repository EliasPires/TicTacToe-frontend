import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';

/**
 * Representa uma jogada enviada pelo jogador
 */
export interface Move {
  gameId: number;
  playerId: number;
  row: number;
  col: number;
}

/**
 * Representa o estado do jogo recebido do backend
 */
export interface Game {
  id: number;
  board: string;
  status: string;
  currentTurn: number;
  player1?: Player;
  player2?: Player;
}

export interface Player {
  id: number;
  name: string;
  symbol: string;
}

let stompClient: Client | null = null;

/**
 * Conecta ao WebSocket e escuta atualizações de um jogo
 */
export const connectWebSocket = (
  gameId: number,
  onMessageReceived: (game: Game) => void
): void => {
  const socket = new SockJS('http://localhost:8080/ws-game');
  stompClient = over(socket);

  stompClient.connect({}, () => {
    console.log('✅ Conectado ao WebSocket');

    // Inscreve no canal do jogo
    stompClient?.subscribe(`/topic/game/${gameId}`, (message) => {
      if (message.body) {
        const updatedGame: Game = JSON.parse(message.body);
        onMessageReceived(updatedGame);
      }
    });
  });
};

/**
 * Envia uma jogada para o servidor
 */
export const sendMove = (move: Move): void => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/move', {}, JSON.stringify(move));
  } else {
    console.error('❌ WebSocket não está conectado');
  }
};

/**
 * Desconecta o WebSocket (opcional)
 */
export const disconnectWebSocket = (): void => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log('🔌 Desconectado do WebSocket');
    });
  }
};
