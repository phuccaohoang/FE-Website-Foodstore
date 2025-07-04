import { Outlet, useNavigate } from "react-router-dom"
import { useSession } from "../../../context/SessionContext"
import { useEffect } from "react"
import { Spin } from "antd"


export const MasterLayout = () => {

    const { user, contextHolder, loading } = useSession()
    const navigate = useNavigate()



    return <>
        {contextHolder}
        <Spin spinning={loading} fullscreen size="large" tip="Đang tải" />
        <Outlet />
    </>
}