import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateUser } from "../../redux/userSlice";
import { $api } from "../../api/api.js";

import Button from "../common/Button";
import eyeOff from "../../assets/icons/icon-Eye-off.svg";
import eyeOn from "../../assets/icons/icon-openEye.svg";

import { motion as m } from "framer-motion";

const Personal = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("user", user);
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^\S.*$/, "First name cannot start with a space")
      .nullable(),
    last_name: Yup.string()
      .matches(/^\S.*$/, "Last name cannot start with a space")
      .nullable(),
    phone: Yup.string().nullable(),
    email: Yup.string().email("Invalid email format").nullable(),
    date_of_birth: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
      .nullable(),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .nullable(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .nullable(),
  });
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-blue font-raleway lining-nums proportional-nums  font-semibold mb-10 text-2xl">
        Контактна інформація
      </h3>
      <div className="flex justify-start gap-x-32   flex-row xxl:flex-row">
        {/* profile setting */}
        <Formik
          initialValues={{
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            phone: user?.phone || "",
            email: user?.email || "",
            date_of_birth: user?.date_of_birth || "",
            user_id: user?.user_id || "",
            password: "",
            confirmPassword: "",
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
                  ...(userData.password && { password: userData.password }),
                }
              );

              //відповідь  приходить з date_of_birth в форматі "YYYY-MM-DDTHH:MM"

              dispatch(
                updateUser({
                  ...response.data,
                  date_of_birth: response.data.date_of_birth.split("T")[0], // зберігаємо тільки YYYY-MM-DD
                })
              );

              toast.info("Your data has been updated successfully", {
                position: "top-center",
                autoClose: 3000,
              });
            } catch (error) {
              console.error("Error updating user:", error);
              toast.info("Sorry, your data could not be updated", {
                position: "top-center",
                autoClose: 3000,
              });
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="left-side w-full max-w-md mb-10">
              <div className="flex gap-20 ">
                {/* Секція контактні дані  */}
                <div className="flex-1">
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <label
                        htmlFor="first_name"
                        className="text-darkGrey font-raleway text-4 font-medium"
                      >
                        Ім’я
                        <Field
                          id="first_name"
                          name="first_name"
                          type="text"
                          placeholder="введіть своє ім'я"
                          className="flex mt-2 w-full p-3 items-center rounded-xl border border-black focus:border-blue-500 outline-none"
                        />
                      </label>
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="last_name"
                        className="text-darkGrey font-raleway text-4 font-medium"
                      >
                        Прізвище
                        <Field
                          id="last_name"
                          name="last_name"
                          type="text"
                          placeholder="Введіть своє прізвище"
                          className="flex mt-2 w-full p-3 items-center rounded-xl border border-black focus:border-blue-500 outline-none"
                        />
                      </label>
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mt-5 w-5/7">
                    <label
                      htmlFor="phone"
                      className="w-5/7 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Номер телефону
                    </label>
                    <div className="flex w-5/5 gap-5 mt-2">
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        className="w-[360px] px-4 py-3 bg-white rounded-[10px] border border-black text-zinc-500 text-base font-light placeholder-zinc-500"
                        placeholder="(+380) XX XXX XX XX"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex gap-5 justify-between mt-5">
                    <label
                      htmlFor="email"
                      className="w-5/7 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Електронна пошта
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Введіть адресу електронної пошти"
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex gap-5 justify-between mt-5">
                    <label
                      htmlFor="date_of_birth"
                      className="w-3/7 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Дата Народження
                      <Field
                        id="date_of_birth"
                        name="date_of_birth"
                        type="text"
                        placeholder="yyyy-mm-dd"
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
                    <ErrorMessage
                      name="date_of_birth"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    classNameBtn="w-full mt-7 bg-gray-dark p-4 border rounded-xl font-bold text-18px text-white duration-300 hover:bg-transparent hover:text-black"
                  >
                    Зберегти
                  </Button>
                </div>
                {/* Секція зміни паролю */}

                <div className="flex-1 w-full flex-[0_0_380px] flex-row gap-16">
                  <div className="right-side w-full max-w-md">
                    <h4 className="font-raleway text-lg font-semibold mb-16">
                      Зміна паролю
                    </h4>

                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="userPassword"
                        className="text-darkGrey font-raleway text-4 font-medium"
                      >
                        Новий пароль
                      </label>
                      <div className="flex items-center gap-2">
                        <Field
                          id="userPassword"
                          name="password"
                          autoComplete="new-password"
                          type={isPasswordVisible ? "text" : "password"}
                          className="flex-1 p-3 rounded-xl border border-black focus:border-blue-500 outline-none"
                        />
                        <div
                          onClick={() => setPasswordVisible(!isPasswordVisible)}
                          className="cursor-pointer p-3 border border-black rounded-xl"
                        >
                          <img
                            src={isPasswordVisible ? eyeOn : eyeOff}
                            alt={
                              isPasswordVisible
                                ? "Сховати пароль"
                                : "Показати пароль"
                            }
                            tabIndex="0"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-4">
                      <label
                        htmlFor="userPasswordConfirm"
                        className="text-darkGrey font-raleway text-4 font-medium"
                      >
                        Підтвердження паролю
                      </label>
                      <div className="flex items-center gap-2">
                        <Field
                          id="userPasswordConfirm"
                          name="confirmPassword"
                          autoComplete="new-password"
                          type={isPasswordConfirmVisible ? "text" : "password"}
                          className="flex-1 p-3 rounded-xl border border-black focus:border-blue-500 outline-none"
                        />
                        <div
                          onClick={() =>
                            setPasswordConfirmVisible(!isPasswordConfirmVisible)
                          }
                          className="cursor-pointer p-3 border border-black rounded-xl"
                        >
                          <img
                            src={isPasswordVisible ? eyeOn : eyeOff}
                            alt={
                              isPasswordVisible
                                ? "Сховати пароль"
                                : "Показати пароль"
                            }
                            tabIndex="0"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </Form>
          )}
        </Formik>
      </div>
    </m.div>
  );
};

export default Personal;
