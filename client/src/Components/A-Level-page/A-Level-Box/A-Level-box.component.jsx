import './A-Level-box.styles.css';

// Importing necessary dependencies
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Importing components related to A-Level selection
import ALevelCategory from '../A-Level-Category/A-Level-Category';
import ALevelStreamBox from '../A-Level-Streams/A-Level-StreamBox';
import ALevelLondonCategory from '../A-Level-London-Category/A-Level-London-Category';
import ALevelResults from '../A-Level-Results/A-Level-Results';

// Importing A-Level context to manage state
import { ALevelContext } from '../../../context/ALevel.context';

const AdvanceLevelBox = () => {

   // Destructuring values from the A-Level context
   const { showALevelCategory, showALevelStreamBox, showLondonALevelCategory, showALResults } = useContext(ALevelContext);

   // Hook for navigation (not used here but available for future use)
   const navigate = useNavigate();

   // Function to determine which A-Level component to render based on context state
   const renderALevelBox = () => {
       if (showALevelCategory) {
           return <ALevelCategory/>; // Show A-Level category selection
       } else if (showALevelStreamBox) {
           return <ALevelStreamBox/>; // Show A-Level stream selection
       } else if (showLondonALevelCategory) {
           return <ALevelLondonCategory/>; // Show London A-Level category selection
       } else if (showALResults) {
           return <ALevelResults/>; // Show A-Level results
       }
   };

   return (
       <>
           {renderALevelBox()} {/* Renders the appropriate component based on the state */}
       </>
   );
};

export default AdvanceLevelBox;
