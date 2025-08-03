import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import './GTCharTable.css';
import type { Character } from '../utils/CharacterStruct';

export function GTCharTable() {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [chosenCharacters, setChosenCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const { data, error } = await supabase.from("characters").select();

            if (error) {
                setFetchError("Couldn't fetch characters");
            } else {
                setCharacters(data);
            }
        };

        fetchCharacters();
    }, []);

    useEffect(() => {
        const updateGuessedCharacters = () => {
            const guessedIds = JSON.parse(localStorage.getItem("chosenCharacters") || "[]");

            const reversedIds = guessedIds.slice().reverse();


            const guessed = reversedIds
                .map((id: number) => characters.find((character) => character.id === id))
                .filter((c: Character): c is Character => !!c);

            setChosenCharacters(guessed);
        };

        updateGuessedCharacters();

        const handleCustomEvent = () => {
            updateGuessedCharacters();
        };

        window.addEventListener("localStorageUpdated", handleCustomEvent);

        return () => {
            window.removeEventListener("localStorageUpdated", handleCustomEvent);
        };
    }, [characters]);

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

                <tbody>
                            {chosenCharacters.map((character) => (
                            <tr
                                key={character.id}
                                className={`characterRow animatedRow`}
                            >

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
                            <td className="squareCell">
                                <div className={characterOfTheDay?.archetype === character.archetype ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.archetype}</p>
                                </div>
                            </td>
                            <td className="squareCell">
                                <div className={characterOfTheDay?.first_release_game === character.first_release_game ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.first_release_game}</p>
                                </div>
                            </td>
                            <td className="squareCell">
                                <div className={characterOfTheDay?.release_year === character.release_year ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.release_year}</p>
                                </div>
                            </td>
                            <td className="squareCell">
                                <div className={characterOfTheDay?.faction_affiliation === character.faction_affiliation ? "InfoDisplaySquareRight" : "InfoDisplaySquareFalse"}>
                                    <p>{character.faction_affiliation}</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
