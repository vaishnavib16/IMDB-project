
export const isAuthenticated = () => {
  if(typeof window == "undefined"){
      return false;
  }
  if(localStorage.getItem("User")){
      return JSON.parse(localStorage.getItem("User"));
  }
  else{
      return false;
  }
};

export const addMovie = (movie) => {
    return fetch("http://localhost:8000/api/movie/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        
      },
      body: movie
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  export const updateMovie = (id, movie) => {
    return fetch(`http://localhost:8000/api/movie/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        
      },
      body: movie
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };