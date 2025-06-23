import { Outlet, useNavigate } from "react-router-dom"
import { useSession } from "../../../context/SessionContext"
import { useEffect } from "react"


export const AuthLoggedIn = () => {

    const { user } = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (user.is_admin) {
                navigate('/admin')
            } else {
                navigate('/')
            }
        }
    }, [user, navigate])

    return <Outlet />
}