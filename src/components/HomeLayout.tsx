import { Avatar, Dropdown, Flex, Input, Layout, MenuProps, Space, Typography } from "antd"
import { Container } from 'react-bootstrap'
import { Outlet, useNavigate } from "react-router-dom";
import { LoginOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";

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

    const items: MenuProps['items'] =  !getUser() ? [
        {
          key: '1',
          label: "Login",
          icon: <LoginOutlined />,
          onClick: () => {
            localStorage.clear()
            navigate('/login')
          }
        }
    ]
        :
    [
        {
          key: '1',
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            localStorage.clear()
            navigate('/login')
          }
        },
        {
          key: '2',
          label: getUser()?.username,
          icon: <UserOutlined />,
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
            <Space direction="vertical" size="middle" className="space-header-home">
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    className="header-home"
                >
                    <Container >
                        <Flex gap="small" justify="space-between" align="center">
                            <Typography.Title 
                                style={{ marginBottom: 0, color: "#fff" }} 
                                level={1}
                                onClick={() => navigate('/')}
                                className="only-on-desktop"
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
                                className="input-search-home"
                            />
                            <Flex gap="large" wrap="wrap">
                                <ShoppingCartOutlined style={{color: '#fff'}} onClick={() => navigate('/cart')} />
                                <ShoppingOutlined style={{color: '#fff'}} onClick={() => navigate('/transaction')} />
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space style={{color: '#fff'}}>
                                            <Avatar style={{ marginBottom: '4px' }} size="small" icon={<UserOutlined />} />
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
                        <Flex justify="center">
                            <Typography.Text strong>Animal Space</Typography.Text>
                        </Flex>
                    </Container>
                </Footer>
            </Space>
        </Layout>
    )
}

export default HomeLayout