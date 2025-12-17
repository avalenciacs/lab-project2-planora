🌍 Planora

Discover. Plan. Experience.

Planora is a travel planning web application where users can discover, create and share real travel plans created by real people, not generic recommendations.

Each plan represents a concrete experience in a specific city — such as food routes, cultural visits, nature activities or leisure plans — designed to inspire other travelers.

🚀 Live Demo

(Optional – add if you deploy it later)
🔗 coming soon

🧠 Concept & Motivation

Most travel platforms focus on generic tourist attractions.
Planora focuses on authenticity — real plans based on personal experiences, curated by travelers themselves.

The goal is to provide:

Inspiration from real people

Simple and intuitive navigation

Scalable architecture for future features (auth, personalization, social features)

✨ Main Features

🔍 Search plans by city and country (accent-insensitive)

⭐ Browse most voted travel plans

📝 Create, edit and delete travel plans

🗂️ Activities grouped by category

food

culture

nature

experience

nightlife

👍 Voting system to highlight popular plans

📱 Responsive and mobile-friendly UI

🧩 Data Model (Firebase Realtime Database)

Plans are stored with a scalable and flexible structure:

plans: {
  planId: {
    title: "Foodie weekend in Bilbao",
    country: "Spain",
    city: "Bilbao",
    coverImg: "...",
    description: "...",
    votes: 25,
    activities: {
      a1: {
        type: "food",
        title: "Casco Viejo",
        description: "Pintxos route",
        img: "..."
      },
      a2: {
        type: "culture",
        title: "Guggenheim Museum",
        description: "Modern art and architecture"
      }
    },
    createdAt: 1700000000000
  }
}


This structure allows:

Multiple plans per city

Unlimited activities per plan

Easy filtering, voting and future user-based features

🛠️ Tech Stack
Frontend

React (functional components & hooks)

React Router (client-side routing)

Bootstrap (responsive UI)

Axios (HTTP requests)

Vite (development & build tool)

Backend

Firebase Realtime Database

RESTful API interaction

🧑‍💻 Team & Roles
👨‍🎨 Anderson Valencia

Frontend Developer

UI/UX design and implementation

React component architecture

Routing, search logic and filtering

Voting system and plan management

Responsive design and accessibility

🔗 GitHub: https://github.com/avalenciacs

🔗 LinkedIn: https://www.linkedin.com/in/anderson-valencia-885ba1143

🧑‍💻 Francisco Sorkin

Backend & Data Developer

Firebase Realtime Database design

Data modeling and normalization

Seed data and plan structure

Backend logic and scalability planning

🔗 GitHub: https://github.com/fransorkin

🔗 LinkedIn: https://www.linkedin.com/in/francisco-sorkin

🧪 Project Status

Planora is a bootcamp project developed as part of a Full Stack Web Development program, showcasing:

Real-world frontend & backend collaboration

Clean architecture and scalable thinking

Practical feature-driven development

🔮 Future Improvements

🔐 User authentication (Google / Email)

👤 User-based voting (1 vote per user)

💬 Comments and reviews per plan

❤️ Favorite plans

📍 Map-based exploration

🌍 Multi-language support

🧑‍🏫 How to Run Locally
git clone https://github.com/avalenciacs/ab-project2-planora
cd planora
npm install
npm run dev

📄 License

This project is for educational and portfolio purposes.