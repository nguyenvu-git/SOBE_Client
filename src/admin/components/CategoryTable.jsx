import { useState, useEffect } from "react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Tên danh mục</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{cat.id}</td>
              <td className="p-3 font-medium">{cat.name}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
                  className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
