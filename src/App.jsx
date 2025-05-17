import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { MenuContextProvider } from "./contexts/menu-context";
import { AddFunStory } from "./page/add-fun-story";

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        {/* <Navigation /> */}
        <Routes>
          {/* <Route path="/" element={<Story />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/add-fun-story" element={<AddFunStory />} />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
