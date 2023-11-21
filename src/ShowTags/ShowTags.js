import styles from "./showTags.module.css";
import FillTagTitle from "./FillTagTitle";

export default function ShowTags(props) {
    let tagData = props.data;
    let searchText = props.inputText;
    const searchTextLetters = searchText.split("");
    const titleWords = []; // titel als woord in array [titel, titel, titel]
    const titleLetters = []; // array met letters van titel in array [[t,i,t,e,l,1], [t,i,t,e,l,2]]

    for (let tagTitle = 0; tagTitle < tagData.length; tagTitle++) {
        let tagName = tagData[tagTitle].title;
        titleWords.push(tagName);
        let splitLetters = tagName.split("");
        titleLetters.push(splitLetters);
    }

    function handleClick(title) {
        props.clickedElement(title);
    }

    return (
        <>
            <div className={styles.flexContainer}>
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