import React, { useState,useEffect } from 'react'
import { addMovie } from '../../Admin/helper';
import './AddMovie.css'


function Addmovie() {
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
    const {
        name,
        description,
        photo,
        categories,
        formData,
        release,
        duration
    } = values;

    

    const getAllCategories = () => {
        return fetch("http://localhost:8000/api/categories", {
          method: "GET" 
        })
        .then(response => {
        return response.json();
        })
        .catch(err => console.log(err));
      };
    

    const loadCategories=()=>{
        getAllCategories().then((data)=>{
            
            setValues({ ...values, categories:data, formData: new FormData() });
            console.log("CATE:" ,categories);
           
        })
    }
    useEffect(()=>{
       loadCategories();
        
    },[])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const handleClick = event => {
        event.preventDefault();
        setValues({ ...values })
        console.log(formData);
        addMovie(formData).then(data => {
            if (data.error) {
                console.log("Error in form")
            }
            else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    release:" ",
                    duration:"",
                    photo: "",
                    category:""
                });
            }
            console.log(values)
        });
    };

    return (
        <div className='form'>
            <h2 >Add Movie</h2>
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
            <button type='submit' onClick={handleClick} >Add Movie</button>
        </div>
    )
}

export default Addmovie
