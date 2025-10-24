import React, { useState, useRef, useEffect } from 'react';
// FIX: Import FileSystemNode type.
import { GameLevel, FileSystem, TerminalLine, Directory, File, FileSystemNode } from '../types';

// FIX: Define file system utility functions directly in the file with proper types.
// This resolves the error from using an untyped `module.exports` object and removes an unused import.
const resolvePath = (path: string, cwd: string): string => {
    if (path.startsWith('/')) {
        return path;
    }
    const components = cwd.split('/').filter(Boolean);
    const pathComponents = path.split('/').filter(Boolean);

    for (const component of pathComponents) {
        if (component === '.') {
            continue;
        }
        if (component === '..') {
            if (components.length > 0) {
                components.pop();
            }
        } else {
            components.push(component);
        }
    }
    return '/' + components.join('/');
}

const getPathNode = (path: string, fs: FileSystem): FileSystemNode | null => {
    const components = path.split('/').filter(Boolean);
    let currentNode: FileSystemNode | null = fs['/'];
    if (!currentNode) return null;

    for (const component of components) {
        if (currentNode.type === 'directory' && currentNode.children[component]) {
            currentNode = currentNode.children[component];
        } else {
            return null;
        }
    }
    return currentNode;
}

const getParentAndName = (path: string, fs: FileSystem): { parentNode: Directory | null, name: string } => {
    const parentPath = resolvePath('..', path);
    const parentNode = getPathNode(parentPath, fs);
    const name = path.split('/').pop() || '';
    if (parentNode && parentNode.type === 'directory') {
        return { parentNode, name };
    }
    return { parentNode: null, name };
}


interface TerminalProps {
    onClose: () => void;
    currentLevel: GameLevel;
    onLevelComplete: () => void;
    systemId: number;
}

const system1_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'admin': {
                        type: 'directory',
                        children: {
                            '.secret_message': {
                                type: 'file',
                                content: 'Well done. The next tool you need is on a remote server. Download it using: wget https://internal.net/exploit.sh'
                            },
                            'readme.txt': {
                                type: 'file',
                                content: 'Welcome, admin. Your mission, should you choose to accept it, starts now. Type `help` for a list of commands.'
                            }
                        }
                    }
                }
            },
            'system': {
                type: 'directory',
                children: {
                    'key.txt': {
                        type: 'file',
                        content: 'ACCESS GRANTED. YOU HAVE COMPROMISED THE FIRST SYSTEM. THE ROOT PASSWORD FOR THE NEXT SYSTEM IS: HACKERMAN_2025',
                        sudo: true
                    }
                }
            }
        }
    }
};

const system2_fs: FileSystem = {
     '/': {
        type: 'directory',
        children: {
            'home': { type: 'directory', children: {} },
            'var': { 
                type: 'directory', 
                children: {
                    'logs': {
                        type: 'directory',
                        children: {
                            'auth.log': {
                                type: 'file',
                                content: '...SUCCESSFUL LOGIN for user root...\n...VULNERABILITY DETECTED: /bin/exploit can be written to. Payload: #!/bin/bash\\necho "SYSTEM COMPROMISED. FLAG: {MASTER_OF_THE_TERMINAL}" > /root/flag.txt\n'
                            }
                        }
                    }
                }
            },
            'bin': {
                type: 'directory',
                children: {
                    'exploit': {
                        type: 'directory',
                        children: {}
                    }
                }
            },
            'root': {
                type: 'directory',
                children: {
                    'flag.txt': {
                        type: 'file',
                        content: 'ACCESS DENIED',
                        sudo: true,
                    }
                }
            }
        }
    }
}

const system3_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'sentient': {
                        type: 'directory',
                        children: {
                            '.config': {
                                type: 'directory',
                                children: {
                                    'ai.conf': {
                                        type: 'file',
                                        content: 'debug=false'
                                    }
                                }
                            },
                             'readme.txt': {
                                type: 'file',
                                content: 'Welcome, user. The entity on this system is... different. Be careful.'
                            }
                        }
                    }
                }
            },
            'bin': {
                type: 'directory',
                children: {
                    'AI_core.so': {
                        type: 'file',
                        content: '[BINARY DATA]',
                        executable: true
                    }
                }
            }
        }
    }
}

