import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, Typography, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout


export default function ShelterLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const bread_crumb = (window.location.pathname).split('/').filter((item: string) => item !== '')

    return (
        <Layout
            style={{ minHeight: '100vh' }}
        >
            <Header style={{ display: 'flex', alignItems: 'center' }}>
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
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }} trigger={null} collapsible collapsed={collapsed}>
                    <div>
                        <Typography.Title style={{ padding: '10px 0px 0px 15px' }} level={1}>Shelter</Typography.Title>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Home',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        { bread_crumb.map((item: string) => {
                                return (
                                    <Breadcrumb.Item>{item}</Breadcrumb.Item>
                                )
                            })
                        }
                        
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}