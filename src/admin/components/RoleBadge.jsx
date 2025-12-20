const RoleBadge = ({ role }) => {
  const styles =
    role === "admin"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {role.toUpperCase()}
    </span>
  );
};

export default RoleBadge;
