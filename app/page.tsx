'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GameScreen } from '@/components/GameScreen';
import { PokemonTeam } from '@/components/PokemonTeam';
import { Badges } from '@/components/Badges';
import { Terminal } from '@/components/Terminal';
import { BattleLog } from '@/components/BattleLog';
import { Stats } from '@/components/Stats';
import { Events } from '@/components/Events';
import { MiniMap } from '@/components/MiniMap';
import { supabase, GameStatus, Pokemon, Badge, Battle, AIAction, GameEvent } from '@/lib/supabase';
import { mockGameStatus, mockTeam, mockBadges, mockBattles, mockActions, mockEvents } from '@/lib/mockData';

export default function Home() {
    const [status, setStatus] = useState<GameStatus>(mockGameStatus);
    const [team, setTeam] = useState<Pokemon[]>(mockTeam);
    const [badges, setBadges] = useState<Badge[]>(mockBadges);
    const [battles, setBattles] = useState<Battle[]>(mockBattles);
    const [actions, setActions] = useState<AIAction[]>(mockActions);
    const [events, setEvents] = useState<GameEvent[]>(mockEvents);
    const [useMock, setUseMock] = useState(true);

    // Try to fetch real data, fallback to mock
    useEffect(() => {
        async function fetchData() {
            try {
                // Status
                const { data: statusData } = await supabase
                    .from('game_status')
                    .select('*')
                    .eq('id', 'main')
                    .single();
                if (statusData) {
                    setStatus(statusData);
                    setUseMock(false);
                }

                // Team
                const { data: teamData } = await supabase
                    .from('pokemon_team')
                    .select('*')
                    .order('slot');
                if (teamData && teamData.length > 0) setTeam(teamData);

                // Badges
                const { data: badgesData } = await supabase
                    .from('badges')
                    .select('*')
                    .order('badge_number');
                if (badgesData && badgesData.length > 0) setBadges(badgesData);

                // Battles
                const { data: battlesData } = await supabase
                    .from('battles')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10);
                if (battlesData && battlesData.length > 0) setBattles(battlesData);

                // Actions
                const { data: actionsData } = await supabase
                    .from('ai_actions')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(20);
                if (actionsData && actionsData.length > 0) setActions(actionsData);

                // Events
                const { data: eventsData } = await supabase
                    .from('events')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10);
                if (eventsData && eventsData.length > 0) setEvents(eventsData);

            } catch (e) {
                console.log('Using mock data');
            }
        }

        fetchData();

        // Realtime subscriptions
        const channel = supabase
            .channel('realtime-all')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'game_status' },
                (payload) => setStatus(payload.new as GameStatus))
            .on('postgres_changes', { event: '*', schema: 'public', table: 'pokemon_team' },
                () => {
                    supabase.from('pokemon_team').select('*').order('slot')
                        .then(({ data }) => data && setTeam(data));
                })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'badges' },
                () => {
                    supabase.from('badges').select('*').order('badge_number')
                        .then(({ data }) => data && setBadges(data));
                })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'battles' },
                (payload) => setBattles(prev => [payload.new as Battle, ...prev].slice(0, 10)))
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ai_actions' },
                (payload) => setActions(prev => [payload.new as AIAction, ...prev].slice(0, 20)))
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' },
                (payload) => setEvents(prev => [payload.new as GameEvent, ...prev].slice(0, 10)))
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Simulate play time increasing
    useEffect(() => {
        if (!useMock) return;
        const interval = setInterval(() => {
            setStatus(prev => ({
                ...prev,
                play_time_seconds: prev.play_time_seconds + 1,
                updated_at: new Date().toISOString()
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, [useMock]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <Header status={status} />

            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column - Game Screen & Terminal */}
                    <div className="lg:col-span-5 space-y-6">
                        <GameScreen status={status} />
                        <Terminal actions={actions} />
                    </div>

                    {/* Middle Column - Team & Battles */}
                    <div className="lg:col-span-4 space-y-6">
                        <PokemonTeam team={team} />
                        <BattleLog battles={battles} />
                    </div>

                    {/* Right Column - Stats, Map, Badges, Events */}
                    <div className="lg:col-span-3 space-y-6">
                        <Stats status={status} />
                        <MiniMap status={status} />
                        <Badges badges={badges} />
                        <Events events={events} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[10px] text-gray-500">
                            <span className="text-red-500">🔴</span> PokeClaude v1.0 - AI Plays Pokemon
                        </div>
                        <div className="flex gap-4 text-[10px] text-gray-500">
                            <span>Powered by Claude AI</span>
                            <span>•</span>
                            <span>mGBA Emulator</span>
                            <span>•</span>
                            <span>Pokemon Fire Red</span>
                        </div>
                        <div className="text-[8px] text-gray-600">
                            Pokemon is a trademark of Nintendo/Game Freak. This is a fan project.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
