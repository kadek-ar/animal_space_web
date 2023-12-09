import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

export default function SuccessSendResetPass() {
    const navigate = useNavigate()

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'  }} >
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '200px' }}>
                            {/* <img style={{ width: '100%' }} src="src/assets/undraw_email_campaign_re_m6k5.svg" alt="email_send" /> */}
                            <ReactSVG className="svg-component" src="src/assets/undraw_email_campaign_re_m6k5.svg" />
                        </div>
                    </div>
                }
                title="Successfully send request reset password"
                subTitle="We send link to your email address, follow the link address to continye reset password"
                extra={[
                    <Button onClick={() => navigate('/login') } key="buy">Go to Login page</Button>,
                ]}
            />
        </div>
    )
}