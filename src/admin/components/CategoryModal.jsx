import CategoryForm from "./CategoryForm";

const CategoryModal = ({ onClose, refresh, category }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {category ? "Sửa danh mục" : "Thêm danh mục"}
        </h2>

        <CategoryForm category={category} onClose={onClose} refresh={refresh} />
      </div>
    </div>
  );
};

export default CategoryModal;
