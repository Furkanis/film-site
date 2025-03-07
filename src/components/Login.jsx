import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaFilm } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // 🚨 Hata mesajları için state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Önce hata mesajını temizle

    if (formData.username.trim() === "" || formData.password.trim() === "") {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    console.log("Giriş Formu Gönderildi:", formData);
    setFormData({ username: "", password: "" });

    
    setTimeout(() => {
      alert("Başarıyla giriş yaptınız! 🎉");
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/images/cinema-bg.jpg')" }}
    >
      {/* Karanlık Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

      <div className="relative bg-black/80 backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md text-white">
        
        {/* 🎬 Film İkonu ve Başlık */}
        <div className="flex justify-center mb-6">
          <FaFilm className="text-red-500 text-5xl animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Giriş Yap</h2>

        {/* 🚨 Hata Mesajı */}
        {error && (
          <p className="text-red-400 text-center text-sm font-semibold mb-4">{error}</p>
        )}

        {/* Giriş Formu */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kullanıcı Adı */}
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3 shadow-md">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Şifre */}
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3 shadow-md">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Şifre (En az 6 karakter)"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Giriş Yap Butonu */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg transform hover:scale-105 active:scale-95"
          >
            Giriş Yap
          </button>
        </form>

        {/* Hesabın yok mu? */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-red-500 hover:underline font-semibold">
            Kaydol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
