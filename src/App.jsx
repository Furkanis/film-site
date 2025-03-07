import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewMovies from "./components/NewMovies";
import MovieDetails from "./components/MovieDetails";
import TopRatedMovies from "./components/TopRatedMovies";
import CategoryMovies from "./components/CategoryMovies";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpeg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <Navbar />

        <div className="relative z-10 pt-24">
          <Routes>
            <Route path="/" element={<NewMovies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/top-rated" element={<TopRatedMovies />} />
            <Route path="/category/:category" element={<CategoryMovies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;