import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="pb-5 px-7 pt-3 flex justify-between items-center">
      <div className="">
        <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate('/')}>
          <p className="font-semibold text-3xl text-black ">The</p>
          <p className="font-semibold text-3xl text-black">Movie</p>
          <p className="font-semibold text-3xl">Tracker</p>
        </div>
      </div>
      <div className="">
        <button className="bg-gray-200 py-2 px-5 hover:bg-gray-300 text-black font-normal rounded-full" onClick={() => navigate("/search")}>
          <FontAwesomeIcon className="mr-2" icon={faSearch} />
          Search Movie
        </button>
      </div>
    </div>
  )
}

export default Header