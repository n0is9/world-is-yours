import { motion as m } from 'framer-motion';

const Payment = () => {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col gap-6">
        <p className="text-25px font-semibold">Доставка</p>
        <p className="text-18px font-semibold">Способи оплати:</p>
        <p className="text-16px font-normal">Оплата карткою:</p>
        <ol className="text-16px font-normal">
          <li className="pl-4">
            Кур&#39;єрська доставка: Ми пропонуємо послугу кур&#39;єрської доставки, яка дозволить
            вам отримати ваші товари безпосередньо до дверей вашого автодому. Кур&#39;єрська
            доставка зазвичай займає 1-2 дні, і вартість доставки становить 100 грн.
          </li>
          <br />
          <li className="pl-4">
            Самовивіз: Ви також можете забрати своє замовлення самостійно з нашого пункту
            самовивозу. Будь ласка, перед тим, як вирушити до нас, зв&#39;яжіться з нашим відділом
            обслуговування клієнтів та попередьте нас про ваш візит.
          </li>
        </ol>
        <p className="text-16px font-normal">
          {/* eslint-disable-next-line react/no-unknown-property */}
          <span clasName="underline-offset-2">Час доставки:</span> Ми намагаємося зробити доставку
          якнайшвидше. Зазвичай час доставки становить 1-3 дні, але цей термін може змінюватися в
          залежності від обсягу та доступності товарів. Ми попередньо повідомимо вас про очікуваний
          час доставки.
        </p>
        <p className="text-16px font-normal">
          {/* eslint-disable-next-line react/no-unknown-property */}
          <span clasName="underline-offset-2">Вартість доставки:</span> Вартість доставки може
          варіюватися залежно від обсягу та ваги замовлення, а також від вибраного способу доставки.
          При оформленні замовлення, ви зможете побачити точну вартість доставки та обрати
          відповідний варіант.
        </p>
      </div>
    </m.div>
  );
};

export default Payment;
