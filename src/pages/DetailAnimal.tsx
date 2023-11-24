import { Button, Card, Col, Divider, Flex, Modal, Row, Space, Spin, Typography, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { api } from "../utillities/api";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

export default function DetailAnimal() {
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<any>()
    const { id } = useParams()

    const getData = useCallback(() => {
        setLoading(true)
        api.get('/animal-space/'+id).then((res) => {
            setData(res?.data?.data || [])
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    },[setLoading, setData])

    useEffect(() => {
        getData()
    }, [getData])

    const addToCart = () => {
        setLoadingSubmit(true)
        api.post('/animal-space/cart', {
            AnimalID: data?.Id
        }).then(() => {
            messageApi.open({
                type: 'success',
                content: '#'+ data?.Id +' Success add to cart '+ data?.Name ,
            });
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoadingSubmit(false)
        })
    }
    
    return (
        <Spin spinning={loading}>
             {contextHolder}
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Card>
                    <Flex wrap="wrap" gap="middle">
                        <div style={{ width: '435px' }}>
                            <img style={{ width: '100%' }} src={data?.Image || ''} alt="detail_animal_pic" />
                        </div>
                        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px', width: '500px' }}>
                            <Typography.Title level={2}>{data?.Name}</Typography.Title>
                            <Typography.Title level={4} style={{ color: '#EB9A10' }}>Rp {data?.Price}</Typography.Title>
                            <Divider />
                            <Row>
                                <Col span={10}>
                                    <Typography.Text>Kategori :</Typography.Text>
                                </Col>
                                <Col>
                                    <Typography.Text strong>{data?.Category_name}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Typography.Text>Jenis    :</Typography.Text>
                                </Col>
                                <Col>
                                    <Typography.Text strong>{data?.Type}</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Typography.Text>Jumlah   :</Typography.Text>
                                </Col>
                                <Col>
                                    <Typography.Text strong>{data?.Quantity}</Typography.Text>
                                </Col>
                            </Row>
                            <div>
                                <Typography.Text strong>Deskripsi   :</Typography.Text>
                                <p style={{ marginTop: '10px' }}>{data?.Description}</p>
                            </div>
                        </Space>
                    </Flex>
                    <Button 
                        icon={<ShoppingCartOutlined /> } 
                        type="primary" 
                        loading={loadingSubmit}
                        onClick={addToCart}
                    >
                        Add To Cart
                    </Button>
                </Card>
                    
            </Space>
        </Spin>
    )
}