// client/src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';

interface Property {
  id: number;
  host: string;
  name: string;
  imageUrl: string;
}

function Home() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    axios.get("/properties").then((res) => {
      setProperties(res.data);
    });
  }, []);
  console.log(properties)

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
      <h2 className="section-title">Available Properties</h2>
      <div className="property-list">
        {properties.map((p) => (
          <div key={p.id} className="property-card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