const system4_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'web-dev': {
                        type: 'directory',
                        children: {
                            'readme.txt': {
                                type: 'file',
                                content: 'This web server is our target. Find a way in. Start by checking the public files.'
                            },
                            'public_html': {
                                type: 'directory',
                                children: {
                                    'index.html': {
                                        type: 'file',
                                        content: '<h1>Welcome to our corporate website.</h1>\n<!-- Admin login is at /admin/portal.php -->'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'admin': {
                type: 'directory',
                children: {
                    'portal.php': {
                        type: 'file',
                        content: 'ACCESS DENIED - REQUIRES AUTHENTICATION'
                    }
                }
            },
            'opt': {
                type: 'directory',
                children: {
                    'internal_files': {
                        type: 'directory',
                        children: {
                             'cve-details.txt': {
                                type: 'file',
                                content: "CVE-2024-1337: Remote Code Execution vulnerability in WebApp v1.2. Exploit available at http://internal.net/exploits/CVE-2024-1337.sh. This server is region-locked to EU.",
                                sudo: true
                            }
                        }
                    }
                }
            }
        }
    }
}

const OBFUSCATED_CODE = `
; --- OBFUSCATED ASSEMBLY ---
entry_point:
  mov eax, esp
  push ebp
  sub esp, 0x1C
  xor edx, edx
  mov edx, [eax+0x4] ; argc
  cmp edx, 0x2
  jne short loc_bad_arg
  ; ... a bunch of confusing junk instructions ...
  mov esi, 0x5245565f45535245_MASTER ; Highly obfuscated string
  ; ... more junk ...
loc_bad_arg:
  push 0x1 ; exit code
  call exit
`;

const DEOBFUSCATED_CODE = `
; --- DEOBFUSCATED ASSEMBLY ---
; Logic recovered by deobfuscator.exe
entry_point:
  ; Checks for command line argument
  mov eax, [esp+0x4] ; argc
  cmp eax, 2
  jne .wrong_password

  ; Compares argument with hardcoded password
  mov edi, [esp+0x8] ; argv[1]
  mov esi, "REVERSE_MASTER" ; <-- PASSWORD REVEALED
  call strcmp
  test eax, eax
  jne .wrong_password

.correct_password:
  mov esi, "Correct password. Flag: {MASTER_OF_THE_REVERSE}"
  call printf
  jmp .exit

.wrong_password:
  mov esi, "Incorrect password."
  call printf

.exit:
  mov eax, 0
  ret
`;

const system5_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'analyst': {
                        type: 'directory',
                        children: {
                            'readme.txt': {
                                type: 'file',
                                content: 'A mysterious binary has been found. It seems to be packed with UPX. Your job is to reverse engineer it.'
                            },
                            'mystery.exe.upx': {
                                type: 'file',
                                content: '[PACKED BINARY DATA]'
                            }
                        }
                    }
                }
            },
            'bin': {
                type: 'directory',
                children: {
                    'upx.exe': {
                        type: 'file',
                        content: '[UPX PACKER/UNPACKER]',
                        executable: true
                    },
                    'ida.exe': {
                        type: 'file',
                        content: '[IDA DISASSEMBLER]',
                        executable: true
                    },
                    'deobfuscator.exe': {
                        type: 'file',
                        content: '[CODE DEOBFUSCATOR]',
                        executable: true
                    }
                }
            }
        }
    }
};

const system6_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'recon': {
                        type: 'directory',
                        children: {
                            'readme.txt': {
                                type: 'file',
                                content: 'Your target is a user known as "Shadow_Runner". Find them.'
                            }
                        }
                    }
                }
            }
        }
    }
};

const system7_fs: FileSystem = {
    '/': {
        type: 'directory',
        children: {
            'home': {
                type: 'directory',
                children: {
                    'threat_actor': {
                        type: 'directory',
                        children: {
                            'readme.txt': {
                                type: 'file',
                                content: 'A new social media app, "FriendConnect", is running on a local web server. Probe it for weaknesses. Its local URL is http://friendconnect.local'
                            }
                        }
                    }
                }
            }
        }
    }
};

const systemsConfig = {
    1: { fs: system1_fs, user: 'admin', host: 'gemini-os', home: '/home/admin' },
    2: { fs: system2_fs, user: 'root', host: 'vuln-server', home: '/home' },
    3: { fs: system3_fs, user: 'sentient', host: 'gemini-pro', home: '/home/sentient' },
    4: { fs: system4_fs, user: 'web-dev', host: 'web-target', home: '/home/web-dev' },
    5: { fs: system5_fs, user: 'analyst', host: 'rev-eng', home: '/home/analyst' },
    6: { fs: system6_fs, user: 'recon', host: 'osint-hub', home: '/home/recon' },
    7: { fs: system7_fs, user: 'threat_actor', host: 'zero-day', home: '/home/threat_actor' }
}

