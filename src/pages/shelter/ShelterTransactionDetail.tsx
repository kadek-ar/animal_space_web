import { Alert, Card, Col, Divider, Flex, Row, Space, Spin, Tag, Typography } from "antd"
import { useParams } from "react-router-dom"
import useSWR from "swr";
import { PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import { fetcher } from "../../utillities/api";

export default function ShelterTransactionDetail() {
    const { id } = useParams()

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    const { data, isLoading } = useSWR(`/shelter/transaction/detail/${getUser()?.shelter_id}/` + id, fetcher);

    return (
        <Spin spinning={isLoading}>
            <Typography.Title level={2}>Transaction ID: {id}</Typography.Title>
            <Divider />
            <Alert
                style={{ color: '#91caff' }}
                message="User Information"
                description={(
                    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                        <Typography.Text>Name: <strong>{data?.user?.Username}</strong></Typography.Text>
                        <Typography.Text>Email: <strong>{data?.user?.Email}</strong></Typography.Text>
                    </Space>    
                )}
                type="info"
            />
            <br />
            <Typography.Title level={4}>List of product</Typography.Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {(data?.data || []).map((item: any) => (
                    <Card>
                        <Flex gap="small" wrap="wrap" justify="space-between" align="center">
                            <Typography.Title level={3}>{item.AnimalName}</Typography.Title>
                            <div>
                                <Typography.Title level={5}>Rp {item.AnimalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                <Typography.Text>{item.Quantity} Animal</Typography.Text>
                            </div>
                        </Flex>
                        <Divider />
                        <Flex justify="space-between">
                            <Row gutter={12}>
                                <Col>
                                    <div style={{ width: '150px' }}>
                                        <img style={{ width: '100%' }} src={item.AnimalImage} alt="trx_animal_img" />
                                    </div>
                                </Col>
                                <Col>
                                    <Space direction="vertical">
                                        <Typography.Text>Jenis : <strong>{item.AnimalType}</strong> </Typography.Text>
                                        <Typography.Text>Gender : <strong>{item.AnimalGender}</strong> </Typography.Text>
                                        <Typography.Text>Kategori : <strong>{item.AnimalCategory}</strong> </Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                            <Space direction="vertical">
                                <Typography.Title level={4} style={{ textAlign: 'end' }}>Shelter</Typography.Title>
                                <Flex gap="small" justify="end">
                                    <ShopOutlined />
                                    <Typography.Text strong>{item.ShelterName}</Typography.Text>
                                </Flex>
                                <Flex gap="small">
                                    <Typography.Text> Contact : </Typography.Text>
                                    <Tag icon={<PhoneOutlined />} color="#55acee">
                                        {item.ShelterPhone}
                                    </Tag>
                                </Flex>
                            </Space>
                        </Flex>
                    </Card>
                ))}
            </Space>
        </Spin>
    )
}