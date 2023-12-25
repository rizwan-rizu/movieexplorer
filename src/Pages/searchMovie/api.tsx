import { apiService } from "../../apiService";
import { iMovie } from "../home/interface";

export const getSearchMovies = async (
  page: number,
  keyword: string,
  setSearch: React.Dispatch<React.SetStateAction<iMovie[] | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAlert?: React.Dispatch<React.SetStateAction<{ show: boolean, message: string }>>,
) => {
  try {
    setLoading(true)
    const res = await apiService.get(`/search/multi?query=${keyword}&page=${page}`)
    if (res.status === 200) {
      setSearch((prev: iMovie[] | null) => (prev !== null ? [...prev, ...res.data.results] : res.data.results));
    }
    else setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } catch (error) {
    setShowAlert && setShowAlert({ show: true, message: "Failed to fetch trending movies" })
  } finally {
    setLoading(false);
  }
}
