import { useEffect, useState } from "react";
import { getMovieDetail } from "./api";
import { iMovie } from "../home/interface";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import Template from "../template";

const MovieDetail = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [showError, setShowError] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  useEffect(() => {
    getMovieDetail(movieId, setMovie, setIsLoading)
  }, [movieId])

  const body = () => (
    <div>
      <div className="flex items-center mt-4 justify-between">
        <p className="font-bold text-black text-2xl">{movie?.title}</p>
        <div>
          <button className="bg-gray-200 py-2 px-5 hover:bg-gray-300 text-black font-normal w-full rounded-full">
            <FontAwesomeIcon className="mr-2" icon={faBookmark} />
            Add to watchlist
          </button>
        </div>
      </div>
      <div className="flex">
        <img
          className="rounded-xl"
          src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`}
          alt="poster"
        />
        <div className="pl-3">
          {movie?.genres?.map((x: { id: string, name: string }) => <span className="py-1 px-2 rounded-full border border-black border-solid mr-2">{x.name}</span>)}
          <p className="pt-3">{movie?.overview}</p>
          <p className="pt-3">Release Date: {movie?.release_date}</p>
        </div>
      </div>
    </div>
  )
  return <Template body={body()} />
}

export default MovieDetail;