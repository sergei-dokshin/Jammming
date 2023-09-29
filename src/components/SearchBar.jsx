import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, handleSearch, fetchData, requestAuth }) {

    return (

        <div className={styles.searchDiv} id="searchbar">
            <input
                type="text"
                value={value}
                placeholder='Search for artist / track'
                onChange={handleSearch}
                onKeyUp={(e) => {
                    if (e.key == "Enter") {
                        const run = fetchData;
                        run();
                    }
                }} />
            <button onClick={fetchData}>Search Tracks</button>
        </div>
    );
}
