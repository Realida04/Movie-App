// import { useEffect, useState } from "react";

// const Api = () => {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/popular?api_key=09504ebd5c0c5826b765c683bc432f3a&page=1`
//         );
//         const data = await response.json();
//         setMovies(data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (isLoading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="bg-black text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
//       <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
//         {movies.map((movie) => (
//           <div key={movie.id} className="flex-shrink-0 w-40">
//             <img
//               src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-lg w-full h-56 object-cover hover:scale-105 transition-transform"
//             />
//             <p className="text-sm mt-2 truncate">{movie.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Api;