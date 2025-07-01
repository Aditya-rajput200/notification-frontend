"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import ProtectedRoute from "@/component/routeProtector";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const  [isOpen, setIsOpen] = useState(false)

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
        data: { id: productId },
      });

      if (response.status === 200) {
        toast.success("Product deleted successfully");
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      }
      setDeleteId(null); // Reset delete ID after successful deletion
    } catch (error) {
      toast.error("Failed to delete product.");
      setDeleteId(null); // Reset delete ID if deletion fails
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <Toaster richColors />
      <h1 className="text-2xl font-bold mb-4">Product's List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Is Coupon</th>
              <th className="py-3 px-4 text-center">Discounted Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
              <th className="py-3 px-4 text-center">Tracking Status</th>
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
                <td className="py-3 px-4 text-center">₹ {product.price}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.discountedPrice == null
                        ? "bg-red-100 text-red-600"
                        : "bg-green-500 text-green-100"
                    }`}
                  >
                    {product.discountedPrice == null ? "No" : "Yes"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {product.discountedPrice == null ? "No discount" : "₹ " + product.discountedPrice}
                </td>
                <td className="py-3 px-4 text-center">
                 

                   <button onClick={()=>{setIsOpen(true)}} className="bg-red-500 px-3 py-1 rounded-md   text-red-50">Delete</button>
                 
              {isOpen && ( <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out"
        aria-modal="true"
        role="dialog" >
            

             

             <div className="bg-gray-100 p-5 rounded-md w-3/12 h-56" >
               <h2 className="text-left text-xl font-bold" >Are sure you want to  <span className="text-red-500">Delete ?</span> </h2>
               <p className="mt-4 ">This will permanently delete  and remove your data from our servers.</p>
               <div className="mt-10 ml-44 " >
                 <button onClick={()=>handleDelete(product.id) && setIsOpen(false) }  className="bg-red-500 px-3 py-1 mr-3 rounded-md  w-24 h-12   text-red-50">Delete</button>
               <button onClick={()=>{setIsOpen(false)}} className="bg-gray-500 px-3 py-1 rounded-md  w-24 h-12  text-red-50">Cancel</button></div>


             </div>
            
              </div> ) }
            
                </td>

                <td className="py-3 px-4 text-center">
                <div>
     
      <Switch {...label} defaultChecked  color="warning" />
    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProtectedRoute(ProductTable);

