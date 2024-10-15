import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { $api } from "../../api/api.js";

import { motion as m } from "framer-motion";

const Personal = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    phone: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Required"),
    B_day: Yup.string(),
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
      <div className="flex justify-start gap-x-32   flex-col xxl:flex-row">
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
              const response = await $api.patch(
                `/api/users/${userData.user_id}/`,

                {
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  phone: userData.phone,
                  email: userData.email,
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
              <div className="flex gap-5 justify-between">
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

              <ToastContainer />
              <Button
                type="submit"
                classNameBtn="w-full mt-7 bg-gray-dark p-4 border rounded-xl font-bold text-18px text-white duration-300 hover:bg-transparent hover:text-black"
              >
                Зберегти
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </m.div>
  );
};

export default Personal;

// код, який прийшов з репозиторію
// import React, { useEffect, useState } from "react";
// import Button from "../common/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../redux/userSlice";
// import eyeOff from "../../assets/icons/icon-Eye-off.svg";
// import eyeOn from "../../assets/icons/icon-openEye.svg";

// import { motion as m } from "framer-motion";

// const Personal = () => {
//   const user = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();

//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);
//   // Локальний стан для контролю введення
//   const [userData, setUserData] = useState({
//     token: "",
//     user_id: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     is_verified_email: "",
//     B_day: "",
//     image: "",
//     is_superuser: false,
//   });

//   useEffect(() => {
//     // Оновлюємо локальний стан, коли отримуємо  дані зі стору
//     if (user) {
//       setUserData({ ...user });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting userData:", userData);
//     dispatch(updateUser(userData)); // Відправляємо оновлені дані в стор
//   };

//   console.log("userDataOnProfile");
//   console.log(userData);
//   return (
//     <m.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h3 className="text-blue font-raleway lining-nums proportional-nums  font-semibold mb-10 text-2xl">
//         Контактна інформація
//       </h3>
//       <div className="flex justify-start gap-x-32   flex-col xxl:flex-row">
//         {/* profile setting */}
//         <form className="left-side w-full max-w-md mb-10 ">
//           <div className="flex gap-5 justify-between">
//             <label
//               htmlFor="username"
//               className="w-1/2 text-darkGrey font-raleway text-4 font-medium"
//             >
//               Ім’я
//               <input
//                 id="username"
//                 type="text"
//                 name="first_name"
//                 value={userData.first_name}
//                 onChange={handleChange}
//                 className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//               />
//             </label>
//             <label
//               htmlFor="userSurname"
//               className="w-1/2  text-darkGrey font-raleway text-4 font-medium"
//             >
//               Прізвище
//               <input
//                 id="userSurname"
//                 type="text"
//                 name="last_name"
//                 value={userData.last_name}
//                 onChange={handleChange}
//                 className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//               />
//             </label>
//           </div>

//           <div className="flex flex-col mt-5 w-5/7 ">
//             <label
//               htmlFor="userNumber"
//               className="w-1/2 text-darkGrey font-raleway text-4 font-medium"
//             >
//               Номер телефону
//             </label>
//             <div className="flex w-5/5 gap-5 mt-2">
//               <input
//                 id="userNumber"
//                 type="number"
//                 name="phone"
//                 value={userData.phone}
//                 onChange={handleChange}
//                 className="w-[360px]  px-4 py-3 bg-white rounded-[10px] border border-black text-zinc-500 text-base font-light placeholder-zinc-500"
//                 placeholder="(+380) XX XXX XX XX"
//               />
//             </div>
//           </div>
//           <div className="flex gap-5 justify-between mt-5">
//             <label
//               htmlFor="userEmail"
//               className="w-5/7 text-darkGrey font-raleway text-4 font-medium"
//             >
//               Електронна пошта
//               <input
//                 id="userEmail"
//                 type="text"
//                 name="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//               />
//             </label>
//           </div>
//           <div className="flex gap-5 justify-between mt-5">
//             <label
//               htmlFor="userDate"
//               className="w-3/7 text-darkGrey font-raleway text-4 font-medium"
//             >
//               Дата Народження
//               <input
//                 id="userDate"
//                 type="text"
//                 name="B_day"
//                 placeholder="dd/mm/yy"
//                 value={userData.B_day}
//                 onChange={handleChange}
//                 className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//               />
//             </label>
//           </div>
//           <Button
//             onClick={handleSubmit}
//             classNameBtn="w-full mt-7 bg-gray-dark p-4 border rounded-xl font-bold text-18px text-white duration-300 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black"
//           >
//             Зберегти
//           </Button>
//         </form>

//         {/* change password */}
//         <form className="right-side w-full max-w-md">
//           <input type="hidden" name="username" value={userData.user_id} />
//           <h4 className="font-raleway lining-nums proportional-nums text-lg font-semibold mb-10">
//             Зміна паролю
//           </h4>
//           <div className="flex gap-5 justify-between mt-5">
//             <div className="w-5/7">
//               <label
//                 htmlFor="userPassword"
//                 className="text-darkGrey font-raleway text-4 font-medium"
//               >
//                 Новий пароль{" "}
//               </label>
//               <div className="flex">
//                 <input
//                   id="userPassword"
//                   autoComplete="new-password"
//                   type={isPasswordVisible ? "text" : "password"}
//                   className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//                 />
//                 <div
//                   onClick={() => setPasswordVisible(!isPasswordVisible)}
//                   className="flex mt-2 ml-3  p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//                 >
//                   <img src={isPasswordVisible ? eyeOn : eyeOff} alt="img" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-5 justify-between mt-5 ">
//             <div className="w-5/7">
//               <label
//                 htmlFor="userPasswordConfirm"
//                 className="text-darkGrey font-raleway text-4 font-medium"
//               >
//                 Підтвердження паролю{" "}
//               </label>
//               <div className="flex">
//                 <input
//                   id="userPasswordConfirm"
//                   autoComplete="new-password"
//                   type={isPasswordConfirmVisible ? "text" : "password"}
//                   className="flex mt-2 w-5/5 p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//                 />
//                 <div
//                   onClick={() =>
//                     setPasswordConfirmVisible(!isPasswordConfirmVisible)
//                   }
//                   className="flex mt-2 ml-3  p-3 items-center self-stretch rounded-xl border border-black focus:border-blue-500 outline-none"
//                 >
//                   <img
//                     src={isPasswordConfirmVisible ? eyeOn : eyeOff}
//                     alt="img"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </m.div>
//   );
// };

// export default Personal;
