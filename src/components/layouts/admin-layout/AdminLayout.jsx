import './AdminLayout.css'
import { Outlet, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import {
    AppleOutlined,
    BarChartOutlined,
    CoffeeOutlined,
    CommentOutlined,
    DesktopOutlined,

    DollarCircleOutlined,

    FileDoneOutlined,

    GiftOutlined,

    HomeOutlined,

    LogoutOutlined,

    PieChartOutlined,

    ProductOutlined,

    TableOutlined,

    TeamOutlined,

    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import logo from '../../../assets/logo.jpg';
import avatar from '../../../assets/avatar.png';
const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
    bottom: 0,
    width: '100%',
    padding: '0',
};


export const AdminLayout = () => {

    // antd -->
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // antd <--

    const navigate = useNavigate()

    return (
        <>
            <Layout className='Prevent__Select' style={{ minHeight: '100vh' }}>
                <Sider
                    width={270}
                    style={siderStyle}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={value => setCollapsed(value)}>
                    <div className="Logo__Web__Admin">
                        <img src={logo} alt="" srcSet="" />
                    </div>
                    <Menu

                        theme="dark" defaultSelectedKeys={['1']} mode="inline"
                        items={[
                            {
                                key: 1,
                                icon: <TableOutlined />,
                                label: 'Dashboard',
                                onClick: () => {
                                    navigate('/admin')
                                }
                            },
                            {
                                key: 2,
                                icon: <TeamOutlined />,
                                label: 'Tai khoan',
                                onClick: () => {
                                    navigate('/admin/accounts')
                                }
                            },
                            {
                                key: 3,
                                icon: <ProductOutlined />,
                                label: 'Mon an',
                                onClick: () => {
                                    navigate('/admin/foods')
                                }
                            },
                            {
                                key: 4,
                                icon: <GiftOutlined />,
                                label: 'Phieu giam gia',
                                onClick: () => {
                                    navigate('/admin/coupons')
                                }
                            },
                            {
                                key: 5,
                                icon: <FileDoneOutlined />,
                                label: 'Don hang',
                                onClick: () => {
                                    navigate('/admin/orders')
                                }
                            },
                            {
                                key: 6,
                                icon: <CommentOutlined />,
                                label: 'Danh gia',
                                onClick: () => {
                                    navigate('/admin/reviews')
                                }
                            },
                            {
                                key: 'sub1',
                                icon: <BarChartOutlined />,
                                label: 'Xem thong ke',
                                children: [
                                    {
                                        key: 7,
                                        icon: <DollarCircleOutlined />,
                                        label: 'Doanh thu',
                                        onClick: () => {
                                            navigate('/admin/statistics/revenue')
                                        }
                                    },
                                    {
                                        key: 8,
                                        icon: <FileDoneOutlined />,
                                        label: 'Don hang',
                                        onClick: () => {
                                            navigate('/admin/statistics/orders')
                                        }
                                    },
                                    {
                                        key: 9,
                                        icon: <ProductOutlined />,
                                        label: 'Mon an',
                                        onClick: () => {
                                            navigate('/admin/statistics/foods')
                                        }
                                    },
                                    {
                                        key: 10,
                                        icon: <UserOutlined />,
                                        label: 'Khach hang',
                                        onClick: () => {
                                            navigate('/admin/statistics/customers')
                                        }
                                    },
                                ]
                            },
                        ]}

                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                            color: '#f5f5f5',
                            borderBottom: 'solid 10px #f5f5f5',
                            height: 'auto'
                        }}>
                        <strong>
                            Quan Tri Vien &nbsp;
                        </strong>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: (
                                            <span>
                                                <LogoutOutlined />
                                                &nbsp;
                                                Dang xuat
                                            </span>
                                        ),
                                    },
                                ]
                            }}
                            placement='bottomRight'
                        >

                            <Avatar size={50} src={avatar} />
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 10px', fontSize: 18 }} items={[{ title: <HomeOutlined style={{ fontSize: 20 }} /> }, { title: 'Dashboard' }]} />
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Foodstore ©{new Date().getFullYear()} Created by foodstore
                    </Footer>
                </Layout>
            </Layout >
        </>
    )
}
