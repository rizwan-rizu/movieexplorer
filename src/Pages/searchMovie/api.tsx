import { apiService } from "../../apiService";
import { iMovie } from "../home/interface";

export const getSearchMovies = async (
  keyword: string,
  setSearch: React.Dispatch<React.SetStateAction<iMovie[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>
) => {
  try {
    const res = await apiService.get(`/search/multi?query=${keyword}`)
    if (res.status === 200) {
      setSearch(res.data.results);
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } finally {
    setLoading(false);
  }
}