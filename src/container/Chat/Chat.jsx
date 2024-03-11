import React, { useEffect, useState } from "react";
import { Container, CssBaseline, TextField, Button, Grid, Paper } from "@mui/material";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL); 
    setSocket(newSocket);

    newSocket.on("chat-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("chat-message", { sender: "You", message: messageInput });
      setMessageInput("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "400px", overflowY: "auto", width: "100%" }}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "You" ? "sent" : "received"}>
              {msg.sender}: {msg.message}
            </div>
          ))}
        </div>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="message"
              label="Type a message..."
              name="message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" fullWidth onClick={sendMessage}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Chat;
