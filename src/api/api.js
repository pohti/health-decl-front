
const BASE_URL = `https://sm7tgtc38h.execute-api.ap-southeast-1.amazonaws.com/dev`

const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.REACT_APP_API_KEY
}

export const getUserHealthInfo = async (queryParams) => {
    
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
    
    // Combine the API URL and query string
    const apiUrlWithParams = `${BASE_URL}/users?${queryString}`;

    try {
        const response = await fetch(apiUrlWithParams, {
            headers,
        })
        const data = await response.json()
        // console.log('data', data)
        return data
    } catch (error){
        console.error(error)
        throw new Error('Error during getUserHealthInfo')
    } 
}

export const addUserHealthInfo = async (userData) => {
    const url = `${BASE_URL}/users`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (response.status !== 200) throw new Error('error adding user health data')
        return data

    } catch (error) {
        console.log(error)
        throw new Error('Error during addUserHealthInfo')
    }
}
