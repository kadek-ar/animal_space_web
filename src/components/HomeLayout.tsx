import { Card, Carousel, Col, Dropdown, Flex, Input, Layout, MenuProps, Row, Space, Typography } from "antd"
import { Container } from 'react-bootstrap'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { DownOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

function HomeLayout() {

    const navigate = useNavigate()
    const searchParams = new URLSearchParams(document.location.search)

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            localStorage.clear()
            navigate('/login')
          }
        },
      ];

    const onSearch = (val: string) => {
        searchParams.set('search', val || '')
        navigate('/search-animal?'+searchParams.toString())
    }

    return (
        <Layout
            style={{
                background: '#fff',
            }}
        >
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Container >
                        <Flex wrap="wrap" gap="small" justify="space-between" align="center">
                            <Typography.Title 
                                style={{ marginBottom: 0, color: "#fff" }} 
                                level={1}
                                onClick={() => navigate('/')}
                            >
                                Animal Space
                            </Typography.Title>
                            <Input.Search
                                prefix={<SearchOutlined />}
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{ width: 304 }}
                                defaultValue={searchParams.get('search') || ''}
                            />
                            <Flex gap="middle" wrap="wrap">
                                <ShoppingCartOutlined style={{color: '#fff'}} onClick={() => navigate('/cart')} />
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space style={{color: '#fff'}}>
                                            <DownOutlined />
                                            {getUser().username}
                                            <UserOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Container>
                </Header>
                <Container>
                    <Content
                        style={{
                            minHeight: '100vh'
                        }}
                    >
                        <Outlet />
                    </Content>
                </Container>
                <Footer>
                    <Container>
                        Footer
                    </Container>
                </Footer>
            </Space>
        </Layout>
    )
}

export default HomeLayout