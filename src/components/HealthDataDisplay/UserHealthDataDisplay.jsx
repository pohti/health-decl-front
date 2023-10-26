// import { useState } from 'react'
import { 
    Empty,
    Skeleton, 
    Table,
    Button,
    Divider,
    Row, Col,
} from 'antd'
import { InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import './UserHealthDataDisplay.css'

const { Column, ColumnGroup } = Table 



const UserHealthDataDisplay = ({isFirstVisit, userData, isLoading}) => {

    const FirstVisitContent = () => (
        <div style={{ 
            fontSize: '25px', 
            lineHeight: '45px',
            paddingTop: '45px'
        }}>
            <InfoCircleOutlined /> {" "}
            Search for user health declaration data <br/>
            by providing fullname or NRIC/FIN.
        </div>
    )

    const UserInfoBar = () => {
        return <Row align="middle">
            <Col span={12}>
                <Row justify="start" style={{ fontSize: "16px" }}>
                    <span><b>Full Name:</b> {" "} {userData.fullname}</span>
                    <Divider type="vertical" />
                    <span><b>Phone:</b> {" "} {userData.phone || "NA"}</span>
                </Row>
            </Col>
            <Col span={12}>
                <Row justify="end">

                    <Button><DownloadOutlined /> {" "} Download CSV</Button>
                </Row>
            </Col>
        </Row>

    }

    const UserDataTable = () => {
        console.log('healthDeclarations', userData.healthDeclarations)
        // return <div>Table here</div>
        return (
            <div>
                
                <Table dataSource={userData.healthDeclarations} title={() => <UserInfoBar/>} bordered >
                    <Column title={<span>Created At <br/>(SG Time)</span>} dataIndex="createdDateTime" key="createdDateTime" 
                        render={createdDateTime => ISOToSingaporeTime(createdDateTime)}
                    />
                    <Column title="Temperature, °C" dataIndex="temperature" key="temperature" />
            
                    <ColumnGroup title="Symptons">
                        <Column title="Cough" dataIndex="symptons" key="createdDateTime" render={({cough}) => cough ? 'Yes' : 'No'}/>
                        <Column title="Smell and Taste Impairment" dataIndex="symptons" key="createdDateTime" render={({smellAndTasteImpairment}) => smellAndTasteImpairment ? 'Yes' : 'No'}/>
                        <Column title="Fever" dataIndex="symptons" key="createdDateTime" render={({fever}) => fever ? 'Yes' : 'No'}/>
                        <Column title="Breathing Difficulties" dataIndex="symptons" key="createdDateTime" render={({breathingDifficulties}) => breathingDifficulties ? 'Yes' : 'No'}/>
                        <Column title="Body Aches" dataIndex="symptons" key="createdDateTime" render={({bodyAches}) => bodyAches ? 'Yes' : 'No'}/>
                        <Column title="Head Aches" dataIndex="symptons" key="createdDateTime" render={({headAches}) => headAches ? 'Yes' : 'No'}/>
                        <Column title="Fatigue" dataIndex="symptons" key="createdDateTime" render={({fatigue}) => fatigue ? 'Yes' : 'No'}/>
                        <Column title="Sore Throat" dataIndex="symptons" key="createdDateTime" render={({soreThroat}) => soreThroat ? 'Yes' : 'No'}/>
                        <Column title="Diarrhea" dataIndex="symptons" key="createdDateTime" render={({diarrhea}) => diarrhea ? 'Yes' : 'No'}/>
                        <Column title="Runny Nose" dataIndex="symptons" key="createdDateTime" render={({runnyNose}) => runnyNose ? 'Yes' : 'No'}/>
                    </ColumnGroup>
            
                    <Column title="Contact Within 14 Days" dataIndex="contactWithin14Days" key="contactWithin14Days" render={(contactWithin14Days) => contactWithin14Days ? 'Yes' : 'No'}/>
                </Table>
            </div>
        )
    }
    

    const DynamicHealthDataContent = () => {
        if (isLoading) return <Skeleton />
        if (isFirstVisit) return <FirstVisitContent/>
        else {
            return ( userData ? 
                    <UserDataTable/> : 
                    <Empty description="No health declaration data found. Begin submitting by filling in the form on the left side." /> )
        }
    }

    return (
        <div className='healthDataDisplayMain'>
            <DynamicHealthDataContent />
        </div>
    )
}

export default UserHealthDataDisplay

const ISOToSingaporeTime = (isoDatetimeString) => {
    // Parse the ISO datetime string into a JavaScript Date object
    const utcDate = new Date(isoDatetimeString);

    // Convert to Singapore time (UTC+8)
    const singaporeTime = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000) + (8 * 60 * 60 * 1000));

    // Format the date and time in Singapore time
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const singaporeTimeString = singaporeTime.toLocaleString('en-SG', options);
    return singaporeTimeString
}