import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-center items-center">
      <p className="text-sm">
        {" "}
        Thank you for using our app! &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
