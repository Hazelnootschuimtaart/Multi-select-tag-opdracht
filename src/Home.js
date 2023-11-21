import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ShowTags from './ShowTags/ShowTags';
import ShowNoTags from './ShowNoTags/ShowNoTags';
import SearchBar from './SearchBar/SearchBar';
import data from "./dbTags.json";

export default function Home() {
    const allTags = data.tags;
    const [inputValue, setInputValue] = useState(""); // Typed value in searchbar
    const [tagData, setTagData] = useState(allTags); // Collection of tags that match the search value
    const [clickedTag, setClickedTag] = useState(); // hier array in stoppen/van maken
    const [clickedTags, setClickedTags] = useState([]);
    const maxNumberTags = 4;

    useEffect(() => {
        if (clickedTag !== undefined && clickedTags.length <= maxNumberTags) {
            setClickedTags((prevState) => ([...prevState, clickedTag]));
        }

    }, [clickedTag]);

    const inputChange = (inputText) => { // this is called if inputfield changes
        setInputValue(inputText);
        setTagData(allTags);
    }

    const removeTag = (changedArray) => {
        setClickedTags(changedArray);
        setClickedTag(undefined);
    }

    // filters the tags that include the inputvalue and updates the tagData state to only show the ones that match with the inputvalue
    useEffect(() => {
        if (inputValue !== "") {
            const inputValueLow = inputValue.toLowerCase();
            const filteredTags = (tagData || []).filter((tag) => {
                const tagTitleLow = tag.title.toLowerCase();
                const includesName = tagTitleLow.includes(inputValueLow); //checks if inputvalue == itemname (returns true/false)
                return includesName === true; //returns array with matched items
            });
            setTagData(filteredTags); //Updates state with array that contains matched items (or all if inputvalue is empty)
        }
    }, [inputValue]);

    return (
        <>
            <h4 className={styles.header}>Tags</h4>
            <p className={styles.description}>Add up to 5 tags. Start typing to see suggestions.</p>
            <div className={styles.searchContainer} style={{ width: "55%" }}>
                <SearchBar value={inputValue} handleChange={(value) => { inputChange(value) }} clickedTags={clickedTags} arrayWithoutRemovedItem={(array) => { setClickedTags(array) }} />
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
