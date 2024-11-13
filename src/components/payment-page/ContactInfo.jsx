import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../redux/userSlice';
import { $api } from '../../api/api.js';
import Button from '../common/Button';
import { motion as m } from 'framer-motion';

const ContactInfo = ({ onDeliveryClick }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log('userState', user);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^\S.*$/, 'First name cannot start with a space')
      .required('First name is required'),
    last_name: Yup.string()
      .matches(/^\S.*$/, 'Last name cannot start with a space')
      .required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    date_of_birth: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD')
      .nullable(),
  });
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='flex justify-start gap-x-32   flex-row xxl:flex-row'>
        {/* profile setting */}
        <Formik
          initialValues={{
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            phone: user?.phone || '',
            email: user?.email || '',
            date_of_birth: user?.date_of_birth || '',
            user_id: user?.user_id || '',
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values) => {
            const userData = {
              ...user,
              ...values,
            };

            try {
              const response = await $api.patch(
                `/api/users/${userData.user_id}/`,
                {
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  phone: userData.phone,
                  email: userData.email,

                  ...(userData.date_of_birth
                    ? { date_of_birth: userData.date_of_birth }
                    : {}),
                },
              );

              //відповідь  приходить з date_of_birth в форматі "YYYY-MM-DDTHH:MM"
              console.log('response.data', response.data);
              dispatch(
                updateUser({
                  ...response.data,

                  date_of_birth: response.data.date_of_birth.split('T')[0], // зберігаємо тільки YYYY-MM-DD
                }),
                onDeliveryClick(),
              );
            } catch (error) {
              console.error('Error updating user:', error);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className='left-side w-full max-w-md mb-10'>
              <div className='flex gap-20 '>
                <div className='flex-1'>
                  <div className='flex gap-5'>
                    <div className='w-1/2'>
                      <label
                        htmlFor='first_name'
                        className='text-darkGrey font-raleway text-4 font-medium'
                      >
                        Ім’я
                        <Field
                          id='first_name'
                          name='first_name'
                          type='text'
                          placeholder="введіть своє ім'я"
                          className='flex mt-2 w-full p-3 items-center rounded-xl border border-black focus:border-blue-500 outline-none'
                        />
                      </label>
                      <ErrorMessage
                        name='first_name'
                        component='div'
                        className='text-red-500'
                      />
                    </div>
                    <div className='w-1/2'>
                      <label
                        htmlFor='last_name'
                        className='text-darkGrey font-raleway text-4 font-medium'
                      >
                        Прізвище
                        <Field
                          id='last_name'
                          name='last_name'
                          type='text'
                          placeholder='Введіть своє прізвище'
                          className='flex mt-2 w-full p-3 items-center rounded-xl border border-black focus:border-blue-500 outline-none'
                        />
                      </label>
                      <ErrorMessage
                        name='last_name'
                        component='div'
                        className='text-red-500'
                      />
                    </div>
                  </div>

                  <div className='flex flex-col mt-5 w-5/7'>
                    <label
                      htmlFor='phone'
                      className='w-5/7 text-darkGrey font-raleway text-4 font-medium'
                    >
                      Номер телефону
                    </label>
                    <div className='flex w-5/5 gap-5 mt-2'>
                      <Field
                        id='phone'
                        name='phone'
                        type='text'
                        className='w-[360px] px-4 py-3 bg-white rounded-[10px] border border-black text-zinc-500 text-base font-light placeholder-zinc-500'
                        placeholder='(+380) XX XXX XX XX'
                      />
                    </div>
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className='text-red-500'
                    />
                  </div>

                  <div className='flex gap-5 justify-between mt-5'>
                    <label
                      htmlFor='email'
                      className='w-5/7 text-darkGrey font-raleway text-4 font-medium'
                    >
                      Електронна пошта
                      <Field
                        id='email'
                        name='email'
                        type='text'
                        placeholder='Введіть адресу електронної пошти'
                        className='flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none'
                      />
                    </label>
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-red-500'
                    />
                  </div>

                  <div className='flex gap-5 justify-between mt-5'>
                    <label
                      htmlFor='date_of_birth'
                      className='w-3/7 text-darkGrey font-raleway text-4 font-medium'
                    >
                      Дата Народження
                      <Field
                        id='date_of_birth'
                        name='date_of_birth'
                        type='text'
                        placeholder='yyyy-mm-dd'
                        className='flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none'
                      />
                    </label>

                    <ErrorMessage
                      name='date_of_birth'
                      component='div'
                      className='text-red-500'
                    />
                  </div>
                  <Button
                    classNameBtn='w-full bg-gray-dark my-12 p-4 border rounded-xl leading-none font-bold text-20px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black'
                    nameBtn='submitForm'
                    valueBtn='submit'
                    type='submit'
                  >
                    Обрати спосіб доставки
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </m.div>
  );
};

export default ContactInfo;
