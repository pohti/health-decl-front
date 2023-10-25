import { useState } from 'react'
import { 
    Empty,
    Skeleton, 
    Descriptions,

} from 'antd'
import './UserHealthDataDisplay.css'


const FirstVisitContent = () => (
    <div>
        Search for user health declaration data by providing fullname or NRIC/FIN.
    </div>
)


const UserHealthDataDisplay = ({isFirstVisit, userData, isLoading}) => {

    const UserDataDisplay = () => {
        return userData.healthDeclarations.map(currentData => {
            const { temperature, symptons, contactWithin14Days, createdDateTime, _id } = currentData
            return (
                <li key={_id}>Temperature: {temperature} | contactWithin14Days: {contactWithin14Days}</li>
            )
        })
    }

    const DynamicHealthDataContent = () => {
        console.log('isLoading', isLoading)
        console.log('isFirstVisit', isFirstVisit)
        console.log('userData', userData)
        if (isLoading) return <Skeleton />
        if (isFirstVisit) return <FirstVisitContent/>
        else {
            return ( userData ? 
                    <UserDataDisplay /> : 
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