// export const getTrendingMovies = async (
//   hasUnMounted: Boolean,
//   setLaunch: React.Dispatch<React.SetStateAction<iLaunchProps[]>>,
//   setSnackbar?: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
// ) => {
//   try {
//     const res = await apiService.get(`/launches/past`)
//     if (!hasUnMounted) {
//       if (res.status === 200) {
//         setLaunch(res.data)
//       }
//       else setSnackbar && setSnackbar({ open: true, message: "Failed to fetch launches" })
//     }
//   } catch (error) {
//     if (!hasUnMounted) {
//       setSnackbar && setSnackbar({ open: true, message: "Failed to fetch launches" })
//     }
//   }
// }