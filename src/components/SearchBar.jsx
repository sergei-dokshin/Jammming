import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, handleSearch, Search }) {

    return (

        <div className={styles.searchDiv} id="searchbar">
            <input
                type="text"
                value={value}
                placeholder='Search for artist / track'
                onChange={handleSearch}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {                        
                        Search();
                    }
                }} />
            <button onClick={Search}>Search Tracks</button>
        </div>
    );
}
