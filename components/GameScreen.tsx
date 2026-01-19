'use client';

import { GameStatus } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface GameScreenProps {
    status: GameStatus;
}

// Simulated game frames for demo
const gameFrames = [
    { scene: 'forest', description: 'Exploring Viridian Forest...' },
    { scene: 'battle', description: 'Battle against Bug Catcher!' },
    { scene: 'walking', description: 'Walking through the route...' },
];

export function GameScreen({ status }: GameScreenProps) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(f => (f + 1) % gameFrames.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* Game Boy Style Frame */}
            <div className="bg-gray-800 p-4 rounded-xl retro-border">
                {/* Screen Header */}
                <div className="flex justify-between items-center mb-2 text-[10px] text-gray-400 px-2">
                    <span>mGBA Emulator</span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Connected
                    </span>
                </div>

                {/* Main Screen */}
                <div className="relative bg-[#9bbc0f] rounded-lg overflow-hidden scanlines" style={{ aspectRatio: '240/160' }}>
                    {/* Simulated Game View */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Forest Scene */}
                        <div className="w-full h-full relative bg-gradient-to-b from-[#228B22] to-[#006400]">
                            {/* Trees */}
                            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-2 opacity-80">
                                {Array.from({ length: 48 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`
                                            ${Math.random() > 0.6 ? 'text-[#0f380f]' : 'text-transparent'}
                                            text-center text-[16px] md:text-[20px]
                                        `}
                                    >
                                        {Math.random() > 0.5 ? '🌲' : '🌳'}
                                    </div>
                                ))}
                            </div>

                            {/* Path */}
                            <div className="absolute bottom-1/3 left-0 right-0 h-8 bg-[#C4A484] opacity-60" />

                            {/* Player Character */}
                            <div
                                className="absolute text-2xl md:text-3xl pixel-bounce z-10"
                                style={{
                                    left: `${40 + Math.sin(Date.now() / 1000) * 5}%`,
                                    bottom: '30%',
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                🧢
                            </div>

                            {/* Wild Pokemon Encounter Indicator */}
                            {currentFrame === 1 && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center animate-pulse">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">⚔️</div>
                                        <div className="text-white text-[12px]">WILD BATTLE!</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI Thinking Overlay */}
                    {showOverlay && (
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-[8px] text-cyan-400 flex items-center gap-1">
                            <span className="animate-spin">🤖</span>
                            <span>AI Analyzing...</span>
                        </div>
                    )}

                    {/* Location Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-3 py-2">
                        <div className="text-[10px] text-white flex justify-between items-center">
                            <span className="text-yellow-400">📍 {status.current_location}</span>
                            <span className="text-gray-400">{status.last_action}</span>
                        </div>
                    </div>
                </div>

                {/* Controls Display */}
                <div className="mt-3 flex justify-center gap-6">
                    {/* D-Pad */}
                    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-20">
                        <div />
                        <div className="bg-gray-700 rounded h-6 flex items-center justify-center text-[10px] text-gray-400 hover:bg-gray-600">▲</div>
                        <div />
                        <div className="bg-gray-700 rounded h-6 flex items-center justify-center text-[10px] text-gray-400 hover:bg-gray-600">◄</div>
                        <div className="bg-gray-600 rounded h-6" />
                        <div className="bg-gray-700 rounded h-6 flex items-center justify-center text-[10px] text-gray-400 hover:bg-gray-600">►</div>
                        <div />
                        <div className="bg-gray-700 rounded h-6 flex items-center justify-center text-[10px] text-gray-400 hover:bg-gray-600">▼</div>
                        <div />
                    </div>

                    {/* A/B Buttons */}
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-[12px] shadow-lg hover:bg-red-500">
                            A
                        </div>
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-[12px] shadow-lg hover:bg-red-500 -mt-4">
                            B
                        </div>
                    </div>

                    {/* Start/Select */}
                    <div className="flex gap-2 items-end">
                        <div className="bg-gray-600 px-2 py-1 rounded text-[8px] text-gray-300">SELECT</div>
                        <div className="bg-gray-600 px-2 py-1 rounded text-[8px] text-gray-300">START</div>
                    </div>
                </div>
            </div>

            {/* AI Status Box */}
            <div className="mt-4 bg-gray-800/80 rounded-lg p-3 retro-border">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400 text-lg">🤖</span>
                    <span className="text-[12px] text-white font-bold">CLAUDE AI</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                        status.ai_mood === 'FOCUSED' ? 'bg-blue-600' :
                        status.ai_mood === 'EXCITED' ? 'bg-yellow-600' :
                        status.ai_mood === 'STRATEGIC' ? 'bg-purple-600' :
                        'bg-gray-600'
                    }`}>
                        {status.ai_mood}
                    </span>
                </div>
                <div className="text-[10px] text-gray-300">
                    <span className="text-yellow-400">Objective:</span> {status.current_objective}
                </div>
            </div>
        </div>
    );
}
