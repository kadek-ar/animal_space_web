import { Button, Card, Form, Input, Modal, Typography } from "antd";
import { Container } from "react-bootstrap";
import { api } from "../../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function CreateShelter() {
    const navigate = useNavigate()

    const onFinish = (value: any) => {
        api.post('/shelter/create', value).then(() => {
            navigate('/')
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
            <Card>
                <Typography.Title level={3}>Create Your Shelter</Typography.Title>
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
                        label="Shelter Name"
                        name={['name']}
                        rules={[{ required: true, message: 'Please input your Selter Name!' }]}
                    >
                        <Input placeholder="Your shelter name" />
                    </Form.Item>
                    <Form.Item
                        label="phone"
                        name={['phone']}
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input placeholder="Input shlter phone" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={['description']}
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input.TextArea placeholder="Input your shelter description" />
                    </Form.Item>
                    <Form.Item
                        label="Detail Address"
                        name={['address']}
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input.TextArea placeholder="write down your detail address" />
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