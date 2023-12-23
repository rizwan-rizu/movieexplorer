// import { Navigate } from "react-router-dom"

interface iProtectedRouteProps {
  element: any
  role: string[]
}

const ProtectedRoute = ({ element, role }: iProtectedRouteProps) => {

  // if (!token) {
  //   return <Navigate to={'/'} />
  // }

  // if (token && !userRoles.length) {
  //   return <Loading />
  // }

  // if (token && !role.includes(roles.ALL) && !role.some((x: string) => userRoles.includes(x))) {
  //   return <AccessDenied />
  // }

  return element;
}

export default ProtectedRoute;