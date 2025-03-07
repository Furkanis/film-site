import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";

const API_KEY = "20b375845441af84dc17bc3eb27c7b45";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/no-image.jpg";

const CategoryMovies = () => {
  const { category } = useParams(); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const genreMap = {
          "aile": 10751, "aksiyon": 28, "animasyon": 16, "belgesel": 99,
          "bilim kurgu": 878, "dram": 18, "fantastik": 14, "gerilim": 53,
          "komedi": 35, "korku": 27, "macera": 12, "müzikal": 10402,
          "romantik": 10749, "suç": 80, "tarih": 36
        };

        const genreId = genreMap[category.toLowerCase()]; 

        if (!genreId) {
          setError("Bu kategoriye ait film bulunamadı.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: { api_key: API_KEY, language: "tr-TR", with_genres: genreId },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Kategori filmleri çekilirken hata oluştu:", error);
        setError("Filmler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchMoviesByCategory();
    }
  }, [category]); 
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
        🎬 {decodeURIComponent(category)} Filmleri
      </h2>

      {loading ? (
        <p className="text-white text-center text-lg">Filmler yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}> 
                <div className="relative bg-transparent p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_IMAGE}
                      alt={movie.title}
                      className="w-full h-[320px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <span
                      className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-lg ${
                        movie.vote_average >= 7 ? "bg-green-500" : movie.vote_average >= 5 ? "bg-yellow-500" : "bg-red-500"
                      } text-white`}
                    >
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-4 text-center bg-black/50 backdrop-blur-md p-3 rounded-lg">
                    <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-5">Bu kategoriye ait film bulunamadı.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default CategoryMovies;
