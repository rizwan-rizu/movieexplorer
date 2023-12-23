const Home = () => {
  return (
    <div className="bg-gray-100 h-full px-7 py-3">
      <div className="flex flex-row align-center relative">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-3xl text-black">The</p>
          <p className="font-semibold text-3xl text-black">Movie</p>
          <p className="font-semibold  text-3xl">Tracker</p>
        </div>
        <div className="absolute left-[50%] top-[22px] -translate-x-1/2 ">
          <input className={`bg-gray-300 w-[630px] placeholder-black h-[57px] p-3 pl-4 text-lg text-center rounded-full`} type="text" name="userName" placeholder="Search a movie or series" />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div>
          <p className="font-medium text-black text-lg">Currently watching</p>
        </div>
        <div>
          <p className="font-medium text-black text-lg">Suggested to watch</p>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-4">
        <div>
          <p className="font-medium text-black text-lg">Previously watched</p>
        </div>
      </div>
    </div>
  )
}

export default Home;