'use client';

import { Battle } from '@/lib/supabase';

interface BattleLogProps {
    battles: Battle[];
}

const resultIcons: Record<string, string> = {
    win: '🏆',
    lose: '💀',
    run: '🏃',
    catch: '🎯',
};

const resultColors: Record<string, string> = {
    win: 'text-green-400 bg-green-400/10',
    lose: 'text-red-400 bg-red-400/10',
    run: 'text-yellow-400 bg-yellow-400/10',
    catch: 'text-purple-400 bg-purple-400/10',
};

const battleTypeLabels: Record<string, string> = {
    wild: 'Wild',
    trainer: 'Trainer',
    gym: 'Gym',
    rival: 'Rival',
    elite4: 'Elite 4',
};

export function BattleLog({ battles }: BattleLogProps) {
    const totalWins = battles.filter(b => b.result === 'win').length;
    const totalCatches = battles.filter(b => b.result === 'catch').length;

    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
                    <span>⚔️</span> BATTLE LOG
                </h3>
                <div className="flex gap-2 text-[8px]">
                    <span className="text-green-400">🏆 {totalWins}</span>
                    <span className="text-purple-400">🎯 {totalCatches}</span>
                </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto terminal-scroll">
                {battles.map((battle) => (
                    <div
                        key={battle.id}
                        className={`rounded-lg p-3 ${resultColors[battle.result]} border border-gray-700/50`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{resultIcons[battle.result]}</span>
                                <div>
                                    <div className="text-[10px] font-bold text-white">
                                        {battle.opponent_name || `Wild ${battle.opponent_pokemon[0]}`}
                                    </div>
                                    <div className="text-[8px] text-gray-400">
                                        {battleTypeLabels[battle.battle_type]} • {battle.location}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right text-[8px]">
                                <div className="text-gray-400">
                                    {new Date(battle.created_at).toLocaleTimeString()}
                                </div>
                                <div className="text-gray-500">
                                    {battle.turns} turnos
                                </div>
                            </div>
                        </div>

                        {/* Battle Details */}
                        <div className="grid grid-cols-2 gap-2 text-[8px]">
                            {/* Enemy Pokemon */}
                            <div className="bg-black/20 rounded p-2">
                                <div className="text-gray-400 mb-1">Opponent:</div>
                                <div className="flex flex-wrap gap-1">
                                    {battle.opponent_pokemon.map((poke, i) => (
                                        <span key={i} className="bg-red-900/50 px-1.5 py-0.5 rounded text-red-300">
                                            {poke}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* My Pokemon */}
                            <div className="bg-black/20 rounded p-2">
                                <div className="text-gray-400 mb-1">My team:</div>
                                <div className="flex flex-wrap gap-1">
                                    {battle.my_pokemon_used.map((poke, i) => (
                                        <span key={i} className="bg-blue-900/50 px-1.5 py-0.5 rounded text-blue-300">
                                            {poke}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Rewards */}
                        <div className="mt-2 flex gap-3 text-[8px]">
                            {battle.exp_gained > 0 && (
                                <span className="text-blue-400">+{battle.exp_gained} EXP</span>
                            )}
                            {battle.money_gained > 0 && (
                                <span className="text-green-400">+${battle.money_gained}</span>
                            )}
                            {battle.pokemon_caught && (
                                <span className="text-purple-400">Caught: {battle.pokemon_caught}</span>
                            )}
                        </div>

                        {/* AI Strategy */}
                        {battle.ai_strategy && (
                            <div className="mt-2 bg-black/30 rounded p-2">
                                <div className="text-[8px] text-cyan-400 flex items-start gap-1">
                                    <span>🤖</span>
                                    <span className="text-gray-300 italic">{battle.ai_strategy}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {battles.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-[10px]">
                        No battles recorded yet...
                    </div>
                )}
            </div>
        </div>
    );
}
