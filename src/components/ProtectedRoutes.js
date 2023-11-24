import { Navigate, Outlet } from "react-router-dom"
export const ProtectedRoutes = ({isLogged}) =>{
    if(!isLogged){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}