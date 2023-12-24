import { useEffect, useState } from "react";
import { getTrendingMovies, getWatchlistMovies } from "./api";
import { iMovie } from "./interface";
import Template from "../template";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [trendingMovies, setTrendingMovies] = useState<iMovie[]>([])
  const [watchlist, setWatchlist] = useState<iMovie[]>([])
  const [trendingMoviesPage, setTrendingMoviesPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  useEffect(() => {
    getTrendingMovies(trendingMoviesPage, setTrendingMovies, setIsLoading)
  }, [trendingMoviesPage])

  useEffect(() => {
    getWatchlistMovies(1, setWatchlist)
  }, [])

  const handleScroll = (e: any) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.target;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 500;

    if (isAtEnd && !isLoading) {
      setTrendingMoviesPage((prev: number) => (prev + 1))
    }
  };

  const moviesList = (title: string, array: iMovie[]) => (
    <div className="pt-5">
      <p className="font-medium text-black text-xl">{title}</p>
      <div className="overflow-auto no-scrollbar w-full mx-auto py-2" onScroll={handleScroll}>
        <div className="flex">
          {array?.length > 0
            ? array.map((x: iMovie) =>
              <div key={x.id} className="flex-shrink-0 p-2">
                <img
                  className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                  src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                  alt="poster"
                  onClick={() => navigate(`/movie/${x.id}`)}
                />
              </div>
            )
            : <p>Loading...</p>
          }
        </div>
      </div>
    </div>
  )

  const body = () => (
    <div>
      {moviesList("Trending movies", trendingMovies)}
      {moviesList("Watchlist Movies", watchlist)}
    </div>
  )
  return <Template body={body()} />
}

export default Home;