import { Routes, Route } from "react-router-dom"
import { removeStorageItem, roles } from "./utility";
import { useEffect } from "react";
import ProtectedRoute from "./protectedRoutes";
import Login from "./Pages/login";
import Registration from "./Pages/registration";
import Home from "./Pages/home";
import MovieDetail from "./Pages/movieDetail";
import SearchMovies from "./Pages/searchMovie";

const App = () => {

  useEffect(() => {
    return (() => { removeStorageItem("isLogin") })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute role={[roles.ALL]} element={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/movie/:movieId" element={<ProtectedRoute role={[roles.ALL]} element={<MovieDetail />} />} />
      <Route path="/search" element={<ProtectedRoute role={[roles.ALL]} element={<SearchMovies />} />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
export default App;
