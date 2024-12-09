"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import ProtectedRoute from "@/component/routeProtector";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);

  // Fetch token on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
    }
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    if (!token) {
      toast.error("Token not provided. Please log in again.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/v1/job/getProduts", {
        headers: {
          authorization: token,
        },
      });
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    try {
     
      const response = await axios.delete("http://localhost:5000/api/v1/job/delete", {
        headers: {
          authorization: token,
        },
        data: { id: productId }, // Sending productId in the body
      });

      if (response.status === 200) {
        toast.success("Product deleted successfully");
        // Remove deleted product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      }
    
   
      toast.success("Product deleted successfully.");
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <Toaster richColors />
      <h1 className="text-2xl font-bold mb-4">Projects List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-3 px-4 text-left">Product</th>
            
              
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Is Coupan</th>
              <th className="py-3 px-4 text-center">Discounted Price</th>
              <th className="py-3 px-4 text-center">Actions</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </td>
              
                <td className="py-3 px-4 text-center">₹ {product.price }</td>

                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.discountedPrice==null
                        ? "bg-red-500 text-blue-600"

                        : "bg-green-600 text-green-600"
                      
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center"> {product.discountedPrice==null? "No discount" :"₹ "+ product.discountedPrice }</td>
                
                <td className="py-3 px-4 text-center">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProtectedRoute(ProductTable) ;
