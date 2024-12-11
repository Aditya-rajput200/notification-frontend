"use client";

import axios from "axios";

import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const isValidMyntraProductURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    // Check if the hostname includes Myntra
    return hostname.includes("myntra");
  } catch (error) {
    return false;
  }
};

function Searchbar() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate URL before making the API call
    const isValidLink = isValidMyntraProductURL(searchPrompt);
    const token = localStorage.getItem("authToken")
    const url = searchPrompt;

    if (!isValidLink) {
      toast.error("Please provide a valid Myntra link");
      return;
    }

    try {
      setIsLoading(true);

      // Make the POST request
 
        const response = await axios.post("http://localhost:5000/api/v1/job/scrape",
          {
            url
          },
          {
            headers: {
              authorization: token, 
            },
          }
        );
        console.log(response.data)
        toast.success("Data has been scraped successfully!");
        setSearchPrompt(" ");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while scraping data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <form className="flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          type="text"
          placeholder="Enter the link here..."
          className="searchbar-input"
        />

        <button
          disabled={searchPrompt === ""}
          type="submit"
          className="searchbar-btn"
        >
          {isLoading ? "Adding..." : "Add to Track"}
        </button>
      </form>
    </>
  );
}

export default Searchbar;
