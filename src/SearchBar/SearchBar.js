import { useState } from 'react';
import styles from './searchBar.module.css';

// This component contains the searchbar, including already clicked tags that show up inside the searchbar on the left side. 
// These tags can be removed by clicking on x, or pressing backspace when the searchbar is empty.
export default function SearchBar(props) {
    let inputValue = props.value; // searchvalue
    let clickedTags = props.clickedTags; // array with clicked tags
    const [arrayLength, setArrayLength] = useState(0);

    // Remove last tag with BACKSPACE:

    // If a key is pressed, this checks if it is the backspace. If true AND the searchbar is empty, the last (already clicked) tag (inside the searchbar) will be removed.
    let checkKey = (e) => {
        if (e.key === "Backspace") {
            removeLastItem(true);
        }
        else {
            removeLastItem(false);
        }
    };

    // This actually removes the last item/tag if the condition is true.
    const removeLastItem = (backspacePressed) => {
        if (inputValue == "" && backspacePressed == true) {
            const oldArray = clickedTags;
            oldArray.pop();
            props.removeLastTag(oldArray); // this returns the new/updated array (of clicked tags to show inside the searchbar) to the Home component.
            setArrayLength(oldArray.length); // This triggers a rerender so the searchbar component will be updated.

        }
    };

    // Remove last tag with CLICK ON X:

    // This removes the tag that has been clicked on the x
    const removeClick = (tag) => {
        const filteredArray = clickedTags.filter((tagItem) => {
            return tagItem !== tag;
        })
        props.arrayWithoutRemovedItem(filteredArray);
    };

    // This passes the typed searchvalue to the Home component.
    const handleChange = (e) => {
        props.handleChange(e.target.value);
    };

    return (
        <>
            <div className={styles.searchBarContainer}>
                {/* These are the clicked tags that show up inside the searchbar */}
                {clickedTags.map((tag, index) => {
                    return (
                        <div key={index} className={styles.tagDiv}>
                            <span className={styles.tagSpan}>{tag}</span>
                            <span className={styles.xButton} onClick={() => { removeClick(tag) }}>x</span>
                        </div>
                    )
                })}
                <input
                    type='text'
                    className={styles.inputElement}
                    value={inputValue}
                    onKeyDown={(e) => { checkKey(e) }}
                    onChange={(e) => { handleChange(e) }}>
                </input>
            </div>
        </>
    )
}
