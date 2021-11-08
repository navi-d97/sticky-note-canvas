import { io } from "socket.io-client";

export const stickyNoteBgColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#F78DA7', '#9900EF', '#FFFD75']

export const socket = io('http://localhost:8000');

export const mockUserId = '123';