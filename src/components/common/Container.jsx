import { motion as m } from 'framer-motion';

const Container = (props) => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`custom-container ${props.className ? props.className : ''} ${props.maxW ? 'max-w-[${props.maxW}]' : ''}`}>
      {props.children}
    </m.div>
  );
};

export default Container;
