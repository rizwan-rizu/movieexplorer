import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { iMovie } from '../home/interface';
import { useCallback, useState } from 'react';
import { getSearchMovies } from './api';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../utility';

const SearchMovies = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [searchMovies, setSearchMovies] = useState<iMovie[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [showAlert, setShowAlert] = useState<{ show: boolean, message: string }>({ show: false, message: '' })
  // const [page, setPage] = useState<number>(1);
  const navigate = useNavigate()
  let page: number


  const handleMovieSearch = (value: string) => {
    page = 1
    getSearchMovies(page, value, setSearchMovies, setIsLoading)
  }

  const handleLoadMore = (value: string) => {
    page = page + 1
    getSearchMovies(page, value, setSearchMovies, setIsLoading)
  }

  const debounceOnChange = useCallback(debounce(handleMovieSearch, 400), []);
  const debounceOnScroll = useCallback(debounce(handleLoadMore, 400), []);

  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const isAtEnd = (scrollTop + clientHeight) >= (scrollHeight - 20)
    if (isAtEnd && !isLoading) { debounceOnScroll(keyword) }
  };

  return (
    <div className="px-7 py-3 bg-gray-100 h-full overflow-auto" onScroll={handleScroll}>
      <div className="flex items-center">
        <div className="flex-none">
          <div className="flex flex-col items-start">
            <p className="font-semibold text-3xl text-black">The</p>
            <p className="font-semibold text-3xl text-black">Movie</p>
            <p className="font-semibold  text-3xl">Tracker</p>
          </div>
        </div>
        <div className="text-center grow">
          <input
            className={`bg-gray-200 w-[630px] placeholder-black h-[57px] p-3 pl-4 text-lg text-center rounded-full`}
            type="text"
            name="userName"
            placeholder="Search a movie or series"
            onChange={(e) => { setKeyword(e.target.value); debounceOnChange(e.target.value) }}
          />
        </div>
        <div className="flex-none">
          <button onClick={() => navigate(-1)} className="hover:bg-gray-200 text-black border rounded-full py-2 px-4">
            <FontAwesomeIcon className="mr-2 text-black" icon={faArrowLeft} />
            Go Back
          </button>
        </div>
      </div>
      <div className="pt-5">
        <p className="font-medium text-black text-xl">{`Searched Results`}</p>
        <div className="w-full py-2">
          <div className="flex flex-wrap">
            {(searchMovies && searchMovies?.length > 0 && !isLoading) ? searchMovies.map((x: iMovie, idx: number) => (['tv', 'movie'].includes(x.media_type) && x.poster_path !== null) &&
              <div key={x.id} className="flex-shrink-0 p-2">
                <img
                  className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                  src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                  alt="poster"
                  onClick={() => navigate(`/movie/${x.id}`)}
                />
              </div>
            )
              : isLoading ? <p>Loading...</p> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMovies