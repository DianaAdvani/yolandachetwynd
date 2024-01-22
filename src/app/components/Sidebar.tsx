import { useEffect, useState } from "react";
import {useMediaQuery} from '../hooks/useMediaQuery';
import {Category} from './CategoryView';
import {TeachingImage, projects} from '../constants/teaching';
import {Painting, paintings} from "../constants/paintings";
import {graphicNovels} from '../constants/graphicNovels';

const styles = {
    panel: {
        minHeight: "75vh",
        width: "20vw",
        margins: "2px",
        padding: "10px",
        overflowWrap: "break-word",
        overflow: "auto",
    },
    sectionTitle: {
        padding: "0 10px",
        cursor: "default",
    },
    selectedSectionTitle: {
        color:"#6BB0A8ff", 
        padding: "0px 10px ",
        border:"2px solid #CED0CC", 
        borderRadius: "30px",
        cursor: "default",
    },
    workTitle: {
        margin: "5px 30px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "default",
    },
    selectedWorkTitle: {
        margin: "5px 30px",
        color:"#6BB0A8ff",
        cursor: "default",
    },
    sectionDivider: {
        borderRight: "8px solid #6fb18e",

    },
    mobileFonts: {
        fontSize: "7px",
    }
}


function getCollectionDictionary (category: Category): Collection {
 
    switch(category) {
        case "paintings":
            return paintings;
        case "graphicNovels":
            return graphicNovels;
        case "teaching":
            return projects;
    }
}

function getCollections(category: Category) {

    return Object.keys(getCollectionDictionary(category));
}





type SidebarProps =  {

    category:  Category;
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    selectedWorkIndex: number;
    setSelectedWorkIndex: (index: number | undefined) => void 
    
}

type Collection = {
    [key: string] : Painting[] | TeachingImage[];

}

export default function Sidebar({ category, selectedWorkIndex, setSelectedWorkIndex, selectedSection, setSelectedSection } : SidebarProps) {

    const [collections, setCollections] = useState<string[]>();

    const [listOfWorks, setListOfWorks] = useState<string[] | undefined>();

    const useMobileView = useMediaQuery('(max-width: 500px)');

    useEffect(() => {
        setCollections(getCollections(category));
        setSelectedSection(getCollections(category)[0]);
        setSelectedWorkIndex(undefined);
    },[category])




    useEffect(() => {
        let list: string[]; 
        if (selectedSection && category !== 'graphicNovels') {
            list = getCollectionDictionary(category)[selectedSection].map((work,index ) => {return <h5 key={index} onClick={() => {setSelectedWorkIndex(index)}} style={selectedWorkIndex === index ? styles.selectedWorkTitle : styles.workTitle}>{`- ${work.title}`}</h5>});
            setListOfWorks(list);
        } else {

        }
        
    }, [selectedSection, selectedWorkIndex])



    return(
        <>
         
            <span className="panel" style={styles.panel}>
                {collections?.map((collection) => {
                    return (
                        <div key={collection} style={useMobileView? styles.mobileFonts: undefined}>
                            <h3  onClick={()=> {setSelectedSection(collection); setSelectedWorkIndex(undefined)}} style={selectedSection === collection ? styles.selectedSectionTitle : styles.sectionTitle} >{ collection }</h3>
                            { (selectedSection === collection && category !== 'graphicNovels' && !useMobileView ) &&  listOfWorks}
                        </div>
                    )
                })}
            </span>
            <span className="sectionDivider" style={styles.sectionDivider}/>
        </>
    );
}