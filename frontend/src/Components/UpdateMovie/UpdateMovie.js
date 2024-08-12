import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addMovie, updateMovie } from '../../Admin/helper';
import './UpdateMovie.css'


function UpdateMovie() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    categories: [],
    category: "",
    release: "",
    duration: "",
    formData: "",
  });
  const {name ,description ,photo ,categories ,formData ,release ,duration} = values;

  const params = useParams();
  const navigate=useNavigate();

  const getAllCategories = () => {
    return fetch("http://localhost:8000/api/categories", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  const loadCategories = () => {
    getAllCategories().then((data) => {
      setValues({ categories: data, formData: new FormData() });
      console.log("CATE:", categories);
    })
  }

  const getMovieDetails = async () => {
    
    let result = await fetch(`https://imdbclone-production.up.railway.app/api/movie/${params.id}`)
    
    result = await result.json();
    console.log("result",result);
    
    setValues({
      ...values,
      name: result.name,
      description:result.description,
      release: result.release,
      duration: result.duration, 

    });
    loadCategories()

    // console.log("output",name,description)
  }

  useEffect(() => {  
    getMovieDetails();
    
  }, [])

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const updateMovie=async()=>{
    let result=await fetch(`https://imdbclone-production.up.railway.app/api/movie/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name ,description ,photo ,categories ,formData ,release ,duration}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result=await result.json();
    console.log(result)
    navigate('/movies')
  }

  // const handleClick = event => {
  //   event.preventDefault();
  //   setValues({ ...values })
  //   console.log("formdata",formData)
  //   console.log(params.id)
  //   updateMovie(params.id,formData).then(data => {
  //     if (data.error) {
  //       console.log("Error in form")
  //     }
  //     else {
  //       setValues({
  //         ...values,
  //         name: "",
  //         description: "",
  //         release: " ",
  //         duration: "",
  //         photo: "",
  //       });
  //     }
  //     console.log(values)
  //   });
  // };

  return (
    <div className='form'>
      <h2 >Update Movie</h2>
      <input type="text" placeholder=' Enter Movie Name' onChange={handleChange("name")} value={name} />

      <input
        onChange={handleChange("photo")}
        type="file"
        name="photo"
        accept="image"
        placeholder="Choose Poster"
      />

      <textarea type="text" placeholder=' Enter Movie Description' onChange={handleChange("description")} value={description} />
      <select className='dropdown' onChange={handleChange("category")}><option>Select category</option>
        {categories && categories.map((cate, index) => (
          <option key={index} value={cate._id}>
            {cate.name}
          </option>
        ))}

      </select>
      <input type="number" placeholder=' Year Of Release' onChange={handleChange("release")} value={release} />
      <input type="number" placeholder=' Enter Movie Rating' onChange={handleChange("duration")} value={duration} />
      <button type='submit' onClick={updateMovie} >Update Movie</button>
    </div>
  )
}

export default UpdateMovie

