import '/.styles.css'

export default function Card ({ artists}) {
    return (
        <div>
            <figure>
                <img src={artists.images[0].url} alt={artists.name} />
                <figcaption>
                    <p>{artists.name}</p>
                </figcaption>
            </figure>
        </div>    
    )
}