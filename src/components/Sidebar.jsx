import { AiOutlineProduct } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-36 mt-5">
        {user && (
          <>
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-[40px] h-[40px] rounded-full"
              />
            ) : (
              <FaUserCircle className="text-6xl text-fuchsia-700" />
            )}
          </>
        )}
        <p className="capitalize font-semibold mt-5 ">{user?.name}</p>
        <p className="text-xs bg-fuchsia-400 px-3 py-0 rounded-lg uppercase">
          {user?.role} User
        </p>
      </div>
      <nav className="mt-5 flex flex-col items-center justify-center">
        <NavLink
          to={"dashboard"}
          className={({ isActive }) =>
            "w-full py-2 px-4 flex items-center " +
            (isActive
              ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
              : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
          }
        >
          <TbDeviceAnalytics className="text-2xl mr-2"/><span>Dashboard</span>
        </NavLink>

        <NavLink
          to={"products"}
          className={({ isActive }) =>
            "w-full py-2 px-4 flex items-center " +
            (isActive
              ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
              : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
          }
        >
          <AiOutlineProduct className="text-2xl mr-2"/> <span>All Products</span>
        </NavLink>
        <NavLink
          to={"users"}
          className={({ isActive }) =>
            "w-full py-2 px-4 flex items-center " +
            (isActive
              ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
              : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
          }
        >
          <LiaUsersCogSolid className="text-2xl mr-2" /> <span>All Users</span>
        </NavLink>

        <NavLink
          to={"account"}
          className={({ isActive }) =>
            "w-full py-2 px-4 flex items-center " +
            (isActive
              ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
              : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
          }
        >
          <MdOutlineManageAccounts className="text-2xl mr-2" /> <span>Account Settings</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
