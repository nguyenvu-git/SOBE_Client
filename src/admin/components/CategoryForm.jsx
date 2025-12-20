import { useState } from "react";

const CategoryForm = ({ category, onClose, refresh }) => {
  const [name, setName] = useState(category?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = category
      ? `http://localhost:8088/ecomer/api/categories?action=update&id=${category.id}`
      : "http://localhost:8088/ecomer/api/categories?action=create";

    await fetch(url, {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: category?.id,
        name,
      }),
    });

    refresh();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Tên danh mục</label>
        <input
          className="w-full border rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
