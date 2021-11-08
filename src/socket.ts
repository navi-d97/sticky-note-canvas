import { socket } from "./Common/constants";

class SocketConnetion {
    subscribe = (topic: string) => {
        socket.emit('subscribe', topic);
    }

    unsubscribe = (topic: string) => {
        socket.emit('unsubscribe', topic);
    }

    onEvent = (event: string, callback: any) => {
        socket.on(event, (values: any) => {
            callback(values);
        });
    }
}
const socketConnection = new SocketConnetion();
export default socketConnection;