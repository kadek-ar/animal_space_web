import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, InputNumber, Modal, Select, Space, Spin, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { api, fetcher } from "../../utillities/api";
import useSWR from "swr";
import UploadImage from "../../components/UploadImage";

export default function ShelterHome() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const getShelterId = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp.shelter_id
    }

    const { data, mutate, isLoading } = useSWR(`/animal?shelter_id=${getShelterId()}`, fetcher);
    
    const { data: data_category } = useSWR('/shelter/category', fetcher);

    const mapOptionCategory = (data: any[]) => {
        return (data || []).map((item: any) => ({
            label: item.Name,
            value: item.ID
        }))
    }

    const findCategoriesName = (id: number) => {
        return (data_category?.data || []).find((item: any) => item.ID === id )
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Animal Name',
            dataIndex: 'Image',
            key: 'image',
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
            title: 'Animal Name',
            dataIndex: 'Name',
            key: 'name',
        },
        {
            title: 'Animal Category',
            dataIndex: 'CategoryID',
            key: 'CategoryID',
            render: (val: number) => {
                if(!val) return null
                return (
                    <div>{findCategoriesName(val)?.Name}</div>
                )
            }
        },
        {
            title: 'Animal Type',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: 'Animal Age',
            dataIndex: 'Age',
            key: 'Age',
        },
        {
            title: 'Number of Animal',
            dataIndex: 'Quantity',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Action',
            render: (_: any, rec: any) => {
                return (
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary" ghost icon={<EditOutlined />} onClick={() => editAnimal(rec.ID)}></Button>
                        <Button type="primary" ghost danger icon={<DeleteOutlined /> } onClick={() => deleteAnimal(rec.ID)}></Button>
                    </Flex>
                )
            }
        },
    ];

    const editAnimal = async (id: any) => {
        setIsModalOpen(true)
        setIsEdit(id)
        setLoadingEdit(true)
        await api.get('/animal/'+id).then((res) => {  
            const respon =  res.data.data
            form.setFieldsValue({
                image: respon.Image,
                name: respon.Name,
                gender: respon.Gender,
                CategoryID: respon.CategoryID,
                type: respon.Type,
                age: respon.Age,
                description: respon.Description,
                quantity: respon.Quantity,
                price: respon.Price
            })
        }).catch((err) => {
            Modal.error({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoadingEdit(false)
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (val: any) => {
        const payload = {
            ...val,
            ShelterID: getShelterId()
        }
        setLoading(true)
        if(isEdit){
            api.put('/animal/'+ isEdit, payload).then(() => {
                mutate()
                Modal.success({
                    title: 'Success',
                    icon: <CheckOutlined />,
                    content: `Success to Edit animal`,
                    onOk: () => setIsModalOpen(false)
                });
            }).catch((err) => {
                Modal.error({
                    title: 'Error to Register',
                    icon: <CloseCircleOutlined />,
                    content: `${err.toString()}`,
                });
            }).finally(() => {
                setLoading(false)
            })
        }else{
            api.post('/animal', payload).then(() => {
                mutate()
                Modal.success({
                    title: 'Success',
                    icon: <CheckOutlined />,
                    content: `Success to Create animal`,
                    onOk: () => setIsModalOpen(false)
                });
            }).catch((err) => {
                Modal.error({
                    title: 'Error to Register',
                    icon: <CloseCircleOutlined />,
                    content: `${err.toString()}`,
                });
            }).finally(() => {
                setLoading(false)
            })
        }
        setIsEdit(null)
    }

    const deleteApi = (id: number) => {
        api.delete('/animal/'+ id).then(() => {
            mutate()
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to Delete animal`,
                onOk: () => setIsModalOpen(false)
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error to Register',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }

    const deleteAnimal = (id: number) => {
        Modal.confirm({
            title: 'Are you sure to delete di animal ?',
            icon: <InfoCircleOutlined />,
            content: `This change will delete animal that you choose`,
            onOk: () => deleteApi(id)
        });
    }

    return (
        <Card>
            <Modal
                title="Add New Animal"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={{htmlType: 'submit', form: 'add-new-animal', loading}}
            >
                <Spin spinning={loadingEdit}>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        onFinishFailed={() => setIsModalOpen(true)}
                        form={form}
                        id="add-new-animal"
                        labelCol={{span: 24}}
                        preserve={false}
                    >
                        <UploadImage form={form} formLabel={"Animal Picture"} />
                        <Form.Item label="Animal Name"  name={['name']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Animal Name is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Animal Gender" name={['gender']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Animal Gender is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Animal Category" name={['CategoryID']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Animal Category is required',
                                },
                            ]}
                        >
                            <Select options={mapOptionCategory(data_category?.data || [])} />
                        </Form.Item>
                        <Form.Item label="Animal Type" name={['type']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Animal Type is required',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Flex gap="middle">
                            <Form.Item label="Animal Age (year)" name={['age']} 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Age is required',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Animal Age (month)" name={['Month']} 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Age is required',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Flex>
                        <Form.Item label="Description" name={['description']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Description is required',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        {/* <Form.Item label="Number of animal" name={['quantity']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Number of animal is required',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item> */}
                        <Form.Item label="Price" name={['price']} 
                            rules={[
                                {
                                    required: true,
                                    message: 'Price is required',
                                },
                            ]}
                            style={{ width: '100%' }}
                        >
                            <InputNumber prefix="Rp" style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
            <Space direction="horizontal" align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Title level={3}>List of Animal</Typography.Title>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => {
                        form.resetFields()
                        setIsModalOpen(true)
                    }}
                >
                    Add Animal
                </Button>
            </Space>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={data?.data || []}
            />
        </Card>
    )
}