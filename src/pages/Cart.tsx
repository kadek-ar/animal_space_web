import { CheckOutlined, CloseCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Modal, Space, Spin, Typography } from "antd";
import useSWR from "swr";
import { api, fetcher } from "../utillities/api";
import { useState } from "react";

export default function Cart() {
    const [loading, setLoading] = useState(false);

    const { data, isLoading, mutate } = useSWR(`/animal-space/cart`, fetcher);

    const totalPrice = () => {
        let total = 0;
        (data?.data || []).forEach((item: any) => {
            total = total + (item?.Quantity * item?.Animal?.Price)
        });
        return total
    }

    const checkout = () => {
        // /animal-space/checkout
        const payload = (data?.data).map((item: any) => ({
            AnimalID: item?.AnimalID,
            Quantity: item?.Quantity,
            Price: item?.Animal?.Price
        }))
        api.post('/animal-space/checkout?total_price='+totalPrice()+'&number_of_item='+(data?.data || []).length, payload).then(() => {
            Modal.success({
                title: 'Success',
                icon: <CheckOutlined />,
                content: `Success to checkout animal`,
            });
            mutate()
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

    return (
        <Spin spinning={isLoading || loading}>
            <Typography.Title level={1}>Cart</Typography.Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {(data?.data || []).map((rec: any) => (
                    <Card>
                        <Flex gap="large" wrap="wrap">
                            <div style={{ width: '150px' }}>
                                <img style={{ width: '100%' }} src={rec?.Animal?.Image} alt="category_img" />
                            </div>
                            <Space direction="vertical" size="small" style={{ display: 'flex', width: '75%' }}>
                                <Typography.Text strong>{rec?.Animal?.Name}</Typography.Text>
                                <p>{rec?.Animal?.Type}</p>
                                <Typography.Text strong style={{ color: '#EB9A10' }}>Rp {rec?.Animal?.Price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Text>
                                <Flex justify="end">
                                    <div>Quantity : {rec?.Quantity}</div>
                                </Flex>
                            </Space>
                        </Flex>
                    </Card>
                ))}
            </Space>
            <Divider />
            <Card>
                <Typography.Title
                    level={3}
                >
                    Order Summary
                </Typography.Title>
                <Flex gap="large" wrap="wrap" justify="space-between">
                    <Typography.Text strong>
                        {(data?.data || []).length} Animal
                    </Typography.Text>
                    <Space direction="horizontal" size="large" style={{ display: 'flex'}}>
                        <Typography.Text strong>
                            Total
                        </Typography.Text>
                        <Typography.Text >
                            Rp {totalPrice().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}   
                        </Typography.Text>
                    </Space>
                </Flex>
            </Card>
            <Flex justify="end">
                <Button 
                    icon={<ShoppingOutlined /> } 
                    type="primary" 
                    // loading={loadingSubmit}
                    onClick={checkout}
                >
                    Checkout
                </Button>
            </Flex>

        </Spin>
    )
}