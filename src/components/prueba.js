import axios from "axios";
const base_url =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app";
const plans = [
  {
    title: "Un día perfecto en Málaga",
    country: "España",
    city: "Málaga",
    coverImg: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    description: "Ruta gastronómica y cultural por Málaga",
    activities: [
      {
        type: "food",
        title: "Casa Lola",
        description: "Tapas tradicionales y vermut",
        img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0"
      },
      {
        type: "culture",
        title: "Museo Picasso",
        description: "Museo más importante de la ciudad",
        img: "https://images.unsplash.com/photo-1584441405886-bc91be61e56a"
      }
    ],
    votes: 12,
    createdAt: Date.now(),
    authorId: "seed-script"
  },
  {
    title: "Fin de semana foodie en Bilbao",
    country: "España",
    city: "Bilbao",
    coverImg: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    description: "Pintxos y paseo por la ría",
    activities: [
      {
        type: "food",
        title: "Casco Viejo",
        description: "Ruta de pintxos",
        img: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642"
      }
    ],
    votes: 25,
    createdAt: Date.now(),
    authorId: "seed-script"
  }
];
plans.forEach((plan, i) => {
  axios
    .post(`${base_url}/plans.json`, plan)
    .then(() => console.log(`Plan ${i + 1} creado`))
    .catch((e) => console.log("Error:", e));
});