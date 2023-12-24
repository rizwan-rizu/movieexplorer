const Login = () => {

  return (
    <div className="h-full relative w-full">
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-6xl text-black">The</p>
          <p className="font-semibold text-6xl text-black">Movie</p>
          <p className="font-semibold  text-6xl">Tracker</p>
        </div>
        <div className="mt-4"><input className={`bg-gray-200 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} name="userName" placeholder="Username" /></div>
        <div className="mt-2"><input className={`bg-gray-200 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} name="password" placeholder="Password" /></div>
        <div className="mt-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full  py-2 px-4 rounded-full">Login</button></div>
        <div className="mt-3"><p className="text-gray-600 font-normal">You don’t have an account? , <span className="font-bold">SignUp</span></p></div>
      </div>
      <div className="absolute bottom-[15px] left-[50%] -translate-x-1/2"><p className="text-black font-bold">Built with ❤️ by Elshazlii</p></div>
    </div>
  )
}

export default Login;