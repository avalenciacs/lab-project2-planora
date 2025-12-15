import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlanDetails from "./pages/PlanDetails";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePlan />} />
        <Route path="/plans/:id" element={<PlanDetails />} />
      </Routes>
    </>
  );
}

export default App;
