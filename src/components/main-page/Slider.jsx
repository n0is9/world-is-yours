import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideCardLayout from './SlideCardLayout.jsx';
import bg1 from '../../assets/img/slider-first.png';
import bg2 from '../../assets/img/slider-second.png';
import bg3 from '../../assets/img/slider-third.png';

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider className='mx-[3%] my-[4%]' {...settings}>
      <SlideCardLayout
        backGround={bg1}
        plateText='Сезонний роспродаж'
        textPosition='left'
        title='Зимовий розпродаж -30%'
        textColor='#ffffff'
        isSectionFav={true}
      >
        Заощаджуйте на обраному зимовому одязі, <br /> спорядженні та
        аксесуарах. <br /> До 20.02.2025
      </SlideCardLayout>
      <SlideCardLayout
        backGround={bg2}
        plateText='Безкоштовна доставка'
        textPosition='center'
        title='Безкоштовна доставка для замовлень від 2000 грн'
        textColor='#ffffff'
      >
        Подорожуйте з комфортом, не переймайтеся вартістю доставки!
      </SlideCardLayout>

      <SlideCardLayout
        backGround={bg3}
        plateText='Знижки до -15%'
        textPosition='left'
        title='Знижка на все для намету!'
        textColor='#202020'
        isSectionFav={true}
      >
        Час вирушити у дику природу! Купуйте товари для кемпінгу та отримайте
        знижку 15%. Зробіть своє пригодницьке відкриття комфортним та
        незабутнім.
      </SlideCardLayout>
    </Slider>
  );
};

export default SimpleSlider;
