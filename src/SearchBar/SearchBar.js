import styles from './searchBar.module.css';

export default function SearchBar(props) {
    let inputValue = props.value;
    let clickedTags = props.clickedTags;

    const handleChange = (e) => {
        props.handleChange(e.target.value);
    };

    const removeClick = (tag) => {
        console.log(tag);
        const filteredArray = clickedTags.filter((tagItem) => {
            console.log(tagItem);
            // const removeTag = tagItem.includes(tag); // this returns true if the x-clicked tag matches with the tag in the array, so then it should be removed. If false, it should be kept.
            // console.log("removeTag ", removeTag);
            return tagItem !== tag;
        })
        console.log("array zonder removed item ", filteredArray);
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
                <input type='text' className={styles.inputElement} value={inputValue} onChange={(e) => { handleChange(e) }}></input>
            </div>
        </>
    )
}
