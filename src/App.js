import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = '9ad672538cc4a1d62865240f6de1fa69' //9ad672538cc4a1d62865240f6de1fa69
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({ title: "Cargando película" });

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover";
      const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });
      setMovies(results);
      setMovie(results[0]);
    } catch (error) { //control de errores
      alert("Error al cargar las películas:", error);
      //console.error("Error al cargar las películas:", error);
    }
  }

//filtro de las peliculas
const searchMovies = (e)=>{
  e.preventDefault();
  fetchMovies(searchKey)
}
  
useEffect(()=>{ 
  fetchMovies();
},[]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>

      <h2 className='text-center mt-5 mb-5'>pelis Trailers </h2>
      <form className='container mb-4' onSubmit={searchMovies}> 
        <input type="text" placeholder='Buscar' onChange={(e)=> setSearchKey(e.target.value)} />
        <button>Buscar</button>
      </form>
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img src={`${URL_IMAGE}${movie.poster_path}`} alt="" height={600} width='100%' />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;