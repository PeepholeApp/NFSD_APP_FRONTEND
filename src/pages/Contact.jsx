import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function Contact() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit");
  };

  return (
    <>
      <h1>Contact us</h1>

      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 8, width: 600, backgroundColor: "#262938" }}
        spacing={2}
      >
        <TextField
          id="fullName"
          label="FullName"
          type="fullName"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          te
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h6">Phono</Typography>
        <TextField id="phono" type="phono" variant="outlined" />
        <TextField
          id="message"
          label="Message"
          type="message"
          variant="outlined"
          required
        />
        <Button type="submit" variant="outline" sx={{ mt: 2 }}>
          Enviar
        </Button>
      </Stack>
    </>
  );
}

export default Contact;
