import React from 'react';

function Search(props) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
      // Perform the search logic here and pass the searchInput to the parent component.
      props.onSearch(searchInput);
    };
       
    return (
        <div>
            <input
                type="search"
                placeholder="Who do you want to listen to?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;