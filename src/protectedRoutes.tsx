import { Navigate } from "react-router-dom";
import { getStorageItem } from "./utility";

interface iProtectedRouteProps {
  element: any
  role: string[]
}

const ProtectedRoute = ({ element, role }: iProtectedRouteProps) => {

  if (getStorageItem("isLogin") !== 'true' && !['/login', '/register'].includes(window.location.pathname)) {
    return <Navigate to={'/login'} />
  }

  // if (token && !userRoles.length) {
  //   return <Loading />
  // }

  // if (token && !role.includes(roles.ALL) && !role.some((x: string) => userRoles.includes(x))) {
  //   return <AccessDenied />
  // }

  return element;
}

export default ProtectedRoute;