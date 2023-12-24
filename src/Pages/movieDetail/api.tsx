import { apiService } from "../../apiService"
import { iMovie } from "../home/interface";

export const getMovieDetail = async (
  movieId: string | undefined,
  setMovie: React.Dispatch<React.SetStateAction<iMovie>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/movie/${movieId}?append_to_response=credits`)
    if (res.status === 200) {
      setMovie(res.data);
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } finally {
    setLoading(false);
  }
}

export const getMovieReviews = async (
  movieId: string | undefined,
  setReviews: React.Dispatch<React.SetStateAction<any>>,
  setIsReviewLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/movie/${movieId}/reviews`)
    if (res.status === 200) {
      setReviews(res.data.results);
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch movie reviews" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch movies reviews" })
  } finally {
    setIsReviewLoading(false);
  }
}