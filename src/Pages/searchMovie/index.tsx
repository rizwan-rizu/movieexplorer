import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { iMovie } from '../home/interface';
import { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../utility';
import { logoText } from '../template/header';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import LoadingSpinner from '../../common/loadingSpinner';

const SearchMovies = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [filterBy, setFilterBy] = useState<string>('')
  const { search, loading, error, hasMore } = useMovieSearch(`/search/multi`, page, keyword);
  const navigate = useNavigate()
  const observer: any = useRef()

  const lastElement = useCallback((node: any) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev: number) => (prev + 1))
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleKeywordChange = (value: string) => {
    setKeyword(value)
    setPage(1)
  }

  const debounceOnChange = useCallback(debounce(handleKeywordChange, 1000), []);

  return (
    <div className="px-3 md:px-7 py-3 bg-gray-100 dark:bg-slate-800 h-full overflow-auto">
      <div className="flex flex-wrap items-center">
        <div className="grow md:flex-none">
          {logoText(navigate)}
        </div>
        <div className="text-center flex-none md:grow">
          <input
            data-testid="search-input"
            className={`bg-gray-200 dark:bg-gray-600 w-full md:w-[60%] placeholder-black text-black dark:text-gray-200 dark:text-white dark:placeholder-white p-3 pl-4 text-lg text-center rounded-full`}
            type="text"
            name="keyword"
            placeholder="Search a movie or series"
            onChange={(e) => debounceOnChange(e.target.value)}
          />
        </div>
        <div className="flex-none hidden md:block">
          <button onClick={() => navigate(-1)} className="bg-gray-200 dark:bg-gray-600 py-2 px-5 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-gray-200 font-normal rounded-full">
            <FontAwesomeIcon className="mr-2 text-black dark:text-gray-200" icon={faArrowLeft} />
            Go Back
          </button>
        </div>
      </div>
      <div className="pt-5">
        <div className='flex justify-between flex-wrap'>
          <div>
            <span className="font-medium text-black dark:text-gray-200 text-md md:text-xl">Showing searched results for:</span>
            <span className="font-bold text-black dark:text-gray-200 ml-3 text-md md:text-xl">{keyword}</span>
          </div>
          <div>
            <span className="font-medium text-black dark:text-gray-200 text-md md:text-lg">Filter by: </span>
            <button
              data-testid="filterby-movie-button"
              className={`bg-${filterBy === 'movie' ? 'black' : 'gray-200'} dark:bg-${filterBy === 'movie' ? 'black' : 'gray-600'} py-1 px-5 mr-1 text-${filterBy === 'movie' ? 'white' : 'black'} dark:text-gray-200 font-normal rounded-full`}
              onClick={() => setFilterBy(prev => (prev === "movie" ? '' : "movie"))}
            >
              Movie
            </button>
            <button
              data-testid="filterby-tv-button"
              className={`bg-${filterBy === 'tv' ? 'black' : 'gray-200'} dark:bg-${filterBy === 'tv' ? 'black' : 'gray-600'} py-1 px-5 mr-1 text-${filterBy === 'tv' ? 'white' : 'black'} dark:text-gray-200 font-normal rounded-full`}
              onClick={() => setFilterBy(prev => (prev === "tv" ? '' : "tv"))}
            >
              TV
            </button>
          </div>
        </div>
        <div className="w-full py-2">
          <div className="flex flex-wrap">
            {search.filter(x => filterBy ? x.media_type === filterBy : x).map((x: iMovie, idx: number) => (
              <div key={x.id} ref={(search.filter(x => filterBy ? x.media_type === filterBy : x).length === idx + 1) ? lastElement : null} className="flex-shrink-0 p-1">
                <img
                  className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                  src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                  alt="poster"
                  onClick={() => navigate(`/movie/${x.id}`)}
                />
              </div>
            ))}
          </div>
          {loading && <LoadingSpinner />}
          {(!loading && !error && search.length === 0 && keyword) && <p className='dark:text-gray-200 text-black'>No result found</p>}
          {error && <p className='dark:text-gray-200 text-black'>An Error has occured. We have failed to fetch search results. Please try again by refreshing you page.</p>}
        </div>
      </div>
    </div >
  );
};

export default SearchMovies