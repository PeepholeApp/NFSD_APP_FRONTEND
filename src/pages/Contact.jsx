import React, { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { ButtonLight } from "../components/Button";
import Footer from "../components/Footer";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import Alert from "@mui/material/Alert";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const successTimer = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    const errorTimer = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => {
      clearTimeout(successTimer);
      clearTimeout(errorTimer);
    };
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact/sendEmail`,
        {
          fullName: name,
          email,
          message,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setError(null);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const socialIcons = [
    { icon: GitHubIcon, link: "https://github.com/PeepholeApp" },
    { icon: XIcon, link: "https://twitter.com/Peepholeapp_" },
    {
      icon: FacebookIcon,
      link: "https://www.facebook.com/profile.php?id=61556777854922",
    },
    { icon: InstagramIcon, link: "https://www.instagram.com/peepholeapp_/" },
  ];

  return (
    <>
      <Stack
        component="form"
        sx={{ m: 5 }}
        alignItems="center"
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" sx={{ m: 5 }}>
          Contact us
        </Typography>
        <Typography variant="h6" sx={{ m: 5, width: 600 }}>
          Thank you very much for your interest in Peephole. If you would like
          to speak to a member of our team, please fill out the form below. A
          representative will contact you as soon as possible.
        </Typography>

        <Stack
          sx={{ p: 8, width: 600, backgroundColor: "#262938" }}
          spacing={2}
        >
          {success ? (
            <Alert variant="filled" severity="success">
              Email sent correctly. Thank you!
            </Alert>
          ) : null}

          {error ? (
            <Alert variant="filled" severity="error">
              Could not send email
            </Alert>
          ) : null}
          <TextField
            id="fullName"
            placeholder="Full Name"
            label="FullName"
            type="fullName"
            variant="outlined"
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email"
            placeholder="example@gmail.com"
            label="Email"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            multiline
            placeholder="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <ButtonLight type="submit" disabled={!email}>
            <Typography variant="h6">Enviar</Typography>
          </ButtonLight>
        </Stack>
      </Stack>
      <Footer
        title="Peephole"
        description="Make friends, make memories."
        social={socialIcons}
      />
    </>
  );
}

export default Contact;
