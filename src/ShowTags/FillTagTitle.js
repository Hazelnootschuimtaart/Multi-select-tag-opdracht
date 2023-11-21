import styles from './fillTagTitle.module.css';

export default function FillTagTitle(props) {

    let searchLetters = props.searchLetters; // letters from searchfield
    const titleWord = props.titleWord; // title of tag
    const positionArray = []; // will contain the positions of letters that should be underlined
    let titleLetters = titleWord.split(""); // splits title of tag into seperate letters

    // this loop searches for the letters that should be underlined and pushes the positions to the positionArray
    for (let i = 0; i < searchLetters.length; i++) {
        let position = titleWord.search(searchLetters[i]); // position where a match is found
        positionArray.push(position);
    }

    return (
        <>
            {/* map through splitted letters from title */}
            {titleLetters.map((thisLetter, indexLetter) => {
                let result = searchLetters.includes(thisLetter); // checks if the current letter is searched
                if (result) {  // checks if the current (title)letter has to be underlined
                    return (
                        <span key={indexLetter} className={styles.underline}>{thisLetter}</span>
                    )
                }
                else {
                    return (
                        <span key={indexLetter} className={styles.nounderline}>{thisLetter}</span>
                    )
                }
            })}
        </>
    )
}
