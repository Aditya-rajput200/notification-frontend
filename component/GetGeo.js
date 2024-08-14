'use client'


import React, { useEffect, useState } from 'react';

function GetGeo() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setPosition(position);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>GetGeo</h1>
      {position ? (
        <div>
          <p>Latitude: {position.coords.latitude}</p>
          <p>Longitude: {position.coords.longitude}</p>
        </div>
      ) : error ? (
        <p>Error: {error.message || error}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default GetGeo;
