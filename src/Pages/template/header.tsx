import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const logoText = (navigate: Function) => (
  <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate('/')}>
    <p className="font-semibold sm:text-xl md:text-3xl text-black dark:text-gray-200">The</p>
    <p className="font-semibold sm:text-xl md:text-3xl text-black dark:text-gray-200">Movie</p>
    <p className="font-semibold sm:text-xl md:text-3xl text-black dark:text-gray-200">Tracker</p>
  </div>
)

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="pb-5 px-7 pt-3 flex justify-between items-center">
      {logoText(navigate)}
      <div>
        <button className="bg-gray-200 dark:bg-gray-600 py-2 px-5 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-gray-200 font-normal rounded-full" data-testid="search-movie-button" onClick={() => navigate("/search")}>
          <FontAwesomeIcon className="mr-2" icon={faSearch} />
          Search Movie
        </button>
      </div>
    </div>
  )
}

export default Header