import '../css/PagesStyle.css';
import '../css/Home.scss';
import NavigationBar from "../components/NavigationBar.js";
import Slider from "../components/Slider.js";
import Footer from "../components/Footer.js";
import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
//import { useParams, Link} from 'react-router-dom';
import { useContext } from 'react';
import { MovieContext } from "../context/MovieContext.js";
import { MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';
import gsap from "gsap";

const Home = () => {
    //const params = useParams();

    let scrl = useRef(null);

    let navigate = useNavigate();

    const [allMovies, setAllMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [scifiMovies, setScifiMovies] = useState([]);
    const [diehardCollection, setDiehardCollection] = useState([]);

    const [sliderData, setSliderData] = useState([]);

    const [scrollX, setscrollX] = useState(1);
    const [scrollEnd, setscrollEnd] = useState(false);
    
    const movieDetails = useContext(MovieContext);

    useEffect(() => {  

        fetch("http://localhost:4000/slide-show-images")
            .then(data => data.json())
            .then(parsedData => {
                setSliderData(parsedData)
        })

        fetch("http://localhost:4000/all-movies")
            .then(data => data.json())
            .then(parsedData => {
                setAllMovies(parsedData);
            })

        fetch("http://localhost:4000/all-movies-by-action/akció")
            .then(data => data.json())
            .then(parsedData => {
                setActionMovies(parsedData)
            })

        fetch("http://localhost:4000/all-movies-by-comedy/vígjáték")
            .then(data => data.json())
            .then(parsedData => {
                setComedyMovies(parsedData);
            })

        fetch("http://localhost:4000/all-movies-by-scifi/scifi")
            .then(data => data.json())
            .then(parsedData => {
                setScifiMovies(parsedData);
            })

            fetch("http://localhost:4000/group/diehardcollection")
            .then(data => data.json())
            .then(parsedData => {
                setDiehardCollection(parsedData);
            })
        /*    
        fetch("http://localhost:4000/get-movie/" + params.movieMainTitle)
            .then(data => data.json())
            .then(parsedData => {
                setVisibleMovie(parsedData);
            }) 
        */
    }, [])

    useEffect(() => {
        if (
          scrl.current &&
          scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
        ) {
          setscrollEnd(true);
        } else {
          setscrollEnd(false);
        }
        return () => {};
    }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);


    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift); 
    
        if (
          Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
          scrl.current.offsetWidth
        ) {
          setscrollEnd(true);
        } else {
          setscrollEnd(false);
        }
      };

      const anim = (e) => {
        gsap.from(e.target, { scale: 1 });
        gsap.to(e.target, { scale: 1.5 });
      };
      const anim2 = (e) => {
        gsap.from(e.target, { scale: 1.5 });
        gsap.to(e.target, { scale: 1 });
      };

    const scrollCheck = () => {
        setscrollX(scrl.current.scrollLeft);
        if (
          Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
          scrl.current.offsetWidth
        ) {
          setscrollEnd(true);
        } else {
          setscrollEnd(false);
        }
      };

    return (  
        <div className="pages-container"> 
            <div className="header">
                <NavigationBar/>
            </div>            
                <div className="main-content">
                    <div className="row">
                        <Slider slidePictures={sliderData}/>
                    </div>
                    <div className="row"> 
                        <div className="movie-text-container">
                            <h2 className="movie-genre-texts">AKCIÓ FILMEK</h2>
                        </div>
                        <div className="different-genres-containers">
                        {!scrollEnd && (
                            <button 
                            className="prev" 
                            onClick={() => slide(-200)}
                            onMouseEnter={(e) => anim(e)}
                            onMouseLeave={(e) => anim2(e)}
                            >
                                <MdArrowBackIos/>
                            </button>
                        )}
                            <div className="home-movies-container" ref={scrl} onScroll={scrollCheck}>
                                {
                                    actionMovies.map( movies => (
                                        <div>  
                                            <img 
                                                src={"http://localhost:4000/icons/" + movies.icon} 
                                                className="home-movie-icons"
                                                alt="moviepicture" 
                                                onClick={() => { movieDetails.setValue(movies); navigate("/selectedmovie")}}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            {scrollX !== 0 && (
                            <button 
                            className="next" 
                            onClick={() => slide(+200)}
                            onMouseEnter={(e) => anim(e)}
                            onMouseLeave={(e) => anim2(e)}
                            >
                                <MdArrowForwardIos/>
                            </button>
                            )}
                    </div>
                    </div>
                    <div className="row">
                        <h2 className="movie-genre-texts">VÍGJÁTÉKOK</h2>
                            <div className="home-movies-container">
                                {
                                    comedyMovies.map( movies => (
                                        <div>  
                                            <img 
                                                src={"http://localhost:4000/icons/" + movies.icon} 
                                                className="home-movie-icons"
                                                alt="moviepicture"
                                                onClick={() => { movieDetails.setValue(movies); navigate("/selectedmovie")}}
                                            />
                                        </div>
                                    ))
                                }   
                            </div>
                    </div>
                    <div className="row">
                        <h2 className="movie-genre-texts">SCI-FI FILMEK</h2>
                            <div className="home-movies-container">
                                {
                                    scifiMovies.map( movies => (
                                        <div >  
                                            <img 
                                                src={"http://localhost:4000/icons/" + movies.icon} 
                                                className="home-movie-icons" 
                                                alt="moviepicture"
                                                onClick={() => { movieDetails.setValue(movies); navigate("/selectedmovie")}}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                    </div>
                    <div className="row">  
                        <h2 className="movie-genre-texts">GYŰJTEMÉNYEK</h2>
                            <div className="home-movies-container">
                                {
                                    scifiMovies.map( movies => (
                                        <div >  
                                            <img 
                                                src={"http://localhost:4000/icons/" + movies.icon} 
                                                className="home-movie-icons" 
                                                alt="moviepicture"
                                                onClick={() => { movieDetails.setValue(movies); navigate("/selectedmovie")}}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                    </div>               
                </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}

export default Home;