import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlanDetails from "./pages/PlanDetails";
import EditPlan from "./pages/EditPlan";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePlan />} />
        <Route path="/plans/:id" element={<PlanDetails />} />
        <Route path="/plans/:id/edit" element={<EditPlan />} />
      </Routes>
    </>
  );
}

export default App;