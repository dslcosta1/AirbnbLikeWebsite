// client/src/pages/HostDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HostDashboard.css';

interface Booking {
  guest: string;
  date: string;
}

interface Property {
  id: number;
  host: string;
  name: string;
  imageUrl: string;
  bookings: Booking[];
}

function HostDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const navigate = useNavigate();

  const host = "host@example.com";

  useEffect(() => {
    axios.get("/properties").then((res) => {
      const allProps: Property[] = res.data;
      setProperties(allProps.filter((p) => p.host === host));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const newProp = { ...form, host };
    await axios.post("/addProperty", newProp);
    setForm({ name: "", imageUrl: "" });
    const res = await axios.get("/properties");
    setProperties(res.data.filter((p: Property) => p.host === host));
  };

  return (
    <div className="dashboard-container">
      <h1>Host Dashboard</h1>
      <div className="form-section">
        <h2>Add New Property</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Property Name"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <div className="property-list">
        {properties.map((p) => (
          <div
            key={p.id}
            className="property-card"
            onClick={() => navigate(`/property/${p.id}`)}
          >
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.bookings.length} bookings</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;
