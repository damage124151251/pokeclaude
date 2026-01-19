'use client';

import { Badge, typeColors } from '@/lib/supabase';

interface BadgesProps {
    badges: Badge[];
}

const badgeIcons: Record<string, string> = {
    'Boulder Badge': '🪨',
    'Cascade Badge': '💧',
    'Thunder Badge': '⚡',
    'Rainbow Badge': '🌈',
    'Soul Badge': '💜',
    'Marsh Badge': '🔮',
    'Volcano Badge': '🌋',
    'Earth Badge': '🌍',
};

export function Badges({ badges }: BadgesProps) {
    const obtainedCount = badges.filter(b => b.obtained).length;

    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <h3 className="text-[14px] font-bold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <span>🏅</span> BADGES
                </span>
                <span className="text-yellow-400 text-[12px]">{obtainedCount}/8</span>
            </h3>

            {/* Badge Case */}
            <div className="bg-gradient-to-b from-red-900 to-red-950 rounded-lg p-4 border-4 border-yellow-600">
                <div className="grid grid-cols-4 gap-3">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="relative group"
                        >
                            {/* Badge Slot */}
                            <div
                                className={`
                                    aspect-square rounded-lg flex items-center justify-center text-2xl
                                    transition-all duration-300
                                    ${badge.obtained
                                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 badge-obtained shadow-lg'
                                        : 'bg-gray-800/80 opacity-40'
                                    }
                                `}
                            >
                                {badge.obtained ? (
                                    <span>{badgeIcons[badge.badge_name] || '🏅'}</span>
                                ) : (
                                    <span className="text-gray-600">?</span>
                                )}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                <div className="bg-gray-900 rounded-lg p-2 text-[8px] whitespace-nowrap shadow-xl border border-gray-700">
                                    <div className="font-bold text-white mb-1">{badge.badge_name}</div>
                                    <div className="text-gray-400">
                                        <div>Líder: {badge.gym_leader}</div>
                                        <div>Local: {badge.gym_location}</div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span>Tipo:</span>
                                            <span
                                                className="px-1 rounded"
                                                style={{ backgroundColor: typeColors[badge.pokemon_type.toLowerCase()] }}
                                            >
                                                {badge.pokemon_type}
                                            </span>
                                        </div>
                                        {badge.obtained && (
                                            <div className="text-green-400 mt-1">
                                                ✓ Obtained ({badge.attempts} attempts)
                                            </div>
                                        )}
                                        {!badge.obtained && badge.attempts > 0 && (
                                            <div className="text-yellow-400 mt-1">
                                                ⚔️ {badge.attempts} attempts
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Badge Case Label */}
                <div className="text-center mt-3 text-[8px] text-yellow-200/60">
                    KANTO LEAGUE BADGE CASE
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="flex justify-between text-[8px] text-gray-400 mb-1">
                    <span>League Progress</span>
                    <span>{Math.round((obtainedCount / 8) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500"
                        style={{ width: `${(obtainedCount / 8) * 100}%` }}
                    />
                </div>
            </div>

            {/* Next Target */}
            {obtainedCount < 8 && (
                <div className="mt-3 bg-gray-700/50 rounded-lg p-2">
                    <div className="text-[8px] text-gray-400">NEXT OBJECTIVE:</div>
                    <div className="text-[10px] text-white">
                        {badges.find(b => !b.obtained)?.badge_name} - {badges.find(b => !b.obtained)?.gym_leader}
                    </div>
                </div>
            )}
        </div>
    );
}
