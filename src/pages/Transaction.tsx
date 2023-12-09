import { Button, Card, Col, Divider, Flex, Result, Row, Space, Spin, Tag, Typography } from "antd";
import useSWR from "swr";
import { fetcher } from "../utillities/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Transaction() {
    const navigate = useNavigate()
    
    const { data, isLoading } = useSWR(`/animal-space/transaction`, fetcher);

    const Status = ({item}:{item: any}) => {
        if(item.animal_count === item.approve_count ){
            return <Tag color="success">Done</Tag>
        }else if(item.animal_count === item.reject_count){
            return <Tag color="error">Rejected</Tag>
        }
        return <Tag color="processing">Active</Tag>
    }

    if((data?.data || []).length === 0){
        return(
            <Result
                icon={
                    <div style={{ display: 'flex', justifyContent: 'center'  }}>
                        <div style={{ width: '50vh'}}>
                        <svg style={{ width: '100%' }} xmlns="http://www.w3.org/2000/svg" width="747.62" height="226" viewBox="0 0 747.62 526" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Group_33" data-name="Group 33" transform="translate(-227 -187)">
                                    <path id="Path_498-918" data-name="Path 498" d="M835.627,535.188a9.377,9.377,0,0,0-3.1-14.04l1.853-21.348-12.7-4.29-2.194,30.184a9.428,9.428,0,0,0,16.138,9.495Z" transform="translate(0.81)" fill="#ffb8b8" />
                                    <path id="Path_499-919" data-name="Path 499" d="M672.8,514.162H661.373l-5.437-44.1h16.873Z" transform="translate(227 187)" fill="#ffb8b8" />
                                    <path id="Path_500-920" data-name="Path 500" d="M653.207,510.894h22.048v13.882h-35.93a13.882,13.882,0,0,1,13.882-13.882Z" transform="translate(227 187)" fill="#2f2e41" />
                                    <path id="Path_501-921" data-name="Path 501" d="M646.855,484.9l-11.1,2.728-15.806-41.523,16.385-4.027Z" transform="translate(227 187)" fill="#ffb8b8" />
                                    <path id="Path_502-922" data-name="Path 502" d="M854.772,672.232H876.82v13.882H840.89a13.882,13.882,0,0,1,13.882-13.882Z" transform="matrix(0.971, -0.239, 0.239, 0.971, -136.446, 224.563)" fill="#2f2e41" />
                                    <path id="Path_503-923" data-name="Path 503" d="M885.615,687.1a4.21,4.21,0,0,1-4.2-3.779L868.263,560.771l-11.447,37.476,16.213,58.533a4.225,4.225,0,0,1-2.505,5.056l-12.89,5.156a4.23,4.23,0,0,1-5.565-2.536L832.2,607.448a51.611,51.611,0,0,1-2.835-19.395l2.773-61.523,73.043,3.093-1.14,152.215a4.254,4.254,0,0,1-3.912,4.186l-14.185,1.069Q885.778,687.1,885.615,687.1Z" transform="translate(0.81)" fill="#2f2e41" />
                                    <circle id="Ellipse_83" data-name="Ellipse 83" cx="24.561" cy="24.561" r="24.561" transform="translate(849.767 341.252)" fill="#ffb8b8" />
                                    <path id="Path_504-924" data-name="Path 504" d="M891.58,533.625c-6.468,0-14.5-.529-22.817-1.076-11.36-.748-23.106-1.521-31.875-1.013a6.966,6.966,0,0,1-6.232-2.714c-9.039-11.574,4.9-56.708,5.5-58.623L847.5,419.731l.488.11-.488-.11c2.5-11.1,10.471-19.288,20.813-21.368,9.68-1.944,19.043,1.931,25.048,10.375q.478.672.955,1.379c19.552,28.957,8.493,100.9,7.752,105.539,1.033,1.237,6.618,8.232,5.083,13.091-.625,1.977-2.321,3.324-5.042,4a47.006,47.006,0,0,1-10.532.875Z" transform="translate(0.81)" fill="#0174be" />
                                    <path id="Path_505-925" data-name="Path 505" d="M837.284,533.647c-2.225,0-5.226-.821-9.272-2.5-1.739-.724-7.031-2.925-.606-59.072,3.156-27.58,7.677-54.968,7.722-55.241l.043-.264.244-.11c.116-.053,11.662-5.345,13.67-12.146q.1-.353.234-.685a6.244,6.244,0,0,1,7.754-3.808,6.561,6.561,0,0,1,4.942,7.488,46.021,46.021,0,0,1-3.991,12.792c-5.433,11.21-9.114,40.928-9.15,41.227-.208,2.538-5.138,62.672-6.088,67.235-.332,1.594-.942,3.544-2.733,4.49a5.842,5.842,0,0,1-2.767.6Z" transform="translate(0.81)" fill="#2f2e41" />
                                    <path id="Path_506-926" data-name="Path 506" d="M864.115,531.343a2.018,2.018,0,0,1-1.239-.425c-7.226-5.491,4.468-72.051,11.4-95.016,1.389-4.6,2.625-8.537,3.676-11.706h0a89.255,89.255,0,0,0,3.989-17.506c.382-3.226,1.211-5.068,2.537-5.633.921-.393,2-.126,3.22.793,6.407-.316,12.632,2.3,18.4,5.181l5.192,2.59,5.826,103.149c-.165,6.583-13.141,11.23-18.8,11.527-9.089.477-25.41,1.957-32.6,6.509a3.005,3.005,0,0,1-1.6.536Z" transform="translate(0.81)" fill="#2f2e41" />
                                    <path id="Path_507-927" data-name="Path 507" d="M831.659,511.989c-.086,0-.172,0-.259-.008l-11.768-.724a4.229,4.229,0,0,1-3.923-4.853l5.325-35.279,10.024-49.5a8.879,8.879,0,0,1,11.362-6.709h0a8.928,8.928,0,0,1,6.108,9.879l-7.964,49.6-4.715,33.947a4.251,4.251,0,0,1-4.191,3.647Z" transform="translate(0.81)" fill="#2f2e41" />
                                    <path id="Path_508-928" data-name="Path 508" d="M871.86,473.374a9.377,9.377,0,0,1,14.225-2.093l19.295-9.32,8.524,10.344-27.433,12.779a9.428,9.428,0,0,1-14.611-11.71Z" transform="translate(0.81)" fill="#ffb8b8" />
                                    <path id="Path_509-929" data-name="Path 509" d="M898.664,483.383a4.232,4.232,0,0,1-4.114-3.241l-2.8-11.65a4.211,4.211,0,0,1,1.94-4.619l16.9-10.116-8.64-31.634a10.753,10.753,0,0,1,20.593-6.181l9.539,29.125a17.576,17.576,0,0,1-6.421,19.773L901.141,482.58A4.224,4.224,0,0,1,898.664,483.383Z" transform="translate(0.81)" fill="#2f2e41" />
                                    <path id="Path_511-930" data-name="Path 511" d="M716.064,187H242.87a16.7,16.7,0,0,0-16.68,16.68V254.6a16.7,16.7,0,0,0,16.68,16.68H716.064a16.7,16.7,0,0,0,16.68-16.68V203.68A16.7,16.7,0,0,0,716.064,187Zm14.924,67.6a14.946,14.946,0,0,1-14.924,14.924H242.87A14.946,14.946,0,0,1,227.946,254.6V203.68a14.946,14.946,0,0,1,14.924-14.924H716.064a14.946,14.946,0,0,1,14.924,14.924Z" transform="translate(0.81)" fill="#3f3d56" />
                                    <path id="Path_512-931" data-name="Path 512" d="M716.064,391.553H242.87a16.7,16.7,0,0,1-16.68-16.68V323.954a16.7,16.7,0,0,1,16.68-16.68H716.064a16.7,16.7,0,0,1,16.68,16.68v50.919a16.7,16.7,0,0,1-16.68,16.68ZM242.87,309.03a14.941,14.941,0,0,0-14.924,14.924v50.919A14.941,14.941,0,0,0,242.87,389.8H716.064a14.941,14.941,0,0,0,14.925-14.924V323.954a14.941,14.941,0,0,0-14.924-14.924Z" transform="translate(0.81)" fill="#ccc" />
                                    <path id="Path_513-932" data-name="Path 513" d="M716.064,511.827H242.87a16.7,16.7,0,0,1-16.68-16.68V444.228a16.7,16.7,0,0,1,16.68-16.68H716.064a16.7,16.7,0,0,1,16.68,16.68v50.919a16.7,16.7,0,0,1-16.68,16.68ZM242.87,429.3a14.941,14.941,0,0,0-14.924,14.924v50.919a14.941,14.941,0,0,0,14.924,14.925H716.064a14.941,14.941,0,0,0,14.925-14.924V444.228A14.941,14.941,0,0,0,716.064,429.3Z" transform="translate(0.81)" fill="#ccc" />
                                    <path id="Path_514-933" data-name="Path 514" d="M306.809,258.172a29.032,29.032,0,1,1,29.032-29.032,29.032,29.032,0,0,1-29.032,29.032Z" transform="translate(0.81)" fill="#0174be" />
                                    <path id="Path_515-934" data-name="Path 515" d="M673.2,252.843h-309.9a7.023,7.023,0,0,1,0-14.047H673.2a7.023,7.023,0,0,1,0,14.047Z" transform="translate(0.81)" fill="#ccc" />
                                    <path id="Path_516-935" data-name="Path 516" d="M572.235,222.994H363.293a7.023,7.023,0,1,1,0-14.047H572.235a7.023,7.023,0,0,1,0,14.047Z" transform="translate(0.81)" fill="#ccc" />
                                    <path id="Path_517-936" data-name="Path 517" d="M306.809,378.445a29.032,29.032,0,1,1,29.032-29.032,29.032,29.032,0,0,1-29.032,29.032Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_518-937" data-name="Path 518" d="M673.2,373.117h-309.9a7.023,7.023,0,1,1,0-14.047H673.2a7.023,7.023,0,0,1,0,14.047Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_519-938" data-name="Path 519" d="M572.235,343.268H363.293a7.023,7.023,0,1,1,0-14.047H572.235a7.023,7.023,0,0,1,0,14.047Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_520-939" data-name="Path 520" d="M306.809,498.719a29.032,29.032,0,1,1,29.032-29.032,29.032,29.032,0,0,1-29.032,29.032Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_521-940" data-name="Path 521" d="M673.2,493.391h-309.9a7.023,7.023,0,1,1,0-14.047H673.2a7.023,7.023,0,1,1,0,14.047Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_522-941" data-name="Path 522" d="M572.235,463.542H363.293a7.023,7.023,0,1,1,0-14.047H572.235a7.023,7.023,0,0,1,0,14.047Z" transform="translate(0.81)" fill="#e6e6e6" />
                                    <path id="Path_395-942" data-name="Path 395" d="M305.327,239.352a3.321,3.321,0,0,1-2-.664l-.036-.027-7.525-5.756a3.344,3.344,0,1,1,4.069-5.308l4.874,3.738,11.517-15.026a3.343,3.343,0,0,1,4.686-.619h0l-.071.1.073-.1a3.347,3.347,0,0,1,.618,4.687l-13.547,17.666a3.345,3.345,0,0,1-2.66,1.3Z" transform="translate(0.81)" fill="#fff" />
                                    <path id="Path_523-943" data-name="Path 523" d="M972.81,713h-198a1,1,0,0,1,0-2h198a1,1,0,0,1,0,2Z" transform="translate(0.81)" fill="#ccc" />
                                    <path id="Path_561-944" data-name="Path 561" d="M782.606,412.94s-9.448-13.874-14.855-9.306-20.567,13.529-23.761,6.436,9.082-20.086,18.347-23.193,25.534-7.235,30.637,6.463a59.9,59.9,0,0,1,2.994,27.124Z" transform="matrix(0.914, 0.407, -0.407, 0.914, 336.122, -323.588)" fill="#2f2e41" />
                                </g>
                            </svg>
                        </div>
                    </div>
                }
                title="You don't have any transaction here!"
                extra={<Button type="primary" onClick={() => navigate('/')} >Back to home</Button>}
            />
        )
    }
    
    return (
        <Container>
            <Spin spinning={isLoading}>
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                    <Typography.Title level={1}>Transaction List</Typography.Title>

                    <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                        { (data?.data || []).map((item: any) => (
                            <Card className="box-shadow">
                                <Flex align="baseline" justify="space-between">
                                    <Typography.Title level={5}>Transaction ID: {item.transaction_id}</Typography.Title>
                                    <div>
                                        <Status item={item} />
                                        <Button onClick={() => navigate('/transaction/'+item.transaction_id)}>Detail Transaction</Button>
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
        </Container>
    )
}