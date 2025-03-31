import { useState } from "react";
import {Route, Routes } from "react-router-dom";
import MovieSection from "./Component/movieSection.jsx";
import MovieDetails from "./Component/movieDetails.jsx";



const App = () => {
    const [searchInput, setSearchInput] = useState('')
    const [selectGenre, setSelectGenre] = useState('')
    const [movies,setmovies]=useState([])
    
    const movie = {
        genre: [
            "Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Horror",
            "Science-Fiction",
            "Fantasy",
            "Romance",
            "Thriller",
            "Mystery",
            "Animated",
            "Documentary",
            "Historical",
        ]
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value)
        const filteredMovies=movies.filter((movie)=>{
            movie.title.toLowerCase().includes(searchInput.toLowerCase())
        })
        console.log("the input info", e.target.value)
    };

    const handleGenreChange = (e) => {
        setSelectGenre(e.target.value)
        console.log("selected Genre", e.target.value)
    };
    

    return (
       
            <div>
                <div className="header">
                    <img 
                        src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
                        alt="logo"
                        style={{ width: '150px', height: '100px' }} 
                    />
                    <div className="property-header">
                        <nav>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="#">Tv Shows</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="category">
                        <select 
                            className="select" 
                            value={selectGenre} 
                            onChange={handleGenreChange}
                        >
                            <option value=''>Category</option>
                            {movie.genre.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="searchBar">
                        <input 
                            type="text"
                            placeholder="🔍Search Bar"
                            value={searchInput}
                            onChange={handleChange}
                        />
                       
                    </div>
                    <div className="login">
                        <nav>
                            <ul>
                                <li><a href="#">Login</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<MovieSection />} />
                    <Route path="/" element={< MovieDetails/>}></Route>
                    
                </Routes>

                <MovieDetails/>
            </div>
    
    )
}

export default App;