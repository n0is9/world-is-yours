import React, { useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeOff from "../../assets/icons/icon-Eye-off.svg";
import eyeOn from "../../assets/icons/icon-openEye.svg";
import { $api } from "../../api/api.js";

import { motion as m } from "framer-motion";

const Personal = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    phone: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Required"),
    B_day: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
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
            B_day: user?.B_day || "",
            user_id: user?.user_id || "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values) => {
            const userData = {
              ...user,
              ...values, // включає поля з форм
            };

            try {
              console.log("Sending values:", userData);

              if (values.password !== values.confirmPassword) {
                toast.error("Passwords must match", {
                  position: "top-center",
                  autoClose: 3000,
                });
                return;
              }
              const response = await $api.patch(
                `/api/users/${userData.user_id}/`,

                {
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  phone: userData.phone,
                  email: userData.email,
                  ...(userData.password && { password: userData.password }),
                }
              );
              console.log("Response from server:", response.data);

              dispatch(updateUser(response.data));

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
                  <div className="w-full max-w-md mb-10">
                    <label
                      htmlFor="first_name"
                      className="w-1/2 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Ім’я
                      <Field
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
                    <label
                      htmlFor="last_name"
                      className="w-1/2 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Прізвище
                      <Field
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col mt-5 w-5/7">
                    <label
                      htmlFor="phone"
                      className="w-1/2 text-darkGrey font-raleway text-4 font-medium"
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
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
                  </div>

                  <div className="flex gap-5 justify-between mt-5">
                    <label
                      htmlFor="B_day"
                      className="w-3/7 text-darkGrey font-raleway text-4 font-medium"
                    >
                      Дата Народження
                      <Field
                        id="B_day"
                        name="B_day"
                        type="text"
                        placeholder="dd/mm/yy"
                        className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
                      />
                    </label>
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

                    {/* Новий пароль */}
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
                            alt="toggle visibility"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Підтвердження паролю */}
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
                            src={isPasswordConfirmVisible ? eyeOn : eyeOff}
                            alt="toggle visibility"
                          />
                        </div>
                      </div>
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
