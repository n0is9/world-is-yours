import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ArrowDown from '../../assets/icons/arrow-up.svg';

const CountryDropdown = ({ onSelectCountry }) => {
  const user = useSelector((state) => state.user.user);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Фетчимо країни при завантаженні компонента
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://countriesnow.space/api/v0.1/countries',
        );
        const countriesData = response.data.data.map(
          (country) => country.country,
        );
        setCountries(countriesData.sort());
        setFilteredCountries(countriesData.sort());
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Фільтрація країн на основі введеного тексту
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    onSelectCountry(country);
    setIsOpen(false);
    setSearchQuery(country); // заповнюємо інпут обраною країною
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label
        htmlFor='country'
        className='mb-1 ml-1 text-textLight font-medium font-raleway text-sm'
      >
        Країна
      </label>
      <div className='relative max-w-md'>
        {/* Поле для введення тексту */}
        <input
          type='text'
          placeholder={
            user.address.country ? user.address.country : 'Оберіть країну'
          }
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={toggleSelect}
          className='font-light border rounded-xl w-full p-3 border-black mb-2'
        />

        {/* Випадаючий список */}
        {isOpen && (
          <ul className='absolute z-50 bg-white w-full max-h-48 overflow-y-auto border rounded-xl shadow-md'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={`${country}-${index}`}
                  onClick={() => handleCountryChange(country)}
                  className={`p-2 cursor-pointer hover:bg-black hover:text-white ${
                    selectedCountry === country ? 'bg-gray-200' : ''
                  }`}
                >
                  {country}
                </li>
              ))
            ) : (
              <li className='p-2 text-gray-500'>Нічого не знайдено</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default CountryDropdown;
