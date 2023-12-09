import { Button, Modal, Result, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utillities/api";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function VerifyEmail() {
    const params = new URLSearchParams(document.location.search)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const verifyEmail = useCallback(() => {
        if(!params.get('idveas')){
            navigate('login')
        }
        api.post('/verify?idveas=' + (params.get('idveas') || '')).then(() => {
            setLoading(false)
        }).catch((err) => {
            Modal.confirm({
                title: 'Error to verify email',
                icon: <CloseCircleOutlined />,
                content: `${(err?.response?.data?.error || err.toString())}`,
            });
        })
    },[params])

    useEffect(() => {
        verifyEmail()
    },[verifyEmail])

    if(loading){
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Spin spinning={loading} size="large" ></Spin>
        </div>
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '200px' }}>
                            <img style={{ width: '100%' }} src="src/assets/undraw_done_re_oak4.svg" alt="email_send" />
                        </div>
                    </div>
                }
                title="Email Verification Success"
                subTitle="Thank you to confirmation your email, now you can login to animal space"
                extra={[
                    <Button onClick={() => navigate('/login') } key="buy">Go to Login page</Button>,
                ]}
            />
        </div>
    )
}