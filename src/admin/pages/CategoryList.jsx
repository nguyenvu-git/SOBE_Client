import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import CategoryModal from "../components/CategoryModal";
import Sidebar from "../components/SideBar";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    const res = await fetch(
      "http://localhost:8088/ecomer/api/categories?action=list"
    );
    const data = await res.json();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditCategory(null);
    setOpen(true);
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    await fetch(
      `http://localhost:8088/ecomer/api/categories?action=delete&id=${id}`,
      {
        method: "DELETE", // backend chỉ nhận POST
      }
    );

    fetchCategories();
  };
  return (
    <div className="w-full flex h-screen">
      <div className="w-[20%] h-screen">
        <Sidebar></Sidebar>
      </div>
      <div className="w-[70%]">
        <div className="flex justify-between mb-6 mt-6">
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Thêm danh mục
          </button>
        </div>

        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {open && (
          <CategoryModal
            onClose={() => setOpen(false)}
            refresh={fetchCategories}
            category={editCategory}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryList;
