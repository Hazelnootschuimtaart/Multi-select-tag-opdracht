import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ShowTags from './ShowTags/ShowTags';
import ShowNoTags from './ShowNoTags/ShowNoTags';
import SearchBar from './SearchBar/SearchBar';
import data from "./dbTags.json";

export default function Home() {
    const allTags = data.tags;
    const [inputValue, setInputValue] = useState(""); // Typed value in searchbar
    const [tagData, setTagData] = useState(allTags); // Collection of tags that match the search value (all tags if no search value)
    const [clickedTag, setClickedTag] = useState();
    const [clickedTags, setClickedTags] = useState([]);
    const maxNumberTags = 4; // True number is +1 higher, so entering 4 is actually max 5 items

    useEffect(() => {
        // node.js aanklikken, nog een keer aanklikken, verwijderen, en dan weer aanklikken. Dan doet ie het niet. 
        // Na saven komt hij regelmatig ook weer terug dus dan zit hij nog in de clickedtagsarray
        let checkTags = clickedTags.find((tag) => {
            return tag === clickedTag;
        })

        console.log("clickedTag ", clickedTag);
        console.log("checkTags ", checkTags);

        if (checkTags == clickedTag) {
            setClickedTag(undefined);
        }
        // deze comments mogen eruit als alles de volgende keer nog werkt
        if (clickedTag !== undefined && clickedTags.length <= maxNumberTags && checkTags === undefined) {
            setClickedTags((prevState) => ([...prevState, clickedTag])); // zorgt ervoor dat de clickedTag alsnog wordt toegevoegd!!! Ook als ie verwijderd is!
            setClickedTag(undefined); // deze komt te laat!
        }
    }, [clickedTag]);
    console.log("clickedTags ", clickedTags);

    const inputChange = (inputText) => { // this is called if inputfield changes
        setInputValue(inputText);
        setTagData(allTags); // tagData is filled with all tags, so the filter will always work with/filter al the tags.
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