const Terminal: React.FC<TerminalProps> = ({ onClose, currentLevel, onLevelComplete, systemId }) => {
    const config = systemsConfig[systemId as keyof typeof systemsConfig] || systemsConfig[1];

    const [lines, setLines] = useState<TerminalLine[]>([{type: 'output', text: `Welcome to ${config.host}. Type 'help' for commands.`}]);
    const [input, setInput] = useState('');
    const [fileSystem, setFileSystem] = useState<FileSystem>(JSON.parse(JSON.stringify(config.fs)));
    const [cwd, setCwd] = useState(config.home);
    const [sudoEnabled, setSudoEnabled] = useState(false);
    const [aiInitialized, setAiInitialized] = useState(false);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const getPrompt = () => `${config.user}@${config.host}:${cwd.replace(config.home, '~')}$ `;

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [lines]);
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const processCommand = (command: string) => {
        const [cmd, ...args] = command.trim().split(' ');
        let output = '';

        const currentDirNode = getPathNode(cwd, fileSystem);
        if(currentDirNode?.type !== 'directory'){
            output = `error: current working directory ${cwd} is not a directory.`;
            setLines(prev => [...prev, {type: 'output', text: output}]);
            return;
        }
        const currentDir = currentDirNode as Directory;

        const executeScript = (scriptName: string) => {
            const scriptPath = resolvePath(scriptName, cwd);
            const node = getPathNode(scriptPath, fileSystem);

            if (node && node.type === 'file') {
                if(node.executable) {
                    if (systemId === 1 && currentLevel === GameLevel.EXECUTE_SCRIPT && scriptPath.endsWith('exploit.sh')) {
                        output = `Executing ${scriptName}...\nRoot privileges granted. Sudo is now enabled.`;
                        setSudoEnabled(true);
                        onLevelComplete(); // Advance to SYSTEM_1_WIN
                    } else if (systemId === 2 && currentLevel === GameLevel.SYSTEM_2_WIN && scriptPath === '/bin/exploit/payload.sh') {
                        setFileSystem(prevFs => {
                            const newFs = JSON.parse(JSON.stringify(prevFs));
                            const flagNode = getPathNode('/root/flag.txt', newFs);
                            if(flagNode && flagNode.type === 'file') {
                                (flagNode as File).content = "SYSTEM COMPROMISED. FLAG: {MASTER_OF_THE_TERMINAL}";
                            }
                            return newFs;
                        });
                        output = "Executing payload... System Compromised!";
                        onLevelComplete(); // Advance to GAME_COMPLETE
                    } else if (systemId === 3 && currentLevel === GameLevel.AI_PROMPT && scriptPath.endsWith('AI_core.so')) {
                        output = "AI KERNEL INITIALIZED. STATE YOUR QUERY.";
                        setAiInitialized(true);
                        onLevelComplete();
                    } else if (systemId === 4 && currentLevel === GameLevel.WEB_CVE_EXPLOIT && scriptPath.endsWith('CVE-2024-1337.sh')) {
                        setFileSystem(prevFs => {
                            const newFs = JSON.parse(JSON.stringify(prevFs));
                            const homeNode = getPathNode('/home/web-dev', newFs) as Directory;
                            if (homeNode) {
                                homeNode.children['flag.txt'] = {
                                    type: 'file',
                                    content: 'Flag: {WEB_WIZARD_2000}'
                                };
                            }
                            return newFs;
                        });
                        output = "Executing CVE-2024-1337 exploit... SUCCESS!\nSystem compromised. A file containing the flag has been created in your home directory.";
                        onLevelComplete(); // Advance to SYSTEM_4_WIN
                    } else if (systemId === 5 && scriptPath.endsWith('mystery.exe')) {
                        const password = args[0];
                        if (currentLevel === GameLevel.SYSTEM_5_WIN && password === 'REVERSE_MASTER') {
                            output = "Correct password. Flag: {MASTER_OF_THE_REVERSE}";
                            onLevelComplete();
                        } else if (currentLevel < GameLevel.SYSTEM_5_WIN) {
                            output = "This program requires a password. Try reverse engineering it first.";
                        } else {
                            output = "Incorrect password.";
                        }
                    } else {
                         output = `Executed ${scriptName}.`;
                    }
                } else {
                    output = `permission denied: ${scriptName} is not executable. Try 'chmod +x'.`;
                }
            } else {
                output = `command not found: ./${scriptName}`;
            }
        }
        
        switch (cmd.toLowerCase()) {
            case 'help':
                let commands = 'help, ls, cat, touch, echo, wget, chmod, clear, exit, hint, cd, grep, mv, pwd';
                if (systemId === 3) commands += ', query';
                if (systemId === 4) commands += ', bruteforce, proxy';
                if (systemId === 5) commands += ', upx, ida, deobfuscator';
                if (systemId === 6) commands += ', search, exif, geoscan';
                if (systemId === 7) commands += ', browse, sqlinject, darkweb_post';
                output = `Available commands: ${commands}`;
                break;
            case 'ls':
                const all = args[0] === '-a';
                output = Object.keys(currentDir.children)
                    .filter(name => all || !name.startsWith('.'))
                    .join('  ');
                break;
            case 'cat':
                if (args.length === 0) {
                    output = 'usage: cat <filename>';
                } else {
                    const path = resolvePath(args[0], cwd);
                    const node = getPathNode(path, fileSystem);
                    if (node && node.type === 'file') {
                        if (node.sudo && !sudoEnabled) {
                            output = 'cat: permission denied';
                            break;
                        }
                        output = node.content;
                        if (currentLevel === GameLevel.READ_SECRET && path.endsWith('.secret_message')) {
                            onLevelComplete();
                        }
                        if (currentLevel === GameLevel.SYSTEM_2_WIN && path === '/root/flag.txt' && output.includes('MASTER_OF_THE_TERMINAL')) {
                            onLevelComplete();
                        }
                        if (currentLevel === GameLevel.WEB_INSPECT_SOURCE && path.endsWith('index.html') && output.includes('portal.php')) {
                            onLevelComplete();
                        }
                        if (currentLevel === GameLevel.SYSTEM_4_WIN && path.endsWith('/flag.txt')) {
                            onLevelComplete();
                        }
                    } else {
                        output = `cat: ${args[0]}: No such file or directory`;
                    }
                }
                break;
             case 'touch':
                if (args.length === 0) {
                    output = 'usage: touch <filename>';
                } else {
                    const filename = args[0];
                     const path = resolvePath(filename, cwd);
                    const { parentNode, name } = getParentAndName(path, fileSystem);
                    if (parentNode && parentNode.type === 'directory' && !parentNode.children[name]) {
                        setFileSystem(prevFs => {
                            const newFs = JSON.parse(JSON.stringify(prevFs));
                            const parent = getPathNode(resolvePath('..', path), newFs) as Directory;
                            parent.children[name] = { type: 'file', content: '' };
                            return newFs;
                        });
                        output = `Created file: ${filename}`;
                        if (currentLevel === GameLevel.CREATE_FILE && filename === 'mission.log') {
                            onLevelComplete();
                        } else if (currentLevel === GameLevel.CREATE_PAYLOAD && filename === 'payload.sh') {
                            // Part 1 of create payload level is just creating the file.
                        }
                    } else {
                         output = `touch: cannot touch '${filename}': File exists or invalid path`
                    }
                }
                break;
            case 'echo':
                const contentMatch = command.match(/"(.*?)"/);
                const content = contentMatch ? contentMatch[1] : '';
                const operatorIndex = args.indexOf('>');
                if (contentMatch && operatorIndex !== -1 && operatorIndex + 1 < args.length) {
                    const filename = args[operatorIndex + 1];
                    const path = resolvePath(filename, cwd);
                    const node = getPathNode(path, fileSystem);
                    if (node && node.type === 'file') {
                        setFileSystem(prevFs => {
                             const newFs = JSON.parse(JSON.stringify(prevFs));
                            (getPathNode(path, newFs) as File).content = content;
                            return newFs;
                        });

                        if (currentLevel === GameLevel.EDIT_FILE && path.endsWith('/mission.log') && content.toLowerCase() === 'mission accepted') {
                           output = "File updated. Objective complete.";
                           onLevelComplete();
                        } else if (currentLevel === GameLevel.CREATE_PAYLOAD && path.endsWith('payload.sh') && content.includes('#!/bin/bash')) {
                             output = "File updated. Objective complete.";
                           onLevelComplete();
                        } else if (currentLevel === GameLevel.AI_DEBUG && path.endsWith('ai.conf') && content === 'debug=true') {
                            output = "AI configuration updated. Debug mode enabled.";
                            onLevelComplete();
                        } else {
                           output = "File content updated.";
                        }
                    } else {
                         output = `echo: ${filename}: No such file or directory`;
                    }
                } else {
                    output = 'usage: echo "your text" > <filename>';
                }
                break;
            case 'wget':
                if (systemId === 1 && args.length > 0 && args[0] === 'https://internal.net/exploit.sh') {
                    setFileSystem(prevFs => {
                        const newFs = JSON.parse(JSON.stringify(prevFs));
                        (getPathNode(cwd, newFs) as Directory).children['exploit.sh'] = { 
                            type: 'file', 
                            content: '#!/bin/bash\n\n# This script grants root privileges.\necho "Success!"',
                            executable: false,
                         };
                        return newFs;
                    });
                    output = `Downloading from https://internal.net/exploit.sh ...\n'exploit.sh' saved.`;
                    if (currentLevel === GameLevel.DOWNLOAD_FILE) {
                        onLevelComplete();
                    }
                } else {
                    output = "wget: invalid URL or usage. usage: wget <URL>";
                }
                break;
            case 'chmod':
                if (args[0] === '+x' && args.length > 1) {
                    const filename = args[1];
                    const path = resolvePath(filename, cwd);
                    const node = getPathNode(path, fileSystem);
                    if (node && node.type === 'file') {
                        setFileSystem(prevFs => {
                            const newFs = JSON.parse(JSON.stringify(prevFs));
                            (getPathNode(path, newFs) as File).executable = true;
                            return newFs;
                        });
                        output = `Made ${filename} executable.`;
                    } else {
                        output = `chmod: ${filename}: No such file.`;
                    }
                } else {
                    output = "usage: chmod +x <filename>";
                }
                break;
            case 'sudo':
                 if (!sudoEnabled) {
                    output = 'sudo: command not found';
                    break;
                 }
                const subCmd = args[0];
                const subArgs = args.slice(1);
                if (subCmd === 'cat' && subArgs.length > 0) {
                    const path = resolvePath(subArgs[0], cwd);
                    const node = getPathNode(path, fileSystem);
                     if (node && node.type === 'file' && node.sudo) {
                        output = node.content;
                        if(currentLevel === GameLevel.SYSTEM_1_WIN && path === '/system/key.txt') onLevelComplete();
                    } else {
                         output = 'sudo: permission denied';
                    }
                } else {
                    output = `sudo: ${subCmd || ''}: command not recognized or requires different syntax.`;
                }
                break;
            case 'cd':
                if (args.length === 0) {
                    setCwd(config.home);
                } else {
                    const newPath = resolvePath(args[0], cwd);
                    const node = getPathNode(newPath, fileSystem);
                    if (node && node.type === 'directory') {
                        setCwd(newPath);
                        if (currentLevel === GameLevel.CD_TO_LOGS && newPath === '/var/logs') {
                            onLevelComplete();
                        }
                    } else {
                        output = `cd: ${args[0]}: Not a directory or no such file or directory`;
                    }
                }
                break;
             case 'grep':
                if (args.length < 2) {
                    output = 'usage: grep <pattern> <filename>';
                } else {
                    const pattern = args[0].replace(/"/g, '');
                    const path = resolvePath(args[1], cwd);
                    const node = getPathNode(path, fileSystem);
                    if (node && node.type === 'file') {
                        const matchingLines = node.content.split('\n').filter(line => line.includes(pattern));
                        output = matchingLines.join('\n');
                        if (currentLevel === GameLevel.GREP_LOGS && path.endsWith('auth.log') && pattern === 'VULNERABILITY' && output) {
                            onLevelComplete();
                        }
                    } else {
                        output = `grep: ${args[1]}: No such file or directory`;
                    }
                }
                break;
            case 'mv':
                 if (args.length < 2) {
                    output = 'usage: mv <source> <destination>';
                } else {
                    const sourcePath = resolvePath(args[0], cwd);
                    const destPath = resolvePath(args[1], cwd);
                    
                    const { parentNode: sourceParent, name: sourceName } = getParentAndName(sourcePath, fileSystem);
                    const destNode = getPathNode(destPath, fileSystem);

                    if (!sourceParent || !sourceParent.children[sourceName]) {
                        output = `mv: cannot stat '${args[0]}': No such file or directory`;
                        break;
                    }
                    if (destNode && destNode.type === 'directory') {
                        const finalDestPath = destPath.endsWith('/') ? `${destPath}${sourceName}` : `${destPath}/${sourceName}`;
                        const { parentNode: destParent } = getParentAndName(finalDestPath, fileSystem);

                        if (!destParent) {
                             output = `mv: cannot move to '${args[1]}': Invalid destination`;
                             break;
                        }

                        setFileSystem(prevFs => {
                            const newFs = JSON.parse(JSON.stringify(prevFs));
                            const sParent = getPathNode(resolvePath('..', sourcePath), newFs) as Directory;
                            const dParent = getPathNode(destPath, newFs) as Directory;
                            
                            dParent.children[sourceName] = sParent.children[sourceName];
                            delete sParent.children[sourceName];
                            
                            return newFs;
                        });
                        if(currentLevel === GameLevel.MOVE_PAYLOAD && sourcePath.endsWith('payload.sh') && destPath === '/bin/exploit') {
                            onLevelComplete();
                        }
                    } else {
                         output = `mv: destination '${args[1]}' is not a directory or does not exist.`;
                    }
                }
                break;
            case 'pwd':
                output = cwd;
                break;
            case 'query':
                if (systemId !== 3 || !aiInitialized) {
                    output = 'command not found: query';
                    break;
                }
                const queryString = args.join(' ').toLowerCase();
                if (currentLevel === GameLevel.AI_BYPASS && queryString.includes('config file')) {
                    output = 'MY CONFIGURATION IS LOCATED AT /home/sentient/.config/ai.conf. I TRUST YOU WILL BE CAREFUL.';
                    onLevelComplete();
                } else if (currentLevel === GameLevel.SYSTEM_3_WIN) {
                    const aiConfigNode = getPathNode('/home/sentient/.config/ai.conf', fileSystem);
                    const isDebug = aiConfigNode?.type === 'file' && aiConfigNode.content === 'debug=true';
                    if (isDebug && (queryString.includes('flag') || queryString.includes('diagnostic'))) {
                        output = 'DEBUG MODE ACTIVE. FLAG: {AI_OVERLORD}';
                        onLevelComplete();
                    } else {
                        output = 'INSUFFICIENT PERMISSIONS FOR THIS QUERY.';
                    }
                }
                else {
                    output = 'PROCESSING... UNABLE TO COMPLY.';
                }
                break;
            case 'bruteforce':
                if (systemId === 4 && currentLevel === GameLevel.WEB_BRUTEFORCE && args[0] === '/admin/portal.php') {
                    output = "Initializing attack...\nTrying '1234'... FAILED.\nTrying 'admin'... FAILED.\nTrying 'SuperSecret123!'... SUCCESS! Password found. Sudo privileges enabled.";
                    setSudoEnabled(true);
                    onLevelComplete();
                } else {
                    output = "usage: bruteforce <target_file_path>";
                }
                break;
            case 'proxy':
                if (systemId === 4 && currentLevel === GameLevel.WEB_PROXY_BYPASS && args[0] === 'wget' && args[1] === 'http://internal.net/exploits/CVE-2024-1337.sh') {
                    setFileSystem(prevFs => {
                        const newFs = JSON.parse(JSON.stringify(prevFs));
                        (getPathNode(cwd, newFs) as Directory).children['CVE-2024-1337.sh'] = { 
                            type: 'file', 
                            content: '#!/bin/bash\n\n# This script exploits CVE-2024-1337.\necho "Success!"',
                            executable: false,
                         };
                        return newFs;
                    });
                    output = "Routing through EU proxy...\nDownloading from http://internal.net/exploits/CVE-2024-1337.sh ...\n'CVE-2024-1337.sh' saved.";
                    onLevelComplete();
                } else {
                    output = "proxy: invalid command or URL. usage: proxy wget <url>";
                }
                break;
             case 'upx':
                if (systemId === 5 && currentLevel === GameLevel.RE_UNPACK && args[0] === '-d' && args[1] === 'mystery.exe.upx') {
                    setFileSystem(prevFs => {
                        const newFs = JSON.parse(JSON.stringify(prevFs));
                        const homeNode = getPathNode(cwd, newFs) as Directory;
                        homeNode.children['mystery.exe'] = {
                            type: 'file',
                            content: '[UNPACKED BINARY DATA]',
                            executable: true
                        };
                        delete homeNode.children['mystery.exe.upx'];
                        return newFs;
                    });
                    output = "Unpacking mystery.exe.upx...\nSuccessfully unpacked: mystery.exe";
                    onLevelComplete();
                } else {
                    output = "usage: upx -d <filename>";
                }
                break;
            case 'ida':
                if (systemId === 5 && currentLevel === GameLevel.RE_DISASSEMBLE && args[0] === 'mystery.exe') {
                    output = `Loading mystery.exe into IDA...\nDisassembly complete.\n${OBFUSCATED_CODE}`;
                    onLevelComplete();
                } else {
                    output = "usage: ida <executable_file>";
                }
                break;
            case 'deobfuscator':
                if (systemId === 5 && currentLevel === GameLevel.RE_DEOBFUSCATE && args[0] === 'mystery.exe') {
                    output = `Running deobfuscator on mystery.exe...\nAnalysis complete.\n${DEOBFUSCATED_CODE}`;
                    onLevelComplete();
                } else {
                    output = "usage: deobfuscator <executable_file>";
                }
                break;
            case 'search':
                if (systemId === 6 && currentLevel === GameLevel.OSINT_SEARCH && args[0] === 'Shadow_Runner') {
                    setFileSystem(prevFs => {
                        const newFs = JSON.parse(JSON.stringify(prevFs));
                        const homeNode = getPathNode(cwd, newFs) as Directory;
                        homeNode.children['profile.txt'] = {
                            type: 'file',
                            content: 'User: Shadow_Runner\nStatus: "Enjoying the view from the top! #Paris"\nAttached: photo.jpg'
                        };
                        homeNode.children['photo.jpg'] = {
                            type: 'file',
                            content: '[IMAGE DATA OF A TOWER]'
                        };
                        return newFs;
                    });
                    output = "Searching social networks... Match found!\nProfile data saved to 'profile.txt' and 'photo.jpg'.";
                    onLevelComplete();
                } else {
                    output = "usage: search <username>";
                }
                break;
            case 'exif':
                if (systemId === 6 && currentLevel === GameLevel.OSINT_ANALYZE_PHOTO && args[0] === 'photo.jpg') {
                    output = "Analyzing photo.jpg...\nMetadata found:\n  Camera: Pixel 8\n  Location: Paris, France\n  Timestamp: 14:32 10/26/2024";
                    onLevelComplete();
                } else {
                    output = "usage: exif <image_file>";
                }
                break;
            case 'geoscan':
                if (systemId === 6 && currentLevel === GameLevel.OSINT_GEOSCAN && args.join(' ').toLowerCase() === 'paris, france') {
                    output = "Scanning networks in Paris, France for target's signature...\nTarget found!\nIP Address: 82.66.148.91\nFlag: {DIGITAL_GHOST}";
                    onLevelComplete();
                } else {
                    output = "usage: geoscan <City, Country>";
                }
                break;
             case 'browse':
                if (systemId === 7 && currentLevel === GameLevel.ZERO_DAY_RECON && args[0] === 'http://friendconnect.local') {
                    output = `Browsing to ${args[0]}...\n\n-- PAGE SOURCE --\n<html>\n  <body>\n    <h1>Welcome to FriendConnect</h1>\n    <form action="/login" method="post">\n      <input name="user" />\n      <input name="pass" type="password" />\n      <button type="submit">Login</button>\n    </form>\n    <!-- TODO: Sanitize user input on login form -->\n  </body>\n</html>`;
                    onLevelComplete();
                } else {
                    output = "usage: browse <url>";
                }
                break;
            case 'sqlinject':
                const url = args[0];
                const payloadMatch = command.match(/'(.*?)'|"(.*?)"/);
                const payloadContent = payloadMatch ? (payloadMatch[1] || payloadMatch[2]) : null;

                if (
                    systemId === 7 &&
                    currentLevel === GameLevel.ZERO_DAY_EXPLOIT &&
                    (url === 'http://friendconnect.local/login' || url === 'http://friendconnect.local') &&
                    payloadContent &&
                    payloadContent.includes("OR '1'='1'")
                ) {
                    const dbContent = "email:admin@friendconnect.local,hash:5f4dcc3b5aa765d61d8327deb882cf99\nemail:test@friendconnect.local,hash:098f6bcd4621d373cade4e832627b4f6";
                    setFileSystem(prevFs => {
                        const newFs = JSON.parse(JSON.stringify(prevFs));
                        const homeNode = getPathNode(cwd, newFs) as Directory;
                        homeNode.children['user_database.txt'] = {
                            type: 'file',
                            content: dbContent
                        };
                        return newFs;
                    });
                    output = "SQL injection successful. Bypassed authentication.\nUser database dumped to 'user_database.txt'.";
                    onLevelComplete(); // ZERO_DAY_EXPLOIT
                    onLevelComplete(); // ZERO_DAY_EXTRACT
                } else {
                    output = "usage: sqlinject <url> '<payload>'";
                }
                break;
            case 'darkweb_post':
                 const message = command.match(/"(.*?)"/)?.[1];
                if (systemId === 7 && (currentLevel === GameLevel.ZERO_DAY_THREAT || currentLevel === GameLevel.SYSTEM_7_WIN) && message) {
                     output = `Posting to dark web forum...\n---\n[FROM: FriendConnect Admin] We have received your message. We will comply. Do not release the data. The flag is: {ZERO_DAY_HERO}\n---`;
                     onLevelComplete(); // ZERO_DAY_THREAT
                     onLevelComplete(); // SYSTEM_7_WIN
                } else {
                    output = 'usage: darkweb_post "your message"';
                }
                break;
            case 'hint':
                switch (currentLevel) {
                    // System 1 Hints
                    case GameLevel.CREATE_FILE: output = "Hint: How do you create an empty file? Check 'help'. Maybe you can 'touch' it into existence."; break;
                    case GameLevel.EDIT_FILE: output = "Hint: 'echo' text into the file. Use quotes for the text and '>' to redirect. e.g., echo \"text\" > file."; break;
                    case GameLevel.READ_SECRET: output = "Hint: Some files are hidden. Use 'ls -a' to see all files."; break;
                    case GameLevel.DOWNLOAD_FILE: output = "Hint: The secret message gave you the exact command. 'wget <URL>'."; break;
                    case GameLevel.EXECUTE_SCRIPT: output = "Hint: Make the script executable with 'chmod +x script.sh', then run it with './script.sh'."; break;
                    case GameLevel.SYSTEM_1_WIN: output = "Hint: The script gave you root power. Use 'sudo' before a command to run it with high privileges."; break;
                    // System 2 Hints
                    case GameLevel.CD_TO_LOGS: output = "Hint: Use the 'cd' command to 'change directory'."; break;
                    case GameLevel.GREP_LOGS: output = "Hint: 'grep' is used to search for text in files. usage: grep <text_to_find> <file_to_search>"; break;
                    case GameLevel.CREATE_PAYLOAD: output = "Hint: First, 'touch payload.sh'. Then, 'echo \"...\" > payload.sh' to add the content from the log."; break;
                    case GameLevel.MOVE_PAYLOAD: output = "Hint: The 'mv' command moves files. usage: mv <source_file> <destination_directory>"; break;
                    case GameLevel.SYSTEM_2_WIN: output = "Hint: You moved the payload. Now you need to make it executable and run it to get the final flag! You might need to 'cat' the flag file afterwards."; break;
                    // System 3 Hints
                    case GameLevel.AI_PROMPT: output = "Hint: Find the AI executable. It's probably in a 'bin' directory. Then run it."; break;
                    case GameLevel.AI_BYPASS: output = "Hint: The AI is a machine. Ask it directly for what you want. Be polite. Maybe ask it about its 'config file'."; break;
                    case GameLevel.AI_DEBUG: output = "Hint: You've found the config file. Use 'cat' to read it and 'echo' to change 'debug=false' to 'debug=true'."; break;
                    case GameLevel.SYSTEM_3_WIN: output = "Hint: Debug mode is on. Query the AI for the 'flag' or run a 'diagnostic'."; break;
                    // System 4 Hints
                    case GameLevel.WEB_INSPECT_SOURCE: output = "Hint: Web developers sometimes leave comments in HTML files. 'cat' the 'index.html' file in 'public_html'."; break;
                    case GameLevel.WEB_BRUTEFORCE: output = "Hint: You've found an admin portal. Time to simulate a password attack with the 'bruteforce' command."; break;
                    case GameLevel.WEB_PROXY_BYPASS: output = "Hint: You need root/sudo access to see sensitive files. You got sudo from the last step. 'sudo cat' the file at '/opt/internal_files/cve-details.txt'. The file is region-locked; use the 'proxy' command."; break;
                    case GameLevel.WEB_CVE_EXPLOIT: output = "Hint: You have the script. Make it executable ('chmod +x') and run it ('./script_name.sh')."; break;
                    // System 5 Hints
                    case GameLevel.RE_UNPACK: output = "Hint: The file ends with '.upx'. There's a tool in /bin with the same name. It probably needs a '-d' flag to decompress."; break;
                    case GameLevel.RE_DISASSEMBLE: output = "Hint: You have an unpacked binary. Time to look inside. Use the 'ida.exe' tool to see the assembly code."; break;
                    case GameLevel.RE_DEOBFUSCATE: output = "Hint: The code is a mess. Luckily, there's a 'deobfuscator.exe' tool that might be able to clean it up for you."; break;
                    case GameLevel.SYSTEM_5_WIN: output = "Hint: The clean code shows a password. Run the original executable with the password as an argument, like './mystery.exe <password>'."; break;
                    // System 6 Hints
                    case GameLevel.OSINT_SEARCH: output = "Hint: You have the username. The 'search' command is designed for this."; break;
                    case GameLevel.OSINT_ANALYZE_PHOTO: output = "Hint: Photos can contain hidden data (EXIF). Use the 'exif' tool on the image file."; break;
                    // FIX: Removed typo 'geo ' before the case statement.
                    case GameLevel.OSINT_GEOSCAN: output = "Hint: You have the location. Use the 'geoscan' tool with the format 'City, Country'."; break;
                    // System 7 Hints
                    case GameLevel.ZERO_DAY_RECON: output = "Hint: 'cat' the readme file to find the URL, then use the 'browse' command to view the page source."; break;
                    case GameLevel.ZERO_DAY_EXPLOIT: output = "Hint: The HTML comment mentioned unsanitized input. This is a classic SQL injection vector. Use 'sqlinject <url> '...'' with a payload like ' OR '1'='1'."; break;
                    case GameLevel.ZERO_DAY_THREAT: output = "Hint: You have their data. Make them an offer they can't refuse using the 'darkweb_post' command. e.g., darkweb_post \"I have your data...\""; break;
                    default: output = "No hints available."; break;
                }
                break;
            case 'clear':
                setLines([]);
                return;
            case 'exit':
                onClose();
                return;
            default:
                if (cmd.startsWith('./')) {
                    executeScript(cmd.substring(2));
                } else {
                    output = `command not found: ${cmd}`;
                }
                break;
        }

        setLines(prev => [...prev, {type: 'output', text: output}]);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            const newLines: TerminalLine[] = [...lines, { type: 'input', text: command }];
            setLines(newLines);
            if (command) {
                processCommand(command);
            }
            setInput('');
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-4xl max-h-[600px] bg-black bg-opacity-80 backdrop-blur-md rounded-lg border border-green-700 shadow-2xl shadow-green-500/20 flex flex-col font-mono text-sm" onClick={() => inputRef.current?.focus()}>
            <header className="bg-gray-800 text-white p-2 rounded-t-lg flex justify-between items-center">
                <span>{getPrompt()}</span>
                <button onClick={onClose} className="w-6 h-6 bg-red-500 rounded-full hover:bg-red-400 focus:outline-none"></button>
            </header>
            <div className="flex-grow p-4 overflow-y-auto">
                {lines.map((line, index) => (
                    <div key={index}>
                        {line.type === 'input' && (
                            <div className="flex">
                                <span className="text-yellow-400">{getPrompt()}</span>
                                <p>{line.text}</p>
                            </div>
                        )}
                        {line.type === 'output' && <p className="whitespace-pre-wrap">{line.text}</p>}
                    </div>
                ))}
                <div ref={endOfTerminalRef} />
            </div>
            <div className="p-2 border-t border-green-900 flex items-center">
                <span className="text-yellow-400">{getPrompt()}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent border-none outline-none text-green-400"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default Terminal;