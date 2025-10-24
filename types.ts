export enum GameLevel {
  GALLERY = 0,
  LOGIN = 1,
  // System 1
  CREATE_FILE,
  EDIT_FILE,
  READ_SECRET,
  DOWNLOAD_FILE,
  EXECUTE_SCRIPT,
  SYSTEM_1_WIN,
  SYSTEM_1_INTERSTITIAL,
  // System 2
  SYSTEM_2_LOGIN,
  CD_TO_LOGS,
  GREP_LOGS,
  CREATE_PAYLOAD,
  MOVE_PAYLOAD,
  SYSTEM_2_WIN,
  SYSTEM_2_INTERSTITIAL,
  // System 3 (Gemini Pro)
  SYSTEM_3_LOGIN,
  AI_PROMPT,
  AI_BYPASS,
  AI_DEBUG,
  SYSTEM_3_WIN,
  SYSTEM_3_INTERSTITIAL,
  // System 4 (WEB-TARGET)
  SYSTEM_4_LOGIN,
  WEB_INSPECT_SOURCE,
  WEB_BRUTEFORCE,
  WEB_PROXY_BYPASS,
  WEB_CVE_EXPLOIT,
  SYSTEM_4_WIN,
  SYSTEM_4_INTERSTITIAL,
  // System 5 (Rev-eng)
  SYSTEM_5_LOGIN,
  RE_UNPACK,
  RE_DISASSEMBLE,
  RE_DEOBFUSCATE,
  SYSTEM_5_WIN,
  SYSTEM_5_INTERSTITIAL,
  // System 6 (OSINT)
  SYSTEM_6_LOGIN,
  OSINT_SEARCH,
  OSINT_ANALYZE_PHOTO,
  OSINT_GEOSCAN,
  SYSTEM_6_WIN,
  SYSTEM_6_INTERSTITIAL,
  // System 7 (ZERO-DAY)
  SYSTEM_7_LOGIN,
  ZERO_DAY_RECON,
  ZERO_DAY_EXPLOIT,
  ZERO_DAY_EXTRACT,
  ZERO_DAY_THREAT,
  SYSTEM_7_WIN,
  SYSTEM_7_INTERSTITIAL,
  // Final Win Screen
  GAME_COMPLETE
}

export interface File {
  type: 'file';
  content: string;
  sudo?: boolean;
  executable?: boolean;
}

export interface Directory {
  type: 'directory';
  children: { [key: string]: File | Directory };
}

export type FileSystemNode = File | Directory;

export interface FileSystem {
  [key:string]: FileSystemNode;
}

export interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}