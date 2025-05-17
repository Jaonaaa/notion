import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { MenuContextProvider } from "./contexts/menu-context";
import { AddFunStory } from "./page/add-fun-story";
import { imagesDefaultGallery } from "./components/history-gallery";
import { lazy } from "react";

const Gallery = lazy(() => import("./components/gallery"));
const GalleryCanvas = lazy(() => import("./components/history-gallery"));

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        {/* <Navigation /> */}
        <Routes>
          {/* <Route path="/" element={<Story />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/add-fun-story" element={<AddFunStory />} />
          <Route path="/" element={<Gallery />} />
          <Route path="/story" element={<Story />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/gallery-history"
            element={<GalleryCanvas images={imagesDefaultGallery} />}
          />
          <Route
            path="/gallery-history/frames/:id"
            element={<GalleryCanvas images={imagesDefaultGallery} />}
          />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
