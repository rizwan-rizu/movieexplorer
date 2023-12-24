import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

const Header = () => {
  return (
    <div className="pb-5 px-7 pt-3 flex items-center">
      <div className="flex-none">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-3xl text-black">The</p>
          <p className="font-semibold text-3xl text-black">Movie</p>
          <p className="font-semibold  text-3xl">Tracker</p>
        </div>
      </div>
      <div className="grow text-center">
        <input className={`bg-gray-200 w-[630px] placeholder-black h-[57px] p-3 pl-4 text-lg text-center rounded-full`} type="text" name="userName" placeholder="Search a movie or series" />
      </div>
      <div className="flex-none">
        <FontAwesomeIcon icon={faUser} className='mr-2 ' />
        <span className="font-semibold">John Doe</span>
      </div>
    </div>
  )
}

export default Header