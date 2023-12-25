import { apiService } from "../../apiService"
import { iMovie } from "../home/interface";

export const getMovieDetail = async (
  movieId: string | undefined,
  setMovie: React.Dispatch<React.SetStateAction<iMovie>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/movie/${movieId}?append_to_response=credits`)
    if (res.status === 200) {
      setMovie(res.data);
    }
    else setShowAlert({ show: true, message: "Failed to fetch movie detail. Please try again by refreshing your page." })
  } catch (error) {
    setShowAlert({ show: true, message: "Failed to fetch movie detail. Please try again by refreshing your page." })
  } finally {
    setLoading(false);
  }
}

export const getMovieReviews = async (
  movieId: string | undefined,
  setReviews: React.Dispatch<React.SetStateAction<any>>,
  setIsReviewLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/movie/${movieId}/reviews`)
    if (res.status === 200) {
      setReviews(res.data.results);
    }
    else setShowAlert({ show: true, message: "Failed to fetch movie reviews. Please try again by refreshing your page." })
  } catch (error) {
    setShowAlert({ show: true, message: "Failed to fetch movies reviews. Please try again by refreshing your page." })
  } finally {
    setIsReviewLoading(false);
  }
}