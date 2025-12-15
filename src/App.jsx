import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlanDetails from "./pages/PlanDetails";
import EditPlan from "./pages/EditPlan";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans/create" element={<CreatePlan />} />
        <Route path="/plans/:planId" element={<PlanDetails />} />
        <Route path="/plans/edit/:planId" element={<EditPlan />} />
      </Routes>
    </>
  );
}

export default App;
