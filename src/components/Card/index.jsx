import { Link } from 'react-router-dom'


export default function Card ({ artists, updateSelectedArtist}) {
    return (
        <Link 
            to={'/details/' + artists.id}
            onClick={() => { updateDetailPage (artists) }}>
        
            <figure>
                <img src={artists.images[0].url} alt={artists.name} />
                <figcaption>
                    <p>{artists.name}</p>
                    <p>{artists.genres}</p>
                </figcaption>
            </figure>
        </Link>    
    )
}