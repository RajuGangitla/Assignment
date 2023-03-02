import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";
import Spinnerr from "./components/Spinnerr";
import Home from "./pages/Home";
import EditPage from "./pages/EditPage";
import './App.css'

function App() {
  const { isLoading } = useAppContext();
  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinnerr />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-patient/:id" element={<EditPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
