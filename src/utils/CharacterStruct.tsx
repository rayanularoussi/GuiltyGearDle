type Gender = 'Male' | 'Female' | 'Non Binary' | 'Unknown';

export type Character = {
    id: number;
    character_name: string;
    gender: Gender;
    archetype: string;
    first_release_game: string;
    release_year: number;
    faction_affiliation: string;
    image_url: string;
};