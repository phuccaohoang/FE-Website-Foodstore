import { Outlet, useNavigate } from "react-router-dom"
import { useSession } from "../../../context/SessionContext"
import { useEffect } from "react"
import { Spin } from "antd"
import { ConfigProvider } from 'antd'

export const MasterLayout = () => {

    const { refresh, contextHolder, loading } = useSession()
    const navigate = useNavigate()


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate, refresh])

    return <>
        {contextHolder}
        <ConfigProvider

            theme={{
                components: {
                    Modal: {
                        zIndexPopupBase: 1000,
                    },
                    Spin: {
                        zIndexPopupBase: 999999,
                    }
                }
            }}
        >

            <Spin spinning={loading} fullscreen size="large" tip="Đang tải" />
            <Outlet />
        </ConfigProvider>

    </>
}