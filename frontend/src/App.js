import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './Admin/PrivateComponent';
import './App.css';
import AddActor from './Components/AddActor/AddActor';
import AddCategory from './Components/AddCategory/AddCategory';
import Addmovie from './Components/AddMovie/Addmovie';
import AddProducer from './Components/AddProducer/AddProducer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MovieList from './Components/MovieList/MovieList';
import Movies from './Components/Movies/Movies';
import Navbar from './Components/Navbar/Navbar';
import privateRoutes from './Components/PrivateComponent';
import Signup from './Components/Signup/Signup';
import UpdateMovie from './Components/UpdateMovie/UpdateMovie';

function App() {
  return (

    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes >

          <Route element={<AdminRoutes/>}>
            <Route path='/add/movie' element={<Addmovie />} />
            <Route path='/add/actor' element={<AddActor />} />
            <Route path='/add/category' element={<AddCategory />} />
            <Route path='/add/producer' element={<AddProducer />} />
            <Route path='/update/:id' element={<UpdateMovie />} />
            <Route path='/admin/movies' element={<MovieList/>}/>
            
            
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home/>} />
          <Route path='/movies' element={<Movies/>} />
          

          
          
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
