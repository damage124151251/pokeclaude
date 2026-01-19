'use client';

import { GameStatus } from '@/lib/supabase';
import Image from 'next/image';

interface HeaderProps {
    status: GameStatus;
}

export function Header({ status }: HeaderProps) {
    return (
        <header className="border-b-4 border-yellow-500 bg-gradient-to-r from-red-600 via-red-500 to-red-600">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src="/logo.png"
                                alt="PokeClaude"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                POKECLAUDE
                            </h1>
                            <p className="text-[8px] md:text-[10px] text-yellow-200">
                                AI PLAYS POKEMON FIRE RED
                            </p>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center gap-4 text-[10px]">
                        {/* Running Status */}
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded">
                            <div className={`w-3 h-3 rounded-full ${status.is_running ? 'bg-green-400 status-online' : 'bg-red-500'}`} />
                            <span className="text-white">
                                {status.is_running ? 'LIVE' : 'OFFLINE'}
                            </span>
                        </div>

                        {/* Play Time */}
                        <div className="bg-black/30 px-3 py-2 rounded text-white">
                            <span className="text-gray-400">TIME </span>
                            {Math.floor(status.play_time_seconds / 3600).toString().padStart(2, '0')}:
                            {Math.floor((status.play_time_seconds % 3600) / 60).toString().padStart(2, '0')}
                        </div>

                        {/* Badges */}
                        <div className="bg-black/30 px-3 py-2 rounded text-white">
                            <span className="text-gray-400">BADGES </span>
                            <span className="text-yellow-400">{status.badges}</span>/8
                        </div>

                        {/* Money */}
                        <div className="bg-black/30 px-3 py-2 rounded text-white hidden md:block">
                            <span className="text-gray-400">$ </span>
                            <span className="text-green-400">{status.money.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
