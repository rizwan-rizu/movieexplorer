import { apiService } from "../../apiService"
import { iMovie } from "../home/interface";

export const getMovieDetail = async (
  movieId: string | undefined,
  setMovie: React.Dispatch<React.SetStateAction<iMovie>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowError?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/movie/${movieId}`)
    if (res.status === 200) {
      setMovie(res.data);
    }
    else setShowError && setShowError({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowError && setShowError({ show: true, message: "Failed to fetch trending movies" })
  } finally {
    setLoading(false);
  }
}