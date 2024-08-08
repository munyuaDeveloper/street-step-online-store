import moment from "moment";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import ChangeRoleModal from "../components/ChangeRoleModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      fetch("/api/all-user")
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchAllUsers();
  }, []);

  const handleOnClose = (role) => {
    if (role) {
      const index = users.findIndex((item) => item._id === selectedUser._id);

      const user = users[index];
      const updatedUser = {
        ...user,
        role,
      };

      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
    }

    setSelectedUser(null);
  };

  return (
    <div className="w-full bg-white p-4 shadow-md">
      <h2 className="text-2xl mb-2 text-fuchsia-500">All Users</h2>
      <table className="min-w-full">
        <thead className="bg-fuchsia-700 text-white">
          <tr className="text-left p-2">
            <th className="p-2">#</th>
            <th className="p-2">Full Names</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user, index) => (
            <tr key={user._id} className="border-b hover:bg-fuchsia-50">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user?.email}</td>
              <td className="p-2 capitalize">{user?.role}</td>
              <td className="p-2">{moment(user?.createdAt).format("LLL")}</td>
              <td className="p-2">
                <BsPencilSquare
                  className="text-fuchsia-700 text-3xl cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <p className="text-center text-fuchsia-500 my-10">
          Fetching users. Please wait...
        </p>
      )}

      {selectedUser && (
        <ChangeRoleModal
          user={selectedUser}
          onClose={(role) => handleOnClose(role)}
        />
      )}
    </div>
  );
};

export default Users;
