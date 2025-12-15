import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app";

function CreatePlan() {
  const navigate = useNavigate();

  // main info
  const [name, setName] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [description, setDescription] = useState("");

  // experiencias
  const [experiencias, setExperiencias] = useState([
    { title: "", text: "" },
  ]);

  // lugares para comer
  const [lugares, setLugares] = useState([
    { name: "", img: "", note: "" },
  ]);

  const handleAddExperiencia = () => {
    setExperiencias([...experiencias, { title: "", text: "" }]);
  };

  const handleAddLugar = () => {
    setLugares([...lugares, { name: "", img: "", note: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const experienciasObj = {};
    experiencias.forEach((exp, index) => {
      experienciasObj[index] = exp;
    });

    const lugaresObj = {};
    lugares.forEach((lugar, index) => {
      lugaresObj[index] = lugar;
    });

    const newPlan = {
      name,
      coverImg,
      description,
      experiencias: experienciasObj,
      lugaresParaComer: lugaresObj,
    };

    console.log("Sending plan:", newPlan);

    axios
      .post(`${BASE_URL}/places.json`, newPlan)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating plan:", err);
      });
  };

  return (
    <main className="create-plan-page">
      <h1>Create Plan</h1>

      <form onSubmit={handleSubmit} className="create-plan-form">
        <h3>Main info</h3>

        <input
          type="text"
          placeholder="Place name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cover image URL"
          value={coverImg}
          onChange={(e) => setCoverImg(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3>Experiences</h3>

        {experiencias.map((exp, index) => (
          <div key={index} className="box">
            <input
              type="text"
              placeholder="Experience title"
              value={exp.title}
              onChange={(e) => {
                const updated = [...experiencias];
                updated[index].title = e.target.value;
                setExperiencias(updated);
              }}
            />

            <input
              type="text"
              placeholder="Experience text"
              value={exp.text}
              onChange={(e) => {
                const updated = [...experiencias];
                updated[index].text = e.target.value;
                setExperiencias(updated);
              }}
            />
          </div>
        ))}

        <button type="button" onClick={handleAddExperiencia}>
          + Add experience
        </button>

        <h3>Places to eat</h3>

        {lugares.map((lugar, index) => (
          <div key={index} className="box">
            <input
              type="text"
              placeholder="Place name"
              value={lugar.name}
              onChange={(e) => {
                const updated = [...lugares];
                updated[index].name = e.target.value;
                setLugares(updated);
              }}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={lugar.img}
              onChange={(e) => {
                const updated = [...lugares];
                updated[index].img = e.target.value;
                setLugares(updated);
              }}
            />

            <input
              type="text"
              placeholder="Note"
              value={lugar.note}
              onChange={(e) => {
                const updated = [...lugares];
                updated[index].note = e.target.value;
                setLugares(updated);
              }}
            />
          </div>
        ))}

        <button type="button" onClick={handleAddLugar}>
          + Add place to eat
        </button>

        <button>Create plan</button>
      </form>
    </main>
  );
}

export default CreatePlan;
