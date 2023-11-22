import { Button, Card, Col, Divider, Flex, Row, Space, Spin, Tag, Typography } from "antd";
import useSWR from "swr";
import { fetcher } from "../utillities/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
    const navigate = useNavigate()
    
    const { data, isLoading } = useSWR(`/animal-space/transaction`, fetcher);
    
    return (
        <Spin spinning={isLoading}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Typography.Title level={1}>Transaction List</Typography.Title>

                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    { (data?.data || []).map((item: any) => (
                        <Card>
                            <Flex align="baseline" justify="space-between">
                                <Typography.Title level={5}>Transaction ID: {item.ID}</Typography.Title>
                                <div>
                                    <Tag color="processing">{item.Status}</Tag>
                                    <Button onClick={() => navigate('/transaction/'+item.ID)}>Detail Transaction</Button>
                                </div>
                            </Flex>
                            <Divider />
                            <Row justify="space-between">
                                <Col >
                                    <Typography.Text>Transaction Date:</Typography.Text>
                                    <Typography.Title level={5}>{moment(item.CreatedAt).format("YYYY MMMM DD")}</Typography.Title>
                                    <Typography.Text>{item.NumberOfItem} Animal</Typography.Text>
                                </Col>
                                <Col >
                                    <Typography.Text>Total Price: </Typography.Text>
                                    <Typography.Title level={5}>Rp {item.Total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Space>
            </Space>
        </Spin>
    )
}