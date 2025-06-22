import { Modal, Tabs } from 'antd';
import { useNavigate } from "react-router-dom"

const { TabPane } = Tabs;

export const ModalNotification = ({ open, onClose }) => {
    const navigate = useNavigate()
    return (
        <>
            <Modal
                title="Thông báo"
                open={open}
                onCancel={onClose}
                footer={null}
                sytle={{ fontFamily: 'sans-serif' }}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Phiếu giảm giá" key="1">
                        AHIHI
                    </TabPane>
                    <TabPane tab="Đơn hàng" key="2" >
                        <div onClick={() => navigate('/my-order')} style={{ cursor: 'pointer' }}>
                            AHUHU
                        </div>
                    </TabPane>

                </Tabs>
            </Modal>

        </>
    )
}