'use client';

import { GameStatus } from '@/lib/supabase';

interface StatsProps {
    status: GameStatus;
}

export function Stats({ status }: StatsProps) {
    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <h3 className="text-[14px] font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span> STATS
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {/* Pokedex */}
                <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 rounded-lg p-3 border border-red-500/30">
                    <div className="text-2xl mb-1">📱</div>
                    <div className="text-[8px] text-gray-400 uppercase">Pokédex</div>
                    <div className="text-[14px] font-bold text-white">
                        {status.pokedex_caught}
                        <span className="text-gray-500 text-[10px]"> / 151</span>
                    </div>
                    <div className="text-[8px] text-gray-500">
                        {status.pokedex_seen} vistos
                    </div>
                </div>

                {/* Battles */}
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 rounded-lg p-3 border border-yellow-500/30">
                    <div className="text-2xl mb-1">⚔️</div>
                    <div className="text-[8px] text-gray-400 uppercase">Batalhas</div>
                    <div className="text-[14px] font-bold text-white">
                        {status.total_battles}
                    </div>
                    <div className="text-[8px] text-gray-500">
                        total realizadas
                    </div>
                </div>

                {/* Catches */}
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-[8px] text-gray-400 uppercase">Capturas</div>
                    <div className="text-[14px] font-bold text-white">
                        {status.total_catches}
                    </div>
                    <div className="text-[8px] text-gray-500">
                        pokémon capturados
                    </div>
                </div>

                {/* Money */}
                <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 rounded-lg p-3 border border-green-500/30">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-[8px] text-gray-400 uppercase">Dinheiro</div>
                    <div className="text-[14px] font-bold text-white">
                        ${status.money.toLocaleString()}
                    </div>
                    <div className="text-[8px] text-gray-500">
                        pokédollars
                    </div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="mt-4 space-y-3">
                {/* Pokedex Completion */}
                <div>
                    <div className="flex justify-between text-[8px] mb-1">
                        <span className="text-gray-400">Pokédex Completion</span>
                        <span className="text-white">{Math.round((status.pokedex_caught / 151) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-red-400"
                            style={{ width: `${(status.pokedex_caught / 151) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Story Progress */}
                <div>
                    <div className="flex justify-between text-[8px] mb-1">
                        <span className="text-gray-400">Story Progress</span>
                        <span className="text-white">{Math.round((status.badges / 8) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                            style={{ width: `${(status.badges / 8) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
