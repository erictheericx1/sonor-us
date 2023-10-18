import React, { useState, useEffect } from 'react';
import './styles.css'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);


/* function for authorization Token
// ------------------------------------------------*/
useEffect(() => {
  //API Access Token
  const authParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      },     
      body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
    } 

    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(result => result.json())
    .then(data => console.log(data))
    }, [])  


    //Search Function
    async function search() {
      console.log("Search for " + searchInput); 

      //get request for artists ID
      const artistParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authorization": "Bearer " + accessToken
        }
      }

      const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParams)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id })

      console.log(artistID);
      // Get request for artist's albums with artist ID
      const searchAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums'+ '?include_groups=album&market=US&limit=50', artistParams)
      .then(response => response.json())  
      .then(data => {
        console.log(data);
      });
      //Display albums

    }

    
    return (
      <>
          
              <section className="search">
                <input
                  type="search"
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)} />
                <button onClick={search}>
                  Search
                </button>
              </section>

              <section className="hero">
                <h1 className='text-3xl text-center font-bold mb-4 bg-teal text-white'>Sonor-US</h1>
                <h3 className='text-teal-200'>Music for us, by us</h3>
              </section>

              <section className="card">
                <div className='mx-2 div div-cols-4'>
                  {albums.map( (album, i) => {
                    return (
                      <Card>
                        <Card.Img src={album.images[0].url} />
                        <Card.Body>
                          <Card.Title>{album.className}</Card.Title>
                        </Card.Body>
                      </Card>  
                    )
                  })}
                </div>
              </section>
      </>
    );
  []}

export default App; 
