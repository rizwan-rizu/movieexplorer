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
  const { search, loading, error, hasMore } = useMovieSearch(keyword, page);
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
    <div className="px-7 py-3 bg-gray-100 h-full overflow-auto">
      <div className="flex items-center">
        <div className="flex-none">
          {logoText(navigate)}
        </div>
        <div className="text-center grow">
          <input
            className={`bg-gray-200 w-[60%] placeholder-black h-[57px] p-3 pl-4 text-lg text-center rounded-full`}
            type="text"
            name="keyword"
            placeholder="Search a movie or series"
            onChange={(e) => debounceOnChange(e.target.value)}
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
        <span className="font-medium text-black text-xl">Showing searched results for:</span>
        <span className="font-bold text-black ml-3 text-xl">{keyword}</span>
        <div className="w-full py-2">
          <div className="flex flex-wrap">
            {search.map((x: iMovie, idx: number) => {
              if (['tv', 'movie'].includes(x.media_type) && x.poster_path !== null) {
                return (
                  <div key={x.id} ref={(search.length === idx + 1) ? lastElement : null} className="flex-shrink-0 p-2">
                    <img
                      className="rounded-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                      src={`https://image.tmdb.org/t/p/w185/${x.poster_path}`}
                      alt="poster"
                      onClick={() => navigate(`/movie/${x.id}`)}
                    />
                  </div>
                )
              }
            }
            )}
          </div>
          {loading && <LoadingSpinner />}
          {(!loading && !error && search.length === 0 && keyword) && <p>No result found</p>}
          {error && <p>An Error has occured. We have failed to fetch search results. Please try again by refreshing you page.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchMovies