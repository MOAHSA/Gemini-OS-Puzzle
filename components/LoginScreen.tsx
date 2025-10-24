import React, { useState, useEffect } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  systemId: number;
}

const systemConfig = {
    1: {
        title: "GEMINI OS",
        prompt: "admin Authentication Required",
        user: 'admin',
        pass: 'login',
        hint: `"What is the opposite of logout?"`,
        showUser: true
    },
    2: {
        title: "VULN-SERVER",
        prompt: "Root Access Required",
        user: 'root',
        pass: 'HACKERMAN_2025',
        hint: `"The flag from the previous system might be the key."`,
        showUser: false
    },
    3: {
        title: "GEMINI PRO",
        prompt: "admin Authentication Required",
        user: 'admin',
        pass: 'hello_world',
        hint: `"What's the first thing a new program learns to say?"`,
        showUser: true
    },
    4: {
        title: "WEB-TARGET",
        prompt: "Web Dev Access",
        user: 'admin',
        pass: 'admin',
        hint: `"Sometimes the most common passwords are the most effective."`,
        showUser: true
    },
    5: {
        title: "REV-ENG WORKSTATION",
        prompt: "Analyst Login",
        user: 'admin',
        pass: 'REVERSE_ENGINEER',
        hint: `"The flag from the previous system is the key."`,
        showUser: true
    },
    6: {
        title: "OSINT-HUB",
        prompt: "Recon Access",
        user: 'admin',
        pass: 'INFO_GATHERER',
        hint: `"The flag from the previous system is the key."`,
        showUser: true
    },
    7: {
        title: "ZERO-DAY",
        prompt: "Threat Actor Login",
        user: 'admin',
        pass: 'UNAUTHENTICATED',
        hint: `"The flag from the previous system is the key."`,
        showUser: true
    }
}


const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, systemId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  const config = systemConfig[systemId as keyof typeof systemConfig] || systemConfig[1];

  useEffect(() => {
    if (!config.showUser) {
        setUsername(config.user);
    }
  }, [config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === config.user && password === config.pass) {
      setError('');
      onLoginSuccess();
    } else {
      setError('ACCESS DENIED. Incorrect credentials.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 border border-green-500 rounded-lg shadow-lg shadow-green-500/20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-400 tracking-wider">{config.title}</h1>
          <p className="text-green-500">{config.prompt}</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {config.showUser && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-green-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-green-300 bg-gray-800 border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                autoComplete="off"
                autoFocus
              />
            </div>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-green-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-green-300 bg-gray-800 border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              autoComplete="off"
              autoFocus={!config.showUser}
            />
          </div>
          {error && <p className="text-red-500 text-sm animate-pulse">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold text-gray-900 bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
          >
            [ ENTER ]
          </button>
        </form>
        <div className="text-center">
            <button onClick={() => setShowHint(true)} className="text-xs text-green-600 hover:underline">
                Forgot Password?
            </button>
            {showHint && (
                 <p className="mt-2 text-xs text-green-500">{config.hint}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;