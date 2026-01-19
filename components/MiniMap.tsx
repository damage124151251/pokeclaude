'use client';

import { GameStatus } from '@/lib/supabase';

interface MiniMapProps {
    status: GameStatus;
}

// Kanto map simplified data
const kantoLocations = [
    { id: 0, name: 'Pallet Town', x: 3, y: 8, type: 'town' },
    { id: 1, name: 'Viridian City', x: 3, y: 6, type: 'city' },
    { id: 2, name: 'Viridian Forest', x: 3, y: 5, type: 'forest' },
    { id: 3, name: 'Pewter City', x: 3, y: 4, type: 'city', gym: 1 },
    { id: 4, name: 'Mt. Moon', x: 4, y: 4, type: 'cave' },
    { id: 5, name: 'Cerulean City', x: 6, y: 3, type: 'city', gym: 2 },
    { id: 6, name: 'Vermilion City', x: 6, y: 6, type: 'city', gym: 3 },
    { id: 7, name: 'Celadon City', x: 4, y: 5, type: 'city', gym: 4 },
    { id: 8, name: 'Lavender Town', x: 7, y: 5, type: 'town' },
    { id: 9, name: 'Fuchsia City', x: 5, y: 8, type: 'city', gym: 5 },
    { id: 10, name: 'Saffron City', x: 5, y: 5, type: 'city', gym: 6 },
    { id: 11, name: 'Cinnabar Island', x: 3, y: 9, type: 'island', gym: 7 },
    { id: 12, name: 'Indigo Plateau', x: 1, y: 2, type: 'elite' },
];

const locationIcons: Record<string, string> = {
    town: '🏠',
    city: '🏙️',
    forest: '🌲',
    cave: '⛰️',
    island: '🏝️',
    elite: '👑',
};

// Current location mapping
const locationMap: Record<string, number> = {
    'PALLET TOWN': 0,
    'VIRIDIAN CITY': 1,
    'VIRIDIAN FOREST': 2,
    'PEWTER CITY': 3,
    'MT. MOON': 4,
    'CERULEAN CITY': 5,
    'VERMILION CITY': 6,
    'CELADON CITY': 7,
    'LAVENDER TOWN': 8,
    'FUCHSIA CITY': 9,
    'SAFFRON CITY': 10,
    'CINNABAR ISLAND': 11,
    'INDIGO PLATEAU': 12,
};

export function MiniMap({ status }: MiniMapProps) {
    const currentLocationId = locationMap[status.current_location] ?? 2; // Default to Viridian Forest

    return (
        <div className="bg-gray-800 rounded-xl p-4 retro-border">
            <h3 className="text-[14px] font-bold text-white mb-4 flex items-center gap-2">
                <span>🗺️</span> KANTO MAP
            </h3>

            {/* Map Grid */}
            <div className="relative bg-gradient-to-b from-green-900/30 to-blue-900/30 rounded-lg p-2 border-2 border-gray-700">
                <div
                    className="grid gap-1"
                    style={{
                        gridTemplateColumns: 'repeat(9, 1fr)',
                        gridTemplateRows: 'repeat(10, 1fr)',
                    }}
                >
                    {/* Create 9x10 grid */}
                    {Array.from({ length: 90 }).map((_, i) => {
                        const x = i % 9;
                        const y = Math.floor(i / 9);

                        const location = kantoLocations.find(l => l.x === x && l.y === y);
                        const isCurrent = location && location.id === currentLocationId;

                        return (
                            <div
                                key={i}
                                className={`
                                    aspect-square rounded text-center flex items-center justify-center
                                    transition-all duration-200 relative text-[10px]
                                    ${location
                                        ? isCurrent
                                            ? 'bg-yellow-500/50 ring-2 ring-yellow-400 animate-pulse'
                                            : 'bg-gray-700/50 hover:bg-gray-600/50'
                                        : 'bg-transparent'
                                    }
                                `}
                                title={location?.name}
                            >
                                {location && (
                                    <>
                                        <span className={isCurrent ? 'animate-bounce' : ''}>
                                            {locationIcons[location.type]}
                                        </span>
                                        {location.gym && (
                                            <span className="absolute -top-1 -right-1 text-[8px] bg-red-600 rounded-full w-3 h-3 flex items-center justify-center">
                                                {location.gym}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Map Border Decorations */}
                <div className="absolute top-0 left-0 text-[8px] text-blue-400 -translate-x-1 -translate-y-1">N</div>
                <div className="absolute bottom-0 left-0 text-[8px] text-blue-400 -translate-x-1 translate-y-1">S</div>
            </div>

            {/* Current Location Info */}
            <div className="mt-3 bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-[8px] text-gray-400 uppercase">Current Location</div>
                        <div className="text-[12px] font-bold text-yellow-400">
                            📍 {status.current_location}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[8px] text-gray-400">Coordinates</div>
                        <div className="text-[10px] text-gray-300 font-mono">
                            X:{status.player_x} Y:{status.player_y}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-3 grid grid-cols-3 gap-1 text-[8px]">
                <div className="flex items-center gap-1 text-gray-400">
                    <span>🏙️</span> City
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <span>🏠</span> Town
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <span>🌲</span> Forest
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <span>⛰️</span> Cave
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <span>🏝️</span> Island
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                    <span>👑</span> League
                </div>
            </div>
        </div>
    );
}
