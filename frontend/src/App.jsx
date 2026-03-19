import { Routes, Route } from "react-router-dom";
import Home from "./App/Pages/Home";
import FormPages from "./App/Pages/FormPages";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form/:id" element={<FormPages />} />
    </Routes>
 
    <Toaster position="top-right" richColors />
    </>
  );
}

export default App;