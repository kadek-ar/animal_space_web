import { Card, Form, Input, Button, Typography, Flex, Modal } from "antd";
import { api } from "../utillities/api";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

function Register() {
    const navigate = useNavigate()
    const onFinish = (value: any) => {
        api.post('/signup', value).then(() => {
            navigate('/login')
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    return (
        <Container>
            <Card className="box-shadow" style={{ marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                <Flex justify="center">
                    <Typography.Title level={3}>Register</Typography.Title>
                </Flex>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="username"
                        name={['username']}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name={['email']}
                        rules={[{ required: true, message: 'Please input your email!' }]}
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

                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Flex justify="center">
                        <Button type="link" onClick={() => navigate('/login')}>Have an account? login here</Button>
                    </Flex>
                </Form>
            </Card>
        </Container>
    )
}

export default Register