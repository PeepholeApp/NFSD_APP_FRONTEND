import { Link } from "react-router-dom";
import { ButtonDark, ButtonLight } from "../components/Button";

function onHi() {
  console.log("Hola");
}

const Home = () => {
  return (
    <>
      <Link to="/profile">Profile</Link>
      <h1>Home</h1>
      <ButtonDark onClick={onHi}>Sign Up</ButtonDark>
      <ButtonLight>Sign In</ButtonLight>
    </>
  );
};
export default Home;
