// client/src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">OddStay</div>
        <div className="buttons">
          <button onClick={() => navigate("/register?type=guest")} className="guest-btn">Sign in as Guest</button>
          <button onClick={() => navigate("/register?type=host")} className="host-btn">Sign in as Host</button>
        </div>
      </header>
      <main className="home-main">
        <h1>Welcome to OddStay</h1>
        <p>Your paranormal experience starts here.</p>
      </main>
    </div>
  );
}

export default Home;
