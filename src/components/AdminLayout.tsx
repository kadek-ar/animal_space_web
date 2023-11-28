import { AppstoreOutlined, ArrowLeftOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined,ShoppingOutlined,UnorderedListOutlined,UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout


export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Home',
                            onClick: () => navigate('/admin/home')
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'List Category',
                            onClick: () => navigate('/admin/category')
                        },
                        {
                            key: '3',
                            icon: <ShoppingOutlined />,
                            label: 'All Transaction',
                            onClick: () => navigate('/admin/transaction')
                        },
                        {
                            key: '4',
                            icon: <UnorderedListOutlined />,
                            label: 'All Animal',
                            onClick: () => navigate('/admin/animal')
                        },
                        {
                            key: '5',
                            icon: <AppstoreOutlined />,
                            label: 'Slide Show Banner',
                            onClick: () => navigate('/admin/banner')
                        },
                        {
                            key: '6',
                            icon: <ArrowLeftOutlined />,
                            label: 'Animal Shelter',
                            onClick: () => navigate('/')
                        },
                        {
                            key: '7',
                            icon: <LogoutOutlined />,
                            label: 'Log out',
                            onClick: () => {
                                localStorage.clear()
                                navigate('/login')
                            }
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}