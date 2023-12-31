import { useContext, useEffect, useState } from "react";
import { getMovieDetail, getMovieReviews } from "./api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons'
import { castColumn } from "./tableColumn";
import { StoreContext } from "../../store";
import { setStorageItem } from "../../utility";
import { iMovie } from "../home/interface";
import Template from "../template";
import moment from "moment";
import LoadingSpinner from "../../common/loadingSpinner";
import Snackbar from "../../common/snackbar";
import Table from "../../common/table";

const MovieDetail = () => {
  const { movieId } = useParams()
  const { app: { favoriteMovies, setFavoriteMovies, watchList, setWatchlist } } = useContext(StoreContext)
  const [movie, setMovie] = useState<any>({})
  const [reviews, setReviews] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  useEffect(() => {
    getMovieDetail(movieId, setMovie, setIsLoading, setShowAlert)
    getMovieReviews(movieId, setReviews, setIsReviewLoading, setShowAlert)
  }, [movieId])

  const handleAddToWatchlist = () => {
    if (watchList && watchList.length && watchList.filter((x: iMovie) => x.id === movie.id).length) {
      setShowAlert({ show: true, message: "Movie has already been added to the watchlist" })
      return
    }
    let data = [...watchList, movie]
    setWatchlist(data)
    setStorageItem("watchList", JSON.stringify(data))
    setShowAlert({ show: true, message: "Movie has been added to watchlist." })
  }

  const handleMarkAsFavourite = () => {
    if (favoriteMovies && favoriteMovies.length && favoriteMovies.filter((x: iMovie) => x.id === movie.id).length) {
      setShowAlert({ show: true, message: "Movie has already been added to the favourites." })
      return
    }
    let data = [...favoriteMovies, movie]
    setFavoriteMovies(data)
    setStorageItem("favoriteMovies", JSON.stringify(data))
    setShowAlert({ show: true, message: "Movie has been added to favourites." })
  }

  const body = () => (
    <div>
      {Object.keys(movie).length > 0 && (
        <div>
          <div className="flex md:flex-nowrap flex-wrap content-between">
            <img
              className="rounded-xl h-72 md:h-full"
              src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
              alt="poster"
            />
            <div className="pl-0 md:pl-5 py-6 md:py-12">
              <p className="font-bold text-black dark:text-gray-200 text-lg md:text-3xl">{movie?.title}</p>
              <div className="flex flex-wrap items-center">
                <p className="text-sm dark:text-gray-200 text-black">{moment(movie?.release_date).format('DD/MM/YYYY')}</p>
                <FontAwesomeIcon className="mx-2 dark:text-gray-200 text-black text-[10px]" icon={faCircle} />
                <p className="text-sm dark:text-gray-200 text-black">{movie?.genres?.map((x: { id: string, name: string }) => x.name).join(', ')}</p>
                <FontAwesomeIcon className="mx-2 dark:text-gray-200 text-black text-[10px]" icon={faCircle} />
                <p className="text-sm dark:text-gray-200 text-black">{movie?.spoken_languages?.map((x: { [key: string]: string }) => x.name).join(', ')}</p>
              </div>
              <p className="font-medium text-black dark:text-gray-200 pt-4 italic">{movie?.tagline}</p>
              <p className="pt-4 font-bold text-black dark:text-gray-200 text-2xl">Overview</p>
              <p className="pt-3 dark:text-gray-200 text-black">{movie?.overview}</p>
              <div className="pt-3">
                <span className="font-semibold text-black dark:text-gray-200">Vote Count: </span>
                <span className="text-black dark:text-gray-200">{movie?.vote_count}</span>
              </div>
              <div className="pt-3">
                <span className="font-semibold text-black dark:text-gray-200">Popularity: </span>
                <span className="text-black dark:text-gray-200" >{movie?.popularity}</span>
              </div>
              <div className="pt-3">
                <span className="font-semibold text-black dark:text-gray-200">Run Time: </span>
                <span className="text-black dark:text-gray-200">{movie?.runtime}</span>
              </div>
              <div className="pt-4 pb-2">
                <button data-testid="watchlist-button" className="bg-gray-200 dark:bg-gray-600 py-2 px-5 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-gray-200 font-normal rounded-full" onClick={handleAddToWatchlist}                >
                  <FontAwesomeIcon className="mr-2" icon={faBookmark} />
                  Add to Watchlist
                </button>
                <button data-testid="favorite-button" className="ml-1 bg-gray-200 dark:bg-gray-600 py-2 px-5 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-gray-200 font-normal rounded-full" onClick={handleMarkAsFavourite}>
                  <FontAwesomeIcon className="mr-2" icon={faHeart} />
                  Mark as Favourite
                </button>
              </div>
            </div>
          </div>
          {/* Cast */}
          <div className="py-6">
            <p className="font-bold pb-3 text-black dark:text-gray-200 text-2xl">Cast & Crew</p>
            <Table column={castColumn} row={movie?.credits?.cast} />
          </div>
          {/* Reviews */}
          <div className="py-6">
            <p className="font-bold text-black dark:text-gray-200 text-2xl">Reviews</p>
            {reviews.length > 0 && !isReviewLoading ? reviews.map((x: any) => (
              <div key={x.id} className="flex flex-col gap-3 pt-7">
                <div className="flex flex-col gap-4 bg-gray-200 dark:bg-gray-600 rounded-lg p-4">
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      {/* <div className="w-7 h-7 text-center rounded-full bg-red-500">{x?.author[0]}</div> */}
                      <p className="font-semibold text-md text-black dark:text-gray-200">{x?.author}</p>
                    </div>
                  </div>
                  <p className="text-md dark:text-gray-200 text-black">{x?.content}</p>
                  <div className="flex justify-between">
                    <p className="text-md text-black dark:text-gray-200">{moment(x?.created_at).format("DD/MM/YYYY HH:MM a")}</p>
                  </div>
                </div>
              </div>
            )) : isReviewLoading ? <LoadingSpinner /> : <p className=" text-black dark:text-gray-200 ml-2">No reviews found</p>}
          </div>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {showAlert.show && <Snackbar onClose={(value) => setShowAlert({ show: value as boolean, message: '' })} message={showAlert.message} />}
    </div>
  )
  return <Template body={body()} />
}

export default MovieDetail;
