import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "20b375845441af84dc17bc3eb27c7b45";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/no-image.jpg";

const NewMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
          params: {
            api_key: API_KEY,
            language: "tr-TR",
            page,
          },
        });

        setMovies(response.data.results || []);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("❌ Filmler çekilirken hata oluştu:", error);
        setError("Filmler yüklenirken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <section className="container mx-auto px-6 py-10 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
        🎬 Yeni Filmler
      </h2>

      {loading ? (
        <p className="text-white text-center text-lg animate-pulse">🔄 Filmler yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="relative bg-transparent p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_IMAGE}
                      alt={movie.title}
                      className="w-full h-[260px] sm:h-[280px] md:h-[320px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <span
                      className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-lg ${
                        movie.vote_average >= 7 ? "bg-green-500" : movie.vote_average >= 5 ? "bg-yellow-500" : "bg-red-500"
                      } text-white`}
                    >
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <div className="mt-4 text-center bg-black/50 backdrop-blur-md p-3 rounded-lg">
                    <h3 className="text-base md:text-lg font-semibold text-white">{movie.title}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-5">📭 Şu anda gösterilecek film bulunamadı.</p>
            )}
          </div>

          {/* Sayfalama Butonları */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className={`px-4 py-2 text-white font-semibold rounded-lg transition ${
                  page === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                ⬅ Önceki
              </button>

              <span className="text-white font-semibold text-lg">
                {page} / {totalPages}
              </span>

              <button
                className={`px-4 py-2 text-white font-semibold rounded-lg transition ${
                  page >= totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Sonraki ➡
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewMovies;
