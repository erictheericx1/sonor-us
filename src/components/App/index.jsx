import { useState, useEffect } from 'react'
import './styles.css'


function App() {
  const [artists, setArtists] = useState([])

  // Query the API on component mount
  useEffect(() => {

    // Define an async function to JSONify the query response  
    async function getData() {
      const res = await fetch('https://itunes.apple.com/search?')
      const { data } = await res.json()
      setArtists(data)
    }

    // Call the async function
    getData()
  }, [])

  //  Create the HTML using JSX for the App component
  return (
    <>
      <h1>Aesthetic Domain</h1>
      {artists.artistName > 0 ? <img src={artists[1].image} /> : <p>Your artwork is loading...</p>}
    </>
  )
}

export default App 