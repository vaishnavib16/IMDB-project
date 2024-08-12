import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../Admin/helper';
import './Navbar.css'

function Navbar() {
    const auth = isAuthenticated();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className='nav-items'>
            <div className='headerLeft'>
                
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies">Popular</Link>               
                {auth && auth.role===1 && (<div>
                <Link to="/admin/movies">Movies</Link>
                <Link to="/add/movie">Add Movie</Link>
                <Link to="/add/category">Add Category</Link>
                <Link to="/add/actor">Add Actor</Link>
                <Link to="/add/producer">Add Producer</Link>
                </div>)}             
            </div>
            <div className='headerRight'>
                 
                {!auth && (<div><Link to="/login">Admin</Link>
                    <Link to="/signup">Signup</Link>
                </div>)}
                {auth && (<Link onClick={logout} to="/signup">Logout</Link>)}
            </div>

        </div>
    )
}

export default Navbar
