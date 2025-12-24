import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import UserFilter from "../components/UserFilter";
import Sidebar from "../components/SideBar";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("http://localhost:8088/ecomer/api/auth?action=list")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(keyword.toLowerCase()) ||
      u.fullname.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="">
      {/* <div className="w-[20%]">
        <Sidebar></Sidebar>
      </div> */}
      <div className="w-[90%] mt-4">
        <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>

        <UserFilter keyword={keyword} setKeyword={setKeyword} />

        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default UserList;
