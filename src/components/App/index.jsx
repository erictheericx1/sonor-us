import React, { useState, useEffect } from 'react';
// import Card from '../Card';
import './styles.css'


function App() {
  const [userData, setUserData] = useState(null);



  useEffect(() => {
const fetchUserData = async () => {
  try {
    const response = await fetch ('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 1POdFZRZbvb...qqillRxMr2z', // Replace with your actual access token
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      console.error('Failed to get user data', response.status, response.statusText); 
    }
  } catch (error) {
    console.error('Error:', error);
  }
};     

// Call the function to fetch the data
  fetchUserData();

}, []);

  return (
    <div className="App">
      <h1 className='text-center m-2 border-2 border-black rounded-lg cursor-pointer bg-gray-700 bg-opacity-70 text-gray-300 hover:text-white hover:bg-gray-800 hover:transform hover:scale-105 shadow-lg transition ease duration-50'>Sonor-US</h1>
      <h3 className='text-teal-600'>Music for us, by us</h3>
    </div>

    // <div>
    //   {userData && (
    //       <h2>User Data</h2>
    //       <pre>{JSON.stringify(userData, null, 2)}</pre>
    // </div>

  );
}

export default App;
