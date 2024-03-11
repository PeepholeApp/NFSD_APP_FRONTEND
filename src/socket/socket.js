import { Server } from "socket.io";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const io = new Server({ cors: baseUrl });

let onLineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        !onLineUsers.some(user => user.userId === userId) &&
        onLineUsers.push({
            userId,
            socketId: socket.id,
        });
    });
    console.log("onlineUser", onLineUsers);
});
