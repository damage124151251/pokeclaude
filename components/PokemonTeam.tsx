'use client';

import { Pokemon, getPokemonSprite } from '@/lib/supabase';
import Image from 'next/image';

interface PokemonTeamProps {
    team: Pokemon[];
}

function getHPColor(current: number, max: number): string {
    const percent = (current / max) * 100;
    if (percent > 50) return 'hp-high';
    if (percent > 20) return 'hp-mid';
    return 'hp-low';
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'PSN': return 'bg-purple-600';
        case 'BRN': return 'bg-orange-600';
        case 'SLP': return 'bg-gray-600';
        case 'FRZ': return 'bg-cyan-400';
        case 'PAR': return 'bg-yellow-500';
        default: return 'bg-green-600';
    }
}

export function PokemonTeam({ team }: PokemonTeamProps) {
    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <h3 className="text-[14px] font-bold text-white mb-4 flex items-center gap-2">
                <span>📦</span> PARTY POKEMON
            </h3>

            <div className="space-y-3">
                {team.map((pokemon, index) => (
                    <div
                        key={pokemon.id}
                        className="bg-gray-700/50 rounded-lg p-3 pokemon-card hover:bg-gray-700"
                    >
                        <div className="flex items-start gap-3">
                            {/* Pokemon Sprite */}
                            <div className="relative w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                                <Image
                                    src={getPokemonSprite(pokemon.pokedex_number, pokemon.is_shiny)}
                                    alt={pokemon.species}
                                    width={64}
                                    height={64}
                                    className="pixelated"
                                    unoptimized
                                />
                                {pokemon.is_shiny && (
                                    <span className="absolute -top-1 -right-1 text-[12px]">✨</span>
                                )}
                                {/* Slot number */}
                                <span className="absolute -top-2 -left-2 bg-red-600 text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center">
                                    {index + 1}
                                </span>
                            </div>

                            {/* Pokemon Info */}
                            <div className="flex-1 min-w-0">
                                {/* Name & Level */}
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <span className="text-[12px] font-bold text-white">
                                            {pokemon.nickname || pokemon.species.toUpperCase()}
                                        </span>
                                        {pokemon.nickname && (
                                            <span className="text-[8px] text-gray-400 ml-1">
                                                ({pokemon.species})
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-yellow-400">
                                        Lv.{pokemon.level}
                                    </span>
                                </div>

                                {/* HP Bar */}
                                <div className="mb-2">
                                    <div className="flex justify-between text-[8px] text-gray-400 mb-1">
                                        <span>HP</span>
                                        <span>{pokemon.current_hp}/{pokemon.max_hp}</span>
                                    </div>
                                    <div className="hp-bar">
                                        <div
                                            className={`hp-bar-fill ${getHPColor(pokemon.current_hp, pokemon.max_hp)}`}
                                            style={{ width: `${(pokemon.current_hp / pokemon.max_hp) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* EXP Bar */}
                                <div className="mb-2">
                                    <div className="flex justify-between text-[8px] text-gray-400 mb-1">
                                        <span>EXP</span>
                                        <span>{pokemon.exp}/{pokemon.exp_to_next}</span>
                                    </div>
                                    <div className="exp-bar">
                                        <div
                                            className="exp-bar-fill"
                                            style={{ width: `${(pokemon.exp / pokemon.exp_to_next) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    <span className={`text-[8px] px-2 py-0.5 rounded text-white ${getStatusColor(pokemon.status)}`}>
                                        {pokemon.status}
                                    </span>

                                    {/* Stats Mini */}
                                    <div className="flex gap-1 text-[7px] text-gray-500">
                                        <span title="Attack">⚔️{pokemon.attack}</span>
                                        <span title="Defense">🛡️{pokemon.defense}</span>
                                        <span title="Speed">💨{pokemon.speed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Moves */}
                        <div className="mt-2 grid grid-cols-2 gap-1">
                            {[
                                { name: pokemon.move_1, pp: pokemon.move_1_pp },
                                { name: pokemon.move_2, pp: pokemon.move_2_pp },
                                { name: pokemon.move_3, pp: pokemon.move_3_pp },
                                { name: pokemon.move_4, pp: pokemon.move_4_pp },
                            ].map((move, i) => (
                                move.name ? (
                                    <div
                                        key={i}
                                        className="bg-gray-800 px-2 py-1 rounded text-[8px] flex justify-between"
                                    >
                                        <span className="text-white truncate">{move.name}</span>
                                        <span className="text-gray-400">{move.pp}PP</span>
                                    </div>
                                ) : (
                                    <div key={i} className="bg-gray-800/50 px-2 py-1 rounded text-[8px] text-gray-600">
                                        ---
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: 6 - team.length }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="bg-gray-700/20 rounded-lg p-4 border-2 border-dashed border-gray-600 flex items-center justify-center"
                    >
                        <span className="text-gray-600 text-[10px]">Slot {team.length + i + 1} - Empty</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
