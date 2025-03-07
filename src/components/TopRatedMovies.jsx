import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "20b375845441af84dc17bc3eb27c7b45";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/no-image.jpg";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
          params: { api_key: API_KEY, language: "tr-TR" },
        });

        setMovies(response.data.results);
      } catch (err) {
        console.error("❌ En beğenilen filmler alınırken hata oluştu:", err);
        setError("Filmler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
        ⭐ En Beğenilen Filmler
      </h2>

      {loading ? (
        <p className="text-white text-center text-lg">Filmler yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="relative bg-transparent p-4 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img
                  src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_IMAGE}
                  alt={movie.title}
                  className="w-full h-[320px] object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                />

                {/* ⭐ Puan  */}
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-lg ${
                    movie.vote_average >= 7 ? "bg-green-500" : movie.vote_average >= 5 ? "bg-yellow-500" : "bg-red-500"
                  } text-white`}
                >
                  {movie.vote_average.toFixed(1)}
                </span>

                <div className="mt-4 text-center bg-black/50 backdrop-blur-md p-3 rounded-lg">
                  <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopRatedMovies;
