import { useEffect, useState } from "react";
import axios from "axios";
import PlanCard from "./PlanCard";

const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app";

function PlanList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/places.json`)
      .then((response) => {
        const data = response.data;

        // Firebase → array usable
        const placesArray = Object.entries(data).map(([id, place]) => ({
          id,
          ...place,
        }));

        setPlaces(placesArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading plans...</p>;

  return (
    <section className="plan-list">
      {places.map((place) => (
        <PlanCard key={place.id} place={place} />
      ))}
    </section>
  );
}

export default PlanList;