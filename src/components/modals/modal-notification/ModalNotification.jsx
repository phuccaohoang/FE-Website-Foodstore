import { Col, Divider, Modal, Row, Tabs } from 'antd';
import { useNavigate } from "react-router-dom"
import { useSession } from '../../../context/SessionContext';
import { useEffect, useState } from 'react';
import couponService from '../../../services/couponService';

const { TabPane } = Tabs;

export const ModalNotification = ({ open, onClose }) => {
    const navigate = useNavigate()
    const { contextHolder, openNotification, user, setNote } = useSession()
    const [coupons, setCoupons] = useState([])
    useEffect(() => {
        if (user) {
            const loadCoupons = async () => {
                const response = await couponService.getCouponsCustomer()
                if (response.status) {
                    setCoupons(response.data)
                    setNote(response.data.length)
                }
            }

            //


            loadCoupons()
        }

    }, [open, user])

    return (
        <>
            {contextHolder}
            <Modal
                width={1000}
                title="Thông báo"
                open={open}
                onCancel={onClose}
                footer={null}
                sytle={{ fontFamily: 'sans-serif' }}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Phiếu giảm giá" key="1">
                        {
                            coupons.length !== 0 ? <>
                                <Row>
                                    <Col span={6}>
                                        Ten Phieu
                                    </Col>
                                    <Col span={10}>
                                        Mo ta
                                    </Col>
                                    <Col span={4}>
                                        So luong
                                    </Col>
                                    <Col span={4}>
                                        Han su dung
                                    </Col>
                                </Row>
                                <Divider />
                                {
                                    ...coupons.map((item) => {
                                        return <>
                                            <Row>
                                                <Col span={6}>
                                                    {item.name}
                                                </Col>
                                                <Col span={10}>
                                                    {item.description}
                                                </Col>
                                                <Col span={4}>
                                                    {item.quantity}
                                                </Col>
                                                <Col span={4}>
                                                    {item.expire_date}
                                                </Col>
                                            </Row>
                                            <Divider />

                                        </>
                                    })
                                }
                            </> : 'Khong co.'
                        }
                    </TabPane>

                </Tabs>
            </Modal>

        </>
    )
}