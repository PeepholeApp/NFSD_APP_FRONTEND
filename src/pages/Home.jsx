import { Link } from "react-router-dom";
import { ButtonDark, ButtonLight } from "../components/Button";
import { Box } from "@mui/material";

function onHi() {
  console.log("Hola");
}

const Home = () => {
  return (
    <>
      <Box sx={{ m: 20 }}>
        <Link to="/profile">Profile</Link>
        <h1>Home</h1>
        <ButtonDark onClick={onHi}>Sign Up</ButtonDark>
        <ButtonLight>Sign In</ButtonLight>
      </Box>
    </>
  );
};
export default Home;
