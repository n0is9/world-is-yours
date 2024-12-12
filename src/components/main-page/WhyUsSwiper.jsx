import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import whyUsImage1 from '@assets/img/why-us-image-1.png';
import whyUsImage2 from '@assets/img/why-us-image-2.png';
import whyUsImage3 from '@assets/img/why-us-image-3.png';
import whyUsImage4 from '@assets/img/why-us-image-4.png';
import whyUsImage5 from '@assets/img/why-us-image-5.png';

const whyUsItems = [
  {
    image: whyUsImage1,
    tittle: 'Якість і надійність',
    subTittle:
      'Ми продаємо тільки високоякісні товари від надійних виробників. Ви можете бути впевнені,' +
      'що кожен товар, який ви купуєте у нас, буде служити вам довго.',
    id: 'wu1',
  },
  {
    image: whyUsImage2,
    tittle: 'Зручний пошук і фільтрація',
    subTittle:
      'Наш сайт має потужну систему пошуку та фільтрації, що допомагає знайти потрібний' +
      'товар швидко та легко. Ви можете відфільтрувати результати за ціною, розміром,' +
      'типом товару тощо.',
    id: 'wu2',
  },
  {
    image: whyUsImage3,
    tittle: 'Конкурентоспроможні ціни',
    subTittle:
      'Ми пропонуємо доступні ціни на всі товари. Ваш бюджет залишиться цілим,' +
      'навіть якщо ви шукаєте високоякісні продукти.',
    id: 'wu3',
  },
  {
    image: whyUsImage4,
    tittle: 'Швидка доставка',
    subTittle:
      'Ми пропонуємо швидку та надійну доставку, щоб ви могли отримати свої' +
      'товари вчасно перед подорожжю.',
    id: 'wu4',
  },
  {
    image: whyUsImage5,
    tittle: 'Працюємо по всьому світу',
    subTittle:
      'Наш сайт пропонує свої послуги та доставку товарів для подорожей на автобудинку по всьому' +
      'світу. Незалежно від того, де ви знаходитесь, ми завжди готові забезпечити' +
      'вас високоякісними та зручними рішеннями для вашої подорожі.',
    id: 'wu5',
  },
];

function WhyUsSwiper() {
  return (
    <Swiper
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      spaceBetween={50}
      pagination={false}
      loop={true}
      modules={[Pagination, Scrollbar, Autoplay]}
    >
      {whyUsItems.map((w, index) => (
        <SwiperSlide key={w.id}>
          <div className="mx-10 grid grid-cols-2 gap-x-10">
            <div className=" border-2 border-custom-black/30 rounded-3xl px-16">
              <p className="my-8 text-lg">
                {index + 1}/{whyUsItems.length}
              </p>
              <h1 className="mb-5 text-2xl font-semibold">{w.tittle}</h1>
              <p className="text-lg">{w.subTittle}</p>
            </div>
            <img className="rounded-3xl" src={w.image} alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default WhyUsSwiper;

{
  /*<div className='mx-10 flex h-screen'>
                        <div
                            className='p-24 border-2 border-custom-black/30 rounded-3xl w-1/2 h-1/2 mr-5 flex flex-col justify-center'>
                            <div className='mb-14 text-lg'>{index + 1}/{whyUsItems.length}</div>
                            <h1 className='mb-5 text-2xl font-semibold'>{w.tittle}</h1>
                            <p className='text-lg'>{w.subTittle}</p>
                        </div>
                        <div className='w-1/2'>
                            <img className='rounded-3xl h-1/2 w-auto' src={w.image} alt=""/>
                        </div>
                    </div>*/
}
