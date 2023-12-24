import { useEffect, useState } from "react";
import { addMovieToWatchlist, getMovieDetail, getMovieReviews } from "./api";
import { iMovie } from "../home/interface";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons'
import Template from "../template";
import moment from "moment";
import LoadingSpinner from "../../common/loadingSpinner";
import Alert from "../../common/alert";
import Table from "../../common/table";
import { castColumn } from "./tableColumn";

const MovieDetail = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<any>({})
  const [reviews, setReviews] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  useEffect(() => {
    getMovieDetail(movieId, setMovie, setIsLoading)
    getMovieReviews(movieId, setReviews, setIsReviewLoading)
  }, [movieId])

  const handleAddToWatchlist = () => {
    addMovieToWatchlist(movie?.id, setShowAlert)
  }

  const handleMarkAsFavourite = () => {

  }

  const body = () => (
    <div>
      {isLoading ? <LoadingSpinner /> : (
        <div>
          <div className="flex content-between">
            <img
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
              alt="poster"
            />
            <div className="pl-5 py-12">
              <p className="font-bold text-black text-3xl">{movie?.title}</p>
              <div className="flex items-center">
                <p className="text-sm">{moment(movie?.release_date).format('DD/MM/YYYY')}</p>
                <FontAwesomeIcon className="mx-2 text-[10px]" icon={faCircle} />
                <p className="text-sm">{movie?.genres?.map((x: { id: string, name: string }) => x.name).join(', ')}</p>
                <FontAwesomeIcon className="mx-2 text-[10px]" icon={faCircle} />
                <p className="text-sm">{movie?.spoken_languages?.map((x: { [key: string]: string }) => x.name).join(', ')}</p>
              </div>
              <p className="font-medium text-black pt-4 italic">{movie?.tagline}</p>
              <p className="pt-4 font-bold text-black text-2xl">Overview</p>
              <p className="pt-3">{movie?.overview}</p>
              <div className="pt-3">
                <span className="font-semibold text-black">Vote Count: </span>
                <span >{movie?.vote_count}</span>
              </div>
              <div className="pt-3">
                <span className="font-semibold text-black">Popularity: </span>
                <span >{movie?.popularity}</span>
              </div>
              <div className="pt-3">
                <span className="font-semibold text-black">Run Time: </span>
                <span >{movie?.runtime}</span>
              </div>
              <div className="pt-4 pb-2">
                <button className="bg-gray-200 py-2 px-5 hover:bg-gray-300 text-black font-normal rounded-full" onClick={handleAddToWatchlist}>
                  <FontAwesomeIcon className="mr-2" icon={faBookmark} />
                  Add to Watchlist
                </button>
                <button className="bg-gray-200 ml-2 py-2 px-5 hover:bg-gray-300 text-black font-normal rounded-full" onClick={handleMarkAsFavourite}>
                  <FontAwesomeIcon className="mr-2" icon={faHeart} />
                  Mark as Favourite
                </button>
              </div>
              {showAlert.show && <Alert color="green" message={showAlert.message} />}
            </div>
          </div>
          {/* Cast */}
          <div className="py-6">
            <p className="font-bold pb-3 text-black text-2xl">Cast & Crew</p>
            <Table column={castColumn} row={movie?.credits?.cast} />
          </div>
          {/* Reviews */}
          <div className="py-6">
            <p className="font-bold text-black text-2xl">Reviews</p>
            {reviews.length > 0 && !isReviewLoading ? reviews.map((x: any) => (
              <div className="flex flex-col gap-3 pt-7">
                <div className="flex flex-col gap-4 bg-gray-200 rounded-lg p-4">
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      {/* <div className="w-7 h-7 text-center rounded-full bg-red-500">{x?.author[0]}</div> */}
                      <p className="font-semibold text-md text-black">{x?.author}</p>
                    </div>
                  </div>
                  <p className="text-md">{x?.content}</p>
                  <div className="flex justify-between">
                    <p className="text-md">{moment(x?.created_at).format("DD/MM/YYYY HH:MM a")}</p>
                  </div>
                </div>
              </div>

            )) : <LoadingSpinner />}
          </div>
        </div>
      )}
    </div>
  )
  return <Template body={body()} />
}

export default MovieDetail;
