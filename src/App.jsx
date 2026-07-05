import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import HotelDetailPage from "./pages/HotelDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
