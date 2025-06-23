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
            }
        }
        //
        authUserSignedOut()
    }, [user, navigate])

    return <Outlet />
}