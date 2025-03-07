import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaFilm } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Kullanıcı adı gerekli!";
    if (!formData.email.trim()) newErrors.email = "E-posta adresi gerekli!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Geçerli bir e-posta girin!";
    if (formData.password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalı!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Kayıt Formu Gönderildi:", formData);
    alert("Başarıyla kaydoldunuz!");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/cinema-bg.jpg')",
      }}>
      {/* Karartma Efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

      {/* Kayıt Formu */}
      <div className="relative bg-black/80 backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-2xl w-80 md:w-96 text-white">
        <div className="flex justify-center mb-4">
          <FaFilm className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">Kaydol</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kullanıcı Adı */}
          <div>
            <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                value={formData.username}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* E-Posta */}
          <div>
            <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="E-Posta"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Şifre */}
          <div>
            <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Kayıt Ol Butonu */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Kaydol
          </button>
        </form>

        {/* Zaten hesabınız var mı? */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Zaten bir hesabınız var mı?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
