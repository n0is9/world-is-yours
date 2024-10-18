import React, { useState, useEffect } from "react";
import LogoWorldIsYoursDark from "../../assets/icons/dark/logo-dark.svg";
import SearchIconDark from "../../assets/icons/dark/icon-search-dark.svg";
import { NavLink, useNavigate } from "react-router-dom";
import CartIconDark from "../../assets/icons/dark/icon-cart-dark.svg";
import HeartIconDark from "../../assets/icons/dark/icon-heart-dark.svg";

import ArrowDown from "../../assets/icons/arrow-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../../redux/localeSlice";
// import { setIsCategoriesOpen } from "../../redux/headerSlice";
import DonateBanner from "../common/DonateBanner";
import useTranslation from "../../locale/locales";
import Categories from "./Categories";
import SignUp from "../registration-popup/SignUp";
import RemindPas from "../registration-popup/RemindPas";
import LogIn from "../registration-popup/LogIn";
import SuccessMes from "../registration-popup/SuccessMes";
import LoginStatus from "../feature/header/loginStatus";

import globalStyle from "./globalStyles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const dispatch = useDispatch();

  const t = useTranslation();
  const locale = useSelector((state) => state.locale.locale);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // const isCategoriesOpen = useSelector((state) => state.header.isCategoriesOpen);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const [isOpenSignUpPopup, setOpenSignUpPopup] = useState(false);
  const [isRemindPassOpen, setRemindPassOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSuccessMesOpen, setSuccessMesOpen] = useState(false);

  // toggle isOpen state
  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  // scroll lock
  if (
    isOpenSignUpPopup ||
    isRemindPassOpen ||
    isLoginOpen ||
    isSuccessMesOpen
  ) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      // Якщо користувач не залогінений, показуємо тостик і запобігаємо переходу
      e.preventDefault();
      toast.info("This action is available to registered users only", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const notCurrentPage =
    "border border-transparent rounded-lg duration-100 hover:border-slate-400 focus:border-slate-400";
  const currentPage =
    "border fill-current text-white bg-black rounded-lg duration-100 hover:border-slate-400 focus:border-slate-400";

  return (
    <header>
      <div className="relative z-10">
        <div className="flex justify-between items-center gap-4 px-10 bg-white text-custom-black drop-shadow-5xl ">
          <div className="flex justify-start items-center grow-0 basis-[30%]">
            <NavLink to={"/"} className="px-1 focus:outline focus:outline-1">
              <img src={LogoWorldIsYoursDark} alt="World Is Yours" />
            </NavLink>
            <div className="mx-10 text-center flex flex-col">
              <button
                className={`cursor-pointer hover:underline focus:underline ${locale === "en" ? " underline font-semibold focus:scale-105" : "text-custom-black/30"}`}
                onClick={() => dispatch(setLocale({ locale: "en" }))}
              >
                ENG
              </button>

              <button
                className={`cursor-pointer hover:underline focus:underline ${locale === "uk" ? " underline font-semibold focus:scale-105" : "text-custom-black/30"}`}
                onClick={() => dispatch(setLocale({ locale: "uk" }))}
              >
                UA
              </button>
            </div>

            <Search />
          </div>

          <ul className="flex justify-center items-center gap-10 justify-self-center">
            <li>
              <NavLink
                onClick={() => {
                  if (window.location.pathname === "/world-is-yours") {
                    window.location.reload();
                  }
                }}
                to={"/"}
                className="hover:underline focus:underline"
                style={({ isActive }) => {
                  return {
                    textDecoration: isActive ? "underline" : "",
                  };
                }}
              >
                {t("HOME")}
              </NavLink>
            </li>

            <li
              onClick={() => toggleCategories()}
              className="catalogue cursor-pointer  hover:underline focus:underline focus:outline-none"
              tabIndex="0"
            >
              <a className="flex flex-row gap-4">
                {t("CATALOGUE")}
                <img
                  className={`w-3 duration-300 ${isCategoriesOpen ? "rotate-0" : "rotate-180"}`}
                  src={ArrowDown}
                  alt="arrow down"
                />
              </a>
            </li>

            <li>
              <NavLink
                to={"/contacts"}
                className="hover:underline focus:underline"
                style={({ isActive }) => {
                  return {
                    textDecoration: isActive ? "underline" : "",
                  };
                }}
              >
                {t("CONTACTS")}
              </NavLink>
            </li>
          </ul>

          <div className="flex justify-end items-center gap-5 grow-0 basis-[30%]">
            <NavLink
              to={"/cart"}
              onClick={handleCartClick}
              className={({ isActive }) =>
                isActive ? currentPage : notCurrentPage
              }
            >
              <svg
                className="w-10 h-10 stroke-current"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 30C15.5523 30 16 29.5523 16 29C16 28.4477 15.5523 28 15 28C14.4477 28 14 28.4477 14 29C14 29.5523 14.4477 30 15 30Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26 30C26.5523 30 27 29.5523 27 29C27 28.4477 26.5523 28 26 28C25.4477 28 25 28.4477 25 29C25 29.5523 25.4477 30 26 30Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9H11L13.68 22.39C13.7714 22.8504 14.0219 23.264 14.3875 23.5583C14.7532 23.8526 15.2107 24.009 15.68 24H25.4C25.8693 24.009 26.3268 23.8526 26.6925 23.5583C27.0581 23.264 27.3086 22.8504 27.4 22.39L29 14H12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                isActive ? currentPage : notCurrentPage
              }
            >
              <svg
                className="w-10 h-10 stroke-current"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.1494 11.8506C29.5629 11.2639 28.8667 10.7985 28.1003 10.481C27.334 10.1634 26.5126 10 25.6831 10C24.8535 10 24.0321 10.1634 23.2658 10.481C22.4994 10.7985 21.8032 11.2639 21.2167 11.8506L19.9997 13.0677L18.7826 11.8506C17.5981 10.6661 15.9915 10.0006 14.3163 10.0006C12.6411 10.0006 11.0346 10.6661 9.85001 11.8506C8.66547 13.0352 8 14.6417 8 16.3169C8 17.9921 8.66547 19.5987 9.85001 20.7833L11.0671 22.0003L19.9997 30.9329L28.9323 22.0003L30.1494 20.7833C30.7361 20.1968 31.2015 19.5006 31.519 18.7342C31.8366 17.9679 32 17.1465 32 16.3169C32 15.4874 31.8366 14.666 31.519 13.8997C31.2015 13.1333 30.7361 12.4371 30.1494 11.8506Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
            <LoginStatus setLoginOpen={() => setLoginOpen(true)} />
          </div>
        </div>
        {isCategoriesOpen && (
          <Categories onClose={() => setCategoriesOpen(false)} />
        )}
      </div>

      {/* isOpenSignUpPopup */}
      {isOpenSignUpPopup && (
        <SignUp
          onClose={() => setOpenSignUpPopup(false)}
          openLogin={() => {
            setOpenSignUpPopup(false);
            setLoginOpen(true);
          }}
          openSuccess={() => {
            setOpenSignUpPopup(false);
            // setSuccessMesOpen(true);
            console.log("user created");
          }}
          openRemindPass={() => {
            setOpenSignUpPopup(false);
            setRemindPassOpen(true);
          }}
        />
      )}

      {/* isRemindPassOpen */}
      {isRemindPassOpen && (
        <RemindPas
          onClose={() => setRemindPassOpen(false)}
          openLogin={() => {
            setRemindPassOpen(false);
            setLoginOpen(true);
          }}
          // openSuccess={openSuccess}
        />
      )}

      {/*isLoginOpen  */}
      {isLoginOpen && (
        <LogIn
          onClose={() => setLoginOpen(false)}
          openSignUp={() => {
            setLoginOpen(false);
            setOpenSignUpPopup(true);
          }}
          openSuccess={() => {
            setLoginOpen(false);
            // setSuccessMesOpen(true);
            console.log("user login");
          }}
          openRemindPass={() => {
            setLoginOpen(false);
            setRemindPassOpen(true);
          }}
        />
      )}

      {/* isSuccessMesOpen */}
      {isSuccessMesOpen && (
        <SuccessMes
          onClose={() => setSuccessMesOpen(false)}
          openLogin={() => {
            setSuccessMesOpen(false);
            setRemindPassOpen(false);
            setOpenSignUpPopup(false);
            setLoginOpen(true);
          }}
        />
      )}
      <ToastContainer />
    </header>
  );
}

