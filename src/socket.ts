import { io } from 'socket.io-client';

const URL = 'https://hastydev-backend.onrender.com/';

export const socket = io(URL);
