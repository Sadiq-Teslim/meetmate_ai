// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

// The backend URL will be loaded from an environment variable.
export const SOCKET_URL = "https://meetingsense.onrender.com";

// We create a single, shared socket instance for the entire app.
// `autoConnect: false` is important because we want to manually connect
// only when the user is on the dashboard page.
// export const socket: Socket = io(URL, {
//   autoConnect: false,
//   transports: ["websocket"],
// });

// export const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
//   autoConnect: false, // manually connect in components
// });

interface ServerToClientEvents {
  transcription: { text: string };
  "new-question": { _id: string; question: string };
  "new-answer": { questionId: string; answer: string };
}

interface ClientToServerEvents {
  askQuestion: (question: string) => void;
  answerQuestion: (payload: { questionId: string; answer: string }) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
  {
    transports: ["websocket", "polling"],
    timeout: 5000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
);

// Connection events
socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// export default socket;
