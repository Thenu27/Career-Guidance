import './O-Level-Subj.css';

// Importing necessary dependencies
import OLevelMainLocalSubjects from '../O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OLevelSubj = () => {
    // State to store O-Level core subjects and basket subjects
    const [OLevelLocalCoreSubj, setOLevelLocalCoreSubjt] = useState([]);
    const [OLevelBasketSubj, setOLevelBasketSubj] = useState([]);

    // Function to fetch O-Level local core subjects from the backend
    const fetchOLevelLocalCoreSubjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/Ordinarylevelpage/local-core`);
            setOLevelLocalCoreSubjt(response.data); // Update state with fetched core subjects
        } catch (error) {
            console.error("Error Fetching Subjects", error.message);
        }
    };

    // Function to fetch O-Level local basket subjects from the backend
    const fetchOLevelLocalBasketSubjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/Ordinarylevelpage/local-Basket`);
            setOLevelBasketSubj(response.data); // Update state with fetched basket subjects
        } catch (error) {
            console.error("Error Fetching Subjects", error.message);
        }
    };

    // useEffect to fetch data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            await fetchOLevelLocalCoreSubjects(); // Fetch core subjects
            await fetchOLevelLocalBasketSubjects(); // Fetch basket subjects
        };
    
        fetchData(); // Call the async function
    }, []);

    // Log OLevelBasketSubj state for debugging
    // useEffect(() => {
    //     console.log("thenu", OLevelBasketSubj);
    // }, [OLevelBasketSubj]);

    // Function to render O-Level subjects
    const renderSubject = () => {
        return <OLevelMainLocalSubjects OLevelBasketSubj={OLevelBasketSubj} OLevelLocalCoreSubj={OLevelLocalCoreSubj} />;
    };

    return (
        <>
            {renderSubject()} {/* Render subjects dynamically */}
        </>
    );
};

export default OLevelSubj;
