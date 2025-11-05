import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  const [imagePreview, setImagePreview] = useState(""); // preview selected image
  const [editingProduct, setEditingProduct] = useState(null);

  const limit = 10;

  // ---------- FETCH PRODUCTS ----------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const skip = (page - 1) * limit;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // ---------- HANDLE IMAGE CHANGE ----------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // creates temporary image preview
      setImagePreview(url);
      setForm({ ...form, thumbnail: url }); // store in form
    }
  };

  // ---------- ADD PRODUCT ----------
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(`✅ Product added: ${data.title}`);
      setForm({ title: "", price: "", description: "", thumbnail: "" });
      setImagePreview("");
      fetchProducts();
    } catch {
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // ---------- EDIT PRODUCT ----------
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      thumbnail: product.thumbnail,
    });
    setImagePreview(product.thumbnail);
  };

  // ---------- UPDATE PRODUCT ----------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(`✅ Product updated: ${data.title}`);
      setEditingProduct(null);
      setForm({ title: "", price: "", description: "", thumbnail: "" });
      setImagePreview("");
      fetchProducts();
    } catch {
      alert("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // ---------- DELETE PRODUCT ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setLoading(true);
      await fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" });
      alert("🗑️ Product deleted (mock)");
      fetchProducts();
    } catch {
      alert("❌ Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🛍️ Admin Panel — Product Management</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ---------- ADD / EDIT FORM ---------- */}
      <form
        onSubmit={editingProduct ? handleUpdate : handleAdd}
        style={{
          marginBottom: "20px",
          backgroundColor: "#f7f7f7",
          padding: "15px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h3>{editingProduct ? "✏️ Edit Product" : "➕ Add Product"}</h3>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div style={{ marginBottom: "10px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              width="100%"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Submit Buttons */}
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: editingProduct ? "#007bff" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingProduct ? "Update" : "Add"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setForm({ title: "", price: "", description: "", thumbnail: "" });
              setImagePreview("");
            }}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ---------- PRODUCT TABLE ---------- */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width="60"
                    height="60"
                    style={{ borderRadius: "5px", objectFit: "cover" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td style={{ maxWidth: "250px" }}>{product.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      backgroundColor: "#ffc107",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ---------- PAGINATION ---------- */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
