import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css'
import Poster from '../MovieCard/Poster';
import Movies from '../Movies/Movies';

function Home() {
    const [movies, setMovies] = useState([])

    const getAllMovies = async () => {
        return fetch("http://localhost:8000/api/movies", {
            method: 'Get'
        }).then(Response => {
            return Response.json();
        }).catch(err => console.log(err))
    }
    const loadAllMovies = () => {
        getAllMovies().then(data => {
            console.log(data)
            setMovies(data)
        })
    }
    useEffect(() => {
        loadAllMovies()
    }, [])

    
    return (
        <div className='home'>
            <Carousel

                autoPlay={true}
                transitionTime={2}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
            >
                {
                    movies.map(movie => (
                        <div>
                            <div className="posterImage">
                                <Poster className="image" movie={movie} />
                            </div>
                            <div className="overlay">
                                <div className="title">{movie.name}</div>
                                <div className="release">
                                   Year :<span>{movie.release}</span> 
                                    <span className="rating">
                                        {movie.duration } &#9733;

                                    </span>
                                </div>
                                <div className="description">
                                    <span>{movie.description}</span>
                                </div>
                            </div>
                            
                        </div>
                        
                    ))
                }
            </Carousel>
                <Movies/>
        </div>
    )
}

export default Home
