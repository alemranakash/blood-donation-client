import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div
      className="banner-container bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: 'url("https://i.ibb.co/vDKfJDL/pexels-kirill-dratsevich-12227661.jpg")' }}
    >
      <div className="banner-content max-w-2xl">
        <h1 className="text-4xl mb-8">Join as a Donor</h1>
        <p className="text-lg mb-12">
          Your contribution can save lives. Join us in the noble cause of blood donation.
        </p>
        <div className="button-container">
          <Link to="/register" className="join-button inline-block px-6 py-3 mr-4 text-lg text-white bg-orange-500 rounded-md transition duration-300 hover:bg-gray-700">
            Join as a Donor
          </Link>
          <Link to="/searchPage" className="search-button inline-block px-6 py-3 text-lg text-white bg-orange-500 rounded-md transition duration-300 hover:bg-gray-700">
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
