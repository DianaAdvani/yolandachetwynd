// @ts-nocheck
import { useState} from "react";
import CollectionView from "./CollectionView";
import {useMediaQuery} from '../hooks/useMediaQuery';
import Sidebar from "./Sidebar";

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: "row",
    },
    content: {
        minHeight: "75vh",
        width: "70vw",
        padding: "0 2vw",
        margin: "auto",
 
    },

    mobileContent: {
        minHeight: "75vh",
        width: "90vw",
        padding: "0 2vw",
        margin: "auto",

    },

}

export type Category = "paintings" | "graphicNovels" | "teaching"

type CategoryViewProps = {
    category: Category
}





export default function CategoryView({category}:CategoryViewProps) {
    
    const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | undefined>();
    const [selectedSection, setSelectedSection] = useState<string>("");
    const useMobileView = useMediaQuery('(max-width: 500px)');

    return(
        <span className="wrapper" style={styles.wrapper}>
            { ((selectedWorkIndex === undefined || !useMobileView)) &&
                <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} selectedWorkIndex={selectedWorkIndex} setSelectedWorkIndex={setSelectedWorkIndex} category={category} />
            }

            <span className="content" style={((selectedWorkIndex === undefined || !useMobileView)) ? styles.content : styles.mobileContent}>
                <CollectionView category={category} section={selectedSection} selectedWorkIndex={selectedWorkIndex} setSelectedWorkIndex={setSelectedWorkIndex} />
            </span>
        </span>
    );
}