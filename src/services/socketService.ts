// src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

// The backend URL will be loaded from an environment variable.
const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

// We create a single, shared socket instance for the entire app.
// `autoConnect: false` is important because we want to manually connect
// only when the user is on the dashboard page.
export const socket: Socket = io(URL, {
  autoConnect: false
});