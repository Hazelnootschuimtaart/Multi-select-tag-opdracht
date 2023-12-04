import styles from "./showTags.module.css";
import FillTagTitle from "./FillTagTitle";

// This component shows the tags that match the searchvalue.
export default function ShowTags(props) {
    let tagData = props.data;
    let searchText = props.inputText;
    const searchTextLetters = searchText.split(""); // splits the searchvalue in seperate letters.
    const titleWords = []; // title as word in array --> [title, title, title]
    const titleLetters = []; // array that contains the letters of each title (in array) --> [[t,i,t,e,l,1], [t,i,t,e,l,2]]

    // loops through tagData and pushes the titles in an array + pushes the seperate letters of the titles in an array.
    for (let tagNumber = 0; tagNumber < tagData.length; tagNumber++) {
        let tagName = tagData[tagNumber].title;
        titleWords.push(tagName);
        let splitLetters = tagName.split("");
        titleLetters.push(splitLetters);
    }
    // passes the clicked title to Home component
    function handleClick(title) {
        props.clickedElement(title);
        props.changeClickedTitle(title);
    }

    return (
        <>
            <div className={styles.flexContainer}>
                {/* Map through the tags that match the searchvalue and show them on the screen*/}
                {tagData.map((tag) => {
                    return (
                        <div key={tag.id} className={styles.tagBlock} onClick={() => { handleClick(tag.title) }}>
                            <span className={styles.tagTitle}>
                                <FillTagTitle searchLetters={searchTextLetters} titleLetters={titleLetters} titleWord={tag.title} />
                            </span>
                            <span>{tag.body}</span>
                        </div>
                    )
                })}
            </div >
        </>
    )
}