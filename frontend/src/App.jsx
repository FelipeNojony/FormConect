import { Routes, Route } from "react-router-dom";
import Home from "./App/Pages/Home";
import FormPage from "./App/Pages/FormPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form/:id" element={<FormPage />} />
    </Routes>
  );
}

export default App;