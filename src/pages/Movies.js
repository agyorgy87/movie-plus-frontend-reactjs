import '../css/PagesStyle.css';
import React, {useState, useEffect, useRef} from 'react';
import NavigationBar from '../components/NavigationBar.js';
import Footer from '../components/Footer.js';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { MovieContext } from "../context/MovieContext.js";

const Movies = () => { 

    let navigate = useNavigate();

    const movieDetails = useContext(MovieContext);

    const allMovies = useRef([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    //const [moviesTitle, setMoviesTitle] = useState("");
    const [selectedMoviesGenre, setSelectedMoviesGenre] = useState([]);

    useEffect (() => {
        fetch("http://localhost:4000/all-movies")
                .then(data => data.json())
                .then(parsedData => {
                  allMovies.current = parsedData;
                  setVisibleMovies(parsedData);
                })
      }, [])

    useEffect(() => { 
        moviesGenre();
    },[selectedMoviesGenre])
      
    
    const moviesGenre = () => {

        let filterMoviesGenre = allMovies.current
        
        if(selectedMoviesGenre !== "none"){   
            filterMoviesGenre = filterMoviesGenre.filter(movie => movie.genre === selectedMoviesGenre);
            setVisibleMovies(filterMoviesGenre); 
        }
        setVisibleMovies(filterMoviesGenre);
        
    }

    return (
        <div className="pages-container">
            <div className="header">
                <NavigationBar/>
            </div>
                <div className="main-content">             
                    {/*}
                    Search by name: 
                    <input onChange={(e) => setMoviesTitle(e.target.value)} value={moviesTitle}/>
                    <button onClick={filterByMoviesTitle}>Filter movies by titles</button>
                    */}
                    <div>
                        <h1 className="movie-page-movie-text">MOVIES</h1>
                        <select onChange={(e) => setSelectedMoviesGenre(e.target.value)}>
                            <option value="none">All Movies</option>
                            <option value="akció">Action</option>
                            <option value="vígjáték">Comedy</option>
                        </select>
                    </div>
                    
                    <div className="visible-movies">
                            {
                                visibleMovies.map( movies => (
                                    <div>  
                                        <img 
                                            src={"http://localhost:4000/icons/" + movies.icon} 
                                            className="movie-icons"
                                            alt="moviepicture"
                                            onClick={() => { movieDetails.setValue(movies); navigate("/selectedmovie")}}
                                            />
                                    </div>
                                ))
                            }
                    </div>                                         
                </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default Movies;