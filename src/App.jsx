import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
