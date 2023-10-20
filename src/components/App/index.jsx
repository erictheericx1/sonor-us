import React, { useState, useEffect } from 'react';
import Nav from '../Nav';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const accessToken = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);


/* function for authorization Token
// ------------------------------------------------*/
  useEffect(() => {
  // // //API Access Token
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
      },
    };

    const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParams)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })

    console.log(artistID);
    // Get request for artist's albums with artist ID
    const searchAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums'+ '?include_groups=album&market=US&limit=50', artistParams)
      .then(response => response.json())  
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      });
  }

    
  return (
    <>
      <div className="flex">
        <div className="w-1/4">
          <section className="Nav">
            <Nav />
          </section>
        </div>

        <div className="w-3/4">          
          <section className="hero">
            <h1 className='text-5xl text-center font-bold'>Sonor-US</h1>
            {/* <h3 className='text-purple-400'>Music for us, by us</h3> */}
          </section>

          <section className="card">
            <div>
              <input
                type="search"
                className="rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Who do you want to listen to?"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    search();
                  }
                }}/>
              <button className="transition ease-in-out delay-150 over:-translate-y-1 hover:bg-indigo-500 duration-300 ... bg-white hover:bg-purple-800 text-purple-800 hover:text-white font-bold m-3 py-2 px-4 rounded"
                onClick={search}>
                Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.length > 0 ? (
                albums.map((album, index) => (
                  <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg">
                    <img src={album.images[0].url} alt="album" className="w-full" />
                    <div className="px-6 py-4">
                      <p className="font-bold text-xl mb-2">Name of album: {album.name}</p>
                      <p className="text-base">Release Date: {album.release_date}</p>
                      <p> Total Tracks: {album.total_tracks}</p>  
                    </div>
                  </div>
                ))
              ) : null}
            </div>

          </section>
        </div>
      </div>  
    </>
  );
}

export default App; 
