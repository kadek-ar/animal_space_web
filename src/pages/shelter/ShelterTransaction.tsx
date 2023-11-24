import { Button, Card, Col, Divider, Flex, Row, Space, Spin, Tag, Typography } from "antd";
import useSWR from "swr";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../../utillities/api";

export default function ShelterTransaction() {
    const navigate = useNavigate()

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }
    
    const { data, isLoading } = useSWR(`/shelter/transaction/` + getUser()?.shelter_id, fetcher);

    
    return (
        <Spin spinning={isLoading}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Typography.Title level={1}>Transaction List</Typography.Title>

                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    { (data?.data || []).map((item: any) => (
                        <Card>
                            <Flex align="baseline" justify="space-between">
                                <Typography.Title level={5}>Transaction ID: {item.transaction_id}</Typography.Title>
                                <div>
                                    <Tag color="processing">{item.status}</Tag>
                                    <Button onClick={() => navigate('/shelter/transaction/detail/'+item.transaction_id)}>Detail Transaction</Button>
                                </div>
                            </Flex>
                            <Divider />
                            <Row justify="space-between">
                                <Col >
                                    <Typography.Text>Transaction Date:</Typography.Text>
                                    <Typography.Title level={5}>{moment(item.created_at).format("YYYY MMMM DD")}</Typography.Title>
                                    <Typography.Text>{item.animal_count} Animal</Typography.Text>
                                </Col>
                                <Col >
                                    <Typography.Text>Total Price: </Typography.Text>
                                    <Typography.Title level={5}>Rp {item.total_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Space>
            </Space>
        </Spin>
    )
}