'use client';

import { GameEvent } from '@/lib/supabase';

interface EventsProps {
    events: GameEvent[];
}

const eventIcons: Record<string, string> = {
    badge: '🏅',
    evolution: '✨',
    catch: '🎯',
    item: '🎁',
    milestone: '🎮',
};

const eventColors: Record<string, string> = {
    badge: 'from-yellow-600/20 to-yellow-900/20 border-yellow-500/30',
    evolution: 'from-purple-600/20 to-purple-900/20 border-purple-500/30',
    catch: 'from-green-600/20 to-green-900/20 border-green-500/30',
    item: 'from-blue-600/20 to-blue-900/20 border-blue-500/30',
    milestone: 'from-red-600/20 to-red-900/20 border-red-500/30',
};

export function Events({ events }: EventsProps) {
    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <h3 className="text-[14px] font-bold text-white mb-4 flex items-center gap-2">
                <span>📰</span> RECENT EVENTS
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto terminal-scroll">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`bg-gradient-to-br ${eventColors[event.event_type] || eventColors.milestone} rounded-lg p-3 border`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-2xl shrink-0">
                                {eventIcons[event.event_type] || '📌'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="text-[10px] font-bold text-white">
                                        {event.title}
                                    </div>
                                    <div className="text-[8px] text-gray-500 shrink-0 ml-2">
                                        {new Date(event.created_at).toLocaleTimeString()}
                                    </div>
                                </div>
                                {event.description && (
                                    <div className="text-[8px] text-gray-400 mt-1">
                                        {event.description}
                                    </div>
                                )}
                                <div className="flex gap-2 mt-2 text-[8px]">
                                    {event.pokemon_involved && (
                                        <span className="bg-black/30 px-2 py-0.5 rounded text-purple-300">
                                            🐾 {event.pokemon_involved}
                                        </span>
                                    )}
                                    {event.location && (
                                        <span className="bg-black/30 px-2 py-0.5 rounded text-blue-300">
                                            📍 {event.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-[10px]">
                        Nenhum evento registrado...
                    </div>
                )}
            </div>
        </div>
    );
}
