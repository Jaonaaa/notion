import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { MenuContextProvider } from "./contexts/menu-context";
import { AddFunStory } from "./page/add-fun-story";
import { imagesDefaultGallery } from "./components/history-gallery";
import { lazy } from "react";
import AddSimpleMemory from "./components/stories/add-simple-memory";

const Gallery = lazy(() => import("./components/gallery"));
const GalleryCanvas = lazy(() => import("./components/history-gallery"));

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        {/* <Navigation /> */}
        <Routes>
          {/* <Route path="/" element={<Story />} /> */}
          <Route path="/" element={<Gallery />} />
          <Route path="/add-fun-story" element={<AddFunStory />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery-history" element={<GalleryCanvas images={imagesDefaultGallery} />} />
          <Route path="/gallery-history/frames/:id" element={<GalleryCanvas images={imagesDefaultGallery} />} />
          <Route path="/add-simple-story" element={<AddSimpleMemory />} />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
