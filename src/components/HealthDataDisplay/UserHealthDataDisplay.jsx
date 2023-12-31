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

const symptonMappings = [
    { label: 'Cough', value: 'cough' },
    { label: 'Smell and Taste Impairment', value: 'smellAndTasteImpairment' },
    { label: 'Fever', value: 'fever' },
    { label: 'Breathing Difficulties', value: 'breathingDifficulties' },
    { label: 'Body Aches', value: 'bodyAches' },
    { label: 'Head Aches', value: 'headAches' },
    { label: 'Fatigue', value: 'fatigue' },
    { label: 'Sore Throat', value: 'soreThroat' },
    { label: 'Diarrhea', value: 'diarrhea' },
    { label: 'Runny Nose', value: 'runnyNose' },
]

const UserHealthDataDisplay = ({isFirstVisit, userData, isLoading}) => {
    const generateCSVData = () => {
        const userInfoRows = [
            ['Fullname', userData.fullname],
            ['NRIC/FIN', userData.nric],
            ['Phone', userData.phone],
        ]
        let healthDeclarationRowsHeader = ['Created At', 'Temperature °C']
        healthDeclarationRowsHeader.push(...symptonMappings.map(({label}) => label))
        healthDeclarationRowsHeader.push('Contact Within 14 Days')

        const healthDeclarationRows = userData.healthDeclarations.map(current => {
            const { temperature, symptons, contactWithin14Days, createdDateTime } = current
            
            const createdDataTimeSGT = ISOToSingaporeTime(createdDateTime)
            let currentRow = [ createdDataTimeSGT, temperature ]
            for (let currentMapping of symptonMappings) {
                currentRow.push(symptons[`${currentMapping.value}`] ? 'Yes' : 'No')
            }
            currentRow.push(contactWithin14Days ? 'Yes' : 'No')
            return currentRow
        })
        // console.log('userInfoRows', userInfoRows)
        // console.log('healthDeclarationRowsHeader', healthDeclarationRowsHeader)
        // console.log('healthDeclarationRows', healthDeclarationRows)

        const csvData = [ ...userInfoRows, healthDeclarationRowsHeader, ...healthDeclarationRows]
        // console.log('csvData', csvData)
        return csvData
    }

    const downloadCSV = () => {
        const csvContent = generateCSVData().map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = `${userData.nric}_data.csv`

        a.click()

        URL.revokeObjectURL(url)
        a.remove()
    }

    const FirstVisitContent = () => (
        <div
            className="firstVisitContent"
            
            style={{ 
                lineHeight: '45px',
                paddingTop: '45px'
        }}>
            <InfoCircleOutlined /> {" "}
            Search for user health declaration data
            by providing fullname or NRIC/FIN.
        </div>
    )

    const UserInfoBar = () => {
        //console.log('userData', userData)

        return <Row align="middle" gutter={[16,8]}>
            <Col xs={24} sm={24} md={12}>
                <Row justify="start" align="middle" style={{ fontSize: "16px" }}>
                    <span><b>Full Name:</b> {" "} {userData.fullname}</span>
                    <Divider type="vertical" />
                    <span><b>Phone:</b> {" "} {userData.phone || "NA"}</span>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Row justify={{ sm: 'end', xs: 'start' }}>
                    <Button onClick={downloadCSV} type="primary"> 
                        <DownloadOutlined /> {" "} Download CSV 
                    </Button>
                </Row>
            </Col>
        </Row>

    }

    const UserDataTable = () => {
        // console.log('healthDeclarations', userData.healthDeclarations)
        return (
            <div>
                
                <Table size="small" dataSource={userData.healthDeclarations} 
                    title={() => <UserInfoBar/>} bordered 
                    scroll={{ x: 1300, y: true }}
                >
                    <Column title={<span>Created At <br/>(SG Time)</span>} 
                        dataIndex="createdDateTime" key="createdDateTime" width={200}
                        render={createdDateTime => ISOToSingaporeTime(createdDateTime)}
                        sorter={compareISODates}
                    />
                    <Column title={<span>Temp <br/>°C</span>} dataIndex="temperature" key="createdDateTime" />
            
                    <ColumnGroup title="Symptons" key="symptons">
                        {/* { symptonMappings.map(({label, value}) => <Column
                            title={label} dataIndex={value} key={value} render={({sympton}) => sympton[`${value}`] ? 'Yes' : 'No'}
                        />) } */}
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

                        {/* <Column title="Cough" dataIndex="symptons" key="cough" render={({cough}) => cough ? 'Yes' : 'No'}/>
                        <Column title="Smell and Taste Impairment" dataIndex="symptons" key="smellAndTasteImpairment" render={({smellAndTasteImpairment}) => smellAndTasteImpairment ? 'Yes' : 'No'}/>
                        <Column title="Fever" dataIndex="symptons" key="fever" render={({fever}) => fever ? 'Yes' : 'No'}/>
                        <Column title="Breathing Difficulties" dataIndex="symptons" key="breathingDifficulties" render={({breathingDifficulties}) => breathingDifficulties ? 'Yes' : 'No'}/>
                        <Column title="Body Aches" dataIndex="symptons" key="bodyAches" render={({bodyAches}) => bodyAches ? 'Yes' : 'No'}/>
                        <Column title="Head Aches" dataIndex="symptons" key="headAches" render={({headAches}) => headAches ? 'Yes' : 'No'}/>
                        <Column title="Fatigue" dataIndex="symptons" key="fatigue" render={({fatigue}) => fatigue ? 'Yes' : 'No'}/>
                        <Column title="Sore Throat" dataIndex="symptons" key="soreThroat" render={({soreThroat}) => soreThroat ? 'Yes' : 'No'}/>
                        <Column title="Diarrhea" dataIndex="symptons" key="diarrhea" render={({diarrhea}) => diarrhea ? 'Yes' : 'No'}/>
                        <Column title="Runny Nose" dataIndex="symptons" key="runnyNose" render={({runnyNose}) => runnyNose ? 'Yes' : 'No'}/> */}
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
                    <Empty description={<div style={{ fontSize:"18px" }}>
                        No health declaration data found.
                    </div>} /> )
        }
    }

    return (
        <div className='healthDataDisplayMain'>
            <DynamicHealthDataContent />
        </div>
    )
}

export default UserHealthDataDisplay

const compareISODates = (rowA, rowB) => {

    // console.log('dateA', rowA.createdDateTime, 'rowB.createdDateTime', rowB.createdDateTime, new Date(rowA.createdDateTime) < new Date(rowB.createdDateTime))
    return new Date(rowA.createdDateTime) < new Date(rowB.createdDateTime)
}

const ISOToSingaporeTime = (isoDatetimeString) => {
    // Parse the ISO datetime string into a JavaScript Date object
    const utcDate = new Date(isoDatetimeString);

    // Convert to Singapore time (UTC+8)
    const singaporeTime = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000) + (8 * 60 * 60 * 1000));

    // Format the date and time in Singapore time
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const singaporeTimeString = singaporeTime.toLocaleString('en-SG', options).replace(',', ' ');
    return singaporeTimeString
}