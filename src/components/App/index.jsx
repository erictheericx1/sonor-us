import React, { useState, useEffect } from 'react';
import './styles.css';
import Nav from '../Nav';

// const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const accessToken = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);


/* function for authorization Token
// ------------------------------------------------*/
useEffect(() => {
  // //API Access Token
  // const authParams = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     },     
  //     body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
  //   } 

  //   fetch('https://accounts.spotify.com/api/token', authParams)
  //   .then(result => result.json())
  //   .then(data => console.log(data))
    }, []);


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
        <Nav />
              
            
              
              <section className="hero">
                <h1 className='text-5xl text-center font-bold mb-4'>Sonor-US</h1>
                <h3 className='text-indigo-400'>Music for us, by us</h3>
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

                <section className="search">
                <input
                  type="search"
                  className="rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Who do you want to listen to?"
                  aria-label="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)} />
                <button className="btn btn-outline-secondary rounded" onClick={search}>
                  Search
                </button>
              </section>

              </section>
      </>
    );
  }

export default App; 
