const categories = [
    "Aile Filmleri", "Animasyon Filmleri", "Bilim Kurgu Filmleri", "Çizgi Filmler",
    "Fantastik Filmler", "Gizem Filmleri", "Komedi Filmleri", "Macera Filmleri",
    "Polisiye Filmleri", "Romantik Filmler", "Suç Filmleri", "Western Filmler",
    "Aksiyon Filmleri", "Belgeseller", "Blu Ray Filmler", "Dram Filmleri",
    "Gerilim Filmleri", "Hint Filmleri", "Korku Filmleri", "Müzikal Filmler",
    "Psikolojik Filmler", "Savaş Filmleri", "Tarih Filmleri", "Yerli Filmler"
  ];
  
  const FilmCategories = () => {
    return (
      <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-72">
        <h2 className="text-white text-lg font-bold flex items-center gap-2 mb-4">
          🎥 Film Türleri
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-gray-300 hover:text-white text-sm transition duration-300"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default FilmCategories;
  