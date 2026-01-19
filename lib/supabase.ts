import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Types
export type GameStatus = {
    id: string;
    is_running: boolean;
    current_location: string;
    current_map_id: number;
    player_x: number;
    player_y: number;
    badges: number;
    pokedex_caught: number;
    pokedex_seen: number;
    money: number;
    play_time_seconds: number;
    total_battles: number;
    total_catches: number;
    current_objective: string;
    ai_mood: string;
    last_action: string;
    last_screenshot_url: string;
    updated_at: string;
};

export type Pokemon = {
    id: string;
    slot: number;
    pokedex_number: number;
    nickname: string | null;
    species: string;
    level: number;
    current_hp: number;
    max_hp: number;
    attack: number;
    defense: number;
    sp_attack: number;
    sp_defense: number;
    speed: number;
    exp: number;
    exp_to_next: number;
    status: string;
    move_1: string | null;
    move_1_pp: number | null;
    move_2: string | null;
    move_2_pp: number | null;
    move_3: string | null;
    move_3_pp: number | null;
    move_4: string | null;
    move_4_pp: number | null;
    sprite_url: string | null;
    is_shiny: boolean;
    caught_location: string | null;
    caught_at: string;
    updated_at: string;
};

export type Badge = {
    id: string;
    badge_name: string;
    badge_number: number;
    gym_leader: string;
    gym_location: string;
    pokemon_type: string;
    obtained: boolean;
    obtained_at: string | null;
    attempts: number;
};

export type Battle = {
    id: string;
    battle_type: string;
    opponent_name: string | null;
    opponent_pokemon: string[];
    my_pokemon_used: string[];
    result: string;
    pokemon_caught: string | null;
    exp_gained: number;
    money_gained: number;
    location: string | null;
    turns: number;
    ai_strategy: string | null;
    created_at: string;
};

export type AIAction = {
    id: string;
    action_type: string;
    action_detail: string;
    reasoning: string | null;
    screenshot_before: string | null;
    screenshot_after: string | null;
    success: boolean;
    created_at: string;
};

export type GameEvent = {
    id: string;
    event_type: string;
    title: string;
    description: string | null;
    pokemon_involved: string | null;
    location: string | null;
    screenshot_url: string | null;
    created_at: string;
};

// Sprite URL helper
export function getPokemonSprite(pokedexNumber: number, shiny: boolean = false): string {
    const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    if (shiny) {
        return `${base}/shiny/${pokedexNumber}.png`;
    }
    return `${base}/${pokedexNumber}.png`;
}

// Type colors
export const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
};

// Format play time
export function formatPlayTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
