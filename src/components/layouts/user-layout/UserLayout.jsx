import './UserLayout.css'
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import { UserOutlined, ShoppingCartOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { Layout, Typography, Dropdown, Row, Col, Button, Badge, Tabs } from 'antd';
import { ModalNotification } from '../../modals/modal-notification/ModalNotification';
import { Chatbot } from '../../chatbot/Chatbot';
const { Header, Footer } = Layout;
const { Title, Text, Link } = Typography;

import logo from '../../../assets/logo.jpg'
import avatar from '../../../assets/avatar.jpg'
import { useSession } from '../../../context/SessionContext';
import accountService from '../../../services/accountService';
const { TabPane } = Tabs;

export const UserLayout = () => {

    const [visible, setVisible] = useState(false);
    const toggleChat = () => setVisible(!visible);
    //tao link
    const navigate = useNavigate()
    const { setUser, user } = useSession()

    //mo tat thong bao
    const [openNotification, setOpenNotification] = useState(false);
    const baseUrl = 'http://127.0.0.1:8000/'
    const url = (user && user.avatar) ? `${baseUrl}${user.avatar}` : avatar

    return (
        <>
            <Layout>
                <Header style={{
                    background: '#141414',
                    padding: '0 40px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#27408B',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '75px' }} onClick={() => navigate('/')}>
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: '50px' }}
                        />

                        <h3 style={{ color: "#eee", margin: '10px 0px 10px 10px  ' }}>
                            FOODSTORE
                        </h3>
                        <Typography.Text style={{ color: '#fff', fontSize: 18 }}></Typography.Text>
                    </div>


                    <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'left', marginLeft: '40px' }}>
                        <div className={'nav-link'}
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Trang chủ
                        </div>
                        <div className={'nav-link'}
                            onClick={() => {
                                navigate('/explore')
                            }}
                        >
                            Tìm kiếm
                        </div>
                        <div className={'nav-link'}
                            onClick={() => {
                                navigate('/about-us')
                            }}
                        >
                            Về chúng tôi
                        </div>
                    </div>
                    <div className='Right__Header' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}  >
                        <div onClick={() => {
                            if (!user) {
                                navigate('/login')
                            }
                            else {

                                setOpenNotification(true)
                            }
                        }}>

                            <Badge count={5}>
                                <BellOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                            </Badge>

                        </div>
                    </div>
                    <div className='Right__Header' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
                        <div onClick={() => {
                            if (!user) {
                                navigate('/login')
                            } else {

                                navigate('/my-cart')
                            }
                        }} >

                            <Badge count={5}>
                                <ShoppingCartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                            </Badge>
                        </div>

                        {
                            (!user) ? <>
                                <div onClick={() => {
                                    navigate('/login')
                                }}>
                                    <UserOutlined style={{ fontSize: '24px', color: '#1890ff', cursor: 'pointer', marginTop: '10px' }} />
                                </div>
                            </> : <>
                                <Dropdown
                                    menu={{
                                        items: [

                                            {
                                                key: '2',
                                                label: <div >
                                                    Tài khoản
                                                </div>,
                                                onClick: () => {
                                                    navigate('/my-account')
                                                }
                                            },
                                            {
                                                key: '3',
                                                label: <div >
                                                    Đơn hàng
                                                </div>,
                                                onClick: () => {
                                                    navigate('/my-order')
                                                }
                                            },
                                            {
                                                key: '4',
                                                label: <div >
                                                    Đăng xuất
                                                </div>,
                                                onClick: async () => {
                                                    const response = await accountService.logout()
                                                    if (response.status) {
                                                        setUser(null)
                                                        navigate('/login')
                                                    }
                                                }
                                            },
                                        ]
                                    }}
                                    trigger={['hover']}
                                    placement="bottom"
                                >
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <img style={{ height: '60px', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden' }} src={url} />
                                    </div>
                                </Dropdown>
                            </>
                        }

                    </div>
                </Header>

                <div className='Main__Content_User'>

                    <Outlet />
                </div>


                <div
                    style={{ position: 'fixed', bottom: 50, right: 30, zIndex: 998, backgroundColor: '#1677ff', borderRadius: '50%', padding: '10px' }}
                    onClick={toggleChat}
                >

                    <MessageOutlined style={{ fontSize: '40px', color: 'white' }} />
                </div>
                <Chatbot visible={visible} toggle={toggleChat} />
                <Footer style={{
                    backgroundColor: '#27408B',
                    color: '#fff',
                    padding: '40px 340px',
                    zIndex: 0,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '700px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    marginTop: '10px'

                }}>
                    <Row gutter={[32, 32]}>

                        <Col xs={24} sm={12} md={6}>
                            <Title level={4} style={{ color: '#fff' }}>FOODSTORE</Title>
                            <Text style={{ color: '#ccc' }}>
                                Chuyên cung cấp món ăn ngon, nhanh chóng và chất lượng cho mọi gia đình Việt.
                            </Text>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Title level={5} style={{ color: '#fff' }}>Liên hệ</Title>
                            <Text style={{ display: 'block', color: '#ccc' }}>Hotline: 1900 123456</Text>
                            <Text style={{ display: 'block', color: '#ccc' }}>Email: hotro@foodstore.vn</Text>
                            <Text style={{ display: 'block', color: '#ccc' }}>Địa chỉ: 123, Huỳnh Thúc Kháng, phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</Text>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Title level={5} style={{ color: '#fff' }}>Dịch vụ</Title>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Giao hàng tận nơi</Link>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Đặt món online</Link>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Chính sách hoàn tiền</Link>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Title level={5} style={{ color: '#fff' }}>Kết nối với chúng tôi</Title>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Facebook</Link>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Instagram</Link>
                            <Link href="#" style={{ display: 'block', color: '#ccc' }}>Zalo</Link>
                        </Col>
                    </Row>

                    <div style={{ textAlign: 'center', marginTop: 40, color: '#aaa' }}>
                        © {new Date().getFullYear()} FOODSTORE. Đã đăng ký bản quyền.
                    </div>
                </Footer>
            </Layout >

            <ModalNotification open={openNotification} onClose={() => {
                setOpenNotification(false)
            }} />
        </>
    )
}