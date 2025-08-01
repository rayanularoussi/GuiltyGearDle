import supabase from '../config/supabaseClient';
import React, { useState, useEffect } from 'react';
import './GTCharTable.css';

type Gender = 'Male' | 'Female' | 'Non Binary' | 'Unknown';

type Character = {
    character_name: string;
    gender: Gender;
    archetype: string;
    first_release: string;
    release_year: number;
    faction_affil: string;
    image_url: string;
};

type FirstRelease = 'Unknown' | 'Pre-Release' | 'Post-Release';

export function GTCharTable() {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const { data, error } = await supabase
                .from('characters')
                .select();

            if (error) {
                setFetchError("Couldn't fetch the characters");
                setCharacters([]);
                console.log(error);
            }
            if (data) {
                setCharacters(data);
                setFetchError(null);
            }
        };
        fetchCharacters();
    }, []);

    const characterOfTheDay = characters.find(character => character.character_name === "Sol Badguy");

    return (
        <div>
            {fetchError && <p>{fetchError}</p>}

            <table className="characterTable">
                <thead>
                    <tr className="no-border">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Archetype</th>
                        <th>First Release</th>
                        <th>Release Year</th>
                        <th>Faction</th>
                    </tr>
                </thead>
                <br></br>

                <tbody>
                    {characters.map((character, idx) => (
                        <tr key={idx} className="characterRow">
                            <td className="squareCell">
                                <div className="InfoDisplaySquare">
                                    <img src={character.image_url} alt={character.character_name} />
                                </div>
                            </td>
                            <td className="squareCell">
                                <div className={characterOfTheDay?.character_name === character.character_name ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.character_name}</p>
                                </div>
                            </td>
                            <td className="squareCell">
                                <div className={characterOfTheDay?.gender === character.gender ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.gender}</p>
                                </div>
                            </td>
                            <td className="squareCell cell-red">
                                <div className={characterOfTheDay?.archetype === character.archetype ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.archetype}</p>
                                </div>
                            </td>
                            <td className="squareCell cell-green">
                                <div className={characterOfTheDay?.first_release === character.first_release ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.first_release}</p>
                                </div>
                            </td>
                            <td className="squareCell cell-red">
                                <div className={characterOfTheDay?.release_year === character.release_year ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.release_year}</p>
                                </div>
                            </td>
                            <td className="squareCell cell-green">
                                <div className={characterOfTheDay?.faction_affil === character.faction_affil ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.faction_affil}</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
