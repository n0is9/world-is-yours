import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CityDropdown = ({ onSelectCity, selectedCountry }) => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Фетчимо список міст, тільки якщо вибрана країна
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const response = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/cities',
            { country: selectedCountry },
          );
          const citiesData = response.data.data;

          setCities(citiesData);
          setFilteredCities(citiesData);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedCountry]);

  // Фільтрація міст на основі введеного тексту
  const handleSearchChange = (e) => {
    const query = e.target.value;

    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));

      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    onSelectCity(city);
    setIsOpen(false);
    setSearchQuery(city); // заповнюємо інпут обраним містом
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label htmlFor="city" className="mb-1 ml-1 text-textLight font-medium font-raleway text-sm">
        Місто
      </label>
      <div className="relative max-w-md">
        {/* Поле для введення тексту */}
        <input
          type="text"
          placeholder={user.address.city ? user.address.city : 'Оберіть місто'}
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={toggleSelect}
          className="font-light border rounded-xl w-full p-3 border-black mb-2"
          disabled={!selectedCountry} // Блокуємо, якщо країна не вибрана
        />

        {/* Випадаючий список */}
        {isOpen && (
          <ul
            className="absolute z-50 bg-white w-full max-h-48 overflow-y-auto
          border rounded-xl shadow-md"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <li
                  key={`${city}-${index}`}
                  onClick={() => handleCityChange(city)}
                  className={`p-2 cursor-pointer hover:bg-black hover:text-white ${
                    selectedCity === city ? 'bg-gray-200' : ''
                  }`}
                >
                  {city}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Нічого не знайдено</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default CityDropdown;
