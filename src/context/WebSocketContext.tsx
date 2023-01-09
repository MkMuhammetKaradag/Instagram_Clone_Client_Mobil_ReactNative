import * as React from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@env";
export const socket = io(API_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
interface WebSocketProviderProps {
  children: React.ReactElement<any>;
}

export const WebSocketContext = React.createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
