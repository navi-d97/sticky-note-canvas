import { io } from "socket.io-client";

export const stickyNoteBgColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#F78DA7', '#9900EF', '#FFFD75']

export const BASE_URL = 'http://ec2-54-164-75-127.compute-1.amazonaws.com:8000'

export const socket = io(BASE_URL);

export const mockUserId = '123';