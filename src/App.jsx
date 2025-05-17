import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { Story } from "./page/story";
import { Navigation } from "./components/navigation/navigation";
import { MenuContextProvider } from "./contexts/menu-context";
import Gallery from "./components/gallery";

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Story />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
