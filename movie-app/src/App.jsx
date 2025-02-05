import { useState, useEffect } from "react"
import { useDebounce } from "react-use";
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";


const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// console.table(API_KEY)

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 600, [searchTerm]);

  const fetchMovies = async (query="") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
      :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      // console.log(endpoint)
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error("Failed fethcing movies");
      }

      const data = await response.json();
      console.log(data)

      if(!data.results){
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || [])

      if(query && data.results.length>0){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Try later.");
    } finally{
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async() => {
    try {
      const movies = await getTrendingMovies();
      console.log('movies: ', movies)

      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm])

  useEffect( () => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> You Want to See From <span className="text-gradient">Banglar Boss</span></h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) =>  (
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? 
          (<Spinner />)
          : errorMessage ? 
          (<p className="text-red-500">{errorMessage}</p>)
          : (
              <ul>
                {movieList.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )
          }
        </section>

      </div>
    </main>
  )
}

export default App
