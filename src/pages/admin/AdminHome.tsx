import { Button, Card, Flex, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function AdminHome() {
    const [data, setData] = useState<any>()

    const getShelter = useCallback(() => {
        api.get('/shelter').then((res) => {
            setData(res?.data?.data || [])
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to get data',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }, [setData])

    useEffect(() => {
        getShelter()
    }, [getShelter])


    const approve = (id: number) => {
        const payload = {id: id, status: 'approve', note: ''}
        api.put('/shelter/approval', payload).then((res) => {
            Modal.success({
                title: 'Success Reject',
                icon: <CloseCircleOutlined />,
                content: `${res?.data?.messege}`,
            });
            getShelter()
        }).catch((err) => {
            Modal.confirm({
                title: 'Error approval',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const reject = (id: number) => {
        const payload = {id: id, status: 'reject', note: ''}
        api.put('/shelter/approval', payload).then((res) => {
            Modal.success({
                title: 'Success Approve',
                icon: <CloseCircleOutlined />,
                content: `${res?.data?.messege}`,
            });
        }).catch((err) => {
            Modal.confirm({
                title: 'Error approval',
                icon: <CloseCircleOutlined />,
                content: `${err.toString()}`,
            });
        })
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Shelter name',
            dataIndex: 'Name',
            key: 'name',
        },
        {
            title: 'Created by',
            dataIndex: 'Owner_name',
            key: 'Owner_name',
        },
        {
            title: 'Created email',
            dataIndex: 'Email_user',
            key: 'Email_user',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'phone',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'description',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'address',
        },
        {
            title: 'status',
            dataIndex: 'Status',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, rec: any) => {
                if( rec?.Status === 'pending'){
                    return (
                        <Flex gap="small" wrap="wrap">
                            <Button type="primary" onClick={() => approve(rec.Id)} >Approve</Button>
                            <Button type="primary" onClick={() => reject(rec.Id)} danger>Reject</Button>
                        </Flex>
                    )
                }
                return null
            },
        },
    ];

    return (
        <Card>
            <Table
                columns={columns}
                dataSource={data}
            />
        </Card>
    )
}