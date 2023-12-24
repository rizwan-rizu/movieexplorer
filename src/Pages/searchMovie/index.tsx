import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { iMovie } from '../home/interface';
import { ChangeEvent, useState } from 'react';
import { getSearchMovies } from './api';
import { useNavigate } from 'react-router-dom';

const SearchMovies = () => {
  const navigate = useNavigate()
  const [searchMovies, setSearchMovies] = useState<iMovie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })

  // useEffect(() => {
  //   getSearchMovies(movieId, setSearchMovies, setIsLoading)
  // }, [movieId])

  const handleMovieSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getSearchMovies(e.target.value, setSearchMovies, setIsLoading)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.9)]">
      <div className="p-8">
        <div className="text-center">
          <input
            className={`bg-gray-200 w-[630px] placeholder-black h-[57px] p-3 pl-4 text-lg text-center rounded-full`}
            type="text"
            name="userName"
            placeholder="Search a movie or series"
            onChange={handleMovieSearch}
          />
        </div>
        <button onClick={() => navigate(-1)} className="absolute top-10 left-8 text-white border rounded-full py-2 px-4">
          <FontAwesomeIcon className="mr-2 text-white" icon={faArrowLeft} />
          Go Back
        </button>
        <div className="pt-5">
          <p className="font-medium text-white text-xl">Searched Result</p>
          <div className="w-full py-2">
            <div className="flex flex-wrap">
              {searchMovies?.length > 0
                ? searchMovies.map((x: iMovie) =>
                  <div key={x.id} className="p-2">
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
      </div>
    </div>
  );
};

export default SearchMovies