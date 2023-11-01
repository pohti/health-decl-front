import { Input, Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import './ParticularsInput.css'

const ParticularsInput = (props) => {
    const {
        fullname, setFullname,
        nric, setNRIC,
        isLoading,
        searchUserData
    } = props

    const handleFullnameChange = (event) => {
        setFullname(event.target.value)
    }

    const handleNRICChange = (event) => {
        setNRIC(event.target.value)
    }

    return (
        <Row className='particularsInputRow' gutter={[12, 8]}
            justify="center" align="middle">
            <Col className='particularsInputCol'>
                <label>Full Name</label> {" "}
                <Input 
                    className="particularsInput"
                    // style={{ maxWidth: '200px' }}
                    placeholder="Alice Tan" 
                    onChange={handleFullnameChange} 
                    onPressEnter={searchUserData}
                    value={fullname} allowClear
                />
            </Col>
            <Col className='particularsInputCol'>
                <label>NRIC</label> {" "}
                <Input 
                    className="particularsInput"
                    // style={{ maxWidth: '180px' }}
                    placeholder="S1234567M" 
                    onChange={handleNRICChange} 
                    onPressEnter={searchUserData}
                    value={nric} 
                    allowClear
                />
            </Col>

            <Col>
                <Button loading={isLoading} onClick={searchUserData}>
                    <SearchOutlined /> {" "}
                    Search
                </Button>
            </Col>
        </Row>
    )
}

export default ParticularsInput