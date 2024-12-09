import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './scrolling.css';

import { motion as m } from 'framer-motion';

function ScrollingText() {
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const splitTypes = document.querySelectorAll(".reveal-type");

  //   splitTypes.forEach((char, i) => {
  //     const bg = char.dataset.bgColor;
  //     const fg = char.dataset.fgColor;

  //     const words = char.innerText.split(" ");
  //     char.innerHTML = words.map((word) => `<span className="word">${word}</span>`).join(" ");

  //     const wordSpans = char.querySelectorAll(".word");

  //     gsap.fromTo(
  //       wordSpans,
  //       {
  //         color: bg,
  //       },
  //       {
  //         color: fg,
  //         duration: 0.5,
  //         stagger: 1,
  //         scrollTrigger: {
  //           trigger: char,
  //           start: "top 70%",
  //           end: "top 30%",
  //           scrub: true,
  //           markers: false,
  //           toggleActions: "play play reverse reverse",
  //         },
  //       }
  //     );
  //   });

  // }, []);

  return (
    <m.div className='changing-wrap' initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
      <p className='reveal-type font-raleway font-600' data-bg-color='gray' data-fg-color='#000'>
        Забудьте про незручності в дорозі! <br />
        Тут є великий вибір товарів для автобудинку, які роблять кожну подорож комфортною та приємною.
      </p>
    </m.div>
  );
}

export default ScrollingText;
