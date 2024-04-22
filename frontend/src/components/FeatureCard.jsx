import React from "react";

function FeatureCard({ title, description, icon, image }) {
  return (
    <div className="w-96  rounded-lg p-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-center items-center mb-4">
        {image && (
          <img
            src={image}
            alt="feature-image"
            className="h-24 w-24 rounded-full"
          />
        )}
      </div>
      <h3 className="text-xl text-center text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default FeatureCard;
