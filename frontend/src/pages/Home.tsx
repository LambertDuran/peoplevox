import Confetti from "react-confetti";
import auth from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = auth.getCurrentUser();

  // Safeguard : If no user connected, go back to login page
  if (!user) navigate("/login");

  return (
    <div className="container">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h1 className="home_user">Welcome Home !</h1>
      <div className="home_user">
        {user!.surname} {user!.name}
      </div>
      <div className="home_user">{user!.email}</div>
    </div>
  );
}
