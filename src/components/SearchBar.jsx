import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar(props) {

    return (
        <div className={styles.searchDiv} id="searchbar">
            <input 
            type="text" 
            value={props.value}
            placeholder='Search for artist / track'
            onChange={props.handleSearch} 
            onKeyUp={(e) => {
                if(e.key == "Enter") {
                    const run = props.fetchData;                    
                    run();
                }
            }}/>
            <button onClick={props.fetchData}>Search Tracks</button>
        </div>
    );
}
