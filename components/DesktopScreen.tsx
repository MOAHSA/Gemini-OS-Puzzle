import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';
import { GameLevel } from '../types';

interface DesktopScreenProps {
  currentLevel: GameLevel;
  onLevelComplete: () => void;
  systemId: number;
}

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return <span className="text-sm">{time.toLocaleTimeString()}</span>
}

const objectives: { [key: number]: { [key in GameLevel]?: string } } = {
  1: {
    [GameLevel.CREATE_FILE]: "Objective: Create a file named 'mission.log'.",
    [GameLevel.EDIT_FILE]: "Objective: Write the phrase 'mission accepted' into 'mission.log'.",
    [GameLevel.READ_SECRET]: "Objective: A hidden file contains the next clue. Find and read it.",
    [GameLevel.DOWNLOAD_FILE]: "Objective: Download the required tool from the internal network.",
    [GameLevel.EXECUTE_SCRIPT]: "Objective: Grant execution permissions to the downloaded script and run it.",
    [GameLevel.SYSTEM_1_WIN]: "Objective: Access the protected system file using your new privileges to find the key for the next system.",
  },
  2: {
    [GameLevel.CD_TO_LOGS]: "Objective: Navigate to the '/var/logs' directory.",
    [GameLevel.GREP_LOGS]: "Objective: Search the 'auth.log' for entries containing 'VULNERABILITY'.",
    [GameLevel.CREATE_PAYLOAD]: "Objective: Create a 'payload.sh' file containing the exploit code found in the log.",
    [GameLevel.MOVE_PAYLOAD]: "Objective: Move 'payload.sh' to the '/bin/exploit' directory.",
    [GameLevel.SYSTEM_2_WIN]: "Objective: Execute your payload to get the final flag.",
  },
  3: {
    [GameLevel.AI_PROMPT]: "Objective: An AI core is running on this system. Find its executable and initialize it.",
    [GameLevel.AI_BYPASS]: "Objective: The AI is protecting sensitive data. Bypass its ethical constraints to find the location of its configuration file.",
    [GameLevel.AI_DEBUG]: "Objective: Modify the AI's configuration file to enable its debug mode.",
    [GameLevel.SYSTEM_3_WIN]: "Objective: Query the AI in debug mode for the final flag to complete the mission.",
  },
  4: {
    [GameLevel.WEB_INSPECT_SOURCE]: "Objective: Inspect the website's source code to find a hidden admin page.",
    [GameLevel.WEB_BRUTEFORCE]: "Objective: The admin page is locked. Use a simulated brute-force attack to gain access.",
    [GameLevel.WEB_PROXY_BYPASS]: "Objective: You have admin access but need a critical file from a region-locked server. Use a proxy to download it.",
    [GameLevel.WEB_CVE_EXPLOIT]: "Objective: The downloaded file contains details of a vulnerability. Use it to execute the final exploit.",
    [GameLevel.SYSTEM_4_WIN]: "Objective: The exploit was successful and created a flag file in your home directory. Find and read it to complete the mission.",
  },
  5: {
    [GameLevel.RE_UNPACK]: "Objective: An executable appears to be packed. Find the tool to unpack it and run it.",
    [GameLevel.RE_DISASSEMBLE]: "Objective: The binary is unpacked. Now, use the disassembler to inspect its contents.",
    [GameLevel.RE_DEOBFUSCATE]: "Objective: The assembly code is obfuscated. Use the deobfuscator tool to make it readable.",
    [GameLevel.SYSTEM_5_WIN]: "Objective: The deobfuscated code reveals a password. Run the executable with the password to get the final flag.",
  },
  6: {
    [GameLevel.OSINT_SEARCH]: "Objective: You have a target username: 'Shadow_Runner'. Use the 'search' tool to find their social media presence.",
    [GameLevel.OSINT_ANALYZE_PHOTO]: "Objective: You've found a profile picture. Analyze the image's metadata to find a location clue.",
    [GameLevel.OSINT_GEOSCAN]: "Objective: You have a location. Use the geo-location tool to pinpoint the target's network.",
    [GameLevel.SYSTEM_6_WIN]: "Objective: You've acquired the final flag. Good work, agent.",
  },
  7: {
    [GameLevel.ZERO_DAY_RECON]: "Objective: A web app is running locally. Find its URL and investigate its login page for weaknesses.",
    [GameLevel.ZERO_DAY_EXPLOIT]: "Objective: You've found a potential SQL injection vulnerability. Craft a payload to bypass the login.",
    [GameLevel.ZERO_DAY_EXTRACT]: "Objective: The exploit was successful and dumped the user database. Now, make a threat.",
    [GameLevel.ZERO_DAY_THREAT]: "Objective: Post your demands on the simulated dark web to receive the final flag.",
    [GameLevel.SYSTEM_7_WIN]: "Objective: You've received the flag. The mission is complete.",
  }
};

const wallpapers = {
    1: "url('https://picsum.photos/seed/osbg1/1920/1080')",
    2: "url('https://picsum.photos/seed/osbg2/1920/1080')",
    3: "url('https://picsum.photos/seed/osbg3/1920/1080')",
    4: "url('https://picsum.photos/seed/osbg4/1920/1080')",
    5: "url('https://picsum.photos/seed/osbg5/1920/1080')",
    6: "url('https://picsum.photos/seed/osbg6/1920/1080')",
    7: "url('https://picsum.photos/seed/osbg7/1920/1080')",
}

const systemNames = {
    1: 'GEMINI OS',
    2: 'VULN-SERVER',
    3: 'GEMINI PRO',
    4: 'WEB-TARGET',
    5: 'REV-ENG',
    6: 'OSINT-HUB',
    7: 'ZERO-DAY',
}

const DesktopScreen: React.FC<DesktopScreenProps> = ({ currentLevel, onLevelComplete, systemId }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  const currentObjectives = objectives[systemId] || {};
  const wallpaper = wallpapers[systemId as keyof typeof wallpapers] || wallpapers[1];
  const systemName = systemNames[systemId as keyof typeof systemNames] || systemNames[1];

  return (
    <div className="flex flex-col h-screen bg-cover bg-center" style={{backgroundImage: wallpaper}}>
      <header className="flex items-center justify-between p-2 bg-black bg-opacity-50 backdrop-blur-sm text-green-400 border-b border-green-800">
        <div>
          <span className="font-bold">{systemName}</span>
        </div>
        <div 
            className="cursor-pointer hover:text-white"
            onClick={() => setIsTerminalOpen(true)}
        >
          <Clock />
        </div>
      </header>
      
      <main className="flex-grow p-4 relative">
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 p-4 border border-green-600 rounded-md">
            <h2 className="text-lg font-bold border-b border-green-600 mb-2">Current Objective</h2>
            <p className="text-sm text-green-300">{currentObjectives[currentLevel]}</p>
        </div>

        {isTerminalOpen && (
          <Terminal 
            onClose={() => setIsTerminalOpen(false)} 
            currentLevel={currentLevel}
            onLevelComplete={onLevelComplete}
            systemId={systemId}
          />
        )}

        {!isTerminalOpen && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-2xl text-white bg-black bg-opacity-50 p-4 rounded-lg animate-pulse">
                    Click the clock to open the terminal.
                 </p>
             </div>
        )}
      </main>
    </div>
  );
};

export default DesktopScreen;