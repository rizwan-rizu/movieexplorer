import { Navigate, useNavigate } from "react-router-dom";
import { getStorageItem, setStorageItem } from "../../utility";

const Login = () => {
  const navigate = useNavigate()

  if (getStorageItem("isLogin") === 'true') return <Navigate to={"/"} />
  else return (
    <div className="h-full relative bg-white dark:bg-gray-600 dark:bg-slate-800 w-full">
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-start">
          <p className="font-semibold  text-6xl text-black dark:text-gray-200">The</p>
          <p className="font-semibold text-6xl text-black dark:text-gray-200">Movie</p>
          <p className="font-semibold text-black dark:text-gray-200 text-6xl">Tracker</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setStorageItem("isLogin", "true"); navigate("/") }}>
          <div className="mt-4"><input className={`bg-gray-200 dark:bg-gray-600 dark:placeholder-white text-black dark:text-gray-200 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} name="userName" data-testid="user-input" type="text" placeholder="Username" required /></div>
          <div className="mt-2"><input className={`bg-gray-200 dark:bg-gray-600 dark:placeholder-white text-black dark:text-gray-200 w-[400px] placeholder-black h-[52px] p-3 pl-4 rounded-full`} name="password" data-testid="password-input" type="password" placeholder="Password" required /></div>
          <div className="mt-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full  py-2 px-4 rounded-full" data-testid="login-button" type="submit">Login</button></div>
        </form>
        <div className="mt-3">
          <span className="text-gray-600 text-black dark:text-gray-200 font-normal">
            You don’t have an account?
          </span>
          <span className="font-bold text-black dark:text-gray-200 cursor-pointer ml-2" onClick={() => navigate("/register")}>SignUp</span>
        </div>
      </div>
      <div className="absolute bottom-[15px] left-[50%] -translate-x-1/2"><p className="text-black dark:text-gray-200 font-bold">Built with ❤️ by Elshazlii</p></div>
    </div>
  )
}

export default Login;