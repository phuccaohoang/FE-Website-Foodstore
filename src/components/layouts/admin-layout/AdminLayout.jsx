import './AdminLayout.css'
import { Outlet, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import {
    DesktopOutlined,

    PieChartOutlined,

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
    padding: '0'
};

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
        onclick,
    };
}
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
                    style={siderStyle}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={value => setCollapsed(value)}>
                    <div className="Logo__Web__Admin">
                        <img src={logo} alt="" srcset="" />
                    </div>
                    <Menu

                        theme="dark" defaultSelectedKeys={['1']} mode="inline"
                        items={[
                            {
                                key: 1,
                                label: 'Dashboard',
                                onClick: () => {
                                    navigate('/admin')
                                }
                            },
                            {
                                key: 2,
                                label: 'Tai khoan',
                                onClick: () => {
                                    navigate('/admin/accounts')
                                }
                            },
                            {
                                key: 3,
                                label: 'Mon an',
                                onClick: () => {
                                    navigate('/admin/foods')
                                }
                            },
                            {
                                key: 4,
                                label: 'Phieu giam gia',
                                onClick: () => {
                                    navigate('/admin/coupons')
                                }
                            },
                            {
                                key: 5,
                                label: 'Don hang',
                                onClick: () => {
                                    navigate('/admin/orders')
                                }
                            },
                            {
                                key: 6,
                                label: 'Danh gia',
                                onClick: () => {
                                    navigate('/admin/reviews')
                                }
                            },
                            {
                                key: 'sub1',
                                label: 'Xem thong ke',
                                children: [
                                    {
                                        key: 7,
                                        label: 'Doanh thu',
                                        onClick: () => {
                                            navigate('/admin/statistics/revenue')
                                        }
                                    },
                                    {
                                        key: 8,
                                        label: 'Don hang',
                                        onClick: () => {
                                            navigate('/admin/statistics/orders')
                                        }
                                    },
                                    {
                                        key: 9,
                                        label: 'Mon an',
                                        onClick: () => {
                                            navigate('/admin/statistics/foods')
                                        }
                                    },
                                    {
                                        key: 10,
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
                            zIndex: 1,
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
                        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Thanh dia chi' }, { title: 'Thanh dia chi' }]} />
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
            </Layout>
        </>
    )
}
