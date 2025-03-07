import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaEdit, FaPaperPlane } from "react-icons/fa";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Genel Soru",
    message: "Film önerileri hakkında bilgi almak istiyorum.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    let defaultMessage = "";

    if (selectedSubject === "Genel Soru") {
      defaultMessage = "Film önerileri hakkında bilgi almak istiyorum.\nPlatform hakkında genel bilgi almak istiyorum.\nÜyelik ve giriş işlemleri hakkında bilgi almak istiyorum.";
    }

    setFormData({ ...formData, subject: selectedSubject, message: defaultMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gönderilen Form:", formData);
    alert("Mesajınız başarıyla gönderildi!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "Genel Soru",
      message: "Film önerileri hakkında bilgi almak istiyorum.",
    });
  };

  return (
    <section className="container mx-auto px-6 py-12 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center border-b border-gray-700 pb-2 flex justify-center items-center gap-3">
        <FaEnvelope className="text-red-500 text-3xl" /> Bize Ulaşın
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full md:w-1/3 text-center">
          <h3 className="text-xl font-semibold mb-4">İletişim Bilgileri</h3>
          <p className="flex items-center gap-2 text-gray-300 mb-2">
            <FaPhoneAlt className="text-red-500" /> +90 555 555 55 55
          </p>
          <p className="flex items-center gap-2 text-gray-300 mb-2">
            <FaEnvelope className="text-red-500" /> info@filmizlenmeli.com
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt className="text-red-500" /> İstanbul, Türkiye
          </p>

          <div className="mt-6 flex justify-center space-x-4">
            <FiFacebook className="text-gray-400 hover:text-blue-500 text-2xl cursor-pointer" />
            <FiTwitter className="text-gray-400 hover:text-blue-400 text-2xl cursor-pointer" />
            <FiInstagram className="text-gray-400 hover:text-pink-500 text-2xl cursor-pointer" />
            <FiLinkedin className="text-gray-400 hover:text-blue-700 text-2xl cursor-pointer" />
          </div>
        </div>

        <div className="bg-black/80 p-8 rounded-lg shadow-xl w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-gray-400 mb-1">Ad</label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                  <FaUser className="text-gray-400 ml-3" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-400 mb-1">Soyad</label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                  <FaUser className="text-gray-400 ml-3" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">E-Posta</label>
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                <FaEnvelope className="text-gray-400 ml-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Telefon</label>
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md">
                <FaPhoneAlt className="text-gray-400 ml-3" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Konu</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleSubjectChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
              >
                <option>Genel Soru</option>
                <option>Öneri</option>
                <option>Şikayet</option>
                <option>İş Birliği</option>
                <option>Teknik Destek</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Mesajınız</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition text-lg flex justify-center items-center gap-2"
            >
              <FaPaperPlane /> Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
