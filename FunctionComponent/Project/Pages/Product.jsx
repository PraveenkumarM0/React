import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts(); 
        setNewProduct({ name: "", price: "", description: "", img: "" });
        alert("Product added successfully!");
      } else {
        console.error("Error adding product:", await response.text());
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const editProduct = (product) => {
    setEditMode(true);
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      img: product.img,
    });
  };

  
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${editingProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      if (response.ok) {
        fetchProducts(); 
        setEditMode(false);
        setNewProduct({ name: "", price: "", description: "", img: "" });
        setEditingProductId(null);
        alert("Product updated successfully!");
      } else {
        console.error("Error updating product:", await response.text());
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProducts(); 
        alert("Product deleted successfully!");
      } else {
        console.error("Error deleting product:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="title">
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="product-page">
        <div className="product-list">
          {(searchTerm ? filteredItems : products).map((product) => (
            <div key={product.id} className="product-item">
              <Link
                className="Link"
                to={`/productdetail/${product.id}`}
                state={{ product }}
              >
                <img src={product.img} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Rs-{product.price}</p>
              </Link>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => editProduct(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>

        <div className="product-form">
          <h2>{editMode ? "Edit Product" : "Add New Product"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={newProduct.img}
            onChange={handleInputChange}
          />
          {editMode ? (
            <button onClick={updateProduct}>Update Product</button>
          ) : (
            <button onClick={addProduct}>Add Product</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
