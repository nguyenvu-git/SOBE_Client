import RoleBadge from "./RoleBadge";

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Họ tên</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Ngày tạo</th>
            {/* <th className="p-3 text-center">Hành động</th> */}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.fullname}</td>
              <td className="p-3">
                <RoleBadge role={u.role} />
              </td>
              <td className="p-3">{u.created_at}</td>
              {/* <td className="p-3 text-center space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:underline">
                  Sửa
                </button>
                <button className="px-3 py-1 text-red-600 hover:underline">
                  Xóa
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
