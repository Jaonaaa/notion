import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import { MenuContextProvider } from "./contexts/menu-context";
import { AddFunStory } from "./page/add-fun-story";
import { lazy } from "react";
import { Profile } from "./page/profile";
import { FunStoryPage } from "./page/fun-story-page";
import AddSimpleMemory from "./components/stories/add-simple-memory";
import Specialist from "./components/specialist";
import LoginPage from "./components/sign-in";
import { Archive } from "./page/archive";
import { Navigation } from "./components/navigation/navigation";
import { Gallery, GalleryPage } from "./components/photo/gallery/gallery";
import { AddComment } from "./page/add-coomment";
import SignupPage from "./components/sign-up";

// const Gallery = lazy(() => import("./components/gallery"));
const GalleryCanvas = lazy(() => import("./components/history-gallery"));

export function App() {
  return (
    <BrowserRouter>
      <MenuContextProvider>
        <Navigation />
        <Routes>
          {/* <Route path="/" element={<Story />} /> */}
          {/* <Route path="/" element={<Gallery />} /> */}
          <Route path="/" element={<GalleryPage />} />
          <Route path="/add-fun-story" element={<AddFunStory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fun-story/:id" element={<FunStoryPage />} />
          <Route path="/" element={<Gallery />} />
          {/* <Route path="/story" element={<Story />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/gallery-history" element={<GalleryCanvas />} />
          <Route path="/gallery-history/frames/:id" element={<GalleryCanvas />} />
          <Route path="/add-simple-story" element={<AddSimpleMemory />} />
          <Route path="/specialist" element={<Specialist />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/story/add-comment/:id" element={<AddComment />} />
        </Routes>
      </MenuContextProvider>
    </BrowserRouter>
  );
}
