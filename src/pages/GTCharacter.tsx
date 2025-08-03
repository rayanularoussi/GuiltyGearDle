import { useEffect, useRef, useState } from "react";
import { GTCharTable } from "../components/GTCharTable";
import "./GTCharacter.css";
import supabase from "../config/supabaseClient";
import type { Character } from "../utils/CharacterStruct";
import { GTCharSearch } from "../components/GTCharSearch";

export function GTCharacter() {
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [shownCharacters, setShownCharacters] = useState<Character[]>([]);
    const [characterModalOpen, setCharacterModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    function addIdToLocalStorage(newId: number) {
        const chosenCharacters = JSON.parse(localStorage.getItem('chosenCharacters') || '[]');
        
        if (!chosenCharacters.includes(newId)){
            chosenCharacters.push(newId);
            localStorage.setItem('chosenCharacters', JSON.stringify(chosenCharacters));
             window.dispatchEvent(new CustomEvent("localStorageUpdated"));

        }
    }



    

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

    function handleSearchChange(input: string) {
        if (input === "") {
            setShownCharacters([]);
            setCharacterModalOpen(false);
            return;
        }

        const filtered = characters.filter((character) =>
            character.character_name.toLowerCase().startsWith(input.toLowerCase())
        );

        setShownCharacters(filtered);

        if (filtered.length > 0) {
            setCharacterModalOpen(true);
        } else {
            setCharacterModalOpen(false);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setCharacterModalOpen(false);
            }
        }

        if (characterModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [characterModalOpen]);



    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
        <div>
            <div className="MainTitle">Guess today's character</div>

            <div className="Instructions">
                <div className="ActualDay">Guess of {day}/{month}/{year}</div>
                <br></br>
                <button className="InfoButton">Infos</button>
                <br></br>
                <div className="SearchInputGroup" style={{ position: "relative" }}>
                <input
                    className="SearchInput"
                    type="text"
                    placeholder="Search for a character..."
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onClick={() => {

                        setCharacterModalOpen(true);
                    }}
                />
                <button className="SearchButton">
                    <p>{">"}</p>
                </button>

                {characterModalOpen && shownCharacters.length > 0 && (
                    <div className="filteredCharacters" ref={modalRef}>
                    {shownCharacters.map((character) => (
                        <table key={character.id} className="characterSearchTable">
                        <tbody>
                            <tr>
                            <td>
                                <button className="characterButton" onClick={() => addIdToLocalStorage(character.id)} >
                                    <ul className="characterButtonList">
                                        <li>
                                            <img
                                            src={character.image_url}
                                            className="characterIconSearch"
                                            alt={character.character_name}
                                            />
                                        </li>
                                        <li>
                                            <p>{character.character_name}</p>
                                        </li>
                                    </ul>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    ))}
                    </div>
                )}
                </div>
                <br></br>
            </div>
            <br></br>
            <GTCharTable />

        </div>
    )
}