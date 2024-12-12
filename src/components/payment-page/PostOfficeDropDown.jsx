import { useState, useEffect } from 'react';

const PostOfficeDropdown = ({ selectedCity, selectedDeliveryType, onSelectPostOffice }) => {
  const [postOffices, setPostOffices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCity && selectedDeliveryType) {
          const response = await fetch(
            `https://api.novapost.pl/v1_0/divisions?cityRef=${selectedCity}&serviceType=${selectedDeliveryType}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Api-Key': 'cefb4e266c9494d64124cfccfd03c109',
              },
            },
          );

          if (!response.ok) {
            console.error('Error fetching post offices:', response.statusText);
            setPostOffices([]);

            return;
          }

          const data = await response.json();

          setPostOffices(data.data);
        }
      } catch (error) {
        console.error('Error fetching post offices:', error);
        setPostOffices([]);
      }
    };

    fetchData();
  }, [selectedCity, selectedDeliveryType]);

  return (
    <select onChange={(e) => onSelectPostOffice(e.target.value)}>
      <option value="">Оберіть відділення</option>
      {postOffices.map((office) => (
        <option key={office.Ref} value={office.Ref}>
          {office.Description} - {office.Address}
        </option>
      ))}
    </select>
  );
};

export default PostOfficeDropdown;
