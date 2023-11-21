import styles from './showNoTags.module.css';

export default function ShowNoTags() {

    return (
        <>
            <div className={styles.noResults}>
                <span>No results found</span>
            </div>
        </>
    )
}