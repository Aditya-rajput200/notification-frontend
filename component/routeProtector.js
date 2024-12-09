"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");

      // If no token, redirect to login page
      if (!token) {
        router.push("/Login");
      } else {
        // Here you can optionally validate the token with the backend
        setIsAuthenticated(true);
      }
    }, [router]);

    // Show a loading state while checking for authentication
    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    // Render the wrapped component once authenticated
    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
