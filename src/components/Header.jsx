import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaSearch, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import logo from "../assest/logo.png"
const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dispatch = useDispatch();

  const handleLogoutUser = async () => {
    await fetch("/api/user-logout")
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.message);
        dispatch(logoutUser());
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <header className=" shadow-md w-full px-2 md:px-6 py-4 flex items-center justify-between bg-white">
        <Link to={"/"} className="cursor-pointer">
          {/* <Logo w={150} h={50} /> */}
          <img src={logo} className="h-[50px]" alt="Logo"/>
        </Link>
        <div className="hidden md:flex items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 w-full md:w-[500px] min-h-[40px] outline-none rounded-tl-full rounded-bl-full border"
          />
          <button className="flex items-center justify-center bg-fuchsia-700 p-3 px-5 rounded-tr-full rounded-br-full h-[43px] text-white">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center justify-between gap-[20px] md:gap-8 md:mr-5">
          <div className="relative  flex justify-center">
            <div
              className="cursor-pointer"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              {user && (
                <>
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-fuchsia-700" />
                  )}
                </>
              )}
            </div>
            {showProfileMenu && (
              <div className="absolute bg-white shadow-lg top-14 bottom-0 h-fit z-40 rounded p-2 hidden md:flex">
                <nav className="flex flex-col">
                  <Link to={'/admin/dashboard'} className="whitespace-nowrap hover:bg-slate-100 p-2" onClick={() => setShowProfileMenu((prev) => !prev)}>
                    Admin Panel
                  </Link>
                  <Link className="whitespace-nowrap hover:bg-slate-100 p-2" onClick={() => setShowProfileMenu((prev) => !prev)}>
                    My Account
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="cart text-fuchsia-700 md:text-2xl relative">
            <FaCartPlus />
            <span className="text-xs absolute -top-3 -right-3 bg-fuchsia-700 text-white rounded-full px-1">
              4
            </span>
          </div>
          {!user && (
            <Link
              to={"login"}
              className="bg-fuchsia-700 text-white rounded-full px-6 py-2"
            >
              Login
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogoutUser}
              className="bg-fuchsia-700 text-white rounded-full text-sm p-2 py-1 md:px-6 md:py-2"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
