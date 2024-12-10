import { useState, useEffect } from 'react';

import { $api } from '@api/api';

import Card from '@common/Card';
import Container from '@common/Container';

import useTranslation from '@locale/locales';

const NewArrivalsCardList = () => {
  const t = useTranslation();

  const [arrivals, setArrivals] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState('true');

  const fetchData = async (page_size, page) => {
    try {
      const response = await $api.get(
        `/api/products/?page_size=${page_size}&page=${page}`,
      );

      // #devnote add favorite fiter
      setNext(response.data.next);
      setArrivals((currentArrivals) => [
        ...currentArrivals,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page === 1 ? 7 : 8, page);
  }, [page]);

  const loadMoreCards = () => {
    setPage(page + 1);
  };

  return (
    <Container className='justify-center text-grayLight' id='sectionFav'>
      <h1
        className='flex items-center justify-center mt-20
      mb-10 font-raleway text-custom-black text-30px'
      >
        Новинки
      </h1>
      <div
        className='grid grid-flow-row-dense gap-x-5 gap-y-[50px] grid-cols-1
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center'
      >
        {arrivals.map((item) => (
          <Card data={item} key={item.id} />
        ))}

        {next ? (
          <div
            className=' m-3 border-2 border-gray-light rounded-lg
            relative w-90 items-center cursor-pointer'
            onClick={loadMoreCards}
          >
            <div className='flex justify-center items-center px-1 h-full min-h-[27rem]'>
              <div className='w-80 max-w-200 flex justify-center items-center '>
                <div className='flex flex-col items-center justify-center '>
                  <p className="text-neutral-900 text-[25px] font-semibold font-['Raleway']">
                    {t('see more')}
                  </p>
                  <p className="text-neutral-900 text-[25px] font-semibold font-['Raleway']">
                    &gt;
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ' '
        )}
      </div>
    </Container>
  );
};

export default NewArrivalsCardList;
