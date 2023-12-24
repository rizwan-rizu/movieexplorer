import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SearchModal from '../searchMovie';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="pb-5 px-7 pt-3 flex items-center">
      <div className="flex-none grow">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-3xl text-black">The</p>
          <p className="font-semibold text-3xl text-black">Movie</p>
          <p className="font-semibold  text-3xl">Tracker</p>
        </div>
      </div>
      <div className="flex-none">
        <button className="bg-gray-200 py-2 px-5 hover:bg-gray-300 text-black font-normal rounded-full" onClick={handleOpenModal}>
          <FontAwesomeIcon className="mr-2" icon={faSearch} />
          Search Movie
        </button>
      </div>
      <SearchModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Header