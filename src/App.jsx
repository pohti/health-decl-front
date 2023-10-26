import './App.css';
import { useState } from 'react'
import { 
  Layout,
  message as AntdMessage,
  Tabs
} from 'antd'
import ParticularsInput from './components/ParticularsInput';
import UserHealthDataForm from './components/UserHealthDataForm';
import UserHealthDataDisplay from './components/UserHealthDataDisplay';
import { getUserHealthInfo } from './api/api';

const { Header, Content, Footer } = Layout

const App = () => {
  const [fullname, setFullname] = useState('')
  const [nric, setNRIC] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isFirstVisit, setIsFirstVisit] = useState(true)



  const handleTabChange = (key) => {
    console.log(key);
  };

  const searchUserData = async () => {
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
      label: 'Search User Data',
      children: (
        <div>
            <ParticularsInput 
              fullname={fullname} setFullname={setFullname}
              nric={nric} setNRIC={setNRIC}
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
      label: 'Health Declaration Form',
      children: <UserHealthDataForm/>
    }
  ]

  return (
    <Layout className="layoutMain">
      <Header className='layoutHeader'>Health Declaration App</Header>
      <Content className='layoutContent'>
        <Tabs 
          type="card"
          size="large"
          defaultActiveKey='1' 
          items={tabItems} 
          onChange={handleTabChange}
        />
      </Content>
      <Footer className="layoutFooter" >Contact the developer</Footer>
    </Layout>
  );
}


export default App;
