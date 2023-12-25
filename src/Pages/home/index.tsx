import { useCallback, useContext, useRef, useState } from "react";
import { iMovie } from "./interface";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import LoadingSpinner from "../../common/loadingSpinner";
import Template from "../template";

const Home = () => {
  const navigate = useNavigate()
  const { app: { favoriteMovies, watchList } } = useContext(StoreContext)
  const [trendingMoviesPage, setTrendingMoviesPage] = useState<number>(1);
  const [nowPlayingMoviePage, setNowPlayingMoviePage] = useState<number>(1);
  const {
    search: trendingMovie,
    loading: trendingMoviesLoading,
    error: trendingMoivesError,
    hasMore: hasMoreTrendingMovies
  } = useMovieSearch('/trending/movie/week', trendingMoviesPage, undefined);
  const {
    search: nowPlayingMovies,
    loading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
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

  const moviesList = (title: string, array: iMovie[], loading: boolean, error: boolean, elementRef?: any) => (
    <div className="pt-5">
      <p className="font-medium text-black text-xl">{title}</p>
      <div className="overflow-auto no-scrollbar w-full mx-auto py-2">
        <div className="flex">
          {array.map((x: iMovie, idx: number) => (
            <div key={x.id} ref={(array.length === (idx + 1)) ? elementRef : null} className="flex-shrink-0 p-2">
              <img
                className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                alt="poster"
                onClick={() => navigate(`/movie/${x.id}`)}
              />
            </div>
          ))}
          {loading && !error && <LoadingSpinner />}
        </div>
      </div>
    </div>
  )

  const body = () => (
    <div>
      {moviesList("Trending Movies", trendingMovie, trendingMoviesLoading, trendingMoivesError, trendingMovieLastElement)}
      {moviesList("Now Playing", nowPlayingMovies, nowPlayingMoviesLoading, nowPlayingMoviesError, nowPlayingLastElement)}
      {moviesList("Watchlist Movies", watchList, false, false)}
      {moviesList("Favourite Movies", favoriteMovies, false, false)}
    </div>
  )
  return <Template body={body()} />
}

export default Home;