import React from 'react';

interface SystemWinScreenProps {
  systemId: number;
  onNext: () => void;
  onBackToGallery: () => void;
}

const systemData = {
    1: {
        title: "SYSTEM 1 COMPROMISED",
        message: "You've successfully breached the first layer of security. The credentials for the next system have been extracted.",
        flagLabel: "ROOT PASSWORD:",
        flag: "HACKERMAN_2025",
        buttonText: "[ PROCEED TO SYSTEM 2 ]"
    },
    2: {
        title: "SYSTEM 2 COMPROMISED",
        message: "The server's defenses have fallen. You are one step closer to the core. Prepare for the final challenge.",
        flagLabel: "NEXT SYSTEM PASSWORD:",
        flag: "hello_world",
        buttonText: "[ PROCEED TO SYSTEM 3 ]"
    },
    3: {
        title: "AI CORE SUBVERTED",
        message: "You outsmarted the machine. The AI has been fully compromised, revealing the next system's access key.",
        flagLabel: "WEB-DEV PASSWORD:",
        flag: "admin",
        buttonText: "[ PROCEED TO SYSTEM 4 ]"
    },
    4: {
        title: "WEB SERVER COMPROMISED",
        message: "You've exploited the web server's vulnerabilities. Access to the reverse engineering workstation has been granted.",
        flagLabel: "ANALYST PASSWORD:",
        flag: "REVERSE_ENGINEER",
        buttonText: "[ PROCEED TO SYSTEM 5 ]"
    },
    5: {
        title: "BINARY DECODED",
        message: "You have successfully reverse-engineered the binary. The path to the final intelligence hub is now open.",
        flagLabel: "RECON PASSWORD:",
        flag: "INFO_GATHERER",
        buttonText: "[ PROCEED TO SYSTEM 6 ]"
    },
    6: {
        title: "TARGET ACQUIRED",
        message: "You've tracked the target across the digital landscape using nothing but open-source intelligence. The path to the final challenge is open.",
        flagLabel: "THREAT ACTOR PASSWORD:",
        flag: "UNAUTHENTICATED",
        buttonText: "[ PROCEED TO SYSTEM 7 ]"
    },
    7: {
        title: "ZERO-DAY EXPLOITED",
        message: "You discovered a critical vulnerability, exfiltrated the data, and forced them to comply. You are a true digital phantom.",
        flagLabel: "FINAL FLAG:",
        flag: "{ZERO_DAY_HERO}",
        buttonText: "[ VIEW FINAL REPORT ]"
    }
};

const SystemWinScreen: React.FC<SystemWinScreenProps> = ({ systemId, onNext, onBackToGallery }) => {
    const data = systemData[systemId as keyof typeof systemData];

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-black p-4">
            <h1 className="text-5xl font-extrabold text-green-400 mb-4 animate-pulse tracking-widest">
                {data.title}
            </h1>
            <p className="text-xl text-green-300 mb-8 max-w-2xl">
                {data.message}
            </p>
            <div className="text-left bg-gray-800 border border-green-500 p-6 rounded-lg shadow-lg shadow-green-500/30">
                <p className="text-lg">
                    <span className="font-bold text-yellow-400">{data.flagLabel}</span> 
                    <span className="text-white ml-2">{data.flag}</span>
                </p>
            </div>
            <div className="flex items-center space-x-4 mt-12">
                <button
                    onClick={onBackToGallery}
                    className="py-3 px-6 text-lg font-bold text-green-400 bg-transparent border border-green-500 rounded-md hover:bg-green-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
                >
                    [ REBOOT TO GALLERY ]
                </button>
                <button
                    onClick={onNext}
                    className="py-3 px-6 text-lg font-bold text-gray-900 bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
                >
                    {data.buttonText}
                </button>
            </div>
        </div>
    );
};

export default SystemWinScreen;