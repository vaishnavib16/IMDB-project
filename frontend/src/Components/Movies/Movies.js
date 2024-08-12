import React, {useState,useEffect} from 'react'
import MovieCard from '../MovieCard/MovieCard';
import './Movies.css'
function Movies() {
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
            setMovies(data)
        })
    }

    useEffect(() => {
        loadAllMovies()
    }, [])

    return (
        <div className="popular_list">
            <h1 className="popular_title">Popular</h1>
            <div className="popular_card">
                {
                    movies.map(movie => (
                    <div>
                        <MovieCard movie={movie} />
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Movies
