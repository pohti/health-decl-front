import './App.css';
import { useState } from 'react'
import { Layout } from 'antd'
import ParticularsInput from './components/ParticularsInput';
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
    <Layout className="layout-main">
      <Header style={headerStyle}>Health Declaration App</Header>
      <Content style={contentStyle}>
        <ParticularsInput 
          fullname={fullname} setFullname={setFullname}
          nric={nric} setNRIC={setNRIC}
          isLoading={isLoading}
          searchUserData={searchUserData}
        />
      </Content>
      <Footer style={footerStyle}>Contact the developer</Footer>
    </Layout>
  );
}

// getUserHealthInfo({ nric: 'S1234567M' })

export default App;

const headerStyle = {
  backgroundColor: '#7dbcea',
};
const contentStyle = {

  backgroundColor: '#108ee9',
};
const footerStyle = {
  backgroundColor: '#7dbcea',
};