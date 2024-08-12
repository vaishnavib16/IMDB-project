import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../Admin/helper'

import './MovieList.css'

function MovieList() {
    const [movies, setMovies] = useState([])
    

    useEffect(() => {
        getAllMovies()
    }, [])

    const getAllMovies = async () => {
        let result = await fetch(`http://localhost:8000/api/movies`)
        result = await result.json();
        setMovies(result)
        console.log(result)
        console.log("movies", movies)
    }
    const deleteMovie = async (id) => {
        console.log(id)
        let result = await fetch(`http://localhost:8000/api/movie/${id}`, {
            method: 'delete'
        })
        result = await result.json();
        console.log(result)
    }
    const handleSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`https://imdbclone-production.up.railway.app/api/search/${key}`)
            result = await result.json();
            if (result) {
                setMovies(result)
            }
        }
        else {
            getAllMovies();
        }
    }

    return (

        <div className='movie_list ' >
            <h2>Movies List</h2>
            <input className='seachbar' type="text" placeholder='Seach Movie' onChange={handleSearch} />
            <ul>
                <li>Sr.No</li>
                <li>Name</li>               
                <li>Relased</li>
                
                <li>Rating</li>
                <li>Update</li>
                <li>Delete</li>
            </ul>
            {
                movies.length>0 ? movies.map((movie, index) =>
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{movie.name}</li>                       
                        <li>{movie.release}</li>
                        <li>{movie.duration}</li>
                        <li><Link to={'/update/' + movie._id}><span>Update</span></Link></li>
                        <li><button onClick={() => deleteMovie(movie._id)}>Delete</button>

                        </li>
                    </ul>
                )
                :
                <h2>No Movies Found</h2>
            }
        </div>


    )
}

export default MovieList
