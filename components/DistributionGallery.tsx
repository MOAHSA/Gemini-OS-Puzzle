import React from 'react';

interface DistributionGalleryProps {
  onSelectSystem: (system: 'zero-to-hero' | 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
}

// A reusable card component for a cleaner and more structured UI
const SystemCard = ({
  title,
  description,
  difficulty,
  icon,
  onClick,
  className = '',
}: {
  title: string;
  description: string;
  difficulty: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900/50 border border-green-700 rounded-lg p-6 flex flex-col justify-between group hover:border-green-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-500/20 ${className}`}
    >
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-green-900/50 p-2 rounded-md mr-4 group-hover:bg-green-800 transition-colors">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-green-300 group-hover:text-green-200">{title}</h2>
        </div>
        <p className="text-green-400 mb-6">{description}</p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs font-semibold bg-gray-800 text-green-400 border border-green-800 px-2 py-1 rounded-full">
          {difficulty}
        </span>
        <button
          className="text-lg font-bold text-gray-900 bg-green-600 rounded-md px-4 py-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4 duration-300"
        >
          [ LAUNCH ]
        </button>
      </div>
    </div>
  );
};


const DistributionGallery: React.FC<DistributionGalleryProps> = ({ onSelectSystem }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 p-8"
         style={{
           backgroundImage: `
             radial-gradient(circle at 25px 25px, rgba(0, 255, 100, 0.1) 2%, transparent 0%),
             radial-gradient(circle at 75px 75px, rgba(0, 255, 100, 0.1) 2%, transparent 0%)
           `,
           backgroundSize: '100px 100px',
         }}
    >
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-3 tracking-widest" style={{textShadow: '0 0 10px rgba(52, 211, 153, 0.5)'}}>
          GEMINI OS
        </h1>
        <p className="text-xl tracking-widest opacity-80 animate-pulse">DISTRIBUTION GALLERY</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
        <SystemCard
          onClick={() => onSelectSystem('zero-to-hero')}
          title="Zero to Hero"
          description="Start from the beginning and compromise all systems. The complete storyline experience."
          difficulty="Full Campaign"
          className="md:col-span-4"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />

        <SystemCard
          onClick={() => onSelectSystem(1)}
          title="System 1: GEMINI OS"
          description="Practice your skills on the initial system. Ideal for beginners or for a quick refresher."
          difficulty="Difficulty: Easy"
          icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          }
        />

        <SystemCard
          onClick={() => onSelectSystem(2)}
          title="System 2: VULN-SERVER"
          description="Jump directly to the second challenge. For experienced hackers who want to test their mettle."
          difficulty="Difficulty: Medium"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
         <SystemCard
          onClick={() => onSelectSystem(3)}
          title="System 3: Gemini Pro"
          description="Engage with a primitive AI. Use prompts and logic to bypass its protocols in this advanced challenge."
          difficulty="Difficulty: Hard"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />
         <SystemCard
          onClick={() => onSelectSystem(4)}
          title="System 4: WEB-TARGET"
          description="Focuses on web vulnerabilities. Inspect source code, bruteforce logins and exploit CVEs."
          difficulty="Difficulty: Very Hard"
          icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
            </svg>
          }
        />
         <SystemCard
          onClick={() => onSelectSystem(5)}
          title="System 5: Rev-eng"
          description="A deep dive into reverse engineering. Unpack, disassemble, and deobfuscate a mystery binary."
          difficulty="Difficulty: Expert"
          icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1V2.5M3 12l2-1m-2 1l2 1m-2-1H2.5M3 17l2-1m-2 1l2 1m-2-1H2.5M9 5l-2 1m-2-1l2-1m-2 1V2.5M12 21.5V19m0 2.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            </svg>
          }
        />
        <SystemCard
          onClick={() => onSelectSystem(6)}
          title="System 6: OSINT-HUB"
          description="Become a digital ghost. Use open-source intelligence tools to track down a target."
          difficulty="Difficulty: Master"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        <SystemCard
          onClick={() => onSelectSystem(7)}
          title="System 7: ZERO-DAY"
          description="Find and exploit a zero-day vulnerability in a live web application. The ultimate test."
          difficulty="Difficulty: Legendary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
       <footer className="absolute bottom-4 text-xs text-green-600 opacity-50">
        Select a distribution to begin the simulation.
      </footer>
    </div>
  );
};

export default DistributionGallery;