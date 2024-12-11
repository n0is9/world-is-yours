import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SideLinks = ({ onLinkClick }) => {
  const [activeTab, setActiveTab] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get('component');

  const tabs = {
    payment: 'Оплата',
    delivery: 'Доставка',
    return: 'Повернення та обмін',
  };

  // Handle activeTab state on page load
  useEffect(() => {
    handleTabChange(searchParams);
  }, []);

  // Sends a string for activeTab state and InfoHelp component
  const handleTabChange = (tabName) => {
    onLinkClick(tabName);
    setActiveTab(tabName);
  };

  const getTabClasses = (tabName) => {
    return `whitespace-nowrap text-gray text-18px cursor-pointer duration-200 ${activeTab === tabName ? '!text-black' : ''}`;
  };

  return (
    <div
      className='flex flex-col gap-6 border-r border-slate-400
    pr-[70px] mr-[70px] flex-[0_0_17rem]'
    >
      {tabs &&
        Object.entries(tabs).map(([tabName, tabLabel]) => (
          <p
            key={tabName}
            className={getTabClasses(tabName)}
            onClick={() => handleTabChange(tabName)}
          >
            {tabLabel}
          </p>
        ))}
    </div>
  );
};

export default SideLinks;