export default Header;

// search bar
const Search = () => {
  let navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/categories?${searchValue}`);
    }
  };

  const documentClickCheck = (e) => {
    if (!e.target.closest(".StateClicked")) {
      console.log("state clicked");
      setSearchOpen(false);
    } else {
      console.log("!isOpen");
    }
  };
  useEffect(() => {
    document.addEventListener("click", documentClickCheck);
    return () => {
      document.removeEventListener("click", documentClickCheck);
    };
  }, []);

  return (
    <div className="max-h-[32px]">
      {isSearchOpen ? (
        <div
          className={
            "StateClicked max-w-[400px] border-b border-slate-700 inline-flex items-center gap-[15px]"
          }
          data-isOpen={`${isSearchOpen ? "true" : "false"}`}
        >
          <img
            onClick={() => navigate(`/categories?${searchValue}`)}
            className="cursor-pointer w-8 h-8 p-1 border border-transparent rounded-lg duration-100 hover:scale-105 focus:border-slate-400"
            src={SearchIconDark}
            alt="Search"
          />
          <span className="text-neutral-800 text-lg font-medium font-['Raleway']">
            |
          </span>
          <input
            type="text"
            placeholder="Я шукаю..."
            className="grow shrink basis-0 h-[21px] bg-transparent text-neutral-400 text-base font-light font-['Raleway'] outline-none active:border-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <img
          onClick={() => setSearchOpen(true)}
          className="StateClicked cursor-pointer w-8 h-8 p-1 border border-transparent rounded-lg duration-100 hover:border-slate-400 focus:border-slate-400"
          src={SearchIconDark}
          alt="Search"
          tabIndex="0"
          aria-haspopup="true"
          aria-label="search icon(click to open)"
        />
      )}
    </div>
  );
};
