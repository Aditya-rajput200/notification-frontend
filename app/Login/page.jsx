"use client"

import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from 'next/navigation';


function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login", {
        email, 
        password,
      });

      console.log("Login Successful:", response.data);

      // Store token in localStorage or any necessary action
      localStorage.setItem("authToken", response.data.token);

      toast.success("Loged in successfully!");
      router.push('/'); 
     
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("Login failed.",error);
    }
  };

  return (
    <section className="bg-gray-50">
        <Toaster richColors />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="/assets/icons/logo.svg"
            alt="logo"
          />
          Price <span className="text-red-600">Track</span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </h1>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-gray-50  bg-primary-600 focus:ring-4 border-2 border-white font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
