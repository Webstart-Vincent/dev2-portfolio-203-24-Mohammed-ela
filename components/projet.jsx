import React from 'react';

const PortfolioItem = ({ title, description, gitLink, image, technologies }) => {
  return (
    <div className="p-4 m-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <a href={gitLink} className="text-blue-500 hover:underline mb-2">GitHub Link</a>
      <img src={image} alt="Project" className="w-full mb-2" />
      <p className="text-sm text-gray-500">Technologies used: {technologies.join(', ')}</p>
    </div>
  );
};

export default PortfolioItem;
