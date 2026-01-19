'use client';

import { useEffect, useRef, useState } from 'react';
import { AIAction } from '@/lib/supabase';
import { terminalMessages } from '@/lib/mockData';

interface TerminalProps {
    actions: AIAction[];
}

export function Terminal({ actions }: TerminalProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<typeof terminalMessages>([]);
    const [messageIndex, setMessageIndex] = useState(0);

    // Simulate streaming messages
    useEffect(() => {
        if (messageIndex < terminalMessages.length) {
            const timeout = setTimeout(() => {
                setMessages(prev => [...prev, terminalMessages[messageIndex]]);
                setMessageIndex(prev => prev + 1);
            }, 1500 + Math.random() * 2000);
            return () => clearTimeout(timeout);
        } else {
            // Loop back
            const timeout = setTimeout(() => {
                setMessageIndex(0);
                setMessages([]);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [messageIndex]);

    // Auto scroll only inside terminal container
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    const getColor = (type: string) => {
        switch (type) {
            case 'system': return 'text-gray-400';
            case 'ai': return 'text-cyan-400';
            case 'move': return 'text-green-400';
            case 'battle': return 'text-yellow-400';
            case 'success': return 'text-green-500';
            case 'error': return 'text-red-400';
            default: return 'text-white';
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'system': return '⚙️';
            case 'ai': return '🤖';
            case 'move': return '🎮';
            case 'battle': return '⚔️';
            case 'success': return '✅';
            case 'error': return '❌';
            default: return '>';
        }
    };

    return (
        <div className="bg-gray-900 rounded-xl retro-border overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-[10px] text-gray-400 ml-2">claude-ai@pokeclaude:~</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[8px] text-green-400">STREAMING</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div ref={containerRef} className="h-64 overflow-y-auto terminal-scroll p-4 font-mono">
                {/* Initial boot sequence */}
                <div className="text-[10px] text-gray-500 mb-4">
                    <div>PokeClaude AI Engine v1.0.0</div>
                    <div>Initializing Claude Vision API...</div>
                    <div>Connecting to mGBA emulator...</div>
                    <div className="text-green-500">Connection established!</div>
                    <div className="my-2 border-b border-gray-700" />
                </div>

                {/* Messages */}
                {messages.map((msg, i) => (
                    <div key={i} className={`text-[10px] mb-1 ${getColor(msg.type)} animate-slide-up`}>
                        <span className="mr-2">{getIcon(msg.type)}</span>
                        <span className="text-gray-600">
                            [{new Date().toLocaleTimeString()}]
                        </span>
                        <span className="ml-2">{msg.message}</span>
                    </div>
                ))}

                {/* AI Actions from props */}
                {actions.slice(-5).map((action) => (
                    <div key={action.id} className="text-[10px] mb-2 animate-slide-up">
                        <div className="text-cyan-400">
                            <span className="mr-2">🤖</span>
                            <span className="text-gray-600">
                                [{new Date(action.created_at).toLocaleTimeString()}]
                            </span>
                            <span className="ml-2">{action.action_detail}</span>
                        </div>
                        {action.reasoning && (
                            <div className="text-gray-500 ml-6 mt-0.5 italic">
                                → {action.reasoning}
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing indicator */}
                <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span>🤖</span>
                    <span className="cursor-blink">Analyzing next move</span>
                </div>
            </div>

            {/* Terminal Footer */}
            <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                <div className="flex justify-between items-center text-[8px] text-gray-500">
                    <span>Actions/min: ~12</span>
                    <span>Latency: 45ms</span>
                    <span>Claude Sonnet 4</span>
                </div>
            </div>
        </div>
    );
}
