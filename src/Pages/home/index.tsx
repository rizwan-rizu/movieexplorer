import { useCallback, useContext, useRef, useState } from "react";
import { iMovie } from "./interface";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import LoadingSpinner from "../../common/loadingSpinner";
import Template from "../template";
import Snackbar from "../../common/snackbar";

const Home = () => {
  const navigate = useNavigate()
  const { app: { favoriteMovies, watchList } } = useContext(StoreContext)
  const [trendingMoviesPage, setTrendingMoviesPage] = useState<number>(1);
  const [nowPlayingMoviePage, setNowPlayingMoviePage] = useState<number>(1);
  const {
    search: trendingMovie,
    loading: trendingMoviesLoading,
    error: trendingMoivesError,
    setError: trendingMoivesSetError,
    hasMore: hasMoreTrendingMovies
  } = useMovieSearch('/trending/movie/week', trendingMoviesPage, undefined);
  const {
    search: nowPlayingMovies,
    loading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
    setError: nowPlayingMoviesSetError,
    hasMore: hasMoreNowPlayingMovies
  } = useMovieSearch('/movie/now_playing', nowPlayingMoviePage, undefined);
  const observerTrending: any = useRef()
  const observerNowPlaying: any = useRef()

  const trendingMovieLastElement = useCallback((node: any) => {
    if (trendingMoviesLoading) return
    if (observerTrending.current) observerTrending.current.disconnect()
    observerTrending.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreTrendingMovies) {
        setTrendingMoviesPage((prev: number) => (prev + 1))
      }
    })
    if (node) observerTrending.current.observe(node)
  }, [trendingMoviesLoading, hasMoreTrendingMovies])

  const nowPlayingLastElement = useCallback((node: any) => {
    if (nowPlayingMoviesLoading) return
    if (observerNowPlaying.current) observerNowPlaying.current.disconnect()
    observerNowPlaying.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreNowPlayingMovies) {
        setNowPlayingMoviePage((prev: number) => (prev + 1))
      }
    })
    if (node) observerNowPlaying.current.observe(node)
  }, [nowPlayingMoviesLoading, hasMoreNowPlayingMovies])

  const moviesList = (
    title: string,
    array: iMovie[],
    loading: boolean,
    error: boolean,
    setError?: React.Dispatch<React.SetStateAction<boolean>> | undefined,
    elementRef?: any
  ) => (
    <div className="pt-5">
      <p className="font-medium text-black dark:text-gray-200 text-xl">{title}</p>
      <div className="overflow-auto no-scrollbar w-full mx-auto py-2">
        <div className="flex">
          {array.length > 0 ? array.map((x: iMovie, idx: number) => (
            <div key={x.id} ref={(array.length === (idx + 1)) ? elementRef : null} className="flex-shrink-0 p-2">
              <img
                className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                alt="poster"
                onClick={() => navigate(`/movie/${x.id}`)}
              />
            </div>
          )) : <p className="font-medium text-black dark:text-gray-200 ml-2">Movies not found.</p>}
          {loading && !error && <LoadingSpinner />}
          {!loading && error && <Snackbar onClose={setError} message={"An error has occured. We are unable to show some data currently. Please try again by refresh your page."} />}
        </div>
      </div>
    </div>
  )

  const body = () => (
    <div>
      {moviesList("Trending Movies", trendingMovie, trendingMoviesLoading, trendingMoivesError, trendingMoivesSetError, trendingMovieLastElement)}
      {moviesList("Now Playing", nowPlayingMovies, nowPlayingMoviesLoading, nowPlayingMoviesError, nowPlayingMoviesSetError, nowPlayingLastElement)}
      {moviesList("Watchlist Movies", watchList, false, false)}
      {moviesList("Favourite Movies", favoriteMovies, false, false)}
    </div>
  )
  return <Template body={body()} />
}

export default Home;