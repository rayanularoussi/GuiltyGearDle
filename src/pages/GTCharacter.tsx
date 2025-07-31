import "./GTCharacter.css";
export function GTCharacter() {
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
                <div className="SearchInputGroup">
                    <input className="SearchInput" type="text" placeholder="Search for a character..."></input>
                    <button className="SearchButton">
                        <p>{">"}</p>
                    </button>
                </div>
                <br></br>
            </div>

        </div>
    )
}