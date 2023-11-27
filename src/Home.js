import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ShowTags from './ShowTags/ShowTags';
import ShowNoTags from './ShowNoTags/ShowNoTags';
import SearchBar from './SearchBar/SearchBar';
import data from "./dbTags.json";

export default function Home() {
    const allTags = data.tags;
    const [inputValue, setInputValue] = useState(""); // Typed value in searchbar
    const [tagData, setTagData] = useState(allTags); // Collection of tags that match the search value (all tags if no search value). 
    const [clickedTag, setClickedTag] = useState(); // The current clicked tag
    const [clickedTags, setClickedTags] = useState([]); // All tags that have to be shown as 'selected/clicked' in the searchbar
    // const [removeLastItem, setRemoveLastItem] = useState(false);
    const maxNumberTags = 4; // True number is +1 higher, so entering 4 is actually max 5 items

    // checks if the last clicked tag already exists in clickedTags array. If true, clickedTag is set to undefined. If false, the clickedTags-array is updated with the new clicked tag.
    useEffect(() => {
        let checkTags = clickedTags.find((tag) => {
            return tag === clickedTag;
        })

        if (checkTags == clickedTag) {
            setClickedTag(undefined);
        }

        if (clickedTag !== undefined && clickedTags.length <= maxNumberTags && checkTags === undefined) {
            setClickedTags((prevState) => ([...prevState, clickedTag]));
            setClickedTag(undefined);
        }
    }, [clickedTag]);

    // this is called if inputfield changes
    const inputChange = (inputText) => {
        setInputValue(inputText);
        setTagData(allTags); // tagData is filled with all tags, so the filter will always work with/filter all the tags.
    }

    // const removeLastTag = (backspacePressed) => {
    //     if (inputValue == "" && backspacePressed == true) {
    //         const oldArray = clickedTags;
    //         oldArray.pop();
    //         console.log(oldArray);
    //         setClickedTags(oldArray);
    //         setClickedTag(undefined);
    //     }
    // }



    // filters the tags that include the inputvalue and updates the tagData state to only show the ones that match with the inputvalue
    useEffect(() => {
        if (inputValue !== "") {
            const inputValueLow = inputValue.toLowerCase();
            // This filter will always filter ALL the tags.
            const filteredTags = (tagData || []).filter((tag) => {
                const tagTitleLow = tag.title.toLowerCase();
                const includesName = tagTitleLow.includes(inputValueLow); //checks if inputvalue == tagname (returns true/false)
                return includesName === true; //returns array with matched items
            });
            setTagData(filteredTags); //Updates state with array that contains matched items (or all if inputvalue is empty)
        }
    }, [inputValue]);

    console.log("clickedTags ", clickedTags);

    // moet opnieuw renderen, want verandering is nog niet zichtbaar (wel te zien in log).
    // maar eigenlijk doe ik precies hetzelfde als met het wegklikken met kruisje, waarom doet hij het dan nu niet met de backspace-methode?



    return (
        <>
            <h4 className={styles.header}>Tags</h4>
            <p className={styles.description}>Add up to 5 tags. Start typing to see suggestions.</p>
            <div className={styles.searchContainer} style={{ width: "55%" }}>
                <SearchBar value={inputValue} removeLastTag={(newTagsArray) => { setClickedTags(newTagsArray) }} handleChange={(value, backspace) => { inputChange(value, backspace) }} clickedTags={clickedTags} arrayWithoutRemovedItem={(array) => { setClickedTags(array) }} />
                {inputValue.length !== 0 &&
                    <ShowTags inputText={inputValue} data={tagData} clickedElement={(title) => { setClickedTag(title) }} />
                }
                {tagData.length === 0 &&
                    <ShowNoTags />
                }
            </div>
        </>
    )
}
