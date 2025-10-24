import React from 'react';

interface WinScreenProps {
  onBackToGallery: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ onBackToGallery }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-black p-4">
      <h1 className="text-6xl font-extrabold text-green-400 mb-4 animate-pulse tracking-widest">
        MISSION COMPLETE
      </h1>
      <p className="text-xl text-green-300 mb-8">
        Congratulations, you have proven your mastery over the digital domain. All systems have been compromised.
      </p>
       <button
            onClick={onBackToGallery}
            className="mt-12 py-3 px-6 text-lg font-bold text-gray-900 bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
          >
            [ BACK TO GALLERY ]
          </button>
    </div>
  );
};

export default WinScreen;