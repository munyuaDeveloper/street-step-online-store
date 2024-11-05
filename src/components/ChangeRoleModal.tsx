import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { ChangeRoleModalProps } from "../interfaces/interface";
import Roles from "../common/Role";
const ChangeRoleModal = ({ user, onClose }: ChangeRoleModalProps) => {
  const [role, setRole] = useState(user?.role);

  const updateUserRole = async () => {
    await fetch("/api/update-user", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        role,
        userId: user?._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.message);
        onClose(role);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed bg-slate-700 -top-[200px] bottom-0 left-0 min-w-full min-h-full z-20 flex items-center justify-center bg-opacity-80">
      <div className="bg-white mx-auto w-fit md:min-w-[25%] min-w-[60%] p-3 rounded shadow-lg">
        <button className="block ml-auto" onClick={() => onClose(null)}>
          <AiOutlineClose className="" />
        </button>
        <h1 className="text-xl font-semibold border-b mb-5 mt-0 uppercase">
          Change User Role
        </h1>

        <p className="mt-2">
          <b>Name:</b> {user?.name}
        </p>
        <p className="mt-2">
          <b>Email:</b> {user?.email}
        </p>
        <div className="flex items-center justify-between my-4">
          <p>
            <b>Role:</b> {user?.role}
          </p>
          <select
            className=" outline-none border py-1 w-[160px] rounded px-2"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            {Object.values(Roles).map((opt: any) => (
              <option key={opt} className="bg-white w-fit">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-fuchsia-700 text-white w-full py-2 mt-5 mb-3 rounded-md"
          onClick={updateUserRole}
        >
          Update User
        </button>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
