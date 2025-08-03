import type { Character } from "../utils/CharacterStruct";
import React from 'react';

export function GTCharSearch(characters : Character[]) {
    return (
        <div className="filteredCharacters">
            {characters.map((character) => (
                <table key={character.id}>
                    <tbody>
                        <tr>
                            <td>
                                <p>{character.character_name}</p>
                                <img src={character.image_url} className="characterIconSearch" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}          
        </div>
    );
}