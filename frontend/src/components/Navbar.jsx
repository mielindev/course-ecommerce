import React, { useRef, useState } from "react";
import {
  FolderHeart,
  LogOut,
  Menu,
  ShoppingBasket,
  TicketCheck,
  UserRoundCog,
  X,
} from "lucide-react";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const drawerRef = useRef();
  const { authUser, logout } = useAuthStore();
  const handleCloseDrawer = () => {
    if (drawerRef.current) drawerRef.current.checked = false;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 w-full relative shadow-sm fkex items-center justify-between border-b border-b-zinc-200/50">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button p-0 sm:p-4"
            >
              <Menu size={24} />
            </label>
          </div>

          {/* Center Logo */}
          <div className="mx-2 flex-1 px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            <Link
              to="/"
              className="text-4xl tracking-widest text-primary cursor-pointer font-anton "
            >
              Learnfy
            </Link>
          </div>

          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="btn btn-ghost rounded-lg hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="menu menu-horizontal items-center gap-2">
              <li>
                <Link to="/cart" className="btn btn-ghost rounded-lg">
                  <ShoppingBasket size={20} />
                </Link>
              </li>
              <li>
                {authUser ? (
                  <div className="dropdown dropdown-end p-0 mr-2 hidden lg:block">
                    <div className="avatar" tabIndex={0} role="button">
                      <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 border-1 border-base-content/50 shadow-sm"
                    >
                      <li className="border-b border-base-content/40">
                        <a className="btn btn-ghost">
                          <UserRoundCog className="size-5 mr-2" /> Profile
                        </a>
                      </li>
                      <li className="border-b border-base-content/40">
                        <Link to="/favorites" className="btn btn-ghost">
                          <FolderHeart className="size-5 mr-2" /> Favorite
                        </Link>
                      </li>
                      <li className="border-b border-base-content/40">
                        <Link to="/products/viewed" className="btn btn-ghost">
                          <TicketCheck className="size-5 mr-2" /> Viewed
                        </Link>
                      </li>

                      <li className="border-b border-base-content/40">
                        <a onClick={handleLogout} className="btn btn-ghost">
                          <LogOut className="size-5 mr-2" /> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={"/auth/login"}
                    className="btn btn-ghost rounded-lg hover:text-primary hidden lg:inline-flex"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Mobile Menu Items */}
        <div className="menu bg-base-200 min-h-full w-full max-w-md p-4 pt-12 relative">
          <div className="absolute top-4 right-4">
            <X size={24} onClick={handleCloseDrawer} />
          </div>
          <div className="flex flex-col justify-center items-start">
            <ul className="flex-1 w-full space-y-1.5">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="border border-base-content/20 rounded-lg"
                >
                  <Link
                    to={item.path}
                    onClick={handleCloseDrawer}
                    className="hover:text-primary cursor-pointer "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {authUser ? (
              <div className="dropdown dropdown-start mr-2 p-4">
                <div className="avatar" tabIndex={0} role="button">
                  <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring-2 ring-offset-2">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-1 w-fit border-1 border-base-content/50 shadow-sm"
                >
                  <li className="border-b border-base-content/40 flex items-start">
                    <a className="btn btn-ghost" onClick={handleCloseDrawer}>
                      <UserRoundCog className="size-5 mr-2" /> Profile
                    </a>
                  </li>
                  <li className="border-b border-base-content/40 flex items-start">
                    <Link
                      to="/favorites"
                      className="btn btn-ghost"
                      onClick={handleCloseDrawer}
                    >
                      <FolderHeart className="size-5 mr-2" /> Favorite
                    </Link>
                  </li>
                  <li className="border-b border-base-content/40 flex items-start">
                    <Link
                      to="/products/viewed"
                      className="btn btn-ghost"
                      onClick={handleCloseDrawer}
                    >
                      <TicketCheck className="size-5 mr-2" /> Viewed
                    </Link>
                  </li>

                  <li className="border-b border-base-content/40 flex items-start">
                    <Link
                      onClick={() => {
                        handleCloseDrawer();
                        handleLogout();
                      }}
                      className="btn btn-ghost"
                    >
                      <LogOut className="size-5 mr-2" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="menu menu-horizontal w-full items-center justify-between md:justify-start gap-4">
                <li>
                  <Link
                    to={"/auth/login"}
                    onClick={handleCloseDrawer}
                    className="btn btn-primary px-8"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/auth/register"}
                    onClick={handleCloseDrawer}
                    className="btn btn-primary px-8"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
