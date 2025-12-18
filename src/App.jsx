import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlanDetails from "./pages/PlanDetails";
import EditPlan from "./pages/EditPlan";        // ✅ IMPORTANTE
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [search, setSearch] = useState("");
  const location = useLocation();

  // ❌ NO navbar en landing
  const showNavBar = location.pathname !== "/";

  return (
    <>
      {showNavBar && (
        <NavBar
          search={search}
          setSearch={setSearch}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/home"
          element={<Home search={search} />}
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePlan />
            </PrivateRoute>
          }
        />

        {/* DETAILS */}
        <Route path="/plans/:id" element={<PlanDetails />} />

        {/* ✅ EDIT (ESTA ERA LA QUE FALTABA) */}
        <Route
          path="/plans/:id/edit"
          element={
            <PrivateRoute>
              <EditPlan />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
