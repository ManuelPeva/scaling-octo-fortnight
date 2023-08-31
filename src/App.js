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
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey)
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <header style={{ background: '#1C1C1C', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>PELIS TRAILERS</h1>
        <p style={{ fontSize: '1.2rem' }}>La mejor selección de trailers de películas para los amantes del cine.</p>
      </header>


      <h2 className='text-center mt-5 mb-3' style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#E50914', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        PELIS TRAILERS
      </h2>

      <div className='d-flex justify-content-center'>
        <form className='mt-4' onSubmit={searchMovies}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              style={{ maxWidth: '290px' }}
              placeholder='Buscar'
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button className='btn btn-primary' type='submit'>
              Buscar
            </button>
          </div>
        </form>
      </div>





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
      {/* Footer */}
      {/* Footer */}
      <footer className='text-center mt-5 py-4' style={{ background: '#1C1C1C', color: '#fff' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <h3>Sobre PELIS TRAILERS</h3>
              <p>La mejor selección de trailers de películas para los amantes del cine.</p>
            </div>
            <div className='col-md-4'>
              <h3>Contacto</h3>
              <p>Email: info@pelistrailers.com</p>
              <p>Teléfono: +1234567890</p>
            </div>
            <div className='col-md-4'>
              <h3>Síguenos en redes</h3>
              <p>Facebook | Twitter | Instagram</p>
            </div>
          </div>
        </div>
        <p className='mt-3'>&copy; {new Date().getFullYear()} PELIS TRAILERS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;