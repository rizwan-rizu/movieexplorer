const Registration = () => {
  return (
    <div className="h-full relative w-full">
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-6xl text-black">The</p>
          <p className="font-semibold text-6xl text-black">Movie</p>
          <p className="font-semibold  text-6xl">Tracker</p>
        </div>
        <div className="mt-4"><input className={`bg-gray-300 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} type="text" name="userName" placeholder="Username" /></div>
        <div className="mt-4"><input className={`bg-gray-300 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} type="email" name="email" placeholder="Email Address" /></div>
        <div className="mt-2"><input className={`bg-gray-300 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} type="password" name="password" placeholder="Password" /></div>
        <div className="mt-2"><input className={`bg-gray-300 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} type="password" name="confirmPassword" placeholder="Confirm Password" /></div>
        <div className="mt-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full  py-2 px-4 rounded-full">Register</button></div>
        <div className="mt-3"><p className="text-gray-600 font-normal">Already have an account? , <span className="font-bold">Login</span></p></div>
      </div>
      <div className="absolute bottom-[15px] left-[50%] -translate-x-1/2"><p className="text-black font-bold">Built with ❤️ by Elshazlii</p></div>
    </div>
  )
}

export default Registration;