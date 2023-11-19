import { CheckOutlined, CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space, Spin, Table, Typography, Upload, UploadProps, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { api, fetcher } from "../../utillities/api";
import { useState, useEffect } from "react";
import UploadImage from "../../components/UploadImage";
import useSWR from "swr";



export default function CreateCatogories() {
    
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState()

    const { data, mutate } = useSWR('/shelter/category', fetcher);

    const columns: ColumnsType<any> = [
        {
            title: 'No.',
            key: 'name',
            render: (_: any, rec: any, idx: any) => {
                return <div>{idx + 1}</div>
            }
        },
        {
            title: 'Picture',
            dataIndex: 'Image',
            key: 'name',
            render: (val: string) => {
                if(!val) return null
                return (
                    <div style={{ width: '200px' }}>
                        <img style={{ width: '100%' }} src={val} alt="category_img" />
                    </div>
                )
            }
        },
        {
            title: 'Category name',
            dataIndex: 'Name',
            key: 'name',
        },
    ];

    const onFinish = (val: any) => {
        api.post('/shelter/category', val).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to Create catory`,
            });
            mutate()
        }).catch((err) => {
            Modal.error({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    return (
        <Card>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Typography.Title level={3}>Category List</Typography.Title>
                <div>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        form={form}
                    >
                        <UploadImage form={form} />
                        <Form.Item 
                            label="Category name" 
                            name={['name']}
                            rules={[
                                {
                                    required: true,
                                    message: 'name is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
                <Table
                    columns={columns}
                    dataSource={ data?.data || []}
                />
            </Space>
        </Card>
    )
}