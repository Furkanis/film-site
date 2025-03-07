import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilm, FaBars, FaTimes, FaEnvelope } from "react-icons/fa";
import Search from "./Search"; 
const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Aile",
    "Aksiyon",
    "Animasyon",
    "Belgesel",
    "Bilim Kurgu",
    "Dram",
    "Fantastik",
    "Gerilim",
    "Komedi",
    "Korku",
    "Macera",
    "Müzikal",
    "Romantik",
    "Suç",
    "Tarih",
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/90 ${
        scrolling ? "backdrop-blur-md border-b border-gray-700" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🎬 LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg lg:text-2xl"
        >
          <FaFilm className="text-red-500 text-2xl lg:text-3xl" />
          <span className="tracking-wider">Film İzlenmeli</span>
        </Link>

        {/* 🔽 Menü (1024px üzeri) */}
        <ul className="hidden lg:flex items-center space-x-8 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-gray-400 transition">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link to="/top-rated" className="hover:text-gray-400 transition">
              ⭐ En Beğenilen Filmler
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-gray-400 transition"
            >
              Film Türleri ▼
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-black/90 text-white shadow-lg rounded-md border border-gray-700 z-50">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${encodeURIComponent(
                      category.toLowerCase()
                    )}`}
                    className="block px-4 py-2 hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {category} Filmleri
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:text-gray-400 transition"
            >
              <FaEnvelope className="text-red-500" /> İletişim
            </Link>
          </li>
        </ul>

        {/* 🔎 Arama ve Giriş Butonları (1024px üzeri) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Search /> 
          <Link
            to="/login"
            className="bg-gray-800 text-white px-3 py-2 rounded-md font-semibold hover:bg-gray-700 transition text-sm"
          >
            Giriş Yap
          </Link>
          <Link
            to="/register"
            className="bg-red-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-red-700 transition text-sm"
          >
            Kaydol
          </Link>
        </div>

        {/* 🍔 1023px ve Altı - Mobil Menü Butonu */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Mobil Menü (1023px ve altı) */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-black/90 p-4 flex flex-col space-y-4">
        
          <div className="relative w-full flex items-center">
            <Search className="w-full" />
          </div>

          <Link
            to="/"
            className="text-white text-lg whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link
            to="/top-rated"
            className="text-white text-lg whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            ⭐ En Beğenilen Filmler
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg flex items-center gap-2 whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            <FaEnvelope className="text-red-500" /> İletişim
          </Link>

          {/* 🔽 Film Türleri - Mobil için açılır kapanır */}
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-lg flex justify-between w-full whitespace-nowrap"
            >
              Film Türleri ▼
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 w-full bg-black/90 text-white shadow-lg rounded-md border border-gray-700 z-50 md:w-48">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${encodeURIComponent(
                      category.toLowerCase()
                    )}`}
                    className="block px-4 py-2 hover:bg-gray-800 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {category} Filmleri
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 📌 Mobil Giriş ve Kayıt Butonları */}
          <Link
            to="/login"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition text-center"
          >
            Giriş Yap
          </Link>
          <Link
            to="/register"
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition text-center"
          >
            Kaydol
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
