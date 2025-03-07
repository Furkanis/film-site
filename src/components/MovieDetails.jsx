import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "20b375845441af84dc17bc3eb27c7b45";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const FALLBACK_IMAGE = "/images/no-image.jpg";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, language: "tr-TR" },
        });

        const videosResponse = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        });

        const trailers = videosResponse.data.results.filter(video => video.type === "Trailer");
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }

        setMovie(response.data);
      } catch (error) {
        console.error("❌ Film detayları çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-white text-center text-lg">Yükleniyor...</p>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${movie?.backdrop_path ? BACKDROP_BASE_URL + movie.backdrop_path : "/images/background.jpeg"})`,
      }}
    >
      {/* Arkaplan karartma efekti */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* İçerik */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        
        {/* Film Posteri */}
        <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105">
          <img
            src={movie?.poster_path ? IMAGE_BASE_URL + movie.poster_path : FALLBACK_IMAGE}
            alt={movie?.title}
            className="w-full rounded-lg"
          />
        </div>

        {/* Film Bilgileri */}
        <div className="text-white w-full lg:w-3/5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{movie?.title}</h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            {movie?.overview || "Bu film için açıklama bulunmamaktadır."}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-base sm:text-lg">
            {/* Çıkış Tarihi */}
            <p className="flex items-center">
              📅 <span className="ml-2 font-semibold">{movie?.release_date || "Bilinmiyor"}</span>
            </p>

            {/* Puan */}
            <p className="flex items-center">
              ⭐ <span className="ml-2 font-semibold">{movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </p>

            {/* Türler */}
            <p className="flex items-center">
              🎭 <span className="ml-2 font-semibold">{movie?.genres?.length > 0 ? movie.genres.map(g => g.name).join(", ") : "Tür bilgisi yok"}</span>
            </p>
          </div>

          {/* Fragman Butonu */}
          {trailerKey && (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 text-center"
            >
              🎬 Fragmanı İzle
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
