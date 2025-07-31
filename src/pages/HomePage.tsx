import { useNavigate } from "react-router-dom"
import "./HomePage.css"

export function HomePage() {

    const nav = useNavigate();

    function handleClick(path: string) {
        nav(path);
    }

    return (
        <div>        
            <img src="Main Title.svg" className="MainTitle"></img>
            <div>
                <div className="ButtonsContainerBG">
                    <ul className="ButtonsContainer">
                        <li className="Button">
                            <div>
                                <button  className="GameModButton">
                                    <img src="GuessTheCharacter.svg" className="GameModImage" onClick={() => handleClick("/daredevil")}>
                                    </img>
                                </button>
                            </div>
                            <div>
                                <button  className="GameModButton">
                                    <img src="GuessTheTheme.svg" className="GameModImage">
                                    </img>
                                </button>
                            </div>
                            <div>
                                <button  className="GameModButton" onClick={() => handleClick("/vanquisher")}>
                                    <img src="GuessTheRank.svg" className="GameModImage">
                                    </img>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            
        </div>
    )
}
