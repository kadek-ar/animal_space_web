import { Button, Card, Divider, Flex, Form, InputNumber, Modal, Select, Space, Spin, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CloseCircleOutlined, EnvironmentOutlined, PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { api, fetcher } from "../../utillities/api";
import useSWR from "swr";

export default function ShelterAnimal() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading } = useSWR(`/animal?shelter_id=${id}` , fetcher);
    const { data: data_shelter, isLoading: isLoading_shelter } = useSWR(`/shelter/${id}` , fetcher);

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
            <Spin spinning={isLoading || isLoading_shelter}>
                <Card className="box-shadow">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Flex align="center" gap="middle">
                            <ShopOutlined style={{ fontSize: '17px' }} />
                            <Typography.Title level={4} style={{ marginBottom: 2 }}>{data_shelter?.data?.Name}</Typography.Title>
                        </Flex>
                        <Flex align="center" gap="middle">
                            <PhoneOutlined />
                            <Typography.Text style={{ marginBottom: 0 }}>{data_shelter?.data?.Phone}</Typography.Text>
                        </Flex>
                        <Flex align="center" gap="middle">
                            <EnvironmentOutlined />
                            <Typography.Text style={{ marginBottom: 0 }}>{data_shelter?.data?.Address}</Typography.Text>
                        </Flex>
                        <p>
                            {data_shelter?.data?.Description}
                        </p>
                    </Space>
                </Card>
                <br />
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    
                    <Flex wrap="wrap" gap="small">
                        {(data?.data || []).map((item: any) => (
                            <Card
                                hidden={item?.Status === "sold"}
                                hoverable
                                cover={<img alt="pet_pic" src={item?.Image} style={{ height: '244px', width: 'auto' }} />}
                                style={{ width: '300px', overflow: 'hidden' }}
                                onClick={() => {
                                    navigate('/detail-animal/'+item?.ID)
                                }}
                                className="card-animal"
                            >
                                <Card.Meta
                                    title={item?.Name}
                                    description={(
                                        <Space direction="vertical" size="middle">
                                            <Typography.Title level={5}>Rp {item?.Price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Typography.Title>
                                        </Space>
                                    )}
                                />
                            </Card>
                        ))}
                    </Flex>
                </Space>
            </Spin>
        </Space>
    )
}