import { Button, Card, Carousel, Col, Divider, Flex, Modal, Row, Space, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { api, fetcher } from "../utillities/api";
import { useCallback, useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<any>()
    // const { data, isLoading } = useSWR(`/animal-space`, fetcher);

    const getCategory = useCallback(() => {
        setLoading(true)
        api.get('/shelter/category').then((res) => {
            setCategory(res?.data?.data || [])
        }).catch((err) => {
            Modal.error({
                title: 'Error to Get category',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        }).finally(() => {
            setLoading(false)
        })
    }, [setCategory])

    const getData = useCallback(() => {
        setLoading(true)
        api.get('/animal-space').then((res) => {
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
    }, [setLoading, setData])

    useEffect(() => {
        getData()
        getCategory()
    }, [getData, getCategory])

    const getUser = () => {
        const auth = window.localStorage.getItem('user');
        if (!auth) {
            return null
        }
        const tmp = JSON.parse(auth)
        return tmp
    }

    const contentStyle: React.CSSProperties = {
        height: '360px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const CategoriesStyle = {
        borderRadius: '82%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '200px'
    }

    const ButtonCreateShelter = () => {
        const user = getUser()
        if (user?.shelter_status === 'approve') {
            return (
                <Button onClick={() => navigate('/shelter/home')}>
                    Go to your shelter page
                </Button>
            )
        } else if (user?.shelter_status === 'pending') {
            return (
                <Button disabled={true}>
                    Waiting shelter approval from admin
                </Button>
            )
        } else if (user?.shelter_status === 'reject') {
            return (
                <Button onClick={() => navigate('/edit-shelter')}>
                    Your shelter has been reject, Edit here
                </Button>
            )
        } else if (user?.role === "admin"){
            return (
                <Button onClick={() => navigate('/admin/home')}>
                    Go to admin page
                </Button>
            )
        }
        return (
            <Button onClick={() => navigate('/create-shelter')}>
                Make You Own Pet Shelter
            </Button>
        )
    }

    return (
        <Spin spinning={loading}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                <Carousel
                    // autoplay
                    style={{ overflow: 'hidden', maxHeight: '500px' }}
                >
                    <div>
                        {/* <Card style={contentStyle}>
                            <h3>1</h3>
                        </Card> */}
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img style={{ width: '100%' }} src="https://cdn.trendhunterstatic.com/phpthumbnails/57/57586/57586_1_800.jpeg?auto=webp" alt="bg_1" />
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <div>
                                <img style={{ width: '100%' }} src="https://www.treehugger.com/thmb/9mhKZkdI6I3VE_Nec7lHMhQT4bA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Eddie-3a211f1aa6a54a908d0a5a6db50adf7a.jpeg" alt="bg_2" />
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <div>
                                <img style={{ width: '100%' }} src="https://www.thelondoneconomic.com/wp-content/uploads/2018/06/SWNS_VEGAN_ADD_01.jpg" alt="bg_3" />
                            </div>
                        </Card>
                    </div>
                </Carousel>
                <Divider />
                <Typography.Title level={3}>Categories</Typography.Title>
                <Row justify="space-between">
                    {(category || []).map((item: any, idx: number) => (
                        <Col>
                            <div style={CategoriesStyle}>
                                <img style={{ height: '100%' }} onClick={() => navigate('/search-animal?category='+item.Name)} src={item.Image} alt={'category_'+idx} />
                            </div>
                        </Col>
                    ))}
                </Row>
                {/* <Row justify="space-between">
                    <Col>
                        <div style={CategoriesStyle}>
                            <img style={{ height: '100%' }} src="https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg" alt="pet" />
                        </div>
                    </Col>
                    <Col >
                        <div style={CategoriesStyle}>
                            <img style={{ height: '100%' }} src="https://th-thumbnailer.cdn-si-edu.com/ii_ZQzqzZgBKT6z9DVNhfPhZe5g=/fit-in/1600x0/filters:focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" alt="pet" />
                        </div>
                    </Col>
                    <Col >
                        <div style={CategoriesStyle}>
                            <img style={{ height: '100%' }} src="https://assets.petco.com/petco/image/upload/f_auto,q_auto/hamster-care-sheet-hero" alt="pet" />
                        </div>
                    </Col>
                    <Col >
                        <div style={CategoriesStyle}>
                            <img style={{ height: '100%' }} src="data:image/jpeg;base64,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" alt="pet" />
                        </div>
                    </Col>
                    <Col >
                        <div style={CategoriesStyle}>
                            <img style={{ height: '100%' }} src="https://www.pbs.org/wnet/nature/files/2014/10/Fox-Main-1280x600.jpg" alt="pet" />
                        </div>
                    </Col>
                </Row> */}
                <br />
                <ButtonCreateShelter />
                <Divider />
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    <Typography.Title level={3}>Animal List</Typography.Title>
                    <Flex wrap="wrap" gap="small">
                        {(data || []).map((item: any) => (
                            <Card
                                hoverable
                                cover={<img alt="pet_pic" src={item?.Image} style={{ height: '244px', width: 'auto' }} />}
                                style={{ width: '300px', overflow: 'hidden' }}
                                onClick={() => navigate('/detail-animal/' + item?.Id)}
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
            </Space>
        </Spin>
    )
}