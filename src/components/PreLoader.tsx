import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple flex justify-center items-center"><div className="animate-spin rounded-full h-10 w-10 border-r-2 border-l-2 border-purple"></div></div>
    </div>
  );
};

export default Preloader;
