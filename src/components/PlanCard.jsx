function PlanCard({ place }) {
  return (
    <article className="plan-card">
      {/* Imagen principal */}
      <img
        src={place.coverImg}
        alt={place.name}
        className="plan-image"
      />

      <h2>{place.name}</h2>
      <p className="plan-description">{place.description}</p>

      {/* EXPERIENCIAS */}
      <h3>Experiences</h3>
      <ul>
        {place.experiencias &&
          Object.values(place.experiencias).map((exp, index) => (
            <li key={index}>
              <strong>{exp.title}</strong> – {exp.text}
            </li>
          ))}
      </ul>

      {/* LUGARES PARA COMER */}
      <h3>Places to eat</h3>
      <div className="food-list">
        {place.lugaresParaComer &&
          Object.values(place.lugaresParaComer).map((food, index) => (
            <div key={index} className="food-card">
              <img src={food.img} alt={food.name} />
              <p> <strong>{food.name}</strong></p>
              <p>{food.note}</p>
            </div>
          ))}
      </div>
    </article>
  );
}

export default PlanCard;
