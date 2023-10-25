import { Input, Button, Row, Col } from 'antd'
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
        <Row className='particulars-input-div' gutter={[8, 8]}>
            <Col sm={24} md={10}>
                <label>Full Name</label>
                <Input placeholder="John Smith" onChange={handleFullnameChange} value={fullname} allowClear/>
            </Col>
            <Col sm={24} md={10}>
                <label>NRIC</label>
                <Input placeholder="S1234567M" onChange={handleNRICChange} value={nric} allowClear/>
            </Col>

            <Col sm={24} md={4}>
                <Button loading={isLoading} onClick={searchUserData}>Search</Button>
            </Col>
        </Row>
    )
}

export default ParticularsInput