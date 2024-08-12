import React from 'react'
import Poster from './Poster'
import './MovieCard.css'

function MovieCard(movie) {
  console.log("moviecard", movie.movie)

  return (
    <div className="card">
      <Poster className="img" movie={movie.movie} />
      <div className="movie_info">
        <div className="title">{movie.movie.name}</div>
        <div className="release">
          <span>Release: {movie.movie.release}</span>
          <span className='rating'>Rating: {movie.movie.duration}&#9733;</span>
        </div>
        <div className='movie_description'>{movie.movie.description}</div>
        <button className='watch'>Watch Now</button>
      </div>
    </div>
  )
}
export default MovieCard
