import { useCallback, useContext, useEffect, useState } from "react";
import { getTrendingMovies } from "./api";
import { iMovie } from "./interface";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store";
import Template from "../template";
import { debounce } from "../../utility";

const Home = () => {
  const navigate = useNavigate()
  const { app: { favoriteMovies, watchList } } = useContext(StoreContext)
  const [trendingMovies, setTrendingMovies] = useState<iMovie[]>([])
  const [trendingMoviesPage, setTrendingMoviesPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  useEffect(() => {
    getTrendingMovies(trendingMoviesPage, setTrendingMovies, setIsLoading)
  }, [trendingMoviesPage])

  const handleLoadMore = (e: any, isInfiniteScroll: boolean) => {
    if (!isInfiniteScroll) return
    const { scrollWidth, scrollLeft, clientWidth } = e.target;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 500;

    if (isAtEnd && !isLoading) {
      setTrendingMoviesPage((prev: number) => (prev + 1))
    }
  };

  const debounceOnScroll = useCallback(debounce(handleLoadMore, 400), []);

  const moviesList = (title: string, array: iMovie[], isInfiniteScroll: boolean) => (
    <div className="pt-5">
      <p className="font-medium text-black text-xl">{title}</p>
      <div className="overflow-auto no-scrollbar w-full mx-auto py-2" onScroll={(e) => debounceOnScroll(e, isInfiniteScroll)}>
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
      {moviesList("Trending movies", trendingMovies, true)}
      {moviesList("Watchlist Movies", watchList, false)}
      {moviesList("Favourite Movies", favoriteMovies, false)}
    </div>
  )
  return <Template body={body()} />
}

export default Home;