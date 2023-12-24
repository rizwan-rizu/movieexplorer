import { apiService } from "../../apiService"
import { iMovie } from "./interface"

export const getTrendingMovies = async (
  page: number,
  setTrending: React.Dispatch<React.SetStateAction<iMovie[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/trending/movie/week?page=${page}`)
    if (res.status === 200) {
      setTrending((prev) => ([...prev, ...res.data.results]));
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } finally {
    setLoading(false);
  }
}

export const getWatchlistMovies = async (
  page: number,
  setTrending: React.Dispatch<React.SetStateAction<iMovie[]>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`account/${process.env.REACT_APP_ACCOUNT_ID}/watchlist/movies?page=${page}`)
    if (res.status === 200) {
      setTrending(res.data.results);
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  }
}