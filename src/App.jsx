import './App.css';
import { useState } from 'react'
import { Layout, Col, Row } from 'antd'
import ParticularsInput from './components/ParticularsInput';
import UserHealthDataForm from './components/UserHealthDataForm';
import UserHealthDataDisplay from './components/UserHealthDataDisplay';
import { getUserHealthInfo } from './api/api';

const { Header, Content, Footer } = Layout

const App = () => {
  const [fullname, setFullname] = useState('')
  const [nric, setNRIC] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])

  const searchUserData = async () => {
    try {
      setIsLoading(true)
      const data = await getUserHealthInfo({ fullname, nric })
      setUserData(data)
      
    } catch (eInfo) {
      console.error(eInfo)
      alert('Error occured while fetching data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout className="layoutMain">
      <Header className='layoutHeader'>Health Declaration App</Header>
      <Content>

        
        <Row className="contentMain">
          <Col span={10} className="userInputCol">
            <ParticularsInput 
              fullname={fullname} setFullname={setFullname}
              nric={nric} setNRIC={setNRIC}
              isLoading={isLoading}
              searchUserData={searchUserData}
            />
            <UserHealthDataForm/>
          </Col>

          <Col span={14} className="dataDisplayCol">
            <UserHealthDataDisplay/>
          </Col>
        </Row>
      </Content>
      <Footer className="layoutFooter" >Contact the developer</Footer>
    </Layout>
  );
}


export default App;



const footerStyle = {
  backgroundColor: '#7dbcea',
};