import { Input, Button } from 'antd'
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
        <div className='particulars-input-div'>
            <label>Full Name</label>
            <Input placeholder="John Smith" onChange={handleFullnameChange} value={fullname} allowClear/>

            <label>NRIC</label>
            <Input placeholder="S1234567M" onChange={handleNRICChange} value={nric} allowClear/>
            <Button loading={isLoading} onClick={searchUserData}>Search</Button>
        </div>
    )
}

export default ParticularsInput