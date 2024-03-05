import React, { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { ButtonLight } from "../components/Button";

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
      <Stack sx={{ m: 5 }} alignItems="center">
        <Typography variant="h3" sx={{ m: 5 }}>
          Contact us
        </Typography>
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

          <TextField
            id="message"
            label="Message"
            type="message"
            variant="outlined"
            required
          />
          <ButtonLight disabled={!email} onClick={handleSubmit}>
            <Typography variant="h6">Enviar</Typography>
          </ButtonLight>
          {/* 
          <Button type="submit" variant="outline" sx={{ mt: 2 }}>
            Enviar
          </Button> */}
        </Stack>
      </Stack>
    </>
  );
}

export default Contact;
