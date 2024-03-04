import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

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
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          helperText="Enter a valid email"
          required
          value={email}
          te
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="outline" sx={{ mt: 2 }}>
          Enviar
        </Button>
      </Box>
    </>
  );
}

export default Contact;
