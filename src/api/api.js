
const BASE_URL = `https://052bs9gz53.execute-api.ap-southeast-1.amazonaws.com/dev`

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
        console.log('data', data)
        return data || []
    } catch (error){
        console.error(error)
    } 
}
