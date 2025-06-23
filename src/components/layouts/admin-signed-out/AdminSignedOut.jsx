import { Outlet, useNavigate } from "react-router-dom"
import { useSession } from "../../../context/SessionContext"
import { useEffect } from "react"

export const AdminSignedOut = () => {
    const { user } = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        const authAdminSignedOut = () => {
            if (!user) {
                navigate('/admin/login')
            } else if (user.is_admin === 0) {
                navigate('/')
            }
        }
        //
        authAdminSignedOut()
    }, [user, navigate])

    return <Outlet />
}