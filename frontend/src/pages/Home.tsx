import Confetti from "react-confetti";
import auth from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = auth.getCurrentUser();

  const handleClick = () => {
    auth.removeCurrentUser();
    navigate("/");
  };

  // Safeguard : If no user connected, go back to login page
  if (!user) navigate("/login");

  return (
    <div className="container">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h1 className="home_user" data-testid="cypress-homewelcome">
        Welcome Home !
      </h1>
      <div className="home_user" data-testid="cypress-homeuser">
        {user!.surname} {user!.name}
      </div>
      <div className="home_user">{user!.email}</div>
      <button className="home_button" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
}
