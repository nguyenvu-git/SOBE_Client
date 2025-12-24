import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    image: null,
  });

  const API = "http://localhost:8088/ecomer/api/products";

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`${API}?action=list`);
    const data = await res.json();
    setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //   const handleChange = (e) => {
  //     const { name, value, files } = e.target;
  //     setForm({ ...form, [name]: files ? files[0] : value });
  //   };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // 🔥 backend dùng $_FILES['file']

    const res = await fetch("http://localhost:8088/ecomer/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Upload ảnh thất bại");
    }

    return data.url; // backend trả về url
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category_id) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!editing && !form.image) {
      alert("Vui lòng chọn ảnh sản phẩm");
      return;
    }

    let imageUrl = editing ? editing.image : null;

    if (form.image) {
      imageUrl = await uploadImage(form.image);
    }

    const payload = {
      name: form.name,
      price: form.price,
      category_id: form.category_id,
      image: imageUrl,
    };

    const url = editing
      ? `${API}?action=update&id=${editing.id}`
      : `${API}?action=create`;

    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Lưu sản phẩm thất bại");
      return;
    }

    setOpenForm(false);
    setEditing(null);
    setForm({ name: "", price: "", category_id: "", image: null });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      image: null,
    });
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    await fetch(`${API}?action=delete&id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-6 pr-9 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          + Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Danh mục</th>
              <th className="p-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3">{p.category_id}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 rounded bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-white"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded bg-red-500 text-white cursor-pointer hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tên sản phẩm"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Giá"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              placeholder="Category ID"
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="px-4 py-2 rounded border"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
