const UserFilter = ({ keyword, setKeyword }) => {
  return (
    <div className="flex justify-between mb-4">
      <input
        className="border p-2 rounded-lg w-64"
        placeholder="Tìm theo tên hoặc username"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default UserFilter;
