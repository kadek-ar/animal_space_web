import { Button, Card, Flex, Form, InputNumber, Modal, Select, Space, Spin, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { api } from "../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const [form] = Form.useForm();
    const [data, setData] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<any>()
    const [age, setAge] = useState<any>()
    const [month, setMonth] = useState<any>()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(document.location.search)

    const getCategory = useCallback(() => {
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
        api.get(
            '/animal-space?search=' + (searchParams.get('search') || '') +
            '&category=' + (searchParams.get('category') || '') +
            '&from_age=' + (searchParams.get('from_age') || '') +
            '&to_age=' + (searchParams.get('to_age') || '') + 
            '&from_month=' + (searchParams.get('from_month') || '') +
            '&to_month=' + (searchParams.get('to_month') || '')
        ).then((res) => {
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
    }, [
        setLoading, 
        setData, 
        searchParams.get('search'),
        searchParams.get('category'),
        searchParams.get('from_age'),
        searchParams.get('to_age'),
        searchParams.get('from_month'),
        searchParams.get('to_month')
    ])

    useEffect(() => {
        getData()
        getCategory()
    }, [
        getData, 
        searchParams.get('search'),
        searchParams.get('category'),
        searchParams.get('from_age'),
        searchParams.get('to_age'),
        searchParams.get('from_month'),
        searchParams.get('to_month')
    ])

    const categoryChange = (val: string) => {
        searchParams.set('category', val || '')
        navigate('/search-animal?'+searchParams.toString())
    } 

    const filterAge = () => {
        searchParams.set('from_age', age.min || '')
        searchParams.set('to_age', age.max ? ( age.max < age.min ? age.min : age.max) : '')
        navigate('/search-animal?'+searchParams.toString())
    }

    const filterMonth = () => {
        searchParams.set('from_month', month.min || '')
        searchParams.set('to_month', month.max ? ( month.max < month.min ? month.min : month.max) : '')
        navigate('/search-animal?'+searchParams.toString())
    }

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
            <Typography.Title level={3}>Search list</Typography.Title>
            <Form
                form={form}
                initialValues={{
                    category: searchParams.get('category'),
                    min_age: searchParams.get('from_age'),
                    max_age: searchParams.get('to_age'),
                    min_age_month: searchParams.get('from_month'),
                    max_age_month: searchParams.get('to_month')
                }}
            >
                <Flex wrap="wrap" gap="middle" align="center">
                    <Flex wrap="wrap" gap="small" align="center">
                        <Typography.Text strong>Filter Category : </Typography.Text>
                        <Form.Item
                            name={['category']}
                            noStyle
                        >
                            <Select
                                style={{ width: 200 }}
                                onChange={categoryChange}
                                placeholder="Filter by category"
                                allowClear
                                options={
                                    (category || []).map((item: any) => ({
                                        label: item.Name,
                                        value: item.Name
                                    }))
                                }
                            />
                        </Form.Item>
                    </Flex>
                    <Flex wrap="wrap" gap="small" align="center">
                        <Typography.Text strong>Filter range of Age (year) : </Typography.Text>
                        <Form.Item name={['min_age']} noStyle>
                            <InputNumber placeholder="Min Age" min={0} onChange={(val: any) => setAge({...age, min: val}) } />
                        </Form.Item>
                        <Form.Item name={['max_age']} noStyle>
                            <InputNumber placeholder="Max Age" onChange={(val: any) => setAge({...age, max: val}) } />
                        </Form.Item>
                        <Button onClick={() => filterAge()}>Search by Age (year)</Button>
                    </Flex>
                    <Flex wrap="wrap" gap="small" align="center">
                        <Typography.Text strong>Filter range of Age (month) : </Typography.Text>
                        <Form.Item name={['min_age_month']} noStyle>
                            <InputNumber placeholder="Min Age" min={0} onChange={(val: any) => setMonth({...month, min: val}) } />
                        </Form.Item>
                        <Form.Item name={['max_age_month']} noStyle>
                            <InputNumber placeholder="Max Age" onChange={(val: any) => setMonth({...month, max: val}) } />
                        </Form.Item>
                        <Button onClick={() => filterMonth()}>Search by Age (month)</Button>
                    </Flex>
                </Flex>
            </Form>
            <Spin spinning={loading}>
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    
                    <Flex wrap="wrap" gap="small">
                        {(data || []).map((item: any) => (
                            <Card
                                hoverable
                                cover={<img alt="pet_pic" src={item?.Image} style={{ height: '244px', width: 'auto' }} />}
                                style={{ width: '300px', overflow: 'hidden' }}
                                onClick={() => navigate('/detail-animal/'+item?.Id)}
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