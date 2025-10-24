import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import DesktopScreen from './components/DesktopScreen';
import { GameLevel } from './types';
import WinScreen from './components/WinScreen';
import SystemWinScreen from './components/SystemWinScreen';
import DistributionGallery from './components/DistributionGallery';

const App: React.FC = () => {
  const [systemId, setSystemId] = useState(1);
  const [level, setLevel] = useState<GameLevel>(GameLevel.GALLERY);

  const handleLevelComplete = useCallback(() => {
    setLevel(prevLevel => {
      switch (prevLevel) {
        case GameLevel.SYSTEM_1_WIN:
          return GameLevel.SYSTEM_1_INTERSTITIAL;
        case GameLevel.SYSTEM_1_INTERSTITIAL:
          setSystemId(2);
          return GameLevel.SYSTEM_2_LOGIN;
        case GameLevel.SYSTEM_2_WIN:
          return GameLevel.SYSTEM_2_INTERSTITIAL;
        case GameLevel.SYSTEM_2_INTERSTITIAL:
          setSystemId(3);
          return GameLevel.SYSTEM_3_LOGIN;
        case GameLevel.SYSTEM_3_WIN:
          return GameLevel.SYSTEM_3_INTERSTITIAL;
        case GameLevel.SYSTEM_3_INTERSTITIAL:
          setSystemId(4);
          return GameLevel.SYSTEM_4_LOGIN;
        case GameLevel.SYSTEM_4_WIN:
          return GameLevel.SYSTEM_4_INTERSTITIAL;
        case GameLevel.SYSTEM_4_INTERSTITIAL:
          setSystemId(5);
          return GameLevel.SYSTEM_5_LOGIN;
        case GameLevel.SYSTEM_5_WIN:
            return GameLevel.SYSTEM_5_INTERSTITIAL;
        case GameLevel.SYSTEM_5_INTERSTITIAL:
            setSystemId(6);
            return GameLevel.SYSTEM_6_LOGIN;
        case GameLevel.SYSTEM_6_WIN:
            return GameLevel.SYSTEM_6_INTERSTITIAL;
        case GameLevel.SYSTEM_6_INTERSTITIAL:
            setSystemId(7);
            return GameLevel.SYSTEM_7_LOGIN;
        case GameLevel.SYSTEM_7_WIN:
            return GameLevel.SYSTEM_7_INTERSTITIAL;
        case GameLevel.SYSTEM_7_INTERSTITIAL:
            return GameLevel.GAME_COMPLETE;
        default:
          return prevLevel + 1;
      }
    });
  }, []);

  const handleSystemSelect = (system: 'zero-to-hero' | 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    switch (system) {
      case 'zero-to-hero':
      case 1:
        setSystemId(1);
        setLevel(GameLevel.LOGIN);
        break;
      case 2:
        setSystemId(2);
        setLevel(GameLevel.SYSTEM_2_LOGIN);
        break;
      case 3:
        setSystemId(3);
        setLevel(GameLevel.SYSTEM_3_LOGIN);
        break;
      case 4:
        setSystemId(4);
        setLevel(GameLevel.SYSTEM_4_LOGIN);
        break;
      case 5:
        setSystemId(5);
        setLevel(GameLevel.SYSTEM_5_LOGIN);
        break;
      case 6:
        setSystemId(6);
        setLevel(GameLevel.SYSTEM_6_LOGIN);
        break;
      case 7:
        setSystemId(7);
        setLevel(GameLevel.SYSTEM_7_LOGIN);
        break;
    }
  };
  
  const handleBackToGallery = useCallback(() => {
    setSystemId(1);
    setLevel(GameLevel.GALLERY);
  }, []);

  const renderLevel = () => {
    switch (level) {
      case GameLevel.GALLERY:
        return <DistributionGallery onSelectSystem={handleSystemSelect} />;

      case GameLevel.LOGIN:
        return <LoginScreen systemId={1} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_2_LOGIN:
        return <LoginScreen systemId={2} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_3_LOGIN:
        return <LoginScreen systemId={3} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_4_LOGIN:
        return <LoginScreen systemId={4} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_5_LOGIN:
        return <LoginScreen systemId={5} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_6_LOGIN:
        return <LoginScreen systemId={6} onLoginSuccess={handleLevelComplete} />;
      case GameLevel.SYSTEM_7_LOGIN:
        return <LoginScreen systemId={7} onLoginSuccess={handleLevelComplete} />;
      
      case GameLevel.CREATE_FILE:
      case GameLevel.EDIT_FILE:
      case GameLevel.READ_SECRET:
      case GameLevel.DOWNLOAD_FILE:
      case GameLevel.EXECUTE_SCRIPT:
      case GameLevel.SYSTEM_1_WIN:
        return <DesktopScreen systemId={1} currentLevel={level} onLevelComplete={handleLevelComplete} />;
      
      case GameLevel.SYSTEM_1_INTERSTITIAL:
        return <SystemWinScreen systemId={1} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.CD_TO_LOGS:
      case GameLevel.GREP_LOGS:
      case GameLevel.CREATE_PAYLOAD:
      case GameLevel.MOVE_PAYLOAD:
      case GameLevel.SYSTEM_2_WIN:
        return <DesktopScreen systemId={2} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_2_INTERSTITIAL:
        return <SystemWinScreen systemId={2} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.AI_PROMPT:
      case GameLevel.AI_BYPASS:
      case GameLevel.AI_DEBUG:
      case GameLevel.SYSTEM_3_WIN:
        return <DesktopScreen systemId={3} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_3_INTERSTITIAL:
        return <SystemWinScreen systemId={3} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.WEB_INSPECT_SOURCE:
      case GameLevel.WEB_BRUTEFORCE:
      case GameLevel.WEB_PROXY_BYPASS:
      case GameLevel.WEB_CVE_EXPLOIT:
      case GameLevel.SYSTEM_4_WIN:
        return <DesktopScreen systemId={4} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_4_INTERSTITIAL:
        return <SystemWinScreen systemId={4} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.RE_UNPACK:
      case GameLevel.RE_DISASSEMBLE:
      case GameLevel.RE_DEOBFUSCATE:
      case GameLevel.SYSTEM_5_WIN:
        return <DesktopScreen systemId={5} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_5_INTERSTITIAL:
        return <SystemWinScreen systemId={5} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.OSINT_SEARCH:
      case GameLevel.OSINT_ANALYZE_PHOTO:
      case GameLevel.OSINT_GEOSCAN:
      case GameLevel.SYSTEM_6_WIN:
        return <DesktopScreen systemId={6} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_6_INTERSTITIAL:
        return <SystemWinScreen systemId={6} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.ZERO_DAY_RECON:
      case GameLevel.ZERO_DAY_EXPLOIT:
      case GameLevel.ZERO_DAY_EXTRACT:
      case GameLevel.ZERO_DAY_THREAT:
      case GameLevel.SYSTEM_7_WIN:
        return <DesktopScreen systemId={7} currentLevel={level} onLevelComplete={handleLevelComplete} />;

      case GameLevel.SYSTEM_7_INTERSTITIAL:
        return <SystemWinScreen systemId={7} onNext={handleLevelComplete} onBackToGallery={handleBackToGallery} />;

      case GameLevel.GAME_COMPLETE:
        return <WinScreen onBackToGallery={handleBackToGallery} />;
      default:
        // Fallback for any unexpected state
        return <DistributionGallery onSelectSystem={handleSystemSelect} />;
    }
  };

  return (
    <div className="font-mono antialiased w-screen h-screen bg-gray-900 text-green-400">
      {renderLevel()}
    </div>
  );
};

export default App;