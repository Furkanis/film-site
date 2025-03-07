import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import _ from "lodash"; 

const API_KEY = "20b375845441af84dc17bc3eb27c7b45";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const debounceRef = useRef(_.debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query: searchQuery, language: "tr-TR" },
      });
      setResults(response.data.results.slice(0, 10)); 
    } catch (error) {
      console.error("Arama hatası:", error);
    } finally {
      setLoading(false);
    }
  }, 500)); 

  useEffect(() => {
    debounceRef.current(query);
  }, [query]); 

  return (
    <div className="relative w-full lg:w-64">
      {/* 🔎 Arama Kutusu */}
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <input
          type="text"
          placeholder="Film Ara..."
          className="w-full bg-gray-800 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setQuery("")}
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer" />
      </form>

      {/* 🔽 Arama Sonuçları */}
      {query && (
        <div className="absolute top-full left-0 w-full bg-black/90 border border-gray-700 rounded-lg mt-2 max-h-64 overflow-y-auto">
          {loading ? (
            <p className="text-white text-center py-2">🔄 Yükleniyor...</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((movie) => (
                <li key={movie.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <Link to={`/movie/${movie.id}`} className="flex items-center p-2" onClick={() => setQuery("")}>
                    <img
                      src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/images/no-image.jpg"}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-md mr-3"
                    />
                    <span className="text-white">{movie.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-2">Sonuç bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
