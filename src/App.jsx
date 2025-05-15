import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { Navigation } from "./components/navigation/navigation";
import { MenuContextProvider } from "./contexts/menu-context";

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
