import { createContext, useState } from "react";

// Creating CareerContext with default values
export const CareerContext = createContext({
    showCareerFieldBox: null,
    setshowCareerFieldBox: () => {},
    showCareerDropdown: null,
    setShowCareerDropdown: () => {},
    showMatchedProfileMsg: null,
    setshowMatchedProfileMsg: () => {},
    SelectedCareerField: null,
    setSelectedCareerField: () => {},
    Careers: null,
    setCareers: () => {}
});

// CareerProvider component to manage and provide context values
export const CareerProvider = ({ children }) => {
    // State to track whether the career field selection box is visible
    const [showCareerFieldBox, setshowCareerFieldBox] = useState(true);

    // State to track whether the career dropdown is shown
    const [showCareerDropdown, setShowCareerDropdown] = useState(false);

    // State to track whether the matched profile message is displayed
    const [showMatchedProfileMsg, setshowMatchedProfileMsg] = useState(false);

    // State to store the selected career field(s)
    const [SelectedCareerField, setSelectedCareerField] = useState([]);

    // State to store the fetched careers
    const [Careers, setCareers] = useState({});

    // Defining the values to be provided by the context
    const value = {
        showCareerFieldBox,
        setshowCareerFieldBox,
        showCareerDropdown,
        setShowCareerDropdown,
        showMatchedProfileMsg,
        setshowMatchedProfileMsg,
        SelectedCareerField,
        setSelectedCareerField,
        Careers,
        setCareers
    };

    return (
        <CareerContext.Provider value={value}>
            {children}
        </CareerContext.Provider>
    );
};
