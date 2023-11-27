import { useState } from 'react';
import styles from './searchBar.module.css';

export default function SearchBar(props) {
    let inputValue = props.value;
    let clickedTags = props.clickedTags;
    const [arrayWithRemovedTag, setArrayWithRemovedTag] = useState([]);

    let checkKey = (e) => {
        if (e.key === "Backspace") {
            removeLastItem(true);
        }
        else {
            removeLastItem(false);
        }
    }

    const removeLastItem = (backspacePressed) => {
        if (inputValue == "" && backspacePressed == true) {
            const oldArray = clickedTags;
            oldArray.pop();
            console.log(oldArray);
            props.removeLastTag(oldArray);
            setArrayWithRemovedTag(oldArray); // nu haalt ie alleen de eerste weg...
        }
    }

    console.log(arrayWithRemovedTag);

    const handleChange = (e) => {
        props.handleChange(e.target.value);
    };

    const removeClick = (tag) => {
        console.log(tag);
        const filteredArray = clickedTags.filter((tagItem) => {
            return tagItem !== tag;
        })
        props.arrayWithoutRemovedItem(filteredArray);
    }

    return (
        <>
            <div className={styles.searchBarContainer}>
                {clickedTags.map((tag, index) => {
                    return (
                        <div key={index} className={styles.tagDiv}>
                            <span className={styles.tagSpan}>{tag}</span>
                            <span className={styles.xButton} onClick={() => { removeClick(tag) }}>x</span>
                        </div>
                    )
                })}
                <input type='text' className={styles.inputElement} value={inputValue} onKeyDown={(e) => checkKey(e)} onChange={(e) => { handleChange(e) }}></input>
            </div>
        </>
    )
}
