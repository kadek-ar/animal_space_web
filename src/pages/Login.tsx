import { Card, Form, Input, Button, Typography, Modal, Flex } from "antd";
import { api } from "../utillities/api";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";

const { confirm } = Modal;

function storeToken(res: any) {
    const authStorage = {
        token: res?.data?.token
    }
    localStorage.setItem('auth', JSON.stringify(authStorage))
}

const getUser = async (navigate: Function) => {
    await api.get('/user').then((res) => {
        localStorage.setItem('user', JSON.stringify(res?.data || ''))
        if(res?.data?.role === 'admin'){
            navigate('/admin/home')
        }else{
            navigate('/')
        }
    }).catch((err) => {
        confirm({
            title: 'Error to login',
            icon: <CloseCircleOutlined />,
            content: `${err.toString()}`,
        });
    })
}

export default function Login() {
    const navigate = useNavigate()
    const onFinish = async (val: any) => {
        await api.post('/login', val).then((res) => {
            storeToken(res)
        }).catch((err) => {
            confirm({
                title: 'Error to login',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
        getUser(navigate);
    }

    return (
        <Container >
            <Flex gap="small" wrap="wrap">
                <Button type="primary" onClick={() => navigate('/register')}>Register</Button>
            </Flex>
            <Card>
                <Typography.Title level={3}>Login</Typography.Title>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name={['email']}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name={['password']}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    )
}