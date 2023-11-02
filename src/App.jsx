import './App.css';
import { useState } from 'react'
import { 
  Layout,
  message as AntdMessage,
  Tabs
} from 'antd'
import { FileSearchOutlined, FormOutlined, SafetyOutlined } from '@ant-design/icons';
import ParticularsInput from './components/HealthDataDisplay/ParticularsInput';
import UserHealthDataForm from './components/HealthDeclarationForm/UserHealthDataForm';
import UserHealthDataDisplay from './components/HealthDataDisplay/UserHealthDataDisplay';
import { getUserHealthInfo } from './api/api';
import CustomFooter from './components/CustomFooter/CustomFooter';

const { Header, Content, Footer } = Layout

const App = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isFirstVisit, setIsFirstVisit] = useState(true)



  const handleTabChange = (key) => {
    // console.log(key);
  };

  const searchUserData = async (fullname, nric) => {
    // validate
    if (!fullname && !nric) {
      AntdMessage.error('Please provide either full name or NRIC/FIN no!')
      return
    }
    if (nric && nric.length !== 9) {
      AntdMessage.error('Invalid NRIC format!')
      return
    }


    try {
      setIsLoading(true)
      setIsFirstVisit(false)
      const data = await getUserHealthInfo({ fullname, nric })
      setUserData(data)
      
    } catch (eInfo) {
      console.error(eInfo)
      alert('Error occured while fetching data')
    } finally {
      setIsLoading(false)
    }
  }

  const tabItems = [
    {
      key: '1',
      label: <span><FileSearchOutlined /> {" "} Search User Data</span>,
      children: (
        <div>
            <ParticularsInput
              isLoading={isLoading}
              searchUserData={searchUserData}
            />
            <UserHealthDataDisplay 
              isFirstVisit={isFirstVisit} 
              userData={userData} 
              isLoading={isLoading}
            />
        </div>
      )
    },
    {
      key: '2',
      label: <span><FormOutlined /> {" "} Health Declaration Form</span>,
      children: <UserHealthDataForm/>
    }
  ]

  return (
    <Layout className="layoutMain">
      <Header className='layoutHeader'><SafetyOutlined style={{ marginRight: '15px' }}/> Health Declaration Tool</Header>
      <Content className='layoutContent'>
        <Tabs 
          type="line"
          size="large"
          defaultActiveKey='1' 
          items={tabItems} 
          onChange={handleTabChange}
        />
      </Content>
      <Footer className="layoutFooter" >
        <CustomFooter />
      </Footer>
    </Layout>
  );
}


export default App;
