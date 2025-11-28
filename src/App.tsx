import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StoryDetail from "./pages/StoryDetail";

function App() {
  return (
    <>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-paper">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/story/:id" element={<StoryDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
