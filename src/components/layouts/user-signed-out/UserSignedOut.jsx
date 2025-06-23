import { Outlet, useNavigate } from "react-router-dom"
import { useSession } from "../../../context/SessionContext"
import { useEffect } from "react"

export const UserSignedOut = () => {
    const { user } = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        const authUserSignedOut = () => {
            if (!user) {
                navigate('/login')
            } else if (user.is_admin === 1) {
                navigate('/admin')
            }
        }
        //
        authUserSignedOut()
    }, [user, navigate])

    return <Outlet />
}