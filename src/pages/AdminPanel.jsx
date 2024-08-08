import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-full min-h-[calc(100vh-120px)] w-full md:flex hidden">
      <aside className="w-52 bg-white custom-shadow">
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
          <p className="text-xs bg-fuchsia-400 px-3 py-0 rounded-lg uppercase">{user?.role} User</p>
        </div>
        <nav className="mt-5 flex flex-col items-center justify-center">
        <NavLink
            to={"dashboard"}
            className={({ isActive }) =>
              "w-full py-2 px-4 " +
              (isActive
                ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
                : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to={"products"}
            className={({ isActive }) =>
              "w-full py-2 px-4 " +
              (isActive
                ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
                : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
            }
          >
            All Products
          </NavLink>
          <NavLink
            to={"users"}
            className={({ isActive }) =>
              "w-full py-2 px-4 " +
              (isActive
                ? "bg-fuchsia-700 hover:bg-fuchsia-700 text-white hover:text-white"
                : "bg-white hover:text-fuchsia-700 hover:bg-slate-100")
            }
          >
            All Users
          </NavLink>
        </nav>
      </aside>
      <main className="p-4 min-w-[calc(100%-210px)] mt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
